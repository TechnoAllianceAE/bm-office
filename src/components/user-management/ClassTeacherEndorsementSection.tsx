
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Teacher, ClassTeacherEndorsement } from './types';
import { ClassTeacherAssignmentForm } from './ClassTeacherAssignmentForm';
import { CurrentAssignmentsList } from './CurrentAssignmentsList';
import { EndorsementFilters } from './EndorsementFilters';
import { EndorsementsOverview } from './EndorsementsOverview';
import { FilteredEndorsementsList } from './FilteredEndorsementsList';
import { TeacherDetailView } from './TeacherDetailView';

interface ClassTeacherAssignment {
  teacher_id: string;
  teacher_name: string;
  grade: string;
  batch: string;
}

export function ClassTeacherEndorsementSection() {
  const [assignments, setAssignments] = useState<ClassTeacherAssignment[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [endorsements, setEndorsements] = useState<ClassTeacherEndorsement[]>([]);
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');
  const [viewingTeacher, setViewingTeacher] = useState<string | null>(null);

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

  const handleAddAssignment = (selectedTeacher: string, selectedGrade: string, selectedBatch: string) => {
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
      <TeacherDetailView
        teacherData={teacherData}
        onBack={() => setViewingTeacher(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ClassTeacherAssignmentForm
        teachers={teachers}
        onAddAssignment={handleAddAssignment}
      />

      <CurrentAssignmentsList
        assignments={assignments}
        onRemoveAssignment={handleRemoveAssignment}
        onEndorse={handleEndorse}
      />

      <EndorsementFilters
        filterGrade={filterGrade}
        filterBatch={filterBatch}
        onFilterGradeChange={setFilterGrade}
        onFilterBatchChange={setFilterBatch}
      />

      <EndorsementsOverview
        teacherGroups={teacherGroups}
        onViewTeacher={setViewingTeacher}
      />

      <FilteredEndorsementsList
        filteredEndorsements={filteredEndorsements}
        filterGrade={filterGrade}
        filterBatch={filterBatch}
      />
    </div>
  );
}
