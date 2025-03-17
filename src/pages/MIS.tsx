
import React, { useState } from 'react';
import { 
  BarChart3, PieChart, ChevronRight, FileCheck, Clock, CheckCircle2, XCircle, AlertCircle,
  Download, Filter, Printer, RefreshCw
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MIS = () => {
  const [approvalRequests, setApprovalRequests] = useState([
    { id: 1, title: 'Annual Budget Approval', department: 'Finance', priority: 'High', status: 'Pending', date: '2023-11-10' },
    { id: 2, title: 'Marketing Campaign Expenditure', department: 'Marketing', priority: 'Medium', status: 'Pending', date: '2023-11-09' },
    { id: 3, title: 'IT Infrastructure Upgrade', department: 'IT', priority: 'High', status: 'Pending', date: '2023-11-08' },
    { id: 4, title: 'New Product Launch Budget', department: 'Product', priority: 'Medium', status: 'Approved', date: '2023-11-07' },
    { id: 5, title: 'Training Program Funding', department: 'HR', priority: 'Low', status: 'Rejected', date: '2023-11-05' },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'Rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-amber-100 text-amber-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">MIS Dashboard</h1>
          <p className="text-muted-foreground">Management Information System</p>
        </div>
        
        <div className="flex gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Reports</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2">
                    <li>
                      <NavigationMenuLink className="flex p-2 hover:bg-accent rounded-md">
                        <BarChart3 className="mr-2 h-5 w-5" />
                        <div>
                          <div className="text-sm font-medium">Financial Reports</div>
                          <div className="text-xs text-muted-foreground">
                            View revenue, expenses and budget reports
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className="flex p-2 hover:bg-accent rounded-md">
                        <PieChart className="mr-2 h-5 w-5" />
                        <div>
                          <div className="text-sm font-medium">Department Analytics</div>
                          <div className="text-xs text-muted-foreground">
                            Performance metrics by department
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className="flex p-2 hover:bg-accent rounded-md">
                        <FileCheck className="mr-2 h-5 w-5" />
                        <div>
                          <div className="text-sm font-medium">Compliance Reports</div>
                          <div className="text-xs text-muted-foreground">
                            Regulatory and policy compliance status
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className="flex p-2 hover:bg-accent rounded-md">
                        <Clock className="mr-2 h-5 w-5" />
                        <div>
                          <div className="text-sm font-medium">Operational Metrics</div>
                          <div className="text-xs text-muted-foreground">
                            Efficiency and productivity statistics
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <div className="p-4 border-b">
            <h2 className="font-medium flex items-center">
              Revenue Overview
              <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </h2>
          </div>
          <div className="p-6 aspect-[2/1] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p>Financial performance charts will appear here</p>
              <p className="text-sm">Connect to your data source to view analytics</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4 border-b">
            <h2 className="font-medium">Key Performance Indicators</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: 'Revenue Growth', value: '8.3%', change: '+2.1%', positive: true },
              { label: 'Operational Costs', value: '$1.2M', change: '-3.5%', positive: true },
              { label: 'Customer Satisfaction', value: '92%', change: '+1.2%', positive: true },
              { label: 'Employee Efficiency', value: '87%', change: '-0.5%', positive: false },
            ].map((kpi, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">{kpi.label}</div>
                  <div className="text-muted-foreground text-xs">{kpi.value}</div>
                </div>
                <div className={`text-sm ${kpi.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.change}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <Card>
        <div className="p-4 border-b">
          <h2 className="font-medium">Approval Requests</h2>
        </div>
        
        <div className="p-4">
          <Tabs defaultValue="pending" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <TabsContent value="pending" className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="px-4 py-3 text-sm font-medium">Request</th>
                      <th className="px-4 py-3 text-sm font-medium">Department</th>
                      <th className="px-4 py-3 text-sm font-medium">Priority</th>
                      <th className="px-4 py-3 text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-sm font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalRequests
                      .filter(req => req.status === 'Pending')
                      .map(request => (
                        <tr key={request.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="font-medium">{request.title}</div>
                          </td>
                          <td className="px-4 py-3 text-sm">{request.department}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(request.priority)}`}>
                              {request.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(request.status)}
                              <span className="text-sm">{request.status}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{request.date}</td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="h-8">View</Button>
                              <Button size="sm" className="h-8">Approve</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="approved" className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="px-4 py-3 text-sm font-medium">Request</th>
                      <th className="px-4 py-3 text-sm font-medium">Department</th>
                      <th className="px-4 py-3 text-sm font-medium">Priority</th>
                      <th className="px-4 py-3 text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-sm font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalRequests
                      .filter(req => req.status === 'Approved')
                      .map(request => (
                        <tr key={request.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="font-medium">{request.title}</div>
                          </td>
                          <td className="px-4 py-3 text-sm">{request.department}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(request.priority)}`}>
                              {request.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(request.status)}
                              <span className="text-sm">{request.status}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{request.date}</td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="h-8">View</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="rejected" className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="px-4 py-3 text-sm font-medium">Request</th>
                      <th className="px-4 py-3 text-sm font-medium">Department</th>
                      <th className="px-4 py-3 text-sm font-medium">Priority</th>
                      <th className="px-4 py-3 text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-sm font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalRequests
                      .filter(req => req.status === 'Rejected')
                      .map(request => (
                        <tr key={request.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="font-medium">{request.title}</div>
                          </td>
                          <td className="px-4 py-3 text-sm">{request.department}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(request.priority)}`}>
                              {request.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(request.status)}
                              <span className="text-sm">{request.status}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{request.date}</td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="h-8">View</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="px-4 py-3 text-sm font-medium">Request</th>
                      <th className="px-4 py-3 text-sm font-medium">Department</th>
                      <th className="px-4 py-3 text-sm font-medium">Priority</th>
                      <th className="px-4 py-3 text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-sm font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalRequests.map(request => (
                      <tr key={request.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div className="font-medium">{request.title}</div>
                        </td>
                        <td className="px-4 py-3 text-sm">{request.department}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(request.priority)}`}>
                            {request.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(request.status)}
                            <span className="text-sm">{request.status}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{request.date}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="h-8">View</Button>
                            {request.status === 'Pending' && (
                              <Button size="sm" className="h-8">Approve</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default MIS;
