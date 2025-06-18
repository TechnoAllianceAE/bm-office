
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Save } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  code: string;
  type: 'Core_subject' | 'language_subject' | 'cocurricular_subject';
}

interface SubjectSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjects: Subject[];
  onEndorse: (selectedSubjectIds: string[]) => void;
  selectedStudentCount: number;
}

export function SubjectSelectionDialog({
  open,
  onOpenChange,
  subjects,
  onEndorse,
  selectedStudentCount
}: SubjectSelectionDialogProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const handleSubjectSelect = (subjectId: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    } else {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    }
  };

  const handleEndorse = () => {
    onEndorse(selectedSubjects);
    setSelectedSubjects([]);
  };

  const getSubjectTypeColor = (type: string) => {
    switch (type) {
      case 'Core_subject':
        return 'bg-blue-100 text-blue-800';
      case 'language_subject':
        return 'bg-green-100 text-green-800';
      case 'cocurricular_subject':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubjectTypeLabel = (type: string) => {
    switch (type) {
      case 'Core_subject':
        return 'Core Subject';
      case 'language_subject':
        return 'Language Subject';
      case 'cocurricular_subject':
        return 'Co-curricular Subject';
      default:
        return type;
    }
  };

  // Group subjects by type
  const groupedSubjects = subjects.reduce((acc, subject) => {
    if (!acc[subject.type]) {
      acc[subject.type] = [];
    }
    acc[subject.type].push(subject);
    return acc;
  }, {} as Record<string, Subject[]>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Subjects for Endorsement</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Endorsing {selectedStudentCount} student{selectedStudentCount !== 1 ? 's' : ''} for selected subjects
          </p>
        </DialogHeader>
        
        <div className="space-y-6">
          {Object.entries(groupedSubjects).map(([type, typeSubjects]) => (
            <div key={type} className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Badge className={getSubjectTypeColor(type)}>
                  {getSubjectTypeLabel(type)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  ({typeSubjects.length} subjects)
                </span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {typeSubjects.map((subject) => (
                  <div key={subject.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                    <Checkbox
                      checked={selectedSubjects.includes(subject.id)}
                      onCheckedChange={(checked) => handleSubjectSelect(subject.id, checked as boolean)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-sm text-muted-foreground">{subject.code}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selectedSubjects.length > 0 && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Endorsement Summary:</p>
            <p className="text-sm text-muted-foreground">
              {selectedStudentCount} student{selectedStudentCount !== 1 ? 's' : ''} will be endorsed for {selectedSubjects.length} subject{selectedSubjects.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleEndorse}
            disabled={selectedSubjects.length === 0}
          >
            <Save className="h-4 w-4 mr-2" />
            Endorse Subjects
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
