
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Bell,
  Mail,
  Palette,
  Globe,
  Clock,
  FileCode,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("appearance");

  // This helps ensure the tab navigation works properly
  useEffect(() => {
    // Force tab content to update when theme changes
    const tabContent = document.querySelector(`[data-state="active"][role="tabpanel"]`);
    if (tabContent) {
      tabContent.setAttribute("data-state", "inactive");
      setTimeout(() => {
        tabContent.setAttribute("data-state", "active");
      }, 10);
    }
  }, [theme]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-6"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Customize your workspace preferences</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6 w-full grid grid-cols-3 md:w-auto">
          <TabsTrigger value="appearance" className="flex gap-2 items-center justify-center">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 items-center justify-center">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex gap-2 items-center justify-center">
            <FileCode className="h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>
                  Choose your preferred color theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`border-2 rounded-md p-4 flex flex-col items-center cursor-pointer transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="w-full h-12 bg-white border mb-2 rounded"></div>
                    <div className="text-sm font-medium">Light</div>
                    <div className="text-xs text-muted-foreground">Default light theme</div>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-md p-4 flex flex-col items-center cursor-pointer transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="w-full h-12 bg-gray-900 border border-gray-700 mb-2 rounded"></div>
                    <div className="text-sm font-medium">Dark</div>
                    <div className="text-xs text-muted-foreground">Dark mode theme</div>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-md p-4 flex flex-col items-center cursor-pointer transition-all ${theme === 'blue' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                    onClick={() => setTheme('blue')}
                  >
                    <div className="w-full h-12 bg-gradient-to-b from-[#0066CC] to-[#00A3E0] mb-2 rounded"></div>
                    <div className="text-sm font-medium">Blue</div>
                    <div className="text-xs text-muted-foreground">Cool blue theme</div>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-md p-4 flex flex-col items-center cursor-pointer transition-all ${theme === 'purple' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                    onClick={() => setTheme('purple')}
                  >
                    <div className="w-full h-12 bg-gradient-to-b from-[#6A4BFC] to-[#7e69ab] mb-2 rounded"></div>
                    <div className="text-sm font-medium">Purple</div>
                    <div className="text-xs text-muted-foreground">Rich purple theme</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Language</CardTitle>
                <CardDescription>
                  Set your preferred language
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">English (US)</div>
                        <div className="text-xs text-muted-foreground">Current language</div>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Date format: MM/DD/YYYY
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
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
        </TabsContent>
        
        <TabsContent value="integration">
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
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Settings;
