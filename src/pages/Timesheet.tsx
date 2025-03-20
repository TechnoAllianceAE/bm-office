
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus,
  Edit,
  Trash,
  Download
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface TimeEntry {
  id: string;
  date: Date;
  project: string;
  task: string;
  hours: number;
  description: string;
}

const sampleTimeEntries: TimeEntry[] = [
  {
    id: '1',
    date: new Date(2023, 8, 18),
    project: 'Website Redesign',
    task: 'Frontend Development',
    hours: 3.5,
    description: 'Implemented new homepage components'
  },
  {
    id: '2',
    date: new Date(2023, 8, 18),
    project: 'Mobile App',
    task: 'API Integration',
    hours: 4,
    description: 'Connected user profile endpoints'
  },
  {
    id: '3',
    date: new Date(2023, 8, 19),
    project: 'Website Redesign',
    task: 'UX Improvements',
    hours: 2.5,
    description: 'Enhanced form validation feedback'
  },
  {
    id: '4',
    date: new Date(2023, 8, 19),
    project: 'Marketing Campaign',
    task: 'Content Creation',
    hours: 4,
    description: 'Wrote copy for landing pages'
  },
  {
    id: '5',
    date: new Date(2023, 8, 20),
    project: 'Mobile App',
    task: 'Bug Fixes',
    hours: 5,
    description: 'Fixed authentication issues'
  },
];

const projectOptions = [
  'Website Redesign',
  'Mobile App',
  'Marketing Campaign',
  'Product Launch',
  'Internal Tools'
];

const Timesheet = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(sampleTimeEntries);
  const [selectedWeek, setSelectedWeek] = useState<Date | undefined>(new Date());

  const handleAddTimeEntry = () => {
    toast.success('Time entry added successfully');
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs defaultValue="week" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid w-[400px] grid-cols-3">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedWeek ? (
                      format(selectedWeek, "MMM d, yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedWeek}
                    onSelect={setSelectedWeek}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <TabsContent value="day" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            id="date"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="project">Project</Label>
                      <Select>
                        <SelectTrigger id="project">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectOptions.map((project) => (
                            <SelectItem key={project} value={project}>{project}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="task">Task</Label>
                      <Input id="task" placeholder="Enter task name" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="hours">Hours</Label>
                      <div className="flex items-center">
                        <Input
                          id="hours"
                          type="number"
                          min="0"
                          step="0.5"
                          placeholder="0.0"
                          className="w-24"
                        />
                        <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        placeholder="What did you work on?"
                        className="h-[104px]"
                      />
                    </div>
                  </div>
                </div>
                
                <Button className="mt-6 w-full" onClick={handleAddTimeEntry}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Time Entry
                </Button>
              </CardContent>
            </Card>
            
            <h3 className="text-lg font-medium mt-6 mb-3">Today's Entries</h3>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeEntries
                      .filter(entry => format(entry.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'))
                      .map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">{entry.project}</TableCell>
                          <TableCell>{entry.task}</TableCell>
                          <TableCell>{entry.hours}</TableCell>
                          <TableCell className="max-w-[300px] truncate">{entry.description}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="week">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{format(entry.date, 'MMM d')}</TableCell>
                        <TableCell className="font-medium">{entry.project}</TableCell>
                        <TableCell>{entry.task}</TableCell>
                        <TableCell>{entry.hours}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{entry.description}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4 flex justify-between items-center py-2 px-4 bg-muted rounded-md">
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-sm text-muted-foreground">Total Hours</span>
                      <p className="font-medium">19.0h</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Billable</span>
                      <p className="font-medium">17.5h</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Non-Billable</span>
                      <p className="font-medium">1.5h</p>
                    </div>
                  </div>
                  
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="month">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Monthly View Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're working on a comprehensive monthly timesheet view.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Timesheet;
