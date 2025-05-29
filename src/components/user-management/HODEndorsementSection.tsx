
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { HOD, HODEndorsement } from './types';

export function HODEndorsementSection() {
  const [selectedHOD, setSelectedHOD] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<'Primary' | 'Middle' | 'Secondary' | 'Higher Secondary' | ''>('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [hods, setHODs] = useState<HOD[]>([]);
  const [endorsements, setEndorsements] = useState<HODEndorsement[]>([]);

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
      }
    ];
    
    setEndorsements(mockEndorsements);
  };

  const handleSubjectSelect = (subject: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subject]);
    } else {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    }
  };

  const handleEndorse = async () => {
    if (!selectedHOD || !selectedPhase || selectedSubjects.length === 0) {
      toast.error('Please select HOD, phase, and at least one subject');
      return;
    }

    try {
      console.log('Endorsing HOD:', { selectedHOD, selectedPhase, selectedSubjects });
      toast.success('HOD endorsed successfully');
      setSelectedHOD('');
      setSelectedPhase('');
      setSelectedSubjects([]);
      fetchEndorsements();
    } catch (error) {
      toast.error('Failed to endorse HOD');
    }
  };

  const availableSubjects = selectedPhase ? subjectsByPhase[selectedPhase] : [];

  return (
    <div className="space-y-6">
      {/* HOD Selection and Endorsement */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        
        <div className="space-y-2">
          <Label>Phase</Label>
          <Select value={selectedPhase} onValueChange={(value: 'Primary' | 'Middle' | 'Secondary' | 'Higher Secondary') => setSelectedPhase(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select phase" />
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
          {availableSubjects.length > 0 && (
            <div className="border rounded-md p-3 max-h-32 overflow-y-auto">
              {availableSubjects.map((subject) => (
                <label key={subject} className="flex items-center space-x-2 text-sm mb-1">
                  <Checkbox
                    checked={selectedSubjects.includes(subject)}
                    onCheckedChange={(checked) => handleSubjectSelect(subject, checked as boolean)}
                  />
                  <span>{subject}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-end">
          <Button onClick={handleEndorse} disabled={!selectedHOD || !selectedPhase || selectedSubjects.length === 0}>
            Endorse HOD
          </Button>
        </div>
      </div>

      {/* Current Endorsements */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Current HOD Endorsements</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>HOD Name</TableHead>
              <TableHead>Phase</TableHead>
              <TableHead>Endorsed Subjects</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {endorsements.map((endorsement) => (
              <TableRow key={endorsement.id}>
                <TableCell className="font-medium">{endorsement.hod_name}</TableCell>
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
    </div>
  );
}
