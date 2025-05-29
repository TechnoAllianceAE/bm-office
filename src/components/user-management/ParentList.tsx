
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Parent } from './types';
import { EditParentDialog } from './EditParentDialog';

interface ParentListProps {
  parents: Parent[];
  isLoading: boolean;
  searchTerm: string;
  gradeFilter: string;
  batchFilter: string;
  onViewParent?: (parentId: string) => void;
  onParentUpdated: () => void;
}

export function ParentList({ 
  parents, 
  isLoading, 
  searchTerm, 
  gradeFilter, 
  batchFilter,
  onViewParent,
  onParentUpdated
}: ParentListProps) {
  const filteredParents = parents.filter(parent => {
    const matchesSearch = 
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

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
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parent</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>State/Country</TableHead>
            <TableHead>Relationship</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredParents.map((parent) => (
            <TableRow key={parent.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{parent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{parent.name}</div>
                    <div className="text-sm text-muted-foreground">{parent.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{parent.address}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{parent.state}</div>
                  <div className="text-muted-foreground">{parent.country}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{parent.relationship}</Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">{parent.phone}</div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {onViewParent && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onViewParent(parent.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  <EditParentDialog parent={parent} onParentUpdated={onParentUpdated} />
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {filteredParents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No parents found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
