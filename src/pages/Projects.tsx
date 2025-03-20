
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Plus, Filter, ArrowUpDown, Users, MessageSquare, FileText, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  progress: number;
  status: 'active' | 'completed' | 'on-hold' | 'cancelled';
  team: {
    name: string;
    role: string;
    avatar?: string;
  }[];
  startDate: string;
  dueDate: string;
  budget: string;
  tasks: number;
  completedTasks: number;
}

const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with new design system',
    client: 'Acme Inc.',
    progress: 75,
    status: 'active',
    team: [
      { name: 'Alex Johnson', role: 'Lead Designer', avatar: 'https://i.pravatar.cc/150?img=1' },
      { name: 'Maria Garcia', role: 'Frontend Developer', avatar: 'https://i.pravatar.cc/150?img=2' },
      { name: 'John Smith', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=3' },
    ],
    startDate: 'Aug 15, 2023',
    dueDate: 'Sep 30, 2023',
    budget: '$12,000',
    tasks: 36,
    completedTasks: 27,
  },
  {
    id: 'proj-2',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application for inventory management',
    client: 'TechCorp',
    progress: 45,
    status: 'active',
    team: [
      { name: 'David Lee', role: 'iOS Developer', avatar: 'https://i.pravatar.cc/150?img=4' },
      { name: 'Sarah Williams', role: 'Android Developer', avatar: 'https://i.pravatar.cc/150?img=5' },
    ],
    startDate: 'Sep 1, 2023',
    dueDate: 'Oct 15, 2023',
    budget: '$24,000',
    tasks: 42,
    completedTasks: 19,
  },
  {
    id: 'proj-3',
    name: 'Marketing Campaign',
    description: 'Q4 digital marketing campaign for product launch',
    client: 'GlobalBrand',
    progress: 90,
    status: 'active',
    team: [
      { name: 'James Wilson', role: 'Marketing Specialist', avatar: 'https://i.pravatar.cc/150?img=6' },
      { name: 'Emily Davies', role: 'Content Creator', avatar: 'https://i.pravatar.cc/150?img=7' },
      { name: 'Michael Brown', role: 'SEO Expert', avatar: 'https://i.pravatar.cc/150?img=8' },
      { name: 'Emma Taylor', role: 'Social Media Manager', avatar: 'https://i.pravatar.cc/150?img=9' },
    ],
    startDate: 'Aug 20, 2023',
    dueDate: 'Sep 22, 2023',
    budget: '$18,500',
    tasks: 28,
    completedTasks: 25,
  },
  {
    id: 'proj-4',
    name: 'Product Launch',
    description: 'New software product launch campaign',
    client: 'InnovateSoft',
    progress: 100,
    status: 'completed',
    team: [
      { name: 'William Jones', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?img=10' },
      { name: 'Olivia Martin', role: 'Marketing Director', avatar: 'https://i.pravatar.cc/150?img=11' },
    ],
    startDate: 'Jul 15, 2023',
    dueDate: 'Sep 10, 2023',
    budget: '$32,000',
    tasks: 54,
    completedTasks: 54,
  },
];

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
    case 'completed':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'on-hold':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

const Projects = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Manage and track your project portfolio</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-9" />
            </div>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            
            <Button asChild>
              <Link to="/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Button variant="outline" asChild className="justify-start h-auto py-3 px-4">
            <Link to="/projects/new" className="flex items-start">
              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary mr-3">
                <Plus className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">New Project</h3>
                <p className="text-xs text-muted-foreground">Create a new project</p>
              </div>
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="justify-start h-auto py-3 px-4">
            <Link to="/timesheet/approve" className="flex items-start">
              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary mr-3">
                <FileText className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Approve Timesheets</h3>
                <p className="text-xs text-muted-foreground">Review and approve timesheets</p>
              </div>
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="justify-start h-auto py-3 px-4">
            <Link to="/projects/organization" className="flex items-start">
              <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary mr-3">
                <Building className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h3 className="font-medium">Organization</h3>
                <p className="text-xs text-muted-foreground">Manage project organization</p>
              </div>
            </Link>
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="on-hold">On Hold</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:border-primary/20 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-xl font-semibold">{project.name}</h3>
                          <Badge className={cn("font-normal", getStatusColor(project.status))}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                          <div>
                            <span className="text-xs text-muted-foreground block">Client</span>
                            <span className="text-sm font-medium">{project.client}</span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block">Timeline</span>
                            <span className="text-sm font-medium">{project.startDate} - {project.dueDate}</span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block">Budget</span>
                            <span className="text-sm font-medium">{project.budget}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="flex items-center gap-1 text-sm">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>
                              <span className="font-medium">{project.completedTasks}</span>
                              <span className="text-muted-foreground">/{project.tasks} tasks</span>
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-sm">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span>
                              <span className="font-medium">24</span>
                              <span className="text-muted-foreground"> comments</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="lg:w-60 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2 flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            Team Members
                          </h4>
                          <div className="space-y-2">
                            {project.team.map((member, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={member.avatar} alt={member.name} />
                                  <AvatarFallback className="text-xs">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium leading-none">{member.name}</p>
                                  <p className="text-xs text-muted-foreground">{member.role}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline" className="justify-start">
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" className="justify-start">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Team Chat
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
          
          <TabsContent value="active">
            <div className="grid place-items-center py-12">
              <div className="text-center max-w-md">
                <h3 className="text-lg font-medium mb-2">Active Projects View</h3>
                <p className="text-muted-foreground">
                  This tab will display only active projects. The functionality is similar to the "All Projects" tab but filtered to show active projects only.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="grid place-items-center py-12">
              <div className="text-center max-w-md">
                <h3 className="text-lg font-medium mb-2">Completed Projects View</h3>
                <p className="text-muted-foreground">
                  This tab will display only completed projects. The functionality is similar to the "All Projects" tab but filtered to show completed projects only.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="on-hold">
            <div className="grid place-items-center py-12">
              <div className="text-center max-w-md">
                <h3 className="text-lg font-medium mb-2">On Hold Projects View</h3>
                <p className="text-muted-foreground">
                  This tab will display only on-hold projects. The functionality is similar to the "All Projects" tab but filtered to show on-hold projects only.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Projects;
