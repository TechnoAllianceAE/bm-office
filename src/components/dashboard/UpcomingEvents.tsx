
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Video, Users, Cake } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Event {
  title: string;
  time: string;
  type: 'meeting' | 'webinar' | 'deadline' | 'birthday';
  people?: string[];
}

const events: Event[] = [
  {
    title: 'Team Standup',
    time: 'Today, 10:00 AM',
    type: 'meeting',
    people: ['Alex', 'Maria', 'John'],
  },
  {
    title: 'Product Demo',
    time: 'Today, 2:30 PM',
    type: 'webinar',
    people: ['Client Team', 'Product Team'],
  },
  {
    title: 'Project Deadline',
    time: 'Tomorrow, 5:00 PM',
    type: 'deadline',
  },
  {
    title: 'Sarah\'s Birthday',
    time: 'Sep 25, 2023',
    type: 'birthday',
  },
];

const getEventIcon = (type: Event['type']) => {
  switch (type) {
    case 'meeting':
      return { icon: Users, color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' };
    case 'webinar':
      return { icon: Video, color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30' };
    case 'deadline':
      return { icon: Calendar, color: 'text-red-500 bg-red-100 dark:bg-red-900/30' };
    case 'birthday':
      return { icon: Cake, color: 'text-pink-500 bg-pink-100 dark:bg-pink-900/30' };
    default:
      return { icon: Calendar, color: 'text-gray-500 bg-gray-100 dark:bg-gray-900/30' };
  }
};

const UpcomingEvents = () => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm border dark:bg-gray-900/50">
      <CardHeader className="pb-3">
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => {
            const { icon: Icon, color } = getEventIcon(event.type);
            
            return (
              <motion.div 
                key={event.title + event.time}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className={cn("p-2 rounded-full", color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">{event.title}</h4>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                  {event.people && (
                    <div className="text-xs text-muted-foreground flex flex-wrap gap-1 mt-1">
                      <span>With:</span>
                      {event.people.map((person, idx) => (
                        <span key={idx} className="bg-muted px-1.5 py-0.5 rounded-sm">
                          {person}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
