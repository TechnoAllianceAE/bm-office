
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, PieChart, CheckCircle2, Clock, XCircle, Filter, Download } from 'lucide-react';
import { ResponsiveContainer, BarChart as RechartBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartPie, Pie, Cell } from 'recharts';
import { format } from 'date-fns';

const MIS = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Sample data for charts
  const departmentData = [
    { name: 'IT', value: 45, color: '#0088FE' },
    { name: 'HR', value: 20, color: '#00C49F' },
    { name: 'Finance', value: 15, color: '#FFBB28' },
    { name: 'Marketing', value: 25, color: '#FF8042' },
    { name: 'Operations', value: 30, color: '#8884d8' },
  ];
  
  const monthlyData = [
    { month: 'Jan', expenses: 4000, budget: 5000 },
    { month: 'Feb', expenses: 3500, budget: 5000 },
    { month: 'Mar', expenses: 6000, budget: 5000 },
    { month: 'Apr', expenses: 2780, budget: 5000 },
    { month: 'May', expenses: 4890, budget: 5000 },
    { month: 'Jun', expenses: 3800, budget: 5000 },
  ];
  
  const pendingApprovals = [
    { id: 1, type: 'Purchase', department: 'IT', amount: '$2,500', requestedBy: 'John Doe', date: '2023-06-15' },
    { id: 2, type: 'Travel', department: 'Marketing', amount: '$1,200', requestedBy: 'Jane Smith', date: '2023-06-14' },
    { id: 3, type: 'Software', department: 'IT', amount: '$5,000', requestedBy: 'Mike Johnson', date: '2023-06-13' },
    { id: 4, type: 'Equipment', department: 'Operations', amount: '$3,700', requestedBy: 'Sarah Williams', date: '2023-06-12' },
    { id: 5, type: 'Training', department: 'HR', amount: '$1,800', requestedBy: 'David Brown', date: '2023-06-11' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">MIS Dashboard</h1>
          <p className="text-muted-foreground">Management Information System overview and approvals</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+5 since yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Approved This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">187</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Budget Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">$234,500 of $300,000</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.3 days</div>
                <p className="text-xs text-muted-foreground">-0.2 days from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Department Budget Allocation</CardTitle>
                <CardDescription>Budget distribution across departments</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartPie>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartPie>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Monthly Expenses vs Budget</CardTitle>
                <CardDescription>Last 6 months performance</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBar
                    data={monthlyData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="expenses" fill="#8884d8" name="Expenses" />
                    <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
                  </RechartBar>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Requests awaiting your approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">ID</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Department</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Requested By</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingApprovals.map((approval) => (
                      <tr key={approval.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">#{approval.id}</td>
                        <td className="py-3 px-4">{approval.type}</td>
                        <td className="py-3 px-4">{approval.department}</td>
                        <td className="py-3 px-4">{approval.amount}</td>
                        <td className="py-3 px-4">{approval.requestedBy}</td>
                        <td className="py-3 px-4">{format(new Date(approval.date), 'MMM dd, yyyy')}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <XCircle className="h-4 w-4 text-red-500" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Clock className="h-4 w-4 text-amber-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Generate and download management reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Budget Utilization", icon: BarChart, description: "Department-wise budget utilization report" },
                  { title: "Expense Analysis", icon: PieChart, description: "Category-wise expense breakdown" },
                  { title: "Approval Trends", icon: LineChart, description: "Approval processing times and statistics" },
                  { title: "Resource Allocation", icon: BarChart, description: "Resource allocation across projects" },
                  { title: "Cost Savings", icon: LineChart, description: "Cost-saving initiatives and outcomes" },
                  { title: "Compliance Report", icon: CheckCircle2, description: "Policy compliance across departments" },
                ].map((report, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <report.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{report.title}</h3>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button size="sm" variant="outline" className="w-full">Generate</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="text-center p-12">
            <h3 className="text-xl font-medium mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground mb-4">This section is currently under development.</p>
            <Button>Request Early Access</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MIS;
