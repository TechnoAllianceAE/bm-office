
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserManagementTab } from '@/components/user-management/UserManagementTab';
import { RoleManagementTab } from '@/components/user-management/RoleManagementTab';
import { SecuritySettingsTab } from '@/components/user-management/SecuritySettingsTab';
import { Shield } from 'lucide-react';

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-semibold">User Management</h1>
      </div>
      <p className="text-muted-foreground">
        Manage users, roles, and security policies for your organization.
      </p>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card className="bg-card/40 backdrop-blur-md border border-white/10">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View, add, edit, and delete users. Assign users to different roles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserManagementTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card className="bg-card/40 backdrop-blur-md border border-white/10">
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>
                Manage roles and set access permissions for different applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoleManagementTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-card/40 backdrop-blur-md border border-white/10">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure password policies and SSO integration settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SecuritySettingsTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
