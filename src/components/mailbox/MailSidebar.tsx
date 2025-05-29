
import React from 'react';
import { Card } from '@/components/common/Card';
import { 
  Inbox, Send, Trash, Star, Tag, 
  Plus, FileText, Mail, MessageSquare, Users
} from 'lucide-react';

interface MailSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onComposeClick: () => void;
}

const MailSidebar: React.FC<MailSidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  onComposeClick 
}) => {
  return (
    <Card className="p-4 h-full">
      <div className="space-y-1 mb-6">
        <button 
          className="bg-primary text-white px-4 py-2 rounded-md w-full flex items-center justify-center"
          onClick={onComposeClick}
        >
          <Plus className="mr-2 h-4 w-4" /> Compose
        </button>
      </div>
      
      <div className="space-y-1">
        <button 
          className={`flex items-center w-full p-2 rounded-md ${activeTab === "email" ? "bg-primary/10 text-primary" : "hover:bg-muted/80"}`}
          onClick={() => onTabChange("email")}
        >
          <Mail className="mr-2 h-4 w-4" /> Email
        </button>
        <button 
          className={`flex items-center w-full p-2 rounded-md ${activeTab === "sms" ? "bg-primary/10 text-primary" : "hover:bg-muted/80"}`}
          onClick={() => onTabChange("sms")}
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
  );
};

export default MailSidebar;
