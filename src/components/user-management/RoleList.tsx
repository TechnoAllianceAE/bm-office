
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Role } from './types';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoleListProps {
  roles: Role[];
  isLoading: boolean;
  selectedRole: Role | null;
  setSelectedRole: (role: Role) => void;
  fetchRoles: () => void;
  searchTerm: string;
}

export function RoleList({ 
  roles, 
  isLoading, 
  selectedRole, 
  setSelectedRole, 
  fetchRoles,
  searchTerm
}: RoleListProps) {
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (role.description && role.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  return (
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
  );
}
