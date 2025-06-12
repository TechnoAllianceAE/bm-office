import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Building2 } from 'lucide-react';
import { toast } from 'sonner';

interface AcademicConsole {
  id: string;
  curriculum: string;
  session: string;
  grade: string;
  batches: string[];
  created_at: string;
}

interface MasterSetting {
  id: string;
  name: string;
  type: string;
}

export function AcademicConsoleTab() {
  const [academicConsoles, setAcademicConsoles] = useState<AcademicConsole[]>([]);
  const [curriculums, setCurriculums] = useState<MasterSetting[]>([]);
  const [sessions, setSessions] = useState<MasterSetting[]>([]);
  const [grades, setGrades] = useState<MasterSetting[]>([]);
  const [batches, setBatches] = useState<MasterSetting[]>([]);
  
  // Form state
  const [selectedCurriculum, setSelectedCurriculum] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);

  useEffect(() => {
    fetchMasterData();
    fetchAcademicConsoles();
  }, []);

  const fetchMasterData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockCurriculums: MasterSetting[] = [
        { id: '1', name: 'CBSE', type: 'curriculum' },
        { id: '2', name: 'ICSE', type: 'curriculum' },
        { id: '3', name: 'State Board', type: 'curriculum' },
      ];

      const mockSessions: MasterSetting[] = [
        { id: '1', name: 'Morning', type: 'session' },
        { id: '2', name: 'Afternoon', type: 'session' },
        { id: '3', name: 'Evening', type: 'session' },
      ];

      const mockGrades: MasterSetting[] = [
        { id: '1', name: 'Grade 1', type: 'grade' },
        { id: '2', name: 'Grade 2', type: 'grade' },
        { id: '3', name: 'Grade 3', type: 'grade' },
        { id: '4', name: 'Grade 4', type: 'grade' },
      ];

      const mockBatches: MasterSetting[] = [
        { id: '1', name: 'Batch A', type: 'batch' },
        { id: '2', name: 'Batch B', type: 'batch' },
        { id: '3', name: 'Batch C', type: 'batch' },
        { id: '4', name: 'Batch D', type: 'batch' },
        { id: '5', name: 'Batch E', type: 'batch' },
        { id: '6', name: 'Batch F', type: 'batch' },
      ];

      setCurriculums(mockCurriculums);
      setSessions(mockSessions);
      setGrades(mockGrades);
      setBatches(mockBatches);
    } catch (error) {
      console.error('Error fetching master data:', error);
      toast.error('Failed to load master data');
    }
  };

  const fetchAcademicConsoles = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockConsoles: AcademicConsole[] = [
        {
          id: '1',
          curriculum: 'CBSE',
          session: 'Morning',
          grade: 'Grade 1',
          batches: ['Batch A', 'Batch B', 'Batch C', 'Batch D'],
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          curriculum: 'CBSE',
          session: 'Morning',
          grade: 'Grade 2',
          batches: ['Batch D', 'Batch E', 'Batch F'],
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          curriculum: 'ICSE',
          session: 'Afternoon',
          grade: 'Grade 1',
          batches: ['Batch A', 'Batch B'],
          created_at: new Date().toISOString()
        },
      ];

      setAcademicConsoles(mockConsoles);
    } catch (error) {
      console.error('Error fetching academic consoles:', error);
      toast.error('Failed to load academic consoles');
    }
  };

  const handleBatchToggle = (batchName: string) => {
    setSelectedBatches(prev => 
      prev.includes(batchName)
        ? prev.filter(b => b !== batchName)
        : [...prev, batchName]
    );
  };

  const handleAddConsole = async () => {
    if (!selectedCurriculum || !selectedSession || !selectedGrade) {
      toast.error('Please select curriculum, session, and grade');
      return;
    }

    if (selectedBatches.length === 0) {
      toast.error('Please select at least one batch');
      return;
    }

    // Check if this combination already exists
    const exists = academicConsoles.some(console => 
      console.curriculum === selectedCurriculum &&
      console.session === selectedSession &&
      console.grade === selectedGrade
    );

    if (exists) {
      toast.error('This curriculum-session-grade combination already exists');
      return;
    }

    try {
      const newConsole: AcademicConsole = {
        id: Math.random().toString(36).substr(2, 9),
        curriculum: selectedCurriculum,
        session: selectedSession,
        grade: selectedGrade,
        batches: [...selectedBatches],
        created_at: new Date().toISOString()
      };

      setAcademicConsoles(prev => [...prev, newConsole]);
      
      // Reset form
      setSelectedCurriculum('');
      setSelectedSession('');
      setSelectedGrade('');
      setSelectedBatches([]);

      toast.success('Academic console configuration added successfully');
    } catch (error) {
      console.error('Error adding console:', error);
      toast.error('Failed to add academic console configuration');
    }
  };

  const handleDeleteConsole = async (id: string) => {
    try {
      setAcademicConsoles(prev => prev.filter(console => console.id !== id));
      toast.success('Academic console configuration deleted successfully');
    } catch (error) {
      console.error('Error deleting console:', error);
      toast.error('Failed to delete academic console configuration');
    }
  };

  // Group consoles by curriculum and session for better display
  const groupedConsoles = academicConsoles.reduce((acc, console) => {
    const key = `${console.curriculum}-${console.session}`;
    if (!acc[key]) {
      acc[key] = {
        curriculum: console.curriculum,
        session: console.session,
        grades: []
      };
    }
    acc[key].grades.push({
      id: console.id,
      grade: console.grade,
      batches: console.batches,
      created_at: console.created_at
    });
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Academic Console</h2>
        <p className="text-muted-foreground">
          Set up academic configurations by combining curriculum, session, grade, and batches
        </p>
      </div>

      {/* Add New Configuration Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Academic Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Curriculum</Label>
              <Select value={selectedCurriculum} onValueChange={setSelectedCurriculum}>
                <SelectTrigger>
                  <SelectValue placeholder="Select curriculum" />
                </SelectTrigger>
                <SelectContent>
                  {curriculums.map((curriculum) => (
                    <SelectItem key={curriculum.id} value={curriculum.name}>
                      {curriculum.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Session</Label>
              <Select value={selectedSession} onValueChange={setSelectedSession}>
                <SelectTrigger>
                  <SelectValue placeholder="Select session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((session) => (
                    <SelectItem key={session.id} value={session.name}>
                      {session.name}
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
                    <SelectItem key={grade.id} value={grade.name}>
                      {grade.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Batches</Label>
            <div className="flex flex-wrap gap-2">
              {batches.map((batch) => (
                <Button
                  key={batch.id}
                  variant={selectedBatches.includes(batch.name) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleBatchToggle(batch.name)}
                >
                  {batch.name}
                </Button>
              ))}
            </div>
            {selectedBatches.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                <span className="text-sm text-muted-foreground">Selected:</span>
                {selectedBatches.map((batch) => (
                  <Badge key={batch} variant="secondary">
                    {batch}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Button onClick={handleAddConsole} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Configuration
          </Button>
        </CardContent>
      </Card>

      {/* Existing Configurations */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Current Academic Configurations</h3>
        
        {Object.values(groupedConsoles).map((group: any, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {group.curriculum} - {group.session}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Grade</TableHead>
                    <TableHead>Batches</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.grades.map((gradeData: any) => (
                    <TableRow key={gradeData.id}>
                      <TableCell>
                        <Badge variant="outline">{gradeData.grade}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {gradeData.batches.map((batch: string) => (
                            <Badge key={batch} variant="secondary">
                              {batch}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(gradeData.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteConsole(gradeData.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}

        {Object.keys(groupedConsoles).length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No academic configurations found. Add your first configuration above.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
