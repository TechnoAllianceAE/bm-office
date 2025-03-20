
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import QuickActions from "@/components/dashboard/QuickActions";
import StatCard from "@/components/dashboard/StatCard";
import TimesheetSummary from "@/components/dashboard/TimesheetSummary";
import ProjectList from "@/components/dashboard/ProjectList";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";

const Index = () => {
  const navigate = useNavigate();
  
  // Redirect to dashboard if we're at the root
  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Office Hub</h1>
        <p className="text-xl text-gray-600 mb-6">Your complete intranet solution</p>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Index;
