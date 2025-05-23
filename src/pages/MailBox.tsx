import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { 
  Inbox, Send, Trash, Star, Tag, 
  Plus, Settings, Search, Check, RefreshCw, 
  ChevronDown, Filter, MoreVertical, Paperclip, 
  Bold, Italic, Underline, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, 
  Link, Image, Smile, AtSign, 
  Send as SendIcon, X, PanelLeftClose,
  FileText, // Using FileText instead of Draft which doesn't exist
  Clock, Calendar,
  Mail,
  Archive,
  AlertCircle,
  Download, // Added the missing Download import
  MessageSquare,
  Users,
  Phone,
  User,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Add your MailBox component implementation here
const MailBox = () => {
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("email");
  const [smsMessage, setSmsMessage] = useState("");
  const [smsRecipient, setSmsRecipient] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  
  // Sample email data
  const emails = [
    {
      id: 1,
      from: "Sarah Johnson",
      email: "sarah.j@company.com",
      subject: "Project Timeline Update",
      excerpt: "I wanted to share the updated timeline for our Q2 project. Please review the attached...",
      time: "10:32 AM",
      unread: true,
      avatar: "SJ",
      starred: false,
      category: "inbox",
      attachments: 2
    },
    {
      id: 2,
      from: "Dev Team",
      email: "dev-team@company.com",
      subject: "Sprint Planning Meeting",
      excerpt: "This is a reminder about our sprint planning session scheduled for tomorrow at 11:00 AM...",
      time: "Yesterday",
      unread: false,
      avatar: "DT",
      starred: true,
      category: "inbox",
      attachments: 0
    },
    {
      id: 3,
      from: "Marketing Department",
      email: "marketing@company.com",
      subject: "New Campaign Materials",
      excerpt: "Please find attached the assets for our upcoming summer campaign. We need your feedback by...",
      time: "Jul 24",
      unread: true,
      avatar: "MD",
      starred: false,
      category: "inbox",
      attachments: 5
    },
    {
      id: 4,
      from: "Recruitment",
      email: "hr@company.com",
      subject: "Interview Schedule - Senior Developer Position",
      excerpt: "We've scheduled the interviews for the Senior Developer role. Please confirm your availability...",
      time: "Jul 22",
      unread: false,
      avatar: "HR",
      starred: false,
      category: "inbox",
      attachments: 1
    },
    {
      id: 5,
      from: "System Notification",
      email: "no-reply@system.com",
      subject: "Security Alert: New Login",
      excerpt: "A new login to your account was detected from a new device. If this wasn't you, please contact...",
      time: "Jul 20",
      unread: true,
      avatar: "SN",
      starred: false,
      category: "inbox",
      attachments: 0
    }
  ];
  
  // Sample SMS data
  const smsContacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "+1 555-123-4567",
      avatar: "SJ"
    },
    {
      id: 2,
      name: "John Smith",
      phone: "+1 555-987-6543",
      avatar: "JS"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      phone: "+1 555-456-7890",
      avatar: "MR"
    },
    {
      id: 4,
      name: "David Lee",
      phone: "+1 555-789-0123",
      avatar: "DL"
    },
    {
      id: 5,
      name: "Lisa Wong",
      phone: "+1 555-321-6547",
      avatar: "LW"
    }
  ];

  // Sample SMS conversations history
  const smsHistory = [
    {
      id: 1,
      contact: "Sarah Johnson",
      phone: "+1 555-123-4567",
      avatar: "SJ",
      messages: [
        { 
          id: 1, 
          text: "Hi, just checking if you received our latest project update?", 
          timestamp: "Today, 10:32 AM",
          isOutgoing: true
        },
        { 
          id: 2, 
          text: "Yes, I did. Will review it shortly and get back to you.", 
          timestamp: "Today, 10:45 AM",
          isOutgoing: false
        }
      ],
      unread: 0
    },
    {
      id: 2,
      contact: "John Smith",
      phone: "+1 555-987-6543",
      avatar: "JS",
      messages: [
        { 
          id: 1, 
          text: "Meeting rescheduled for 3pm tomorrow.", 
          timestamp: "Yesterday, 2:15 PM",
          isOutgoing: true
        }
      ],
      unread: 0
    },
    {
      id: 3,
      contact: "Maria Rodriguez",
      phone: "+1 555-456-7890",
      avatar: "MR",
      messages: [
        { 
          id: 1, 
          text: "Please call me when you get a chance.", 
          timestamp: "Jul 24",
          isOutgoing: false
        }
      ],
      unread: 1
    }
  ];

  const [selectedSmsContact, setSelectedSmsContact] = useState<number | null>(null);
  const [newSmsText, setNewSmsText] = useState("");

  const handleSendSms = () => {
    setIsSending(true);
    
    // Simulate sending SMS
    setTimeout(() => {
      setIsSending(false);
      setSmsMessage("");
      setSmsRecipient("");
      
      toast({
        title: "SMS Sent",
        description: "Your message has been sent successfully.",
      });
    }, 1500);
  };

  const handleContactSelect = (contactId: number) => {
    setSelectedSmsContact(contactId);
    setNewSmsText("");
  };

  const handleSendReply = () => {
    if (!newSmsText.trim() || selectedSmsContact === null) return;
    
    setIsSending(true);
    
    // Simulate sending SMS reply
    setTimeout(() => {
      setIsSending(false);
      setNewSmsText("");
      
      toast({
        title: "Reply Sent",
        description: "Your message has been sent successfully.",
      });
      
      // In a real application, you would update the conversation history here
    }, 1000);
  };

  const renderSmsInterface = () => {
    return (
      <div className="h-full flex flex-col">
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full pl-8 pr-4 py-2 rounded-md border bg-transparent"
              />
            </div>
            <button className="p-2 rounded-md hover:bg-muted">
              <Filter className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-md hover:bg-muted">
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setSelectedSmsContact(null)}
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <MessageSquare className="h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>

        {selectedSmsContact === null ? (
          <div className="grid md:grid-cols-3 h-full">
            <div className="md:col-span-1 border-r overflow-auto max-h-[calc(100vh-320px)]">
              <div className="divide-y">
                {smsHistory.map((conversation) => (
                  <div 
                    key={conversation.id} 
                    className={`p-4 cursor-pointer hover:bg-muted/50 flex items-start gap-3 ${conversation.unread > 0 ? 'bg-primary/5' : ''}`}
                    onClick={() => handleContactSelect(conversation.id)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{conversation.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className={`font-medium ${conversation.unread > 0 ? 'text-primary font-semibold' : ''}`}>
                          {conversation.contact}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {conversation.messages[conversation.messages.length - 1].timestamp.split(',')[0]}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {conversation.messages[conversation.messages.length - 1].isOutgoing ? 'You: ' : ''}
                        {conversation.messages[conversation.messages.length - 1].text}
                      </div>
                      {conversation.unread > 0 && (
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white mt-1">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 p-6 flex items-center justify-center">
              <div className="text-center max-w-md">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium mb-2">Send New SMS</h3>
                <p className="text-muted-foreground mb-6">Compose a new SMS message to send to your contacts.</p>
                
                <div className="space-y-4">
                  <div className="text-left">
                    <Label htmlFor="recipient">Recipient</Label>
                    <Input 
                      id="recipient" 
                      type="text" 
                      value={smsRecipient}
                      onChange={(e) => setSmsRecipient(e.target.value)}
                      placeholder="Enter phone number or name"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="text-left">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message"
                      value={smsMessage}
                      onChange={(e) => setSmsMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="min-h-[120px] mt-1"
                    />
                  </div>
                  
                  <Button 
                    className="w-full gap-2" 
                    onClick={handleSendSms}
                    disabled={!smsRecipient || !smsMessage || isSending}
                  >
                    {isSending ? (
                      <>
                        <span className="animate-spin">
                          <RefreshCw className="h-4 w-4" />
                        </span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <SendIcon className="h-4 w-4" />
                        Send SMS
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 h-full">
            <div className="md:col-span-1 border-r overflow-auto max-h-[calc(100vh-320px)]">
              <div className="divide-y">
                {smsHistory.map((conversation) => (
                  <div 
                    key={conversation.id} 
                    className={`p-4 cursor-pointer hover:bg-muted/50 flex items-start gap-3 ${selectedSmsContact === conversation.id ? 'bg-muted' : ''} ${conversation.unread > 0 ? 'bg-primary/5' : ''}`}
                    onClick={() => handleContactSelect(conversation.id)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{conversation.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className={`font-medium ${conversation.unread > 0 ? 'text-primary font-semibold' : ''}`}>
                          {conversation.contact}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {conversation.messages[conversation.messages.length - 1].timestamp.split(',')[0]}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {conversation.messages[conversation.messages.length - 1].isOutgoing ? 'You: ' : ''}
                        {conversation.messages[conversation.messages.length - 1].text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col h-full">
              {/* Conversation header */}
              {(() => {
                const conversation = smsHistory.find(c => c.id === selectedSmsContact);
                return (
                  <div className="border-b p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{conversation?.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{conversation?.contact}</div>
                        <div className="text-xs text-muted-foreground">{conversation?.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <User className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })()}
              
              {/* Conversation messages */}
              <div className="flex-1 overflow-auto p-4 space-y-4 max-h-[calc(100vh-450px)]">
                {(() => {
                  const conversation = smsHistory.find(c => c.id === selectedSmsContact);
                  return conversation?.messages.map(message => (
                    <div key={message.id} className={`flex ${message.isOutgoing ? 'justify-end' : 'justify-start'}`}>
                      <div 
                        className={`max-w-[85%] rounded-lg p-3 ${
                          message.isOutgoing 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        <div>{message.text}</div>
                        <div className={`text-xs mt-1 ${message.isOutgoing ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
              
              {/* Message input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Plus className="h-5 w-5" />
                  </Button>
                  <Textarea 
                    placeholder="Type a message..." 
                    className="min-h-[60px] resize-none" 
                    value={newSmsText}
                    onChange={(e) => setNewSmsText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply();
                      }
                    }}
                  />
                  <Button 
                    variant="default" 
                    size="icon"
                    disabled={!newSmsText.trim() || isSending}
                    onClick={handleSendReply}
                  >
                    {isSending ? (
                      <RefreshCw className="h-5 w-5 animate-spin" />
                    ) : (
                      <SendIcon className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Mail</h1>
          <p className="text-muted-foreground">Manage your emails and messages</p>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <Card className="p-4 h-full">
            <div className="space-y-1 mb-6">
              <button 
                className="bg-primary text-white px-4 py-2 rounded-md w-full flex items-center justify-center"
                onClick={() => {
                  setComposeOpen(true);
                  setActiveTab("email");
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Compose
              </button>
            </div>
            
            <div className="space-y-1">
              <button 
                className={`flex items-center w-full p-2 rounded-md ${activeTab === "email" ? "bg-primary/10 text-primary" : "hover:bg-muted/80"}`}
                onClick={() => setActiveTab("email")}
              >
                <Mail className="mr-2 h-4 w-4" /> Email
              </button>
              <button 
                className={`flex items-center w-full p-2 rounded-md ${activeTab === "sms" ? "bg-primary/10 text-primary" : "hover:bg-muted/80"}`}
                onClick={() => {
                  setActiveTab("sms");
                  setSelectedEmail(null);
                  setComposeOpen(false);
                }}
              >
                <MessageSquare className="mr-2 h-4 w-4" /> SMS
              </button>
            </div>
            
            {activeTab === "email" && (
              <div className="space-y-1 mt-4">
                <button className="flex items-center w-full p-2 rounded-md bg-primary/10 text-primary">
                  <Inbox className="mr-2 h-4 w-4" /> Inbox <span className="ml-auto bg-primary text-white rounded-full px-2 text-xs">12</span>
                </button>
                <button className="flex items-center w-full p-2 rounded-md hover:bg-muted/80">
                  <Send className="mr-2 h-4 w-4" /> Sent
                </button>
                <button className="flex items-center w-full p-2 rounded-md hover:bg-muted/80">
                  <FileText className="mr-2 h-4 w-4" /> Drafts <span className="ml-auto bg-muted text-muted-foreground rounded-full px-2 text-xs">2</span>
                </button>
                <button className="flex items-center w-full p-2 rounded-md hover:bg-muted/80">
                  <Star className="mr-2 h-4 w-4" /> Starred
                </button>
                <button className="flex items-center w-full p-2 rounded-md hover:bg-muted/80">
                  <Trash className="mr-2 h-4 w-4" /> Trash
                </button>
              </div>
            )}
            
            {activeTab === "sms" && (
              <div className="space-y-1 mt-4">
                <button className="flex items-center w-full p-2 rounded-md bg-primary/10 text-primary">
                  <Inbox className="mr-2 h-4 w-4" /> Conversations <span className="ml-auto bg-primary text-white rounded-full px-2 text-xs">3</span>
                </button>
                <button className="flex items-center w-full p-2 rounded-md hover:bg-muted/80">
                  <Users className="mr-2 h-4 w-4" /> Contacts
                </button>
                <button className="flex items-center w-full p-2 rounded-md hover:bg-muted/80">
                  <Send className="mr-2 h-4 w-4" /> Sent
                </button>
                <button className="flex items-center w-full p-2 rounded-md hover:bg-muted/80">
                  <Trash className="mr-2 h-4 w-4" /> Archive
                </button>
              </div>
            )}
            
            <div className="border-t mt-4 pt-4">
              <h3 className="font-medium text-sm mb-2">Labels</h3>
              <div className="space-y-1">
                <div className="flex items-center p-2 hover:bg-muted/80 rounded-md cursor-pointer">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span> Work
                </div>
                <div className="flex items-center p-2 hover:bg-muted/80 rounded-md cursor-pointer">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span> Personal
                </div>
                <div className="flex items-center p-2 hover:bg-muted/80 rounded-md cursor-pointer">
                  <span className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></span> Important
                </div>
                <div className="flex items-center p-2 hover:bg-muted/80 rounded-md cursor-pointer text-muted-foreground">
                  <Tag className="h-4 w-4 mr-2" /> Manage labels
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="col-span-12 md:col-span-9">
          <Card className="h-full">
            {activeTab === "email" ? (
              <div className="p-0">
                {composeOpen ? (
                  <div className="p-4">
                    <div className="border rounded-md p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">New Message</h2>
                        <Button variant="ghost" size="icon" onClick={() => setComposeOpen(false)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b pb-2">
                          <label className="w-16 text-right text-muted-foreground text-sm">To:</label>
                          <input type="text" className="flex-1 p-2 focus:outline-none bg-transparent" placeholder="Recipients" />
                        </div>
                        <div className="flex items-center gap-2 border-b pb-2">
                          <label className="w-16 text-right text-muted-foreground text-sm">Subject:</label>
                          <input type="text" className="flex-1 p-2 focus:outline-none bg-transparent" placeholder="Subject" />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 border-b pb-2 mb-4">
                            <Button variant="ghost" size="sm" className="rounded-md h-8 px-2 hover:bg-muted" title="Bold">
                              <Bold className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-md h-8 px-2 hover:bg-muted" title="Italic">
                              <Italic className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-md h-8 px-2 hover:bg-muted" title="Underline">
                              <Underline className="h-4 w-4" />
                            </Button>
                            <span className="border-r h-6"></span>
                            <Button variant="ghost" size="sm" className="rounded-md h-8 px-2 hover:bg-muted" title="Bullet list">
                              <List className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-md h-8 px-2 hover:bg-muted" title="Numbered list">
                              <ListOrdered className="h-4 w-4" />
                            </Button>
                            <span className="border-r h-6"></span>
                            <Button variant="ghost" size="sm" className="rounded-md h-8 px-2 hover:bg-muted" title="Align left">
                              <AlignLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-md h-8 px-2 hover:bg-muted" title="Align center">
                              <AlignCenter className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-md h-8 px-2 hover:bg-muted" title="Align right">
                              <AlignRight className="h-4 w-4" />
                            </Button>
                            <span className="border-r h-6"></span>
                            <Button variant="ghost" size="sm" className="rounded-md h-8 px-2 hover:bg-muted" title="Insert link">
                              <Link className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-md h-8 px-2 hover:bg-muted" title="Insert image">
                              <Image className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-md h-8 px-2 hover:bg-muted" title="Insert emoji">
                              <Smile className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-md h-8 px-2 hover:bg-muted" title="Mention someone">
                              <AtSign className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Textarea 
                            placeholder="Write your message here..." 
                            className="min-h-[200px] border-0 focus-visible:ring-0 resize-none p-0 shadow-none" 
                          />
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" title="Attach files">
                              <Paperclip className="h-4 w-4 mr-1" />
                              Attach
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Save as Draft
                            </Button>
                            <Button size="sm" className="gap-1">
                              Send
                              <SendIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : selectedEmail ? (
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedEmail(null)}>
                          <X className="h-4 w-4 mr-1" />
                          Close
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" title="Archive">
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete">
                          <Trash className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Reply">
                          <SendIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="More">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarFallback>{emails.find(e => e.id === selectedEmail)?.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{emails.find(e => e.id === selectedEmail)?.subject}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <span className="font-medium">{emails.find(e => e.id === selectedEmail)?.from}</span>
                              <span>&lt;{emails.find(e => e.id === selectedEmail)?.email}&gt;</span>
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                              <span>To: me</span>
                              <span className="border-l pl-2">{emails.find(e => e.id === selectedEmail)?.time}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Button variant="ghost" size="icon" title="Star">
                            <Star className="h-4 w-4" fill={emails.find(e => e.id === selectedEmail)?.starred ? "currentColor" : "none"} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="prose max-w-none">
                        <p>Hello,</p>
                        <p>{emails.find(e => e.id === selectedEmail)?.excerpt}</p>
                        <p>Best regards,<br/>{emails.find(e => e.id === selectedEmail)?.from}</p>
                      </div>
                      
                      {emails.find(e => e.id === selectedEmail)?.attachments ? (
                        <div className="mt-6 border-t pt-4">
                          <div className="text-sm font-medium mb-2">Attachments ({emails.find(e => e.id === selectedEmail)?.attachments})</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 border rounded-md p-2">
                              <FileText className="h-4 w-4 text-blue-500" />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm truncate">document-file.pdf</div>
                                <div className="text-xs text-muted-foreground">1.2 MB</div>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Email list */}
                    <div className="divide-y">
                      {emails.map((email) => (
                        <div 
                          key={email.id} 
                          className={`p-4 flex items-start gap-4 hover:bg-muted/50 cursor-pointer transition-colors ${email.unread ? 'bg-primary/5' : ''}`}
                          onClick={() => setSelectedEmail(email.id)}
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{email.avatar}</AvatarFallback>
                            </Avatar>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div className={`font-medium ${email.unread ? 'text-primary-foreground font-semibold' : ''}`}>
                                {email.from}
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center gap-2">
                                {email.attachments > 0 && <Paperclip className="h-3 w-3" />}
                                <span>{email.time}</span>
                                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={(e) => {
                                  e.stopPropagation();
                                  // Toggle star logic would go here
                                }}>
                                  <Star className="h-3 w-3" fill={email.starred ? "currentColor" : "none"} />
                                </Button>
                              </div>
                            </div>
                            
                            <div className={`text-sm ${email.unread ? 'font-medium' : 'text-muted-foreground'}`}>
                              {email.subject}
                            </div>
                            
                            <div className="text-xs text-muted-foreground truncate mt-1">
                              {email.excerpt}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              renderSmsInterface()
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MailBox;
