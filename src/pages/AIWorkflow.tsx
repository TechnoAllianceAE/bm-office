import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Plus, Save, Play, Download, Upload, Settings, 
  Clock, Mail, Globe, Database, MessageSquare, 
  ArrowRight, FileText, Image, BarChart, Mail as MailIcon,
  Webhook, ExternalLink, Search, Filter,
  Smartphone, BellRing, Share2, Copy, Check,
  Users, ChevronDown, X, Trash, ArrowUp, ArrowDown,
  RefreshCcw, RotateCw, Heart, MoreVertical, Folders,
  Link2, Link
} from 'lucide-react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Node type definition to properly type the nodes
type CustomNode = {
  id: string;
  type?: string;
  data: { 
    label: string;
    description?: string;
    icon?: React.ElementType;
    inputs?: string[];
    outputs?: string[];
    config?: Record<string, any>;
  };
  position: { x: number; y: number };
  style: { 
    background: string; 
    border: string; 
    borderRadius: string; 
    padding: string;
  };
};

type WorkflowData = {
  id: string;
  name: string;
  description: string;
  nodes: CustomNode[];
  edges: any[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  authorId: string;
  authorName: string;
};

// Custom node component
const CustomNode = ({ data }) => {
  const Icon = data.icon;
  
  return (
    <div className="custom-node">
      <div className="custom-node-header">
        {Icon && <Icon className="h-5 w-5" />}
        <div className="custom-node-title">{data.label}</div>
      </div>
      
      {data.description && (
        <div className="custom-node-description">{data.description}</div>
      )}
      
      {data.inputs && data.inputs.length > 0 && (
        <div className="custom-node-section">
          <div className="custom-node-section-title">Inputs</div>
          <div className="custom-node-ports">
            {data.inputs.map((input) => (
              <div key={input} className="custom-node-port">
                <div className="custom-node-port-dot input-dot" />
                <div className="custom-node-port-label">{input}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.outputs && data.outputs.length > 0 && (
        <div className="custom-node-section">
          <div className="custom-node-section-title">Outputs</div>
          <div className="custom-node-ports">
            {data.outputs.map((output) => (
              <div key={output} className="custom-node-port">
                <div className="custom-node-port-label">{output}</div>
                <div className="custom-node-port-dot output-dot" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

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
  { id: 'action-mail', name: 'Send Email', icon: MailIcon, description: 'Send automated emails' },
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
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
      type: nodeType,
      name: item.name,
      icon: item.icon.name,
      description: item.description
    }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div 
      className="p-2 rounded-md bg-white/60 dark:bg-gray-800/60 cursor-grab border border-white/30 hover:border-primary/40 transition-colors mb-2 flex items-center gap-2"
      draggable
      onDragStart={(e) => onDragStart(e, item.id)}
    >
      <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center text-primary">
        <item.icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <span className="text-sm font-medium">{item.name}</span>
        <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
      </div>
    </div>
  );
};

// Sample workflows
const sampleWorkflows: WorkflowData[] = [
  {
    id: '1',
    name: 'Document Processing',
    description: 'Automatically process and analyze documents using AI',
    nodes: [],
    edges: [],
    createdAt: '2023-07-15',
    updatedAt: '2023-07-15',
    isPublic: true,
    authorId: 'user-1',
    authorName: 'John Doe'
  },
  {
    id: '2',
    name: 'Customer Onboarding',
    description: 'Automated workflow for new customer onboarding',
    nodes: [],
    edges: [],
    createdAt: '2023-08-10',
    updatedAt: '2023-08-12',
    isPublic: false,
    authorId: 'user-1',
    authorName: 'John Doe'
  },
  {
    id: '3',
    name: 'Lead Generation',
    description: 'Capture and process new leads from website',
    nodes: [],
    edges: [],
    createdAt: '2023-09-05',
    updatedAt: '2023-09-05',
    isPublic: true,
    authorId: 'user-1',
    authorName: 'John Doe'
  }
];

// Sample node data
const initialNodes: CustomNode[] = [
  {
    id: '1',
    type: 'input',
    data: { 
      label: 'Webhook Trigger',
      icon: Webhook,
      description: 'Triggers when an HTTP request is received',
      outputs: ['payload']
    },
    position: { x: 250, y: 50 },
    style: { background: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ddd', borderRadius: '8px', padding: '0' }
  },
  {
    id: '2',
    data: { 
      label: 'AI Processing',
      icon: BarChart,
      description: 'Processes data using AI algorithms',
      inputs: ['data'],
      outputs: ['result', 'error']
    },
    position: { x: 250, y: 200 },
    style: { background: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ddd', borderRadius: '8px', padding: '0' }
  },
  {
    id: '3',
    type: 'output',
    data: { 
      label: 'Email Notification',
      icon: Mail,
      description: 'Sends an email notification',
      inputs: ['content', 'recipient']
    },
    position: { x: 250, y: 350 },
    style: { background: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ddd', borderRadius: '8px', padding: '0' }
  },
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    animated: true,
    label: 'Data', 
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  { 
    id: 'e2-3', 
    source: '2', 
    target: '3', 
    animated: true, 
    label: 'Result',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
];

const nodeTypes = {
  customNode: CustomNode
};

const AIWorkflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowData | null>(null);
  const [searchTriggers, setSearchTriggers] = useState('');
  const [searchActions, setSearchActions] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [myWorkflows, setMyWorkflows] = useState<WorkflowData[]>(sampleWorkflows);
  const [sharedWithMe, setSharedWithMe] = useState<WorkflowData[]>([]);
  const [activeTab, setActiveTab] = useState('editor');
  const isMobile = useIsMobile();
  
  const reactFlowWrapper = useRef(null);
  const { toast } = useToast();

  // Connect nodes when dropped
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({
      ...params,
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
    }, eds));
  }, [setEdges]);

  // Handle drag over event
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop event
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData('application/reactflow');
      
      if (!data) return;
      
      const parsedData = JSON.parse(data);
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      };

      const isInputType = parsedData.type.startsWith('trigger-');
      
      let inputs = [];
      let outputs = [];
      
      if (isInputType) {
        outputs = ['data'];
      } else {
        inputs = ['input'];
        outputs = ['output'];
      }

      const newNode = {
        id: `node-${Date.now()}`,
        type: isInputType ? 'input' : undefined,
        position,
        data: {
          label: parsedData.name,
          description: parsedData.description,
          icon: parsedData.icon, // Store icon name
          inputs: isInputType ? [] : inputs,
          outputs: isInputType ? outputs : outputs
        },
        style: {
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '0'
        }
      };

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

  const handleSaveWorkflow = () => {
    if (!workflowName) {
      toast({
        title: "Missing information",
        description: "Please provide a name for your workflow",
        variant: "destructive"
      });
      return;
    }
    
    const newWorkflow: WorkflowData = {
      id: selectedWorkflow ? selectedWorkflow.id : `workflow-${Date.now()}`,
      name: workflowName,
      description: workflowDescription,
      nodes: nodes,
      edges: edges,
      createdAt: selectedWorkflow ? selectedWorkflow.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: isPublic,
      authorId: 'current-user',
      authorName: 'Current User'
    };
    
    if (selectedWorkflow) {
      // Update existing workflow
      setMyWorkflows(myWorkflows.map(w => w.id === selectedWorkflow.id ? newWorkflow : w));
    } else {
      // Add new workflow
      setMyWorkflows([...myWorkflows, newWorkflow]);
    }
    
    setSelectedWorkflow(newWorkflow);
    setShowSaveDialog(false);
    
    toast({
      title: "Workflow saved",
      description: `"${workflowName}" has been saved successfully`
    });
  };

  const handleShareWorkflow = () => {
    // In a real app, this would create a real shareable link
    const shareableLink = `https://app.example.com/workflows/share/${selectedWorkflow?.id}`;
    setShareLink(shareableLink);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadWorkflow = (workflow: WorkflowData) => {
    setNodes(workflow.nodes);
    setEdges(workflow.edges);
    setSelectedWorkflow(workflow);
    setWorkflowName(workflow.name);
    setWorkflowDescription(workflow.description);
    setIsPublic(workflow.isPublic);
    setActiveTab('editor');
  };

  const handleNewWorkflow = () => {
    setNodes([]);
    setEdges([]);
    setSelectedWorkflow(null);
    setWorkflowName('');
    setWorkflowDescription('');
    setIsPublic(false);
  };

  const handleRunWorkflow = () => {
    toast({
      title: "Workflow running",
      description: "Your workflow is now running..."
    });
    
    // Simulate a workflow run
    setTimeout(() => {
      toast({
        title: "Workflow completed",
        description: "Your workflow has completed successfully",
        variant: "default"
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div>
          <h1 className="text-2xl font-semibold">AI Workflow Builder</h1>
          <p className="text-muted-foreground">Build, save, and share automated AI workflows</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="gap-1" onClick={() => handleNewWorkflow()}>
            <Plus className="h-4 w-4" />
            New
          </Button>
          
          <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Workflow</DialogTitle>
                <DialogDescription>
                  Give your workflow a name and description. You can also choose to make it public.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input 
                    id="name" 
                    value={workflowName} 
                    onChange={(e) => setWorkflowName(e.target.value)} 
                    placeholder="My Workflow"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Textarea 
                    id="description" 
                    value={workflowDescription} 
                    onChange={(e) => setWorkflowDescription(e.target.value)} 
                    placeholder="Describe what this workflow does..."
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="isPublic" 
                    checked={isPublic} 
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                  <label htmlFor="isPublic" className="text-sm">Make this workflow public</label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowSaveDialog(false)}>Cancel</Button>
                <Button onClick={handleSaveWorkflow}>Save Workflow</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-1" disabled={!selectedWorkflow}>
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share Workflow</DialogTitle>
                <DialogDescription>
                  Share your workflow with others by sending them this link.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {!shareLink ? (
                  <Button onClick={handleShareWorkflow} className="w-full">
                    <Link2 className="h-4 w-4 mr-2" />
                    Generate Shareable Link
                  </Button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Input value={shareLink} readOnly className="flex-1" />
                    <Button size="icon" onClick={handleCopyLink}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                )}
                
                <div className="border rounded-md p-3">
                  <h4 className="text-sm font-medium mb-2">Access Settings</h4>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="allowEditing" 
                    />
                    <label htmlFor="allowEditing" className="text-sm">Allow editing by others</label>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <input 
                      type="checkbox" 
                      id="requireLogin" 
                      checked 
                    />
                    <label htmlFor="requireLogin" className="text-sm">Require login to access</label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowShareDialog(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button onClick={handleRunWorkflow} disabled={nodes.length === 0}>
            <Play className="h-4 w-4 mr-1" />
            {!isMobile && "Run Workflow"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Panel - Workflows & Triggers */}
        <div className="lg:col-span-3">
          <Card className="page-content h-full">
            <Tabs defaultValue="workflows" className="w-full">
              <div className="overflow-x-auto">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="workflows" className="flex-1">My Workflows</TabsTrigger>
                  <TabsTrigger value="triggers" className="flex-1">Triggers</TabsTrigger>
                  <TabsTrigger value="actions" className="flex-1">Actions</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="workflows" className="p-4 overflow-y-auto max-h-[400px] md:max-h-[600px]">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium text-sm flex items-center gap-1">
                    <Folders className="h-4 w-4 text-primary" />
                    My Workflows
                  </h3>
                  <Button variant="ghost" size="sm" onClick={handleNewWorkflow}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 mb-6">
                  {myWorkflows.map((workflow) => (
                    <div 
                      key={workflow.id}
                      className={cn(
                        "p-2 rounded-md cursor-pointer border transition-colors",
                        selectedWorkflow?.id === workflow.id 
                          ? "bg-primary/10 border-primary/30"
                          : "hover:bg-muted/50 border-transparent"
                      )}
                      onClick={() => loadWorkflow(workflow)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{workflow.name}</span>
                        {workflow.isPublic && <Globe className="h-3 w-3 text-muted-foreground" />}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{workflow.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Updated {new Date(workflow.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h3 className="font-medium text-sm flex items-center gap-1 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  Shared With Me
                </h3>
                
                <div className="space-y-2">
                  {sharedWithMe.length > 0 ? (
                    sharedWithMe.map((workflow) => (
                      <div 
                        key={workflow.id}
                        className="p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                        onClick={() => loadWorkflow(workflow)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{workflow.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {workflow.authorName}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{workflow.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <Share2 className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No shared workflows yet</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="triggers" className="p-4 overflow-y-auto max-h-[400px] md:max-h-[600px]">
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
                
                <div className="space-y-1 overflow-y-auto max-h-[500px] pr-1">
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
              </TabsContent>
              
              <TabsContent value="actions" className="p-4 overflow-y-auto max-h-[400px] md:max-h-[600px]">
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
                
                <div className="space-y-1 overflow-y-auto max-h-[500px] pr-1">
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
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        {/* Middle Panel - Flow Editor */}
        <div className="lg:col-span-9">
          <Card className="page-content h-[400px] md:h-[600px]">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b gap-3">
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                  <TabsList className="bg-white/30">
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="testing">Testing</TabsTrigger>
                  </TabsList>
                  
                  {selectedWorkflow && (
                    <Badge className="ml-2 bg-white/50 text-foreground hover:bg-white/70 cursor-default">
                      {selectedWorkflow.name}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4 mr-1" />
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleNewWorkflow}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Workflow
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setShowSaveDialog(true)}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Workflow
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled={!selectedWorkflow} onClick={() => setShowShareDialog(true)}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Workflow
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Export Workflow
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Upload className="h-4 w-4 mr-2" />
                        Import Workflow
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete Workflow
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button 
                    onClick={handleRunWorkflow} 
                    size="sm" 
                    disabled={nodes.length === 0}
                    className="gap-1"
                  >
                    <Play className="h-4 w-4" />
                    {!isMobile && "Run Workflow"}
                  </Button>
                </div>
              </div>
              
              <TabsContent value="editor" className="h-[330px] sm:h-[470px] md:h-[530px] m-0">
                <div className="h-full w-full relative" ref={reactFlowWrapper}>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    nodeTypes={nodeTypes}
                    fitView
                  >
                    <Background color="#aaa" gap={16} />
                    <Controls />
                    {!isMobile && (
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
                    )}
                    <Panel position="top-right">
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm" className="bg-white/50">
                          <RefreshCcw className="h-4 w-4 mr-1" />
                          {!isMobile && "Auto Layout"}
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white/50">
                          <Settings className="h-4 w-4 mr-1" />
                          {!isMobile && "Flow Settings"}
                        </Button>
                      </div>
                    </Panel>
                  </ReactFlow>
                  
                  {nodes.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="text-center bg-white/80 p-4 md:p-6 rounded-lg shadow-sm mx-2">
                        <ArrowRight className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-2 md:mb-4 text-muted-foreground" />
                        <h3 className="text-base md:text-lg font-medium mb-1 md:mb-2">Start Building Your Workflow</h3>
                        <p className="text-sm md:text-base text-muted-foreground max-w-md">
                          Drag triggers and actions from the sidebar to create your workflow.
                          Connect nodes together to define your process flow.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="h-[330px] sm:h-[470px] md:h-[530px] overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/20 rounded-md">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Workflow Settings</h3>
                    <div className="space-y-2">
                      <div className="p-2 bg-white/30 rounded-md">
                        <div className="text-xs text-muted-foreground">Name</div>
                        <div>{selectedWorkflow?.name || "Untitled Workflow"}</div>
                      </div>
                      <div className="p-2 bg-white/30 rounded-md">
                        <div className="text-xs text-muted-foreground">Description</div>
                        <div>{selectedWorkflow?.description || "No description provided"}</div>
                      </div>
                      <div className="p-2 bg-white/30 rounded-md">
                        <div className="text-xs text-muted-foreground">Privacy</div>
                        <div>{selectedWorkflow?.isPublic ? "Public" : "Private"}</div>
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
              
              <TabsContent value="testing" className="h-[330px] sm:h-[470px] md:h-[530px] p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full p-4">
                  <div className="bg-white/20 p-4 rounded-md overflow-auto">
                    <h3 className="text-sm font-medium mb-2">Test Input</h3>
                    <pre className="p-2 bg-white/30 rounded-md h-[420px] overflow-auto whitespace-pre-wrap">
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
                    <pre className="p-2 bg-white/30 rounded-md h-[420px] overflow-auto whitespace-pre-wrap">
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
      
      {/* CSS for custom nodes */}
      <style>
        {`
        .custom-node {
          min-width: 150px;
          border-radius: 8px;
          font-size: 12px;
          color: #222;
          text-align: left;
          background: white;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .custom-node-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px;
          background: #f7f7f7;
          border-radius: 8px 8px 0 0;
          border-bottom: 1px solid #eee;
        }
        
        .custom-node-title {
          font-weight: 600;
          white-space: nowrap;
        }
        
        .custom-node-description {
          padding: 6px 10px;
          font-size: 10px;
          color: #666;
          border-bottom: 1px solid #eee;
        }
        
        .custom-node-section {
          padding: 6px 10px;
        }
        
        .custom-node-section-title {
          font-size: 10px;
          color: #888;
          margin-bottom: 4px;
        }
        
        .custom-node-ports {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .custom-node-port {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
        }
        
        .custom-node-port-label {
          white-space: nowrap;
        }
        
        .custom-node-port-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #8f8f8f;
        }
        
        .input-dot {
          background-color: #3498db;
        }
        
        .output-dot {
          background-color: #2ecc71;
        }
        
        @media (max-width: 768px) {
          .custom-node {
            min-width: 150px;
          }
          
          .custom-node-header {
            padding: 8px;
          }
          
          .custom-node-description {
            padding: 4px 8px;
          }
          
          .custom-node-section {
            padding: 4px 8px;
          }
        }
        `}
      </style>
    </div>
  );
};

export default AIWorkflow;
