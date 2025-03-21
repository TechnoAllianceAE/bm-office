
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import FlowEditor from './FlowEditor';
import SettingsPanel from './SettingsPanel';
import TestingPanel from './TestingPanel';
import { CustomNode } from './FlowEditor';
import { Edge } from '@xyflow/react';

interface WorkflowTabsProps {
  initialNodes: CustomNode[];
  initialEdges: Edge[];
  onDragOver: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
}

const WorkflowTabs = ({ 
  initialNodes, 
  initialEdges, 
  onDragOver, 
  onDrop 
}: WorkflowTabsProps) => {
  return (
    <Tabs defaultValue="editor">
      <div className="flex justify-between items-center mb-4">
        <TabsList className="bg-white/30">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>
        <Button className="gap-1" variant="outline">
          <Play className="h-4 w-4" />
          Run Workflow
        </Button>
      </div>
      
      <TabsContent value="editor" className="h-[500px] m-0">
        <FlowEditor 
          initialNodes={initialNodes} 
          initialEdges={initialEdges}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      </TabsContent>
      
      <TabsContent value="settings" className="h-[500px] overflow-auto">
        <SettingsPanel />
      </TabsContent>
      
      <TabsContent value="testing" className="h-[500px]">
        <TestingPanel />
      </TabsContent>
    </Tabs>
  );
};

export default WorkflowTabs;
