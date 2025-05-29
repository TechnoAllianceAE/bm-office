import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/common/Card';
import { UserManagementTab } from '@/components/user-management/UserManagementTab';
import { RoleManagementTab } from '@/components/user-management/RoleManagementTab';
import { SecuritySettingsTab } from '@/components/user-management/SecuritySettingsTab';
import { StudentManagementTab } from '@/components/user-management/StudentManagementTab';
import { ParentManagementTab } from '@/components/user-management/ParentManagementTab';
import { EndorsementTab } from '@/components/user-management/EndorsementTab';
import { Users, ShieldCheck, Lock, GraduationCap, UserCheck, Award } from 'lucide-react';

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">User Management</h1>
        <p className="text-muted-foreground">
          Manage users, students, parents, roles, permissions, and security settings
        </p>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList className="mb-6 bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="students">
            <GraduationCap className="h-4 w-4 mr-2" />
            Students
          </TabsTrigger>
          <TabsTrigger value="parents">
            <UserCheck className="h-4 w-4 mr-2" />
            Parents
          </TabsTrigger>
          <TabsTrigger value="endorsement">
            <Award className="h-4 w-4 mr-2" />
            Endorsement
          </TabsTrigger>
          <TabsTrigger value="roles">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Security Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <UserManagementTab />
          </Card>
        </TabsContent>
        
        <TabsContent value="students">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <StudentManagementTab />
          </Card>
        </TabsContent>
        
        <TabsContent value="parents">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <ParentManagementTab />
          </Card>
        </TabsContent>
        
        <TabsContent value="endorsement">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <EndorsementTab />
          </Card>
        </TabsContent>
        
        <TabsContent value="roles">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <RoleManagementTab />
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <SecuritySettingsTab />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
