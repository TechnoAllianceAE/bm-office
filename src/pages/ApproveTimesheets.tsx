
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Briefcase, CheckCircle, XCircle, Clock, 
  Search, Filter, Calendar, ChevronDown, Download
} from 'lucide-react';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

// Define the Employee type locally since we're not using the User type directly
type Employee = {
  name: string;
  email: string;
  avatar: string;
  designation: string;
};

// Define the timesheet type locally
type Timesheet = {
  id: string;
  employee: Employee;
  weekEnding: string;
  totalHours: number;
  projects: { name: string; hours: number }[];
  status: string;
  submittedOn: string;
};

// Mock data for timesheets pending approval
const timesheets: Timesheet[] = [
  {
    id: 'ts-1',
    employee: {
      name: 'Alex Johnson',
      email: 'alex.j@bmoffice.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      designation: 'Frontend Developer'
    },
    weekEnding: '2023-09-24',
    totalHours: 40,
    projects: [
      { name: 'Website Redesign', hours: 25 },
      { name: 'Mobile App Development', hours: 15 }
    ],
    status: 'pending_first_approval',
    submittedOn: '2023-09-25T10:30:00Z'
  },
  {
    id: 'ts-2',
    employee: {
      name: 'Maria Garcia',
      email: 'maria.g@bmoffice.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
      designation: 'UI/UX Designer'
    },
    weekEnding: '2023-09-24',
    totalHours: 38,
    projects: [
      { name: 'Website Redesign', hours: 30 },
      { name: 'Brand Guidelines', hours: 8 }
    ],
    status: 'pending_first_approval',
    submittedOn: '2023-09-25T09:15:00Z'
  },
  {
    id: 'ts-3',
    employee: {
      name: 'John Smith',
      email: 'john.s@bmoffice.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
      designation: 'Backend Developer'
    },
    weekEnding: '2023-09-24',
    totalHours: 42,
    projects: [
      { name: 'API Integration', hours: 30 },
      { name: 'Database Optimization', hours: 12 }
    ],
    status: 'pending_second_approval',
    submittedOn: '2023-09-25T11:45:00Z'
  },
  {
    id: 'ts-4',
    employee: {
      name: 'Sarah Williams',
      email: 'sarah.w@bmoffice.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
      designation: 'Project Manager'
    },
    weekEnding: '2023-09-24',
    totalHours: 45,
    projects: [
      { name: 'Client Meetings', hours: 15 },
      { name: 'Project Planning', hours: 20 },
      { name: 'Team Coordination', hours: 10 }
    ],
    status: 'pending_first_approval',
    submittedOn: '2023-09-25T08:30:00Z'
  }
];

// Daily timesheet entries for the detailed view
const dailyEntries = [
  { day: 'Monday', date: '2023-09-18', project: 'Website Redesign', task: 'Component Development', hours: 8 },
  { day: 'Tuesday', date: '2023-09-19', project: 'Website Redesign', task: 'Animation Implementation', hours: 7 },
  { day: 'Wednesday', date: '2023-09-20', project: 'Website Redesign', task: 'Bug Fixes', hours: 5 },
  { day: 'Wednesday', date: '2023-09-20', project: 'Mobile App Development', task: 'UI Implementation', hours: 3 },
  { day: 'Thursday', date: '2023-09-21', project: 'Mobile App Development', task: 'Testing', hours: 8 },
  { day: 'Friday', date: '2023-09-22', project: 'Website Redesign', task: 'Code Review', hours: 5 },
  { day: 'Friday', date: '2023-09-22', project: 'Mobile App Development', task: 'Feature Development', hours: 4 }
];

const ApproveTimesheets = () => {
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(null);
  const [viewMode, setViewMode] = useState<'summary' | 'daily'>('summary');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleApprove = (id: string, level: 'first' | 'second') => {
    // Here you would normally update the status in your backend
    toast({
      title: "Timesheet Approved",
      description: `You have approved timesheet #${id.substring(3)}`,
    });
  };

  const handleReject = (id: string) => {
    // Here you would normally update the status in your backend
    toast({
      title: "Timesheet Rejected",
      description: `You have rejected timesheet #${id.substring(3)}`,
      variant: "destructive",
    });
  };

  const filteredTimesheets = timesheets.filter(timesheet => {
    if (filterStatus !== 'all' && timesheet.status !== filterStatus) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        timesheet.employee.name.toLowerCase().includes(query) ||
        timesheet.employee.email.toLowerCase().includes(query) ||
        timesheet.projects.some(p => p.name.toLowerCase().includes(query))
      );
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_first_approval':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Pending 1st Approval</Badge>;
      case 'pending_second_approval':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Pending 2nd Approval</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Approve Timesheets</h1>
          <p className="text-muted-foreground">Review and approve team timesheets</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or project..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                All Timesheets
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterStatus('pending_first_approval')}>
                Pending 1st Approval
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus('pending_second_approval')}>
                Pending 2nd Approval
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Week
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Timesheets Pending Approval</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Week Ending</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTimesheets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No timesheets found matching your criteria
                  </TableCell>
                </TableRow>
              ) : (
                filteredTimesheets.map((timesheet) => (
                  <TableRow key={timesheet.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={timesheet.employee.avatar} alt={timesheet.employee.name} />
                          <AvatarFallback>
                            {timesheet.employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{timesheet.employee.name}</div>
                          <div className="text-xs text-muted-foreground">{timesheet.employee.designation}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        {new Date(timesheet.weekEnding).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {timesheet.totalHours} hrs
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {timesheet.projects.map((project, index) => (
                          <div key={index} className="flex items-center gap-1 text-sm">
                            <Briefcase className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="truncate max-w-[150px]">{project.name}</span>
                            <span className="text-xs text-muted-foreground">({project.hours} hrs)</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(timesheet.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedTimesheet(timesheet)}>
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Timesheet Details</DialogTitle>
                              <DialogDescription>
                                Week ending {new Date(timesheet?.weekEnding || '').toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedTimesheet && (
                              <div className="mt-4">
                                <div className="flex items-center gap-3 mb-4">
                                  <Avatar>
                                    <AvatarImage src={selectedTimesheet.employee.avatar} alt={selectedTimesheet.employee.name} />
                                    <AvatarFallback>
                                      {selectedTimesheet.employee.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-medium">{selectedTimesheet.employee.name}</h3>
                                    <p className="text-sm text-muted-foreground">{selectedTimesheet.employee.designation}</p>
                                  </div>
                                  <div className="ml-auto">
                                    {getStatusBadge(selectedTimesheet.status)}
                                  </div>
                                </div>
                                
                                <div className="bg-muted p-3 rounded-md mb-4">
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                      <div className="text-xs text-muted-foreground">Submitted On</div>
                                      <div className="text-sm font-medium">
                                        {new Date(selectedTimesheet.submittedOn).toLocaleString()}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-muted-foreground">Total Hours</div>
                                      <div className="text-sm font-medium">{selectedTimesheet.totalHours} hours</div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-muted-foreground">Projects</div>
                                      <div className="text-sm font-medium">{selectedTimesheet.projects.length}</div>
                                    </div>
                                  </div>
                                </div>
                                
                                <Tabs defaultValue="summary" className="w-full mb-4" onValueChange={(value) => setViewMode(value as 'summary' | 'daily')}>
                                  <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="summary">Project Summary</TabsTrigger>
                                    <TabsTrigger value="daily">Daily Entries</TabsTrigger>
                                  </TabsList>
                                  
                                  <TabsContent value="summary" className="mt-4">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Project</TableHead>
                                          <TableHead className="text-right">Hours</TableHead>
                                          <TableHead className="text-right">% of Time</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {selectedTimesheet.projects.map((project, idx) => (
                                          <TableRow key={idx}>
                                            <TableCell>
                                              <div className="flex items-center gap-2">
                                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                                {project.name}
                                              </div>
                                            </TableCell>
                                            <TableCell className="text-right">{project.hours}</TableCell>
                                            <TableCell className="text-right">
                                              {Math.round((project.hours / selectedTimesheet.totalHours) * 100)}%
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TabsContent>
                                  
                                  <TabsContent value="daily" className="mt-4">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Day</TableHead>
                                          <TableHead>Project</TableHead>
                                          <TableHead>Task</TableHead>
                                          <TableHead className="text-right">Hours</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {dailyEntries.map((entry, idx) => (
                                          <TableRow key={idx}>
                                            <TableCell>
                                              <div>
                                                <div className="font-medium">{entry.day}</div>
                                                <div className="text-xs text-muted-foreground">{entry.date}</div>
                                              </div>
                                            </TableCell>
                                            <TableCell>{entry.project}</TableCell>
                                            <TableCell>{entry.task}</TableCell>
                                            <TableCell className="text-right">{entry.hours}</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TabsContent>
                                </Tabs>
                                
                                <div className="flex justify-between mt-6">
                                  <Button variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export PDF
                                  </Button>
                                  
                                  <div className="flex gap-2">
                                    <Button 
                                      variant="outline" 
                                      className="text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                                      onClick={() => handleReject(selectedTimesheet.id)}
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                    {selectedTimesheet.status === 'pending_first_approval' && (
                                      <Button 
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                        onClick={() => handleApprove(selectedTimesheet.id, 'first')}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Approve
                                      </Button>
                                    )}
                                    {selectedTimesheet.status === 'pending_second_approval' && (
                                      <Button 
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                        onClick={() => handleApprove(selectedTimesheet.id, 'second')}
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Final Approval
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        {timesheet.status === 'pending_first_approval' && (
                          <Button 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            size="sm"
                            onClick={() => handleApprove(timesheet.id, 'first')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        )}
                        {timesheet.status === 'pending_second_approval' && (
                          <Button 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            size="sm"
                            onClick={() => handleApprove(timesheet.id, 'second')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Final Approve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ApproveTimesheets;
