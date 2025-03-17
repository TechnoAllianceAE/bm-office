
import React from 'react';
import { Search, Plus, Filter, BarChart3, Users, Clock, Calendar, ChevronRight } from 'lucide-react';
import { Card } from '@/components/common/Card';

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    client: 'Acme Corp',
    progress: 75,
    status: 'In Progress',
    team: 5,
    dueDate: '2023-12-15',
    description: 'Complete overhaul of the corporate website with new design system.',
  },
  {
    id: 2,
    name: 'Mobile Application',
    client: 'Global Tech',
    progress: 45,
    status: 'In Progress',
    team: 8,
    dueDate: '2024-01-30',
    description: 'Cross-platform mobile application for customer engagement.',
  },
  {
    id: 3,
    name: 'CRM Integration',
    client: 'InnoSystems',
    progress: 90,
    status: 'Nearly Complete',
    team: 3,
    dueDate: '2023-11-25',
    description: 'Integration of new CRM system with existing infrastructure.',
  },
  {
    id: 4,
    name: 'Marketing Campaign',
    client: 'StyleBrands',
    progress: 20,
    status: 'Just Started',
    team: 4,
    dueDate: '2024-02-28',
    description: 'Q1 marketing campaign for new product launches.',
  },
];

const Projects = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div className="glass-card p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Projects</h1>
          <p className="text-muted-foreground">Track and manage your ongoing projects</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input 
              type="search" 
              placeholder="Search projects..." 
              className="pl-9 pr-4 py-2 w-full bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" 
            />
          </div>
          <button className="bg-secondary hover:bg-secondary/80 transition-colors rounded-lg px-4 py-2 flex items-center gap-1">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="bg-primary text-white hover:bg-primary/90 transition-colors rounded-lg px-4 py-2 flex items-center gap-1">
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 flex items-center gap-4">
          <div className="bg-primary/10 text-primary rounded-full p-3">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted-foreground text-sm">Active Projects</div>
            <div className="text-2xl font-semibold">{projects.length}</div>
          </div>
        </Card>
        
        <Card className="p-6 flex items-center gap-4">
          <div className="bg-green-100 text-green-600 rounded-full p-3">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted-foreground text-sm">Team Members</div>
            <div className="text-2xl font-semibold">15</div>
          </div>
        </Card>
        
        <Card className="p-6 flex items-center gap-4">
          <div className="bg-amber-100 text-amber-600 rounded-full p-3">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted-foreground text-sm">Hours Logged</div>
            <div className="text-2xl font-semibold">246</div>
          </div>
        </Card>
        
        <Card className="p-6 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted-foreground text-sm">Upcoming Deadlines</div>
            <div className="text-2xl font-semibold">3</div>
          </div>
        </Card>
      </div>
      
      {/* Projects list */}
      <Card>
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-medium">Active Projects</h2>
          <button className="text-primary text-sm hover:underline flex items-center">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="divide-y">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="p-6 hover:bg-secondary/30 transition-colors cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{project.name}</h3>
                    <div className={`px-2 py-0.5 rounded-full text-xs ${
                      project.progress > 75 ? 'bg-green-100 text-green-800' :
                      project.progress > 25 ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{project.team} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Due {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div>Client: {project.client}</div>
                  </div>
                </div>
                
                <div className="w-full md:w-64">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                        project.progress > 75 ? 'bg-green-500' :
                        project.progress > 25 ? 'bg-amber-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Recent activity */}
      <Card>
        <div className="p-4 border-b">
          <h2 className="font-medium">Recent Project Activity</h2>
        </div>
        
        <div className="p-6 space-y-4">
          {[
            { user: 'Alice Smith', action: 'completed task "Update homepage design"', project: 'Website Redesign', time: '2 hours ago' },
            { user: 'Bob Johnson', action: 'added comment on "API Integration"', project: 'CRM Integration', time: '3 hours ago' },
            { user: 'Charlie Lee', action: 'updated deadline for "User Testing"', project: 'Mobile Application', time: '5 hours ago' },
            { user: 'Diana Wang', action: 'created new task "Social Media Assets"', project: 'Marketing Campaign', time: 'Yesterday' },
            { user: 'Ethan Brown', action: 'added team member "Frank Miller"', project: 'Website Redesign', time: 'Yesterday' },
          ].map((activity, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0 animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                {activity.user[0]}
              </div>
              <div>
                <p>
                  <span className="font-medium">{activity.user}</span>{' '}
                  <span className="text-muted-foreground">{activity.action}</span>
                </p>
                <p className="text-sm">
                  <span className="text-primary">{activity.project}</span>
                  <span className="text-muted-foreground"> • {activity.time}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Projects;
