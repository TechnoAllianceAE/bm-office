
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { TeacherEndorsement } from './types';
import { TeacherEndorsementForm } from './TeacherEndorsementForm';

export function TeacherEndorsementSection() {
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');
  const [endorsements, setEndorsements] = useState<TeacherEndorsement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEndorsement, setEditingEndorsement] = useState<TeacherEndorsement | null>(null);
  const [viewingTeacher, setViewingTeacher] = useState<string | null>(null);

  const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const batches = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    fetchEndorsements();
  }, []);

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
      },
      {
        id: '2',
        teacher_id: '2',
        teacher_name: 'Sarah Johnson',
        grade: '9',
        batch: 'B',
        subjects: ['Science', 'Biology'],
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        teacher_id: '3',
        teacher_name: 'Mike Davis',
        grade: '8',
        batch: 'A',
        subjects: ['English', 'Literature'],
        created_at: new Date().toISOString()
      },
      {
        id: '4',
        teacher_id: '1',
        teacher_name: 'John Smith',
        grade: '11',
        batch: 'B',
        subjects: ['Advanced Mathematics'],
        created_at: new Date().toISOString()
      },
      {
        id: '5',
        teacher_id: '4',
        teacher_name: 'Emily Wilson',
        grade: '7',
        batch: 'C',
        subjects: ['History', 'Geography'],
        created_at: new Date().toISOString()
      }
    ];
    
    setEndorsements(mockEndorsements);
  };

  const handleAddEndorsement = () => {
    setEditingEndorsement(null);
    setShowForm(true);
  };

  const handleEditEndorsement = (endorsement: TeacherEndorsement) => {
    setEditingEndorsement(endorsement);
    setShowForm(true);
  };

  const handleDeleteEndorsement = async (id: string) => {
    try {
      setEndorsements(prev => prev.filter(e => e.id !== id));
      toast.success('Endorsement deleted successfully');
    } catch (error) {
      toast.error('Failed to delete endorsement');
    }
  };

  const handleFormSubmit = (endorsementData: any) => {
    if (editingEndorsement) {
      // Update existing endorsement
      setEndorsements(prev => 
        prev.map(e => e.id === editingEndorsement.id ? { ...e, ...endorsementData } : e)
      );
      toast.success('Endorsement updated successfully');
    } else {
      // Add new endorsement
      const newEndorsement: TeacherEndorsement = {
        id: Math.random().toString(36).substr(2, 9),
        ...endorsementData,
        created_at: new Date().toISOString()
      };
      setEndorsements(prev => [...prev, newEndorsement]);
      toast.success('Endorsement added successfully');
    }
    setShowForm(false);
    setEditingEndorsement(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingEndorsement(null);
  };

  // Filter endorsements
  const filteredEndorsements = endorsements.filter(endorsement => {
    const gradeMatch = filterGrade === 'all' || endorsement.grade === filterGrade;
    const batchMatch = filterBatch === 'all' || endorsement.batch === filterBatch;
    return gradeMatch && batchMatch;
  });

  // Group endorsements by teacher
  const teacherGroups = filteredEndorsements.reduce((acc, endorsement) => {
    const key = endorsement.teacher_id;
    if (!acc[key]) {
      acc[key] = {
        teacher_name: endorsement.teacher_name,
        teacher_id: endorsement.teacher_id,
        endorsements: []
      };
    }
    acc[key].endorsements.push(endorsement);
    return acc;
  }, {} as Record<string, { teacher_name: string; teacher_id: string; endorsements: TeacherEndorsement[] }>);

  if (showForm) {
    return (
      <TeacherEndorsementForm
        endorsement={editingEndorsement}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
    );
  }

  if (viewingTeacher) {
    const teacherData = teacherGroups[viewingTeacher];
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Endorsements for {teacherData.teacher_name}</h3>
          <Button onClick={() => setViewingTeacher(null)} variant="outline">
            Back to Overview
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teacherData.endorsements.map((endorsement) => (
            <div key={endorsement.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Grade {endorsement.grade} - Batch {endorsement.batch}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(endorsement.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditEndorsement(endorsement)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteEndorsement(endorsement.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm">Endorsed Subjects:</Label>
                <div className="flex flex-wrap gap-1">
                  {endorsement.subjects.map((subject) => (
                    <Badge key={subject} variant="default">{subject}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Teacher Endorsements</h3>
          <p className="text-sm text-muted-foreground">
            Manage teacher subject endorsements by grade and batch
          </p>
        </div>
        <Button onClick={handleAddEndorsement}>
          <Plus className="h-4 w-4 mr-2" />
          Add Endorsement
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
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

      {/* Teacher Endorsements Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Teacher Endorsements Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(teacherGroups).map(([teacherId, data]) => (
            <div key={teacherId} className="border rounded-lg p-4 space-y-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face`} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {data.teacher_name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{data.teacher_name}</h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {data.teacher_name.toLowerCase().replace(' ', '.')}@school.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{data.endorsements.length} endorsements</Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setViewingTeacher(teacherId)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>

        {Object.keys(teacherGroups).length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No endorsements found for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
