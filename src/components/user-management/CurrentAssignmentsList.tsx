
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';

interface ClassTeacherAssignment {
  teacher_id: string;
  teacher_name: string;
  grade: string;
  batch: string;
}

interface CurrentAssignmentsListProps {
  assignments: ClassTeacherAssignment[];
  onRemoveAssignment: (index: number) => void;
  onEndorse: () => void;
}

export function CurrentAssignmentsList({ assignments, onRemoveAssignment, onEndorse }: CurrentAssignmentsListProps) {
  if (assignments.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Current Assignments</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead className="w-20">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((assignment, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{assignment.teacher_name}</TableCell>
              <TableCell>Grade {assignment.grade}</TableCell>
              <TableCell>Batch {assignment.batch}</TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onRemoveAssignment(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Button onClick={onEndorse} className="w-full">
        Endorse All Class Teacher Assignments
      </Button>
    </div>
  );
}
