
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  type: 'Core_subject' | 'language_subject' | 'cocurricular_subject';
}

interface TeacherSubjectSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSubjects: string[];
  onSubjectSelection: (subjects: string[]) => void;
}

export function TeacherSubjectSelectionDialog({
  open,
  onOpenChange,
  selectedSubjects,
  onSubjectSelection
}: TeacherSubjectSelectionDialogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [tempSelectedSubjects, setTempSelectedSubjects] = useState<string[]>(selectedSubjects);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    setTempSelectedSubjects(selectedSubjects);
  }, [selectedSubjects]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    // Mock subjects data
    const mockSubjects: Subject[] = [
      { id: '1', name: 'Mathematics', type: 'Core_subject' },
      { id: '2', name: 'Science', type: 'Core_subject' },
      { id: '3', name: 'Physics', type: 'Core_subject' },
      { id: '4', name: 'Chemistry', type: 'Core_subject' },
      { id: '5', name: 'Biology', type: 'Core_subject' },
      { id: '6', name: 'History', type: 'Core_subject' },
      { id: '7', name: 'Geography', type: 'Core_subject' },
      { id: '8', name: 'English', type: 'language_subject' },
      { id: '9', name: 'Hindi', type: 'language_subject' },
      { id: '10', name: 'Spanish', type: 'language_subject' },
      { id: '11', name: 'French', type: 'language_subject' },
      { id: '12', name: 'Literature', type: 'language_subject' },
      { id: '13', name: 'Sports', type: 'cocurricular_subject' },
      { id: '14', name: 'Art', type: 'cocurricular_subject' },
      { id: '15', name: 'Music', type: 'cocurricular_subject' },
      { id: '16', name: 'Drama', type: 'cocurricular_subject' },
      { id: '17', name: 'Dance', type: 'cocurricular_subject' }
    ];
    
    setSubjects(mockSubjects);
  };

  const handleSubjectToggle = (subjectName: string, checked: boolean) => {
    if (checked) {
      setTempSelectedSubjects([...tempSelectedSubjects, subjectName]);
    } else {
      setTempSelectedSubjects(tempSelectedSubjects.filter(s => s !== subjectName));
    }
  };

  const handleRemoveSubject = (subjectName: string) => {
    setTempSelectedSubjects(tempSelectedSubjects.filter(s => s !== subjectName));
  };

  const handleConfirm = () => {
    onSubjectSelection(tempSelectedSubjects);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setTempSelectedSubjects(selectedSubjects);
    onOpenChange(false);
  };

  // Filter subjects based on search term
  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group subjects by type
  const groupedSubjects = filteredSubjects.reduce((acc, subject) => {
    if (!acc[subject.type]) {
      acc[subject.type] = [];
    }
    acc[subject.type].push(subject);
    return acc;
  }, {} as Record<string, Subject[]>);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'Core_subject': return 'Core Subjects';
      case 'language_subject': return 'Language Subjects';
      case 'cocurricular_subject': return 'Co-curricular Subjects';
      default: return type;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Subjects for Endorsement</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Selected Subjects */}
          {tempSelectedSubjects.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Selected Subjects ({tempSelectedSubjects.length})</h4>
              <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg">
                {tempSelectedSubjects.map((subject) => (
                  <Badge key={subject} variant="default" className="flex items-center gap-1">
                    {subject}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleRemoveSubject(subject)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Subject Groups */}
          <div className="space-y-4">
            {Object.entries(groupedSubjects).map(([type, typeSubjects]) => (
              <div key={type} className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">
                  {getTypeLabel(type)}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {typeSubjects.map((subject) => (
                    <label key={subject.id} className="flex items-center space-x-2 p-2 rounded border hover:bg-muted/50">
                      <Checkbox
                        checked={tempSelectedSubjects.includes(subject.name)}
                        onCheckedChange={(checked) => handleSubjectToggle(subject.name, checked as boolean)}
                      />
                      <span className="text-sm">{subject.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredSubjects.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No subjects found matching your search.
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm Selection ({tempSelectedSubjects.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
