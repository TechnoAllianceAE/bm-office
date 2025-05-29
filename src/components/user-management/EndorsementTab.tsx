
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TeacherEndorsementSection } from './TeacherEndorsementSection';
import { HODEndorsementSection } from './HODEndorsementSection';
import { HOSEndorsementSection } from './HOSEndorsementSection';
import { Users, GraduationCap, UserCheck } from 'lucide-react';

export function EndorsementTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Staff Endorsement</h2>
        <p className="text-muted-foreground">
          Manage teacher, HOD, and HOS endorsements for subjects and responsibilities
        </p>
      </div>
      
      <Tabs defaultValue="teacher" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="teacher">
            <Users className="h-4 w-4 mr-2" />
            Teacher Endorsement
          </TabsTrigger>
          <TabsTrigger value="hod">
            <GraduationCap className="h-4 w-4 mr-2" />
            HOD Endorsement
          </TabsTrigger>
          <TabsTrigger value="hos">
            <UserCheck className="h-4 w-4 mr-2" />
            HOS Endorsement
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="teacher" className="mt-6">
          <TeacherEndorsementSection />
        </TabsContent>
        
        <TabsContent value="hod" className="mt-6">
          <HODEndorsementSection />
        </TabsContent>
        
        <TabsContent value="hos" className="mt-6">
          <HOSEndorsementSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
