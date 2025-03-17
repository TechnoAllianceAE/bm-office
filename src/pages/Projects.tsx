
import React, { useState } from 'react';
import { Search, Plus, Filter, Calendar, Clock, Users, CheckCircle, Circle, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type ProjectStatus = 'active' | 'completed' | 'onHold';

type Project = {
  id: number;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  team: string[];
  description: string;
  tags: string[];
};

const ProjectItem: React.FC<{ project: Project }> = ({ project }) => {
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'onHold': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };
  
  const statusColor = getStatusColor(project.status);
  
  return (
    <Card className="bg-card/40 backdrop-blur-md border border-white/10 hover:border-primary/30 transition">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${statusColor} mr-2`}></div>
              <h3 className="text-lg font-semibold">{project.name}</h3>
            </div>
            <div className="text-sm text-muted-foreground mt-1">{project.client}</div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
        
        <p className="text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-secondary/40 backdrop-blur-sm">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{project.dueDate}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{project.team.length} Members</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const projects: Project[] = [
    {
      id: 1,
      name: 'Website Redesign',
      client: 'Acme Corporation',
      status: 'active',
      progress: 65,
      dueDate: 'Dec 15, 2023',
      team: ['John D.', 'Sarah L.', 'Michael B.'],
      description: 'Complete overhaul of the corporate website with focus on user experience and conversion optimization.',
      tags: ['Web', 'Design', 'UX']
    },
    {
      id: 2,
      name: 'Mobile App Development',
      client: 'TechStart Inc.',
      status: 'active',
      progress: 40,
      dueDate: 'Jan 30, 2024',
      team: ['Emma S.', 'David K.', 'Lisa T.', 'Marcus W.'],
      description: 'Developing a cross-platform mobile application for inventory management and order processing.',
      tags: ['Mobile', 'React Native', 'API']
    },
    {
      id: 3,
      name: 'Annual Marketing Campaign',
      client: 'Global Retail',
      status: 'active',
      progress: 85,
      dueDate: 'Dec 05, 2023',
      team: ['Robert J.', 'Anna P.'],
      description: 'Planning and execution of the annual holiday marketing campaign across multiple channels.',
      tags: ['Marketing', 'Strategy', 'Social Media']
    },
    {
      id: 4,
      name: 'Infrastructure Upgrade',
      client: 'FinServe Solutions',
      status: 'onHold',
      progress: 30,
      dueDate: 'Feb 28, 2024',
      team: ['Thomas R.', 'Julia M.', 'Christopher L.'],
      description: 'Modernizing the IT infrastructure with cloud migration and security enhancements.',
      tags: ['IT', 'Cloud', 'Security']
    },
    {
      id: 5,
      name: 'User Research Study',
      client: 'HealthCare Inc.',
      status: 'completed',
      progress: 100,
      dueDate: 'Oct 20, 2023',
      team: ['Sophie G.', 'Daniel T.'],
      description: 'Comprehensive user research study to gather insights for the upcoming product redesign.',
      tags: ['Research', 'UX', 'Analytics']
    },
    {
      id: 6,
      name: 'Brand Identity Refresh',
      client: 'Nexus Innovations',
      status: 'active',
      progress: 75,
      dueDate: 'Dec 22, 2023',
      team: ['Laura B.', 'Connor S.', 'Maria L.'],
      description: 'Refreshing the brand identity including logo, color palette, and brand guidelines.',
      tags: ['Branding', 'Design', 'Strategy']
    },
  ];
  
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const activeProjects = filteredProjects.filter(p => p.status === 'active');
  const completedProjects = filteredProjects.filter(p => p.status === 'completed');
  const onHoldProjects = filteredProjects.filter(p => p.status === 'onHold');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-muted-foreground">Manage and track your projects</p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects" 
            className="pl-9 bg-background/50 backdrop-blur-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-1">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6 bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="onHold">On Hold</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProjects.map(project => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedProjects.map(project => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="onHold">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {onHoldProjects.map(project => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;
