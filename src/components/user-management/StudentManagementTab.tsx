
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Student } from './types';
import { StudentSearch } from './StudentSearch';
import { StudentList } from './StudentList';
import { StudentPagination } from './StudentPagination';
import { AddStudentDialog } from './AddStudentDialog';

export function StudentManagementTab() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchStudents();
  }, [currentPage, gradeFilter, batchFilter]);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      // Mock students data
      const mockStudents: Student[] = [
        {
          id: "1",
          admission_no: "ADM001",
          name: "John Smith",
          address: "123 Main St, City, State",
          phone: "+1 (555) 123-4567",
          father_name: "Robert Smith",
          email: "john.smith@student.com",
          school: "Springfield High School",
          gender: "Male",
          session: "2024-25",
          curriculum: "CBSE",
          grade: "10th",
          batch: "A",
          age: 16,
          profile_pic: "https://i.pravatar.cc/150?img=1",
          created_at: new Date().toISOString()
        },
        {
          id: "2",
          admission_no: "ADM002",
          name: "Emily Johnson",
          address: "456 Oak Ave, City, State",
          phone: "+1 (555) 234-5678",
          father_name: "Michael Johnson",
          email: "emily.johnson@student.com",
          school: "Springfield High School",
          gender: "Female",
          session: "2024-25",
          curriculum: "CBSE",
          grade: "9th",
          batch: "B",
          age: 15,
          profile_pic: "https://i.pravatar.cc/150?img=5",
          created_at: new Date().toISOString()
        },
        {
          id: "3",
          admission_no: "ADM003",
          name: "Alex Davis",
          address: "789 Pine St, City, State",
          phone: "+1 (555) 345-6789",
          father_name: "David Davis",
          email: "alex.davis@student.com",
          school: "Central Academy",
          gender: "Male",
          session: "2024-25",
          curriculum: "ICSE",
          grade: "11th",
          batch: "A",
          age: 17,
          profile_pic: "https://i.pravatar.cc/150?img=8",
          created_at: new Date().toISOString()
        }
      ];
      
      setStudents(mockStudents);
      setTotalPages(Math.ceil(mockStudents.length / pageSize));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load students");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <StudentSearch 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          gradeFilter={gradeFilter}
          setGradeFilter={setGradeFilter}
          batchFilter={batchFilter}
          setBatchFilter={setBatchFilter}
        />
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchStudents} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <AddStudentDialog onStudentAdded={fetchStudents} />
        </div>
      </div>
      
      <StudentList 
        students={students} 
        isLoading={isLoading} 
        searchTerm={searchTerm}
        gradeFilter={gradeFilter}
        batchFilter={batchFilter}
      />
      
      <StudentPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        isLoading={isLoading} 
        setCurrentPage={setCurrentPage} 
      />
    </div>
  );
}
