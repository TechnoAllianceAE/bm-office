
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, Filter, RefreshCw, MessageSquare, 
  Plus, Send as SendIcon, Phone, User, MoreVertical
} from 'lucide-react';

interface SmsContact {
  id: number;
  name: string;
  phone: string;
  avatar: string;
}

interface SmsMessage {
  id: number;
  text: string;
  timestamp: string;
  isOutgoing: boolean;
}

interface SmsConversation {
  id: number;
  contact: string;
  phone: string;
  avatar: string;
  messages: SmsMessage[];
  unread: number;
}

const SmsInterface: React.FC = () => {
  const [selectedSmsContact, setSelectedSmsContact] = useState<number | null>(null);
  const [newSmsText, setNewSmsText] = useState("");
  const [smsMessage, setSmsMessage] = useState("");
  const [smsRecipient, setSmsRecipient] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  // Sample SMS conversations history
  const smsHistory: SmsConversation[] = [
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
    }, 1000);
  };

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

export default SmsInterface;
