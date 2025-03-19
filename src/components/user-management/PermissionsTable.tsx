
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Permission, Role } from './types';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface PermissionsTableProps {
  selectedRole: Role | null;
  permissions: Permission[];
  isLoading: boolean;
  fetchPermissions: (roleId: string) => void;
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

export function PermissionsTable({ 
  selectedRole, 
  permissions, 
  isLoading, 
  fetchPermissions 
}: PermissionsTableProps) {
  const handleUpdatePermission = async (permissionId: string, field: string, value: boolean) => {
    try {
      const { error } = await supabase
        .from('permissions')
        .update({ [field]: value })
        .eq('id', permissionId);
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating permission:', error);
      throw error;
    }
  };

  return (
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
  );
}
