
import React, { useState, useEffect } from 'react';
import { 
  Inbox, Mail, SendHorizontal, File, Star, AlertCircle, Trash2, 
  Archive, MoreHorizontal, Plus, Search, Settings, Download, 
  Paperclip, Bold, Italic, Underline, List, ListOrdered, AlignLeft, 
  AlignCenter, AlignRight, Image, Link, Settings2, Clock, Calendar, Filter, 
  Loader, RefreshCcw
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface EmailAccount {
  id: string;
  email_address: string;
  imap_host: string;
  imap_port: number;
  username: string;
  created_at: string;
}

interface Email {
  id: string;
  account_id: string;
  sender: string;
  sender_email: string;
  subject: string;
  content: string;
  received_date: string;
  is_read: boolean;
  is_starred: boolean;
  label: string | null;
  folder: string;
  created_at: string;
}

const Mailbox = () => {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('inbox');
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingEmails, setFetchingEmails] = useState(false);
  
  // New account form state
  const [newAccount, setNewAccount] = useState({
    email_address: '',
    imap_host: '',
    imap_port: '993',
    username: '',
    password: '',
    use_ssl: true
  });
  
  // Load email accounts
  useEffect(() => {
    fetchEmailAccounts();
  }, []);
  
  // Load emails when account is selected
  useEffect(() => {
    if (selectedAccount) {
      fetchEmails();
    }
  }, [selectedAccount]);
  
  const fetchEmailAccounts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('email_accounts')
        .select('*');
      
      if (error) throw error;
      
      setEmailAccounts(data || []);
      
      // Select the first account by default if available
      if (data && data.length > 0 && !selectedAccount) {
        setSelectedAccount(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching email accounts:', error);
      toast({
        title: 'Error fetching email accounts',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const fetchEmails = async () => {
    if (!selectedAccount) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('emails')
        .select('*')
        .eq('account_id', selectedAccount)
        .eq('folder', currentTab)
        .order('received_date', { ascending: false });
      
      if (error) throw error;
      
      setEmails(data || []);
    } catch (error) {
      console.error('Error fetching emails:', error);
      toast({
        title: 'Error fetching emails',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const refreshEmails = async () => {
    if (!selectedAccount) return;
    
    try {
      setFetchingEmails(true);
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({ accountId: selectedAccount })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch emails');
      }
      
      toast({
        title: 'Emails refreshed',
        description: `Retrieved ${result.count} new emails`,
      });
      
      // Reload emails
      fetchEmails();
    } catch (error) {
      console.error('Error refreshing emails:', error);
      toast({
        title: 'Error refreshing emails',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setFetchingEmails(false);
    }
  };
  
  const handleAddAccount = async () => {
    try {
      // Validate form
      if (!newAccount.email_address || !newAccount.imap_host || !newAccount.imap_port || 
          !newAccount.username || !newAccount.password) {
        throw new Error('All fields are required');
      }
      
      setLoading(true);
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/add-email-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        },
        body: JSON.stringify({
          ...newAccount,
          imap_port: parseInt(newAccount.imap_port)
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to add email account');
      }
      
      toast({
        title: 'Email account added',
        description: `Successfully added ${newAccount.email_address}`,
      });
      
      // Reset form
      setNewAccount({
        email_address: '',
        imap_host: '',
        imap_port: '993',
        username: '',
        password: '',
        use_ssl: true
      });
      
      setAddAccountOpen(false);
      
      // Refresh accounts list
      fetchEmailAccounts();
    } catch (error) {
      console.error('Error adding email account:', error);
      toast({
        title: 'Error adding email account',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleEmailSelect = (id: string) => {
    setSelectedEmail(id);
    
    // Mark email as read
    if (id) {
      updateEmailReadStatus(id, true);
    }
  };
  
  const updateEmailReadStatus = async (id: string, isRead: boolean) => {
    try {
      const { error } = await supabase
        .from('emails')
        .update({ is_read: isRead })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setEmails(emails.map(email => 
        email.id === id ? { ...email, is_read: isRead } : email
      ));
    } catch (error) {
      console.error('Error updating email read status:', error);
    }
  };
  
  const closeEmailDetail = () => {
    setSelectedEmail(null);
  };
  
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    setSelectedEmail(null);
    fetchEmails();
  };
  
  const getCurrentSelectedEmail = () => {
    return emails.find(email => email.id === selectedEmail);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Mailbox</h1>
          <p className="text-muted-foreground">Manage your messages</p>
        </div>
        
        <div className="flex space-x-2">
          {selectedAccount && (
            <Button 
              onClick={refreshEmails}
              variant="outline"
              disabled={fetchingEmails}
              className="glassmorphic-button"
            >
              {fetchingEmails ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCcw className="mr-2 h-4 w-4" />
              )}
              Refresh
            </Button>
          )}
          
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
      
      {emailAccounts.length === 0 ? (
        <Card className="glassmorphic-card bg-white/80 p-6 text-center">
          <div className="flex flex-col items-center justify-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Email Accounts</h3>
            <p className="text-muted-foreground mt-1 mb-6">Add an email account to start fetching your emails</p>
            <Button onClick={() => setAddAccountOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Email Account
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="col-span-1">
            <Card className="glassmorphic-card bg-white/80 overflow-visible">
              <div className="p-4">
                <div className="mb-4">
                  <Label>Account</Label>
                  <select 
                    className="w-full mt-1 p-2 rounded-md border border-gray-300 bg-white/80"
                    value={selectedAccount || ''}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                  >
                    {emailAccounts.map(account => (
                      <option key={account.id} value={account.id}>
                        {account.email_address}
                      </option>
                    ))}
                  </select>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => setAddAccountOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Account
                  </Button>
                </div>
                
                <Tabs defaultValue="inbox" value={currentTab} onValueChange={handleTabChange}>
                  <TabsList className="w-full grid grid-cols-2 mb-4">
                    <TabsTrigger value="inbox">Inbox</TabsTrigger>
                    <TabsTrigger value="sent">Sent</TabsTrigger>
                  </TabsList>
                  
                  <div className="space-y-2">
                    <div 
                      className={`flex items-center rounded-md px-3 py-2 cursor-pointer ${
                        currentTab === 'inbox' ? 'bg-white/80' : 'hover:bg-white/70'
                      }`}
                      onClick={() => handleTabChange('inbox')}
                    >
                      <Inbox className="h-4 w-4 mr-2" />
                      <span>Inbox</span>
                      <span className="ml-auto bg-primary/20 text-primary px-2 rounded-full text-xs">
                        {emails.filter(e => !e.is_read).length || 0}
                      </span>
                    </div>
                    
                    <div 
                      className={`flex items-center rounded-md px-3 py-2 cursor-pointer ${
                        currentTab === 'starred' ? 'bg-white/80' : 'hover:bg-white/70'
                      }`}
                      onClick={() => handleTabChange('starred')}
                    >
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      <span>Starred</span>
                    </div>
                    
                    <div 
                      className={`flex items-center rounded-md px-3 py-2 cursor-pointer ${
                        currentTab === 'sent' ? 'bg-white/80' : 'hover:bg-white/70'
                      }`}
                      onClick={() => handleTabChange('sent')}
                    >
                      <SendHorizontal className="h-4 w-4 mr-2" />
                      <span>Sent</span>
                    </div>
                    
                    <div 
                      className={`flex items-center rounded-md px-3 py-2 cursor-pointer ${
                        currentTab === 'drafts' ? 'bg-white/80' : 'hover:bg-white/70'
                      }`}
                      onClick={() => handleTabChange('drafts')}
                    >
                      <File className="h-4 w-4 mr-2" />
                      <span>Drafts</span>
                    </div>
                    
                    <div 
                      className={`flex items-center rounded-md px-3 py-2 cursor-pointer ${
                        currentTab === 'spam' ? 'bg-white/80' : 'hover:bg-white/70'
                      }`}
                      onClick={() => handleTabChange('spam')}
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <span>Spam</span>
                    </div>
                    
                    <div 
                      className={`flex items-center rounded-md px-3 py-2 cursor-pointer ${
                        currentTab === 'trash' ? 'bg-white/80' : 'hover:bg-white/70'
                      }`}
                      onClick={() => handleTabChange('trash')}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      <span>Trash</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Labels</h3>
                    <div className="space-y-2">
                      <div 
                        className="flex items-center rounded-md px-3 py-2 cursor-pointer hover:bg-white/70"
                        onClick={() => {
                          setCurrentTab('inbox');
                          fetchEmails();
                        }}
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        <span>Work</span>
                      </div>
                      
                      <div 
                        className="flex items-center rounded-md px-3 py-2 cursor-pointer hover:bg-white/70"
                        onClick={() => {
                          setCurrentTab('inbox');
                          fetchEmails();
                        }}
                      >
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        <span>Personal</span>
                      </div>
                      
                      <div 
                        className="flex items-center rounded-md px-3 py-2 cursor-pointer hover:bg-white/70"
                        onClick={() => {
                          setCurrentTab('inbox');
                          fetchEmails();
                        }}
                      >
                        <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                        <span>Important</span>
                      </div>
                      
                      <div 
                        className="flex items-center rounded-md px-3 py-2 cursor-pointer hover:bg-white/70"
                        onClick={() => {
                          setCurrentTab('inbox');
                          fetchEmails();
                        }}
                      >
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
                  {loading ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : emails.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
                      <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No emails found</h3>
                      <p className="text-muted-foreground mt-1 mb-4">Your {currentTab} folder is empty</p>
                      {currentTab === 'inbox' && (
                        <Button 
                          onClick={refreshEmails}
                          disabled={fetchingEmails}
                        >
                          {fetchingEmails ? (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCcw className="mr-2 h-4 w-4" />
                          )}
                          Refresh Inbox
                        </Button>
                      )}
                    </div>
                  ) : (
                    emails.map((email) => (
                      <div 
                        key={email.id}
                        onClick={() => handleEmailSelect(email.id)}
                        className={`border-b border-white/10 p-4 cursor-pointer transition-colors ${
                          selectedEmail === email.id ? 'bg-white/80' : 'hover:bg-white/70'
                        } ${!email.is_read ? 'font-medium' : ''}`}
                      >
                        <div className="flex items-start justify-between">
                          <p className="font-medium truncate">{email.sender}</p>
                          <p className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(email.received_date)}
                          </p>
                        </div>
                        <p className="truncate mt-1">{email.subject}</p>
                        <p className="text-sm text-muted-foreground truncate mt-1">{email.content}</p>
                      </div>
                    ))
                  )}
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
                      const email = getCurrentSelectedEmail();
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
                                  <DropdownMenuItem onClick={() => updateEmailReadStatus(email.id, false)}>
                                    Mark as unread
                                  </DropdownMenuItem>
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
                                <p className="text-xs text-muted-foreground">{email.sender_email}</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{formatDate(email.received_date)}</p>
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
      )}
      
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
                <p className="text-sm text-muted-foreground">Manage connected email accounts</p>
                
                {emailAccounts.length > 0 ? (
                  <div className="space-y-4">
                    {emailAccounts.map(account => (
                      <div key={account.id} className="flex items-center justify-between p-3 border border-white/20 rounded-md">
                        <div>
                          <p className="text-sm font-medium">{account.email_address}</p>
                          <p className="text-xs text-muted-foreground">{account.imap_host}:{account.imap_port}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No email accounts configured yet.</p>
                )}
                
                <Button 
                  className="mt-4" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setAddAccountOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Add Email Account Dialog */}
      <Dialog open={addAccountOpen} onOpenChange={setAddAccountOpen}>
        <DialogContent className="sm:max-w-md glassmorphic-container bg-white/80">
          <DialogHeader>
            <DialogTitle>Add Email Account</DialogTitle>
            <DialogDescription>
              Connect to your email account using IMAP
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com"
                value={newAccount.email_address}
                onChange={(e) => setNewAccount({...newAccount, email_address: e.target.value})}
                className="glassmorphic-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imap_host">IMAP Server</Label>
              <Input 
                id="imap_host" 
                type="text" 
                placeholder="imap.example.com"
                value={newAccount.imap_host}
                onChange={(e) => setNewAccount({...newAccount, imap_host: e.target.value})}
                className="glassmorphic-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imap_port">IMAP Port</Label>
              <Input 
                id="imap_port" 
                type="text" 
                placeholder="993"
                value={newAccount.imap_port}
                onChange={(e) => setNewAccount({...newAccount, imap_port: e.target.value})}
                className="glassmorphic-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="username or email"
                value={newAccount.username}
                onChange={(e) => setNewAccount({...newAccount, username: e.target.value})}
                className="glassmorphic-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Your email password or app password"
                value={newAccount.password}
                onChange={(e) => setNewAccount({...newAccount, password: e.target.value})}
                className="glassmorphic-input"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="use_ssl"
                checked={newAccount.use_ssl}
                onChange={(e) => setNewAccount({...newAccount, use_ssl: e.target.checked})}
                className="rounded border-gray-300"
              />
              <Label htmlFor="use_ssl" className="text-sm">Use SSL/TLS</Label>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              onClick={handleAddAccount}
              disabled={loading}
            >
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Add Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Mailbox;
