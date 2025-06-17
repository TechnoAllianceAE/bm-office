
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClassTeacherEndorsement } from './types';

interface FilteredEndorsementsListProps {
  filteredEndorsements: ClassTeacherEndorsement[];
  filterGrade: string;
  filterBatch: string;
}

export function FilteredEndorsementsList({ 
  filteredEndorsements, 
  filterGrade, 
  filterBatch 
}: FilteredEndorsementsListProps) {
  if (filterGrade === 'all' && filterBatch === 'all') {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        Filtered Results
        {filterGrade !== 'all' && ` - Grade ${filterGrade}`}
        {filterBatch !== 'all' && ` - Batch ${filterBatch}`}
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher Name</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEndorsements.map((endorsement) => (
            <TableRow key={endorsement.id}>
              <TableCell className="font-medium">{endorsement.teacher_name}</TableCell>
              <TableCell>Grade {endorsement.grade}</TableCell>
              <TableCell>Batch {endorsement.batch}</TableCell>
              <TableCell>{new Date(endorsement.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
