
import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import MailSidebar from '@/components/mailbox/MailSidebar';
import EmailCompose from '@/components/mailbox/EmailCompose';
import EmailViewer from '@/components/mailbox/EmailViewer';
import EmailList from '@/components/mailbox/EmailList';
import SmsInterface from '@/components/mailbox/SmsInterface';

const MailBox = () => {
  const [composeOpen, setComposeOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("email");
  
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

  const handleComposeClick = () => {
    setComposeOpen(true);
    setActiveTab("email");
    setSelectedEmail(null);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedEmail(null);
    setComposeOpen(false);
  };

  const handleEmailSelect = (emailId: number) => {
    setSelectedEmail(emailId);
    setComposeOpen(false);
  };

  const handleCloseCompose = () => {
    setComposeOpen(false);
  };

  const handleCloseViewer = () => {
    setSelectedEmail(null);
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
          <MailSidebar 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onComposeClick={handleComposeClick}
          />
        </div>
        
        {/* Main content area */}
        <div className="col-span-12 md:col-span-9">
          <Card className="h-full">
            {activeTab === "email" ? (
              <div className="p-0">
                {composeOpen ? (
                  <EmailCompose onClose={handleCloseCompose} />
                ) : selectedEmail ? (
                  <EmailViewer 
                    email={emails.find(e => e.id === selectedEmail)!}
                    onClose={handleCloseViewer}
                  />
                ) : (
                  <EmailList 
                    emails={emails}
                    onEmailSelect={handleEmailSelect}
                  />
                )}
              </div>
            ) : (
              <SmsInterface />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MailBox;
