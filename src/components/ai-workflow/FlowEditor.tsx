
import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  Panel,
  MarkerType,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type CustomNode = {
  id: string;
  type?: string;
  data: { label: string };
  position: { x: number; y: number };
  style: { 
    background: string; 
    border: string; 
    borderRadius: string; 
    padding: string;
  };
};

interface FlowEditorProps {
  initialNodes: CustomNode[];
  initialEdges: Edge[];
  onNodesChange?: OnNodesChange;
  onEdgesChange?: OnEdgesChange;
  onConnect?: OnConnect;
  onDragOver: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
}

const FlowEditor = ({
  initialNodes,
  initialEdges,
  onDragOver,
  onDrop
}: FlowEditorProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-full w-full" onDragOver={onDragOver} onDrop={onDrop}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'output') return '#ff0072';
            return '#1a192b';
          }}
          nodeColor={(n) => {
            if (n.type === 'input') return 'rgba(200, 220, 255, 0.8)';
            if (n.type === 'output') return 'rgba(255, 200, 200, 0.8)';
            return 'rgba(225, 225, 225, 0.8)';
          }}
        />
        <Panel position="top-right">
          <Button variant="outline" size="sm" className="bg-white/50">
            <Settings className="h-4 w-4 mr-1" />
            Flow Settings
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
