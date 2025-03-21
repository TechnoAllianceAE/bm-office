
import React from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSelector = () => {
  return (
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
  );
};

export default LanguageSelector;
