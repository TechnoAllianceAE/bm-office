
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft } from 'lucide-react';
import { Student } from './types';

interface StudentEndorsement {
  student_id: string;
  subject_id: string;
  subject_name: string;
  subject_type: string;
}

interface StudentEndorsementViewProps {
  studentId: string;
  student?: Student;
  endorsements: StudentEndorsement[];
  onBack: () => void;
}

export function StudentEndorsementView({
  studentId,
  student,
  endorsements,
  onBack
}: StudentEndorsementViewProps) {
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

  // Group endorsements by type
  const groupedEndorsements = endorsements.reduce((acc, endorsement) => {
    if (!acc[endorsement.subject_type]) {
      acc[endorsement.subject_type] = [];
    }
    acc[endorsement.subject_type].push(endorsement);
    return acc;
  }, {} as Record<string, StudentEndorsement[]>);

  if (!student) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Students
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Student not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Students
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={student.profile_pic} alt={student.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
              {student.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <p className="text-muted-foreground">{student.email}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline">{student.admission_no}</Badge>
              <Badge variant="secondary">{student.grade}</Badge>
              <Badge variant="outline">Batch {student.batch}</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Endorsed Subjects</h3>
            <Badge variant="secondary">
              {endorsements.length} subject{endorsements.length !== 1 ? 's' : ''} endorsed
            </Badge>
          </div>

          {endorsements.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-medium mb-2">No subjects endorsed</h3>
              <p className="text-muted-foreground">
                This student hasn't been endorsed for any subjects yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedEndorsements).map(([type, typeEndorsements]) => (
                <div key={type} className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Badge className={getSubjectTypeColor(type)}>
                      {getSubjectTypeLabel(type)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      ({typeEndorsements.length} subject{typeEndorsements.length !== 1 ? 's' : ''})
                    </span>
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {typeEndorsements.map((endorsement) => (
                      <div key={endorsement.subject_id} className="p-3 border rounded-lg">
                        <div className="font-medium">{endorsement.subject_name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
