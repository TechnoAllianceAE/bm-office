
import React, { useState, useCallback } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { 
  Plus, Save, Play, Download, Upload, Settings, 
  Clock, Mail, Globe, Database, MessageSquare, 
  ArrowRight, FileText, Image, BarChart, 
  Webhook, ExternalLink, Search, Filter,
  Smartphone, BellRing, Share2
} from 'lucide-react';
import { MarkerType, Edge } from '@xyflow/react';
import ItemsPanel from '@/components/ai-workflow/ItemsPanel';
import WorkflowTabs from '@/components/ai-workflow/WorkflowTabs';
import { CustomNode } from '@/components/ai-workflow/FlowEditor';

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
  { id: 'action-mail', name: 'Send Email', icon: Mail, description: 'Send automated emails' },
  { id: 'action-api', name: 'API Call', icon: ExternalLink, description: 'Make external API requests' },
  { id: 'action-database', name: 'Update Database', icon: Database, description: 'Insert or update database records' },
  { id: 'action-message', name: 'Send Message', icon: MessageSquare, description: 'Send messages to communication channels' },
  { id: 'action-document', name: 'Generate Document', icon: FileText, description: 'Create documents from templates' },
  { id: 'action-image', name: 'Process Image', icon: Image, description: 'Process and transform images' },
  { id: 'action-analytics', name: 'Record Analytics', icon: BarChart, description: 'Log events for analytics' },
  { id: 'action-share', name: 'Share Content', icon: Share2, description: 'Share content with external services' },
];

// Sample node data
const initialNodes: CustomNode[] = [
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

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2-3', source: '2', target: '3', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
];

const AIWorkflow = () => {
  const [searchTriggers, setSearchTriggers] = useState('');
  const [searchActions, setSearchActions] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState('workflow1');

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

      let newNode: CustomNode = {
        id: `node-${Date.now()}`,
        position: { x: newX, y: newY },
        data: { label: 'New Node' }, // Default label
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
        if (trigger) {
          newNode.type = 'input';
          newNode.data = { label: trigger.name };
          newNode.style.background = 'rgba(230, 242, 255, 0.8)'; // Light blue for triggers
        }
      } else if (type.startsWith('action-')) {
        const action = actions.find(a => a.id === type);
        if (action) {
          newNode.data = { label: action.name };
          newNode.style.background = 'rgba(230, 255, 238, 0.8)'; // Light green for actions
        }
      }

      // The actual node addition is handled in the FlowEditor component
    },
    []
  );

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
          <ItemsPanel
            title="Triggers"
            items={triggers}
            searchValue={searchTriggers}
            onSearchChange={setSearchTriggers}
          />
        </div>
        
        {/* Middle Panel - Flow Editor */}
        <div className="md:col-span-7">
          <Card className="page-content h-[600px] p-4">
            <WorkflowTabs
              initialNodes={initialNodes}
              initialEdges={initialEdges}
              onDragOver={onDragOver}
              onDrop={onDrop}
            />
          </Card>
        </div>
        
        {/* Right Panel - Actions */}
        <div className="md:col-span-2">
          <ItemsPanel
            title="Actions"
            items={actions}
            searchValue={searchActions}
            onSearchChange={setSearchActions}
          />
        </div>
      </div>
    </div>
  );
};

export default AIWorkflow;
