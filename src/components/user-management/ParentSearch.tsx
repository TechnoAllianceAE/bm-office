
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ParentSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  gradeFilter: string;
  setGradeFilter: (grade: string) => void;
  batchFilter: string;
  setBatchFilter: (batch: string) => void;
}

export function ParentSearch({ 
  searchTerm, 
  setSearchTerm, 
  gradeFilter, 
  setGradeFilter,
  batchFilter,
  setBatchFilter
}: ParentSearchProps) {
  const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const batches = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 flex-1">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search parents by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={gradeFilter} onValueChange={setGradeFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by grade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-grades">All Grades</SelectItem>
          {grades.map((grade) => (
            <SelectItem key={grade} value={grade}>
              {grade}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={batchFilter} onValueChange={setBatchFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by batch" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-batches">All Batches</SelectItem>
          {batches.map((batch) => (
            <SelectItem key={batch} value={batch}>
              Batch {batch}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
