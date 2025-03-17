
import React from 'react';
import { BarChart3, Clock, Calendar, Users, FileText, LineChart, PieChart } from 'lucide-react';
import { DashboardWidget } from '@/components/dashboard/DashboardWidget';
import { WidgetGrid } from '@/components/dashboard/WidgetGrid';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { Card } from '@/components/common/Card';

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome header */}
      <div className="glass-card p-8 rounded-xl">
        <h1 className="text-3xl font-semibold mb-1">Welcome back, John</h1>
        <p className="text-muted-foreground">Here's what's happening today.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card className="p-4 flex flex-col items-center justify-center" animationDelay={100}>
            <p className="text-sm text-muted-foreground mb-1">Time Logged This Week</p>
            <div className="flex items-baseline">
              <AnimatedCounter value={32} className="text-2xl font-semibold" />
              <span className="text-sm text-muted-foreground ml-1">/ 40 hrs</span>
            </div>
          </Card>
          
          <Card className="p-4 flex flex-col items-center justify-center" animationDelay={200}>
            <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
            <AnimatedCounter value={7} className="text-2xl font-semibold" />
          </Card>
          
          <Card className="p-4 flex flex-col items-center justify-center" animationDelay={300}>
            <p className="text-sm text-muted-foreground mb-1">Pending Tasks</p>
            <AnimatedCounter value={12} className="text-2xl font-semibold" />
          </Card>
          
          <Card className="p-4 flex flex-col items-center justify-center" animationDelay={400}>
            <p className="text-sm text-muted-foreground mb-1">Upcoming Meetings</p>
            <AnimatedCounter value={3} className="text-2xl font-semibold" />
          </Card>
        </div>
      </div>
      
      {/* Widgets */}
      <WidgetGrid>
        <DashboardWidget 
          title="Recent Timesheets" 
          icon={<Clock className="w-4 h-4" />}
          animationDelay={100}
          footer={<div className="text-sm text-primary hover:underline cursor-pointer">View all timesheets</div>}
        >
          <div className="space-y-3">
            {['Design System Updates', 'Client Meeting', 'Frontend Development'].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item}</p>
                  <p className="text-sm text-muted-foreground">Today, 2:30 PM</p>
                </div>
                <div className="text-sm font-medium">1h 30m</div>
              </div>
            ))}
          </div>
        </DashboardWidget>
        
        <DashboardWidget 
          title="Upcoming Calendar" 
          icon={<Calendar className="w-4 h-4" />}
          animationDelay={200}
          footer={<div className="text-sm text-primary hover:underline cursor-pointer">View calendar</div>}
        >
          <div className="space-y-3">
            {[
              { title: 'Weekly Team Meeting', time: 'Today, 10:00 AM', duration: '1h' },
              { title: 'Project Review', time: 'Tomorrow, 2:00 PM', duration: '2h' },
              { title: 'Client Presentation', time: 'Thursday, 11:00 AM', duration: '1h 30m' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
                <div className="text-sm font-medium">{item.duration}</div>
              </div>
            ))}
          </div>
        </DashboardWidget>
        
        <DashboardWidget 
          title="Team Activity" 
          icon={<Users className="w-4 h-4" />}
          animationDelay={300}
          footer={<div className="text-sm text-primary hover:underline cursor-pointer">View all activity</div>}
        >
          <div className="space-y-3">
            {[
              { name: 'Alice Smith', action: 'completed a task', project: 'Design System' },
              { name: 'Bob Johnson', action: 'added a comment', project: 'Mobile App' },
              { name: 'Charlie Lee', action: 'updated status', project: 'Web Dashboard' },
            ].map((item, index) => (
              <div key={index} className="flex items-center py-2 border-b last:border-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                  {item.name[0]}
                </div>
                <div>
                  <p className="font-medium">{item.name} <span className="font-normal text-muted-foreground">{item.action}</span></p>
                  <p className="text-sm text-muted-foreground">in {item.project}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>
        
        <DashboardWidget 
          title="Project Status" 
          icon={<BarChart3 className="w-4 h-4" />}
          animationDelay={400}
        >
          <div className="space-y-4">
            {[
              { name: 'Website Redesign', progress: 75 },
              { name: 'Mobile Application', progress: 45 },
              { name: 'Marketing Campaign', progress: 90 },
            ].map((project, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{project.name}</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>
        
        <DashboardWidget 
          title="Announcements" 
          icon={<FileText className="w-4 h-4" />}
          animationDelay={500}
          footer={<div className="text-sm text-primary hover:underline cursor-pointer">View all announcements</div>}
        >
          <div className="space-y-4">
            {[
              { title: 'Office Closure', content: 'The office will be closed on Monday for the public holiday.' },
              { title: 'New HR Policy', content: 'Updated work from home policy is now available in the HR portal.' },
              { title: 'IT Maintenance', content: 'Scheduled maintenance on Saturday from 10PM to 2AM.' },
            ].map((item, index) => (
              <div key={index} className="border-b pb-3 last:border-0">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.content}</p>
              </div>
            ))}
          </div>
        </DashboardWidget>
        
        <DashboardWidget 
          title="Quick Links" 
          icon={<LineChart className="w-4 h-4" />}
          animationDelay={600}
        >
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Submit Timesheet', icon: Clock },
              { title: 'Request Leave', icon: Calendar },
              { title: 'IT Support', icon: PieChart },
              { title: 'HR Resources', icon: FileText },
            ].map((item, index) => (
              <button 
                key={index}
                className="p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors flex flex-col items-center justify-center gap-2 group"
              >
                <item.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            ))}
          </div>
        </DashboardWidget>
      </WidgetGrid>
    </div>
  );
};

export default Dashboard;
