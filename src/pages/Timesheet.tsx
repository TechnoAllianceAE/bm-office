
import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, Plus, Filter, Download } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample project data
const projects = [
  { id: 1, name: 'Website Redesign', client: 'Acme Corp', color: 'bg-blue-500' },
  { id: 2, name: 'Mobile App Development', client: 'TechStart', color: 'bg-green-500' },
  { id: 3, name: 'Marketing Campaign', client: 'Global Retail', color: 'bg-purple-500' },
  { id: 4, name: 'Infrastructure Upgrade', client: 'FinServe', color: 'bg-amber-500' },
  { id: 5, name: 'User Research', client: 'HealthCare Inc', color: 'bg-pink-500' },
];

// Sample timesheet entries
const timesheetEntries = [
  { id: 1, date: '2023-11-20', project: 1, hours: 3.5, notes: 'Homepage wireframes' },
  { id: 2, date: '2023-11-20', project: 3, hours: 2, notes: 'Content strategy' },
  { id: 3, date: '2023-11-20', project: 5, hours: 1.5, notes: 'User interviews' },
  { id: 4, date: '2023-11-21', project: 1, hours: 4, notes: 'Design implementation' },
  { id: 5, date: '2023-11-21', project: 2, hours: 3, notes: 'API development' },
  { id: 6, date: '2023-11-22', project: 4, hours: 6, notes: 'Server configuration' },
  { id: 7, date: '2023-11-22', project: 3, hours: 2, notes: 'Campaign analytics' },
  { id: 8, date: '2023-11-23', project: 2, hours: 5, notes: 'Frontend development' },
  { id: 9, date: '2023-11-24', project: 5, hours: 4, notes: 'Analysis and reporting' },
  { id: 10, date: '2023-11-24', project: 1, hours: 3, notes: 'Client feedback review' },
];

const Timesheet = () => {
  const [currentWeek, setCurrentWeek] = useState('Nov 20 - Nov 26, 2023');
  
  // Generate days of the week
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = ['20', '21', '22', '23', '24', '25', '26'];

  const getProjectById = (id: number) => projects.find(project => project.id === id);

  const totalHours = timesheetEntries.reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Timesheet</h1>
          <p className="text-muted-foreground">Track and manage your working hours</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => {}}>
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => {}}>
            <Download className="h-4 w-4" />
          </Button>
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>

      <Tabs defaultValue="week">
        <TabsList className="mb-6 bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="entries">All Entries</TabsTrigger>
        </TabsList>

        <TabsContent value="week">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" onClick={() => {}}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="font-medium">{currentWeek}</span>
                </div>
                <Button variant="outline" size="icon" onClick={() => {}}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{totalHours} hours this week</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-4">
              {/* Day headers */}
              {days.map((day, i) => (
                <div key={day} className="text-center">
                  <div className="font-medium">{day}</div>
                  <div className="text-sm text-muted-foreground">{dates[i]}</div>
                </div>
              ))}
              
              {/* Time blocks */}
              {days.map((day, dayIndex) => (
                <div 
                  key={`time-${day}`} 
                  className="bg-background/30 backdrop-blur-sm rounded-lg border border-border/50 h-32 relative hover:border-primary/30 transition cursor-pointer"
                >
                  {/* Filter entries for this day */}
                  {timesheetEntries
                    .filter(entry => {
                      const entryDate = new Date(entry.date);
                      return entryDate.getDate() === parseInt(dates[dayIndex]) && entryDate.getMonth() === 10; // November
                    })
                    .map(entry => {
                      const project = getProjectById(entry.project);
                      return (
                        <div 
                          key={entry.id} 
                          className="p-2 text-xs rounded-md m-1 bg-white/10 backdrop-blur-sm border border-white/5"
                        >
                          <div className="flex items-center mb-1">
                            <div className={`w-2 h-2 rounded-full mr-1 ${project?.color}`}></div>
                            <span className="font-medium truncate">{project?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="truncate">{entry.notes}</span>
                            <span className="font-medium">{entry.hours}h</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="month">
          <Card className="flex items-center justify-center h-96 bg-card/40 backdrop-blur-md border border-white/10">
            <div className="text-center">
              <Calendar className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
              <h3 className="text-lg font-medium mb-2">Month View Coming Soon</h3>
              <p className="text-muted-foreground mb-4">
                We're working on this feature. It will be available soon.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="entries">
          <Card className="overflow-hidden bg-card/40 backdrop-blur-md border border-white/10">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border/50">
                <thead className="bg-secondary/30 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Notes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Hours</th>
                  </tr>
                </thead>
                <tbody className="bg-background/20 backdrop-blur-sm divide-y divide-border/50">
                  {timesheetEntries.map((entry) => {
                    const project = getProjectById(entry.project);
                    return (
                      <tr key={entry.id} className="hover:bg-secondary/20 transition">
                        <td className="px-6 py-4 whitespace-nowrap">{entry.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${project?.color}`}></div>
                            {project?.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{project?.client}</td>
                        <td className="px-6 py-4">{entry.notes}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{entry.hours}h</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Timesheet;
