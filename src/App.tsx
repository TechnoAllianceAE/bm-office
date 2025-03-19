
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { PageTransition } from "./components/layout/PageTransition";
import { useIsMobile } from "./hooks/use-mobile";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Skeleton } from "./components/ui/skeleton";

// Pages
import Dashboard from "./pages/Dashboard";
import Timesheet from "./pages/Timesheet";
import Projects from "./pages/Projects";
import HR from "./pages/HR";
import Directory from "./pages/Directory";
import AIAssistant from "./pages/AIAssistant";
import DMS from "./pages/DMS";
import Tools from "./pages/Tools";
import Analytics from "./pages/Analytics";
import SettingsPage from "./pages/Settings";
import MIS from "./pages/MIS";
import Requisition from "./pages/Requisition";
import AIWorkflow from "./pages/AIWorkflow";
import HelpDesk from "./pages/HelpDesk";
import Mailbox from "./pages/Mailbox";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import LMS from "./pages/LMS";
import CourseView from "./pages/CourseView";
import Claims from "./pages/Claims";
import Login from "./pages/Login";
import UserManagement from "./pages/UserManagement";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

// Modified loading screen with debug info
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center space-y-4">
      <div className="spinner animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
      <p className="text-lg font-medium">Loading...</p>
    </div>
  </div>
);

// Modified ProtectedRoute to bypass authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // TEMPORARILY BYPASSING AUTH CHECK
  return <>{children}</>;
  
  /* Original code commented out
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    console.log("ProtectedRoute state:", { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
  */
};

// Modified PublicRoute to bypass authentication
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  // TEMPORARILY BYPASSING AUTH CHECK
  return <>{children}</>;
  
  /* Original code commented out
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    console.log("PublicRoute state:", { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
  */
};

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  // TEMPORARILY HARDCODED AUTH STATE
  const isAuthenticated = true;
  const isLoading = false;
  
  /* Original code commented out
  const { isAuthenticated, isLoading } = useAuth();
  */
  
  console.log('AppContent render state:', { isAuthenticated, isLoading });
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);
  
  useEffect(() => {
    const defaultBackgroundUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070';
    document.body.style.backgroundImage = `url(${defaultBackgroundUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${defaultBackgroundUrl});
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        filter: blur(10px);
        z-index: -1;
      }
      body {
        background-color: rgba(255, 255, 255, 0.1);
      }
    `;
    styleEl.id = 'bg-style';
    document.head.appendChild(styleEl);
    
    return () => {
      if (document.getElementById('bg-style')) {
        document.getElementById('bg-style')?.remove();
      }
    };
  }, []);
  
  // Always render full app structure, skipping authentication checks
  return (
    <>
      <div className="flex min-h-screen w-full">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}>
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          
          <div className="container px-4 pt-24 pb-12">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/timesheet" element={<Timesheet />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/hr" element={<HR />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/mailbox" element={<Mailbox />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/ai-workflow" element={<AIWorkflow />} />
                <Route path="/dms" element={<DMS />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/mis" element={<MIS />} />
                <Route path="/requisition" element={<Requisition />} />
                <Route path="/helpdesk" element={<HelpDesk />} />
                <Route path="/lms" element={<LMS />} />
                <Route path="/lms/course/:id" element={<CourseView />} />
                <Route path="/claims" element={<Claims />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </div>
        </main>
      </div>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
