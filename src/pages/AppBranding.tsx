
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Building, Upload, X, Check, Image as ImageIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const defaultAppSettings = {
  name: "BM Office",
  showName: true,
  showLogo: true,
  logoUrl: "/lovable-uploads/05305298-8812-4b79-9e2e-0f8fa2dc1d97.png"
};

const AppBranding = () => {
  const [appSettings, setAppSettings] = useState(defaultAppSettings);
  const [logoPreview, setLogoPreview] = useState<string | null>(appSettings.logoUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppSettings(prev => ({ ...prev, name: e.target.value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, SVG, etc.).",
        variant: "destructive"
      });
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Create a preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result as string);
      
      // In a real application, you would upload the image to a server here
      // and then update the logoUrl with the URL from the server
      setTimeout(() => {
        setAppSettings(prev => ({ ...prev, logoUrl: reader.result as string }));
        setIsUploading(false);
        
        toast({
          title: "Logo updated",
          description: "Your application logo has been updated successfully.",
        });
      }, 1500); // Simulating upload delay
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = () => {
    // In a real app, this would save to a database or localstorage
    toast({
      title: "Settings saved",
      description: "Your application branding settings have been saved successfully.",
    });
  };

  const handleResetDefaults = () => {
    setAppSettings(defaultAppSettings);
    setLogoPreview(defaultAppSettings.logoUrl);
    toast({
      title: "Settings reset",
      description: "Application branding has been reset to default.",
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setAppSettings(prev => ({ ...prev, logoUrl: "" }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Application Branding</h1>
        <p className="text-muted-foreground">Customize your application name and logo</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>
                Customize how your application appears to users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="app-name">Application Name</Label>
                <Input
                  id="app-name"
                  value={appSettings.name}
                  onChange={handleNameChange}
                  placeholder="Enter application name"
                />
              </div>

              <div className="space-y-3">
                <Label>Application Logo</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    isDragging 
                      ? "border-primary bg-primary/5" 
                      : "border-muted-foreground/25 hover:border-primary/50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                  
                  {isUploading ? (
                    <div className="py-4">
                      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
                      <p className="text-sm text-muted-foreground">Uploading logo...</p>
                    </div>
                  ) : logoPreview ? (
                    <div className="relative inline-block">
                      <img 
                        src={logoPreview} 
                        alt="Application Logo" 
                        className="max-h-32 max-w-full rounded-md mx-auto"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-background text-foreground rounded-full p-1 shadow-md hover:bg-muted"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveLogo();
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="py-4">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm font-medium mb-1">
                        Drag and drop your logo here or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Recommended size: 256x256px. Max 5MB. SVG, PNG, or JPG.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-b py-4">
                <div className="space-y-0.5">
                  <Label htmlFor="show-name">Show Application Name</Label>
                  <p className="text-sm text-muted-foreground">Display the name in the sidebar and header</p>
                </div>
                <Switch
                  id="show-name"
                  checked={appSettings.showName}
                  onCheckedChange={value => setAppSettings(prev => ({ ...prev, showName: value }))}
                />
              </div>

              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-0.5">
                  <Label htmlFor="show-logo">Show Application Logo</Label>
                  <p className="text-sm text-muted-foreground">Display the logo in the sidebar and header</p>
                </div>
                <Switch
                  id="show-logo"
                  checked={appSettings.showLogo}
                  onCheckedChange={value => setAppSettings(prev => ({ ...prev, showLogo: value }))}
                />
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={handleResetDefaults}>
                  Reset to Defaults
                </Button>
                <Button onClick={handleSaveChanges}>
                  <Check className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                How your application branding will appear to users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-3 p-3 border-b">
                  {appSettings.showLogo && (
                    <div className="rounded-md bg-primary p-1.5 shrink-0">
                      {appSettings.logoUrl ? (
                        <img 
                          src={appSettings.logoUrl} 
                          alt="Logo Preview" 
                          className="h-6 w-6 object-contain"
                        />
                      ) : (
                        <Building className="h-6 w-6 text-white" />
                      )}
                    </div>
                  )}
                  {appSettings.showName && (
                    <span className="font-display text-lg font-semibold whitespace-nowrap">
                      {appSettings.name || "Application Name"}
                    </span>
                  )}
                </div>
                
                <div className="p-3 flex items-center justify-between border-b">
                  <div className="flex items-center gap-2">
                    {appSettings.showLogo && (
                      <div className="rounded-md bg-primary p-1 shrink-0">
                        {appSettings.logoUrl ? (
                          <img 
                            src={appSettings.logoUrl} 
                            alt="Logo Preview" 
                            className="h-4 w-4 object-contain"
                          />
                        ) : (
                          <Building className="h-4 w-4 text-white" />
                        )}
                      </div>
                    )}
                    {appSettings.showName && (
                      <span className="text-sm font-medium">
                        {appSettings.name || "Application Name"}
                      </span>
                    )}
                  </div>
                  <div className="text-xs bg-muted px-2 py-1 rounded">Header</div>
                </div>
                
                <div className="p-3 pt-4 text-center text-sm text-muted-foreground">
                  Your application branding will be applied throughout the interface
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default AppBranding;
