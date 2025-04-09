
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, GraduationCap, BookOpen, Book, Video, Play, PenSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/common/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Sample course data
const courses = [
  {
    id: 1,
    title: 'Using BM Office Suite Effectively',
    description: 'Learn how to use all features of the BM Office platform to boost your productivity.',
    author: 'John Smith',
    duration: '3h 45m',
    lessons: 12,
    level: 'Beginner',
    category: 'Application',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-9b4d0d6e12c0?q=80&w=2070',
    progress: 0
  },
  {
    id: 2,
    title: 'Advanced Project Management',
    description: 'Master project management techniques to deliver projects on time and within budget.',
    author: 'Sarah Johnson',
    duration: '5h 20m',
    lessons: 18,
    level: 'Advanced',
    category: 'Personal',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070',
    progress: 30
  },
  {
    id: 3,
    title: 'Effective Communication Skills',
    description: 'Improve your communication skills to become a more effective team member and leader.',
    author: 'Michael Brown',
    duration: '2h 15m',
    lessons: 8,
    level: 'Intermediate',
    category: 'Personal',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074',
    progress: 75
  },
  {
    id: 4,
    title: 'Document Management System Tutorial',
    description: 'Learn how to use the DMS to organize, store, and retrieve documents efficiently.',
    author: 'Emily Wilson',
    duration: '1h 30m',
    lessons: 6,
    level: 'Beginner',
    category: 'Application',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070',
    progress: 100
  },
  {
    id: 5,
    title: 'Time Management Essentials',
    description: 'Discover strategies to manage your time effectively and increase productivity.',
    author: 'David Clark',
    duration: '2h 50m',
    lessons: 10,
    level: 'Beginner',
    category: 'Personal',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2076',
    progress: 45
  },
  {
    id: 6,
    title: 'Advanced Analytics Dashboard',
    description: 'Master the use of analytics dashboards to make data-driven decisions.',
    author: 'Linda Martinez',
    duration: '4h 10m',
    lessons: 15,
    level: 'Advanced',
    category: 'Application',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
    progress: 10
  },
];

const LMS = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'application') return matchesSearch && course.category === 'Application';
    if (activeTab === 'personal') return matchesSearch && course.category === 'Personal';
    if (activeTab === 'inProgress') return matchesSearch && course.progress > 0 && course.progress < 100;
    if (activeTab === 'completed') return matchesSearch && course.progress === 100;
    
    return matchesSearch;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center">
            <GraduationCap className="mr-2 h-6 w-6" />
            Learning Management System
          </h1>
          <p className="text-muted-foreground">Enhance your skills with our curated courses</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Link to="/lms/content-manager">
            <Button variant="default" className="flex items-center gap-2">
              <PenSquare className="h-4 w-4" />
              Content Manager
            </Button>
          </Link>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="application">Application</TabsTrigger>
          <TabsTrigger value="personal">Personal Growth</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <FeaturedCourses 
            courses={filteredCourses.filter(course => course.featured)} 
          />
          <AllCourses 
            courses={filteredCourses} 
            title="All Courses" 
          />
        </TabsContent>
        
        <TabsContent value="application" className="mt-4">
          <AllCourses 
            courses={filteredCourses} 
            title="Application Courses" 
          />
        </TabsContent>
        
        <TabsContent value="personal" className="mt-4">
          <AllCourses 
            courses={filteredCourses} 
            title="Personal Growth Courses" 
          />
        </TabsContent>
        
        <TabsContent value="inProgress" className="mt-4">
          <AllCourses 
            courses={filteredCourses} 
            title="Courses In Progress" 
          />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <AllCourses 
            courses={filteredCourses} 
            title="Completed Courses" 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Featured courses section with horizontal scrolling
const FeaturedCourses = ({ courses }) => {
  if (courses.length === 0) return null;
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">Featured Courses</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {courses.map(course => (
          <Link 
            to={`/lms/course/${course.id}`} 
            key={course.id}
            className="min-w-[300px] max-w-[300px]"
          >
            <Card 
              className="glassmorphic-card h-full flex flex-col hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${course.id * 100}ms` }}
            >
              <div 
                className="h-40 rounded-t-xl bg-cover bg-center relative"
                style={{ backgroundImage: `url(${course.thumbnail})` }}
              >
                <div className="absolute inset-0 bg-black/30 rounded-t-xl flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-white/80 flex items-center justify-center">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {course.duration}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {course.level}
                  </span>
                  <span className="text-xs font-medium bg-secondary/70 px-2 py-0.5 rounded">
                    {course.lessons} lessons
                  </span>
                </div>
                <h3 className="font-medium text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                  {course.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{course.author}</span>
                  {course.progress > 0 && (
                    <div className="w-20">
                      <div className="h-1.5 w-full bg-secondary rounded-full">
                        <div 
                          className="h-1.5 bg-primary rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

// All courses grid display
const AllCourses = ({ courses, title }) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-10">
        <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No courses found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Link 
            to={`/lms/course/${course.id}`} 
            key={course.id}
          >
            <Card 
              className="glassmorphic-card h-full flex flex-col hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${course.id * 100}ms` }}
            >
              <div 
                className="h-40 rounded-t-xl bg-cover bg-center relative"
                style={{ backgroundImage: `url(${course.thumbnail})` }}
              >
                <div className="absolute inset-0 bg-black/30 rounded-t-xl">
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {course.duration}
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {course.level}
                  </span>
                  <span className="text-xs font-medium bg-secondary/70 px-2 py-0.5 rounded">
                    {course.category}
                  </span>
                </div>
                <h3 className="font-medium text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                  {course.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{course.author}</span>
                  {course.progress > 0 && (
                    <div className="w-20">
                      <div className="h-1.5 w-full bg-secondary rounded-full">
                        <div 
                          className="h-1.5 bg-primary rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LMS;
