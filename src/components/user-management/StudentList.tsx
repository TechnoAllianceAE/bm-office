
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-4 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-muted rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <div key={student.id} className="border rounded-lg p-4 space-y-4 hover:shadow-lg transition-shadow bg-card">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={student.profile_pic} alt={student.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {student.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{student.name}</h4>
                <p className="text-sm text-muted-foreground truncate">{student.email}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Admission No:</span>
                <Badge variant="outline">{student.admission_no}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Grade/Batch:</span>
                <div className="flex gap-1">
                  <Badge variant="secondary">{student.grade}</Badge>
                  <Badge variant="outline">Batch {student.batch}</Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <School className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{student.school}</p>
                  <p className="text-xs text-muted-foreground">{student.curriculum}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">Father: {student.father_name}</p>
                  <p className="text-xs text-muted-foreground">Age: {student.age}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{student.phone}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 border-t">
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
              <Badge variant="outline" className="text-xs">
                {new Date(student.created_at).toLocaleDateString()}
              </Badge>
            </div>
          </div>
        ))}
      </div>
      
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
