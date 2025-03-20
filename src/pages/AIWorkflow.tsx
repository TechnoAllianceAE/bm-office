
import React, { useState, useCallback } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, Save, Play, Download, Upload, Settings, 
  Clock, Mail, Globe, Database, MessageSquare, 
  ArrowRight, FileText, Image, BarChart, Envelope,
  Webhook, ExternalLink, Search, Filter,
  Smartphone, BellRing, Share2
} from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Sample node data
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Webhook Trigger' },
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
    data: { label: 'Email Notification' },
    position: { x: 250, y: 225 },
    style: { background: 'rgba(230, 255, 230, 0.8)', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2-3', source: '2', target: '3', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
];

// Define trigger components
const triggers = [
  { id: 'trigger-time', name: 'Time Schedule', icon: Clock, description: 'Trigger workflows on a time schedule' },
  { id: 'trigger-mail', name: 'Email Received', icon: Mail, description: 'Trigger when an email is received' },
  { id: 'trigger-webhook', name: 'Webhook', icon: Webhook, description: 'HTTP webhook endpoint to trigger workflows' },
  { id: 'trigger-api', name: 'API Request', icon: Globe, description: 'Trigger from external API calls' },
  { id: 'trigger-database', name: 'Database Change', icon: Database, description: 'Trigger when database records change' },
  { id: 'trigger-mobile', name: 'Mobile Event', icon: Smartphone, description: 'Trigger from mobile app events' },
  { id: 'trigger-notification', name: 'Notification', icon: BellRing, description: 'Trigger from system notifications' },
];

// Define action components
const actions = [
  { id: 'action-mail', name: 'Send Email', icon: Envelope, description: 'Send automated emails' },
  { id: 'action-api', name: 'API Call', icon: ExternalLink, description: 'Make external API requests' },
  { id: 'action-database', name: 'Update Database', icon: Database, description: 'Insert or update database records' },
  { id: 'action-message', name: 'Send Message', icon: MessageSquare, description: 'Send messages to communication channels' },
  { id: 'action-document', name: 'Generate Document', icon: FileText, description: 'Create documents from templates' },
  { id: 'action-image', name: 'Process Image', icon: Image, description: 'Process and transform images' },
  { id: 'action-analytics', name: 'Record Analytics', icon: BarChart, description: 'Log events for analytics' },
  { id: 'action-share', name: 'Share Content', icon: Share2, description: 'Share content with external services' },
];

// Component for draggable items in the triggers/actions panel
const DraggableItem = ({ item }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div 
      className="p-2 rounded-md bg-white/50 dark:bg-gray-800/50 cursor-grab border border-white/30 hover:border-primary/30 transition-colors mb-2 flex items-center gap-2"
      draggable
      onDragStart={(e) => onDragStart(e, item.id)}
    >
      <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center text-primary">
        <item.icon className="h-3.5 w-3.5" />
      </div>
      <span className="text-sm">{item.name}</span>
    </div>
  );
};

const AIWorkflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedWorkflow, setSelectedWorkflow] = useState('workflow1');
  const [searchTriggers, setSearchTriggers] = useState('');
  const [searchActions, setSearchActions] = useState('');

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      
      if (!type) return;

      const position = { x: event.clientX, y: event.clientY };
      const reactFlowBounds = document.querySelector('.react-flow').getBoundingClientRect();
      
      // Calculate the position of the new node
      const newX = position.x - reactFlowBounds.left;
      const newY = position.y - reactFlowBounds.top;

      let newNode = {
        id: `node-${Date.now()}`,
        position: { x: newX, y: newY },
        style: { 
          background: 'rgba(255, 255, 255, 0.8)', 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '10px' 
        },
      };

      // Configure the node based on its type
      if (type.startsWith('trigger-')) {
        const trigger = triggers.find(t => t.id === type);
        newNode.type = 'input';
        newNode.data = { label: trigger.name };
        newNode.style.background = 'rgba(230, 242, 255, 0.8)'; // Light blue for triggers
      } else if (type.startsWith('action-')) {
        const action = actions.find(a => a.id === type);
        newNode.data = { label: action.name };
        newNode.style.background = 'rgba(230, 255, 238, 0.8)'; // Light green for actions
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const filteredTriggers = triggers.filter(trigger => 
    trigger.name.toLowerCase().includes(searchTriggers.toLowerCase())
  );
  
  const filteredActions = actions.filter(action => 
    action.name.toLowerCase().includes(searchActions.toLowerCase())
  );

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

      <div className="grid grid-cols-1 md:grid-cols-11 gap-4">
        {/* Left Panel - Triggers */}
        <div className="md:col-span-2">
          <Card className="page-content h-full p-4">
            <div className="mb-3">
              <h3 className="font-medium flex items-center gap-1 mb-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                Triggers
              </h3>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search triggers..." 
                  className="pl-8 text-sm"
                  value={searchTriggers}
                  onChange={(e) => setSearchTriggers(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-1 overflow-y-auto max-h-[600px] pr-1">
              {filteredTriggers.map((trigger) => (
                <div key={trigger.id} className="mb-2">
                  <DraggableItem item={trigger} />
                </div>
              ))}
              {filteredTriggers.length === 0 && (
                <div className="text-center p-4 text-muted-foreground text-sm">
                  No triggers match your search
                </div>
              )}
            </div>
          </Card>
        </div>
        
        {/* Middle Panel - Flow Editor */}
        <div className="md:col-span-7">
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
        
        {/* Right Panel - Actions */}
        <div className="md:col-span-2">
          <Card className="page-content h-full p-4">
            <div className="mb-3">
              <h3 className="font-medium flex items-center gap-1 mb-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                Actions
              </h3>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search actions..." 
                  className="pl-8 text-sm"
                  value={searchActions}
                  onChange={(e) => setSearchActions(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-1 overflow-y-auto max-h-[600px] pr-1">
              {filteredActions.map((action) => (
                <div key={action.id} className="mb-2">
                  <DraggableItem item={action} />
                </div>
              ))}
              {filteredActions.length === 0 && (
                <div className="text-center p-4 text-muted-foreground text-sm">
                  No actions match your search
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIWorkflow;
