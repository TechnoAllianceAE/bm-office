
import React, { useState } from 'react';
import { Link2, QrCode, Image, FileText, Calculator, Globe, Clipboard, Calendar, FormInput } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { CalculatorTool } from '@/components/tools/CalculatorTool';
import { CurrencyConverter } from '@/components/tools/CurrencyConverter';
import { SurveyCreator } from '@/components/tools/SurveyCreator';

type Tool = {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  path: string | null;
  component?: React.ReactNode;
};

const Tools = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  
  const tools: Tool[] = [
    { 
      id: 'calculator', 
      name: 'Advanced Calculator', 
      description: 'Perform complex calculations', 
      icon: Calculator,
      path: null,
      component: <CalculatorTool />
    },
    { 
      id: 'currency', 
      name: 'Currency Converter', 
      description: 'Convert between different currencies', 
      icon: Globe,
      path: null,
      component: <CurrencyConverter />
    },
    { 
      id: 'survey', 
      name: 'Survey Creator', 
      description: 'Create and share surveys and forms', 
      icon: FormInput,
      path: null,
      component: <SurveyCreator />
    },
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

  const handleToolClick = (id: string) => {
    setActiveToolId(id === activeToolId ? null : id);
  };

  const activeTool = tools.find(tool => tool.id === activeToolId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Utilities</h1>
        <p className="text-muted-foreground">Productivity tools to make your work easier</p>
      </div>

      {activeTool && activeTool.component ? (
        <div className="glassmorphic-container p-6">
          <div className="mb-4 flex items-center">
            <button 
              onClick={() => setActiveToolId(null)}
              className="mr-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="flex items-center">
              <span className="text-xl mr-3"><activeTool.icon className="h-6 w-6" /></span>
              <h2 className="text-xl font-medium">{activeTool.name}</h2>
            </div>
          </div>
          <div>
            {activeTool.component}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Card 
              key={tool.id}
              className="glassmorphic-card hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => handleToolClick(tool.id)}
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <tool.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">{tool.name}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tools;
