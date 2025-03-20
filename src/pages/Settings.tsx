
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Check, Palette } from 'lucide-react';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            {/* Additional tabs can be added here */}
          </TabsList>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>
                  Customize the look and feel of your workspace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="theme-selection" className="text-base font-medium mb-3 block">
                      Select Theme
                    </Label>
                    <RadioGroup 
                      value={theme} 
                      onValueChange={(value) => setTheme(value as 'default' | 'coolBlue')}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="relative">
                        <RadioGroupItem value="default" id="default" className="peer sr-only" />
                        <Label 
                          htmlFor="default" 
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <div className="mb-3 w-full space-y-2">
                            <div className="w-full h-6 rounded-md bg-[hsl(220,70%,50%)]"></div>
                            <div className="flex gap-2">
                              <div className="w-1/3 h-4 rounded-md bg-[hsl(220,70%,96%)]"></div>
                              <div className="w-1/3 h-4 rounded-md bg-[hsl(240,4.8%,95.9%)]"></div>
                            </div>
                          </div>
                          <div className="flex w-full items-center justify-between">
                            <span>Default Theme</span>
                            {theme === 'default' && <Check className="h-4 w-4" />}
                          </div>
                        </Label>
                      </div>
                      
                      <div className="relative">
                        <RadioGroupItem value="coolBlue" id="coolBlue" className="peer sr-only" />
                        <Label 
                          htmlFor="coolBlue" 
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <div className="mb-3 w-full space-y-2">
                            <div className="w-full h-6 rounded-md bg-[#0066CC]"></div>
                            <div className="flex gap-2">
                              <div className="w-1/3 h-4 rounded-md bg-[#00A3E0]"></div>
                              <div className="w-1/3 h-4 rounded-md bg-[#3B82F6]"></div>
                            </div>
                          </div>
                          <div className="flex w-full items-center justify-between">
                            <span>Cool Blue Theme</span>
                            {theme === 'coolBlue' && <Check className="h-4 w-4" />}
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Settings;
