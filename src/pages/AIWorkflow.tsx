
import React, { useState, useCallback } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Save, Play, Download, Upload, Settings } from 'lucide-react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Sample node data
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input' },
    position: { x: 250, y: 25 },
    style: { background: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }
  },
  {
    id: '2',
    data: { label: 'AI Processing' },
    position: { x: 250, y: 125 },
    style: { background: 'rgba(230, 230, 255, 0.8)', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output' },
    position: { x: 250, y: 225 },
    style: { background: 'rgba(230, 255, 230, 0.8)', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2-3', source: '2', target: '3', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
];

const AIWorkflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedWorkflow, setSelectedWorkflow] = useState('workflow1');

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const workflows = [
    { id: 'workflow1', name: 'Document Processing' },
    { id: 'workflow2', name: 'Image Analysis' },
    { id: 'workflow3', name: 'Data Extraction' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">AI Workflow Builder</h1>
          <p className="text-muted-foreground">Build and configure automated AI workflows</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="gap-1">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-1">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="page-content h-full p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Workflows</h3>
              <Button variant="ghost" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {workflows.map((workflow) => (
                <div 
                  key={workflow.id}
                  className={`p-2 rounded-md cursor-pointer ${selectedWorkflow === workflow.id ? 'bg-primary/10' : 'hover:bg-white/20'}`}
                  onClick={() => setSelectedWorkflow(workflow.id)}
                >
                  {workflow.name}
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-4">Components</h3>
              <div className="space-y-2">
                <div className="p-2 rounded-md bg-white/50 cursor-grab border border-white/30">
                  AI Text Generation
                </div>
                <div className="p-2 rounded-md bg-white/50 cursor-grab border border-white/30">
                  Data Transformation
                </div>
                <div className="p-2 rounded-md bg-white/50 cursor-grab border border-white/30">
                  API Connector
                </div>
                <div className="p-2 rounded-md bg-white/50 cursor-grab border border-white/30">
                  Decision Node
                </div>
                <div className="p-2 rounded-md bg-white/50 cursor-grab border border-white/30">
                  Trigger
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Card className="page-content h-[600px] p-4">
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
              </TabsContent>
              
              <TabsContent value="settings" className="h-[500px] overflow-auto">
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
              </TabsContent>
              
              <TabsContent value="testing" className="h-[500px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  <div className="bg-white/20 p-4 rounded-md overflow-auto">
                    <h3 className="text-sm font-medium mb-2">Test Input</h3>
                    <pre className="p-2 bg-white/30 rounded-md h-[400px] overflow-auto whitespace-pre-wrap">
                      {`{
  "document": {
    "type": "invoice",
    "content": "Sample content for workflow testing",
    "metadata": {
      "source": "upload",
      "date": "2023-07-15",
      "customer": "Acme Inc."
    }
  }
}`}
                    </pre>
                  </div>
                  <div className="bg-white/20 p-4 rounded-md overflow-auto">
                    <h3 className="text-sm font-medium mb-2">Test Output</h3>
                    <pre className="p-2 bg-white/30 rounded-md h-[400px] overflow-auto whitespace-pre-wrap">
                      {`{
  "results": {
    "extracted_data": {
      "invoice_number": "INV-2023-0042",
      "amount": 1250.00,
      "date": "2023-07-15",
      "customer": "Acme Inc."
    },
    "confidence_score": 0.92,
    "processing_time": "1.24s"
  },
  "status": "success"
}`}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIWorkflow;
