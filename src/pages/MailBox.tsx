
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MailBox = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-3xl font-bold">Mailbox</h1>
        <p className="text-muted-foreground">
          Manage your emails and communications
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              Mailbox functionality is coming soon
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MailBox;
