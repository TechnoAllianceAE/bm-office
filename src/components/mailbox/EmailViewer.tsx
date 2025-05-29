
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  X, Archive, Trash, Send as SendIcon, 
  MoreVertical, Star, FileText, Download
} from 'lucide-react';

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

interface EmailViewerProps {
  email: Email;
  onClose: () => void;
}

const EmailViewer: React.FC<EmailViewerProps> = ({ email, onClose }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
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
              <AvatarFallback>{email.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{email.subject}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span className="font-medium">{email.from}</span>
                <span>&lt;{email.email}&gt;</span>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                <span>To: me</span>
                <span className="border-l pl-2">{email.time}</span>
              </div>
            </div>
          </div>
          <div>
            <Button variant="ghost" size="icon" title="Star">
              <Star className="h-4 w-4" fill={email.starred ? "currentColor" : "none"} />
            </Button>
          </div>
        </div>
        
        <div className="prose max-w-none">
          <p>Hello,</p>
          <p>{email.excerpt}</p>
          <p>Best regards,<br/>{email.from}</p>
        </div>
        
        {email.attachments > 0 && (
          <div className="mt-6 border-t pt-4">
            <div className="text-sm font-medium mb-2">Attachments ({email.attachments})</div>
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
        )}
      </div>
    </div>
  );
};

export default EmailViewer;
