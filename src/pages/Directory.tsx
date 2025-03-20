
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Phone, Mail, Building, MapPin, Users, UserRound, UserPlus } from 'lucide-react';

type Employee = {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  manager?: string;
  joined: string;
  skills: string[];
};

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Senior Product Designer',
    department: 'Design',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    manager: 'Michael Chen',
    joined: 'April 2020',
    skills: ['UI Design', 'UX Research', 'Figma', 'Design Systems'],
  },
  {
    id: '2',
    name: 'Robert Williams',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'Frontend Developer',
    department: 'Engineering',
    email: 'robert.williams@company.com',
    phone: '+1 (555) 234-5678',
    location: 'Austin, TX',
    manager: 'Angela Smith',
    joined: 'June 2021',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
  },
  {
    id: '3',
    name: 'Jennifer Lopez',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'Project Manager',
    department: 'Operations',
    email: 'jennifer.lopez@company.com',
    phone: '+1 (555) 345-6789',
    location: 'New York, NY',
    manager: 'David Wilson',
    joined: 'January 2019',
    skills: ['Agile', 'Scrum', 'Jira', 'Risk Management'],
  },
  {
    id: '4',
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=8',
    role: 'Design Director',
    department: 'Design',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 456-7890',
    location: 'San Francisco, CA',
    joined: 'March 2018',
    skills: ['Leadership', 'Design Strategy', 'Brand Identity', 'Team Management'],
  },
  {
    id: '5',
    name: 'Angela Smith',
    avatar: 'https://i.pravatar.cc/150?img=9',
    role: 'Engineering Manager',
    department: 'Engineering',
    email: 'angela.smith@company.com',
    phone: '+1 (555) 567-8901',
    location: 'Austin, TX',
    manager: 'David Wilson',
    joined: 'May 2018',
    skills: ['Full Stack', 'Architecture', 'Mentoring', 'Code Reviews'],
  },
  {
    id: '6',
    name: 'David Wilson',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'VP of Operations',
    department: 'Operations',
    email: 'david.wilson@company.com',
    phone: '+1 (555) 678-9012',
    location: 'New York, NY',
    joined: 'February 2017',
    skills: ['Strategic Planning', 'Business Development', 'Team Leadership', 'Finance'],
  },
  {
    id: '7',
    name: 'Emily Davis',
    avatar: 'https://i.pravatar.cc/150?img=10',
    role: 'Marketing Specialist',
    department: 'Marketing',
    email: 'emily.davis@company.com',
    phone: '+1 (555) 789-0123',
    location: 'Chicago, IL',
    manager: 'Karen Taylor',
    joined: 'August 2021',
    skills: ['Digital Marketing', 'Content Creation', 'Social Media', 'Analytics'],
  },
  {
    id: '8',
    name: 'James Anderson',
    avatar: 'https://i.pravatar.cc/150?img=11',
    role: 'Data Scientist',
    department: 'Engineering',
    email: 'james.anderson@company.com',
    phone: '+1 (555) 890-1234',
    location: 'Seattle, WA',
    manager: 'Angela Smith',
    joined: 'November 2020',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics'],
  },
];

const departments = [
  { name: 'All', icon: Users },
  { name: 'Design', icon: UserRound },
  { name: 'Engineering', icon: UserRound },
  { name: 'Operations', icon: UserRound },
  { name: 'Marketing', icon: UserRound },
];

const Directory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = mockEmployees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9 w-[300px]" 
              placeholder="Search employees..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>
      
      <div className="glass-panel border rounded-lg p-6">
        <Tabs defaultValue="grid" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="overflow-x-auto">
              <div className="flex space-x-2">
                {departments.map((dept) => (
                  <Button
                    key={dept.name}
                    variant={selectedDepartment === dept.name ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedDepartment(dept.name)}
                  >
                    <dept.icon className="mr-2 h-4 w-4" />
                    {dept.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredEmployees.map((employee) => (
                <Dialog key={employee.id}>
                  <DialogTrigger asChild>
                    <div className="glass-panel border rounded-lg p-5 cursor-pointer hover:border-primary transition-colors flex flex-col items-center text-center">
                      <Avatar className="h-20 w-20 mb-4">
                        {employee.avatar ? (
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                        ) : (
                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                        )}
                      </Avatar>
                      <h3 className="font-medium text-lg mb-1">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{employee.role}</p>
                      <div className="flex items-center mb-1">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{employee.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{employee.department}</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Employee Details</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col sm:flex-row gap-6 pt-4">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-28 w-28 mb-4">
                          {employee.avatar ? (
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                          ) : (
                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                          )}
                        </Avatar>
                        <Button variant="outline" className="w-full">Message</Button>
                      </div>
                      
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-1">{employee.name}</h2>
                        <p className="text-muted-foreground mb-4">{employee.role}</p>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-sm text-muted-foreground">{employee.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Phone className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Phone</p>
                              <p className="text-sm text-muted-foreground">{employee.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Building className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Department</p>
                              <p className="text-sm text-muted-foreground">{employee.department}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Location</p>
                              <p className="text-sm text-muted-foreground">{employee.location}</p>
                            </div>
                          </div>
                          
                          {employee.manager && (
                            <div className="flex items-start">
                              <UserRound className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Manager</p>
                                <p className="text-sm text-muted-foreground">{employee.manager}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <h3 className="text-sm font-medium mb-2">Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {employee.skills.map((skill, index) => (
                              <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead className="bg-primary/5">
                  <tr>
                    <th className="py-3 px-4 text-left font-medium text-sm">Name</th>
                    <th className="py-3 px-4 text-left font-medium text-sm">Role</th>
                    <th className="py-3 px-4 text-left font-medium text-sm">Department</th>
                    <th className="py-3 px-4 text-left font-medium text-sm">Location</th>
                    <th className="py-3 px-4 text-left font-medium text-sm">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredEmployees.map((employee) => (
                    <Dialog key={employee.id}>
                      <DialogTrigger asChild>
                        <tr className="cursor-pointer hover:bg-white/10">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-3">
                                {employee.avatar ? (
                                  <AvatarImage src={employee.avatar} alt={employee.name} />
                                ) : (
                                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                )}
                              </Avatar>
                              <span>{employee.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">{employee.role}</td>
                          <td className="py-3 px-4">{employee.department}</td>
                          <td className="py-3 px-4">{employee.location}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Employee Details</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                          <div className="flex flex-col items-center">
                            <Avatar className="h-28 w-28 mb-4">
                              {employee.avatar ? (
                                <AvatarImage src={employee.avatar} alt={employee.name} />
                              ) : (
                                <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                              )}
                            </Avatar>
                            <Button variant="outline" className="w-full">Message</Button>
                          </div>
                          
                          <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-1">{employee.name}</h2>
                            <p className="text-muted-foreground mb-4">{employee.role}</p>
                            
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <Mail className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium">Email</p>
                                  <p className="text-sm text-muted-foreground">{employee.email}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <Phone className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium">Phone</p>
                                  <p className="text-sm text-muted-foreground">{employee.phone}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <Building className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium">Department</p>
                                  <p className="text-sm text-muted-foreground">{employee.department}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <MapPin className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium">Location</p>
                                  <p className="text-sm text-muted-foreground">{employee.location}</p>
                                </div>
                              </div>
                              
                              {employee.manager && (
                                <div className="flex items-start">
                                  <UserRound className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                                  <div>
                                    <p className="text-sm font-medium">Manager</p>
                                    <p className="text-sm text-muted-foreground">{employee.manager}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-4">
                              <h3 className="text-sm font-medium mb-2">Skills</h3>
                              <div className="flex flex-wrap gap-2">
                                {employee.skills.map((skill, index) => (
                                  <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Directory;
