
import React, { useState } from 'react';
import { Link2, QrCode, Image, FileText, Calculator, Globe, Clipboard, Calendar } from 'lucide-react';
import { Card } from '@/components/common/Card';

type Tool = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  path: string;
};

const Tools = () => {
  const tools: Tool[] = [
    { 
      id: 'url-shortener', 
      name: 'URL Shortener', 
      description: 'Create shortened URLs for easy sharing', 
      icon: Link2,
      path: '/tools/url-shortener'
    },
    { 
      id: 'qr-generator', 
      name: 'QR Code Generator', 
      description: 'Generate QR codes for links and information', 
      icon: QrCode,
      path: '/tools/qr-generator'
    },
    { 
      id: 'ai-image', 
      name: 'AI Image Generator', 
      description: 'Create images with artificial intelligence', 
      icon: Image,
      path: '/tools/ai-image'
    },
    { 
      id: 'text-formatter', 
      name: 'Text Formatter', 
      description: 'Format and beautify text content', 
      icon: FileText,
      path: '/tools/text-formatter'
    },
    { 
      id: 'calculator', 
      name: 'Advanced Calculator', 
      description: 'Perform complex calculations', 
      icon: Calculator,
      path: '/tools/calculator'
    },
    { 
      id: 'translator', 
      name: 'Language Translator', 
      description: 'Translate text between languages', 
      icon: Globe,
      path: '/tools/translator'
    },
    { 
      id: 'clipboard', 
      name: 'Shared Clipboard', 
      description: 'Share clipboard content between devices', 
      icon: Clipboard,
      path: '/tools/clipboard'
    },
    { 
      id: 'date-calculator', 
      name: 'Date Calculator', 
      description: 'Calculate date differences and workdays', 
      icon: Calendar,
      path: '/tools/date-calculator'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Handy Tools</h1>
        <p className="text-muted-foreground">Productivity tools to make your work easier</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Card 
            key={tool.id}
            className="bg-card/40 backdrop-blur-md border border-white/10 hover:border-primary/50 transition"
          >
            <div className="p-6 flex flex-col items-center text-center cursor-pointer">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <tool.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">{tool.name}</h3>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tools;
