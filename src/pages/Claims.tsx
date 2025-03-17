
import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Search, Filter, Receipt, CheckCircle2, Clock, XCircle, 
  Calendar, FileDown, Printer, Eye, AlertCircle, FileText 
} from 'lucide-react';
import { ClaimsForm } from '@/components/claims/ClaimsForm';

const claimStatusColors = {
  pending: "bg-amber-500/20 text-amber-700",
  approved: "bg-green-500/20 text-green-700",
  rejected: "bg-red-500/20 text-red-700",
  draft: "bg-slate-500/20 text-slate-700",
  paid: "bg-blue-500/20 text-blue-700",
};

const sampleClaims = [
  { 
    id: "CLM-1001", 
    type: "Travel", 
    amount: 350.75, 
    date: "2023-11-05", 
    status: "pending",
    description: "Flight to New York for client meeting"
  },
  { 
    id: "CLM-1002", 
    type: "Accommodation", 
    amount: 520.00, 
    date: "2023-11-04", 
    status: "approved",
    description: "Hotel stay for conference attendance"
  },
  { 
    id: "CLM-1003", 
    type: "Meal", 
    amount: 75.25, 
    date: "2023-11-03", 
    status: "paid",
    description: "Business lunch with client"
  },
  { 
    id: "CLM-1004", 
    type: "Transportation", 
    amount: 45.50, 
    date: "2023-11-02", 
    status: "rejected",
    description: "Taxi fare from airport to hotel"
  },
  { 
    id: "CLM-1005", 
    type: "Supplies", 
    amount: 120.30, 
    date: "2023-11-01", 
    status: "draft",
    description: "Office supplies for remote work"
  },
];

const Claims = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [claims, setClaims] = useState(sampleClaims);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredClaims = claims.filter(claim => 
    claim.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    claim.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPending = claims.filter(c => c.status === "pending").reduce((sum, c) => sum + c.amount, 0);
  const totalApproved = claims.filter(c => c.status === "approved" || c.status === "paid").reduce((sum, c) => sum + c.amount, 0);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "draft":
        return <AlertCircle className="h-4 w-4 text-slate-500" />;
      case "paid":
        return <Receipt className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Claims & Reimbursements</h1>
          <p className="text-muted-foreground">Manage your expense claims and reimbursements</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Claim
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <ClaimsForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Pending Claims', value: claims.filter(c => c.status === "pending").length, amount: formatCurrency(totalPending) },
          { label: 'Approved Amount', value: formatCurrency(totalApproved), color: 'text-green-600' },
          { label: 'Next Payment Date', value: '15 Dec, 2023', icon: <Calendar className="h-4 w-4" /> },
        ].map((stat, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className={`text-xl font-semibold mt-1 ${stat.color || ''}`}>{stat.value}</div>
              </div>
              {stat.amount && (
                <div className="text-sm text-muted-foreground">{stat.amount}</div>
              )}
              {stat.icon && (
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  {stat.icon}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      <Card>
        <div className="p-4 border-b">
          <h2 className="font-medium">Your Claims</h2>
        </div>
        
        <div className="p-4">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All Claims</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search claims..."
                    className="w-full md:w-[200px] pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="icon">
                  <FileDown className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <ClaimsTable 
                claims={filteredClaims} 
                getStatusIcon={getStatusIcon} 
                formatCurrency={formatCurrency} 
                statuses={claimStatusColors}
              />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <ClaimsTable 
                claims={filteredClaims.filter(c => c.status === 'pending')} 
                getStatusIcon={getStatusIcon} 
                formatCurrency={formatCurrency} 
                statuses={claimStatusColors}
              />
            </TabsContent>
            
            <TabsContent value="approved" className="mt-0">
              <ClaimsTable 
                claims={filteredClaims.filter(c => c.status === 'approved' || c.status === 'paid')} 
                getStatusIcon={getStatusIcon} 
                formatCurrency={formatCurrency} 
                statuses={claimStatusColors}
              />
            </TabsContent>
            
            <TabsContent value="rejected" className="mt-0">
              <ClaimsTable 
                claims={filteredClaims.filter(c => c.status === 'rejected')} 
                getStatusIcon={getStatusIcon} 
                formatCurrency={formatCurrency} 
                statuses={claimStatusColors}
              />
            </TabsContent>
            
            <TabsContent value="draft" className="mt-0">
              <ClaimsTable 
                claims={filteredClaims.filter(c => c.status === 'draft')} 
                getStatusIcon={getStatusIcon} 
                formatCurrency={formatCurrency} 
                statuses={claimStatusColors}
              />
            </TabsContent>
          </Tabs>
        </div>
      </Card>
      
      <Card>
        <div className="p-4 border-b">
          <h2 className="font-medium">Claim Policies</h2>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: 'Travel Policy', 
              icon: <FileText className="h-5 w-5" />, 
              description: 'Guidelines for travel expenses and reimbursement procedures.' 
            },
            { 
              title: 'Meal & Entertainment', 
              icon: <FileText className="h-5 w-5" />, 
              description: 'Rules for claiming meal expenses during business activities.' 
            },
            { 
              title: 'Equipment & Supplies', 
              icon: <FileText className="h-5 w-5" />, 
              description: 'Procedures for purchasing and claiming office equipment.' 
            },
          ].map((policy, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                {policy.icon}
              </div>
              <h3 className="font-medium mb-1">{policy.title}</h3>
              <p className="text-sm text-muted-foreground">{policy.description}</p>
              <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                View Policy
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

interface ClaimsTableProps {
  claims: any[];
  getStatusIcon: (status: string) => JSX.Element | null;
  formatCurrency: (amount: number) => string;
  statuses: Record<string, string>;
}

const ClaimsTable: React.FC<ClaimsTableProps> = ({ 
  claims, 
  getStatusIcon, 
  formatCurrency,
  statuses
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="px-4 py-3 text-sm font-medium">ID</th>
            <th className="px-4 py-3 text-sm font-medium">Type</th>
            <th className="px-4 py-3 text-sm font-medium">Description</th>
            <th className="px-4 py-3 text-sm font-medium">Date</th>
            <th className="px-4 py-3 text-sm font-medium">Amount</th>
            <th className="px-4 py-3 text-sm font-medium">Status</th>
            <th className="px-4 py-3 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                No claims found.
              </td>
            </tr>
          ) : (
            claims.map((claim) => (
              <tr key={claim.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="px-4 py-3 text-sm">{claim.id}</td>
                <td className="px-4 py-3 text-sm">{claim.type}</td>
                <td className="px-4 py-3 text-sm max-w-[200px] truncate">
                  {claim.description}
                </td>
                <td className="px-4 py-3 text-sm">{claim.date}</td>
                <td className="px-4 py-3 text-sm font-mono">{formatCurrency(claim.amount)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(claim.status)}
                    <Badge className={statuses[claim.status]}>
                      {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                    </Badge>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Claims;
