
import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import {
  LineChart, BarChart3, PieChart, Calendar, FileDown, FileUp, Filter,
  Search, CheckCircle2, XCircle, EyeIcon, Download, Printer, Building,
  CreditCard, ThumbsUp, ThumbsDown, LayoutDashboard, Clock, Users
} from 'lucide-react';

// Charts data simulation
const monthlyRevenue = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 61000 },
  { month: 'May', amount: 55000 },
  { month: 'Jun', amount: 67000 },
  { month: 'Jul', amount: 72000 },
  { month: 'Aug', amount: 63000 },
  { month: 'Sep', amount: 58000 },
  { month: 'Oct', amount: 64000 },
  { month: 'Nov', amount: 69000 },
  { month: 'Dec', amount: 78000 },
];

const expenseCategories = [
  { name: 'Salaries', amount: 120000 },
  { name: 'Operations', amount: 45000 },
  { name: 'Marketing', amount: 35000 },
  { name: 'Utilities', amount: 15000 },
  { name: 'Travel', amount: 22000 },
  { name: 'Equipment', amount: 18000 },
  { name: 'Miscellaneous', amount: 8000 },
];

// Sample fee collection data
const feeCollectionData = [
  { 
    id: 'PAY-2023-001', 
    organization: 'ABC School', 
    type: 'Tuition Fee', 
    amount: 25000, 
    date: '2023-11-10',
    status: 'received',
    contact: 'John Smith'
  },
  { 
    id: 'PAY-2023-002', 
    organization: 'XYZ Academy', 
    type: 'Registration Fee', 
    amount: 12000, 
    date: '2023-11-08',
    status: 'pending',
    contact: 'Sarah Johnson'
  },
  { 
    id: 'PAY-2023-003', 
    organization: 'City College', 
    type: 'Annual Fee', 
    amount: 35000, 
    date: '2023-11-05',
    status: 'received',
    contact: 'Robert Williams'
  },
  { 
    id: 'PAY-2023-004', 
    organization: 'Global Institute', 
    type: 'Examination Fee', 
    amount: 8500, 
    date: '2023-11-03',
    status: 'received',
    contact: 'Lisa Chen'
  },
  { 
    id: 'PAY-2023-005', 
    organization: 'Sunshine School', 
    type: 'Tuition Fee', 
    amount: 18000, 
    date: '2023-11-01',
    status: 'pending',
    contact: 'Michael Brown'
  },
];

// Sample expenses data
const expensesData = [
  { 
    id: 'EXP-2023-001', 
    category: 'Salaries', 
    description: 'Staff salaries for November', 
    amount: 42000, 
    date: '2023-11-28', 
    status: 'pending' 
  },
  { 
    id: 'EXP-2023-002', 
    category: 'Operations', 
    description: 'Office rent for Q4', 
    amount: 15000, 
    date: '2023-11-25', 
    status: 'approved' 
  },
  { 
    id: 'EXP-2023-003', 
    category: 'Equipment', 
    description: 'New computers for IT department', 
    amount: 8500, 
    date: '2023-11-20', 
    status: 'processed' 
  },
  { 
    id: 'EXP-2023-004', 
    category: 'Utilities', 
    description: 'Electricity and water bills', 
    amount: 2800, 
    date: '2023-11-15', 
    status: 'processed' 
  },
  { 
    id: 'EXP-2023-005', 
    category: 'Marketing', 
    description: 'Digital advertising campaign', 
    amount: 5500, 
    date: '2023-11-10', 
    status: 'approved' 
  },
];

// Sample waiver requests
const waiverRequests = [
  { 
    id: 'WR-2023-001', 
    student: 'Jane Smith', 
    organization: 'ABC School', 
    amount: 5000, 
    reason: 'Financial hardship', 
    status: 'pending',
    submittedBy: 'Principal Thompson',
    date: '2023-11-15'
  },
  { 
    id: 'WR-2023-002', 
    student: 'Michael Brown', 
    organization: 'City College', 
    amount: 3500, 
    reason: 'Academic scholarship', 
    status: 'approved',
    submittedBy: 'Dean Williams',
    date: '2023-11-08'
  },
  { 
    id: 'WR-2023-003', 
    student: 'Sara Johnson', 
    organization: 'XYZ Academy', 
    amount: 2000, 
    reason: 'Medical emergency', 
    status: 'pending',
    submittedBy: 'Principal Davis',
    date: '2023-11-05'
  },
];

const MIS = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const getStatusBadge = (status: string) => {
    const statusClasses = {
      pending: "bg-amber-500/20 text-amber-700",
      approved: "bg-green-500/20 text-green-700",
      received: "bg-blue-500/20 text-blue-700",
      processed: "bg-purple-500/20 text-purple-700",
      rejected: "bg-red-500/20 text-red-700",
    };
    
    return (
      <Badge className={statusClasses[status as keyof typeof statusClasses]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  
  const filteredFeeCollection = feeCollectionData.filter(item => 
    item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredExpenses = expensesData.filter(item => 
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Management Information System</h1>
        <p className="text-muted-foreground">Financial reports and approval management</p>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard" className="gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="fee-collection" className="gap-2">
            <Building className="h-4 w-4" />
            Fee Collection
          </TabsTrigger>
          <TabsTrigger value="expenses" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="approvals" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Approvals
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Total Revenue (YTD)', value: formatCurrency(732000), icon: <LineChart className="h-5 w-5 text-green-500" />, change: '+15%' },
              { title: 'Total Expenses (YTD)', value: formatCurrency(263000), icon: <CreditCard className="h-5 w-5 text-amber-500" />, change: '+8%' },
              { title: 'Net Income (YTD)', value: formatCurrency(469000), icon: <BarChart3 className="h-5 w-5 text-blue-500" />, change: '+20%' },
            ].map((stat, i) => (
              <Card key={i} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} vs. Last Year</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-card/60 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="p-4 border-b">
                <h2 className="font-medium">Monthly Revenue</h2>
              </div>
              
              <div className="p-4 h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                  <p className="text-muted-foreground">
                    Revenue chart visualization would appear here.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-4 border-b">
                <h2 className="font-medium">Expense Breakdown</h2>
              </div>
              
              <div className="p-4 h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                  <p className="text-muted-foreground">
                    Expense breakdown chart would appear here.
                  </p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="p-4 border-b">
                <h2 className="font-medium">Key Performance Indicators</h2>
              </div>
              
              <div className="p-4 space-y-4">
                {[
                  { label: 'Fee Collection Rate', value: '92%', color: 'bg-blue-500' },
                  { label: 'Expense to Revenue Ratio', value: '36%', color: 'bg-amber-500' },
                  { label: 'Fee Waiver Rate', value: '7%', color: 'bg-purple-500' },
                ].map((kpi, index) => {
                  const percentage = parseInt(kpi.value);
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{kpi.label}</div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{kpi.value}</span>
                        </div>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className={`${kpi.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            
            <Card className="col-span-2">
              <div className="p-4 border-b">
                <h2 className="font-medium">Recent Transactions</h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {[...feeCollectionData, ...expensesData].slice(0, 5).map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b last:border-b-0 pb-3 last:pb-0">
                      <div>
                        <p className="font-medium">{item.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {'organization' in item ? item.organization : item.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className={'organization' in item ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {('organization' in item ? '+' : '-') + formatCurrency(item.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="fee-collection" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[250px] pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Organizations</SelectItem>
                  <SelectItem value="abc">ABC School</SelectItem>
                  <SelectItem value="xyz">XYZ Academy</SelectItem>
                  <SelectItem value="city">City College</SelectItem>
                  <SelectItem value="global">Global Institute</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="2023">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button size="sm" className="gap-1">
                <FileUp className="h-4 w-4" />
                Upload Data
              </Button>
            </div>
          </div>
          
          <Card>
            <div className="p-4 border-b">
              <h2 className="font-medium">Fee Collection Records</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="px-4 py-3 text-sm font-medium">ID</th>
                    <th className="px-4 py-3 text-sm font-medium">Organization</th>
                    <th className="px-4 py-3 text-sm font-medium">Type</th>
                    <th className="px-4 py-3 text-sm font-medium">Contact</th>
                    <th className="px-4 py-3 text-sm font-medium">Date</th>
                    <th className="px-4 py-3 text-sm font-medium">Amount</th>
                    <th className="px-4 py-3 text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeeCollection.map((item, index) => (
                    <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm font-mono">{item.id}</td>
                      <td className="px-4 py-3">{item.organization}</td>
                      <td className="px-4 py-3 text-sm">{item.type}</td>
                      <td className="px-4 py-3 text-sm">{item.contact}</td>
                      <td className="px-4 py-3 text-sm">{item.date}</td>
                      <td className="px-4 py-3 text-sm font-mono font-medium text-green-600">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <FileDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredFeeCollection.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-6 text-center text-muted-foreground">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="p-4 border-b">
                <h2 className="font-medium">Fee Collection by Organization</h2>
              </div>
              
              <div className="p-4 h-[250px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                  <p className="text-muted-foreground">
                    Organization-wise fee collection chart would appear here.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-4 border-b">
                <h2 className="font-medium">Monthly Collection Trends</h2>
              </div>
              
              <div className="p-4 h-[250px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                  <p className="text-muted-foreground">
                    Monthly fee collection trends chart would appear here.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search expenses..."
                  className="w-[250px] pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="salaries">Salaries</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="2023">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="gap-1">
                <FileUp className="h-4 w-4" />
                Add Expense
              </Button>
            </div>
          </div>
          
          <Card>
            <div className="p-4 border-b">
              <h2 className="font-medium">Expense Records</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="px-4 py-3 text-sm font-medium">ID</th>
                    <th className="px-4 py-3 text-sm font-medium">Category</th>
                    <th className="px-4 py-3 text-sm font-medium">Description</th>
                    <th className="px-4 py-3 text-sm font-medium">Date</th>
                    <th className="px-4 py-3 text-sm font-medium">Amount</th>
                    <th className="px-4 py-3 text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((item, index) => (
                    <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm font-mono">{item.id}</td>
                      <td className="px-4 py-3">{item.category}</td>
                      <td className="px-4 py-3 text-sm">{item.description}</td>
                      <td className="px-4 py-3 text-sm">{item.date}</td>
                      <td className="px-4 py-3 text-sm font-mono font-medium text-red-600">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <FileDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredExpenses.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="p-4 border-b">
                <h2 className="font-medium">Expenses by Category</h2>
              </div>
              
              <div className="p-4 h-[250px] flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                  <p className="text-muted-foreground">
                    Category-wise expense breakdown chart would appear here.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-4 border-b">
                <h2 className="font-medium">Monthly Expense Trends</h2>
              </div>
              
              <div className="p-4 h-[250px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                  <p className="text-muted-foreground">
                    Monthly expense trends chart would appear here.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="approvals" className="space-y-6 mt-6">
          <Card>
            <div className="p-4 border-b">
              <h2 className="font-medium">Fee Waiver Requests</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="px-4 py-3 text-sm font-medium">ID</th>
                    <th className="px-4 py-3 text-sm font-medium">Student</th>
                    <th className="px-4 py-3 text-sm font-medium">Organization</th>
                    <th className="px-4 py-3 text-sm font-medium">Reason</th>
                    <th className="px-4 py-3 text-sm font-medium">Amount</th>
                    <th className="px-4 py-3 text-sm font-medium">Submitted By</th>
                    <th className="px-4 py-3 text-sm font-medium">Date</th>
                    <th className="px-4 py-3 text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {waiverRequests.map((item, index) => (
                    <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm font-mono">{item.id}</td>
                      <td className="px-4 py-3">{item.student}</td>
                      <td className="px-4 py-3 text-sm">{item.organization}</td>
                      <td className="px-4 py-3 text-sm">{item.reason}</td>
                      <td className="px-4 py-3 text-sm font-mono">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="px-4 py-3 text-sm">{item.submittedBy}</td>
                      <td className="px-4 py-3 text-sm">{item.date}</td>
                      <td className="px-4 py-3">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          {item.status === 'pending' && (
                            <>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600">
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600">
                                <ThumbsDown className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="p-4 border-b">
                <h2 className="font-medium">Approval Overview</h2>
              </div>
              
              <div className="p-6 space-y-4">
                {[
                  { label: 'Pending Approvals', count: waiverRequests.filter(w => w.status === 'pending').length, icon: <Clock className="h-5 w-5 text-amber-500" /> },
                  { label: 'Approved Waivers (This Month)', count: 12, icon: <CheckCircle2 className="h-5 w-5 text-green-500" /> },
                  { label: 'Total Waiver Amount (This Year)', count: formatCurrency(58000), icon: <Users className="h-5 w-5 text-primary" /> },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 pb-4 border-b last:border-b-0">
                    <div className="h-10 w-10 rounded-full bg-card/60 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-lg font-semibold">{item.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card>
              <div className="p-4 border-b">
                <h2 className="font-medium">Approval Guidelines</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-medium">Financial Hardship Criteria</h3>
                  <p className="text-sm text-muted-foreground">
                    Review documentation of financial need. Approve up to 50% waiver based on documented household income.
                  </p>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-medium">Academic Merit Criteria</h3>
                  <p className="text-sm text-muted-foreground">
                    Students with GPA above 3.7 qualify for merit-based fee waivers up to 25%.
                  </p>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-medium">Extenuating Circumstances</h3>
                  <p className="text-sm text-muted-foreground">
                    Special cases like medical emergencies require supporting documentation and can be approved on a case-by-case basis.
                  </p>
                </div>
                
                <Button variant="outline" className="w-full mt-2">View Complete Policy</Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MIS;
