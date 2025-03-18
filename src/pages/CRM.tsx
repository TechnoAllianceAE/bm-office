
import React, { useState } from 'react';
import { 
  Users, UserPlus, Search, Filter, MoreHorizontal, 
  Mail, Phone, Calendar, Star, StarOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Sample contact data
const contacts = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    phone: '+1 (555) 123-4567', 
    company: 'ABC Inc.', 
    status: 'Customer',
    lastContact: '2023-12-10',
    isStarred: true 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    phone: '+1 (555) 987-6543', 
    company: 'XYZ Corp.', 
    status: 'Lead',
    lastContact: '2023-12-15',
    isStarred: false 
  },
  { 
    id: 3, 
    name: 'Michael Johnson', 
    email: 'michael.j@example.com', 
    phone: '+1 (555) 246-8101', 
    company: 'Johnson & Co.', 
    status: 'Prospect',
    lastContact: '2023-12-05',
    isStarred: true 
  },
  { 
    id: 4, 
    name: 'Emily Brown', 
    email: 'emily.brown@example.com', 
    phone: '+1 (555) 369-8520', 
    company: 'Brown Enterprises', 
    status: 'Customer',
    lastContact: '2023-12-18',
    isStarred: false 
  },
  { 
    id: 5, 
    name: 'Robert Wilson', 
    email: 'robert.w@example.com', 
    phone: '+1 (555) 159-7530', 
    company: 'Wilson Tech', 
    status: 'Lead',
    lastContact: '2023-12-12',
    isStarred: false 
  },
];

const CRM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [starredFilter, setStarredFilter] = useState(false);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (starredFilter) {
      return matchesSearch && contact.isStarred;
    }
    return matchesSearch;
  });

  const toggleContactSelection = (id: number) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const toggleStarred = (id: number) => {
    // In a real app, you would update this in the database
    console.log(`Toggling starred status for contact ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Relationship Management</h1>
          <p className="text-muted-foreground">Manage your contacts, leads, and customers.</p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Add Contact</span>
        </Button>
      </div>

      <Tabs defaultValue="contacts">
        <TabsList>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contacts" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search contacts..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setStarredFilter(!starredFilter)}
              className={starredFilter ? "bg-amber-100" : ""}
            >
              <Star className={`h-4 w-4 ${starredFilter ? "text-amber-500" : ""}`} />
            </Button>
          </div>
          
          <div className="rounded-md border">
            <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
              <div className="col-span-4">Name / Company</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Phone</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            
            {filteredContacts.length > 0 ? (
              <div>
                {filteredContacts.map(contact => (
                  <div 
                    key={contact.id} 
                    className="grid grid-cols-12 items-center border-b px-4 py-3 text-sm last:border-0 hover:bg-muted/50"
                  >
                    <div className="col-span-4 flex items-center gap-2">
                      <div 
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                      >
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">{contact.company}</div>
                      </div>
                    </div>
                    <div className="col-span-3 truncate">{contact.email}</div>
                    <div className="col-span-2">{contact.phone}</div>
                    <div className="col-span-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        contact.status === 'Customer' 
                          ? 'bg-green-100 text-green-800' 
                          : contact.status === 'Lead'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                    <div className="col-span-1 flex justify-end space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleStarred(contact.id)}
                      >
                        {contact.isStarred ? (
                          <Star className="h-4 w-4 text-amber-500" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center">
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Email</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Phone className="mr-2 h-4 w-4" />
                            <span>Call</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Schedule</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No contacts found</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                  {searchTerm 
                    ? "Try adjusting your search filters." 
                    : "Get started by adding your first contact."}
                </p>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Contact
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="companies">
          <Card>
            <CardHeader>
              <CardTitle>Companies</CardTitle>
              <CardDescription>
                View and manage your business relationships.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Companies view is under development.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="deals">
          <Card>
            <CardHeader>
              <CardTitle>Deals & Opportunities</CardTitle>
              <CardDescription>
                Track your sales pipeline and opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Deals view is under development.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Activities</CardTitle>
              <CardDescription>
                Track interactions and schedule follow-ups.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Activities view is under development.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CRM;
