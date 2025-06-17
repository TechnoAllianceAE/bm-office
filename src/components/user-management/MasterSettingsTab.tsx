
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Building2 } from 'lucide-react';
import { AcademicConsoleTab } from './AcademicConsoleTab';
import { MasterSettingTable } from './MasterSettingTable';
import { SubjectTable } from './SubjectTable';
import { useMasterSettings } from '@/hooks/useMasterSettings';

export function MasterSettingsTab() {
  const {
    academicYears,
    sessions,
    curriculums,
    grades,
    batches,
    subjects,
    handleAdd,
    handleSaveEdit,
    handleDelete
  } = useMasterSettings();

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

  const handleEdit = (id: string, currentValue: string, currentSubjectType?: string) => {
    setEditingItem(id);
    setEditValue(currentValue);
    if (currentSubjectType) {
      setEditSubjectType(currentSubjectType as any);
    }
  };

  const handleSaveEditWrapper = async (type: string) => {
    await handleSaveEdit(type, editingItem, editValue, editSubjectType);
    setEditingItem(null);
    setEditValue('');
    setEditSubjectType('Core_subject');
  };

  const handleAddWrapper = async (type: string, value: string, subjectType?: string) => {
    await handleAdd(type, value, subjectType);
    
    // Reset form values
    switch (type) {
      case 'academic_year':
        setNewAcademicYear('');
        break;
      case 'session':
        setNewSession('');
        break;
      case 'curriculum':
        setNewCurriculum('');
        break;
      case 'grade':
        setNewGrade('');
        break;
      case 'batch':
        setNewBatch('');
        break;
      case 'subject':
        setNewSubject('');
        setNewSubjectType('Core_subject');
        break;
    }
  };

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
          <MasterSettingTable
            items={academicYears}
            type="academic_year"
            newValue={newAcademicYear}
            setNewValue={setNewAcademicYear}
            onAdd={handleAddWrapper}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEditWrapper}
            onDelete={handleDelete}
            editingItem={editingItem}
            editValue={editValue}
            setEditValue={setEditValue}
            setEditingItem={setEditingItem}
          />
        </TabsContent>

        <TabsContent value="session" className="mt-6">
          <MasterSettingTable
            items={sessions}
            type="session"
            newValue={newSession}
            setNewValue={setNewSession}
            onAdd={handleAddWrapper}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEditWrapper}
            onDelete={handleDelete}
            editingItem={editingItem}
            editValue={editValue}
            setEditValue={setEditValue}
            setEditingItem={setEditingItem}
          />
        </TabsContent>

        <TabsContent value="curriculum" className="mt-6">
          <MasterSettingTable
            items={curriculums}
            type="curriculum"
            newValue={newCurriculum}
            setNewValue={setNewCurriculum}
            onAdd={handleAddWrapper}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEditWrapper}
            onDelete={handleDelete}
            editingItem={editingItem}
            editValue={editValue}
            setEditValue={setEditValue}
            setEditingItem={setEditingItem}
          />
        </TabsContent>

        <TabsContent value="grade" className="mt-6">
          <MasterSettingTable
            items={grades}
            type="grade"
            newValue={newGrade}
            setNewValue={setNewGrade}
            onAdd={handleAddWrapper}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEditWrapper}
            onDelete={handleDelete}
            editingItem={editingItem}
            editValue={editValue}
            setEditValue={setEditValue}
            setEditingItem={setEditingItem}
          />
        </TabsContent>

        <TabsContent value="batch" className="mt-6">
          <MasterSettingTable
            items={batches}
            type="batch"
            newValue={newBatch}
            setNewValue={setNewBatch}
            onAdd={handleAddWrapper}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEditWrapper}
            onDelete={handleDelete}
            editingItem={editingItem}
            editValue={editValue}
            setEditValue={setEditValue}
            setEditingItem={setEditingItem}
          />
        </TabsContent>

        <TabsContent value="subject" className="mt-6">
          <SubjectTable
            subjects={subjects}
            newSubject={newSubject}
            setNewSubject={setNewSubject}
            newSubjectType={newSubjectType}
            setNewSubjectType={setNewSubjectType}
            onAdd={handleAddWrapper}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEditWrapper}
            onDelete={handleDelete}
            editingItem={editingItem}
            editValue={editValue}
            setEditValue={setEditValue}
            editSubjectType={editSubjectType}
            setEditSubjectType={setEditSubjectType}
            setEditingItem={setEditingItem}
          />
        </TabsContent>

        <TabsContent value="academic_console" className="mt-6">
          <AcademicConsoleTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
