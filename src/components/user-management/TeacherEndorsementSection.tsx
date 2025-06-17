
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { TeacherEndorsement } from './types';
import { TeacherEndorsementForm } from './TeacherEndorsementForm';

export function TeacherEndorsementSection() {
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');
  const [endorsements, setEndorsements] = useState<TeacherEndorsement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEndorsement, setEditingEndorsement] = useState<TeacherEndorsement | null>(null);

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

  if (showForm) {
    return (
      <TeacherEndorsementForm
        endorsement={editingEndorsement}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
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

      {/* Endorsements List */}
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher Name</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Endorsed Subjects</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEndorsements.map((endorsement) => (
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
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredEndorsements.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No endorsements found for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
