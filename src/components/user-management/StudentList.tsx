
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { Student } from './types';

interface StudentListProps {
  students: Student[];
  isLoading: boolean;
  searchTerm: string;
  gradeFilter: string;
  batchFilter: string;
}

export function StudentList({ students, isLoading, searchTerm, gradeFilter, batchFilter }: StudentListProps) {
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admission_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.father_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = !gradeFilter || gradeFilter === 'all-grades' || student.grade === gradeFilter;
    const matchesBatch = !batchFilter || batchFilter === 'all-batches' || student.batch === batchFilter;
    
    return matchesSearch && matchesGrade && matchesBatch;
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded" />
        ))}
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Admission No</TableHead>
            <TableHead>Father Name</TableHead>
            <TableHead>Grade/Batch</TableHead>
            <TableHead>School</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.profile_pic} alt={student.name} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">{student.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{student.admission_no}</Badge>
              </TableCell>
              <TableCell>{student.father_name}</TableCell>
              <TableCell>
                <div className="flex flex-col space-y-1">
                  <Badge variant="secondary">{student.grade}</Badge>
                  <Badge variant="outline">Batch {student.batch}</Badge>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{student.school}</div>
                  <div className="text-muted-foreground">{student.curriculum}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{student.phone}</div>
                  <div className="text-muted-foreground">Age: {student.age}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {filteredStudents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No students found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
