
import React, { useState } from 'react';
import { 
  BarChart, PieChart, LineChart, LayoutDashboard, ArrowDown, 
  ArrowUp, Share2, Download, Grid3X3, ListFilter, 
  FileText, DollarSign, CheckCircle2, AlertCircle,
  Building, FileBarChart, User, Calendar
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, 
  Pie, Cell, LineChart as RechartsLineChart, Line 
} from 'recharts';
import { DashboardWidget } from '@/components/dashboard/DashboardWidget';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

// Fee collection data
const feeCollectionData = [
  { month: 'Jan', Tuition: 98000, Hostel: 45000, Transport: 28000, Other: 12000 },
  { month: 'Feb', Tuition: 105000, Hostel: 42000, Transport: 27000, Other: 9000 },
  { month: 'Mar', Tuition: 92000, Hostel: 44000, Transport: 29000, Other: 10500 },
  { month: 'Apr', Tuition: 88000, Hostel: 40000, Transport: 26000, Other: 8500 },
  { month: 'May', Tuition: 110000, Hostel: 46000, Transport: 30000, Other: 11000 },
  { month: 'Jun', Tuition: 103000, Hostel: 43000, Transport: 28500, Other: 9500 },
];

// Organization fee data
const organizationData = [
  { id: 'ORG-001', name: 'St. Mary School', total: 245000, status: 'Paid', due: 0, lastPayment: '2023-06-15' },
  { id: 'ORG-002', name: 'Lincoln High School', total: 320000, status: 'Partial', due: 75000, lastPayment: '2023-06-10' },
  { id: 'ORG-003', name: 'Oakridge Academy', total: 178000, status: 'Pending', due: 178000, lastPayment: '-' },
  { id: 'ORG-004', name: 'Westlake College', total: 410000, status: 'Paid', due: 0, lastPayment: '2023-06-18' },
  { id: 'ORG-005', name: 'Springfield Institute', total: 290000, status: 'Partial', due: 120000, lastPayment: '2023-06-05' },
];

// Expense data
const expenseData = [
  { id: 'EXP-1001', category: 'Infrastructure', description: 'Building maintenance', amount: 45000, date: '2023-06-05', status: 'Approved' },
  { id: 'EXP-1002', category: 'Salaries', description: 'Faculty salaries - June', amount: 235000, date: '2023-06-10', status: 'Approved' },
  { id: 'EXP-1003', category: 'Operations', description: 'Electricity bill', amount: 28000, date: '2023-06-12', status: 'Approved' },
  { id: 'EXP-1004', category: 'Technology', description: 'IT equipment purchase', amount: 78000, date: '2023-06-15', status: 'Pending' },
  { id: 'EXP-1005', category: 'Events', description: 'Annual day celebrations', amount: 35000, date: '2023-06-18', status: 'Approved' },
];

// Special request data
const specialRequestsData = [
  { 
    id: 'SR-001', 
    orgName: 'St. Mary School', 
    type: 'Fee Waiver', 
    amount: 25000, 
    reason: 'Financial hardship due to COVID-19 impact', 
    requestedBy: 'Maria Johnson (Principal)',
    date: '2023-06-15',
    status: 'Pending'
  },
  { 
    id: 'SR-002', 
    orgName: 'Oakridge Academy', 
    type: 'Payment Extension', 
    amount: 45000, 
    reason: 'Administrative delay in fund allocation', 
    requestedBy: 'Robert Williams (Finance Director)',
    date: '2023-06-10',
    status: 'Approved'
  },
  { 
    id: 'SR-003', 
    orgName: 'Lincoln High School', 
    type: 'Fee Discount', 
    amount: 18000, 
    reason: 'Special arrangement for underprivileged students', 
    requestedBy: 'James Smith (Principal)',
    date: '2023-06-18',
    status: 'Rejected'
  },
  { 
    id: 'SR-004', 
    orgName: 'Westlake College', 
    type: 'Additional Grant', 
    amount: 35000, 
    reason: 'Infrastructure development project support', 
    requestedBy: 'Thomas Brown (Director)',
    date: '2023-06-20',
    status: 'Pending'
  },
];

const MIS = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  
  const selectedRequest = selectedRequestId ? 
    specialRequestsData.find(request => request.id === selectedRequestId) : 
    null;

  const handleViewRequest = (requestId: string) => {
    setSelectedRequestId(requestId);
    setIsApprovalDialogOpen(true);
  };
  
  const handleApprove = () => {
    // In a real app, this would update the state and send data to the backend
    setIsApprovalDialogOpen(false);
    // Add toast notification here
  };
  
  const handleReject = () => {
    // In a real app, this would update the state and send data to the backend
    setIsApprovalDialogOpen(false);
    // Add toast notification here
  };

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
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="bg-white/30 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="approvals">Management Approvals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 m-0">
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
        </TabsContent>
        
        {/* Financial Reports Section */}
        <TabsContent value="reports" className="space-y-6 m-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <DashboardWidget
              title="Total Fee Collection"
              icon={<DollarSign className="h-5 w-5" />}
              className="bg-white/30 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="text-3xl font-bold my-2">$843,000</div>
                <div className="flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>5.2% from last quarter</span>
                </div>
              </div>
            </DashboardWidget>
            
            <DashboardWidget
              title="Tuition Fees"
              icon={<FileText className="h-5 w-5" />}
              className="bg-white/30 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="text-3xl font-bold my-2">$596,000</div>
                <div className="flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>3.8%</span>
                </div>
              </div>
            </DashboardWidget>
            
            <DashboardWidget
              title="Hostel & Transport"
              icon={<Building className="h-5 w-5" />}
              className="bg-white/30 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="text-3xl font-bold my-2">$247,000</div>
                <div className="flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>2.5%</span>
                </div>
              </div>
            </DashboardWidget>
            
            <DashboardWidget
              title="Due Payments"
              icon={<AlertCircle className="h-5 w-5" />}
              className="bg-white/30 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="text-3xl font-bold my-2">$373,000</div>
                <div className="flex items-center text-amber-600">
                  <span>12.6% of total</span>
                </div>
              </div>
            </DashboardWidget>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="p-0 overflow-hidden bg-white/30 backdrop-blur-sm">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-medium">Fee Collection Trends</h2>
                  <Select defaultValue="6months">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">Last 3 Months</SelectItem>
                      <SelectItem value="6months">Last 6 Months</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="p-4">
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={feeCollectionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                        <XAxis dataKey="month" stroke="rgba(0,0,0,0.6)" />
                        <YAxis stroke="rgba(0,0,0,0.6)" />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)' }} />
                        <Legend />
                        <Bar dataKey="Tuition" fill="#3b82f6" />
                        <Bar dataKey="Hostel" fill="#10b981" />
                        <Bar dataKey="Transport" fill="#f59e0b" />
                        <Bar dataKey="Other" fill="#8b5cf6" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <Card className="p-0 overflow-hidden bg-white/30 backdrop-blur-sm h-full">
                <div className="p-4 border-b">
                  <h2 className="font-medium">Collection Breakdown</h2>
                </div>
                
                <div className="p-4">
                  <div className="h-[200px] mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: 'Tuition', value: 70, color: '#3b82f6' },
                            { name: 'Hostel', value: 15, color: '#10b981' },
                            { name: 'Transport', value: 10, color: '#f59e0b' },
                            { name: 'Other', value: 5, color: '#8b5cf6' },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {[
                            { name: 'Tuition', value: 70, color: '#3b82f6' },
                            { name: 'Hostel', value: 15, color: '#10b981' },
                            { name: 'Transport', value: 10, color: '#f59e0b' },
                            { name: 'Other', value: 5, color: '#8b5cf6' },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2"></div>
                        Tuition Fees
                      </span>
                      <span className="font-medium">70%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-emerald-500 rounded-sm mr-2"></div>
                        Hostel Fees
                      </span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-amber-500 rounded-sm mr-2"></div>
                        Transport Fees
                      </span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-sm mr-2"></div>
                        Other Fees
                      </span>
                      <span className="font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          <Card className="p-0 overflow-hidden bg-white/30 backdrop-blur-sm">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-medium">Organization Fee Summary</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button size="sm">View All</Button>
              </div>
            </div>
            
            <div className="p-0">
              <Table>
                <TableHeader className="bg-white/20">
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Amount</TableHead>
                    <TableHead>Last Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {organizationData.map((org) => (
                    <TableRow key={org.id}>
                      <TableCell className="font-medium">{org.id}</TableCell>
                      <TableCell>{org.name}</TableCell>
                      <TableCell>${org.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={
                          org.status === 'Paid' ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30' :
                          org.status === 'Partial' ? 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30' :
                          'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30'
                        }>
                          {org.status}
                        </Badge>
                      </TableCell>
                      <TableCell>${org.due.toLocaleString()}</TableCell>
                      <TableCell>{org.lastPayment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
        
        {/* Expenses Section */}
        <TabsContent value="expenses" className="space-y-6 m-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <DashboardWidget
              title="Total Expenses"
              icon={<DollarSign className="h-5 w-5" />}
              className="bg-white/30 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="text-3xl font-bold my-2">$421,000</div>
                <div className="flex items-center text-red-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>3.8% from last quarter</span>
                </div>
              </div>
            </DashboardWidget>
            
            <DashboardWidget
              title="Monthly Average"
              icon={<FileBarChart className="h-5 w-5" />}
              className="bg-white/30 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="text-3xl font-bold my-2">$70,166</div>
                <div className="flex items-center text-amber-600">
                  <span>Last 6 months</span>
                </div>
              </div>
            </DashboardWidget>
            
            <DashboardWidget
              title="Pending Expenses"
              icon={<Clock className="h-5 w-5" />}
              className="bg-white/30 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="text-3xl font-bold my-2">$78,000</div>
                <div className="flex items-center text-blue-600">
                  <span>5 transactions</span>
                </div>
              </div>
            </DashboardWidget>
            
            <DashboardWidget
              title="Budget Utilization"
              icon={<PieChart className="h-5 w-5" />}
              className="bg-white/30 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="text-3xl font-bold my-2">65.3%</div>
                <div className="flex items-center text-green-600">
                  <span>Under budget by 4.7%</span>
                </div>
              </div>
            </DashboardWidget>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="p-0 overflow-hidden bg-white/30 backdrop-blur-sm">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-medium">Expense Distribution by Category</h2>
                  <Select defaultValue="6months">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3months">Last 3 Months</SelectItem>
                      <SelectItem value="6months">Last 6 Months</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="p-4">
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={[
                          { category: 'Salaries', value: 235000 },
                          { category: 'Infrastructure', value: 85000 },
                          { category: 'Operations', value: 48000 },
                          { category: 'Technology', value: 78000 },
                          { category: 'Events', value: 35000 },
                          { category: 'Miscellaneous', value: 12000 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                        <XAxis type="number" stroke="rgba(0,0,0,0.6)" />
                        <YAxis dataKey="category" type="category" stroke="rgba(0,0,0,0.6)" width={100} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)' }} />
                        <Legend />
                        <Bar dataKey="value" name="Amount" fill="#6366f1" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="md:col-span-1">
              <Card className="p-0 overflow-hidden bg-white/30 backdrop-blur-sm h-full">
                <div className="p-4 border-b">
                  <h2 className="font-medium">Expense Breakdown</h2>
                </div>
                
                <div className="p-4">
                  <div className="h-[200px] mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: 'Salaries', value: 55, color: '#6366f1' },
                            { name: 'Infrastructure', value: 20, color: '#ec4899' },
                            { name: 'Operations', value: 11, color: '#14b8a6' },
                            { name: 'Technology', value: 9, color: '#f97316' },
                            { name: 'Others', value: 5, color: '#a3a3a3' },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {[
                            { name: 'Salaries', value: 55, color: '#6366f1' },
                            { name: 'Infrastructure', value: 20, color: '#ec4899' },
                            { name: 'Operations', value: 11, color: '#14b8a6' },
                            { name: 'Technology', value: 9, color: '#f97316' },
                            { name: 'Others', value: 5, color: '#a3a3a3' },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-indigo-500 rounded-sm mr-2"></div>
                        Salaries
                      </span>
                      <span className="font-medium">55%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-pink-500 rounded-sm mr-2"></div>
                        Infrastructure
                      </span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-teal-500 rounded-sm mr-2"></div>
                        Operations
                      </span>
                      <span className="font-medium">11%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-sm mr-2"></div>
                        Technology
                      </span>
                      <span className="font-medium">9%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-neutral-400 rounded-sm mr-2"></div>
                        Others
                      </span>
                      <span className="font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          <Card className="p-0 overflow-hidden bg-white/30 backdrop-blur-sm">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-medium">Recent Expenses</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button size="sm">View All</Button>
              </div>
            </div>
            
            <div className="p-0">
              <Table>
                <TableHeader className="bg-white/20">
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseData.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.id}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>${expense.amount.toLocaleString()}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>
                        <Badge className={
                          expense.status === 'Approved' ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30' :
                          expense.status === 'Pending' ? 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30' :
                          'bg-red-500/20 text-red-700 hover:bg-red-500/30'
                        }>
                          {expense.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
        
        {/* Management Approvals Section */}
        <TabsContent value="approvals" className="space-y-6 m-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardWidget
              title="Pending Approvals"
              icon={<Clock className="h-5 w-5" />}
              className="bg-white/30 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="text-4xl font-bold my-2">2</div>
                <div className="flex items-center text-amber-600">
                  <span>Require your attention</span>
                </div>
              </div>
            </DashboardWidget>
            
            <DashboardWidget
              title="Approved Requests"
              icon={<CheckCircle2 className="h-5 w-5" />}
              className="bg-white/30 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="text-4xl font-bold my-2">12</div>
                <div className="flex items-center text-green-600">
                  <span>This quarter</span>
                </div>
              </div>
            </DashboardWidget>
            
            <DashboardWidget
              title="Total Waivers"
              icon={<FileText className="h-5 w-5" />}
              className="bg-white/30 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="text-4xl font-bold my-2">$123,450</div>
                <div className="flex items-center text-blue-600">
                  <span>Approved amount</span>
                </div>
              </div>
            </DashboardWidget>
          </div>
          
          <Card className="p-0 overflow-hidden bg-white/30 backdrop-blur-sm">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-medium">Special Requests for Approval</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Calendar className="h-4 w-4" />
                  Filter by Date
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <User className="h-4 w-4" />
                  Filter by Organization
                </Button>
              </div>
            </div>
            
            <div className="p-0">
              <Table>
                <TableHeader className="bg-white/20">
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Request Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {specialRequestsData.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.orgName}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>${request.amount.toLocaleString()}</TableCell>
                      <TableCell>{request.requestedBy}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>
                        <Badge className={
                          request.status === 'Approved' ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30' :
                          request.status === 'Pending' ? 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30' :
                          'bg-red-500/20 text-red-700 hover:bg-red-500/30'
                        }>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.status === 'Pending' ? (
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-8 px-2"
                              onClick={() => handleViewRequest(request.id)}
                            >
                              Review
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-8 px-2"
                            onClick={() => handleViewRequest(request.id)}
                          >
                            View
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
          
          <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Request Details - {selectedRequest?.id}</DialogTitle>
              </DialogHeader>
              
              {selectedRequest && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Organization</p>
                      <p className="font-medium">{selectedRequest.orgName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Request Type</p>
                      <p className="font-medium">{selectedRequest.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-medium">${selectedRequest.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Requested On</p>
                      <p className="font-medium">{selectedRequest.date}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Requested By</p>
                    <p className="font-medium">{selectedRequest.requestedBy}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Reason</p>
                    <p className="bg-white/30 p-2 rounded-md mt-1">{selectedRequest.reason}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className={
                      selectedRequest.status === 'Approved' ? 'bg-green-500/20 text-green-700' :
                      selectedRequest.status === 'Pending' ? 'bg-amber-500/20 text-amber-700' :
                      'bg-red-500/20 text-red-700'
                    }>
                      {selectedRequest.status}
                    </Badge>
                  </div>
                  
                  {selectedRequest.status === 'Pending' && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Comments</p>
                        <Textarea className="mt-1" placeholder="Add your comments or notes here..." />
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => handleReject()}>
                          Reject
                        </Button>
                        <Button onClick={() => handleApprove()}>
                          Approve
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MIS;
