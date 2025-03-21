
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Bell,
  Palette,
  Globe,
  FileCode,
} from "lucide-react";
import ThemeSelector from "@/components/settings/ThemeSelector";
import BackgroundSelector from "@/components/settings/BackgroundSelector";
import LanguageSelector from "@/components/settings/LanguageSelector";
import NotificationsTab from "@/components/settings/NotificationsTab";
import IntegrationsTab from "@/components/settings/IntegrationsTab";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("appearance");

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
        <TabsList className="mb-6 flex w-full md:w-auto">
          <TabsTrigger value="appearance" className="flex-1 md:flex-auto gap-2 items-center justify-center">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1 md:flex-auto gap-2 items-center justify-center">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex-1 md:flex-auto gap-2 items-center justify-center">
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
                <ThemeSelector />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Background</CardTitle>
                <CardDescription>
                  Select a background image or pattern
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BackgroundSelector />
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
                <LanguageSelector />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        
        <TabsContent value="integration">
          <IntegrationsTab />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Settings;
