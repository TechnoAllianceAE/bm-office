
import React, { useState } from 'react';
import { Clock, Plus, Calendar, Filter, ChevronRight } from 'lucide-react';
import { Card } from '@/components/common/Card';

const Timesheet = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Get the current week dates
  const getCurrentWeekDates = () => {
    const currentDate = new Date(selectedDate);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    
    return days.map((_, index) => {
      const date = new Date(currentDate);
      date.setDate(diff + index);
      return date;
    });
  };
  
  const weekDates = getCurrentWeekDates();
  
  // Dummy timesheet entries data
  const timesheetEntries = [
    { project: 'Marketing Website', task: 'Design Updates', hours: 3.5, date: new Date() },
    { project: 'Marketing Website', task: 'Client Meeting', hours: 1, date: new Date() },
    { project: 'CRM Integration', task: 'API Development', hours: 4, date: new Date() },
    { project: 'Mobile App', task: 'UI Implementation', hours: 2.5, date: new Date(Date.now() - 86400000) },
    { project: 'Mobile App', task: 'Bug Fixes', hours: 1.5, date: new Date(Date.now() - 86400000) },
  ];
  
  // Group entries by date
  const groupedEntries = timesheetEntries.reduce((acc, entry) => {
    const dateKey = entry.date.toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(entry);
    return acc;
  }, {} as Record<string, typeof timesheetEntries>);
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div className="glass-card p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Timesheet</h1>
          <p className="text-muted-foreground">Track and manage your working hours</p>
        </div>
        
        <div className="flex gap-2">
          <button className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors rounded-lg px-4 py-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Calendar View</span>
          </button>
          <button className="bg-primary text-white hover:bg-primary/90 transition-colors rounded-lg px-4 py-2 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Log Time</span>
          </button>
        </div>
      </div>
      
      {/* Weekly view */}
      <Card>
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-medium">Weekly Overview</h2>
          <div className="flex gap-2">
            <button className="bg-secondary hover:bg-secondary/80 transition-colors rounded-lg px-3 py-1.5 text-sm flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>
            <button className="bg-secondary hover:bg-secondary/80 transition-colors rounded-lg px-3 py-1.5 text-sm">
              Previous Week
            </button>
            <button className="bg-secondary hover:bg-secondary/80 transition-colors rounded-lg px-3 py-1.5 text-sm">
              Next Week
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 divide-x border-b">
          {weekDates.map((date, index) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const dateKey = date.toDateString();
            const entriesForDay = groupedEntries[dateKey] || [];
            const totalHours = entriesForDay.reduce((sum, entry) => sum + entry.hours, 0);
            
            return (
              <div 
                key={index}
                className={`p-4 flex flex-col items-center ${isToday ? 'bg-primary/5' : ''}`}
              >
                <p className="text-sm text-muted-foreground">{days[index]}</p>
                <p className={`text-lg font-medium ${isToday ? 'text-primary' : ''}`}>
                  {date.getDate()}
                </p>
                <div className={`mt-2 px-3 py-1 rounded-full text-sm ${
                  isToday ? 'bg-primary text-white' : totalHours > 0 ? 'bg-secondary' : 'bg-secondary/50'
                }`}>
                  {totalHours > 0 ? `${totalHours}h` : 'No time'}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Recent Time Entries</h3>
            <button className="text-primary text-sm hover:underline flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-2">
            {timesheetEntries.slice(0, 5).map((entry, index) => (
              <div 
                key={index} 
                className="bg-secondary/30 rounded-lg p-4 flex justify-between items-center hover:bg-secondary/50 transition-colors cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex gap-3 items-center">
                  <div className="bg-primary/10 text-primary rounded-full p-2">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">{entry.project}</p>
                    <p className="text-sm text-muted-foreground">{entry.task}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="text-right">
                    <p className="font-medium">{entry.hours}h</p>
                    <p className="text-sm text-muted-foreground">
                      {entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      
      {/* Weekly statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-muted-foreground text-sm mb-1">This Week</div>
          <div className="text-3xl font-semibold">32.5h</div>
          <div className="flex items-center text-sm mt-2">
            <span className="text-green-500 font-medium">80%</span>
            <span className="ml-1 text-muted-foreground">of target (40h)</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 mt-4">
            <div className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out animate-slide-in" style={{ width: '80%' }} />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-muted-foreground text-sm mb-1">Previous Week</div>
          <div className="text-3xl font-semibold">38.0h</div>
          <div className="flex items-center text-sm mt-2">
            <span className="text-green-500 font-medium">95%</span>
            <span className="ml-1 text-muted-foreground">of target (40h)</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 mt-4">
            <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }} />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-muted-foreground text-sm mb-1">Most Time On</div>
          <div className="text-xl font-semibold mt-1">Marketing Website</div>
          <div className="text-muted-foreground text-sm mt-1">12.5 hours this week</div>
          <div className="w-full bg-secondary rounded-full h-2 mt-4">
            <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }} />
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="text-muted-foreground text-sm mb-1">Pending Approvals</div>
          <div className="text-3xl font-semibold">2</div>
          <div className="text-muted-foreground text-sm mt-2">Timesheets awaiting approval</div>
          <button className="text-primary text-sm mt-4 hover:underline">Review now</button>
        </Card>
      </div>
    </div>
  );
};

export default Timesheet;
