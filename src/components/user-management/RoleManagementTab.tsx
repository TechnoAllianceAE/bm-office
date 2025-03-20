
import { useState, useEffect } from 'react';
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
  };

  const fetchPermissions = async (roleId: string) => {

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
