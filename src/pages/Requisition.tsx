
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { PlusCircle, Search, Filter, Clipboard, FileText, Clock, CheckCircle2, XCircle, SortAsc, Download } from 'lucide-react';

const Requisition = () => {
  const [activeTab, setActiveTab] = useState("my-requisitions");
  const [isNewRequisitionOpen, setIsNewRequisitionOpen] = useState(false);
  
  const requisitionData = [
    { id: 'REQ-2023-001', title: 'Office Supplies', department: 'Admin', amount: '$350', status: 'Pending', priority: 'Low', date: '2023-06-15' },
    { id: 'REQ-2023-002', title: 'Development Software', department: 'IT', amount: '$1,200', status: 'Approved', priority: 'High', date: '2023-06-12' },
    { id: 'REQ-2023-003', title: 'Marketing Materials', department: 'Marketing', amount: '$750', status: 'Rejected', priority: 'Medium', date: '2023-06-10' },
    { id: 'REQ-2023-004', title: 'Training Equipment', department: 'HR', amount: '$2,100', status: 'Approved', priority: 'Medium', date: '2023-06-08' },
    { id: 'REQ-2023-005', title: 'Server Hardware', department: 'IT', amount: '$5,600', status: 'Pending', priority: 'High', date: '2023-06-05' },
  ];
  
  const approvalData = [
    { id: 'REQ-2023-006', title: 'Team Building Event', requester: 'Sarah Johnson', department: 'HR', amount: '$1,800', status: 'Pending', priority: 'Medium', date: '2023-06-14' },
    { id: 'REQ-2023-007', title: 'Customer Database Software', requester: 'Michael Chen', department: 'Sales', amount: '$3,400', status: 'Pending', priority: 'High', date: '2023-06-13' },
    { id: 'REQ-2023-008', title: 'Office Furniture', requester: 'David Williams', department: 'Admin', amount: '$2,250', status: 'Pending', priority: 'Low', date: '2023-06-11' },
  ];
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'Rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return <Badge variant="outline" className="text-red-500 border-red-500">High</Badge>;
      case 'Medium':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline" className="text-green-500 border-green-500">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Requisition Management</h1>
          <p className="text-muted-foreground">Manage procurement requests and approvals</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={isNewRequisitionOpen} onOpenChange={setIsNewRequisitionOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                <span>New Requisition</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Requisition</DialogTitle>
                <DialogDescription>
                  Fill in the details for your procurement request.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Requisition Title</Label>
                  <Input id="title" placeholder="Enter a title for this request" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Estimated Amount</Label>
                  <Input id="amount" placeholder="$0.00" type="text" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Provide details about your request" rows={4} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="justification">Business Justification</Label>
                  <Textarea id="justification" placeholder="Why is this purchase necessary?" rows={2} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsNewRequisitionOpen(false)}>Cancel</Button>
                <Button type="submit" onClick={() => setIsNewRequisitionOpen(false)}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search requisitions..." className="pl-10 w-full sm:w-[300px]" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <SortAsc className="h-4 w-4" />
            <span>Sort</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="my-requisitions" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-3 mb-4">
          <TabsTrigger value="my-requisitions">My Requisitions</TabsTrigger>
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="all-requisitions">All Requisitions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-requisitions" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">ID</th>
                      <th className="text-left py-3 px-4">Title</th>
                      <th className="text-left py-3 px-4">Department</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Priority</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requisitionData.map((req) => (
                      <tr key={req.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{req.id}</td>
                        <td className="py-3 px-4">{req.title}</td>
                        <td className="py-3 px-4">{req.department}</td>
                        <td className="py-3 px-4">{req.amount}</td>
                        <td className="py-3 px-4">{getStatusBadge(req.status)}</td>
                        <td className="py-3 px-4">{getPriorityBadge(req.priority)}</td>
                        <td className="py-3 px-4">{format(new Date(req.date), 'MMM dd, yyyy')}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Clipboard className="h-4 w-4" />
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
        
        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">ID</th>
                      <th className="text-left py-3 px-4">Title</th>
                      <th className="text-left py-3 px-4">Requester</th>
                      <th className="text-left py-3 px-4">Department</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Priority</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalData.map((req) => (
                      <tr key={req.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{req.id}</td>
                        <td className="py-3 px-4">{req.title}</td>
                        <td className="py-3 px-4">{req.requester}</td>
                        <td className="py-3 px-4">{req.department}</td>
                        <td className="py-3 px-4">{req.amount}</td>
                        <td className="py-3 px-4">{getPriorityBadge(req.priority)}</td>
                        <td className="py-3 px-4">{format(new Date(req.date), 'MMM dd, yyyy')}</td>
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
        
        <TabsContent value="all-requisitions" className="space-y-4">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-medium mb-2">Enterprise View</h3>
              <p className="text-muted-foreground mb-4">This view requires additional permissions.</p>
              <Button>Request Access</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Requisition;
