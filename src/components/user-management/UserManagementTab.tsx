
import { useState, useEffect } from 'react';
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
      // Mock roles data for now
      const mockRoles: Role[] = [
        {
          id: "1",
          name: "Admin",
          description: "Administrator with full access",
          created_at: new Date().toISOString()
        },
        {
          id: "2",
          name: "User",
          description: "Regular user with limited access",
          created_at: new Date().toISOString()
        },
        {
          id: "3",
          name: "Manager",
          description: "Department manager with team access",
          created_at: new Date().toISOString()
        }
      ];
      
      setAvailableRoles(mockRoles);
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Failed to load roles");
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Mock users data for now
      const mockUsers: User[] = [
        {
          id: "1",
          full_name: "John Doe",
          email: "john.doe@example.com",
          role: "Admin",
          status: "Active",
          last_login: new Date().toISOString(),
          created_at: new Date().toISOString()
        },
        {
          id: "2",
          full_name: "Jane Smith",
          email: "jane.smith@example.com",
          role: "User",
          status: "Active",
          last_login: new Date().toISOString(),
          created_at: new Date().toISOString()
        },
        {
          id: "3",
          full_name: "Mike Johnson",
          email: "mike.johnson@example.com",
          role: "Manager",
          status: "Inactive",
          last_login: null,
          created_at: new Date().toISOString()
        }
      ];
      
      setUsers(mockUsers);
      setTotalPages(Math.ceil(mockUsers.length / pageSize));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
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
