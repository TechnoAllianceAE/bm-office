import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, Bell, FileCode, Check, Image } from "lucide-react";

// Background image options
const backgroundOptions = [
  {
    name: "Mountain Fog",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "River Valley",
    url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Pine Forest",
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Mountain Lake",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2070&q=80"
  },
  {
    name: "Default",
    url: "/lovable-uploads/05305298-8812-4b79-9e2e-0f8fa2dc1d97.png"
  }
];

const Settings = () => {
  const { settings, setTheme, setBackgroundImage } = useTheme();
  const [customBackgroundUrl, setCustomBackgroundUrl] = useState("");

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your application settings have been saved successfully."
    });
  };

  const handleSetCustomBackground = () => {
    if (customBackgroundUrl) {
      setBackgroundImage(customBackgroundUrl);
      toast({
        title: "Background updated",
        description: "Your custom background image has been applied."
      });
    }
  };

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
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>
                  Choose your preferred color theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div 
                    className={`border-2 rounded-md p-2 flex flex-col items-center cursor-pointer transition-all ${settings.theme === 'light' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="w-full h-12 bg-white border mb-2 rounded"></div>
                    <div className="text-xs font-medium">Light</div>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-md p-2 flex flex-col items-center cursor-pointer transition-all ${settings.theme === 'dark' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="w-full h-12 bg-gray-900 border border-gray-700 mb-2 rounded"></div>
                    <div className="text-xs font-medium">Dark</div>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-md p-2 flex flex-col items-center cursor-pointer transition-all ${settings.theme === 'blue' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                    onClick={() => setTheme('blue')}
                  >
                    <div className="w-full h-12 bg-gradient-to-b from-[#0066CC] to-[#00A3E0] mb-2 rounded"></div>
                    <div className="text-xs font-medium">Blue</div>
                  </div>
                  
                  <div 
                    className={`border-2 rounded-md p-2 flex flex-col items-center cursor-pointer transition-all ${settings.theme === 'purple' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`}
                    onClick={() => setTheme('purple')}
                  >
                    <div className="w-full h-12 bg-gradient-to-b from-[#6A4BFC] to-[#7e69ab] mb-2 rounded"></div>
                    <div className="text-xs font-medium">Purple</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Background Image</CardTitle>
                <CardDescription>
                  Select a background image for your workspace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                  {backgroundOptions.map((bg, index) => (
                    <div 
                      key={index}
                      className={`border-2 rounded-md overflow-hidden cursor-pointer transition-all ${settings.backgroundImage === bg.url ? 'border-primary ring-2 ring-primary/20' : 'border-muted hover:border-primary/50'}`}
                      onClick={() => setBackgroundImage(bg.url)}
                    >
                      <div className="aspect-video w-full relative overflow-hidden">
                        <img 
                          src={bg.url} 
                          alt={bg.name}
                          className="object-cover w-full h-full"
                        />
                        {settings.backgroundImage === bg.url && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <Check className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="p-2 text-xs font-medium text-center">{bg.name}</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4 border-t pt-4">
                  <Label htmlFor="custom-bg">Custom Background URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="custom-bg"
                      placeholder="https://example.com/image.jpg"
                      value={customBackgroundUrl}
                      onChange={(e) => setCustomBackgroundUrl(e.target.value)}
                    />
                    <Button onClick={handleSetCustomBackground}>
                      <Image className="mr-2 h-4 w-4" />
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter a valid image URL to set a custom background
                  </p>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveChanges}>
                    <Check className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
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
              <div className="p-4 text-center text-muted-foreground">
                Notification settings will be available soon.
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
              <div className="p-4 text-center text-muted-foreground">
                Integration settings will be available soon.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Settings;
