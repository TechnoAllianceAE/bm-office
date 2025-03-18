import React, { useState } from 'react';
import { 
  Inbox, Mail, SendHorizontal, File, Star, AlertCircle, Trash2, 
  Archive, MoreHorizontal, Plus, Search, Settings, Download, 
  Paperclip, Bold, Italic, Underline, List, ListOrdered, AlignLeft, 
  AlignCenter, AlignRight, Image, Link, Settings2, Clock, Calendar, Filter, 
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Mock email data
const emails = [
  {
    id: 1,
    sender: 'John Smith',
    email: 'john.smith@company.com',
    subject: 'Weekly Team Meeting',
    content: 'Hi team, just a reminder about our weekly meeting tomorrow at 10am. Please prepare your updates.',
    date: '10:32 AM',
    isRead: true,
    isStarred: false,
    label: 'work',
  },
  {
    id: 2,
    sender: 'Project Notifier',
    email: 'notifications@projects.com',
    subject: 'New task assigned: Update dashboard analytics',
    content: 'A new task has been assigned to you in the project management system.',
    date: 'Jul 15',
    isRead: false,
    isStarred: true,
    label: 'work',
  },
  {
    id: 3,
    sender: 'Sales Team',
    email: 'sales@company.com',
    subject: 'Q2 Sales Report',
    content: 'Please find attached the Q2 sales report with analysis of regional performance.',
    date: 'Jul 14',
    isRead: true,
    isStarred: false,
    label: 'important',
  },
  {
    id: 4,
    sender: 'HR Department',
    email: 'hr@company.com',
    subject: 'Important: New Company Policy',
    content: 'Please review the updated company policy regarding remote work arrangements.',
    date: 'Jul 12',
    isRead: false,
    isStarred: false,
    label: 'important',
  },
  {
    id: 5,
    sender: 'Sarah Johnson',
    email: 'sarah.j@partner.com',
    subject: 'Partnership opportunity',
    content: 'I wanted to discuss a potential partnership between our companies that could be mutually beneficial.',
    date: 'Jul 10',
    isRead: true,
    isStarred: true,
    label: 'personal',
  },
  {
    id: 6,
    sender: 'AWS Notification',
    email: 'no-reply@aws.amazon.com',
    subject: 'AWS Monthly Cloud Usage Report',
    content: 'Your AWS cloud usage report for the previous month is now available.',
    date: 'Jul 5',
    isRead: true,
    isStarred: false,
    label: 'updates',
  },
];

const Mailbox = () => {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('inbox');
  
  const handleEmailSelect = (id: number) => {
    setSelectedEmail(id);
  };
  
  const closeEmailDetail = () => {
    setSelectedEmail(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Mailbox</h1>
          <p className="text-muted-foreground">Manage your messages</p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={() => setComposeOpen(true)}
            className="glassmorphic-button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Compose
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setSettingsOpen(true)}
            className="glassmorphic-button"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="col-span-1">
          <Card className="glassmorphic-card bg-white/80 overflow-visible">
            <div className="p-4">
              <Tabs defaultValue="inbox" onValueChange={setCurrentTab}>
                <TabsList className="w-full grid grid-cols-2 mb-4">
                  <TabsTrigger value="inbox">Inbox</TabsTrigger>
                  <TabsTrigger value="sent">Sent</TabsTrigger>
                </TabsList>
                
                <div className="space-y-2">
                  <div className={`flex items-center rounded-md px-3 py-2 cursor-pointer ${currentTab === 'inbox' ? 'bg-white/80' : 'hover:bg-white/60'}`}>
                    <Inbox className="h-4 w-4 mr-2" />
                    <span>Inbox</span>
                    <span className="ml-auto bg-primary/20 text-primary px-2 rounded-full text-xs">14</span>
                  </div>
                  
                  <div className="flex items-center rounded-md px-3 py-2 cursor-pointer hover:bg-white/60">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span>Starred</span>
                  </div>
                  
                  <div className="flex items-center rounded-md px-3 py-2 cursor-pointer hover:bg-white/60">
                    <SendHorizontal className="h-4 w-4 mr-2" />
                    <span>Sent</span>
                  </div>
                  
                  <div className="flex items-center rounded-md px-3 py-2 cursor-pointer hover:bg-white/60">
                    <File className="h-4 w-4 mr-2" />
                    <span>Drafts</span>
                  </div>
                  
                  <div className="flex items-center rounded-md px-3 py-2 cursor-pointer hover:bg-white/60">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>Spam</span>
                  </div>
                  
                  <div className="flex items-center rounded-md px-3 py-2 cursor-pointer hover:bg-white/60">
                    <Trash2 className="h-4 w-4 mr-2" />
                    <span>Trash</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Labels</h3>
                  <div className="space-y-2">
                    <div className="flex items-center rounded-md px-3 py-2 cursor-pointer hover:bg-white/60">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      <span>Work</span>
                    </div>
                    
                    <div className="flex items-center rounded-md px-3 py-2 cursor-pointer hover:bg-white/60">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      <span>Personal</span>
                    </div>
                    
                    <div className="flex items-center rounded-md px-3 py-2 cursor-pointer hover:bg-white/60">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                      <span>Important</span>
                    </div>
                    
                    <div className="flex items-center rounded-md px-3 py-2 cursor-pointer hover:bg-white/60">
                      <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                      <span>Updates</span>
                    </div>
                  </div>
                </div>
              </Tabs>
            </div>
          </Card>
        </div>
        
        {/* Email List and Detail View */}
        <div className="col-span-1 lg:col-span-3">
          <Card className="glassmorphic-card bg-white/80 h-[calc(100vh-14rem)] overflow-hidden flex flex-col">
            {/* Search bar */}
            <div className="p-4 border-b border-white/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search emails..." 
                  className="pl-10 glassmorphic-input"
                />
              </div>
            </div>
            
            <div className="flex-1 flex overflow-hidden">
              {/* Email list */}
              <div className={`${selectedEmail ? 'hidden md:block' : 'block'} w-full md:w-2/5 border-r border-white/20 overflow-y-auto`}>
                {emails.map((email) => (
                  <div 
                    key={email.id}
                    onClick={() => handleEmailSelect(email.id)}
                    className={`border-b border-white/10 p-4 cursor-pointer transition-colors ${
                      selectedEmail === email.id ? 'bg-white/80' : 'hover:bg-white/60'
                    } ${!email.isRead ? 'font-medium' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-medium truncate">{email.sender}</p>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">{email.date}</p>
                    </div>
                    <p className="truncate mt-1">{email.subject}</p>
                    <p className="text-sm text-muted-foreground truncate mt-1">{email.content}</p>
                  </div>
                ))}
              </div>
              
              {/* Email detail */}
              {selectedEmail ? (
                <div className="w-full md:w-3/5 overflow-y-auto p-6">
                  <button 
                    onClick={closeEmailDetail}
                    className="md:hidden mb-4 flex items-center text-sm hover:underline"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Back to list
                  </button>
                  
                  {(() => {
                    const email = emails.find(e => e.id === selectedEmail);
                    if (!email) return null;
                    
                    return (
                      <>
                        <div className="flex justify-between items-start mb-6">
                          <h2 className="text-xl font-semibold">{email.subject}</h2>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Archive className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                                <DropdownMenuItem>Star</DropdownMenuItem>
                                <DropdownMenuItem>Label as</DropdownMenuItem>
                                <DropdownMenuItem>Forward</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                              {email.sender.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{email.sender}</p>
                              <p className="text-xs text-muted-foreground">{email.email}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{email.date}</p>
                        </div>
                        
                        <div className="my-6 text-base">
                          <p>{email.content}</p>
                        </div>
                        
                        <div className="flex space-x-2 mt-8">
                          <Button 
                            onClick={() => setComposeOpen(true)}
                            variant="outline"
                            className="glassmorphic-button"
                          >
                            Reply
                          </Button>
                          <Button 
                            variant="outline"
                            className="glassmorphic-button"
                          >
                            Forward
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="w-full md:w-3/5 flex items-center justify-center p-6 text-center">
                  <div>
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Select an email to view</h3>
                    <p className="text-muted-foreground mt-1">Choose an email from the list to view its contents</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Compose Email Sheet */}
      <Sheet open={composeOpen} onOpenChange={setComposeOpen}>
        <SheetContent side="bottom" className="h-[80vh] glassmorphic-container bg-white/80">
          <SheetHeader className="mb-4">
            <SheetTitle>New Message</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-4">
            <div>
              <Input placeholder="To" className="glassmorphic-input" />
            </div>
            <div>
              <Input placeholder="Subject" className="glassmorphic-input" />
            </div>
            
            {/* Formatting toolbar */}
            <div className="flex items-center space-x-1 p-1 bg-white/10 rounded-md">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Underline className="h-4 w-4" />
              </Button>
              <div className="h-6 w-px bg-white/20 mx-1" />
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ListOrdered className="h-4 w-4" />
              </Button>
              <div className="h-6 w-px bg-white/20 mx-1" />
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <AlignRight className="h-4 w-4" />
              </Button>
              <div className="h-6 w-px bg-white/20 mx-1" />
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Link className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Image className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
            
            <Textarea 
              placeholder="Compose your email..." 
              className="min-h-[300px] glassmorphic-input"
            />
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div>
              <Button variant="outline" size="sm" className="mr-2 glassmorphic-button">
                <Paperclip className="h-4 w-4 mr-2" />
                Attach
              </Button>
            </div>
            <div>
              <Button variant="outline" size="sm" className="mr-2" onClick={() => setComposeOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" className="glassmorphic-button">
                <SendHorizontal className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Email Settings Sheet */}
      <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent className="sm:max-w-lg glassmorphic-container bg-white/80">
          <SheetHeader>
            <SheetTitle>Email Settings</SheetTitle>
            <SheetDescription>Customize your email preferences</SheetDescription>
          </SheetHeader>
          
          <div className="py-6">
            <Tabs defaultValue="general">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="signature">Signature</TabsTrigger>
                <TabsTrigger value="filters">Filters</TabsTrigger>
                <TabsTrigger value="accounts">Accounts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Display settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Settings2 className="h-4 w-4" />
                      <span className="text-sm">Display density</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Auto-refresh</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Notifications</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Desktop notifications</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Out of office</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Auto-responder</span>
                      </div>
                      <Button variant="outline" size="sm">Set up</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="signature" className="space-y-4">
                <p className="text-sm text-muted-foreground">Create and manage your email signature</p>
                <Textarea placeholder="Enter your signature" className="min-h-[150px] glassmorphic-input" />
                <div className="flex items-center space-x-2 mt-4">
                  <Button size="sm" className="glassmorphic-button">Save signature</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="filters" className="space-y-4">
                <p className="text-sm text-muted-foreground">Create rules to automatically sort incoming emails</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-white/20 rounded-md">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span className="text-sm">Marketing emails → Marketing folder</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-white/20 rounded-md">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span className="text-sm">Project notifications → Work folder</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button className="mt-4" variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add new filter
                </Button>
              </TabsContent>
              
              <TabsContent value="accounts" className="space-y-4">
                <p className="text-sm text-muted-foreground">Add or remove connected email accounts</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-white/20 rounded-md">
                    <div>
                      <p className="text-sm font-medium">work@example.com</p>
                      <p className="text-xs text-muted-foreground">Primary account</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button className="mt-4" variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Connect account
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Mailbox;
