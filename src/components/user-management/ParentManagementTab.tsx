
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { RefreshCw, Users, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Parent } from './types';
import { ParentSearch } from './ParentSearch';
import { ParentList } from './ParentList';
import { ParentPagination } from './ParentPagination';
import { AddParentDialog } from './AddParentDialog';
import { EditParentDialog } from './EditParentDialog';
import { ParentView } from './ParentView';
import { ParentMapping } from './ParentMapping';

type ViewMode = 'list' | 'view' | 'mapping';

export function ParentManagementTab() {
  const [parents, setParents] = useState<Parent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all-grades');
  const [batchFilter, setBatchFilter] = useState('all-batches');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedParentId, setSelectedParentId] = useState<string>('');
  const pageSize = 10;

  useEffect(() => {
    fetchParents();
  }, [currentPage, gradeFilter, batchFilter]);

  const fetchParents = async () => {
    setIsLoading(true);
    try {
      // Mock parents data
      const mockParents: Parent[] = [
        {
          id: "1",
          name: "Robert Smith",
          email: "robert.smith@email.com",
          address: "123 Main St, City, State",
          state: "California",
          country: "USA",
          phone: "+1 (555) 123-4567",
          relationship: "Father",
          created_at: new Date().toISOString()
        },
        {
          id: "2",
          name: "Mary Johnson",
          email: "mary.johnson@email.com",
          address: "456 Oak Ave, City, State",
          state: "California",
          country: "USA",
          phone: "+1 (555) 234-5678",
          relationship: "Mother",
          created_at: new Date().toISOString()
        },
        {
          id: "3",
          name: "David Davis",
          email: "david.davis@email.com",
          address: "789 Pine St, City, State",
          state: "Texas",
          country: "USA",
          phone: "+1 (555) 345-6789",
          relationship: "Guardian",
          created_at: new Date().toISOString()
        }
      ];
      
      setParents(mockParents);
      setTotalPages(Math.ceil(mockParents.length / pageSize));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching parents:", error);
      toast.error("Failed to load parents");
      setIsLoading(false);
    }
  };

  const handleViewParent = (parentId: string) => {
    setSelectedParentId(parentId);
    setViewMode('view');
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'view':
        return (
          <ParentView 
            parentId={selectedParentId} 
            onBack={() => setViewMode('list')} 
          />
        );
      case 'mapping':
        return <ParentMapping onBack={() => setViewMode('list')} />;
      default:
        return (
          <>
            <ParentList 
              parents={parents} 
              isLoading={isLoading} 
              searchTerm={searchTerm}
              gradeFilter={gradeFilter}
              batchFilter={batchFilter}
              onViewParent={handleViewParent}
              onParentUpdated={fetchParents}
            />
            
            <ParentPagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              isLoading={isLoading} 
              setCurrentPage={setCurrentPage} 
            />
          </>
        );
    }
  };

  return (
    <div className="space-y-4">
      {viewMode === 'list' && (
        <>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <ParentSearch 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              gradeFilter={gradeFilter}
              setGradeFilter={setGradeFilter}
              batchFilter={batchFilter}
              setBatchFilter={setBatchFilter}
            />
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchParents} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => setViewMode('mapping')}>
                <Users className="h-4 w-4 mr-2" />
                Parent Mapping
              </Button>
              
              <AddParentDialog onParentAdded={fetchParents} />
            </div>
          </div>
        </>
      )}
      
      {(viewMode === 'view' || viewMode === 'mapping') && (
        <div className="mb-4">
          <Button variant="outline" size="sm" onClick={() => setViewMode('list')}>
            ← Back to Parents
          </Button>
        </div>
      )}
      
      {renderContent()}
    </div>
  );
}
