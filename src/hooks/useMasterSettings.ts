
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface MasterSetting {
  id: string;
  name: string;
  type: 'academic_year' | 'session' | 'curriculum' | 'grade' | 'batch' | 'subject';
  subject_type?: 'Core_subject' | 'language_subject' | 'cocurricular_subject';
  created_at: string;
}

export function useMasterSettings() {
  const [academicYears, setAcademicYears] = useState<MasterSetting[]>([]);
  const [sessions, setSessions] = useState<MasterSetting[]>([]);
  const [curriculums, setCurriculums] = useState<MasterSetting[]>([]);
  const [grades, setGrades] = useState<MasterSetting[]>([]);
  const [batches, setBatches] = useState<MasterSetting[]>([]);
  const [subjects, setSubjects] = useState<MasterSetting[]>([]);

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
          break;
        case 'session':
          setSessions(prev => [...prev, newItem]);
          break;
        case 'curriculum':
          setCurriculums(prev => [...prev, newItem]);
          break;
        case 'grade':
          setGrades(prev => [...prev, newItem]);
          break;
        case 'batch':
          setBatches(prev => [...prev, newItem]);
          break;
        case 'subject':
          setSubjects(prev => [...prev, newItem]);
          break;
      }

      toast.success(`${type.replace('_', ' ')} added successfully`);
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item');
    }
  };

  const handleSaveEdit = async (type: string, editingItem: string | null, editValue: string, editSubjectType?: string) => {
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

  return {
    academicYears,
    sessions,
    curriculums,
    grades,
    batches,
    subjects,
    handleAdd,
    handleSaveEdit,
    handleDelete
  };
}
