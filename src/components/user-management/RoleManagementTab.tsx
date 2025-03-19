
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Plus, X, Check, Trash, Edit, RefreshCw } from 'lucide-react';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Role, Application, Permission, PermissionRecord, PermissionsMap } from './interfaces';

export const RoleManagementTab = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [applications, setApplications] = useState<Application[]>([
    { name: 'Dashboard', description: 'Main dashboard access' },
    { name: 'Users', description: 'User management' },
    { name: 'Projects', description: 'Project management' },
    { name: 'Reports', description: 'Reports and analytics' },
    { name: 'Settings', description: 'System settings' },
  ]);
  
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [editRole, setEditRole] = useState({ id: '', name: '', description: '' });
  const [permissions, setPermissions] = useState<PermissionsMap>({});
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchRoles();
  }, []);
  
  useEffect(() => {
    if (selectedRole) {
      fetchPermissions(selectedRole.id);
    }
  }, [selectedRole]);
  
  const fetchRoles = async () => {
    setLoading(true);
    try {
      console.log('Fetching roles...');
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .order('name');
        
      if (error) {
        console.error('Error details:', error);
        throw error;
      }
      
      console.log('Roles data:', data);
      setRoles(data || []);
      
      // Select the first role by default
      if (data && data.length > 0 && !selectedRole) {
        setSelectedRole(data[0]);
      } else if (data && data.length === 0) {
        // Create default roles if none exist
        await createDefaultRoles();
      }
    } catch (error: any) {
      console.error('Error fetching roles:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to load roles",
      });
    } finally {
      setLoading(false);
    }
  };

  const createDefaultRoles = async () => {
    try {
      // Create Admin role
      const { data: adminRole, error: adminError } = await supabase
        .from('roles')
        .insert({ name: 'Admin', description: 'Full system access' })
        .select()
        .single();
        
      if (adminError) throw adminError;

      // Create User role
      const { data: userRole, error: userError } = await supabase
        .from('roles')
        .insert({ name: 'User', description: 'Basic user access' })
        .select()
        .single();
        
      if (userError) throw userError;

      console.log('Created default roles');
      
      // Fetch roles again
      fetchRoles();
      
    } catch (error: any) {
      console.error('Error creating default roles:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create default roles",
      });
    }
  };
  
  const fetchPermissions = async (roleId: string) => {
    try {
      console.log('Fetching permissions for role:', roleId);
      const { data, error } = await supabase
        .from('permissions')
        .select('*')
        .eq('role_id', roleId);
        
      if (error) {
        console.error('Error details:', error);
        throw error;
      }
      
      console.log('Permissions data:', data);
      
      // Convert the permissions data to the format we need
      const permissionsMap: PermissionsMap = {};
      
      // Initialize permissions for all applications
      applications.forEach(app => {
        permissionsMap[app.name] = {
          view: false,
          create: false,
          edit: false,
          delete: false
        };
      });
      
      // Update permissions based on data from database
      (data as PermissionRecord[]).forEach(permission => {
        permissionsMap[permission.application] = {
          view: Boolean(permission.can_view),
          create: Boolean(permission.can_create),
          edit: Boolean(permission.can_edit),
          delete: Boolean(permission.can_delete)
        };
      });
      
      setPermissions(permissionsMap);
    } catch (error: any) {
      console.error('Error fetching permissions:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to load permissions",
      });
    }
  };
  
  const handleAddRole = async () => {
    try {
      console.log('Adding role:', newRole);
      const { data, error } = await supabase
        .from('roles')
        .insert([{ name: newRole.name, description: newRole.description }])
        .select()
        .single();
        
      if (error) {
        console.error('Error details:', error);
        throw error;
      }
      
      console.log('Role added:', data);
      
      // Add new role to the list
      setRoles([...roles, data]);
      
      // Select the new role
      setSelectedRole(data);
      
      // Reset the form
      setNewRole({ name: '', description: '' });
      
      toast({
        title: "Success",
        description: "Role added successfully",
      });
    } catch (error: any) {
      console.error('Error adding role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add role",
      });
    } finally {
      setIsAddRoleOpen(false);
    }
  };
  
  const handleEditRole = async () => {
    try {
      console.log('Editing role:', editRole);
      const { error } = await supabase
        .from('roles')
        .update({
          name: editRole.name,
          description: editRole.description
        })
        .eq('id', editRole.id);
        
      if (error) {
        console.error('Error details:', error);
        throw error;
      }
      
      // Update the roles list
      setRoles(roles.map(role => 
        role.id === editRole.id 
          ? { ...role, name: editRole.name, description: editRole.description }
          : role
      ));
      
      // Update the selected role if it's the one being edited
      if (selectedRole && selectedRole.id === editRole.id) {
        setSelectedRole({
          ...selectedRole,
          name: editRole.name,
          description: editRole.description
        });
      }
      
      toast({
        title: "Success",
        description: "Role updated successfully",
      });
    } catch (error: any) {
      console.error('Error updating role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update role",
      });
    } finally {
      setIsEditRoleOpen(false);
    }
  };
  
  const handleDeleteRole = async (roleId: string) => {
    if (confirm("Are you sure you want to delete this role? This will affect users assigned this role.")) {
      try {
        console.log('Deleting role:', roleId);
        const { error } = await supabase
          .from('roles')
          .delete()
          .eq('id', roleId);
          
        if (error) {
          console.error('Error details:', error);
          throw error;
        }
        
        // Remove the role from the list
        const updatedRoles = roles.filter(role => role.id !== roleId);
        setRoles(updatedRoles);
        
        // If the deleted role was selected, select the first available role or null
        if (selectedRole && selectedRole.id === roleId) {
          setSelectedRole(updatedRoles.length > 0 ? updatedRoles[0] : null);
        }
        
        toast({
          title: "Success",
          description: "Role deleted successfully",
        });
      } catch (error: any) {
        console.error('Error deleting role:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to delete role",
        });
      }
    }
  };
  
  const handlePermissionChange = async (application: string, permissionType: keyof Permission, value: boolean) => {
    if (!selectedRole) return;
    
    // Update local state first for responsive UI
    setPermissions({
      ...permissions,
      [application]: {
        ...permissions[application],
        [permissionType]: value
      }
    });
    
    // Prepare data for upsert
    const permissionData = {
      role_id: selectedRole.id,
      application: application,
      can_view: permissionType === 'view' ? value : permissions[application].view,
      can_create: permissionType === 'create' ? value : permissions[application].create,
      can_edit: permissionType === 'edit' ? value : permissions[application].edit,
      can_delete: permissionType === 'delete' ? value : permissions[application].delete
    };
    
    try {
      console.log('Updating permission:', permissionData);
      // Check if a permission record already exists
      const { data, error: fetchError } = await supabase
        .from('permissions')
        .select('id')
        .eq('role_id', selectedRole.id)
        .eq('application', application);
        
      if (fetchError) {
        console.error('Error checking permission:', fetchError);
        throw fetchError;
      }
      
      if (data && data.length > 0) {
        // Update existing permission
        const { error: updateError } = await supabase
          .from('permissions')
          .update({
            can_view: permissionData.can_view,
            can_create: permissionData.can_create,
            can_edit: permissionData.can_edit,
            can_delete: permissionData.can_delete
          })
          .eq('id', data[0].id);
          
        if (updateError) {
          console.error('Error updating permission:', updateError);
          throw updateError;
        }
      } else {
        // Insert new permission
        const { error: insertError } = await supabase
          .from('permissions')
          .insert([permissionData]);
          
        if (insertError) {
          console.error('Error inserting permission:', insertError);
          throw insertError;
        }
      }
    } catch (error: any) {
      console.error('Error updating permission:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update permission",
      });
      
      // Revert the local state change
      fetchPermissions(selectedRole.id);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Roles & Permissions</h3>
          <p className="text-sm text-muted-foreground">
            Manage roles and set permissions for different applications
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchRoles}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
            <DialogTrigger asChild>
              <Button size="sm" disabled={!isAdmin}>
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-card/90 backdrop-blur-md">
              <DialogHeader>
                <DialogTitle>Add New Role</DialogTitle>
                <DialogDescription>
                  Create a new role and define its permissions.
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
                  <Label htmlFor="roleDescription" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="roleDescription"
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
                <Button onClick={handleAddRole} disabled={!newRole.name}>
                  Add Role
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card/40 backdrop-blur-md border border-white/10 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Available Roles</h4>
            {loading && <p className="text-xs text-muted-foreground">Loading...</p>}
          </div>
          
          {roles.length > 0 ? (
            <div className="space-y-2">
              {roles.map(role => (
                <div 
                  key={role.id}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
                    selectedRole?.id === role.id 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'hover:bg-muted/60'
                  }`}
                  onClick={() => setSelectedRole(role)}
                >
                  <div>
                    <div className="font-medium">{role.name}</div>
                    {role.description && (
                      <div className="text-xs text-muted-foreground">{role.description}</div>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      disabled={!isAdmin}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditRole({
                          id: role.id,
                          name: role.name,
                          description: role.description || ''
                        });
                        setIsEditRoleOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      disabled={!isAdmin || role.name === 'Admin' || role.name === 'User'} // Prevent deletion of default roles
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRole(role.id);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              {loading ? 'Loading roles...' : 'No roles found. Create a new role to get started.'}
            </div>
          )}
        </div>
        
        <div className="lg:col-span-2 bg-card/40 backdrop-blur-md border border-white/10 rounded-lg p-4">
          <h4 className="font-medium mb-4">
            {selectedRole ? `Permissions for ${selectedRole.name}` : 'Select a role to manage permissions'}
          </h4>
          
          {selectedRole ? (
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
                  <TableRow key={app.name}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{app.name}</div>
                        <div className="text-xs text-muted-foreground">{app.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch 
                        checked={permissions[app.name]?.view || false} 
                        onCheckedChange={(value) => handlePermissionChange(app.name, 'view', value)}
                        disabled={!isAdmin}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch 
                        checked={permissions[app.name]?.create || false} 
                        onCheckedChange={(value) => handlePermissionChange(app.name, 'create', value)}
                        disabled={!isAdmin}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch 
                        checked={permissions[app.name]?.edit || false} 
                        onCheckedChange={(value) => handlePermissionChange(app.name, 'edit', value)}
                        disabled={!isAdmin}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch 
                        checked={permissions[app.name]?.delete || false} 
                        onCheckedChange={(value) => handlePermissionChange(app.name, 'delete', value)}
                        disabled={!isAdmin}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              Select a role from the list to manage its permissions
            </div>
          )}
        </div>
      </div>
      
      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card/90 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Update the role name and description.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editRoleName" className="text-right">
                Role Name
              </Label>
              <Input
                id="editRoleName"
                value={editRole.name}
                onChange={(e) => setEditRole({...editRole, name: e.target.value})}
                className="col-span-3 bg-background/50"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editRoleDescription" className="text-right">
                Description
              </Label>
              <Input
                id="editRoleDescription"
                value={editRole.description}
                onChange={(e) => setEditRole({...editRole, description: e.target.value})}
                className="col-span-3 bg-background/50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditRole} disabled={!editRole.name}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
