
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Paperclip } from 'lucide-react';

interface Email {
  id: number;
  from: string;
  email: string;
  subject: string;
  excerpt: string;
  time: string;
  unread: boolean;
  avatar: string;
  starred: boolean;
  category: string;
  attachments: number;
}

interface EmailListProps {
  emails: Email[];
  onEmailSelect: (emailId: number) => void;
}

const EmailList: React.FC<EmailListProps> = ({ emails, onEmailSelect }) => {
  return (
    <div className="divide-y">
      {emails.map((email) => (
        <div 
          key={email.id} 
          className={`p-4 flex items-start gap-4 hover:bg-muted/50 cursor-pointer transition-colors ${email.unread ? 'bg-primary/5' : ''}`}
          onClick={() => onEmailSelect(email.id)}
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
  );
};

export default EmailList;
