
import React from 'react';
import { 
  Clock, FileText, MessageSquare, Calendar, 
  PlusCircle, User, CreditCard, Receipt
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const actions = [
  { icon: Clock, label: 'Add Time', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
  { icon: FileText, label: 'Submit Report', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' },
  { icon: MessageSquare, label: 'Message', color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' },
  { icon: Calendar, label: 'Schedule', color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' },
  { icon: PlusCircle, label: 'New Project', color: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400' },
  { icon: User, label: 'HR Request', color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' },
  { icon: CreditCard, label: 'Benefits', color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400' },
  { icon: Receipt, label: 'Invoices', color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' },
];

const QuickActions = () => {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <Card className="bg-white/50 backdrop-blur-sm border dark:bg-gray-900/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {actions.map((action, index) => (
              <button
                key={action.label}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-xl hover:scale-105 transition",
                  action.color
                )}
              >
                <action.icon className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default QuickActions;
