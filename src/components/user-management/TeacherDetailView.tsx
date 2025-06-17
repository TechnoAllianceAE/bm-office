
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClassTeacherEndorsement } from './types';

interface TeacherDetailViewProps {
  teacherData: { teacher_name: string; endorsements: ClassTeacherEndorsement[] };
  onBack: () => void;
}

export function TeacherDetailView({ teacherData, onBack }: TeacherDetailViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Class Assignments for {teacherData.teacher_name}</h3>
        <Button onClick={onBack} variant="outline">
          Back to Overview
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Grade</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teacherData.endorsements.map((endorsement) => (
            <TableRow key={endorsement.id}>
              <TableCell>Grade {endorsement.grade}</TableCell>
              <TableCell>Batch {endorsement.batch}</TableCell>
              <TableCell>{new Date(endorsement.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
