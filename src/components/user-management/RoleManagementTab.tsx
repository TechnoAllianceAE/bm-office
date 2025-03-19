
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ShieldPlus, Search, Edit, Trash } from 'lucide-react';

// Mock data for roles
const mockRoles = [
  { id: 1, name: 'Admin', description: 'Full access to all systems', userCount: 3 },
  { id: 2, name: 'Manager', description: 'Can manage teams and projects', userCount: 8 },
  { id: 3, name: 'User', description: 'Standard access to applications', userCount: 24 },
  { id: 4, name: 'Guest', description: 'Limited access to view-only resources', userCount: 5 },
];

// Mock data for permissions
const mockApplications = [
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

// Mock permissions for each role
const mockPermissions = {
  'Admin': mockApplications.reduce((acc, app) => ({ ...acc, [app.key]: { view: true, edit: true, create: true, delete: true } }), {}),
  'Manager': mockApplications.reduce((acc, app) => ({ 
    ...acc, 
    [app.key]: { 
      view: true, 
      edit: app.key !== 'settings' && app.key !== 'analytics',
      create: app.key !== 'settings' && app.key !== 'analytics',
      delete: app.key !== 'settings' && app.key !== 'analytics' && app.key !== 'hr'
    } 
  }), {}),
  'User': mockApplications.reduce((acc, app) => ({ 
    ...acc, 
    [app.key]: { 
      view: app.key !== 'settings' && app.key !== 'analytics',
      edit: app.key === 'timesheet' || app.key === 'projects',
      create: app.key === 'timesheet',
      delete: false
    } 
  }), {}),
  'Guest': mockApplications.reduce((acc, app) => ({ 
    ...acc, 
    [app.key]: { 
      view: ['dashboard', 'directory'].includes(app.key),
      edit: false,
      create: false,
      delete: false
    } 
  }), {}),
};

export const RoleManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  
  // Filter roles based on search term
  const filteredRoles = mockRoles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = () => {
    // In a real application, this would call an API to add the role
    console.log('Adding new role:', newRole);
    // Reset form and close dialog
    setNewRole({ name: '', description: '' });
    setIsAddRoleOpen(false);
  };

  const handlePermissionChange = (application: string, permission: string, checked: boolean) => {
    console.log(`Changed ${permission} permission for ${application} to ${checked} for role ${selectedRole}`);
    // In a real app, this would update permissions in your backend
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Roles List */}
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
                <Button size="sm">
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
                  <TableHead className="hidden md:table-cell">Users</TableHead>
                  <TableHead className="w-[60px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow 
                    key={role.id} 
                    className={selectedRole === role.name ? "bg-primary/10" : ""}
                    onClick={() => setSelectedRole(role.name)}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{role.name}</div>
                        <div className="text-xs text-muted-foreground hidden md:block">{role.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{role.userCount}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right side - Permissions Matrix */}
        <div className="lg:w-2/3">
          {selectedRole ? (
            <Card className="bg-card/40 backdrop-blur-md border border-white/10">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Permissions for {selectedRole} Role</h3>
                
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
                      {mockApplications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">{app.name}</TableCell>
                          <TableCell className="text-center">
                            <Switch 
                              checked={mockPermissions[selectedRole][app.key].view}
                              onCheckedChange={(checked) => handlePermissionChange(app.key, 'view', checked)}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch 
                              checked={mockPermissions[selectedRole][app.key].create}
                              onCheckedChange={(checked) => handlePermissionChange(app.key, 'create', checked)}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch 
                              checked={mockPermissions[selectedRole][app.key].edit}
                              onCheckedChange={(checked) => handlePermissionChange(app.key, 'edit', checked)}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch 
                              checked={mockPermissions[selectedRole][app.key].delete}
                              onCheckedChange={(checked) => handlePermissionChange(app.key, 'delete', checked)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button>Save Permissions</Button>
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
