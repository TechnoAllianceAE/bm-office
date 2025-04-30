
import React, { useState } from 'react';
import { Calendar as CalendarIcon, PlusCircle, Video, FileText, Laptop, RotateCw, CheckCircle, Users, Clock } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { format, addDays, addWeeks, startOfWeek, addHours, parse, isWithinInterval } from 'date-fns';

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  attendees: string[];
  type: 'google' | 'teams';
  location?: string;
  color?: string;
}

const sampleEvents: Event[] = [
  { 
    id: 1, 
    title: 'Product Team Weekly Sync', 
    start: addHours(new Date(), 1),
    end: addHours(new Date(), 2),
    attendees: ['Alice Smith', 'Bob Johnson', 'Charlie Lee'],
    type: 'google',
    color: 'bg-blue-500'
  },
  { 
    id: 2, 
    title: 'Client Presentation', 
    start: addHours(new Date(), 3),
    end: addHours(new Date(), 4),
    attendees: ['Diana Wang', 'Ethan Brown'],
    type: 'teams',
    color: 'bg-green-500'
  },
  { 
    id: 3, 
    title: 'Design Review', 
    start: addHours(addDays(new Date(), 1), 2),
    end: addHours(addDays(new Date(), 1), 3),
    attendees: ['Fiona Garcia', 'George Kim', 'Hannah Wilson'],
    type: 'google',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'Marketing Strategy',
    start: addHours(addDays(new Date(), 2), 4),
    end: addHours(addDays(new Date(), 2), 5.5),
    attendees: ['Ivan Rodriguez', 'Jessica Taylor'],
    type: 'teams',
    color: 'bg-orange-500'
  },
  {
    id: 5,
    title: 'Quarterly Review',
    start: addHours(addDays(new Date(), 3), 9),
    end: addHours(addDays(new Date(), 3), 11),
    attendees: ['Kate Miller', 'Liam Wilson', 'Mia Johnson', 'Noah Brown'],
    type: 'google',
    color: 'bg-red-500'
  }
];

const timeSlots = Array.from({ length: 24 }, (_, i) => i);

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [showSyncDialog, setShowSyncDialog] = useState(false);
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const nextPeriod = () => {
    if (viewMode === 'day' && date) {
      setDate(addDays(date, 1));
    } else if (viewMode === 'week') {
      setCurrentWeekStart(addWeeks(currentWeekStart, 1));
    }
  };

  const prevPeriod = () => {
    if (viewMode === 'day' && date) {
      setDate(addDays(date, -1));
    } else if (viewMode === 'week') {
      setCurrentWeekStart(addWeeks(currentWeekStart, -1));
    }
  };

  const today = () => {
    setDate(new Date());
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  const getWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(currentWeekStart, i));
    }
    return days;
  };

  const weekDays = getWeekDays();

  const getEventsForDay = (day: Date) => {
    return events.filter(event => 
      day.getDate() === event.start.getDate() && 
      day.getMonth() === event.start.getMonth() && 
      day.getFullYear() === event.start.getFullYear()
    );
  };

  const formatTimeSlot = (hour: number) => {
    return `${hour % 12 === 0 ? 12 : hour % 12} ${hour < 12 ? 'AM' : 'PM'}`;
  };

  const getEventPosition = (event: Event, dayStart: Date) => {
    // Position based on start time (hours from start of day)
    const startHour = event.start.getHours() + (event.start.getMinutes() / 60);
    const endHour = event.end.getHours() + (event.end.getMinutes() / 60);
    const duration = endHour - startHour;
    
    return {
      top: `${startHour * 60}px`,
      height: `${duration * 60}px`,
    };
  };

  const isEventVisible = (event: Event, currentDay: Date) => {
    const eventDay = new Date(event.start);
    return eventDay.getDate() === currentDay.getDate() && 
           eventDay.getMonth() === currentDay.getMonth() && 
           eventDay.getFullYear() === currentDay.getFullYear();
  };

  const handleNewEvent = (formData: any) => {
    const startTime = parse(formData.startTime, 'HH:mm', new Date());
    const endTime = parse(formData.endTime, 'HH:mm', new Date());
    const eventDate = parse(formData.date, 'yyyy-MM-dd', new Date());
    
    const start = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate(),
      startTime.getHours(),
      startTime.getMinutes()
    );
    
    const end = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate(),
      endTime.getHours(),
      endTime.getMinutes()
    );
    
    const newEvent: Event = {
      id: events.length + 1,
      title: formData.title,
      start,
      end,
      attendees: formData.participants ? formData.participants.split(',').map((email: string) => email.trim()) : [],
      type: formData.platform as 'google' | 'teams',
      color: `bg-${['blue', 'green', 'purple', 'red', 'orange'][Math.floor(Math.random() * 5)]}-500`
    };
    
    setEvents([...events, newEvent]);
    setShowMeetingDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and meetings</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={today}>
            Today
          </Button>
          <Button variant="outline" onClick={prevPeriod}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={nextPeriod}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          
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
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  title: formData.get('title') as string,
                  date: formData.get('date') as string,
                  startTime: formData.get('startTime') as string,
                  endTime: formData.get('endTime') as string,
                  participants: formData.get('participants') as string,
                  platform: formData.get('platform') as string,
                  description: formData.get('description') as string
                };
                handleNewEvent(data);
              }}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="title" className="text-sm font-medium">Meeting Title</label>
                    <Input id="title" name="title" placeholder="Enter meeting title" required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Date</label>
                      <Input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} required />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Start Time</label>
                      <Input type="time" name="startTime" defaultValue="09:00" required />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">End Time</label>
                    <Input type="time" name="endTime" defaultValue="10:00" required />
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Meeting Platform</label>
                    <Select name="platform" defaultValue="google">
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
                    <Input name="participants" placeholder="Enter email addresses (comma separated)" />
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Description</label>
                    <Input name="description" placeholder="Add meeting details" />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setShowMeetingDialog(false)}>Cancel</Button>
                  <Button type="submit">Schedule Meeting</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card className="p-6">
        <Tabs defaultValue="week" onValueChange={(value) => setViewMode(value as 'day' | 'week' | 'month')}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">
              {viewMode === 'week' ? 
                `${format(currentWeekStart, 'MMMM d')} - ${format(addDays(currentWeekStart, 6), 'MMMM d, yyyy')}` : 
                date ? format(date, 'MMMM d, yyyy') : ''
              }
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
              footer={
                <div className="mt-4">
                  {date && getEventsForDay(date).map(event => (
                    <div 
                      key={event.id}
                      className={`p-2 mb-1 rounded text-white ${event.color || 'bg-blue-500'}`}
                    >
                      <div className="text-sm font-medium">{event.title}</div>
                      <div className="text-xs">
                        {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                      </div>
                    </div>
                  ))}
                </div>
              }
            />
          </TabsContent>
          
          <TabsContent value="week">
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-8 border-b">
                <div className="p-2 border-r"></div>
                {weekDays.map((day, i) => (
                  <div 
                    key={i} 
                    className={`p-2 text-center border-r ${
                      day.toDateString() === new Date().toDateString() ? 
                      'bg-primary/10 font-semibold' : ''
                    }`}
                  >
                    <div>{format(day, 'EEE')}</div>
                    <div className="text-lg">{format(day, 'd')}</div>
                  </div>
                ))}
              </div>
              
              <div className="relative grid grid-cols-8" style={{ height: "600px", overflowY: "auto" }}>
                <div className="col-span-1 border-r">
                  {timeSlots.map((hour) => (
                    <div key={hour} className="h-[60px] border-b flex items-center justify-end pr-2 text-sm text-muted-foreground">
                      {formatTimeSlot(hour)}
                    </div>
                  ))}
                </div>
                
                <div className="col-span-7 grid grid-cols-7">
                  {weekDays.map((day, dayIndex) => (
                    <div 
                      key={dayIndex} 
                      className="relative border-r"
                    >
                      {timeSlots.map((hour) => (
                        <div key={hour} className="h-[60px] border-b"></div>
                      ))}
                      
                      {events.filter(event => isEventVisible(event, day)).map((event, i) => {
                        const position = getEventPosition(event, day);
                        return (
                          <div
                            key={event.id}
                            className={`absolute w-[90%] mx-[5%] rounded p-1 text-white shadow-sm ${event.color || 'bg-blue-500'}`}
                            style={{ 
                              top: position.top, 
                              height: position.height,
                              overflow: 'hidden'
                            }}
                          >
                            <div className="text-xs font-medium truncate">{event.title}</div>
                            <div className="text-xs truncate">
                              {format(event.start, 'h:mm')} - {format(event.end, 'h:mm a')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="day">
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 border-b">
                <div className="p-2 border-r"></div>
                <div 
                  className={`p-2 text-center ${
                    date?.toDateString() === new Date().toDateString() ? 
                    'bg-primary/10 font-semibold' : ''
                  }`}
                >
                  <div>{date ? format(date, 'EEEE') : ''}</div>
                  <div className="text-lg">{date ? format(date, 'd') : ''}</div>
                </div>
              </div>
              
              <div className="relative grid grid-cols-2" style={{ height: "600px", overflowY: "auto" }}>
                <div className="col-span-1 border-r">
                  {timeSlots.map((hour) => (
                    <div key={hour} className="h-[60px] border-b flex items-center justify-end pr-2 text-sm text-muted-foreground">
                      {formatTimeSlot(hour)}
                    </div>
                  ))}
                </div>
                
                <div className="col-span-1">
                  {timeSlots.map((hour) => (
                    <div key={hour} className="h-[60px] border-b"></div>
                  ))}
                  
                  {date && events.filter(event => isEventVisible(event, date)).map((event) => {
                    const position = getEventPosition(event, date);
                    return (
                      <div
                        key={event.id}
                        className={`absolute w-[90%] mx-[5%] rounded p-2 text-white shadow-sm ${event.color || 'bg-blue-500'}`}
                        style={{ 
                          top: position.top, 
                          height: position.height,
                          overflow: 'hidden',
                          left: "50%"
                        }}
                      >
                        <div className="text-sm font-medium">{event.title}</div>
                        <div className="text-xs flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(event.start, 'h:mm')} - {format(event.end, 'h:mm a')}
                        </div>
                        {event.attendees.length > 0 && (
                          <div className="text-xs flex items-center gap-1 mt-1">
                            <Users className="h-3 w-3" />
                            {event.attendees.length} attendees
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Upcoming Events</h2>
          <Button variant="ghost" size="sm" onClick={() => setShowMeetingDialog(true)}>Add Event</Button>
        </div>
        
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {events.sort((a, b) => a.start.getTime() - b.start.getTime()).map(event => (
              <div 
                key={event.id}
                className={`p-3 rounded-lg text-white ${event.color || 'bg-blue-500'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">{event.title}</h3>
                  {event.type === 'google' ? (
                    <Video className="h-4 w-4 text-white" />
                  ) : (
                    <Laptop className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="flex items-center text-sm mb-1">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>
                    {format(event.start, 'MMM d, h:mm a')} - {format(event.end, 'h:mm a')}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4" />
                  <span>{event.attendees.length} attendees</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default CalendarPage;
