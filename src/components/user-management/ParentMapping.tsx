
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Search, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ParentMapping as ParentMappingType } from './types';

interface ParentMappingProps {
  onBack: () => void;
}

export function ParentMapping({ onBack }: ParentMappingProps) {
  const [mappings, setMappings] = useState<ParentMappingType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gradeFilter, setGradeFilter] = useState('all-grades');
  const [batchFilter, setBatchFilter] = useState('all-batches');
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedMapping, setSelectedMapping] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const grades = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const batches = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    fetchMappings();
  }, [gradeFilter, batchFilter]);

  const fetchMappings = async () => {
    setIsLoading(true);
    try {
      // Mock mapping data
      const mockMappings: ParentMappingType[] = [
        {
          id: "1",
          student_id: "1",
          parent_id: "1",
          student_name: "John Smith",
          parent_name: "Robert Smith",
          parent_relationship: "Father",
          created_at: new Date().toISOString()
        },
        {
          id: "2",
          student_id: "2",
          parent_id: "2",
          student_name: "Emily Johnson",
          parent_name: "Mary Johnson",
          parent_relationship: "Mother",
          created_at: new Date().toISOString()
        }
      ];
      
      setMappings(mockMappings);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching mappings:", error);
      toast.error("Failed to load parent mappings");
      setIsLoading(false);
    }
  };

  const handleAddMapping = async () => {
    try {
      console.log('Adding parent mapping for:', selectedMapping, 'with email:', searchEmail);
      toast.success('Parent mapped successfully');
      setDialogOpen(false);
      setSearchEmail('');
      setSelectedMapping('');
      fetchMappings();
    } catch (error) {
      toast.error('Failed to map parent');
    }
  };

  const handleSync = async () => {
    try {
      console.log('Syncing parent mappings...');
      toast.success('Parent mappings synced successfully');
      fetchMappings();
    } catch (error) {
      toast.error('Failed to sync mappings');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4">
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
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSync}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Mapped Parent</TableHead>
              <TableHead>Relationship</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mappings.map((mapping) => (
              <TableRow key={mapping.id}>
                <TableCell>
                  <div className="font-medium">{mapping.student_name}</div>
                </TableCell>
                <TableCell>
                  <div>{mapping.parent_name}</div>
                </TableCell>
                <TableCell>
                  <div>{mapping.parent_relationship}</div>
                </TableCell>
                <TableCell>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedMapping(mapping.student_id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Map Parent
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Map New Parent</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="search-email">Search Parent by Email</Label>
                          <div className="flex gap-2">
                            <Input
                              id="search-email"
                              placeholder="Enter parent email..."
                              value={searchEmail}
                              onChange={(e) => setSearchEmail(e.target.value)}
                            />
                            <Button variant="outline">
                              <Search className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddMapping}>
                            Map Parent
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {mappings.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No parent mappings found for the selected criteria.</p>
        </div>
      )}
    </div>
  );
}
