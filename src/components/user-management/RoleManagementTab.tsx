
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ShieldPlus, Search, Edit, Trash, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

// Define types for our data structures
interface Role {
  id: string;
  name: string;
  description: string | null;
}

interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  id?: string;
}

interface PermissionsObject {
  [key: string]: Permission;
}

export const RoleManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [roles, setRoles] = useState<Role[]>([]);
  const [applications, setApplications] = useState<{id: number; name: string; key: string}[]>([]);
  const [permissions, setPermissions] = useState<PermissionsObject>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  
  useEffect(() => {
    fetchRoles();
    fetchApplications();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      fetchPermissions(selectedRole.id);
    }
  }, [selectedRole]);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .order('name');

      if (error) throw error;
      
      setRoles(data || []);
      
      if (!selectedRole && data && data.length > 0) {
        setSelectedRole(data[0]);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load roles",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    const appList = [
      { id: 1, name: 'Dashboard', key: 'dashboard' },
      { id: 2, name: 'Timesheet', key: 'timesheet' },
      { id: 3, name: 'Projects', key: 'projects' },
      { id: 4, name: 'HR Portal', key: 'hr' },
      { id: 5, name: 'Directory', key: 'directory' },
      { id: 6, name: 'Mailbox', key: 'mailbox' },
      { id: 7, name: 'AI Assistant', key: 'ai-assistant' },
      { id: 8, name: 'DMS', key: 'dms' },
      { id: 9, name: 'Analytics', key: 'analytics' },
      { id: 10, name: 'Settings', key: 'settings' },
    ];
    setApplications(appList);
  };

  const fetchPermissions = async (roleId: string) => {
    try {
      const { data, error } = await supabase
        .from('permissions')
        .select('*')
        .eq('role_id', roleId);

      if (error) throw error;
      
      const permObj: PermissionsObject = {};
      data.forEach(perm => {
        permObj[perm.application] = {
          view: perm.can_view || false,
          create: perm.can_create || false,
          edit: perm.can_edit || false,
          delete: perm.can_delete || false,
          id: perm.id
        };
      });
      
      setPermissions(permObj);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load permissions",
      });
    }
  };

  const fetchRoleUserCount = async (roleId: string) => {
    try {
      const { count, error } = await supabase
        .from('app_users')
        .select('id', { count: 'exact' })
        .eq('role', roleId);

      if (error) throw error;
      
      return count || 0;
    } catch (error) {
      console.error('Error counting users by role:', error);
      return 0;
    }
  };

  const handleAddRole = async () => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "Only administrators can add roles",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('roles')
        .insert([{ 
          name: newRole.name,
          description: newRole.description
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Role created successfully",
      });
      
      await fetchRoles();
      
      if (data) {
        setSelectedRole(data);
      }
    } catch (error: any) {
      console.error('Error adding role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create role",
      });
    } finally {
      setNewRole({ name: '', description: '' });
      setIsAddRoleOpen(false);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "Only administrators can delete roles",
      });
      return;
    }

    if (!confirm("Are you sure you want to delete this role? All associated permissions will also be deleted.")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('roles')
        .delete()
        .eq('id', roleId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Role deleted successfully",
      });
      
      await fetchRoles();
      
      if (selectedRole && selectedRole.id === roleId) {
        setSelectedRole(null);
      }
    } catch (error) {
      console.error('Error deleting role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete role",
      });
    }
  };

  const handlePermissionChange = (application: string, permissionType: keyof Permission, checked: boolean) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "Only administrators can modify permissions",
      });
      return;
    }

    if (!selectedRole) return;

    setPermissions(prev => {
      const newPermissions = { ...prev };
      
      if (!newPermissions[application]) {
        newPermissions[application] = {
          view: false,
          create: false,
          edit: false,
          delete: false
        };
      }
      
      newPermissions[application][permissionType] = checked;
      return newPermissions;
    });
  };

  const savePermissions = async () => {
    if (!isAdmin || !selectedRole) return;
    
    setSaving(true);
    
    try {
      const permissionsToUpsert = Object.entries(permissions).map(([app, perms]) => ({
        role_id: selectedRole.id,
        application: app,
        can_view: perms.view,
        can_create: perms.create,
        can_edit: perms.edit,
        can_delete: perms.delete,
        id: perms.id
      }));
      
      const { error } = await supabase
        .from('permissions')
        .upsert(permissionsToUpsert, { 
          onConflict: 'role_id,application',
          ignoreDuplicates: false
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Permissions saved successfully",
      });
      
      fetchPermissions(selectedRole.id);
    } catch (error) {
      console.error('Error saving permissions:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save permissions",
      });
    } finally {
      setSaving(false);
    }
  };

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (role.description && role.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
                className="pl-8 bg-background/50 backdrop-blur-sm w-full sm:w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
              <DialogTrigger asChild>
                <Button size="sm" disabled={!isAdmin}>
                  <ShieldPlus className="h-4 w-4 mr-2" />
                  Add Role
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-card/90 backdrop-blur-md">
                <DialogHeader>
                  <DialogTitle>Add New Role</DialogTitle>
                  <DialogDescription>
                    Create a new role with custom permissions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="roleName" className="text-right">
                      Role Name
                    </Label>
                    <Input
                      id="roleName"
                      value={newRole.name}
                      onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                      className="col-span-3 bg-background/50"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      value={newRole.description}
                      onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                      className="col-span-3 bg-background/50"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddRoleOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddRole}>
                    Create Role
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border bg-card/40 backdrop-blur-md border-white/10 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead className="w-[60px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => (
                    <TableRow 
                      key={role.id} 
                      className={selectedRole && selectedRole.id === role.id ? "bg-primary/10" : ""}
                      onClick={() => setSelectedRole(role)}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium">{role.name}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            disabled={!isAdmin}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Edit role functionality would go here
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            disabled={!isAdmin || role.name === 'Admin'}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteRole(role.id);
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                      No roles found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="lg:w-2/3">
          {selectedRole ? (
            <Card className="bg-card/40 backdrop-blur-md border border-white/10">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Permissions for {selectedRole.name} Role</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={savePermissions}
                    disabled={saving || !isAdmin}
                  >
                    {saving ? 'Saving...' : 'Save Permissions'}
                    {!saving && <Check className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="rounded-md border bg-card/40 backdrop-blur-md border-white/10 overflow-hidden">
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
                      {applications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">{app.name}</TableCell>
                          <TableCell className="text-center">
                            <Switch 
                              checked={permissions[app.key]?.view || false}
                              onCheckedChange={(checked) => handlePermissionChange(app.key, 'view', checked)}
                              disabled={!isAdmin}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch 
                              checked={permissions[app.key]?.create || false}
                              onCheckedChange={(checked) => handlePermissionChange(app.key, 'create', checked)}
                              disabled={!isAdmin}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch 
                              checked={permissions[app.key]?.edit || false}
                              onCheckedChange={(checked) => handlePermissionChange(app.key, 'edit', checked)}
                              disabled={!isAdmin}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch 
                              checked={permissions[app.key]?.delete || false}
                              onCheckedChange={(checked) => handlePermissionChange(app.key, 'delete', checked)}
                              disabled={!isAdmin}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full border rounded-md border-dashed p-8 bg-card/20 backdrop-blur-sm">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">No Role Selected</h3>
                <p className="text-muted-foreground">Select a role from the list to view and edit its permissions.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
