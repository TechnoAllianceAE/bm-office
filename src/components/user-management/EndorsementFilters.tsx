
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface EndorsementFiltersProps {
  filterGrade: string;
  filterBatch: string;
  onFilterGradeChange: (value: string) => void;
  onFilterBatchChange: (value: string) => void;
}

export function EndorsementFilters({ 
  filterGrade, 
  filterBatch, 
  onFilterGradeChange, 
  onFilterBatchChange 
}: EndorsementFiltersProps) {
  const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const batches = ['A', 'B', 'C', 'D'];

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-medium">Filter Class Teacher Endorsements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Filter by Grade</Label>
          <Select value={filterGrade} onValueChange={onFilterGradeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All grades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All grades</SelectItem>
              {grades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  Grade {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Filter by Batch</Label>
          <Select value={filterBatch} onValueChange={onFilterBatchChange}>
            <SelectTrigger>
              <SelectValue placeholder="All batches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All batches</SelectItem>
              {batches.map((batch) => (
                <SelectItem key={batch} value={batch}>
                  Batch {batch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
