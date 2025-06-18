import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Save, Users, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Student } from './types';
import { SubjectSelectionDialog } from './SubjectSelectionDialog';
import { StudentEndorsementView } from './StudentEndorsementView';

interface Subject {
  id: string;
  name: string;
  code: string;
  type: 'Core_subject' | 'language_subject' | 'cocurricular_subject';
}

interface StudentEndorsement {
  student_id: string;
  subject_id: string;
  subject_name: string;
  subject_type: string;
}

export function StudentSubjectEndorsement() {
  const [selectedGrade, setSelectedGrade] = useState('all-grades');
  const [selectedBatch, setSelectedBatch] = useState('all-batches');
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [endorsements, setEndorsements] = useState<StudentEndorsement[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [filterNotEndorsed, setFilterNotEndorsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSubjectDialog, setShowSubjectDialog] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<string | null>(null);

  const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const batches = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    fetchSubjects();
    fetchEndorsements();
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
      const mockSubjects: Subject[] = [
        { id: '1', name: 'Mathematics', code: 'MATH', type: 'Core_subject' },
        { id: '2', name: 'English', code: 'ENG', type: 'language_subject' },
        { id: '3', name: 'Science', code: 'SCI', type: 'Core_subject' },
        { id: '4', name: 'Social Studies', code: 'SS', type: 'Core_subject' },
        { id: '5', name: 'Hindi', code: 'HIN', type: 'language_subject' },
        { id: '6', name: 'Computer Science', code: 'CS', type: 'Core_subject' },
        { id: '7', name: 'Physical Education', code: 'PE', type: 'cocurricular_subject' },
        { id: '8', name: 'Art', code: 'ART', type: 'cocurricular_subject' }
      ];
      setSubjects(mockSubjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
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
        },
        {
          id: "3", 
          admission_no: "ADM003",
          name: "Alex Davis",
          address: "789 Pine St",
          phone: "+1234567892",
          father_name: "David Davis",
          email: "alex@example.com",
          school: "Springfield High",
          gender: "Male",
          session: "2024-25",
          curriculum: "CBSE",
          grade: selectedGrade === 'all-grades' ? "10th" : selectedGrade,
          batch: selectedBatch === 'all-batches' ? "B" : selectedBatch,
          age: 16,
          profile_pic: "https://i.pravatar.cc/150?img=8",
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

  const fetchEndorsements = async () => {
    try {
      const mockEndorsements: StudentEndorsement[] = [
        { student_id: "1", subject_id: "1", subject_name: "Mathematics", subject_type: "Core_subject" },
        { student_id: "1", subject_id: "2", subject_name: "English", subject_type: "language_subject" },
        { student_id: "2", subject_id: "1", subject_name: "Mathematics", subject_type: "Core_subject" },
      ];
      setEndorsements(mockEndorsements);
    } catch (error) {
      console.error("Error fetching endorsements:", error);
    }
  };

  const getStudentEndorsementCount = (studentId: string) => {
    return endorsements.filter(e => e.student_id === studentId).length;
  };

  const getFilteredStudents = () => {
    if (!filterNotEndorsed) return students;
    return students.filter(student => getStudentEndorsementCount(student.id) === 0);
  };

  const handleStudentSelect = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allStudentIds = getFilteredStudents().map(student => student.id);
      setSelectedStudents(allStudentIds);
    } else {
      setSelectedStudents([]);
    }
  };

  const isAllSelected = () => {
    const filteredStudents = getFilteredStudents();
    return filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length;
  };

  const isSomeSelected = () => {
    return selectedStudents.length > 0 && selectedStudents.length < getFilteredStudents().length;
  };

  const handleEndorse = async (selectedSubjectIds: string[]) => {
    if (selectedStudents.length === 0 || selectedSubjectIds.length === 0) {
      toast.error('Please select students and subjects');
      return;
    }

    try {
      // Mock endorsement process
      const newEndorsements: StudentEndorsement[] = [];
      selectedStudents.forEach(studentId => {
        selectedSubjectIds.forEach(subjectId => {
          const subject = subjects.find(s => s.id === subjectId);
          if (subject) {
            newEndorsements.push({
              student_id: studentId,
              subject_id: subjectId,
              subject_name: subject.name,
              subject_type: subject.type
            });
          }
        });
      });

      setEndorsements([...endorsements, ...newEndorsements]);
      toast.success(`Successfully endorsed ${selectedSubjectIds.length} subjects for ${selectedStudents.length} students`);
      setSelectedStudents([]);
      setShowSubjectDialog(false);
    } catch (error) {
      toast.error('Failed to endorse subjects');
    }
  };

  if (viewingStudent) {
    return (
      <StudentEndorsementView
        studentId={viewingStudent}
        student={students.find(s => s.id === viewingStudent)}
        endorsements={endorsements.filter(e => e.student_id === viewingStudent)}
        onBack={() => setViewingStudent(null)}
      />
    );
  }

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

          {students.length > 0 && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="filter-not-endorsed"
                checked={filterNotEndorsed}
                onCheckedChange={(checked) => setFilterNotEndorsed(checked as boolean)}
              />
              <label htmlFor="filter-not-endorsed" className="text-sm font-medium">
                Show only non-endorsed students
              </label>
            </div>
          )}
        </div>

        {(selectedGrade !== 'all-grades' || selectedBatch !== 'all-batches') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Students ({getFilteredStudents().length})
                </h3>
                
                {getFilteredStudents().length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all"
                      checked={isAllSelected()}
                      onCheckedChange={handleSelectAll}
                      className={isSomeSelected() ? "data-[state=checked]:bg-primary/50" : ""}
                    />
                    <label htmlFor="select-all" className="text-sm font-medium">
                      Select All
                    </label>
                  </div>
                )}
              </div>
              
              {selectedStudents.length > 0 && (
                <Button onClick={() => setShowSubjectDialog(true)}>
                  Select Subjects ({selectedStudents.length} selected)
                </Button>
              )}
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getFilteredStudents().map((student) => {
                  const endorsementCount = getStudentEndorsementCount(student.id);
                  return (
                    <div key={student.id} className="border rounded-lg p-4 space-y-3 hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={(checked) => handleStudentSelect(student.id, checked as boolean)}
                        />
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={student.profile_pic} alt={student.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{student.name}</h4>
                          <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                          <Badge variant="outline" className="text-xs mt-1">{student.admission_no}</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant="secondary">{student.grade}</Badge>
                          <Badge variant="outline">Batch {student.batch}</Badge>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewingStudent(student.id)}
                          className="flex items-center gap-1"
                        >
                          <span className="font-medium">{endorsementCount}</span>
                          <span className="text-xs">subjects</span>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {getFilteredStudents().length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No students found</h3>
                <p className="text-muted-foreground">
                  {filterNotEndorsed 
                    ? "No non-endorsed students found for the selected criteria."
                    : "No students match your current selection criteria."
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </Card>

      <SubjectSelectionDialog
        open={showSubjectDialog}
        onOpenChange={setShowSubjectDialog}
        subjects={subjects}
        onEndorse={handleEndorse}
        selectedStudentCount={selectedStudents.length}
      />
    </div>
  );
}
