
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Parent } from './types';

interface ParentViewProps {
  parentId: string;
  onBack: () => void;
}

export function ParentView({ parentId }: ParentViewProps) {
  const [parent, setParent] = useState<Parent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchParent();
  }, [parentId]);

  const fetchParent = async () => {
    setIsLoading(true);
    try {
      // Mock parent data
      const mockParent: Parent = {
        id: parentId,
        name: "Robert Smith",
        email: "robert.smith@email.com",
        address: "123 Main St, City, State",
        state: "California",
        country: "USA",
        phone: "+1 (555) 123-4567",
        relationship: "Father",
        created_at: new Date().toISOString()
      };
      
      setParent(mockParent);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching parent:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse space-y-4">Loading...</div>;
  }

  if (!parent) {
    return <div>Parent not found</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">{parent.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{parent.name}</CardTitle>
              <p className="text-muted-foreground">{parent.email}</p>
              <Badge variant="secondary" className="mt-2">{parent.relationship}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Phone:</span> {parent.phone}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {parent.email}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Address</h4>
              <div className="space-y-2 text-sm">
                <div>{parent.address}</div>
                <div>{parent.state}, {parent.country}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
