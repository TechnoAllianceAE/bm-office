
import React from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle 
} from "@/components/ui/card";
import {
  User, Building, Clock, Award, DollarSign
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Referral {
  id: string;
  name: string;
  position: string;
  company: string;
  status: string;
  progress: number;
  referralDate: string;
  referralCode: string;
  earningStatus: string;
  earningAmount: string;
}

interface ReferralCardProps {
  referral: Referral;
}

const ReferralCard: React.FC<ReferralCardProps> = ({ referral }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    if (status.includes('Hired')) {
      return 'bg-green-500';
    } else if (status.includes('Onboarding')) {
      return 'bg-blue-500';
    } else if (status.includes('Interview')) {
      return 'bg-amber-500';
    } else {
      return 'bg-gray-500';
    }
  };

  const getEarningVariant = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'default';
      case 'Processing':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-col sm:flex-row justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {referral.name}
          </CardTitle>
          <div className="text-sm text-muted-foreground mt-1 flex items-center">
            <Building className="w-4 h-4 mr-1" />
            {referral.position} at {referral.company}
          </div>
        </div>
        <div className="mt-2 sm:mt-0">
          <div className="text-sm font-medium">
            Referred on {formatDate(referral.referralDate)}
          </div>
          <div className="text-sm text-muted-foreground">
            {referral.referralCode}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Current Status</div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(referral.status)}`}></div>
                <span className="font-medium">{referral.status}</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Referral Bonus</div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="font-medium">{referral.earningAmount}</span>
                <Badge variant={getEarningVariant(referral.earningStatus)}>
                  {referral.earningStatus}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Application Progress</span>
              <span className="font-medium">{referral.progress}%</span>
            </div>
            <Progress value={referral.progress} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralCard;
