
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Role, Permission } from './types';
import { UserSearch } from './UserSearch';
import { RoleList } from './RoleList';
import { PermissionsTable } from './PermissionsTable';
import { AddRoleDialog } from './AddRoleDialog';

export function RoleManagementTab() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
      const applications = [
        'Dashboard', 'Timesheet', 'Projects', 'Calendar', 'HR', 'Directory', 
        'Mailbox', 'AI Assistant', 'AI Workflow', 'DMS', 'Tools', 'Analytics', 
        'MIS', 'Requisition', 'Help Desk', 'LMS', 'Claims', 'User Management'
      ];
      
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <UserSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchRoles} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <AddRoleDialog fetchRoles={fetchRoles} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side - Roles list */}
        <RoleList 
          roles={roles}
          isLoading={isLoading}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          fetchRoles={fetchRoles}
          searchTerm={searchTerm}
        />
        
        {/* Right side - Permissions */}
        <PermissionsTable 
          selectedRole={selectedRole}
          permissions={permissions}
          isLoading={isLoading}
          fetchPermissions={fetchPermissions}
        />
      </div>
    </div>
  );
}
