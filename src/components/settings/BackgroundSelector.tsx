
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";

const bgOptions = [
  { id: 'none', name: 'None', preview: 'bg-transparent' },
  { id: 'gradient1', name: 'Soft Gradient', preview: 'bg-gradient-to-br from-blue-50 to-indigo-100' },
  { id: 'gradient2', name: 'Purple Haze', preview: 'bg-gradient-to-br from-purple-50 to-pink-100' },
  { id: 'gradient3', name: 'Ocean Blue', preview: 'bg-gradient-to-br from-cyan-50 to-blue-100' },
  { id: 'pattern1', name: 'Soft Grid', preview: 'bg-grid-pattern' },
  { id: 'pattern2', name: 'Dots', preview: 'bg-dots-pattern' },
];

const BackgroundSelector = () => {
  const { backgroundImage, setBackgroundImage } = useTheme();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Background Image</h3>
      <div className="grid grid-cols-3 gap-3">
        {bgOptions.map((bg) => (
          <div 
            key={bg.id}
            className={`relative rounded-md overflow-hidden h-24 cursor-pointer border-2 transition-all ${backgroundImage === bg.id ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
            onClick={() => setBackgroundImage(bg.id)}
          >
            <div className={`absolute inset-0 ${bg.preview}`} />
            <div className="absolute inset-0 flex items-end justify-center p-2">
              <span className="text-xs font-medium bg-background/70 px-2 py-1 rounded-md">{bg.name}</span>
            </div>
          </div>
        ))}
      </div>
      
      <Card className="mt-4">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Custom Background</span>
            <Button variant="outline" size="sm">Upload Image</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Upload a custom background image (recommended size: 1920×1080px)
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackgroundSelector;
