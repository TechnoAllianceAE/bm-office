
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit, Check, X } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  type: 'academic_year' | 'session' | 'curriculum' | 'grade' | 'batch' | 'subject';
  subject_type?: 'Core_subject' | 'language_subject' | 'cocurricular_subject';
  created_at: string;
}

interface SubjectTableProps {
  subjects: Subject[];
  newSubject: string;
  setNewSubject: (value: string) => void;
  newSubjectType: 'Core_subject' | 'language_subject' | 'cocurricular_subject';
  setNewSubjectType: (value: 'Core_subject' | 'language_subject' | 'cocurricular_subject') => void;
  onAdd: (type: string, value: string, subjectType?: string) => void;
  onEdit: (id: string, currentValue: string, currentSubjectType?: string) => void;
  onSaveEdit: (type: string) => void;
  onDelete: (id: string, type: string) => void;
  editingItem: string | null;
  editValue: string;
  setEditValue: (value: string) => void;
  editSubjectType: 'Core_subject' | 'language_subject' | 'cocurricular_subject';
  setEditSubjectType: (value: 'Core_subject' | 'language_subject' | 'cocurricular_subject') => void;
  setEditingItem: (id: string | null) => void;
}

export function SubjectTable({
  subjects,
  newSubject,
  setNewSubject,
  newSubjectType,
  setNewSubjectType,
  onAdd,
  onEdit,
  onSaveEdit,
  onDelete,
  editingItem,
  editValue,
  setEditValue,
  editSubjectType,
  setEditSubjectType,
  setEditingItem
}: SubjectTableProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Input
          placeholder="Enter subject name"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onAdd('subject', newSubject, newSubjectType)}
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
        <Button onClick={() => onAdd('subject', newSubject, newSubjectType)}>
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
                    onKeyPress={(e) => e.key === 'Enter' && onSaveEdit('subject')}
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
                      onClick={() => onSaveEdit('subject')}
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
                      onClick={() => onEdit(item.id, item.name, item.subject_type)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(item.id, 'subject')}
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
}
