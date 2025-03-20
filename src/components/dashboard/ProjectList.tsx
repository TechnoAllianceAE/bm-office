
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Project {
  name: string;
  progress: number;
  status: 'ongoing' | 'completed' | 'pending' | 'risk';
  dueDate: string;
  team: {
    name: string;
    avatar?: string;
  }[];
}

const projects: Project[] = [
  {
    name: 'Website Redesign',
    progress: 75,
    status: 'ongoing',
    dueDate: 'Sep 30, 2023',
    team: [
      { name: 'Alex', avatar: 'https://github.com/shadcn.png' },
      { name: 'Maria', avatar: 'https://i.pravatar.cc/150?img=2' },
      { name: 'John', avatar: 'https://i.pravatar.cc/150?img=3' },
    ],
  },
  {
    name: 'Mobile App Development',
    progress: 45,
    status: 'risk',
    dueDate: 'Oct 15, 2023',
    team: [
      { name: 'David', avatar: 'https://i.pravatar.cc/150?img=4' },
      { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=5' },
    ],
  },
  {
    name: 'Marketing Campaign',
    progress: 90,
    status: 'ongoing',
    dueDate: 'Sep 22, 2023',
    team: [
      { name: 'James', avatar: 'https://i.pravatar.cc/150?img=6' },
      { name: 'Emily', avatar: 'https://i.pravatar.cc/150?img=7' },
      { name: 'Michael', avatar: 'https://i.pravatar.cc/150?img=8' },
      { name: 'Emma', avatar: 'https://i.pravatar.cc/150?img=9' },
    ],
  },
  {
    name: 'Product Launch',
    progress: 100,
    status: 'completed',
    dueDate: 'Sep 10, 2023',
    team: [
      { name: 'William', avatar: 'https://i.pravatar.cc/150?img=10' },
      { name: 'Olivia', avatar: 'https://i.pravatar.cc/150?img=11' },
    ],
  },
];

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'ongoing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'pending':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    case 'risk':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

const ProjectList = () => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm border dark:bg-gray-900/50">
      <CardHeader className="pb-3">
        <CardTitle>Active Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div 
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 rounded-lg border bg-card hover:shadow-sm transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">Due {project.dueDate}</p>
                </div>
                <Badge className={cn("font-normal", getStatusColor(project.status))}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {project.team.slice(0, 3).map((member, i) => (
                    <Avatar key={i} className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {project.team.length > 3 && (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                      +{project.team.length - 3}
                    </div>
                  )}
                </div>
                
                <button className="text-sm text-primary hover:underline">
                  View details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectList;
