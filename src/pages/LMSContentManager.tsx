
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Search, ListFilter, Plus, BookOpen, 
  BarChart3, ClipboardCheck, Users, Edit, Trash, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample course data for management
const managedCourses = [
  {
    id: 1,
    title: 'Using BM Office Suite Effectively',
    description: 'Learn how to use all features of the BM Office platform to boost your productivity.',
    status: 'published',
    students: 45,
    completions: 12,
    lastUpdated: '2025-04-02',
    author: 'John Smith',
  },
  {
    id: 2,
    title: 'Advanced Project Management',
    description: 'Master project management techniques to deliver projects on time and within budget.',
    status: 'published',
    students: 32,
    completions: 8,
    lastUpdated: '2025-03-28',
    author: 'Sarah Johnson',
  },
  {
    id: 3,
    title: 'Effective Communication Skills',
    description: 'Improve your communication skills to become a more effective team member and leader.',
    status: 'draft',
    students: 0,
    completions: 0,
    lastUpdated: '2025-04-07',
    author: 'Michael Brown',
  },
  {
    id: 4,
    title: 'Document Management System Tutorial',
    status: 'published',
    students: 57,
    completions: 29,
    lastUpdated: '2025-03-15',
    author: 'Emily Wilson',
  },
];

// Sample enrollments data
const enrollments = [
  { 
    id: 1, 
    user: { name: 'David Chen', email: 'david.chen@example.com', avatar: 'DC' },
    courseId: 1,
    courseTitle: 'Using BM Office Suite Effectively',
    progress: 75,
    lastAccessed: '2025-04-08',
    timeSpent: '3h 20m',
  },
  { 
    id: 2, 
    user: { name: 'Sophia Davis', email: 'sophia.davis@example.com', avatar: 'SD' },
    courseId: 1,
    courseTitle: 'Using BM Office Suite Effectively',
    progress: 45,
    lastAccessed: '2025-04-05',
    timeSpent: '1h 45m',
  },
  { 
    id: 3, 
    user: { name: 'James Wilson', email: 'james.wilson@example.com', avatar: 'JW' },
    courseId: 2,
    courseTitle: 'Advanced Project Management',
    progress: 90,
    lastAccessed: '2025-04-07',
    timeSpent: '4h 10m',
  },
  { 
    id: 4, 
    user: { name: 'Emma Rodriguez', email: 'emma.rodriguez@example.com', avatar: 'ER' },
    courseId: 2,
    courseTitle: 'Advanced Project Management',
    progress: 30,
    lastAccessed: '2025-04-03',
    timeSpent: '1h 05m',
  },
  { 
    id: 5, 
    user: { name: 'Liam Johnson', email: 'liam.johnson@example.com', avatar: 'LJ' },
    courseId: 4,
    courseTitle: 'Document Management System Tutorial',
    progress: 100,
    lastAccessed: '2025-04-02',
    timeSpent: '1h 30m',
  },
];

const LMSContentManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [showNewCourseDialog, setShowNewCourseDialog] = useState(false);
  
  // Filter enrollments based on search
  const filteredEnrollments = enrollments.filter(enrollment => 
    enrollment.user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    enrollment.user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    enrollment.courseTitle.toLowerCase().includes(userSearchQuery.toLowerCase())
  );
  
  // Filter courses based on search
  const filteredCourses = managedCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleCreateCourse = () => {
    toast({
      title: "Course created",
      description: "New course has been saved as a draft.",
    });
    setShowNewCourseDialog(false);
  };
  
  const handleDeleteCourse = (courseId) => {
    toast({
      title: "Course deleted",
      description: `Course ID ${courseId} has been deleted.`,
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/lms">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">eLearning Content Manager</h1>
            <p className="text-muted-foreground">Create and manage learning content</p>
          </div>
        </div>
        
        <Dialog open={showNewCourseDialog} onOpenChange={setShowNewCourseDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">Course Title</label>
                <Input id="title" placeholder="Enter course title" />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <textarea 
                  id="description" 
                  rows={3} 
                  className="min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Enter course description"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="application">Application</SelectItem>
                      <SelectItem value="personal">Personal Growth</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="level" className="text-sm font-medium">Difficulty Level</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">Course Thumbnail</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                  <div className="mb-2 text-muted-foreground">
                    <Plus className="h-8 w-8 mx-auto mb-2" />
                    <p>Upload thumbnail image</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Support PNG, JPG up to 2MB
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowNewCourseDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCourse}>
                Create Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="courses">
        <TabsList className="w-full md:w-auto grid grid-cols-3 mb-6">
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Courses</span>
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Students</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <CardTitle>Manage Courses</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search courses..."
                      className="pl-8 w-full md:w-60"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <ListFilter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-3 bg-muted/50 text-sm font-medium">
                  <div className="col-span-4 md:col-span-5">Course</div>
                  <div className="col-span-2 text-center">Status</div>
                  <div className="col-span-2 text-center hidden md:block">Students</div>
                  <div className="col-span-2 text-center hidden md:block">Completion</div>
                  <div className="col-span-2 md:col-span-1 text-right">Actions</div>
                </div>
                
                {filteredCourses.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-50" />
                    <p>No courses found</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredCourses.map((course) => (
                      <div key={course.id} className="grid grid-cols-12 p-3 items-center text-sm">
                        <div className="col-span-4 md:col-span-5">
                          <div className="font-medium">{course.title}</div>
                          {course.description && (
                            <div className="text-xs text-muted-foreground truncate mt-1 pr-4 hidden md:block">
                              {course.description}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            Updated: {course.lastUpdated}
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <Badge 
                            variant={course.status === 'published' ? 'default' : 'secondary'}
                          >
                            {course.status}
                          </Badge>
                        </div>
                        <div className="col-span-2 text-center hidden md:block">
                          {course.students}
                        </div>
                        <div className="col-span-2 text-center hidden md:block">
                          {course.status === 'draft' ? '-' : `${Math.round((course.completions / course.students) * 100)}%`}
                        </div>
                        <div className="col-span-2 md:col-span-1 flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                  <circle cx="12" cy="12" r="1" />
                                  <circle cx="12" cy="5" r="1" />
                                  <circle cx="12" cy="19" r="1" />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Edit className="h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Eye className="h-4 w-4" /> Preview
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="flex items-center gap-2 text-destructive"
                                onClick={() => handleDeleteCourse(course.id)}
                              >
                                <Trash className="h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <CardTitle>User Enrollments</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search users or courses..."
                      className="pl-8 w-full md:w-64"
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <ListFilter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-3 bg-muted/50 text-sm font-medium">
                  <div className="col-span-4">User</div>
                  <div className="col-span-3 hidden md:block">Course</div>
                  <div className="col-span-2 text-center">Progress</div>
                  <div className="col-span-2 text-center hidden md:block">Last Accessed</div>
                  <div className="col-span-2 md:col-span-1 text-center">Time Spent</div>
                </div>
                
                {filteredEnrollments.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Users className="h-10 w-10 mx-auto mb-3 opacity-50" />
                    <p>No enrollments found</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredEnrollments.map((enrollment) => (
                      <div key={enrollment.id} className="grid grid-cols-12 p-3 items-center text-sm">
                        <div className="col-span-4 flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="" alt={enrollment.user.name} />
                            <AvatarFallback>{enrollment.user.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{enrollment.user.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {enrollment.user.email}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3 hidden md:block truncate pr-4">
                          {enrollment.courseTitle}
                        </div>
                        <div className="col-span-2 text-center">
                          <div className="flex items-center justify-center">
                            <div className="w-full max-w-24 mr-2">
                              <div className="h-2 w-full bg-muted rounded-full">
                                <div 
                                  className="h-2 bg-primary rounded-full" 
                                  style={{ width: `${enrollment.progress}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-xs">{enrollment.progress}%</span>
                          </div>
                        </div>
                        <div className="col-span-2 text-center text-xs hidden md:block">
                          {enrollment.lastAccessed}
                        </div>
                        <div className="col-span-2 md:col-span-1 text-center text-xs">
                          {enrollment.timeSpent}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total Courses</CardTitle>
                <CardDescription>Active courses in platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{managedCourses.filter(c => c.status === 'published').length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {managedCourses.filter(c => c.status === 'draft').length} drafts
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total Enrollments</CardTitle>
                <CardDescription>All time enrollments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{enrollments.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {enrollments.filter(e => e.progress === 100).length} completed
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Average Completion</CardTitle>
                <CardDescription>Course completion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {Math.round(enrollments.reduce((acc, curr) => acc + curr.progress, 0) / enrollments.length)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on all enrollments
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Course Engagement</CardTitle>
              <CardDescription>User engagement analytics for all courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Detailed analytics will be available soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default LMSContentManager;
