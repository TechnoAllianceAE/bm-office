
import React, { useState } from 'react';
import { Send, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/common/Card';
import { cn } from '@/lib/utils';

const AIAssistant = () => {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    { role: 'assistant', content: 'Hello! How can I help you with your projects today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I understand you\'re asking about projects. What specific information or assistance do you need with your projects?' 
      }]);
    }, 1000);
    
    setInput('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex-none mb-4">
        <h1 className="text-2xl font-semibold">AI Assistant</h1>
        <p className="text-muted-foreground">Your intelligent project companion</p>
      </div>

      <Card className="flex-1 flex flex-col bg-card/60 backdrop-blur-md border border-white/30 overflow-hidden">
        <div className="flex-none border-b border-border/50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-medium">GlobalHub Assistant</h2>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={cn(
                "flex max-w-3xl",
                message.role === 'assistant' ? "self-start" : "self-end ml-auto"
              )}
            >
              <div className={cn(
                "rounded-lg p-4",
                message.role === 'assistant' 
                  ? "bg-secondary/80 backdrop-blur-sm" 
                  : "bg-primary/10 backdrop-blur-sm"
              )}>
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex-none p-4 border-t border-border/50">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about your projects..."
              className="w-full rounded-full bg-background/50 backdrop-blur-sm border border-border/50 px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute right-2"
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIAssistant;
