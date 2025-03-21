
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const IntegrationsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Services</CardTitle>
        <CardDescription>
          Manage your connected service integrations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-[#4285F4] flex items-center justify-center text-white">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Google Workspace</div>
                <div className="text-sm text-muted-foreground">Calendar, Mail, and Drive integration</div>
              </div>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-[#0A66C2] flex items-center justify-center text-white">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Microsoft 365</div>
                <div className="text-sm text-muted-foreground">Teams, Outlook, and SharePoint integration</div>
              </div>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-[#4A154B] flex items-center justify-center text-white">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Slack</div>
                <div className="text-sm text-muted-foreground">Chat and notification integration</div>
              </div>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationsTab;
