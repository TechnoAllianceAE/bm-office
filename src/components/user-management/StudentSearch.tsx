
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StudentSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  gradeFilter: string;
  setGradeFilter: (grade: string) => void;
  batchFilter: string;
  setBatchFilter: (batch: string) => void;
}

export function StudentSearch({ 
  searchTerm, 
  setSearchTerm, 
  gradeFilter, 
  setGradeFilter,
  batchFilter,
  setBatchFilter 
}: StudentSearchProps) {
  const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const batches = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 w-full sm:w-[250px]"
        />
      </div>
      
      <Select value={gradeFilter} onValueChange={setGradeFilter}>
        <SelectTrigger className="w-full sm:w-[120px]">
          <SelectValue placeholder="Grade" />
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
        <SelectTrigger className="w-full sm:w-[120px]">
          <SelectValue placeholder="Batch" />
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
