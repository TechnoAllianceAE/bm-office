import React, { useState, useEffect } from 'react';
import { BarChart3, Clock, Calendar, Users, FileText, LineChart, PieChart, CheckCircle, ClipboardList, PlusCircle, X, AlertTriangle } from 'lucide-react';
import { DashboardWidget } from '@/components/dashboard/DashboardWidget';
import { WidgetGrid } from '@/components/dashboard/WidgetGrid';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  time: string;
  urgent: boolean;
  createdAt: Date;
};

const Dashboard = () => {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const savedTodos = localStorage.getItem('dashboardTodos');
    return savedTodos 
      ? JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }))
      : [];
  });
  
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoTime, setNewTodoTime] = useState('');
  const [newTodoUrgent, setNewTodoUrgent] = useState(false);
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const [indiaTime, setIndiaTime] = useState('');
  const [uaeTime, setUaeTime] = useState('');
  const [indiaDate, setIndiaDate] = useState('');
  const [uaeDate, setUaeDate] = useState('');
  const [isIndiaHoliday, setIsIndiaHoliday] = useState(false);
  const [isUaeHoliday, setIsUaeHoliday] = useState(false);
  
  useEffect(() => {
    const updateTime = () => {
      const indiaOptions = { 
        hour: "2-digit" as const, 
        minute: "2-digit" as const, 
        timeZone: 'Asia/Kolkata' 
      };
      const indiaDateOptions = { 
        weekday: 'long' as const,
        year: 'numeric' as const,
        month: 'long' as const,
        day: 'numeric' as const,
        timeZone: 'Asia/Kolkata'
      };
      setIndiaTime(new Date().toLocaleTimeString('en-US', indiaOptions));
      setIndiaDate(new Date().toLocaleDateString('en-US', indiaDateOptions));
      
      const uaeOptions = { 
        hour: "2-digit" as const, 
        minute: "2-digit" as const, 
        timeZone: 'Asia/Dubai' 
      };
      const uaeDateOptions = { 
        weekday: 'long' as const,
        year: 'numeric' as const,
        month: 'long' as const,
        day: 'numeric' as const,
        timeZone: 'Asia/Dubai'
      };
      setUaeTime(new Date().toLocaleTimeString('en-US', uaeOptions));
      setUaeDate(new Date().toLocaleDateString('en-US', uaeDateOptions));
      
      const today = new Date();
      const isWeekend = today.getDay() === 0 || today.getDay() === 6;
      setIsIndiaHoliday(isWeekend);
      setIsUaeHoliday(today.getDay() === 5 || today.getDay() === 6);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('dashboardTodos', JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = () => {
    if (!newTodoText.trim()) return;
    
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: newTodoText,
      completed: false,
      time: newTodoTime,
      urgent: newTodoUrgent,
      createdAt: new Date()
    };
    
    setTodos([...todos, newTodo]);
    setNewTodoText('');
    setNewTodoTime('');
    setNewTodoUrgent(false);
    setIsAddingTodo(false);
  };
  
  const toggleTodoCompleted = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.urgent && !b.urgent) return -1;
    if (!a.urgent && b.urgent) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">
      <div className="w-full lg:w-72 flex-shrink-0">
        <Card className="p-4 bg-yellow-50/80 h-full flex flex-col glassmorphic-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center">
              <ClipboardList className="h-4 w-4 mr-2" />
              To-Do List
            </h2>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0" 
              onClick={() => setIsAddingTodo(true)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-auto">
            {sortedTodos.length > 0 ? (
              <div className="space-y-2">
                {sortedTodos.map(todo => (
                  <div 
                    key={todo.id} 
                    className={`p-3 rounded-lg flex items-start gap-2 ${
                      todo.completed 
                        ? 'bg-gray-100/50 text-gray-500' 
                        : todo.urgent 
                          ? 'bg-red-50 border-l-2 border-red-500' 
                          : 'bg-white/70'
                    }`}
                  >
                    <button 
                      className="mt-0.5 flex-shrink-0" 
                      onClick={() => toggleTodoCompleted(todo.id)}
                    >
                      {todo.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${todo.completed ? 'line-through' : ''}`}>
                        {todo.text}
                      </p>
                      {todo.time && (
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {todo.time}
                          {todo.urgent && (
                            <span className="flex items-center ml-2 text-red-500">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Urgent
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <button 
                      className="text-gray-400 hover:text-gray-600" 
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p className="text-sm">No tasks yet</p>
                <Button 
                  variant="link" 
                  onClick={() => setIsAddingTodo(true)}
                >
                  Add your first task
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      <div className="flex-1">
        <div className="glass-card p-8 rounded-xl">
          <h1 className="text-3xl font-semibold mb-1">Welcome back, John</h1>
          <p className="text-muted-foreground">Here's what's happening today.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="p-4 flex flex-col items-center justify-center" style={{ animationDelay: '100ms' }}>
              <p className="text-sm text-muted-foreground mb-1">Time Logged This Week</p>
              <div className="flex items-baseline">
                <AnimatedCounter value={32} className="text-2xl font-semibold" />
                <span className="text-sm text-muted-foreground ml-1">/ 40 hrs</span>
              </div>
            </Card>
            
            <Card className="p-4 flex flex-col items-center justify-center" style={{ animationDelay: '200ms' }}>
              <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
              <AnimatedCounter value={7} className="text-2xl font-semibold" />
            </Card>
            
            <Card className="p-4 flex flex-col items-center justify-center" style={{ animationDelay: '300ms' }}>
              <p className="text-sm text-muted-foreground mb-1">Pending Tasks</p>
              <AnimatedCounter value={12} className="text-2xl font-semibold" />
            </Card>
            
            <Card className="p-4 flex flex-col items-center justify-center" style={{ animationDelay: '400ms' }}>
              <p className="text-sm text-muted-foreground mb-1">Upcoming Meetings</p>
              <AnimatedCounter value={3} className="text-2xl font-semibold" />
            </Card>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-xl my-6">
          <h2 className="font-semibold mb-4">Current Time</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">India</h3>
                  {isIndiaHoliday && (
                    <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                      Holiday
                    </span>
                  )}
                </div>
                <p className="text-2xl font-semibold">{indiaTime}</p>
                <p className="text-sm text-muted-foreground">{indiaDate}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">UAE</h3>
                  {isUaeHoliday && (
                    <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                      Holiday
                    </span>
                  )}
                </div>
                <p className="text-2xl font-semibold">{uaeTime}</p>
                <p className="text-sm text-muted-foreground">{uaeDate}</p>
              </div>
            </div>
          </div>
        </div>
        
        <WidgetGrid>
          <DashboardWidget 
            title="Recent Timesheets" 
            icon={<Clock className="w-4 h-4" />}
            animationDelay={100}
            footer={<div className="text-sm text-primary hover:underline cursor-pointer">View all timesheets</div>}
          >
            <div className="space-y-3">
              {['Design System Updates', 'Client Meeting', 'Frontend Development'].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item}</p>
                    <p className="text-sm text-muted-foreground">Today, 2:30 PM</p>
                  </div>
                  <div className="text-sm font-medium">1h 30m</div>
                </div>
              ))}
            </div>
          </DashboardWidget>
          
          <DashboardWidget 
            title="Upcoming Calendar" 
            icon={<Calendar className="w-4 h-4" />}
            animationDelay={200}
            footer={<div className="text-sm text-primary hover:underline cursor-pointer">View calendar</div>}
          >
            <div className="space-y-3">
              {[
                { title: 'Weekly Team Meeting', time: 'Today, 10:00 AM', duration: '1h' },
                { title: 'Project Review', time: 'Tomorrow, 2:00 PM', duration: '2h' },
                { title: 'Client Presentation', time: 'Thursday, 11:00 AM', duration: '1h 30m' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                  <div className="text-sm font-medium">{item.duration}</div>
                </div>
              ))}
            </div>
          </DashboardWidget>
          
          <DashboardWidget 
            title="Team Activity" 
            icon={<Users className="w-4 h-4" />}
            animationDelay={300}
            footer={<div className="text-sm text-primary hover:underline cursor-pointer">View all activity</div>}
          >
            <div className="space-y-3">
              {[
                { name: 'Alice Smith', action: 'completed a task', project: 'Design System' },
                { name: 'Bob Johnson', action: 'added a comment', project: 'Mobile App' },
                { name: 'Charlie Lee', action: 'updated status', project: 'Web Dashboard' },
              ].map((item, index) => (
                <div key={index} className="flex items-center py-2 border-b last:border-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{item.name} <span className="font-normal text-muted-foreground">{item.action}</span></p>
                    <p className="text-sm text-muted-foreground">in {item.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardWidget>
          
          <DashboardWidget 
            title="Project Status" 
            icon={<BarChart3 className="w-4 h-4" />}
            animationDelay={400}
          >
            <div className="space-y-4">
              {[
                { name: 'Website Redesign', progress: 75 },
                { name: 'Mobile Application', progress: 45 },
                { name: 'Marketing Campaign', progress: 90 },
              ].map((project, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{project.name}</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </DashboardWidget>
          
          <DashboardWidget 
            title="Announcements" 
            icon={<FileText className="w-4 h-4" />}
            animationDelay={500}
            footer={<div className="text-sm text-primary hover:underline cursor-pointer">View all announcements</div>}
          >
            <div className="space-y-4">
              {[
                { title: 'Office Closure', content: 'The office will be closed on Monday for the public holiday.' },
                { title: 'New HR Policy', content: 'Updated work from home policy is now available in the HR portal.' },
                { title: 'IT Maintenance', content: 'Scheduled maintenance on Saturday from 10PM to 2AM.' },
              ].map((item, index) => (
                <div key={index} className="border-b pb-3 last:border-0">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.content}</p>
                </div>
              ))}
            </div>
          </DashboardWidget>
          
          <DashboardWidget 
            title="Quick Links" 
            icon={<LineChart className="w-4 h-4" />}
            animationDelay={600}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Submit Timesheet', icon: Clock },
                { title: 'Request Leave', icon: Calendar },
                { title: 'IT Support', icon: PieChart },
                { title: 'HR Resources', icon: FileText },
              ].map((item, index) => (
                <button 
                  key={index}
                  className="p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors flex flex-col items-center justify-center gap-2 group"
                >
                  <item.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{item.title}</span>
                </button>
              ))}
            </div>
          </DashboardWidget>
        </WidgetGrid>
      </div>
      
      <Dialog open={isAddingTodo} onOpenChange={setIsAddingTodo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="todo-text" className="text-sm font-medium">
                Task
              </label>
              <Input
                id="todo-text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="What needs to be done?"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="todo-time" className="text-sm font-medium">
                Time (optional)
              </label>
              <Input
                id="todo-time"
                value={newTodoTime}
                onChange={(e) => setNewTodoTime(e.target.value)}
                placeholder="e.g., Today 3:00 PM"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="todo-urgent"
                checked={newTodoUrgent}
                onChange={(e) => setNewTodoUrgent(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <label htmlFor="todo-urgent" className="text-sm font-medium">
                Mark as urgent
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingTodo(false)}>
              Cancel
            </Button>
            <Button onClick={addTodo}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
