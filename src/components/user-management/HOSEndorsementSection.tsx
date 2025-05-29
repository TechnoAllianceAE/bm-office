
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { HOS, HOSEndorsement } from './types';

interface HOSAssignment {
  session: 'Morning' | 'Afternoon';
  curriculum: string;
  class: string;
}

export function HOSEndorsementSection() {
  const [selectedHOS, setSelectedHOS] = useState('');
  const [assignments, setAssignments] = useState<HOSAssignment[]>([]);
  const [currentAssignment, setCurrentAssignment] = useState<HOSAssignment>({
    session: 'Morning',
    curriculum: '',
    class: ''
  });
  const [hoses, setHOSes] = useState<HOS[]>([]);
  const [endorsements, setEndorsements] = useState<HOSEndorsement[]>([]);

  const sessions: ('Morning' | 'Afternoon')[] = ['Morning', 'Afternoon'];
  const curriculums = ['CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge'];
  const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  useEffect(() => {
    fetchHOSes();
    fetchEndorsements();
  }, []);

  const fetchHOSes = async () => {
    // Mock HOS data
    const mockHOSes: HOS[] = [
      {
        id: '1',
        name: 'Mr. David Thompson',
        email: 'david.thompson@school.com',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Ms. Jennifer Lee',
        email: 'jennifer.lee@school.com',
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Dr. Michael Chen',
        email: 'michael.chen@school.com',
        created_at: new Date().toISOString()
      }
    ];
    
    setHOSes(mockHOSes);
  };

  const fetchEndorsements = async () => {
    // Mock endorsements data
    const mockEndorsements: HOSEndorsement[] = [
      {
        id: '1',
        hos_id: '1',
        hos_name: 'Mr. David Thompson',
        session: 'Morning',
        curriculum: 'CBSE',
        class: '10',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        hos_id: '1',
        hos_name: 'Mr. David Thompson',
        session: 'Afternoon',
        curriculum: 'ICSE',
        class: '12',
        created_at: new Date().toISOString()
      }
    ];
    
    setEndorsements(mockEndorsements);
  };

  const handleAddAssignment = () => {
    if (!currentAssignment.curriculum || !currentAssignment.class) {
      toast.error('Please fill in all assignment details');
      return;
    }

    const duplicate = assignments.find(a => 
      a.session === currentAssignment.session && 
      a.curriculum === currentAssignment.curriculum && 
      a.class === currentAssignment.class
    );

    if (duplicate) {
      toast.error('This assignment already exists');
      return;
    }

    setAssignments([...assignments, { ...currentAssignment }]);
    setCurrentAssignment({
      session: 'Morning',
      curriculum: '',
      class: ''
    });
  };

  const handleRemoveAssignment = (index: number) => {
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  const handleEndorse = async () => {
    if (!selectedHOS || assignments.length === 0) {
      toast.error('Please select HOS and add at least one assignment');
      return;
    }

    try {
      console.log('Endorsing HOS:', { selectedHOS, assignments });
      toast.success('HOS endorsed successfully');
      setSelectedHOS('');
      setAssignments([]);
      fetchEndorsements();
    } catch (error) {
      toast.error('Failed to endorse HOS');
    }
  };

  return (
    <div className="space-y-6">
      {/* HOS Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Select HOS</Label>
          <Select value={selectedHOS} onValueChange={setSelectedHOS}>
            <SelectTrigger>
              <SelectValue placeholder="Select HOS" />
            </SelectTrigger>
            <SelectContent>
              {hoses.map((hos) => (
                <SelectItem key={hos.id} value={hos.id}>
                  {hos.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Assignment Form */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-medium">Add Assignment</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Session</Label>
            <Select 
              value={currentAssignment.session} 
              onValueChange={(value: 'Morning' | 'Afternoon') => 
                setCurrentAssignment({ ...currentAssignment, session: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sessions.map((session) => (
                  <SelectItem key={session} value={session}>
                    {session}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Curriculum</Label>
            <Select 
              value={currentAssignment.curriculum} 
              onValueChange={(value) => 
                setCurrentAssignment({ ...currentAssignment, curriculum: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select curriculum" />
              </SelectTrigger>
              <SelectContent>
                {curriculums.map((curriculum) => (
                  <SelectItem key={curriculum} value={curriculum}>
                    {curriculum}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Class</Label>
            <Select 
              value={currentAssignment.class} 
              onValueChange={(value) => 
                setCurrentAssignment({ ...currentAssignment, class: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    Class {cls}
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
                <TableHead>Session</TableHead>
                <TableHead>Curriculum</TableHead>
                <TableHead>Class</TableHead>
                <TableHead className="w-20">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((assignment, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge variant="outline">{assignment.session}</Badge>
                  </TableCell>
                  <TableCell>{assignment.curriculum}</TableCell>
                  <TableCell>Class {assignment.class}</TableCell>
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
            Endorse HOS with All Assignments
          </Button>
        </div>
      )}

      {/* Current Endorsements */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Current HOS Endorsements</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>HOS Name</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Curriculum</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {endorsements.map((endorsement) => (
              <TableRow key={endorsement.id}>
                <TableCell className="font-medium">{endorsement.hos_name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{endorsement.session}</Badge>
                </TableCell>
                <TableCell>{endorsement.curriculum}</TableCell>
                <TableCell>Class {endorsement.class}</TableCell>
                <TableCell>{new Date(endorsement.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
