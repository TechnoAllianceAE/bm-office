
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { PageTransition } from "./components/layout/PageTransition";
import { useIsMobile } from "./hooks/use-mobile";

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

const queryClient = new QueryClient();

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  useEffect(() => {
    // Close sidebar automatically on mobile
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
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
                    <Route path="/mis" element={<MIS />} />
                    <Route path="/requisition" element={<Requisition />} />
                    <Route path="/helpdesk" element={<HelpDesk />} />
                    <Route path="/lms" element={<LMS />} />
                    <Route path="/lms/course/:id" element={<CourseView />} />
                    <Route path="/claims" element={<Claims />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PageTransition>
              </div>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
