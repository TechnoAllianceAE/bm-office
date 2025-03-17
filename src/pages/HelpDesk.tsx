
import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter, MoreHorizontal, MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const ticketStatuses = {
  open: { color: 'bg-green-500/20 text-green-700', label: 'Open' },
  pending: { color: 'bg-amber-500/20 text-amber-700', label: 'Pending' },
  resolved: { color: 'bg-blue-500/20 text-blue-700', label: 'Resolved' },
  closed: { color: 'bg-slate-500/20 text-slate-700', label: 'Closed' },
};

const sampleTickets = [
  { id: 'TKT-1001', title: 'Cannot access the email server', status: 'open', priority: 'high', category: 'Infrastructure', assignee: 'John Smith', created: '2 hours ago', updated: '30 min ago' },
  { id: 'TKT-1002', title: 'Need access to marketing resources', status: 'pending', priority: 'medium', category: 'Access Request', assignee: 'Lisa Johnson', created: '1 day ago', updated: '3 hours ago' },
  { id: 'TKT-1003', title: 'Website loading slow on Firefox', status: 'open', priority: 'low', category: 'Website', assignee: 'Unassigned', created: '2 days ago', updated: '1 day ago' },
  { id: 'TKT-1004', title: 'Reset password for account', status: 'resolved', priority: 'medium', category: 'Account', assignee: 'John Smith', created: '3 days ago', updated: '1 day ago' },
  { id: 'TKT-1005', title: 'Need help with Excel formula', status: 'closed', priority: 'low', category: 'Software', assignee: 'Maria Garcia', created: '1 week ago', updated: '2 days ago' },
];

const HelpDesk = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };
  
  const filteredTickets = sampleTickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Help Desk</h1>
          <p className="text-muted-foreground">Manage support tickets and requests</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            New Ticket
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="page-content p-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tickets..." 
                  className="pl-8 bg-white/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2 max-h-[600px] overflow-auto">
              {filteredTickets.map((ticket) => (
                <div 
                  key={ticket.id}
                  className={`p-3 rounded-md cursor-pointer border border-white/10 transition-colors ${
                    selectedTicket?.id === ticket.id 
                      ? 'bg-primary/10' 
                      : 'bg-white/30 hover:bg-white/40'
                  }`}
                  onClick={() => handleTicketClick(ticket)}
                >
                  <div className="flex justify-between items-start">
                    <div className="text-sm font-medium">{ticket.title}</div>
                    <Badge className={`${ticketStatuses[ticket.status].color} ml-2`}>
                      {ticketStatuses[ticket.status].label}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <div>{ticket.id}</div>
                    <div>{ticket.updated}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          {selectedTicket ? (
            <Card className="page-content h-full p-0">
              <div className="border-b border-white/20 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-medium">{selectedTicket.title}</h2>
                  <div className="flex space-x-2">
                    <Badge className={ticketStatuses[selectedTicket.status].color}>
                      {ticketStatuses[selectedTicket.status].label}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">ID</div>
                    <div>{selectedTicket.id}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Priority</div>
                    <div className="capitalize">{selectedTicket.priority}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Category</div>
                    <div>{selectedTicket.category}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Assignee</div>
                    <div>{selectedTicket.assignee}</div>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="conversation" className="h-[calc(100%-88px)]">
                <div className="px-4 border-b border-white/20">
                  <TabsList className="bg-white/30 mt-2">
                    <TabsTrigger value="conversation">Conversation</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="conversation" className="p-4 space-y-4 h-[400px] overflow-auto">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      A
                    </div>
                    <div className="bg-white/30 rounded-lg p-3 text-sm max-w-[80%]">
                      <div className="font-medium">Alice Cooper</div>
                      <div className="text-xs text-muted-foreground mb-1">2 hours ago</div>
                      <p>I'm unable to access the email server. I've tried restarting my computer and clearing browser cache but still getting an error.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary/10 rounded-lg p-3 text-sm max-w-[80%]">
                      <div className="font-medium">Support Team</div>
                      <div className="text-xs text-muted-foreground mb-1">30 min ago</div>
                      <p>Thanks for reporting this. We're investigating the email server issue. Could you please provide the exact error message you're seeing?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      S
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <Textarea 
                      placeholder="Type your message..." 
                      className="bg-white/30 min-h-[100px]"
                    />
                    <div className="flex justify-end mt-2">
                      <Button className="gap-1">
                        <MessageSquare className="h-4 w-4" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Ticket Information</div>
                      <div className="space-y-2 bg-white/30 rounded-md p-3">
                        <div>
                          <div className="text-xs text-muted-foreground">Created</div>
                          <div className="text-sm">{selectedTicket.created}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Last Updated</div>
                          <div className="text-sm">{selectedTicket.updated}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Status</div>
                          <div className="text-sm">{ticketStatuses[selectedTicket.status].label}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Contact Information</div>
                      <div className="space-y-2 bg-white/30 rounded-md p-3">
                        <div>
                          <div className="text-xs text-muted-foreground">Reported By</div>
                          <div className="text-sm">Alice Cooper</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Email</div>
                          <div className="text-sm">alice.cooper@company.com</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Department</div>
                          <div className="text-sm">Marketing</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">Description</div>
                    <div className="bg-white/30 rounded-md p-3">
                      <p className="text-sm">I'm unable to access the email server. When trying to log in, I get an "Authentication failed" error. I've tried restarting my computer and clearing browser cache but still getting the same error.</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">Actions</div>
                    <div className="flex space-x-2">
                      <Select>
                        <SelectTrigger className="w-[180px] bg-white/30">
                          <SelectValue placeholder="Change Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select>
                        <SelectTrigger className="w-[180px] bg-white/30">
                          <SelectValue placeholder="Assign To" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john">John Smith</SelectItem>
                          <SelectItem value="lisa">Lisa Johnson</SelectItem>
                          <SelectItem value="maria">Maria Garcia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="activity" className="p-4">
                  <div className="space-y-4">
                    <div className="text-sm font-medium">Activity Log</div>
                    <div className="space-y-2 max-h-[400px] overflow-auto">
                      <div className="flex gap-3 items-start p-2 border-l-2 border-green-500">
                        <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm">Ticket created</div>
                          <div className="text-xs text-muted-foreground">2 hours ago by Alice Cooper</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 items-start p-2 border-l-2 border-blue-500">
                        <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm">Support agent replied</div>
                          <div className="text-xs text-muted-foreground">30 min ago by Support Team</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 items-start p-2 border-l-2 border-amber-500">
                        <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm">Priority changed to High</div>
                          <div className="text-xs text-muted-foreground">15 min ago by System</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 items-start p-2 border-l-2 border-purple-500">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm">Assigned to John Smith</div>
                          <div className="text-xs text-muted-foreground">10 min ago by System</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          ) : (
            <Card className="page-content h-full flex flex-col items-center justify-center text-center p-8">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium">No Ticket Selected</h3>
              <p className="text-muted-foreground max-w-md mt-2">
                Select a ticket from the list to view details or create a new ticket to get started.
              </p>
              <Button className="mt-4 gap-1">
                <Plus className="h-4 w-4" />
                Create New Ticket
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;
