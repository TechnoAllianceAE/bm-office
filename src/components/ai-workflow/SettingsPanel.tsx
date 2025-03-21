
import React from 'react';

const SettingsPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/20 rounded-md">
      <div>
        <h3 className="text-sm font-medium mb-2">Workflow Settings</h3>
        <div className="space-y-2">
          <div className="p-2 bg-white/30 rounded-md">
            <div className="text-xs text-muted-foreground">Name</div>
            <div>Document Processing</div>
          </div>
          <div className="p-2 bg-white/30 rounded-md">
            <div className="text-xs text-muted-foreground">Description</div>
            <div>Process and analyze documents using AI</div>
          </div>
          <div className="p-2 bg-white/30 rounded-md">
            <div className="text-xs text-muted-foreground">Trigger Type</div>
            <div>Manual</div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Output Configuration</h3>
        <div className="space-y-2">
          <div className="p-2 bg-white/30 rounded-md">
            <div className="text-xs text-muted-foreground">Output Format</div>
            <div>JSON</div>
          </div>
          <div className="p-2 bg-white/30 rounded-md">
            <div className="text-xs text-muted-foreground">Destination</div>
            <div>API Endpoint</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
