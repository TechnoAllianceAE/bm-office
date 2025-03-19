
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PlusCircle, Search, RefreshCw, X, ShieldCheck, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Role {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

interface Permission {
  id: string;
  role_id: string;
  application: string;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
  created_at: string;
}

// List of applications/modules that can have permissions
const applications = [
  'Dashboard',
  'Timesheet',
  'Projects',
  'Calendar',
  'HR',
  'Directory',
  'Mailbox',
  'AI Assistant',
  'AI Workflow',
  'DMS',
  'Tools',
  'Analytics',
  'MIS',
  'Requisition',
  'Help Desk',
  'LMS',
  'Claims',
  'User Management'
];

export function RoleManagementTab() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const roleSchema = z.object({
    name: z.string().min(2, { message: 'Role name must be at least 2 characters' }),
    description: z.string().optional(),
  });

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      fetchPermissions(selectedRole.id);
    }
  }, [selectedRole]);

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .order('name');
      
      if (error) {
        throw error;
      }
      
      setRoles(data as Role[]);
      
      // Select the first role by default if there are roles
      if (data && data.length > 0 && !selectedRole) {
        setSelectedRole(data[0]);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Failed to load roles');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPermissions = async (roleId: string) => {
    try {
      const { data, error } = await supabase
        .from('permissions')
        .select('*')
        .eq('role_id', roleId);
      
      if (error) {
        throw error;
      }
      
      setPermissions(data as Permission[]);
      
      // Create missing permissions for all applications
      const existingApps = data.map(p => p.application);
      const missingApps = applications.filter(app => !existingApps.includes(app));
      
      if (missingApps.length > 0) {
        const newPermissions = missingApps.map(app => ({
          role_id: roleId,
          application: app,
          can_view: false,
          can_create: false,
          can_edit: false,
          can_delete: false,
        }));
        
        const { error: insertError } = await supabase
          .from('permissions')
          .insert(newPermissions);
        
        if (insertError) {
          console.error('Error creating missing permissions:', insertError);
        } else {
          // Refresh permissions
          fetchPermissions(roleId);
        }
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast.error('Failed to load permissions');
    }
  };

  const handleAddRole = async (values: z.infer<typeof roleSchema>) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('roles')
        .insert({
          name: values.name,
          description: values.description,
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      toast.success('Role created successfully');
      form.reset();
      setIsAddRoleModalOpen(false);
      fetchRoles();
      
      // Create default permissions for the new role
      const newPermissions = applications.map(app => ({
        role_id: data.id,
        application: app,
        can_view: false,
        can_create: false,
        can_edit: false,
        can_delete: false,
      }));
      
      const { error: permError } = await supabase
        .from('permissions')
        .insert(newPermissions);
      
      if (permError) {
        console.error('Error creating permissions:', permError);
      }
    } catch (error) {
      console.error('Error adding role:', error);
      toast.error('Failed to create role');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    if (!confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      return;
    }
    
    try {
      // Delete all permissions for this role
      const { error: permError } = await supabase
        .from('permissions')
        .delete()
        .eq('role_id', roleId);
      
      if (permError) {
        throw permError;
      }
      
      // Delete the role
      const { error } = await supabase
        .from('roles')
        .delete()
        .eq('id', roleId);
      
      if (error) {
        throw error;
      }
      
      toast.success('Role deleted successfully');
      fetchRoles();
      
      // If the deleted role was selected, clear the selection
      if (selectedRole && selectedRole.id === roleId) {
        setSelectedRole(null);
      }
    } catch (error) {
      console.error('Error deleting role:', error);
      toast.error('Failed to delete role');
    }
  };

  const handleUpdatePermission = async (permissionId: string, field: string, value: boolean) => {
    try {
      const { error } = await supabase
        .from('permissions')
        .update({ [field]: value })
        .eq('id', permissionId);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setPermissions(prev => 
        prev.map(p => 
          p.id === permissionId 
            ? { ...p, [field]: value } 
            : p
        )
      );
    } catch (error) {
      console.error('Error updating permission:', error);
      toast.error('Failed to update permission');
    }
  };

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (role.description && role.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search roles..." 
            className="pl-8" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchRoles} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Dialog open={isAddRoleModalOpen} onOpenChange={setIsAddRoleModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Role</DialogTitle>
                <DialogDescription>
                  Create a new role and define its permissions.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddRole)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Marketing Manager" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description of this role's responsibilities" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsAddRoleModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Creating...' : 'Create Role'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side - Roles list */}
        <div className="rounded-md border bg-card/40 backdrop-blur-md">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Roles</h3>
          </div>
          <div className="p-2">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-12 p-2 mb-2 bg-muted/30 rounded animate-pulse"></div>
              ))
            ) : (
              filteredRoles.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No roles found
                </div>
              ) : (
                filteredRoles.map(role => (
                  <div 
                    key={role.id}
                    className={`p-2 rounded-md cursor-pointer flex justify-between items-center mb-1 ${
                      selectedRole?.id === role.id ? 'bg-primary/10' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedRole(role)}
                  >
                    <div>
                      <div className="font-medium">{role.name}</div>
                      {role.description && (
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {role.description}
                        </div>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRole(role.id);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )
            )}
          </div>
        </div>
        
        {/* Right side - Permissions */}
        <div className="md:col-span-2 rounded-md border bg-card/40 backdrop-blur-md">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">
              {selectedRole ? `Permissions: ${selectedRole.name}` : 'Permissions'}
            </h3>
            {selectedRole && (
              <Button 
                variant="outline"
                size="sm"
                onClick={() => fetchPermissions(selectedRole.id)}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            )}
          </div>
          
          {!selectedRole ? (
            <div className="p-8 text-center text-muted-foreground">
              Select a role to view and manage its permissions
            </div>
          ) : isLoading ? (
            <div className="p-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-10 mb-2 bg-muted/30 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="p-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application</TableHead>
                    <TableHead className="text-center">View</TableHead>
                    <TableHead className="text-center">Create</TableHead>
                    <TableHead className="text-center">Edit</TableHead>
                    <TableHead className="text-center">Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No permissions defined for this role
                      </TableCell>
                    </TableRow>
                  ) : (
                    permissions
                      .sort((a, b) => a.application.localeCompare(b.application))
                      .map((permission) => (
                        <TableRow key={permission.id}>
                          <TableCell>{permission.application}</TableCell>
                          <TableCell className="text-center">
                            <Checkbox 
                              checked={permission.can_view}
                              onCheckedChange={(checked) => 
                                handleUpdatePermission(permission.id, 'can_view', checked === true)
                              }
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox 
                              checked={permission.can_create}
                              onCheckedChange={(checked) => 
                                handleUpdatePermission(permission.id, 'can_create', checked === true)
                              }
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox 
                              checked={permission.can_edit}
                              onCheckedChange={(checked) => 
                                handleUpdatePermission(permission.id, 'can_edit', checked === true)
                              }
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox 
                              checked={permission.can_delete}
                              onCheckedChange={(checked) => 
                                handleUpdatePermission(permission.id, 'can_delete', checked === true)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
