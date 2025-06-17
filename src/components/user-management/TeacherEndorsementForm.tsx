
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Teacher, TeacherEndorsement } from './types';
import { TeacherSubjectSelectionDialog } from './TeacherSubjectSelectionDialog';

interface TeacherEndorsementFormProps {
  endorsement?: TeacherEndorsement | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function TeacherEndorsementForm({ endorsement, onSubmit, onCancel }: TeacherEndorsementFormProps) {
  const [selectedGrade, setSelectedGrade] = useState(endorsement?.grade || '');
  const [selectedBatch, setSelectedBatch] = useState(endorsement?.batch || '');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showSubjectDialog, setShowSubjectDialog] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(endorsement?.subjects || []);

  const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const batches = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    if (selectedGrade && selectedBatch) {
      fetchTeachers();
    }
  }, [selectedGrade, selectedBatch]);

  const fetchTeachers = async () => {
    // Mock teachers data based on grade and batch
    const mockTeachers: Teacher[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@school.com',
        subjects: ['Mathematics'],
        grade: selectedGrade,
        batch: selectedBatch,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@school.com',
        subjects: ['Science', 'Biology'],
        grade: selectedGrade,
        batch: selectedBatch,
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Mike Davis',
        email: 'mike.davis@school.com',
        subjects: ['English'],
        grade: selectedGrade,
        batch: selectedBatch,
        created_at: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Emma Wilson',
        email: 'emma.wilson@school.com',
        subjects: ['History', 'Geography'],
        grade: selectedGrade,
        batch: selectedBatch,
        created_at: new Date().toISOString()
      },
      {
        id: '5',
        name: 'David Brown',
        email: 'david.brown@school.com',
        subjects: ['Physics', 'Chemistry'],
        grade: selectedGrade,
        batch: selectedBatch,
        created_at: new Date().toISOString()
      },
      {
        id: '6',
        name: 'Lisa Anderson',
        email: 'lisa.anderson@school.com',
        subjects: ['Art', 'Music'],
        grade: selectedGrade,
        batch: selectedBatch,
        created_at: new Date().toISOString()
      }
    ];
    
    setTeachers(mockTeachers);
  };

  const handleTeacherClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowSubjectDialog(true);
  };

  const handleSubjectSelection = (subjects: string[]) => {
    setSelectedSubjects(subjects);
    setShowSubjectDialog(false);
  };

  const handleSubmit = () => {
    if (!selectedTeacher || !selectedGrade || !selectedBatch) {
      toast.error('Please select teacher, grade, and batch');
      return;
    }

    if (selectedSubjects.length === 0) {
      toast.error('Please select at least one subject');
      return;
    }

    onSubmit({
      teacher_id: selectedTeacher.id,
      teacher_name: selectedTeacher.name,
      grade: selectedGrade,
      batch: selectedBatch,
      subjects: selectedSubjects
    });
  };

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h3 className="text-lg font-medium">
            {endorsement ? 'Edit Teacher Endorsement' : 'Add Teacher Endorsement'}
          </h3>
          <p className="text-sm text-muted-foreground">
            Select grade, batch, teacher, and subjects for endorsement
          </p>
        </div>
      </div>

      {/* Grade and Batch Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
        <div className="space-y-2">
          <Label>Grade</Label>
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger>
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              {grades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  Grade {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Batch</Label>
          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger>
              <SelectValue placeholder="Select batch" />
            </SelectTrigger>
            <SelectContent>
              {batches.map((batch) => (
                <SelectItem key={batch} value={batch}>
                  Batch {batch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Teacher Search */}
      {teachers.length > 0 && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search teachers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Teachers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeachers.map((teacher) => (
              <Card 
                key={teacher.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTeacher?.id === teacher.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleTeacherClick(teacher)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{teacher.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{teacher.email}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Current Subjects:</p>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No teachers found matching your search.
            </div>
          )}
        </div>
      )}

      {/* Selected Teacher and Subjects */}
      {selectedTeacher && (
        <div className="p-4 border rounded-lg space-y-4">
          <div>
            <h4 className="font-medium">Selected Teacher</h4>
            <p className="text-sm text-muted-foreground">{selectedTeacher.name} - {selectedTeacher.email}</p>
          </div>

          {selectedSubjects.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Selected Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSubjects.map((subject) => (
                  <Badge key={subject} variant="default">{subject}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={() => setShowSubjectDialog(true)} variant="outline">
              {selectedSubjects.length > 0 ? 'Change Subjects' : 'Select Subjects'}
            </Button>
            <Button onClick={handleSubmit} disabled={selectedSubjects.length === 0}>
              {endorsement ? 'Update Endorsement' : 'Create Endorsement'}
            </Button>
          </div>
        </div>
      )}

      {/* Subject Selection Dialog */}
      <TeacherSubjectSelectionDialog
        open={showSubjectDialog}
        onOpenChange={setShowSubjectDialog}
        selectedSubjects={selectedSubjects}
        onSubjectSelection={handleSubjectSelection}
      />
    </div>
  );
}
