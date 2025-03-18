import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Play, Pause, SkipForward, SkipBack, 
  Volume2, VolumeX, Maximize, List, BookOpen, MessageSquare, 
  GraduationCap, ThumbsUp, Download, Share2, Sparkle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/common/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

// Sample course data - this would come from an API in a real app
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
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    units: [
      {
        id: 1,
        title: 'Introduction to BM Office',
        lessons: [
          { id: 1, title: 'Welcome to the Course', duration: '5:20', isComplete: true },
          { id: 2, title: 'Course Overview', duration: '8:45', isComplete: true },
          { id: 3, title: 'Understanding the Interface', duration: '12:30', isComplete: false },
        ]
      },
      {
        id: 2,
        title: 'Working with Documents',
        lessons: [
          { id: 4, title: 'Creating New Documents', duration: '10:15', isComplete: false },
          { id: 5, title: 'Formatting and Styling', duration: '15:30', isComplete: false },
          { id: 6, title: 'Templates and Automation', duration: '18:45', isComplete: false },
        ]
      },
      {
        id: 3,
        title: 'Collaboration Features',
        lessons: [
          { id: 7, title: 'Sharing Documents', duration: '9:20', isComplete: false },
          { id: 8, title: 'Real-time Collaboration', duration: '14:10', isComplete: false },
          { id: 9, title: 'Comments and Feedback', duration: '11:55', isComplete: false },
        ]
      }
    ]
  },
  // Add more course data here...
];

const CourseView = () => {
  const { id } = useParams();
  const courseId = parseInt(id || '1');
  const course = courses.find(c => c.id === courseId) || courses[0];
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [assistQuestion, setAssistQuestion] = useState('');
  const [aiResponses, setAiResponses] = useState([
    { 
      question: "What's the best way to use templates?", 
      answer: "Templates in BM Office are best used when you have repeated document formats. You can create your own custom templates by saving a document as a template file. Access templates from the 'New' menu and select from available templates." 
    }
  ]);
  
  // Find current lesson
  const currentLesson = course.units
    .flatMap(unit => unit.lessons)
    .find(lesson => lesson.id === currentLessonId);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };
  
  const handleNextLesson = () => {
    const allLessons = course.units.flatMap(unit => unit.lessons);
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
    if (currentIndex < allLessons.length - 1) {
      setCurrentLessonId(allLessons[currentIndex + 1].id);
    }
  };
  
  const handlePreviousLesson = () => {
    const allLessons = course.units.flatMap(unit => unit.lessons);
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
    if (currentIndex > 0) {
      setCurrentLessonId(allLessons[currentIndex - 1].id);
    }
  };
  
  const handleAskAI = () => {
    if (!assistQuestion.trim()) return;
    
    // In a real app, this would call an AI API
    const newResponse = { 
      question: assistQuestion, 
      answer: `This is a simulated AI response to: "${assistQuestion}". In a real application, this would be generated by an AI model based on the course content and your specific question.` 
    };
    
    setAiResponses([newResponse, ...aiResponses]);
    setAssistQuestion('');
  };
  
  return (
    <div className="flex flex-col space-y-4">
      {/* Back button and course title */}
      <div className="flex items-center justify-between">
        <Link 
          to="/lms" 
          className="flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to courses
        </Link>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Resources
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>
      
      <h1 className="text-2xl font-semibold mb-0">{course.title}</h1>
      <p className="text-muted-foreground">{currentLesson?.title || 'Introduction'}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video player column */}
        <div className="lg:col-span-2">
          <Card className="glassmorphic-card overflow-hidden">
            {/* Video container */}
            <div className="aspect-video bg-black relative">
              <video 
                src={course.videoUrl} 
                className="w-full h-full" 
                poster={course.thumbnail}
                muted={isMuted}
              />
              
              {/* Video controls overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                {/* Progress bar */}
                <div className="w-full h-1 bg-white/30 rounded-full mb-4">
                  <div className="w-1/3 h-1 bg-primary rounded-full" />
                </div>
                
                {/* Control buttons */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <button onClick={handlePreviousLesson}>
                      <SkipBack className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={handlePlayPause}
                      className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                    <button onClick={handleNextLesson}>
                      <SkipForward className="h-5 w-5" />
                    </button>
                    <button onClick={handleMuteToggle}>
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">03:24 / 10:15</span>
                    <button>
                      <Maximize className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video tabs */}
            <Tabs defaultValue="content" className="p-4">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="content">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="notes">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Notes
                </TabsTrigger>
                <TabsTrigger value="resources">
                  <Download className="h-4 w-4 mr-2" />
                  Resources
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="pt-4">
                <h3 className="text-lg font-medium mb-2">About this lesson</h3>
                <p className="text-muted-foreground mb-4">
                  {currentLesson?.title}: Learn about the key features of the BM Office interface and how to navigate between different tools and functions efficiently.
                </p>
                
                <h3 className="text-lg font-medium mb-2">Learning objectives</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Understand the BM Office navigation system</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Master the ribbon interface and quick access toolbar</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Use keyboard shortcuts to boost productivity</span>
                  </li>
                </ul>
              </TabsContent>
              
              <TabsContent value="notes" className="pt-4">
                <Textarea 
                  placeholder="Add your notes for this lesson here..." 
                  className="min-h-[120px] mb-4"
                />
                <Button>
                  Save Notes
                </Button>
              </TabsContent>
              
              <TabsContent value="resources" className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/40 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-2 text-primary" />
                      <span>Interface_Guide.pdf</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2.4 MB</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/40 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-2 text-primary" />
                      <span>Keyboard_Shortcuts.pdf</span>
                    </div>
                    <span className="text-xs text-muted-foreground">1.2 MB</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/40 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-2 text-primary" />
                      <span>Practice_Files.zip</span>
                    </div>
                    <span className="text-xs text-muted-foreground">5.8 MB</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
        {/* Sidebar column with course content and AI assistant */}
        <div className="lg:col-span-1 space-y-4">
                    
          {/* Course content card */}
          <Card className="glassmorphic-card p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <List className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-medium">Course Content</h3>
              </div>
              <span className="text-sm text-muted-foreground">
                {course.units.flatMap(unit => unit.lessons).filter(lesson => lesson.isComplete).length} / {course.lessons} completed
              </span>
            </div>
            
            <div className="space-y-4">
              {course.units.map((unit) => (
                <div key={unit.id}>
                  <h4 className="font-medium mb-2 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                    {unit.title}
                  </h4>
                  <div className="space-y-1 pl-6">
                    {unit.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        className={`w-full text-left flex items-center justify-between p-2 rounded-md ${
                          currentLessonId === lesson.id ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/60'
                        }`}
                        onClick={() => setCurrentLessonId(lesson.id)}
                      >
                        <div className="flex items-center">
                          {lesson.isComplete ? (
                            <div className="h-4 w-4 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2">
                              <span className="text-[10px]">✓</span>
                            </div>
                          ) : (
                            <div className="h-4 w-4 mr-2">
                              {currentLessonId === lesson.id && <Play className="h-3 w-3" />}
                            </div>
                          )}
                          <span className="text-sm">{lesson.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          {/* AI Assistant Card */}
          <Card className="glassmorphic-card p-4">
            <div className="flex items-center mb-4">
              <Sparkle className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-medium">AI Learning Assistant</h3>
            </div>
            
            <Textarea 
              placeholder="Ask any question about this course..." 
              className="mb-2"
              value={assistQuestion}
              onChange={(e) => setAssistQuestion(e.target.value)}
            />
            <Button 
              className="w-full"
              onClick={handleAskAI}
            >
              Ask Assistant
            </Button>
            
            <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
              {aiResponses.map((item, index) => (
                <div key={index} className="bg-secondary/30 rounded-lg p-3">
                  <p className="text-sm font-medium mb-1">{item.question}</p>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                  <div className="flex items-center justify-end mt-2">
                    <Button variant="ghost" size="sm" className="h-6">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Helpful
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>


        </div>
      </div>
    </div>
  );
};

export default CourseView;

