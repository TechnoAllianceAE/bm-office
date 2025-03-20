
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bot, Send, PlusCircle, Share2, Download, Paperclip, 
  X, Sparkles, Save, Trash
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Define AI models available
const AI_MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o', description: 'Advanced multimodal model' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: 'Faster, smaller version' },
  { id: 'claude-3', name: 'Claude 3', description: 'Alternative AI model' },
];

// Define AI roles
const AI_ROLES = [
  { id: 'assistant', name: 'General Assistant', description: 'Versatile helper for various tasks' },
  { id: 'researcher', name: 'Research Assistant', description: 'Helps analyze and gather information' },
  { id: 'writer', name: 'Content Writer', description: 'Assists with writing and editing' },
  { id: 'coder', name: 'Code Assistant', description: 'Helps with programming tasks' },
  { id: 'analyst', name: 'Data Analyst', description: 'Helps interpret and analyze data' },
];

// Message interface
interface Message {
  id: number;
  content: string;
  role: 'user' | 'assistant';
  attachments?: { name: string; url: string; type: string }[];
}

const AIAssistant = () => {
  // State for messages and user input
  const [conversations, setConversations] = useState<{ id: string; title: string; messages: Message[] }[]>([
    {
      id: '1',
      title: 'New Conversation',
      messages: [
        {
          id: 1,
          content: "Hello! I'm your AI assistant from BM Office. How can I help you today?",
          role: 'assistant'
        }
      ]
    }
  ]);
  const [activeConversationId, setActiveConversationId] = useState('1');
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [selectedRole, setSelectedRole] = useState('assistant');
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get active conversation
  const activeConversation = conversations.find(c => c.id === activeConversationId) || conversations[0];

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  // Remove attachment
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Create new conversation
  const createNewConversation = () => {
    const newId = Date.now().toString();
    const newConversation = {
      id: newId,
      title: `New Conversation ${conversations.length + 1}`,
      messages: [
        {
          id: 1,
          content: "Hello! I'm your AI assistant from BM Office. How can I help you today?",
          role: 'assistant' as const
        }
      ]
    };
    
    setConversations(prev => [...prev, newConversation]);
    setActiveConversationId(newId);
    setInput('');
    setAttachments([]);
  };

  // Delete conversation
  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    
    if (id === activeConversationId && conversations.length > 1) {
      setActiveConversationId(conversations[0].id === id ? conversations[1].id : conversations[0].id);
    }
  };

  // Handle sending message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && attachments.length === 0) return;

    // Create attachment objects
    const messageAttachments = attachments.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type
    }));

    // Add user message
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversationId) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            { 
              id: Date.now(), 
              content: input, 
              role: 'user' as const,
              attachments: messageAttachments.length > 0 ? messageAttachments : undefined
            }
          ]
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setInput('');
    setAttachments([]);

    // Simulate assistant response
    setTimeout(() => {
      setConversations(conversations => 
        conversations.map(conv => {
          if (conv.id === activeConversationId) {
            const roleText = selectedRole === 'assistant' ? '' : 
              selectedRole === 'researcher' ? ' as your research assistant' : 
              selectedRole === 'writer' ? ' as your content writer' : 
              selectedRole === 'coder' ? ' as your code assistant' :
              ' as your data analyst';
              
            return {
              ...conv,
              messages: [
                ...conv.messages,
                { 
                  id: Date.now() + 1, 
                  content: `I'm analyzing your request${roleText} using ${AI_MODELS.find(m => m.id === selectedModel)?.name}. What specific information would you like to know?`, 
                  role: 'assistant' as const
                }
              ]
            };
          }
          return conv;
        })
      );
    }, 1000);
  };

  // Export conversation
  const exportConversation = () => {
    if (!activeConversation) return;

    const conversationText = activeConversation.messages
      .map(msg => `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeConversation.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">AI Assistant</h1>
          <p className="text-sm text-muted-foreground">Powered by advanced AI to help with your tasks</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={createNewConversation}
            className="flex-shrink-0"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Chat
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportConversation}
            className="flex-shrink-0"
            disabled={activeConversation.messages.length <= 1}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-10rem)]">
        {/* Sidebar with conversations */}
        <Card className="md:col-span-1 border h-full hidden md:block">
          <ScrollArea className="h-full">
            <div className="p-3 space-y-2">
              {conversations.map((conv) => (
                <div 
                  key={conv.id}
                  className={`
                    p-2 rounded-lg cursor-pointer group flex justify-between items-center
                    ${activeConversationId === conv.id ? 'bg-primary/10' : 'hover:bg-muted'}
                  `}
                  onClick={() => setActiveConversationId(conv.id)}
                >
                  <div className="flex items-center gap-2 flex-1 overflow-hidden">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm truncate">{conv.title}</span>
                  </div>
                  {conversations.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => { 
                        e.stopPropagation();
                        deleteConversation(conv.id);
                      }}
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
        
        {/* Main conversation area */}
        <Card className="md:col-span-3 flex flex-col border h-full">
          {/* AI settings */}
          <div className="p-3 border-b">
            <Tabs defaultValue="model" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="model">AI Model</TabsTrigger>
                <TabsTrigger value="role">AI Role</TabsTrigger>
              </TabsList>
              <TabsContent value="model" className="mt-2">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    {AI_MODELS.map((model) => (
                      <SelectItem key={model.id} value={model.id} className="flex flex-col items-start">
                        <div className="font-medium">{model.name}</div>
                        <div className="text-xs text-muted-foreground">{model.description}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
              <TabsContent value="role" className="mt-2">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI role" />
                  </SelectTrigger>
                  <SelectContent>
                    {AI_ROLES.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        <div className="font-medium">{role.name}</div>
                        <div className="text-xs text-muted-foreground">{role.description}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {activeConversation.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2 max-w-[80%]`}>
                    <Avatar className={`h-8 w-8 ${message.role === 'user' ? 'bg-primary' : 'bg-secondary'}`}>
                      {message.role === 'assistant' ? (
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <AvatarFallback>U</AvatarFallback>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      
                      {/* Render attachments if any */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {message.attachments.map((att, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 rounded bg-background/50">
                              <Paperclip className="h-3 w-3" />
                              <span className="text-xs truncate">{att.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Message input */}
          <div className="p-3 border-t">
            {/* Attachments preview */}
            {attachments.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center gap-1 bg-muted rounded-full pl-2 pr-1 py-1 text-xs">
                    <Paperclip className="h-3 w-3" />
                    <span className="truncate max-w-[100px]">{file.name}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 rounded-full"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <div className="flex gap-1">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Paperclip className="h-4 w-4" />
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileSelect} 
                    multiple
                  />
                </Button>
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;
