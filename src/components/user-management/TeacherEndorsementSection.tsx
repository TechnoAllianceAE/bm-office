
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Teacher, TeacherEndorsement } from './types';

export function TeacherEndorsementSection() {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [subjectSelections, setSubjectSelections] = useState<Record<string, string[]>>({});
  const [endorsements, setEndorsements] = useState<TeacherEndorsement[]>([]);

  const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const batches = ['A', 'B', 'C', 'D'];
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 'Chemistry', 'Biology'];

  useEffect(() => {
    if (selectedGrade && selectedBatch) {
      fetchTeachers();
    }
  }, [selectedGrade, selectedBatch]);

  useEffect(() => {
    fetchEndorsements();
  }, []);

  const fetchTeachers = async () => {
    // Mock teachers data
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
      }
    ];
    
    setTeachers(mockTeachers);
  };

  const fetchEndorsements = async () => {
    // Mock endorsements data
    const mockEndorsements: TeacherEndorsement[] = [
      {
        id: '1',
        teacher_id: '1',
        teacher_name: 'John Smith',
        grade: '10',
        batch: 'A',
        subjects: ['Mathematics', 'Physics'],
        created_at: new Date().toISOString()
      }
    ];
    
    setEndorsements(mockEndorsements);
  };

  const handleTeacherSelect = (teacherId: string, checked: boolean) => {
    if (checked) {
      setSelectedTeachers([...selectedTeachers, teacherId]);
    } else {
      setSelectedTeachers(selectedTeachers.filter(id => id !== teacherId));
      setSubjectSelections({ ...subjectSelections, [teacherId]: [] });
    }
  };

  const handleSubjectSelect = (teacherId: string, subject: string, checked: boolean) => {
    const currentSubjects = subjectSelections[teacherId] || [];
    if (checked) {
      setSubjectSelections({
        ...subjectSelections,
        [teacherId]: [...currentSubjects, subject]
      });
    } else {
      setSubjectSelections({
        ...subjectSelections,
        [teacherId]: currentSubjects.filter(s => s !== subject)
      });
    }
  };

  const handleEndorse = async () => {
    if (selectedTeachers.length === 0) {
      toast.error('Please select at least one teacher');
      return;
    }

    try {
      console.log('Endorsing teachers:', selectedTeachers, subjectSelections);
      toast.success('Teachers endorsed successfully');
      setSelectedTeachers([]);
      setSubjectSelections({});
      fetchEndorsements();
    } catch (error) {
      toast.error('Failed to endorse teachers');
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        
        <div className="flex items-end">
          <Button onClick={handleEndorse} disabled={selectedTeachers.length === 0}>
            Endorse Selected Teachers
          </Button>
        </div>
      </div>

      {/* Teachers List */}
      {teachers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Available Teachers</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Select</TableHead>
                <TableHead>Teacher Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Current Subjects</TableHead>
                <TableHead>Assign Subjects</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedTeachers.includes(teacher.id)}
                      onCheckedChange={(checked) => handleTeacherSelect(teacher.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary">{subject}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {selectedTeachers.includes(teacher.id) && (
                      <div className="flex flex-wrap gap-2">
                        {subjects.map((subject) => (
                          <label key={subject} className="flex items-center space-x-1 text-sm">
                            <Checkbox
                              checked={(subjectSelections[teacher.id] || []).includes(subject)}
                              onCheckedChange={(checked) => handleSubjectSelect(teacher.id, subject, checked as boolean)}
                            />
                            <span>{subject}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Endorsements List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Current Endorsements</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher Name</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Endorsed Subjects</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {endorsements.map((endorsement) => (
              <TableRow key={endorsement.id}>
                <TableCell className="font-medium">{endorsement.teacher_name}</TableCell>
                <TableCell>Grade {endorsement.grade}</TableCell>
                <TableCell>Batch {endorsement.batch}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {endorsement.subjects.map((subject) => (
                      <Badge key={subject} variant="default">{subject}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{new Date(endorsement.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
