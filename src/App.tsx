
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Timesheet from "./pages/Timesheet";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import ApproveTimesheets from "./pages/ApproveTimesheets";
import Organization from "./pages/Organization";
import Analytics from "./pages/Analytics";
import AIAssistant from "./pages/AIAssistant";
import DocumentManager from "./pages/DocumentManager";
import HandyTools from "./pages/HandyTools";
import NotFound from "./pages/NotFound";
import MailBox from "./pages/MailBox"; 
import Directory from "./pages/Directory";
import MIS from "./pages/MIS";
import Requisition from "./pages/Requisition";
import Settings from "./pages/Settings";
import AppBranding from "./pages/AppBranding";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/auth/AuthContext";
import AIWorkflow from "./pages/AIWorkflow";
import HR from "./pages/HR";
import CourseView from "./pages/CourseView";
import Claims from "./pages/Claims";
import UserManagement from "./pages/UserManagement";
import LMS from "./pages/LMS";
import LMSContentManager from "./pages/LMSContentManager";
import Calendar from "./pages/Calendar";
import HelpDesk from "./pages/HelpDesk";
import Referrals from "./pages/Referrals";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              
              {/* Dashboard routes - wrapped in AppLayout */}
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/mis" element={<MIS />} />
                <Route path="/timesheet" element={<Timesheet />} />
                <Route path="/timesheet/approve" element={<ApproveTimesheets />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/new" element={<NewProject />} />
                <Route path="/projects/organization" element={<Organization />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/ai-workflow" element={<AIWorkflow />} />
                <Route path="/requisition" element={<Requisition />} />
                <Route path="/document-manager" element={<DocumentManager />} />
                <Route path="/hr" element={<HR />} />
                <Route path="/referrals" element={<Referrals />} />
                <Route path="/claims" element={<Claims />} />
                <Route path="/helpdesk" element={<HelpDesk />} />
                <Route path="/lms" element={<LMS />} />
                <Route path="/lms/course/:id" element={<CourseView />} />
                <Route path="/lms/content-manager" element={<LMSContentManager />} />
                <Route path="/handy-tools" element={<HandyTools />} />
                <Route path="/mailbox" element={<MailBox />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/usermanagement" element={<UserManagement />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/branding" element={<AppBranding />} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
