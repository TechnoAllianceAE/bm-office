
import React, { useState } from 'react';
import { Search, Users, Phone, Mail, MapPin, Filter, Grid, List } from 'lucide-react';
import { Card } from '@/components/common/Card';

// Sample employee data with avatar URLs
const employees = [
  { 
    id: 1, 
    name: 'Alice Smith', 
    title: 'Product Manager', 
    department: 'Product', 
    location: 'New York', 
    email: 'alice.smith@company.com', 
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=faces' 
  },
  { 
    id: 2, 
    name: 'Bob Johnson', 
    title: 'Senior Developer', 
    department: 'Engineering', 
    location: 'San Francisco', 
    email: 'bob.johnson@company.com', 
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=faces' 
  },
  { 
    id: 3, 
    name: 'Charlie Lee', 
    title: 'UX Designer', 
    department: 'Design', 
    location: 'London', 
    email: 'charlie.lee@company.com', 
    phone: '+44 (20) 1234-5678',
    avatar: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=150&h=150&fit=crop&crop=faces' 
  },
  { 
    id: 4, 
    name: 'Diana Wang', 
    title: 'Marketing Director', 
    department: 'Marketing', 
    location: 'Singapore', 
    email: 'diana.wang@company.com', 
    phone: '+65 8765-4321',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=faces' 
  },
  { 
    id: 5, 
    name: 'Ethan Brown', 
    title: 'Finance Manager', 
    department: 'Finance', 
    location: 'Chicago', 
    email: 'ethan.brown@company.com', 
    phone: '+1 (555) 987-6543',
    avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=150&fit=crop&crop=faces' 
  },
  { 
    id: 6, 
    name: 'Fiona Garcia', 
    title: 'HR Specialist', 
    department: 'HR', 
    location: 'Madrid', 
    email: 'fiona.garcia@company.com', 
    phone: '+34 91 234-5678',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=faces' 
  },
  { 
    id: 7, 
    name: 'George Kim', 
    title: 'Sales Representative', 
    department: 'Sales', 
    location: 'Seoul', 
    email: 'george.kim@company.com', 
    phone: '+82 2-1234-5678',
    avatar: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=faces' 
  },
  { 
    id: 8, 
    name: 'Hannah Wilson', 
    title: 'Customer Success Manager', 
    department: 'Customer Success', 
    location: 'Toronto', 
    email: 'hannah.wilson@company.com', 
    phone: '+1 (416) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=150&h=150&fit=crop&crop=faces' 
  },
];

const Directory = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div className="glass-card p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Employee Directory</h1>
          <p className="text-muted-foreground">Connect with team members across the organization</p>
        </div>
        
        <div className="flex gap-3 items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input 
              type="search" 
              placeholder="Search employees..." 
              className="pl-9 pr-4 py-2 w-full bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-secondary hover:bg-secondary/80 transition-colors rounded-lg px-4 py-2 flex items-center gap-1">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <div className="bg-secondary rounded-lg flex overflow-hidden">
            <button 
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary text-white' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-primary text-white' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 flex items-center gap-4">
          <div className="bg-primary/10 text-primary rounded-full p-3">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted-foreground text-sm">Total Employees</div>
            <div className="text-2xl font-semibold">{employees.length}</div>
          </div>
        </Card>
        
        <Card className="p-6 flex items-center gap-4">
          <div className="bg-purple-100 text-purple-600 rounded-full p-3">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted-foreground text-sm">Departments</div>
            <div className="text-2xl font-semibold">8</div>
          </div>
        </Card>
        
        <Card className="p-6 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted-foreground text-sm">Office Locations</div>
            <div className="text-2xl font-semibold">6</div>
          </div>
        </Card>
        
        <Card className="p-6 flex items-center gap-4">
          <div className="bg-emerald-100 text-emerald-600 rounded-full p-3">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted-foreground text-sm">New Hires (30 days)</div>
            <div className="text-2xl font-semibold">3</div>
          </div>
        </Card>
      </div>
      
      {/* Employee directory */}
      <Card>
        <div className="p-4 border-b">
          <h2 className="font-medium">
            {searchQuery ? `Search Results (${filteredEmployees.length})` : 'All Employees'}
          </h2>
        </div>
        
        {viewMode === 'grid' ? (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee, index) => (
              <div 
                key={employee.id} 
                className="bg-secondary/30 rounded-xl p-6 hover:bg-secondary/50 transition-colors cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  {employee.avatar ? (
                    <img 
                      src={employee.avatar} 
                      alt={employee.name}
                      className="w-20 h-20 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-semibold mb-4">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <h3 className="font-medium text-lg">{employee.name}</h3>
                  <p className="text-muted-foreground mb-4">{employee.title}</p>
                  
                  <div className="w-full space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{employee.location}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 truncate">
                      <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{employee.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y">
            {filteredEmployees.map((employee, index) => (
              <div 
                key={employee.id}
                className="p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors cursor-pointer animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {employee.avatar ? (
                  <img 
                    src={employee.avatar} 
                    alt={employee.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground">{employee.title} • {employee.department}</p>
                </div>
                <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{employee.location}</span>
                </div>
                <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="truncate max-w-[200px]">{employee.email}</span>
                </div>
                <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{employee.phone}</span>
                </div>
                <button className="bg-secondary hover:bg-secondary/80 transition-colors rounded-full p-2">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
      
      {/* Department overview */}
      <Card>
        <div className="p-4 border-b">
          <h2 className="font-medium">Departments</h2>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Engineering', count: 25, color: 'bg-blue-100 text-blue-600' },
            { name: 'Design', count: 12, color: 'bg-purple-100 text-purple-600' },
            { name: 'Product', count: 8, color: 'bg-amber-100 text-amber-600' },
            { name: 'Marketing', count: 10, color: 'bg-emerald-100 text-emerald-600' },
            { name: 'Sales', count: 15, color: 'bg-pink-100 text-pink-600' },
            { name: 'Customer Success', count: 18, color: 'bg-indigo-100 text-indigo-600' },
            { name: 'Finance', count: 6, color: 'bg-green-100 text-green-600' },
            { name: 'HR', count: 5, color: 'bg-red-100 text-red-600' },
          ].map((dept, index) => (
            <div 
              key={dept.name}
              className="bg-secondary/30 rounded-xl p-4 hover:bg-secondary/50 transition-colors cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{dept.name}</h3>
                <div className={`${dept.color} text-xs font-medium px-2 py-1 rounded-full`}>
                  {dept.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Directory;
