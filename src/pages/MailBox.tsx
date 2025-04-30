import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, Star, Inbox, Send, Archive, Trash2, AlertCircle, 
  MailPlus, RefreshCcw, MoreVertical, ChevronDown, Tag, 
  Paperclip, Bold, Italic, Underline, List, ListOrdered, 
  Trash, Link, Image, AlignLeft, AlignCenter, AlignRight, Sparkles,
  FileText, Download, ArrowLeft, AtSign, Smile, Bookmark,
  Code, Heading2, Quote, SquareCheck, Minus, PlusCircle,
  Clock, Paperclip as AttachmentIcon, Type, Layout, Palette
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

interface EmailItem {
  id: number;
  from: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  starred: boolean;
  avatar: string;
  hasAttachment: boolean;
}

const MailBox = () => {
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailTo, setEmailTo] = useState('');
  const [isUsingAI, setIsUsingAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const emails: EmailItem[] = [
    {
      id: 1,
      from: 'Alex Johnson',
      subject: 'Project Update: Q3 Goals',
      preview: 'I wanted to provide an update on our progress towards the Q3 goals we discussed last week...',
      time: '10:23 AM',
      unread: true,
      starred: false,
      avatar: 'A',
      hasAttachment: true,
    },
    {
      id: 2,
      from: 'Sarah Miller',
      subject: 'Re: Meeting Notes - Product Team',
      preview: 'Here are the meeting notes from yesterday\'s session. Let me know if you have any questions...',
      time: 'Yesterday',
      unread: false,
      starred: true,
      avatar: 'S',
      hasAttachment: false,
    },
    {
      id: 3,
      from: 'David Wilson',
      subject: 'Client Presentation Draft',
      preview: 'I\'ve attached the draft for the upcoming client presentation. Please review when you get a chance...',
      time: 'Jul 10',
      unread: false,
      starred: false,
      avatar: 'D',
      hasAttachment: true,
    },
    {
      id: 4,
      from: 'Emily Chen',
      subject: 'Quick Question About Budget',
      preview: 'I was looking at the budget for the marketing campaign and noticed there might be a discrepancy...',
      time: 'Jul 9',
      unread: true,
      starred: false,
      avatar: 'E',
      hasAttachment: false,
    },
    {
      id: 5,
      from: 'Michael Brown',
      subject: 'Team Lunch Next Week',
      preview: 'I\'m organizing a team lunch for next Wednesday at 12:30 PM. Please let me know if you can join...',
      time: 'Jul 8',
      unread: false,
      starred: false,
      avatar: 'M',
      hasAttachment: false,
    },
    {
      id: 6,
      from: 'Olivia Martinez',
      subject: 'Updated Design Assets',
      preview: 'I\'ve uploaded the updated design assets to the shared folder. The new color palette is now available...',
      time: 'Jul 7',
      unread: false,
      starred: true,
      avatar: 'O',
      hasAttachment: true,
    },
  ];
  
  const handleEmailSelect = (email: EmailItem) => {
    setSelectedEmail(email);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };
  
  const handleSendEmail = () => {
    if (!emailTo) {
      toast({
        title: "Missing recipient",
        description: "Please specify at least one recipient",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Email sent",
      description: "Your message has been sent successfully"
    });
    
    // Reset the compose form
    setEmailTo('');
    setEmailSubject('');
    setEmailContent('');
    setComposeOpen(false);
  };
  
  const handleAIGenerate = () => {
    if (!aiPrompt) {
      toast({
        title: "Missing prompt",
        description: "Please enter a prompt for AI assistance",
        variant: "destructive"
      });
      return;
    }
    
    setIsUsingAI(true);
    // Simulate AI generation with a timeout
    setTimeout(() => {
      const generatedContent = `Dear recipient,\n\nI wanted to follow up on ${aiPrompt}. Let's discuss this matter further at your earliest convenience.\n\nBest regards,\nMe`;
      setEmailContent(generatedContent);
      setIsUsingAI(false);
      setAiPrompt('');
      
      toast({
        title: "Content generated",
        description: "AI has generated content based on your prompt"
      });
    }, 1500);
  };
  
  const FolderButton = ({ icon: Icon, label, count, value }: { icon: React.ElementType, label: string, count?: number, value: string }) => (
    <Button 
      variant={activeFolder === value ? "secondary" : "ghost"} 
      className="w-full justify-start gap-2 px-3 py-2" 
      onClick={() => setActiveFolder(value)}
    >
      <Icon className="h-4 w-4" />
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && <Badge variant="outline">{count}</Badge>}
    </Button>
  );
  
  const FormattingButton = ({ icon: Icon, tooltip, onClick }: { icon: React.ElementType, tooltip: string, onClick?: () => void }) => (
    <Button 
      variant="outline" 
      size="icon" 
      className="h-8 w-8" 
      title={tooltip}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
  
  return (
    <div className="flex flex-col h-full bg-background rounded-lg shadow-sm overflow-hidden">
      {/* Top toolbar */}
      <div className="border-b p-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          {isMobile && selectedEmail && (
            <Button variant="ghost" size="icon" onClick={handleBackToList}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search mail..." className="pl-8 w-full" />
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <RefreshCcw className="h-4 w-4" />
        </Button>
        <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
          <DialogTrigger asChild>
            <Button className="hidden sm:flex items-center gap-2">
              <MailPlus className="h-4 w-4" />
              <span>Compose</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-2">
              <div className="flex items-center space-x-2 border-b pb-2">
                <AtSign className="h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="To" 
                  className="border-0 focus-visible:ring-0 px-0 py-1.5" 
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2 border-b pb-2">
                <Type className="h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Subject" 
                  className="border-0 focus-visible:ring-0 px-0 py-1.5" 
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>
              
              <div className="border rounded-md">
                <div className="flex flex-wrap items-center gap-1 p-1 bg-muted/30 border-b">
                  <FormattingButton icon={Bold} tooltip="Bold" />
                  <FormattingButton icon={Italic} tooltip="Italic" />
                  <FormattingButton icon={Underline} tooltip="Underline" />
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  
                  <FormattingButton icon={Heading2} tooltip="Heading" />
                  <FormattingButton icon={Quote} tooltip="Quote" />
                  <FormattingButton icon={Code} tooltip="Code" />
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  
                  <FormattingButton icon={List} tooltip="Bullet List" />
                  <FormattingButton icon={ListOrdered} tooltip="Numbered List" />
                  <FormattingButton icon={SquareCheck} tooltip="Task List" />
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  
                  <FormattingButton icon={AlignLeft} tooltip="Align Left" />
                  <FormattingButton icon={AlignCenter} tooltip="Align Center" />
                  <FormattingButton icon={AlignRight} tooltip="Align Right" />
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  
                  <FormattingButton icon={Link} tooltip="Insert Link" />
                  <FormattingButton icon={Image} tooltip="Insert Image" />
                  <FormattingButton icon={AttachmentIcon} tooltip="Attach File" />
                  <Separator orientation="vertical" className="h-6 mx-1" />
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>More formatting</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Layout className="mr-2 h-4 w-4" />
                        <span>Insert Table</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Minus className="mr-2 h-4 w-4" />
                        <span>Horizontal Rule</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Smile className="mr-2 h-4 w-4" />
                        <span>Emoji</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Palette className="mr-2 h-4 w-4" />
                        <span>Text Color</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <Textarea 
                  className="min-h-[200px] border-0 rounded-none focus-visible:ring-0 resize-none" 
                  placeholder="Compose email..."
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                />
              </div>
              
              {/* AI Assistant */}
              <div className="border rounded-md p-3 bg-muted/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  <h3 className="text-sm font-medium">AI Assist</h3>
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a prompt (e.g., 'Draft a follow-up email about the project status')"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    disabled={isUsingAI}
                  />
                  <Button 
                    onClick={handleAIGenerate} 
                    disabled={isUsingAI || !aiPrompt}
                    className="whitespace-nowrap"
                  >
                    {isUsingAI ? (
                      <>
                        <span className="animate-spin mr-2">
                          <RotateCw className="h-4 w-4" />
                        </span>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setAiPrompt("Draft a professional introduction email")}>
                    <PlusCircle className="h-3 w-3 mr-1" />
                    Professional intro
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setAiPrompt("Write a follow-up email")}>
                    <PlusCircle className="h-3 w-3 mr-1" />
                    Follow-up
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setAiPrompt("Create a meeting invitation")}>
                    <PlusCircle className="h-3 w-3 mr-1" />
                    Meeting invite
                  </Badge>
                </div>
              </div>
            </div>
            
            <DialogFooter className="gap-2 mt-4">
              <Button variant="outline" onClick={() => setComposeOpen(false)}>
                <Trash className="h-4 w-4 mr-2" />
                Discard
              </Button>
              <Button variant="outline">
                <Bookmark className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline">
                <Clock className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button onClick={handleSendEmail}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Mobile compose button */}
        <Button variant="default" size="icon" className="sm:hidden" onClick={() => setComposeOpen(true)}>
          <MailPlus className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Folders sidebar */}
        <div className={`w-64 border-r overflow-y-auto p-2 ${isMobile && selectedEmail ? 'hidden' : 'block'} ${isMobile ? 'hidden sm:block' : ''}`}>
          <Button variant="default" className="w-full justify-start mb-4" onClick={() => setComposeOpen(true)}>
            <MailPlus className="mr-2 h-4 w-4" />
            Compose
          </Button>
          
          <div className="space-y-1">
            <FolderButton icon={Inbox} label="Inbox" count={4} value="inbox" />
            <FolderButton icon={Star} label="Starred" value="starred" />
            <FolderButton icon={Send} label="Sent" value="sent" />
            <FolderButton icon={AlertCircle} label="Drafts" count={2} value="drafts" />
            <FolderButton icon={Archive} label="Archive" value="archive" />
            <FolderButton icon={Trash2} label="Trash" value="trash" />
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-1">
            <h3 className="px-3 text-sm font-medium mb-2">Labels</h3>
            <Button variant="ghost" className="w-full justify-start text-xs h-7 px-3">
              <span className="h-2 w-2 rounded-full bg-red-500 mr-2" />
              Important
            </Button>
            <Button variant="ghost" className="w-full justify-start text-xs h-7 px-3">
              <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2" />
              Personal
            </Button>
            <Button variant="ghost" className="w-full justify-start text-xs h-7 px-3">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
              Work
            </Button>
            <Button variant="ghost" className="w-full justify-start text-xs h-7 px-3">
              <span className="h-2 w-2 rounded-full bg-blue-500 mr-2" />
              Project X
            </Button>
          </div>
        </div>
        
        {/* Email list/detail container */}
        <div className="flex-1 flex overflow-hidden">
          {/* Email list */}
          <div className={`${selectedEmail && (isMobile || !isMobile) ? 'hidden md:block' : 'block'} md:w-80 lg:w-96 border-r overflow-y-auto`}>
            <div className="divide-y">
              {emails.map((email) => (
                <div 
                  key={email.id}
                  className={`p-3 flex gap-3 cursor-pointer hover:bg-muted/50 ${email.unread ? 'font-medium' : ''}`}
                  onClick={() => handleEmailSelect(email)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox checked={false} onClick={(e) => e.stopPropagation()} />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={(e) => {
                        e.stopPropagation();
                        const updatedEmails = [...emails];
                        const index = updatedEmails.findIndex(e => e.id === email.id);
                        if (index !== -1) {
                          updatedEmails[index] = { ...email, starred: !email.starred };
                        }
                      }}
                    >
                      <Star className={`h-4 w-4 ${email.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </Button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 truncate">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{email.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="truncate">{email.from}</span>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{email.time}</span>
                    </div>
                    <h4 className="text-sm truncate mt-1">{email.subject}</h4>
                    <p className="text-xs text-muted-foreground truncate mt-1">{email.preview}</p>
                    {email.hasAttachment && (
                      <div className="mt-1">
                        <Badge variant="outline" className="text-xs">
                          <Paperclip className="h-3 w-3 mr-1" />
                          Attachment
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Email detail view */}
          <div 
            className={`flex-1 overflow-y-auto ${!selectedEmail && !isMobile ? 'hidden md:flex md:items-center md:justify-center' : 'block'} ${!selectedEmail && isMobile ? 'hidden' : 'block'}`}
          >
            {selectedEmail ? (
              <div className="p-4 sm:p-6 max-w-3xl mx-auto">
                <h1 className="text-xl sm:text-2xl font-bold">{selectedEmail.subject}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{selectedEmail.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedEmail.from}</div>
                      <div className="text-sm text-muted-foreground">to me</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 sm:mt-0">
                    <time>{selectedEmail.time}</time>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Star className={`h-4 w-4 ${selectedEmail.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <Button variant="outline" size="sm">
                    <Tag className="h-4 w-4 mr-2" />
                    Label
                  </Button>
                </div>
                
                <Separator className="my-6" />
                
                <div className="prose prose-sm max-w-none">
                  <p>Hello,</p>
                  <p>
                    {selectedEmail.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p>Best regards,<br/>{selectedEmail.from}</p>
                </div>
                
                {selectedEmail.hasAttachment && (
                  <>
                    <Separator className="my-6" />
                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Attachments (2)</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Card>
                          <CardContent className="p-3 flex items-center gap-3">
                            <div className="bg-muted rounded p-2">
                              <FileText className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">Presentation.pdf</div>
                              <div className="text-xs text-muted-foreground">2.4 MB</div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-3 flex items-center gap-3">
                            <div className="bg-muted rounded p-2">
                              <Image className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">Screenshot.png</div>
                              <div className="text-xs text-muted-foreground">1.8 MB</div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </>
                )}
                
                <Separator className="my-6" />
                
                <div className="mt-6 flex items-center gap-4">
                  <Button className="gap-2">
                    <Send className="h-4 w-4" />
                    <span>Reply</span>
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Send className="h-4 w-4 rotate-180" />
                    <span>Forward</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Select an email to read</h3>
                <p className="text-sm text-muted-foreground mt-2">Choose an email from the list to view its contents.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailBox;
