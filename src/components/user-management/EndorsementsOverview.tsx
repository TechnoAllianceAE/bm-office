
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher Name</TableHead>
            <TableHead>Endorsement Count</TableHead>
            <TableHead className="w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(teacherGroups).map(([teacherId, data]) => (
            <TableRow key={teacherId}>
              <TableCell className="font-medium">{data.teacher_name}</TableCell>
              <TableCell>
                <Badge variant="secondary">{data.endorsements.length} assignments</Badge>
              </TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewTeacher(teacherId)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
