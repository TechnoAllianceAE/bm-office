
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Eye, Phone, Mail, School, User } from 'lucide-react';
import { Student } from './types';

interface StudentListProps {
  students: Student[];
  isLoading: boolean;
  searchTerm: string;
  gradeFilter: string;
  batchFilter: string;
  onViewStudent?: (studentId: string) => void;
}

export function StudentList({ 
  students, 
  isLoading, 
  searchTerm, 
  gradeFilter, 
  batchFilter,
  onViewStudent 
}: StudentListProps) {
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
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Admission No</TableHead>
              <TableHead>Grade/Batch</TableHead>
              <TableHead>School</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Father</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
                    <div className="space-y-1">
                      <div className="h-4 bg-muted rounded w-24 animate-pulse" />
                      <div className="h-3 bg-muted rounded w-32 animate-pulse" />
                    </div>
                  </div>
                </TableCell>
                <TableCell><div className="h-4 bg-muted rounded w-16 animate-pulse" /></TableCell>
                <TableCell><div className="h-4 bg-muted rounded w-20 animate-pulse" /></TableCell>
                <TableCell><div className="h-4 bg-muted rounded w-32 animate-pulse" /></TableCell>
                <TableCell><div className="h-4 bg-muted rounded w-24 animate-pulse" /></TableCell>
                <TableCell><div className="h-4 bg-muted rounded w-20 animate-pulse" /></TableCell>
                <TableCell><div className="h-4 bg-muted rounded w-20 animate-pulse" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Admission No</TableHead>
            <TableHead>Grade/Batch</TableHead>
            <TableHead>School</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Father</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id} className="hover:bg-muted/50">
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.profile_pic} alt={student.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{student.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <Badge variant="outline">{student.admission_no}</Badge>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <Badge variant="secondary">{student.grade}</Badge>
                  <div>
                    <Badge variant="outline" className="text-xs">Batch {student.batch}</Badge>
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="min-w-0">
                  <p className="font-medium truncate">{student.school}</p>
                  <p className="text-xs text-muted-foreground">{student.curriculum}</p>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{student.phone}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-muted-foreground">Age: {student.age}</span>
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <p className="text-sm truncate">{student.father_name}</p>
              </TableCell>
              
              <TableCell>
                <div className="flex space-x-1">
                  {onViewStudent && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onViewStudent(student.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
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
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No students found</h3>
          <p className="text-muted-foreground">No students match your current search criteria.</p>
        </div>
      )}
    </div>
  );
}
