
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Eye } from 'lucide-react';
import { ClassTeacherEndorsement } from './types';

interface EndorsementsOverviewProps {
  teacherGroups: Record<string, { teacher_name: string; endorsements: ClassTeacherEndorsement[] }>;
  onViewTeacher: (teacherId: string) => void;
}

export function EndorsementsOverview({ teacherGroups, onViewTeacher }: EndorsementsOverviewProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Class Teacher Endorsements Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(teacherGroups).map(([teacherId, data]) => (
          <div key={teacherId} className="border rounded-lg p-4 space-y-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`} />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {data.teacher_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{data.teacher_name}</h4>
                <p className="text-sm text-muted-foreground truncate">
                  {data.teacher_name.toLowerCase().replace(' ', '.')}@school.com
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{data.endorsements.length} assignments</Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onViewTeacher(teacherId)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
