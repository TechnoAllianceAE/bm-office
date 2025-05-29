
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  X, Bold, Italic, Underline, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, Link, Image, 
  Smile, AtSign, Paperclip, Send as SendIcon
} from 'lucide-react';

interface EmailComposeProps {
  onClose: () => void;
}

const EmailCompose: React.FC<EmailComposeProps> = ({ onClose }) => {
  return (
    <div className="p-4">
      <div className="border rounded-md p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">New Message</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
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
  );
};

export default EmailCompose;
