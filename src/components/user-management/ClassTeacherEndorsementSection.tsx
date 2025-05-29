
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Teacher, ClassTeacherEndorsement } from './types';

interface ClassTeacherAssignment {
  teacher_id: string;
  teacher_name: string;
  grade: string;
  batch: string;
}

export function ClassTeacherEndorsementSection() {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [assignments, setAssignments] = useState<ClassTeacherAssignment[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [endorsements, setEndorsements] = useState<ClassTeacherEndorsement[]>([]);
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');
  const [viewingTeacher, setViewingTeacher] = useState<string | null>(null);

  const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const batches = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    fetchTeachers();
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
        grade: '10',
        batch: 'A',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@school.com',
        subjects: ['Science', 'Biology'],
        grade: '9',
        batch: 'B',
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Mike Davis',
        email: 'mike.davis@school.com',
        subjects: ['English'],
        grade: '8',
        batch: 'A',
        created_at: new Date().toISOString()
      }
    ];
    
    setTeachers(mockTeachers);
  };

  const fetchEndorsements = async () => {
    // Mock endorsements data
    const mockEndorsements: ClassTeacherEndorsement[] = [
      {
        id: '1',
        teacher_id: '1',
        teacher_name: 'John Smith',
        grade: '10',
        batch: 'A',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        teacher_id: '2',
        teacher_name: 'Sarah Johnson',
        grade: '9',
        batch: 'B',
        created_at: new Date().toISOString()
      }
    ];
    
    setEndorsements(mockEndorsements);
  };

  const handleAddAssignment = () => {
    if (!selectedTeacher || !selectedGrade || !selectedBatch) {
      toast.error('Please select teacher, grade, and batch');
      return;
    }

    const teacher = teachers.find(t => t.id === selectedTeacher);
    if (!teacher) {
      toast.error('Teacher not found');
      return;
    }

    const duplicate = assignments.find(a => 
      a.teacher_id === selectedTeacher && 
      a.grade === selectedGrade && 
      a.batch === selectedBatch
    );

    if (duplicate) {
      toast.error('This assignment already exists');
      return;
    }

    setAssignments([...assignments, {
      teacher_id: selectedTeacher,
      teacher_name: teacher.name,
      grade: selectedGrade,
      batch: selectedBatch
    }]);

    setSelectedTeacher('');
    setSelectedGrade('');
    setSelectedBatch('');
  };

  const handleRemoveAssignment = (index: number) => {
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  const handleEndorse = async () => {
    if (assignments.length === 0) {
      toast.error('Please add at least one assignment');
      return;
    }

    try {
      console.log('Endorsing class teachers:', assignments);
      toast.success('Class teachers endorsed successfully');
      setAssignments([]);
      fetchEndorsements();
    } catch (error) {
      toast.error('Failed to endorse class teachers');
    }
  };

  // Group endorsements by teacher
  const teacherGroups = endorsements.reduce((acc, endorsement) => {
    const key = endorsement.teacher_id;
    if (!acc[key]) {
      acc[key] = {
        teacher_name: endorsement.teacher_name,
        endorsements: []
      };
    }
    acc[key].endorsements.push(endorsement);
    return acc;
  }, {} as Record<string, { teacher_name: string; endorsements: ClassTeacherEndorsement[] }>);

  // Filter endorsements
  const filteredEndorsements = endorsements.filter(endorsement => {
    const gradeMatch = filterGrade === 'all' || endorsement.grade === filterGrade;
    const batchMatch = filterBatch === 'all' || endorsement.batch === filterBatch;
    return gradeMatch && batchMatch;
  });

  if (viewingTeacher) {
    const teacherData = teacherGroups[viewingTeacher];
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Class Assignments for {teacherData.teacher_name}</h3>
          <Button onClick={() => setViewingTeacher(null)} variant="outline">
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

  return (
    <div className="space-y-6">
      {/* Assignment Form */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-medium">Add Class Teacher Assignment</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Teacher</Label>
            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger>
                <SelectValue placeholder="Select teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
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
            <Button onClick={handleAddAssignment} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Current Assignments */}
      {assignments.length > 0 && (
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
                      onClick={() => handleRemoveAssignment(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <Button onClick={handleEndorse} className="w-full">
            Endorse All Class Teacher Assignments
          </Button>
        </div>
      )}

      {/* Filters */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-medium">Filter Class Teacher Endorsements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Filter by Grade</Label>
            <Select value={filterGrade} onValueChange={setFilterGrade}>
              <SelectTrigger>
                <SelectValue placeholder="All grades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All grades</SelectItem>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Filter by Batch</Label>
            <Select value={filterBatch} onValueChange={setFilterBatch}>
              <SelectTrigger>
                <SelectValue placeholder="All batches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All batches</SelectItem>
                {batches.map((batch) => (
                  <SelectItem key={batch} value={batch}>
                    Batch {batch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Class Teacher Endorsements Overview */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Class Teacher Endorsements Overview</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher Name</TableHead>
              <TableHead>Endorsement Count</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(teacherGroups).map(([teacherId, data]) => (
              <TableRow key={teacherId}>
                <TableCell className="font-medium">{data.teacher_name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{data.endorsements.length} assignments</Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setViewingTeacher(teacherId)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Filtered Endorsements List */}
      {(filterGrade !== 'all' || filterBatch !== 'all') && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Filtered Results
            {filterGrade !== 'all' && ` - Grade ${filterGrade}`}
            {filterBatch !== 'all' && ` - Batch ${filterBatch}`}
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEndorsements.map((endorsement) => (
                <TableRow key={endorsement.id}>
                  <TableCell className="font-medium">{endorsement.teacher_name}</TableCell>
                  <TableCell>Grade {endorsement.grade}</TableCell>
                  <TableCell>Batch {endorsement.batch}</TableCell>
                  <TableCell>{new Date(endorsement.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
