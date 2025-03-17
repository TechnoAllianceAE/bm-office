import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Settings, User, Bell, Lock, Palette, Image as ImageIcon, Upload } from 'lucide-react';

// Sample background images
const backgroundImages = [
  { id: 'abstract', url: 'https://images.unsplash.com/photo-1557682250-81f969aa2c6d?q=80&w=2200', name: 'Abstract White' },
  { id: 'black', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070', name: 'Black' },
  { id: 'teal', url: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=2000', name: 'Teal' },
  { id: 'skyblue', url: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=2070', name: 'Sky Blue' },
  { id: 'mountains', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070', name: 'Mountains' },
  { id: 'ocean', url: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=2070', name: 'Ocean' },
  { id: 'forest', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070', name: 'Forest' },
  { id: 'cityscape', url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2532', name: 'Cityscape' },
  { id: 'desert', url: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2070', name: 'Desert' },
  { id: 'aurora', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070', name: 'Aurora' },
];

const SettingsPage = () => {
  const [selectedBackground, setSelectedBackground] = useState('abstract');
  const [customBackgroundUrl, setCustomBackgroundUrl] = useState('');
  const [blurLevel, setBlurLevel] = useState('medium');
  
  // Function to set the background image
  const applyBackground = (imageUrl: string) => {
    // In a real implementation, this would update global state or context
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    
    // Apply blur based on the selected level
    let blurValue = '0';
    if (blurLevel === 'light') blurValue = '5px';
    if (blurLevel === 'medium') blurValue = '10px';
    if (blurLevel === 'heavy') blurValue = '15px';
    
    // Create a pseudo-element for the blur effect (to avoid blurring the content)
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${imageUrl});
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        filter: blur(${blurValue});
        z-index: -1;
      }
      body {
        background-color: rgba(255, 255, 255, 0.1);
      }
    `;
    
    // Remove any existing style element
    const oldStyle = document.getElementById('bg-style');
    if (oldStyle) oldStyle.remove();
    
    // Add the new style element
    styleEl.id = 'bg-style';
    document.head.appendChild(styleEl);
  };
  
  // Apply background when selection or blur level changes
  React.useEffect(() => {
    const selectedImage = backgroundImages.find(img => img.id === selectedBackground);
    if (selectedImage) {
      applyBackground(selectedImage.url);
    } else if (customBackgroundUrl) {
      applyBackground(customBackgroundUrl);
    }
  }, [selectedBackground, customBackgroundUrl, blurLevel]);
  
  const handleCustomBackgroundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customBackgroundUrl) {
      setSelectedBackground('custom');
      applyBackground(customBackgroundUrl);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>
      
      <Tabs defaultValue="appearance">
        <TabsList className="mb-6 bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" className="bg-background/50 backdrop-blur-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john.doe@example.com" className="bg-background/50 backdrop-blur-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" defaultValue="Product Manager" className="bg-background/50 backdrop-blur-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Product" className="bg-background/50 backdrop-blur-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea 
                  id="bio" 
                  className="w-full rounded-md bg-background/50 backdrop-blur-sm border border-input p-3 h-24"
                  defaultValue="Product manager with 5+ years of experience in technology companies."
                />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Appearance Settings</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Background Image</h3>
              <p className="text-muted-foreground mb-4">Choose a background image for your dashboard</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {backgroundImages.map((image) => (
                  <div 
                    key={image.id}
                    className={`
                      relative aspect-video cursor-pointer rounded-lg overflow-hidden
                      ${selectedBackground === image.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:opacity-90'}
                    `}
                    onClick={() => setSelectedBackground(image.id)}
                  >
                    <img 
                      src={image.url} 
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                      <span className="text-white text-sm font-medium">{image.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleCustomBackgroundSubmit} className="mb-6">
                <h3 className="text-lg font-medium mb-2">Custom Background</h3>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter image URL" 
                    className="bg-background/50 backdrop-blur-sm"
                    value={customBackgroundUrl}
                    onChange={(e) => setCustomBackgroundUrl(e.target.value)}
                  />
                  <Button type="submit">Apply</Button>
                </div>
              </form>
              
              <h3 className="text-lg font-medium mb-2">Blur Effect</h3>
              <RadioGroup value={blurLevel} onValueChange={setBlurLevel}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">None</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="heavy" id="heavy" />
                  <Label htmlFor="heavy">Heavy</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Interface Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations" className="block">Enable Animations</Label>
                    <span className="text-xs text-muted-foreground">Turn on/off UI animations</span>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact" className="block">Compact Mode</Label>
                    <span className="text-xs text-muted-foreground">Reduce padding and spacing</span>
                  </div>
                  <Switch id="compact" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sidebar" className="block">Auto-hide Sidebar</Label>
                    <span className="text-xs text-muted-foreground">Automatically collapse sidebar</span>
                  </div>
                  <Switch id="sidebar" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifs" className="block">Email Notifications</Label>
                  <span className="text-xs text-muted-foreground">Receive updates via email</span>
                </div>
                <Switch id="email-notifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifs" className="block">Push Notifications</Label>
                  <span className="text-xs text-muted-foreground">Receive notifications in browser</span>
                </div>
                <Switch id="push-notifs" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="project-updates" className="block">Project Updates</Label>
                  <span className="text-xs text-muted-foreground">Get notified about project changes</span>
                </div>
                <Switch id="project-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="timesheet-reminders" className="block">Timesheet Reminders</Label>
                  <span className="text-xs text-muted-foreground">Get reminded to fill timesheets</span>
                </div>
                <Switch id="timesheet-reminders" defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Change Password</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" className="bg-background/50 backdrop-blur-sm" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="bg-background/50 backdrop-blur-sm" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" className="bg-background/50 backdrop-blur-sm" />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                <p className="text-muted-foreground mb-2">Secure your account with two-factor authentication</p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Sessions</h3>
                <p className="text-muted-foreground mb-2">Manage your active sessions across devices</p>
                <Button variant="outline">Manage Sessions</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;

