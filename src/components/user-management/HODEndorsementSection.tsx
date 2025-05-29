
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { HOD, HODEndorsement } from './types';

interface HODAssignment {
  phase: 'Primary' | 'Middle' | 'Secondary' | 'Higher Secondary';
  subjects: string[];
}

export function HODEndorsementSection() {
  const [selectedHOD, setSelectedHOD] = useState('');
  const [assignments, setAssignments] = useState<HODAssignment[]>([]);
  const [currentAssignment, setCurrentAssignment] = useState<HODAssignment>({
    phase: 'Primary',
    subjects: []
  });
  const [hods, setHODs] = useState<HOD[]>([]);
  const [endorsements, setEndorsements] = useState<HODEndorsement[]>([]);
  const [viewingHOD, setViewingHOD] = useState<string | null>(null);

  const phases: ('Primary' | 'Middle' | 'Secondary' | 'Higher Secondary')[] = ['Primary', 'Middle', 'Secondary', 'Higher Secondary'];
  const subjectsByPhase = {
    'Primary': ['English', 'Mathematics', 'Science', 'Social Studies', 'Art', 'Physical Education'],
    'Middle': ['English', 'Mathematics', 'Science', 'Social Studies', 'Hindi', 'Computer Science'],
    'Secondary': ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'],
    'Higher Secondary': ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'Political Science']
  };

  useEffect(() => {
    fetchHODs();
    fetchEndorsements();
  }, []);

  const fetchHODs = async () => {
    // Mock HODs data
    const mockHODs: HOD[] = [
      {
        id: '1',
        name: 'Dr. Alice Brown',
        email: 'alice.brown@school.com',
        department: 'Science',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Prof. Robert Wilson',
        email: 'robert.wilson@school.com',
        department: 'Mathematics',
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Dr. Emma Davis',
        email: 'emma.davis@school.com',
        department: 'English',
        created_at: new Date().toISOString()
      }
    ];
    
    setHODs(mockHODs);
  };

  const fetchEndorsements = async () => {
    // Mock endorsements data
    const mockEndorsements: HODEndorsement[] = [
      {
        id: '1',
        hod_id: '1',
        hod_name: 'Dr. Alice Brown',
        phase: 'Secondary',
        subjects: ['Physics', 'Chemistry', 'Biology'],
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        hod_id: '2',
        hod_name: 'Prof. Robert Wilson',
        phase: 'Middle',
        subjects: ['Mathematics'],
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        hod_id: '2',
        hod_name: 'Prof. Robert Wilson',
        phase: 'Secondary',
        subjects: ['Physics'],
        created_at: new Date().toISOString()
      }
    ];
    
    setEndorsements(mockEndorsements);
  };

  const handleSubjectSelect = (subject: string, checked: boolean) => {
    const updatedSubjects = checked 
      ? [...currentAssignment.subjects, subject]
      : currentAssignment.subjects.filter(s => s !== subject);
    
    setCurrentAssignment({ ...currentAssignment, subjects: updatedSubjects });
  };

  const handleAddAssignment = () => {
    if (currentAssignment.subjects.length === 0) {
      toast.error('Please select at least one subject');
      return;
    }

    const duplicate = assignments.find(a => a.phase === currentAssignment.phase);
    if (duplicate) {
      toast.error('This phase already exists in assignments');
      return;
    }

    setAssignments([...assignments, { ...currentAssignment }]);
    setCurrentAssignment({
      phase: 'Primary',
      subjects: []
    });
  };

  const handleRemoveAssignment = (index: number) => {
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  const handleEndorse = async () => {
    if (!selectedHOD || assignments.length === 0) {
      toast.error('Please select HOD and add at least one assignment');
      return;
    }

    try {
      console.log('Endorsing HOD:', { selectedHOD, assignments });
      toast.success('HOD endorsed successfully');
      setSelectedHOD('');
      setAssignments([]);
      fetchEndorsements();
    } catch (error) {
      toast.error('Failed to endorse HOD');
    }
  };

  const availableSubjects = subjectsByPhase[currentAssignment.phase];

  // Group endorsements by HOD
  const hodGroups = endorsements.reduce((acc, endorsement) => {
    const key = endorsement.hod_id;
    if (!acc[key]) {
      acc[key] = {
        hod_name: endorsement.hod_name,
        endorsements: []
      };
    }
    acc[key].endorsements.push(endorsement);
    return acc;
  }, {} as Record<string, { hod_name: string; endorsements: HODEndorsement[] }>);

  if (viewingHOD) {
    const hodData = hodGroups[viewingHOD];
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Endorsements for {hodData.hod_name}</h3>
          <Button onClick={() => setViewingHOD(null)} variant="outline">
            Back to Overview
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Phase</TableHead>
              <TableHead>Endorsed Subjects</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hodData.endorsements.map((endorsement) => (
              <TableRow key={endorsement.id}>
                <TableCell>{endorsement.phase}</TableCell>
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
    );
  }

  return (
    <div className="space-y-6">
      {/* HOD Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Select HOD</Label>
          <Select value={selectedHOD} onValueChange={setSelectedHOD}>
            <SelectTrigger>
              <SelectValue placeholder="Select HOD" />
            </SelectTrigger>
            <SelectContent>
              {hods.map((hod) => (
                <SelectItem key={hod.id} value={hod.id}>
                  {hod.name} - {hod.department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Assignment Form */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-medium">Add Assignment</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Phase</Label>
            <Select 
              value={currentAssignment.phase} 
              onValueChange={(value: 'Primary' | 'Middle' | 'Secondary' | 'Higher Secondary') => 
                setCurrentAssignment({ ...currentAssignment, phase: value, subjects: [] })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {phases.map((phase) => (
                  <SelectItem key={phase} value={phase}>
                    {phase}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Subjects</Label>
            <div className="border rounded-md p-3 max-h-32 overflow-y-auto">
              {availableSubjects.map((subject) => (
                <label key={subject} className="flex items-center space-x-2 text-sm mb-1">
                  <Checkbox
                    checked={currentAssignment.subjects.includes(subject)}
                    onCheckedChange={(checked) => handleSubjectSelect(subject, checked as boolean)}
                  />
                  <span>{subject}</span>
                </label>
              ))}
            </div>
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
                <TableHead>Phase</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead className="w-20">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment, index) => (
                <TableRow key={index}>
                  <TableCell>{assignment.phase}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {assignment.subjects.map((subject) => (
                        <Badge key={subject} variant="outline">{subject}</Badge>
                      ))}
                    </div>
                  </TableCell>
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
            Endorse HOD with All Assignments
          </Button>
        </div>
      )}

      {/* HOD Endorsements Overview */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">HOD Endorsements Overview</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>HOD Name</TableHead>
              <TableHead>Endorsement Count</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(hodGroups).map(([hodId, data]) => (
              <TableRow key={hodId}>
                <TableCell className="font-medium">{data.hod_name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{data.endorsements.length} endorsements</Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setViewingHOD(hodId)}
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
    </div>
  );
}
