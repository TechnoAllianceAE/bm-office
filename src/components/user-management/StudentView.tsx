
import { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Student } from './types';

interface StudentViewProps {
  studentId: string;
  onBack: () => void;
}

export function StudentView({ studentId, onBack }: StudentViewProps) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, [studentId]);

  const fetchStudent = async () => {
    setIsLoading(true);
    try {
      // Mock student data - in real app, fetch by ID
      const mockStudent: Student = {
        id: studentId,
        admission_no: "ADM001",
        name: "John Smith",
        address: "123 Main St, Springfield, State 12345",
        phone: "+1 (555) 123-4567",
        father_name: "Robert Smith",
        email: "john.smith@student.com",
        school: "Springfield High School",
        gender: "Male",
        session: "2024-25",
        curriculum: "CBSE",
        grade: "10th",
        batch: "A",
        age: 16,
        profile_pic: "https://i.pravatar.cc/150?img=1",
        created_at: new Date().toISOString()
      };
      
      setStudent(mockStudent);
    } catch (error) {
      console.error("Error fetching student:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="h-64 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Student not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Students
        </Button>
        
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{student.name}</h2>
          <p className="text-muted-foreground">Student Details</p>
        </div>
        
        <Button variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit Student
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-center space-y-4">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarImage src={student.profile_pic} alt={student.name} />
              <AvatarFallback className="text-2xl">{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="text-xl font-semibold">{student.name}</h3>
              <Badge variant="outline" className="mt-2">{student.admission_no}</Badge>
            </div>
          </div>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="text-sm">{student.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Father's Name</label>
                <p className="text-sm">{student.father_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Gender</label>
                <p className="text-sm">{student.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Age</label>
                <p className="text-sm">{student.age} years</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{student.address}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">School</label>
                <p className="text-sm">{student.school}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Session</label>
                <p className="text-sm">{student.session}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Curriculum</label>
                <p className="text-sm">{student.curriculum}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Grade & Batch</label>
                <div className="flex gap-2">
                  <Badge variant="secondary">{student.grade}</Badge>
                  <Badge variant="outline">Batch {student.batch}</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
