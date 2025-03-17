
import React from 'react';
import { Card } from '@/components/common/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Download, BarChart3 } from 'lucide-react';

const Analytics = () => {
  // Sample data for charts
  const projectData = [
    { name: 'Jan', completed: 4, inProgress: 2, planned: 1 },
    { name: 'Feb', completed: 3, inProgress: 3, planned: 2 },
    { name: 'Mar', completed: 5, inProgress: 2, planned: 3 },
    { name: 'Apr', completed: 6, inProgress: 4, planned: 2 },
    { name: 'May', completed: 8, inProgress: 3, planned: 1 },
    { name: 'Jun', completed: 7, inProgress: 5, planned: 3 },
  ];

  const timeData = [
    { name: 'Mon', hours: 32 },
    { name: 'Tue', hours: 37 },
    { name: 'Wed', hours: 41 },
    { name: 'Thu', hours: 35 },
    { name: 'Fri', hours: 30 },
  ];

  const departmentData = [
    { name: 'Engineering', value: 35 },
    { name: 'Marketing', value: 20 },
    { name: 'Sales', value: 25 },
    { name: 'HR', value: 10 },
    { name: 'Finance', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Insights and metrics for your organization</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="gap-1">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 bg-card/40 backdrop-blur-md border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Total Projects</h3>
            <div className="bg-primary/10 p-2 rounded-full">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold">126</div>
          <div className="text-sm text-green-500">+12% from last month</div>
        </Card>
        
        <Card className="p-4 bg-card/40 backdrop-blur-md border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Average Hours</h3>
            <div className="bg-primary/10 p-2 rounded-full">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold">35.2</div>
          <div className="text-sm text-red-500">-2% from last month</div>
        </Card>
        
        <Card className="p-4 bg-card/40 backdrop-blur-md border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Team Efficiency</h3>
            <div className="bg-primary/10 p-2 rounded-full">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold">92%</div>
          <div className="text-sm text-green-500">+5% from last month</div>
        </Card>
      </div>

      <Tabs defaultValue="projects">
        <TabsList className="mb-6 bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="time">Time Tracking</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <h3 className="text-lg font-medium mb-4">Project Status Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={projectData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)' }} />
                  <Legend />
                  <Bar dataKey="completed" fill="#4CAF50" name="Completed" />
                  <Bar dataKey="inProgress" fill="#2196F3" name="In Progress" />
                  <Bar dataKey="planned" fill="#FFC107" name="Planned" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="time">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <h3 className="text-lg font-medium mb-4">Weekly Hours Logged</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="hours" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="departments">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            <h3 className="text-lg font-medium mb-4">Resource Allocation by Department</h3>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
