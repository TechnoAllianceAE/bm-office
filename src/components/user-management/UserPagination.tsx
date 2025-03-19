
import { Button } from '@/components/ui/button';

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  setCurrentPage: (page: number) => void;
}

export function UserPagination({ 
  currentPage, 
  totalPages, 
  isLoading, 
  setCurrentPage 
}: UserPaginationProps) {
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1 || isLoading}
      >
        Previous
      </Button>
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(i + 1)}
            disabled={isLoading}
            className="w-8 h-8 p-0"
          >
            {i + 1}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages || isLoading}
      >
        Next
      </Button>
    </div>
  );
}
