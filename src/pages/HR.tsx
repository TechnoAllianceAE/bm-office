import React, { useState } from 'react';
import { FileText, Calendar, User, Users, Clock, BarChart3, Plus } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { NewHRRequestForm } from '@/components/hr/NewHRRequestForm';

const HR = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleNewRequest = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div className="glass-card p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">HR Portal</h1>
          <p className="text-muted-foreground">Manage your HR tasks and requests</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-secondary hover:bg-secondary/80 transition-colors rounded-lg px-4 py-2 flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>Policies</span>
          </button>
          <button 
            className="bg-primary text-white hover:bg-primary/90 transition-colors rounded-lg px-4 py-2 flex items-center gap-1"
            onClick={handleNewRequest}
          >
            <Plus className="w-4 h-4" />
            <span>New Request</span>
          </button>
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl bg-white/95 backdrop-blur-md">
          <NewHRRequestForm onClose={handleCloseForm} />
        </DialogContent>
      </Dialog>
      
      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { title: 'Request Leave', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
          { title: 'Update Profile', icon: User, color: 'bg-purple-100 text-purple-600' },
          { title: 'Training', icon: Users, color: 'bg-amber-100 text-amber-600' },
          { title: 'Benefits', icon: BarChart3, color: 'bg-emerald-100 text-emerald-600' },
        ].map((action, index) => (
          <Card 
            key={index} 
            className="p-6 cursor-pointer hover:shadow-md transition-shadow animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col items-center md:flex-row md:items-center gap-4">
              <div className={`${action.color} rounded-full p-3`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="text-center md:text-left">
                <div className="font-medium">{action.title}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Leave balance */}
      <Card>
        <div className="p-4 border-b">
          <h2 className="font-medium">Your Leave Balance</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Annual Leave', used: 10, total: 25, color: 'bg-blue-500' },
              { label: 'Sick Leave', used: 3, total: 10, color: 'bg-amber-500' },
              { label: 'Personal Days', used: 1, total: 5, color: 'bg-purple-500' },
            ].map((leave, index) => {
              const percentage = (leave.used / leave.total) * 100;
              return (
                <div key={index} className="space-y-2 animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{leave.label}</div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{leave.total - leave.used}</span> remaining
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{leave.used} used</span>
                    <span>{leave.total} total</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`${leave.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      
      {/* Upcoming events and announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-4 border-b">
            <h2 className="font-medium">Upcoming Company Events</h2>
          </div>
          
          <div className="p-6 space-y-4">
            {[
              { title: 'Quarterly Town Hall', date: 'Nov 15, 2023', time: '10:00 AM', location: 'Main Conference Room' },
              { title: 'Holiday Party', date: 'Dec 20, 2023', time: '6:00 PM', location: 'Grand Ballroom, Marriott Hotel' },
              { title: 'Team Building Day', date: 'Jan 12, 2024', time: '9:00 AM', location: 'Adventure Park' },
            ].map((event, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0 animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-primary/10 text-primary rounded-lg p-2 text-center min-w-[60px]">
                  <div className="text-sm font-medium">{event.date.split(',')[0]}</div>
                </div>
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.time} • {event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card>
          <div className="p-4 border-b">
            <h2 className="font-medium">HR Announcements</h2>
          </div>
          
          <div className="p-6 space-y-4">
            {[
              { title: 'Updated Remote Work Policy', date: 'October 28, 2023', description: 'New guidelines for flexible work arrangements are now available.' },
              { title: 'Annual Performance Reviews', date: 'October 15, 2023', description: 'Schedule for year-end reviews has been published. Please check your calendar.' },
              { title: 'New Benefits Enrollment', date: 'October 1, 2023', description: 'Open enrollment for 2024 benefits is now available through November 15.' },
            ].map((announcement, index) => (
              <div 
                key={index} 
                className="pb-4 border-b last:border-0 last:pb-0 animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-medium">{announcement.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{announcement.date}</p>
                <p className="text-sm">{announcement.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Wellness resources */}
      <Card>
        <div className="p-4 border-b">
          <h2 className="font-medium">Employee Wellness Resources</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Mental Health Support', description: 'Access to counseling and mental health resources.', icon: User },
              { title: 'Fitness Program', description: 'Gym membership discounts and wellness challenges.', icon: Users },
              { title: 'Work-Life Balance', description: 'Resources for maintaining a healthy balance.', icon: Clock },
            ].map((resource, index) => (
              <div 
                key={index} 
                className="p-5 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/80 shadow-sm text-primary rounded-full p-3 mb-4">
                    <resource.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                  <button className="mt-4 text-primary text-sm hover:underline">Learn more</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HR;
