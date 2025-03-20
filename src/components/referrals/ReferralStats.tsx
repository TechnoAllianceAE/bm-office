
import React from 'react';
import { 
  Users, Award, Check, Clock, DollarSign
} from 'lucide-react';

interface ReferralStatsProps {
  stats: {
    totalReferrals: number;
    activeReferrals: number;
    hiredReferrals: number;
    totalEarned: string;
    pendingEarnings: string;
  };
}

const ReferralStats: React.FC<ReferralStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      <div className="bg-card shadow-sm rounded-lg p-4 flex items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.totalReferrals}</div>
          <div className="text-sm text-muted-foreground">Total Referrals</div>
        </div>
      </div>
      
      <div className="bg-card shadow-sm rounded-lg p-4 flex items-center gap-4">
        <div className="bg-amber-500/10 p-3 rounded-full">
          <Clock className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.activeReferrals}</div>
          <div className="text-sm text-muted-foreground">Active Referrals</div>
        </div>
      </div>
      
      <div className="bg-card shadow-sm rounded-lg p-4 flex items-center gap-4">
        <div className="bg-green-500/10 p-3 rounded-full">
          <Check className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.hiredReferrals}</div>
          <div className="text-sm text-muted-foreground">Hired</div>
        </div>
      </div>
      
      <div className="bg-card shadow-sm rounded-lg p-4 flex items-center gap-4">
        <div className="bg-secondary/10 p-3 rounded-full">
          <DollarSign className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.totalEarned}</div>
          <div className="text-sm text-muted-foreground">Total Earned</div>
        </div>
      </div>
      
      <div className="bg-card shadow-sm rounded-lg p-4 flex items-center gap-4">
        <div className="bg-blue-500/10 p-3 rounded-full">
          <Award className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.pendingEarnings}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
      </div>
    </div>
  );
};

export default ReferralStats;
