
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Student } from './types';

interface Subject {
  id: string;
  name: string;
  code: string;
}

export function StudentSubjectEndorsement() {
  const [selectedGrade, setSelectedGrade] = useState('all-grades');
  const [selectedBatch, setSelectedBatch] = useState('all-batches');
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const batches = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedGrade !== 'all-grades' || selectedBatch !== 'all-batches') {
      fetchStudents();
    } else {
      setStudents([]);
    }
  }, [selectedGrade, selectedBatch]);

  const fetchSubjects = async () => {
    try {
      // Mock subjects data
      const mockSubjects: Subject[] = [
        { id: '1', name: 'Mathematics', code: 'MATH' },
        { id: '2', name: 'English', code: 'ENG' },
        { id: '3', name: 'Science', code: 'SCI' },
        { id: '4', name: 'Social Studies', code: 'SS' },
        { id: '5', name: 'Hindi', code: 'HIN' },
        { id: '6', name: 'Computer Science', code: 'CS' }
      ];
      setSubjects(mockSubjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      // Mock filtered students data
      const mockStudents: Student[] = [
        {
          id: "1",
          admission_no: "ADM001",
          name: "John Smith",
          address: "123 Main St",
          phone: "+1234567890",
          father_name: "Robert Smith",
          email: "john@example.com",
          school: "Springfield High",
          gender: "Male",
          session: "2024-25",
          curriculum: "CBSE",
          grade: selectedGrade === 'all-grades' ? "10th" : selectedGrade,
          batch: selectedBatch === 'all-batches' ? "A" : selectedBatch,
          age: 16,
          profile_pic: "https://i.pravatar.cc/150?img=1",
          created_at: new Date().toISOString()
        },
        {
          id: "2", 
          admission_no: "ADM002",
          name: "Emily Johnson",
          address: "456 Oak Ave",
          phone: "+1234567891",
          father_name: "Michael Johnson",
          email: "emily@example.com",
          school: "Springfield High",
          gender: "Female",
          session: "2024-25",
          curriculum: "CBSE",
          grade: selectedGrade === 'all-grades' ? "10th" : selectedGrade,
          batch: selectedBatch === 'all-batches' ? "A" : selectedBatch,
          age: 15,
          profile_pic: "https://i.pravatar.cc/150?img=5",
          created_at: new Date().toISOString()
        }
      ];
      setStudents(mockStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentSelect = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const handleSubjectSelect = (subjectId: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    } else {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    }
  };

  const handleEndorse = async () => {
    if (selectedStudents.length === 0) {
      toast.error('Please select at least one student');
      return;
    }
    if (selectedSubjects.length === 0) {
      toast.error('Please select at least one subject');
      return;
    }

    try {
      // Mock endorsement process
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Successfully endorsed ${selectedSubjects.length} subjects for ${selectedStudents.length} students`);
      setSelectedStudents([]);
      setSelectedSubjects([]);
    } catch (error) {
      toast.error('Failed to endorse subjects');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Student Subject Endorsement</h2>
        <p className="text-muted-foreground">
          Select students and endorse them for multiple subjects
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-grades">All Grades</SelectItem>
              {grades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-batches">All Batches</SelectItem>
              {batches.map((batch) => (
                <SelectItem key={batch} value={batch}>
                  Batch {batch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(selectedGrade !== 'all-grades' || selectedBatch !== 'all-batches') && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Students ({students.length})
              </h3>
              
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-muted animate-pulse rounded" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={(checked) => handleStudentSelect(student.id, checked as boolean)}
                      />
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.profile_pic} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.admission_no}</div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{student.grade}</Badge>
                        <Badge variant="outline">Batch {student.batch}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Select Subjects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {subjects.map((subject) => (
                  <div key={subject.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      checked={selectedSubjects.includes(subject.id)}
                      onCheckedChange={(checked) => handleSubjectSelect(subject.id, checked as boolean)}
                    />
                    <div>
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-sm text-muted-foreground">{subject.code}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedStudents.length > 0 && selectedSubjects.length > 0 && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Endorsement Summary:</p>
                <p className="text-sm text-muted-foreground">
                  {selectedStudents.length} student(s) will be endorsed for {selectedSubjects.length} subject(s)
                </p>
              </div>
            )}

            <Button 
              onClick={handleEndorse}
              disabled={selectedStudents.length === 0 || selectedSubjects.length === 0}
              className="w-full"
            >
              <Save className="h-4 w-4 mr-2" />
              Endorse Selected Students
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
