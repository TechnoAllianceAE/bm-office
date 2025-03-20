
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const data = [
  { day: 'Mon', hours: 7.5 },
  { day: 'Tue', hours: 8 },
  { day: 'Wed', hours: 6.5 },
  { day: 'Thu', hours: 8.5 },
  { day: 'Fri', hours: 5 },
  { day: 'Sat', hours: 0 },
  { day: 'Sun', hours: 0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border shadow-sm rounded-md text-xs">
        <p className="font-medium">{`${label}: ${payload[0].value} hours`}</p>
      </div>
    );
  }

  return null;
};

const TimesheetSummary = () => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm border dark:bg-gray-900/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Weekly Timesheet</CardTitle>
          <CardDescription>September 18 - 24, 2023</CardDescription>
        </div>
        <Button size="sm" className="rounded-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Time
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#f0f0f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}h`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="hours" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <div>
            <p className="text-muted-foreground">Total Hours</p>
            <p className="font-medium text-lg">35.5h</p>
          </div>
          <div>
            <p className="text-muted-foreground">Target</p>
            <p className="font-medium text-lg">40h</p>
          </div>
          <div>
            <p className="text-muted-foreground">Status</p>
            <p className="font-medium text-yellow-600 dark:text-yellow-400">-4.5h</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimesheetSummary;
