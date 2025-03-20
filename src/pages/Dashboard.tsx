
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckSquare, Briefcase, AlertCircle } from "lucide-react";
import QuickActions from "@/components/dashboard/QuickActions";
import StatCard from "@/components/dashboard/StatCard";
import TimesheetSummary from "@/components/dashboard/TimesheetSummary";
import ProjectList from "@/components/dashboard/ProjectList";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Welcome, John!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your projects and tasks today.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Clock}
          title="Hours this week" 
          value="32.5" 
          change={{ value: "+2.5", positive: true }}
          color="bg-blue-100 text-blue-600"
          index={0}
        />
        <StatCard 
          icon={CheckSquare}
          title="Tasks completed" 
          value="24" 
          change={{ value: "+5", positive: true }}
          color="bg-green-100 text-green-600"
          index={1}
        />
        <StatCard 
          icon={Briefcase}
          title="Active projects" 
          value="7" 
          change={{ value: "+1", positive: true }}
          color="bg-purple-100 text-purple-600"
          index={2}
        />
        <StatCard 
          icon={AlertCircle}
          title="Pending approvals" 
          value="3" 
          change={{ value: "-2", positive: false }}
          color="bg-amber-100 text-amber-600"
          index={3}
        />
      </div>

      <QuickActions />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TimesheetSummary />
        <ProjectList />
      </div>
      
      <UpcomingEvents />
    </div>
  );
};

export default Dashboard;
