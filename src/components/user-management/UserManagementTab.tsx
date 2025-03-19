
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { User, UserPlus, Search, Filter, MoreHorizontal, Trash, Edit } from 'lucide-react';
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { User as AppUser } from './interfaces';

export const UserManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', password: '', fullName: '', role: 'User' });
  const [editUser, setEditUser] = useState({ id: '', fullName: '', email: '', role: '', status: '' });
  const [users, setUsers] = useState<AppUser[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [currentPage]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      console.log('Fetching users...');
      const { data, error, count } = await supabase
        .from('app_users')
        .select('*', { count: 'exact' })
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error details:', error);
        throw error;
      }
      
      console.log('Users data:', data);
      setUsers(data || []);
      
      if (count) {
        setTotalPages(Math.ceil(count / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load users",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      console.log('Fetching roles...');
      const { data, error } = await supabase
        .from('roles')
        .select('name');

      if (error) {
        console.error('Error fetching roles:', error);
        throw error;
      }
      
      console.log('Roles data:', data);
      if (data) {
        setRoles(data.map(role => role.name));
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load roles",
      });
    }
  };

  const handleAddUser = async () => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "Only administrators can add users",
      });
      return;
    }

    try {
      console.log('Adding user with role:', newUser.role);
      // Sign up user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
        options: {
          data: {
            full_name: newUser.fullName,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        console.log('User created in auth:', authData.user);
        
        // Check if app_users entry already exists (should be created by trigger)
        const { data: existingUser, error: checkError } = await supabase
          .from('app_users')
          .select('*')
          .eq('user_id', authData.user.id)
          .maybeSingle();

        if (checkError) throw checkError;
        
        if (existingUser) {
          console.log('User exists in app_users, updating role:', newUser.role);
          // Update the role if user exists
          const { error: updateError } = await supabase
            .from('app_users')
            .update({ role: newUser.role })
            .eq('user_id', authData.user.id);

          if (updateError) throw updateError;
        } else {
          console.log('User does not exist in app_users, creating entry with role:', newUser.role);
          // Create app_users entry manually if trigger didn't work
          const { error: insertError } = await supabase
            .from('app_users')
            .insert({
              user_id: authData.user.id,
              full_name: newUser.fullName,
              email: newUser.email,
              role: newUser.role,
              status: 'Active'
            });

          if (insertError) throw insertError;
        }

        toast({
          title: "Success",
          description: "User created successfully",
        });
        
        fetchUsers();
      }
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message || "Failed to create user",
      });
    } finally {
      setNewUser({ email: '', password: '', fullName: '', role: 'User' });
      setIsAddUserOpen(false);
    }
  };

  const handleEditUser = async () => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "Only administrators can edit users",
      });
      return;
    }

    try {
      console.log('Updating user:', editUser);
      const { error } = await supabase
        .from('app_users')
        .update({ 
          full_name: editUser.fullName,
          role: editUser.role,
          status: editUser.status
        })
        .eq('id', editUser.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User updated successfully",
      });
      
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user",
      });
    } finally {
      setIsEditUserOpen(false);
    }
  };

  const handleDeleteUser = async (userId: string, userAuthId: string | null) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "Only administrators can delete users",
      });
      return;
    }

    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      console.log('Deleting user with ID:', userId, 'Auth ID:', userAuthId);
      
      // Delete from app_users first
      const { error: appUserError } = await supabase
        .from('app_users')
        .delete()
        .eq('id', userId);
      
      if (appUserError) throw appUserError;
      
      // If we have an auth ID, try to delete from auth.users
      if (userAuthId) {
        // Note: This usually requires admin privileges or service role
        // Using admin API directly may not work with regular client
        console.log('Auth user deletion would require admin API');
      }

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user",
      });
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center w-full sm:w-auto relative">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8 bg-background/50 backdrop-blur-sm w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button size="sm" disabled={!isAdmin}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-card/90 backdrop-blur-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account and assign a role.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fullName" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                    className="col-span-3 bg-background/50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="col-span-3 bg-background/50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="col-span-3 bg-background/50"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value) => setNewUser({...newUser, role: value})}
                  >
                    <SelectTrigger className="col-span-3 bg-background/50">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.length > 0 ? (
                        roles.map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))
                      ) : (
                        <SelectItem value="User">User</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>
                  Add User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border bg-card/40 backdrop-blur-md border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.full_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                      user.role === 'Admin' 
                        ? 'bg-blue-100 text-blue-800' 
                        : user.role === 'Manager' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        disabled={!isAdmin}
                        onClick={() => {
                          setEditUser({
                            id: user.id,
                            fullName: user.full_name,
                            email: user.email,
                            role: user.role,
                            status: user.status
                          });
                          setIsEditUserOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        disabled={!isAdmin}
                        onClick={() => handleDeleteUser(user.id, user.user_id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PaginationItem key={page}>
                <PaginationLink 
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card/90 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and role.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-fullName" className="text-right">
                Full Name
              </Label>
              <Input
                id="edit-fullName"
                value={editUser.fullName}
                onChange={(e) => setEditUser({...editUser, fullName: e.target.value})}
                className="col-span-3 bg-background/50"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={editUser.email}
                disabled
                className="col-span-3 bg-background/50"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-role" className="text-right">
                Role
              </Label>
              <Select
                value={editUser.role}
                onValueChange={(value) => setEditUser({...editUser, role: value})}
              >
                <SelectTrigger className="col-span-3 bg-background/50">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.length > 0 ? (
                    roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))
                  ) : (
                    <>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <Select
                value={editUser.status}
                onValueChange={(value) => setEditUser({...editUser, status: value})}
              >
                <SelectTrigger className="col-span-3 bg-background/50">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
