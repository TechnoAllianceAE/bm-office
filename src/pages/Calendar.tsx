
import React, { useState } from 'react';
import { Calendar as CalendarIcon, PlusCircle, Video, FileText, Laptop, RotateCw, CheckCircle, Users } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const meetings = [
  { 
    id: 1, 
    title: 'Product Team Weekly Sync', 
    time: '9:00 AM - 10:00 AM', 
    attendees: ['Alice Smith', 'Bob Johnson', 'Charlie Lee'],
    type: 'google'
  },
  { 
    id: 2, 
    title: 'Client Presentation', 
    time: '11:30 AM - 12:30 PM', 
    attendees: ['Diana Wang', 'Ethan Brown'],
    type: 'teams'
  },
  { 
    id: 3, 
    title: 'Design Review', 
    time: '2:00 PM - 3:00 PM', 
    attendees: ['Fiona Garcia', 'George Kim', 'Hannah Wilson'],
    type: 'google'
  },
];

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showSyncDialog, setShowSyncDialog] = useState(false);
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and meetings</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Dialog open={showSyncDialog} onOpenChange={setShowSyncDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <RotateCw className="h-4 w-4" />
                <span>Sync Calendar</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sync with External Calendar</DialogTitle>
                <DialogDescription>
                  Connect your external calendar to keep everything in sync.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6 py-4">
                <Button variant="outline" className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <CalendarIcon className="h-4 w-4 text-red-500" />
                    </div>
                    <span>Google Calendar</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Connect</span>
                </Button>
                
                <Button variant="outline" className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <CalendarIcon className="h-4 w-4 text-blue-500" />
                    </div>
                    <span>Microsoft Outlook</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Connect</span>
                </Button>
                
                <Button variant="outline" className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <span>Apple Calendar</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Connect</span>
                </Button>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowSyncDialog(false)}>Cancel</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showMeetingDialog} onOpenChange={setShowMeetingDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Schedule Meeting</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Schedule a New Meeting</DialogTitle>
                <DialogDescription>
                  Create a new meeting and invite participants.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">Meeting Title</label>
                  <Input id="title" placeholder="Enter meeting title" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Time</label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Meeting Platform</label>
                  <Select defaultValue="google">
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-red-500" />
                          <span>Google Meet</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="teams">
                        <div className="flex items-center gap-2">
                          <Laptop className="h-4 w-4 text-blue-500" />
                          <span>Microsoft Teams</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Participants</label>
                  <Input placeholder="Enter email addresses (comma separated)" />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input placeholder="Add meeting details" />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowMeetingDialog(false)}>Cancel</Button>
                <Button type="submit" onClick={() => setShowMeetingDialog(false)}>Schedule Meeting</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 p-6">
          <Tabs defaultValue="month">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">
                {date ? date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
              </h2>
              <TabsList>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="day">Day</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="month">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border pointer-events-auto"
              />
            </TabsContent>
            
            <TabsContent value="week">
              <div className="h-[400px] flex items-center justify-center p-8 border rounded-md">
                <p className="text-muted-foreground">Week view will be implemented in future updates</p>
              </div>
            </TabsContent>
            
            <TabsContent value="day">
              <div className="h-[400px] flex items-center justify-center p-8 border rounded-md">
                <p className="text-muted-foreground">Day view will be implemented in future updates</p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
        
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Today's Meetings</h2>
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
          </div>
          
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {meetings.length > 0 ? (
                meetings.map((meeting) => (
                  <div 
                    key={meeting.id}
                    className="p-4 rounded-lg bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{meeting.title}</h3>
                      {meeting.type === 'google' ? (
                        <Video className="h-4 w-4 text-red-500" />
                      ) : (
                        <Laptop className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      <span>{meeting.attendees.length} attendees</span>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm" className="h-8">
                        <Video className="mr-2 h-3 w-3" />
                        <span>Join</span>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center pt-8 pb-12">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground text-center">
                    No meetings scheduled for today
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setShowMeetingDialog(true)}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Schedule Meeting</span>
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Upcoming Tasks</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 backdrop-blur-sm">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <div className="font-medium">Prepare presentation for client meeting</div>
                <div className="text-xs text-muted-foreground">Due tomorrow</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">Complete</Button>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 backdrop-blur-sm">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <div className="font-medium">Review product design specifications</div>
                <div className="text-xs text-muted-foreground">Due in 2 days</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">Complete</Button>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 backdrop-blur-sm">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-muted-foreground mr-3" />
              <div>
                <div className="font-medium">Send weekly progress report</div>
                <div className="text-xs text-muted-foreground">Due in 3 days</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">Complete</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CalendarPage;
