
import React from "react";
import { Link } from "react-router-dom";
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
  Users,
  Bell,
  Mail,
  Moon,
  Sun,
  LayoutGrid,
  Palette,
  Globe,
  Clock,
  Shield,
  Eye,
  PaintBucket,
  FileCode,
  Building,
  ChevronRight,
  Image
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Customize your workspace preferences</p>
      </div>
      
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="mb-6 w-full md:w-auto overflow-x-auto grid grid-flow-col md:grid-flow-row auto-cols-auto">
          <TabsTrigger value="appearance" className="flex gap-2 items-center">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 items-center">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex gap-2 items-center">
            <FileCode className="h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Application Branding</CardTitle>
                <CardDescription>
                  Customize your application name and logo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-md bg-primary p-2 text-white">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Custom Branding</div>
                      <div className="text-sm text-muted-foreground">Change the name and logo of your application</div>
                    </div>
                  </div>
                  <Link to="/settings/branding">
                    <Button variant="outline" className="gap-2">
                      <Image className="h-4 w-4" />
                      Customize
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>
                  Choose your preferred color theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  <div 
                    className={`border-2 rounded-md p-2 flex flex-col items-center cursor-pointer transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="w-full h-12 bg-white border mb-2 rounded"></div>
                    <div className="text-xs font-medium">Light</div>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-md p-2 flex flex-col items-center cursor-pointer transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="w-full h-12 bg-gray-900 border border-gray-700 mb-2 rounded"></div>
                    <div className="text-xs font-medium">Dark</div>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-md p-2 flex flex-col items-center cursor-pointer transition-all ${theme === 'purple' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                    onClick={() => setTheme('purple')}
                  >
                    <div className="w-full h-12 bg-gradient-to-b from-[#6A4BFC] to-[#7e69ab] mb-2 rounded"></div>
                    <div className="text-xs font-medium">Purple</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Mode</CardTitle>
                <CardDescription>
                  Select the mode of the interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border-2 border-primary bg-primary/5 rounded-md p-2 flex flex-col items-center cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                      <Sun className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-medium">Light Mode</div>
                  </div>
                  
                  <div className="border-2 border-muted hover:border-primary/50 rounded-md p-2 flex flex-col items-center cursor-pointer transition-all">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                      <Moon className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-medium">Dark Mode</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>
                  Configure accessibility preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <div className="font-medium">Reduced Motion</div>
                      <div className="text-sm text-muted-foreground">Disable animations</div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">High Contrast</div>
                      <div className="text-sm text-muted-foreground">Increase visual contrast</div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
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
            
            <Card>
              <CardHeader>
                <CardTitle>Layout</CardTitle>
                <CardDescription>
                  Configure the app layout
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border-2 border-primary bg-primary/5 rounded-md p-2 flex flex-col items-center cursor-pointer">
                    <div className="w-full h-12 bg-muted flex items-center mb-2 px-2 rounded">
                      <div className="w-1/4 h-10 bg-primary/20 rounded"></div>
                      <div className="w-3/4 h-10 ml-1 rounded"></div>
                    </div>
                    <div className="text-xs font-medium">Default</div>
                  </div>
                  
                  <div className="border-2 border-muted hover:border-primary/50 rounded-md p-2 flex flex-col items-center cursor-pointer transition-all">
                    <div className="w-full h-12 bg-muted flex items-center mb-2 px-2 rounded">
                      <div className="w-10 h-10 bg-primary/20 rounded"></div>
                      <div className="w-full h-10 ml-1 rounded"></div>
                    </div>
                    <div className="text-xs font-medium">Compact</div>
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
