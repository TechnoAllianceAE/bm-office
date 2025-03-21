
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Mail, Clock } from "lucide-react";

const NotificationsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Configure how you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-6">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-4">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive notifications in app</div>
                </div>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                </div>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Quiet Hours</div>
                  <div className="text-sm text-muted-foreground">Disable notifications during specific hours</div>
                </div>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
