
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User, Role } from './types';
import { UserSearch } from './UserSearch';
import { UserList } from './UserList';
import { UserPagination } from './UserPagination';
import { AddUserDialog } from './AddUserDialog';

export function UserManagementTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, [currentPage]);

  const fetchRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('roles')
        .select('id, name');
      
      if (error) {
        console.error('Error fetching roles:', error);
        toast.error('Failed to load roles', { description: error.message });
        return;
      }
      
      console.log('Roles fetched successfully:', data);
      setAvailableRoles(data || []);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Failed to load roles');
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { count, error: countError } = await supabase
        .from('app_users')
        .select('*', { count: 'exact', head: true });
      
      if (countError) {
        throw countError;
      }
      
      if (count !== null) {
        setTotalPages(Math.ceil(count / pageSize));
      }
      
      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;
      
      const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) {
        throw error;
      }
      
      setUsers(data as User[]);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <UserSearch 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchUsers} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <AddUserDialog 
            availableRoles={availableRoles} 
            onUserAdded={fetchUsers} 
          />
        </div>
      </div>
      
      <UserList 
        users={users} 
        isLoading={isLoading} 
        searchTerm={searchTerm} 
      />
      
      <UserPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        isLoading={isLoading} 
        setCurrentPage={setCurrentPage} 
      />
    </div>
  );
}
