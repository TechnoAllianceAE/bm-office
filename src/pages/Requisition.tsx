import React, { useState } from 'react';
import { 
  Plus, Search, Filter, FileDown, Printer, ChevronDown, 
  CheckCircle2, XCircle, Clock, AlertCircle, Eye, ThumbsUp, ThumbsDown 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from '@/components/common/Card';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewRequisitionForm } from '@/components/requisition/NewRequisitionForm';

type RequisitionStatus = 'Pending' | 'Approved' | 'Rejected' | 'Draft';

interface Requisition {
  id: string;
  title: string;
  requestor: string;
  department: string;
  amount: number;
  date: string;
  status: RequisitionStatus;
  category: string;
}

const Requisition = () => {
  const [requisitions, setRequisitions] = useState<Requisition[]>([
    { 
      id: 'REQ-2023-001', 
      title: 'Office Supplies', 
      requestor: 'John Smith', 
      department: 'Admin',
      amount: 1250.50,
      date: '2023-11-05',
      status: 'Pending',
      category: 'Supplies'
    },
    { 
      id: 'REQ-2023-002', 
      title: 'Marketing Materials', 
      requestor: 'Sarah Johnson', 
      department: 'Marketing',
      amount: 3500.00,
      date: '2023-11-03',
      status: 'Approved',
      category: 'Marketing'
    },
    { 
      id: 'REQ-2023-003', 
      title: 'Computer Hardware', 
      requestor: 'Michael Chen', 
      department: 'IT',
      amount: 12700.00,
      date: '2023-11-02',
      status: 'Pending',
      category: 'IT Equipment'
    },
    { 
      id: 'REQ-2023-004', 
      title: 'Software Licenses', 
      requestor: 'Emily Taylor', 
      department: 'IT',
      amount: 8900.00,
      date: '2023-10-30',
      status: 'Rejected',
      category: 'Software'
    },
    { 
      id: 'REQ-2023-005', 
      title: 'Training Materials', 
      requestor: 'David Wilson', 
      department: 'HR',
      amount: 2100.00,
      date: '2023-10-28',
      status: 'Approved',
      category: 'Training'
    },
    { 
      id: 'REQ-2023-006', 
      title: 'Conference Room Equipment', 
      requestor: 'Lisa Brown', 
      department: 'Facilities',
      amount: 5750.00,
      date: '2023-10-25',
      status: 'Draft',
      category: 'Equipment'
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleNewRequisition = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const getStatusIcon = (status: RequisitionStatus) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'Rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'Draft':
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Requisition Management</h1>
          <p className="text-muted-foreground">Manage procurement requests and approvals</p>
        </div>
        
        <Button className="gap-2" onClick={handleNewRequisition}>
          <Plus className="h-4 w-4" />
          New Requisition
        </Button>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl bg-white/95 backdrop-blur-md">
          <NewRequisitionForm onClose={handleCloseForm} />
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Requisitions', value: requisitions.length, color: 'bg-blue-100 text-blue-700' },
          { label: 'Pending Approvals', value: requisitions.filter(r => r.status === 'Pending').length, color: 'bg-amber-100 text-amber-700' },
          { label: 'Approved This Month', value: requisitions.filter(r => r.status === 'Approved').length, color: 'bg-green-100 text-green-700' },
          { label: 'Total Amount', value: formatCurrency(requisitions.reduce((sum, req) => sum + req.amount, 0)), color: 'bg-purple-100 text-purple-700' },
        ].map((stat, i) => (
          <Card key={i} className="p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className={`text-2xl font-semibold ${stat.color.split(' ')[1]}`}>{stat.value}</span>
            </div>
          </Card>
        ))}
      </div>
      
      <Card>
        <div className="p-4 border-b">
          <h2 className="font-medium">Requisition Requests</h2>
        </div>
        
        <div className="p-4">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full md:w-[200px] pl-8"
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Filter by Department</DropdownMenuItem>
                    <DropdownMenuItem>Filter by Category</DropdownMenuItem>
                    <DropdownMenuItem>Filter by Date</DropdownMenuItem>
                    <DropdownMenuItem>Filter by Amount</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="outline" size="icon">
                  <FileDown className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <RequisitionTable 
                requisitions={requisitions} 
                getStatusIcon={getStatusIcon} 
                formatCurrency={formatCurrency} 
              />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <RequisitionTable 
                requisitions={requisitions.filter(r => r.status === 'Pending')} 
                getStatusIcon={getStatusIcon} 
                formatCurrency={formatCurrency} 
              />
            </TabsContent>
            
            <TabsContent value="approved" className="mt-0">
              <RequisitionTable 
                requisitions={requisitions.filter(r => r.status === 'Approved')} 
                getStatusIcon={getStatusIcon} 
                formatCurrency={formatCurrency} 
              />
            </TabsContent>
            
            <TabsContent value="rejected" className="mt-0">
              <RequisitionTable 
                requisitions={requisitions.filter(r => r.status === 'Rejected')} 
                getStatusIcon={getStatusIcon} 
                formatCurrency={formatCurrency} 
              />
            </TabsContent>
            
            <TabsContent value="draft" className="mt-0">
              <RequisitionTable 
                requisitions={requisitions.filter(r => r.status === 'Draft')} 
                getStatusIcon={getStatusIcon} 
                formatCurrency={formatCurrency} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

interface RequisitionTableProps {
  requisitions: Requisition[];
  getStatusIcon: (status: RequisitionStatus) => JSX.Element | null;
  formatCurrency: (amount: number) => string;
}

const RequisitionTable: React.FC<RequisitionTableProps> = ({ 
  requisitions, 
  getStatusIcon, 
  formatCurrency 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="px-4 py-3 text-sm font-medium">ID</th>
            <th className="px-4 py-3 text-sm font-medium">Title</th>
            <th className="px-4 py-3 text-sm font-medium">Requestor</th>
            <th className="px-4 py-3 text-sm font-medium">Department</th>
            <th className="px-4 py-3 text-sm font-medium">Category</th>
            <th className="px-4 py-3 text-sm font-medium">Amount</th>
            <th className="px-4 py-3 text-sm font-medium">Date</th>
            <th className="px-4 py-3 text-sm font-medium">Status</th>
            <th className="px-4 py-3 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requisitions.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-4 py-6 text-center text-muted-foreground">
                No requisitions found.
              </td>
            </tr>
          ) : (
            requisitions.map((req) => (
              <tr key={req.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="px-4 py-3 text-sm">{req.id}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{req.title}</div>
                </td>
                <td className="px-4 py-3 text-sm">{req.requestor}</td>
                <td className="px-4 py-3 text-sm">{req.department}</td>
                <td className="px-4 py-3 text-sm">{req.category}</td>
                <td className="px-4 py-3 text-sm font-mono">{formatCurrency(req.amount)}</td>
                <td className="px-4 py-3 text-sm">{req.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(req.status)}
                    <span className="text-sm">{req.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {req.status === 'Pending' && (
                      <>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:bg-green-100">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-100">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Requisition;
