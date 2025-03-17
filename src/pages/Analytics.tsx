
import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Calendar, Download, BarChart3, Activity, Server, Globe, 
  Smartphone, Database, Clock, Filter, FileDown, Zap, RefreshCw, 
  TrendingUp, ListFilter, ChevronDown
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardWidget } from '@/components/dashboard/DashboardWidget';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  
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
  
  // Website analytics data
  const websiteData = [
    { date: 'Jun 01', users: 1200, pageviews: 3800, sessions: 1500 },
    { date: 'Jun 08', users: 1300, pageviews: 4200, sessions: 1700 },
    { date: 'Jun 15', users: 1100, pageviews: 3700, sessions: 1400 },
    { date: 'Jun 22', users: 1400, pageviews: 4500, sessions: 1800 },
    { date: 'Jun 29', users: 1500, pageviews: 4800, sessions: 2000 },
    { date: 'Jul 06', users: 1700, pageviews: 5200, sessions: 2200 },
  ];
  
  // App usage data
  const appUsageData = [
    { date: 'Jun 01', activeUsers: 820, sessions: 1200, screenTime: 22 },
    { date: 'Jun 08', activeUsers: 900, sessions: 1350, screenTime: 25 },
    { date: 'Jun 15', activeUsers: 880, sessions: 1280, screenTime: 23 },
    { date: 'Jun 22', activeUsers: 950, sessions: 1400, screenTime: 28 },
    { date: 'Jun 29', activeUsers: 1000, sessions: 1500, screenTime: 30 },
    { date: 'Jul 06', activeUsers: 1050, sessions: 1600, screenTime: 32 },
  ];
  
  // Server status data
  const serverStatusData = [
    { name: 'Web-01', cpu: 45, memory: 62, disk: 38, status: 'Healthy' },
    { name: 'Web-02', cpu: 28, memory: 45, disk: 32, status: 'Healthy' },
    { name: 'DB-01', cpu: 72, memory: 83, disk: 55, status: 'Warning' },
    { name: 'Cache-01', cpu: 32, memory: 40, disk: 22, status: 'Healthy' },
    { name: 'API-01', cpu: 88, memory: 75, disk: 45, status: 'Critical' },
  ];
  
  // CPU Load over time
  const cpuLoadData = [
    { time: '00:00', web01: 30, web02: 20, db01: 65, cache01: 25, api01: 70 },
    { time: '04:00', web01: 25, web02: 15, db01: 55, cache01: 20, api01: 60 },
    { time: '08:00', web01: 45, web02: 25, db01: 75, cache01: 30, api01: 85 },
    { time: '12:00', web01: 50, web02: 30, db01: 80, cache01: 35, api01: 90 },
    { time: '16:00', web01: 40, web02: 28, db01: 72, cache01: 32, api01: 88 },
    { time: '20:00', web01: 35, web02: 22, db01: 68, cache01: 28, api01: 75 },
  ];

  const COLORS = ['#9b87f5', '#f97316', '#0ea5e9', '#7E69AB', '#FFC107'];
  const STATUS_COLORS = {
    'Healthy': 'bg-green-500',
    'Warning': 'bg-amber-500',
    'Critical': 'bg-red-500'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with improved design */}
      <div className="glass-card p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Insights and metrics for your organization</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="bg-white/50 border border-gray-200 w-[180px]">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="12m">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1 bg-white/50 border border-gray-200">
                <Filter className="h-4 w-4 text-primary" />
                Filter
                <ChevronDown className="h-3 w-3 opacity-50 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Departments</DropdownMenuItem>
              <DropdownMenuItem>Marketing</DropdownMenuItem>
              <DropdownMenuItem>Engineering</DropdownMenuItem>
              <DropdownMenuItem>Sales</DropdownMenuItem>
              <DropdownMenuItem>Human Resources</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" className="gap-1 bg-white/50 border border-gray-200">
            <RefreshCw className="h-4 w-4 text-primary" />
            Refresh
          </Button>
          
          <Button variant="outline" className="gap-1 bg-white/50 border border-gray-200">
            <FileDown className="h-4 w-4 text-primary" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardWidget
          title="Total Projects"
          icon={<BarChart3 className="h-5 w-5 text-primary" />}
          className="bg-white/30 backdrop-blur-sm"
        >
          <div className="flex flex-col">
            <div className="text-3xl font-bold">126</div>
            <div className="mt-1 flex items-center text-sm text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>12% from last month</span>
            </div>
          </div>
        </DashboardWidget>
        
        <DashboardWidget
          title="Average Hours"
          icon={<Clock className="h-5 w-5 text-primary" />}
          className="bg-white/30 backdrop-blur-sm"
        >
          <div className="flex flex-col">
            <div className="text-3xl font-bold">35.2</div>
            <div className="mt-1 flex items-center text-sm text-red-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>-2% from last month</span>
            </div>
          </div>
        </DashboardWidget>
        
        <DashboardWidget
          title="Team Efficiency"
          icon={<Zap className="h-5 w-5 text-primary" />}
          className="bg-white/30 backdrop-blur-sm"
        >
          <div className="flex flex-col">
            <div className="text-3xl font-bold">92%</div>
            <div className="mt-1 flex items-center text-sm text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+5% from last month</span>
            </div>
          </div>
        </DashboardWidget>
        
        <DashboardWidget
          title="Active Servers"
          icon={<Server className="h-5 w-5 text-primary" />}
          className="bg-white/30 backdrop-blur-sm"
        >
          <div className="flex flex-col">
            <div className="text-3xl font-bold">5/5</div>
            <div className="mt-1 flex space-x-1">
              <span className="px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-700 text-xs">3 Healthy</span>
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 text-xs">1 Warning</span>
              <span className="px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-700 text-xs">1 Critical</span>
            </div>
          </div>
        </DashboardWidget>
      </div>

      {/* Main content tabs with improved styling */}
      <Card className="p-0 overflow-hidden bg-white/30 backdrop-blur-sm border border-white/20">
        <Tabs defaultValue="projects" className="w-full">
          <div className="border-b">
            <div className="p-4">
              <TabsList className="bg-white/40 h-10 p-1">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="time">Time Tracking</TabsTrigger>
                <TabsTrigger value="departments">Departments</TabsTrigger>
                <TabsTrigger value="web-analytics">Website</TabsTrigger>
                <TabsTrigger value="app-usage">App Usage</TabsTrigger>
                <TabsTrigger value="server-status">Server Status</TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <div className="p-6">
            <TabsContent value="projects" className="m-0">
              <h3 className="text-lg font-medium mb-4">Project Status Overview</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)' }} />
                    <Legend />
                    <Bar dataKey="completed" fill="#4CAF50" name="Completed" />
                    <Bar dataKey="inProgress" fill="#9b87f5" name="In Progress" />
                    <Bar dataKey="planned" fill="#FFC107" name="Planned" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="time" className="m-0">
              <h3 className="text-lg font-medium mb-4">Weekly Hours Logged</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)' }} />
                    <Legend />
                    <Line type="monotone" dataKey="hours" stroke="#9b87f5" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="departments" className="m-0">
              <h3 className="text-lg font-medium mb-4">Resource Allocation by Department</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                
                <div>
                  <div className="space-y-4">
                    {departmentData.map((dept, index) => (
                      <div key={dept.name} className="p-3 bg-white/20 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            <span className="font-medium">{dept.name}</span>
                          </div>
                          <span className="text-sm">{dept.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="h-2 rounded-full" 
                               style={{ width: `${dept.value}%`, backgroundColor: COLORS[index % COLORS.length] }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="web-analytics" className="m-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="p-4 bg-white/40">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-muted-foreground">Unique Visitors</h3>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">24,892</div>
                  <div className="text-sm text-green-500">+8.2% from last month</div>
                </Card>
                
                <Card className="p-4 bg-white/40">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-muted-foreground">Page Views</h3>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">78,623</div>
                  <div className="text-sm text-green-500">+12.5% from last month</div>
                </Card>
                
                <Card className="p-4 bg-white/40">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-muted-foreground">Bounce Rate</h3>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">42.3%</div>
                  <div className="text-sm text-red-500">+2.8% from last month</div>
                </Card>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Website Traffic Overview</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={websiteData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)' }} />
                    <Legend />
                    <Area type="monotone" dataKey="users" stackId="1" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.6} name="Users" />
                    <Area type="monotone" dataKey="pageviews" stackId="2" stroke="#f97316" fill="#f97316" fillOpacity={0.6} name="Page Views" />
                    <Area type="monotone" dataKey="sessions" stackId="3" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} name="Sessions" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="app-usage" className="m-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="p-4 bg-white/40">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-muted-foreground">Active Users</h3>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Smartphone className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">1,050</div>
                  <div className="text-sm text-green-500">+5% from last month</div>
                </Card>
                
                <Card className="p-4 bg-white/40">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-muted-foreground">Sessions per User</h3>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">1.8</div>
                  <div className="text-sm text-green-500">+0.3 from last month</div>
                </Card>
                
                <Card className="p-4 bg-white/40">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-muted-foreground">Avg. Screen Time</h3>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">32m</div>
                  <div className="text-sm text-green-500">+2m from last month</div>
                </Card>
              </div>
              
              <h3 className="text-lg font-medium mb-4">App Usage Trends</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={appUsageData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)' }} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="activeUsers" stroke="#9b87f5" activeDot={{ r: 8 }} name="Active Users" />
                    <Line yAxisId="left" type="monotone" dataKey="sessions" stroke="#f97316" name="Sessions" />
                    <Line yAxisId="right" type="monotone" dataKey="screenTime" stroke="#0ea5e9" name="Screen Time (mins)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="server-status" className="m-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="p-4 bg-white/40">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-muted-foreground">Total Servers</h3>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Server className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">5</div>
                  <div className="flex space-x-2 mt-2">
                    <div className="px-2 py-1 rounded bg-green-500/20 text-green-700 text-xs">3 Healthy</div>
                    <div className="px-2 py-1 rounded bg-amber-500/20 text-amber-700 text-xs">1 Warning</div>
                    <div className="px-2 py-1 rounded bg-red-500/20 text-red-700 text-xs">1 Critical</div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-white/40">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-muted-foreground">Avg. CPU Usage</h3>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">53%</div>
                  <div className="text-sm text-amber-500">+8% from yesterday</div>
                </Card>
                
                <Card className="p-4 bg-white/40">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-muted-foreground">Avg. Memory Usage</h3>
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Database className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">61%</div>
                  <div className="text-sm text-amber-500">+5% from yesterday</div>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Server Status</h3>
                  <div className="space-y-4">
                    {serverStatusData.map((server) => (
                      <div key={server.name} className="p-3 bg-white/30 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full ${STATUS_COLORS[server.status]} mr-2`}></div>
                            <span className="font-medium">{server.name}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${STATUS_COLORS[server.status]}/20 ${
                            server.status === 'Healthy' ? 'text-green-700' : 
                            server.status === 'Warning' ? 'text-amber-700' : 'text-red-700'}`}>
                            {server.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <div className="text-xs text-muted-foreground">CPU</div>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    server.cpu > 80 ? 'bg-red-500' : 
                                    server.cpu > 60 ? 'bg-amber-500' : 'bg-green-500'}`} 
                                  style={{ width: `${server.cpu}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{server.cpu}%</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Memory</div>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    server.memory > 80 ? 'bg-red-500' : 
                                    server.memory > 60 ? 'bg-amber-500' : 'bg-green-500'}`} 
                                  style={{ width: `${server.memory}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{server.memory}%</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Disk</div>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    server.disk > 80 ? 'bg-red-500' : 
                                    server.disk > 60 ? 'bg-amber-500' : 'bg-green-500'}`} 
                                  style={{ width: `${server.disk}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{server.disk}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">CPU Load Over Time</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={cpuLoadData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)' }} />
                        <Legend />
                        <Line type="monotone" dataKey="web01" stroke="#9b87f5" name="Web-01" />
                        <Line type="monotone" dataKey="web02" stroke="#f97316" name="Web-02" />
                        <Line type="monotone" dataKey="db01" stroke="#FFC107" name="DB-01" />
                        <Line type="monotone" dataKey="cache01" stroke="#7E69AB" name="Cache-01" />
                        <Line type="monotone" dataKey="api01" stroke="#FF5252" name="API-01" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
};

export default Analytics;
