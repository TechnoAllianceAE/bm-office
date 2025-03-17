
import React from 'react';
import { BarChart, PieChart, LineChart, LayoutDashboard, ArrowDown, ArrowUp, Share2, Download, Grid3X3, ListFilter } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line } from 'recharts';
import { DashboardWidget } from '@/components/dashboard/DashboardWidget';

// Sample data
const departmentData = [
  { name: 'HR', value: 45, color: '#9b87f5' },
  { name: 'IT', value: 30, color: '#f97316' },
  { name: 'Finance', value: 15, color: '#0ea5e9' },
  { name: 'Marketing', value: 10, color: '#7E69AB' },
];

const monthlyExpenseData = [
  { month: 'Jan', IT: 4000, HR: 2400, Marketing: 1800 },
  { month: 'Feb', IT: 3000, HR: 2210, Marketing: 2200 },
  { month: 'Mar', IT: 2000, HR: 2290, Marketing: 2500 },
  { month: 'Apr', IT: 2780, HR: 3490, Marketing: 2800 },
  { month: 'May', IT: 1890, HR: 4490, Marketing: 2100 },
  { month: 'Jun', IT: 2390, HR: 3800, Marketing: 2900 },
];

const quarterlyData = [
  { name: 'Q1', value: 12400 },
  { name: 'Q2', value: 15600 },
  { name: 'Q3', value: 13200 },
  { name: 'Q4', value: 16800 },
];

const MIS = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Management Information System</h1>
          <p className="text-muted-foreground">Business analytics and reporting dashboard</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <ListFilter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Grid3X3 className="h-4 w-4" />
            <span>Customize</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button className="gap-2">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardWidget
          title="Total Budget Allocation"
          icon={<LayoutDashboard className="h-5 w-5" />}
          className="bg-white/30 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="text-4xl font-bold my-2">$1,245,000</div>
            <div className="flex items-center text-green-600">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>8.2% from last fiscal year</span>
            </div>
          </div>
        </DashboardWidget>
        
        <DashboardWidget
          title="Department Expenditure"
          icon={<PieChart className="h-5 w-5" />}
          className="bg-white/30 backdrop-blur-sm"
        >
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </DashboardWidget>
        
        <DashboardWidget
          title="Quarterly Trends"
          icon={<LineChart className="h-5 w-5" />}
          className="bg-white/30 backdrop-blur-sm"
        >
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                <XAxis dataKey="name" stroke="rgba(0,0,0,0.6)" />
                <YAxis stroke="rgba(0,0,0,0.6)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)' }} />
                <Line type="monotone" dataKey="value" stroke="#9b87f5" strokeWidth={2} activeDot={{ r: 8 }} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </DashboardWidget>
      </div>
      
      <Card className="p-0 overflow-hidden bg-white/30 backdrop-blur-sm">
        <div className="p-4 border-b">
          <h2 className="font-medium">Detailed Analytics</h2>
        </div>
        
        <Tabs defaultValue="monthly" className="p-4">
          <TabsList className="mb-4 bg-white/40">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="mt-0">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={monthlyExpenseData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                  <XAxis dataKey="month" stroke="rgba(0,0,0,0.6)" />
                  <YAxis stroke="rgba(0,0,0,0.6)" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)' }} />
                  <Legend />
                  <Bar dataKey="IT" fill="#9b87f5" />
                  <Bar dataKey="HR" fill="#f97316" />
                  <Bar dataKey="Marketing" fill="#0ea5e9" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-white/40">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">IT Department</h3>
                <div className="text-2xl font-bold">$23,456</div>
                <div className="flex items-center text-green-600 mt-1 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>12% increase</span>
                </div>
              </Card>
              
              <Card className="p-4 bg-white/40">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">HR Department</h3>
                <div className="text-2xl font-bold">$18,230</div>
                <div className="flex items-center text-red-600 mt-1 text-sm">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  <span>4% decrease</span>
                </div>
              </Card>
              
              <Card className="p-4 bg-white/40">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Marketing Department</h3>
                <div className="text-2xl font-bold">$14,325</div>
                <div className="flex items-center text-green-600 mt-1 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>8% increase</span>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="quarterly" className="mt-0 text-center py-12">
            <LayoutDashboard className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Quarterly Analysis View</h3>
            <p className="text-muted-foreground max-w-md mx-auto mt-2">
              Detailed quarterly breakdowns and comparisons coming soon.
            </p>
          </TabsContent>
          
          <TabsContent value="yearly" className="mt-0 text-center py-12">
            <BarChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Yearly Analytics Dashboard</h3>
            <p className="text-muted-foreground max-w-md mx-auto mt-2">
              Annual trends and year-over-year comparisons coming soon.
            </p>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default MIS;
