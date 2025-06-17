
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Edit, Check, X, Building2, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { AcademicConsoleTab } from './AcademicConsoleTab';

interface MasterSetting {
  id: string;
  name: string;
  type: 'academic_year' | 'session' | 'curriculum' | 'grade' | 'batch' | 'subject';
  subject_type?: 'Core_subject' | 'language_subject' | 'cocurricular_subject';
  created_at: string;
}

export function MasterSettingsTab() {
  const [academicYears, setAcademicYears] = useState<MasterSetting[]>([]);
  const [sessions, setSessions] = useState<MasterSetting[]>([]);
  const [curriculums, setCurriculums] = useState<MasterSetting[]>([]);
  const [grades, setGrades] = useState<MasterSetting[]>([]);
  const [batches, setBatches] = useState<MasterSetting[]>([]);
  const [subjects, setSubjects] = useState<MasterSetting[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [editSubjectType, setEditSubjectType] = useState<'Core_subject' | 'language_subject' | 'cocurricular_subject'>('Core_subject');

  // New item forms
  const [newAcademicYear, setNewAcademicYear] = useState('');
  const [newSession, setNewSession] = useState('');
  const [newCurriculum, setNewCurriculum] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [newBatch, setNewBatch] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newSubjectType, setNewSubjectType] = useState<'Core_subject' | 'language_subject' | 'cocurricular_subject'>('Core_subject');

  useEffect(() => {
    fetchAllMasterSettings();
  }, []);

  const fetchAllMasterSettings = async () => {
    try {
      // Mock data for now - will be replaced with actual API calls
      const mockAcademicYears: MasterSetting[] = [
        { id: '1', name: '2023-2024', type: 'academic_year', created_at: new Date().toISOString() },
        { id: '2', name: '2024-2025', type: 'academic_year', created_at: new Date().toISOString() },
      ];

      const mockSessions: MasterSetting[] = [
        { id: '3', name: 'Morning', type: 'session', created_at: new Date().toISOString() },
        { id: '4', name: 'Afternoon', type: 'session', created_at: new Date().toISOString() },
      ];

      const mockCurriculums: MasterSetting[] = [
        { id: '5', name: 'CBSE', type: 'curriculum', created_at: new Date().toISOString() },
        { id: '6', name: 'ICSE', type: 'curriculum', created_at: new Date().toISOString() },
        { id: '7', name: 'State Board', type: 'curriculum', created_at: new Date().toISOString() },
      ];

      const mockGrades: MasterSetting[] = [
        { id: '8', name: 'Grade 1', type: 'grade', created_at: new Date().toISOString() },
        { id: '9', name: 'Grade 2', type: 'grade', created_at: new Date().toISOString() },
        { id: '10', name: 'Grade 3', type: 'grade', created_at: new Date().toISOString() },
      ];

      const mockBatches: MasterSetting[] = [
        { id: '11', name: 'Batch A', type: 'batch', created_at: new Date().toISOString() },
        { id: '12', name: 'Batch B', type: 'batch', created_at: new Date().toISOString() },
        { id: '13', name: 'Batch C', type: 'batch', created_at: new Date().toISOString() },
      ];

      const mockSubjects: MasterSetting[] = [
        { id: '14', name: 'Mathematics', type: 'subject', subject_type: 'Core_subject', created_at: new Date().toISOString() },
        { id: '15', name: 'English', type: 'subject', subject_type: 'language_subject', created_at: new Date().toISOString() },
        { id: '16', name: 'Sports', type: 'subject', subject_type: 'cocurricular_subject', created_at: new Date().toISOString() },
      ];

      setAcademicYears(mockAcademicYears);
      setSessions(mockSessions);
      setCurriculums(mockCurriculums);
      setGrades(mockGrades);
      setBatches(mockBatches);
      setSubjects(mockSubjects);
    } catch (error) {
      console.error('Error fetching master settings:', error);
      toast.error('Failed to load master settings');
    }
  };

  const handleAdd = async (type: string, value: string, subjectType?: string) => {
    if (!value.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    if (type === 'subject' && !subjectType) {
      toast.error('Please select a subject type');
      return;
    }

    try {
      const newItem: MasterSetting = {
        id: Math.random().toString(36).substr(2, 9),
        name: value.trim(),
        type: type as any,
        ...(type === 'subject' && { subject_type: subjectType as any }),
        created_at: new Date().toISOString()
      };

      switch (type) {
        case 'academic_year':
          setAcademicYears(prev => [...prev, newItem]);
          setNewAcademicYear('');
          break;
        case 'session':
          setSessions(prev => [...prev, newItem]);
          setNewSession('');
          break;
        case 'curriculum':
          setCurriculums(prev => [...prev, newItem]);
          setNewCurriculum('');
          break;
        case 'grade':
          setGrades(prev => [...prev, newItem]);
          setNewGrade('');
          break;
        case 'batch':
          setBatches(prev => [...prev, newItem]);
          setNewBatch('');
          break;
        case 'subject':
          setSubjects(prev => [...prev, newItem]);
          setNewSubject('');
          setNewSubjectType('Core_subject');
          break;
      }

      toast.success(`${type.replace('_', ' ')} added successfully`);
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item');
    }
  };

  const handleEdit = (id: string, currentValue: string, currentSubjectType?: string) => {
    setEditingItem(id);
    setEditValue(currentValue);
    if (currentSubjectType) {
      setEditSubjectType(currentSubjectType as any);
    }
  };

  const handleSaveEdit = async (type: string) => {
    if (!editValue.trim()) {
      toast.error('Please enter a valid name');
      return;
    }

    try {
      const updateItems = (items: MasterSetting[]) =>
        items.map(item =>
          item.id === editingItem
            ? { 
                ...item, 
                name: editValue.trim(),
                ...(type === 'subject' && { subject_type: editSubjectType })
              }
            : item
        );

      switch (type) {
        case 'academic_year':
          setAcademicYears(updateItems);
          break;
        case 'session':
          setSessions(updateItems);
          break;
        case 'curriculum':
          setCurriculums(updateItems);
          break;
        case 'grade':
          setGrades(updateItems);
          break;
        case 'batch':
          setBatches(updateItems);
          break;
        case 'subject':
          setSubjects(updateItems);
          break;
      }

      setEditingItem(null);
      setEditValue('');
      setEditSubjectType('Core_subject');
      toast.success('Item updated successfully');
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item');
    }
  };

  const handleDelete = async (id: string, type: string) => {
    try {
      const filterItems = (items: MasterSetting[]) =>
        items.filter(item => item.id !== id);

      switch (type) {
        case 'academic_year':
          setAcademicYears(filterItems);
          break;
        case 'session':
          setSessions(filterItems);
          break;
        case 'curriculum':
          setCurriculums(filterItems);
          break;
        case 'grade':
          setGrades(filterItems);
          break;
        case 'batch':
          setBatches(filterItems);
          break;
        case 'subject':
          setSubjects(filterItems);
          break;
      }

      toast.success('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const renderTable = (items: MasterSetting[], type: string, newValue: string, setNewValue: (value: string) => void) => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder={`Enter ${type.replace('_', ' ')}`}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd(type, newValue)}
        />
        <Button onClick={() => handleAdd(type, newValue)}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {editingItem === item.id ? (
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(type)}
                  />
                ) : (
                  <Badge variant="outline">{item.name}</Badge>
                )}
              </TableCell>
              <TableCell>
                {new Date(item.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                {editingItem === item.id ? (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSaveEdit(type)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingItem(null);
                        setEditValue('');
                        setEditSubjectType('Core_subject');
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item.id, item.name)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id, type)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderSubjectTable = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Input
          placeholder="Enter subject name"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd('subject', newSubject, newSubjectType)}
        />
        <Select value={newSubjectType} onValueChange={(value: any) => setNewSubjectType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select subject type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Core_subject">Core Subject</SelectItem>
            <SelectItem value="language_subject">Language Subject</SelectItem>
            <SelectItem value="cocurricular_subject">Co-curricular Subject</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => handleAdd('subject', newSubject, newSubjectType)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Subject
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {editingItem === item.id ? (
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit('subject')}
                  />
                ) : (
                  <Badge variant="outline">{item.name}</Badge>
                )}
              </TableCell>
              <TableCell>
                {editingItem === item.id ? (
                  <Select value={editSubjectType} onValueChange={(value: any) => setEditSubjectType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Core_subject">Core Subject</SelectItem>
                      <SelectItem value="language_subject">Language Subject</SelectItem>
                      <SelectItem value="cocurricular_subject">Co-curricular Subject</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="secondary">
                    {item.subject_type?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {new Date(item.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                {editingItem === item.id ? (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSaveEdit('subject')}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingItem(null);
                        setEditValue('');
                        setEditSubjectType('Core_subject');
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item.id, item.name, item.subject_type)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id, 'subject')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Master Settings</h2>
        <p className="text-muted-foreground">
          Manage academic year, session, curriculum, grade, batch, subject settings and academic console configurations
        </p>
      </div>

      <Tabs defaultValue="academic_year" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="academic_year">Academic Year</TabsTrigger>
          <TabsTrigger value="session">Session</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="grade">Grade</TabsTrigger>
          <TabsTrigger value="batch">Batch</TabsTrigger>
          <TabsTrigger value="subject">
            <BookOpen className="h-4 w-4 mr-2" />
            Subject
          </TabsTrigger>
          <TabsTrigger value="academic_console">
            <Building2 className="h-4 w-4 mr-2" />
            Academic Console
          </TabsTrigger>
        </TabsList>

        <TabsContent value="academic_year" className="mt-6">
          {renderTable(academicYears, 'academic_year', newAcademicYear, setNewAcademicYear)}
        </TabsContent>

        <TabsContent value="session" className="mt-6">
          {renderTable(sessions, 'session', newSession, setNewSession)}
        </TabsContent>

        <TabsContent value="curriculum" className="mt-6">
          {renderTable(curriculums, 'curriculum', newCurriculum, setNewCurriculum)}
        </TabsContent>

        <TabsContent value="grade" className="mt-6">
          {renderTable(grades, 'grade', newGrade, setNewGrade)}
        </TabsContent>

        <TabsContent value="batch" className="mt-6">
          {renderTable(batches, 'batch', newBatch, setNewBatch)}
        </TabsContent>

        <TabsContent value="subject" className="mt-6">
          {renderSubjectTable()}
        </TabsContent>

        <TabsContent value="academic_console" className="mt-6">
          <AcademicConsoleTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
