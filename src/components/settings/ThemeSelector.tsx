
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
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
  );
};

export default ThemeSelector;
