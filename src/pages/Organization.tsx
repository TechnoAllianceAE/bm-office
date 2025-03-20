
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Plus, ChevronDown, UserRound, Users,
  FolderTree, Building, Save, UserPlus, LucideIcon
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface Employee {
  id: string;
  name: string;
  email: string;
  designation: string;
  department: string;
  avatar?: string;
}

interface Department {
  id: string;
  name: string;
  head?: Employee;
  employees: Employee[];
  teams?: Team[];
}

interface Team {
  id: string;
  name: string;
  lead?: Employee;
  members: Employee[];
}

// Mock data
const employeesData: Employee[] = [
  { id: 'emp1', name: 'Alex Johnson', email: 'alex@bmoffice.com', designation: 'Senior Developer', department: 'Engineering', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 'emp2', name: 'Maria Garcia', email: 'maria@bmoffice.com', designation: 'UI/UX Designer', department: 'Design', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 'emp3', name: 'John Smith', email: 'john@bmoffice.com', designation: 'Product Manager', department: 'Product', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 'emp4', name: 'Sarah Williams', email: 'sarah@bmoffice.com', designation: 'Engineering Manager', department: 'Engineering', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 'emp5', name: 'David Lee', email: 'david@bmoffice.com', designation: 'Backend Developer', department: 'Engineering', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 'emp6', name: 'Jennifer Taylor', email: 'jennifer@bmoffice.com', designation: 'QA Engineer', department: 'Engineering', avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: 'emp7', name: 'Michael Brown', email: 'michael@bmoffice.com', designation: 'DevOps Engineer', department: 'Engineering', avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: 'emp8', name: 'Emily Davis', email: 'emily@bmoffice.com', designation: 'Content Writer', department: 'Marketing', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 'emp9', name: 'Robert Wilson', email: 'robert@bmoffice.com', designation: 'Marketing Manager', department: 'Marketing', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 'emp10', name: 'Lisa Martinez', email: 'lisa@bmoffice.com', designation: 'HR Specialist', department: 'Human Resources', avatar: 'https://i.pravatar.cc/150?img=10' },
];

const departmentsData: Department[] = [
  { 
    id: 'dept1', 
    name: 'Engineering', 
    head: employeesData.find(e => e.id === 'emp4'),
    employees: employeesData.filter(e => e.department === 'Engineering'),
    teams: [
      {
        id: 'team1',
        name: 'Frontend Team',
        lead: employeesData.find(e => e.id === 'emp1'),
        members: [employeesData.find(e => e.id === 'emp1')!]
      },
      {
        id: 'team2',
        name: 'Backend Team',
        lead: employeesData.find(e => e.id === 'emp5'),
        members: [employeesData.find(e => e.id === 'emp5')!, employeesData.find(e => e.id === 'emp7')!]
      },
      {
        id: 'team3',
        name: 'QA Team',
        lead: employeesData.find(e => e.id === 'emp6'),
        members: [employeesData.find(e => e.id === 'emp6')!]
      }
    ]
  },
  { 
    id: 'dept2', 
    name: 'Design', 
    head: employeesData.find(e => e.id === 'emp2'),
    employees: employeesData.filter(e => e.department === 'Design'),
    teams: [
      {
        id: 'team4',
        name: 'UI/UX Team',
        lead: employeesData.find(e => e.id === 'emp2'),
        members: [employeesData.find(e => e.id === 'emp2')!]
      }
    ]
  },
  { 
    id: 'dept3', 
    name: 'Product', 
    head: employeesData.find(e => e.id === 'emp3'),
    employees: employeesData.filter(e => e.department === 'Product'),
    teams: [
      {
        id: 'team5',
        name: 'Product Management',
        lead: employeesData.find(e => e.id === 'emp3'),
        members: [employeesData.find(e => e.id === 'emp3')!]
      }
    ]
  },
  { 
    id: 'dept4', 
    name: 'Marketing', 
    head: employeesData.find(e => e.id === 'emp9'),
    employees: employeesData.filter(e => e.department === 'Marketing'),
    teams: [
      {
        id: 'team6',
        name: 'Content Team',
        lead: employeesData.find(e => e.id === 'emp8'),
        members: [employeesData.find(e => e.id === 'emp8')!, employeesData.find(e => e.id === 'emp9')!]
      }
    ]
  },
  { 
    id: 'dept5', 
    name: 'Human Resources', 
    head: employeesData.find(e => e.id === 'emp10'),
    employees: employeesData.filter(e => e.department === 'Human Resources'),
    teams: [
      {
        id: 'team7',
        name: 'HR Team',
        lead: employeesData.find(e => e.id === 'emp10'),
        members: [employeesData.find(e => e.id === 'emp10')!]
      }
    ]
  }
];

type DraggableNodeProps = {
  id: string;
  type: 'employee' | 'team';
  data: Employee | Team;
};

const DragItem: React.FC<DraggableNodeProps> = ({ id, type, data }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ id, type }));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div 
      draggable
      id={id}
      className="p-2 bg-white/30 dark:bg-gray-800/30 rounded-md cursor-grab border border-dashed border-primary/30 hover:border-primary/50 transition-colors"
      onDragStart={handleDragStart}
    >
      <div className="flex items-center gap-2">
        {'name' in data && (
          <>
            <Avatar className="h-8 w-8">
              <AvatarImage src={('avatar' in data) ? data.avatar : undefined} alt={data.name} />
              <AvatarFallback>
                {data.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium truncate">{data.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {type === 'employee' ? (data as Employee).designation : `${(data as Team).members.length} Members`}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

type OrganizationNodeProps = {
  title: string;
  subtitle?: string;
  avatar?: string;
  leader?: boolean;
  icon?: LucideIcon;
  children?: React.ReactNode;
  department?: boolean;
  team?: boolean;
  collapsible?: boolean;
  id?: string;
  onDrop?: (data: {id: string, type: string}) => void;
};

const OrganizationNode: React.FC<OrganizationNodeProps> = ({
  title,
  subtitle,
  avatar,
  leader,
  icon: Icon,
  children,
  department = false,
  team = false,
  collapsible = false,
  id,
  onDrop,
}) => {
  const [expanded, setExpanded] = useState(true);
  
  const handleDragOver = (e: React.DragEvent) => {
    if (onDrop) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (onDrop) {
      e.preventDefault();
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      onDrop(data);
    }
  };
  
  return (
    <div 
      className={cn(
        "border rounded-md",
        department ? "bg-muted/50" : team ? "bg-muted/30" : "bg-background",
        !children && "shadow-sm"
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      id={id}
    >
      <div className={cn(
        "flex items-center gap-3 p-3",
        (department || team) && "border-b",
        leader && "rounded-t-md bg-primary/5"
      )}>
        {avatar ? (
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={avatar} alt={title} />
            <AvatarFallback>
              {title.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        ) : Icon && (
          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Icon className="h-4 w-4" />
          </div>
        )}
        
        <div className="min-w-0 flex-1">
          <div className="font-medium truncate">{title}</div>
          {subtitle && (
            <div className="text-xs text-muted-foreground truncate">{subtitle}</div>
          )}
        </div>
        
        {leader && (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {department ? "Head" : "Team Lead"}
          </Badge>
        )}
        
        {collapsible && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setExpanded(!expanded)}
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform", expanded ? "" : "-rotate-90")} />
          </Button>
        )}
      </div>
      
      {expanded && children && (
        <div className="p-3 pt-0">
          <div className="mt-3">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const DepartmentView: React.FC<{ department: Department }> = ({ department }) => {
  const [departmentData, setDepartmentData] = useState<Department>(department);
  
  const handleDropOnTeam = (teamId: string) => (data: {id: string, type: string}) => {
    if (data.type !== 'employee') return;
    
    const employeeId = data.id;
    const employee = employeesData.find(e => e.id === employeeId);
    
    if (!employee) return;
    
    // Update team members
    const updatedTeams = departmentData.teams?.map(team => {
      if (team.id === teamId) {
        // Check if employee is already in team
        if (team.members.some(m => m.id === employeeId)) {
          return team;
        }
        
        // If employee is already a lead in this team, don't add as normal member
        if (team.lead?.id === employeeId) {
          return team;
        }
        
        return {
          ...team,
          members: [...team.members, employee]
        };
      }
      return team;
    });
    
    setDepartmentData({
      ...departmentData,
      teams: updatedTeams
    });
    
    toast({
      title: "Employee Added to Team",
      description: `${employee.name} has been added to the team.`,
    });
  };
  
  const handleDropOnTeamLead = (teamId: string) => (data: {id: string, type: string}) => {
    if (data.type !== 'employee') return;
    
    const employeeId = data.id;
    const employee = employeesData.find(e => e.id === employeeId);
    
    if (!employee) return;
    
    // Update team lead
    const updatedTeams = departmentData.teams?.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          lead: employee,
          // Add employee to members if not already there
          members: team.members.some(m => m.id === employeeId)
            ? team.members
            : [...team.members, employee]
        };
      }
      return team;
    });
    
    setDepartmentData({
      ...departmentData,
      teams: updatedTeams
    });
    
    toast({
      title: "Team Lead Updated",
      description: `${employee.name} is now the team lead.`,
    });
  };
  
  const handleDropOnDepartmentHead = (data: {id: string, type: string}) => {
    if (data.type !== 'employee') return;
    
    const employeeId = data.id;
    const employee = employeesData.find(e => e.id === employeeId);
    
    if (!employee) return;
    
    setDepartmentData({
      ...departmentData,
      head: employee
    });
    
    toast({
      title: "Department Head Updated",
      description: `${employee.name} is now the head of ${departmentData.name}.`,
    });
  };

  return (
    <div className="space-y-3">
      <OrganizationNode
        title={departmentData.name}
        subtitle={`${departmentData.employees.length} Employees`}
        icon={Building}
        department
        collapsible
        id={`dept-${departmentData.id}`}
      >
        {departmentData.head ? (
          <OrganizationNode
            title={departmentData.head.name}
            subtitle={departmentData.head.designation}
            avatar={departmentData.head.avatar}
            leader
            id={`dept-head-${departmentData.id}`}
            onDrop={handleDropOnDepartmentHead}
          />
        ) : (
          <div 
            className="border border-dashed border-primary/30 rounded-md p-3 bg-primary/5 text-center"
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={(e) => {
              e.preventDefault();
              const data = JSON.parse(e.dataTransfer.getData('application/json'));
              handleDropOnDepartmentHead(data);
            }}
          >
            <p className="text-sm text-muted-foreground">Drag an employee here to assign as Department Head</p>
          </div>
        )}
        
        <div className="mt-3 space-y-3">
          {departmentData.teams && departmentData.teams.map(team => (
            <OrganizationNode
              key={team.id}
              title={team.name}
              subtitle={`${team.members.length} Members`}
              icon={Users}
              team
              collapsible
              id={`team-${team.id}`}
              onDrop={handleDropOnTeam(team.id)}
            >
              {team.lead ? (
                <OrganizationNode
                  title={team.lead.name}
                  subtitle={team.lead.designation}
                  avatar={team.lead.avatar}
                  leader
                  id={`team-lead-${team.id}`}
                  onDrop={handleDropOnTeamLead(team.id)}
                />
              ) : (
                <div 
                  className="border border-dashed border-primary/30 rounded-md p-3 bg-primary/5 text-center"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const data = JSON.parse(e.dataTransfer.getData('application/json'));
                    handleDropOnTeamLead(team.id)(data);
                  }}
                >
                  <p className="text-sm text-muted-foreground">Drag an employee here to assign as Team Lead</p>
                </div>
              )}
              
              <div className="mt-3 grid gap-2">
                {team.members
                  .filter(member => !team.lead || member.id !== team.lead.id)
                  .map(member => (
                    <OrganizationNode
                      key={member.id}
                      title={member.name}
                      subtitle={member.designation}
                      avatar={member.avatar}
                      id={`team-member-${team.id}-${member.id}`}
                    />
                  ))
                }
              </div>
            </OrganizationNode>
          ))}
        </div>
      </OrganizationNode>
    </div>
  );
};

const Organization = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewDepartmentDialogOpen, setIsNewDepartmentDialogOpen] = useState(false);
  const [isNewTeamDialogOpen, setIsNewTeamDialogOpen] = useState(false);
  const [unassignedEmployees, setUnassignedEmployees] = useState<Employee[]>(employeesData.slice(0, 3)); // Sample unassigned employees
  
  // Filter departments based on search query
  const filteredDepartments = departmentsData.filter(department => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      department.name.toLowerCase().includes(query) ||
      department.employees.some(emp => 
        emp.name.toLowerCase().includes(query) ||
        emp.designation.toLowerCase().includes(query)
      ) ||
      department.teams?.some(team => 
        team.name.toLowerCase().includes(query) ||
        team.members.some(m => m.name.toLowerCase().includes(query))
      )
    );
  });

  const handleAddDepartment = () => {
    toast({
      title: "Department Added",
      description: "New department has been created successfully",
    });
    setIsNewDepartmentDialogOpen(false);
  };

  const handleAddTeam = () => {
    toast({
      title: "Team Added",
      description: "New team has been created successfully",
    });
    setIsNewTeamDialogOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Organization</h1>
          <p className="text-muted-foreground">Manage your organization structure with drag and drop</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search departments, teams or employees..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isNewDepartmentDialogOpen} onOpenChange={setIsNewDepartmentDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogDescription>
                  Create a new department in your organization.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="dept-name">Department Name</label>
                  <Input id="dept-name" placeholder="e.g. Finance" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department Head</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employeesData.map(emp => (
                        <SelectItem key={emp.id} value={emp.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={emp.avatar} alt={emp.name} />
                              <AvatarFallback>{emp.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span>{emp.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input placeholder="Brief description of this department" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewDepartmentDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddDepartment}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Department
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isNewTeamDialogOpen} onOpenChange={setIsNewTeamDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Team
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Team</DialogTitle>
                <DialogDescription>
                  Create a new team and assign employees.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentsData.map(dept => (
                        <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="team-name">Team Name</label>
                  <Input id="team-name" placeholder="e.g. Mobile Development" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Team Lead</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employeesData.map(emp => (
                        <SelectItem key={emp.id} value={emp.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={emp.avatar} alt={emp.name} />
                              <AvatarFallback>{emp.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span>{emp.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewTeamDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddTeam}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Team
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <UserRound className="h-5 w-5 text-primary" />
                Unassigned Employees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {unassignedEmployees.map(employee => (
                  <DragItem 
                    key={employee.id} 
                    id={employee.id} 
                    type="employee" 
                    data={employee} 
                  />
                ))}
                {unassignedEmployees.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>All employees have been assigned</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FolderTree className="h-5 w-5 text-primary" />
                Organization Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredDepartments.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <UserRound className="h-10 w-10 mx-auto mb-3 opacity-20" />
                    <p>No departments or employees match your search criteria</p>
                  </div>
                ) : (
                  filteredDepartments.map(department => (
                    <DepartmentView key={department.id} department={department} />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Organization;
