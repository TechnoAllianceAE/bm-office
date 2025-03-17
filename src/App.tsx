
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { PageTransition } from "./components/layout/PageTransition";

// Pages
import Dashboard from "./pages/Dashboard";
import Timesheet from "./pages/Timesheet";
import Projects from "./pages/Projects";
import HR from "./pages/HR";
import Directory from "./pages/Directory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
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
              <Navbar isSidebarOpen={isSidebarOpen} />
              
              <div className="container px-4 pt-24 pb-12">
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/timesheet" element={<Timesheet />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/hr" element={<HR />} />
                    <Route path="/directory" element={<Directory />} />
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
