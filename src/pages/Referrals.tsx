
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  UserPlus, Briefcase, Building, Share2, Mail, 
  Linkedin, Facebook, Copy, CheckCircle, Clock, Award, 
  ExternalLink, DollarSign, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import ReferralCard from '@/components/referrals/ReferralCard';
import VacancyCard from '@/components/referrals/VacancyCard';
import ReferralStats from '@/components/referrals/ReferralStats';
import { Progress } from '@/components/ui/progress';

// Mock data for the referrals page
const VACANCIES = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    department: 'Engineering',
    location: 'Remote / New York',
    salary: '$120,000 - $150,000',
    referralBonus: '$3,000',
    description: 'We are looking for an experienced Frontend Developer with React expertise to join our growing team.',
    requirements: ['5+ years of experience', 'React', 'TypeScript', 'CSS/SCSS'],
    postedDate: '2023-06-15',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateSoft',
    department: 'Product',
    location: 'San Francisco',
    salary: '$130,000 - $160,000',
    referralBonus: '$2,500',
    description: 'Looking for a strategic Product Manager to drive our product roadmap and collaborate with engineering teams.',
    requirements: ['3+ years in Product Management', 'Tech background', 'Agile methodologies'],
    postedDate: '2023-06-10',
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    department: 'Operations',
    location: 'Remote / Austin',
    salary: '$110,000 - $140,000',
    referralBonus: '$2,000',
    description: 'Seeking a DevOps Engineer to help build and maintain our cloud infrastructure and CI/CD pipelines.',
    requirements: ['AWS/GCP expertise', 'Kubernetes', 'Terraform', 'CI/CD pipelines'],
    postedDate: '2023-06-05',
  },
];

const REFERRALS = [
  {
    id: '1',
    name: 'John Smith',
    position: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    status: 'Interview - Technical Round',
    progress: 60,
    referralDate: '2023-05-20',
    referralCode: 'REF-JS-2305',
    earningStatus: 'Pending',
    earningAmount: '$3,000',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    position: 'UX Designer',
    company: 'DesignHub Co.',
    status: 'Onboarding',
    progress: 90,
    referralDate: '2023-04-15',
    referralCode: 'REF-SJ-2304',
    earningStatus: 'Processing',
    earningAmount: '$2,500',
  },
  {
    id: '3',
    name: 'Michael Chen',
    position: 'Data Scientist',
    company: 'DataMinds Inc.',
    status: 'Hired',
    progress: 100,
    referralDate: '2023-03-10',
    referralCode: 'REF-MC-2303',
    earningStatus: 'Paid',
    earningAmount: '$2,000',
  },
];

const STATS = {
  totalReferrals: 12,
  activeReferrals: 5,
  hiredReferrals: 7,
  totalEarned: '$15,000',
  pendingEarnings: '$7,500',
};

const Referrals: React.FC = () => {
  const { toast } = useToast();
  const [referralCode] = useState('REF-' + Math.random().toString(36).substring(2, 8).toUpperCase());

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: 'Referral Code Copied!',
      description: 'The referral code has been copied to your clipboard.',
    });
  };

  const shareVacancy = (platform: string, vacancy: typeof VACANCIES[0]) => {
    // In a real app, this would implement proper sharing functionality
    toast({
      title: `Shared on ${platform}!`,
      description: `You've shared the ${vacancy.title} position on ${platform}.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Referrals</h1>
          <p className="text-muted-foreground mt-1">
            Refer candidates to open positions and earn bonuses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-muted p-2 rounded-md flex items-center gap-2">
            <span className="text-sm font-medium">Your Referral Code:</span>
            <code className="bg-background px-2 py-1 rounded text-sm font-mono">
              {referralCode}
            </code>
            <Button variant="ghost" size="icon" onClick={copyReferralCode}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <ReferralStats stats={STATS} />

      <Tabs defaultValue="vacancies" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="vacancies">
            <Briefcase className="w-4 h-4 mr-2" />
            Open Vacancies
          </TabsTrigger>
          <TabsTrigger value="myreferrals">
            <UserPlus className="w-4 h-4 mr-2" />
            My Referrals
          </TabsTrigger>
          <TabsTrigger value="earnings">
            <Award className="w-4 h-4 mr-2" />
            Earnings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vacancies" className="space-y-4">
          <div className="flex flex-wrap gap-4 mb-4">
            <Input 
              placeholder="Search positions..." 
              className="w-full md:w-80" 
            />
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">All Departments</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Engineering</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Product</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">Operations</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {VACANCIES.map((vacancy) => (
              <VacancyCard 
                key={vacancy.id} 
                vacancy={vacancy} 
                onShare={shareVacancy}
                referralCode={referralCode}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="myreferrals">
          <div className="grid grid-cols-1 gap-4">
            {REFERRALS.map((referral) => (
              <ReferralCard key={referral.id} referral={referral} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle>Referral Earnings</CardTitle>
              <CardDescription>
                Track your referral bonuses and payment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg flex-1">
                    <div className="text-sm text-muted-foreground">Total Earned</div>
                    <div className="text-2xl font-bold flex items-center mt-1">
                      <DollarSign className="w-5 h-5 text-primary mr-1" />
                      {STATS.totalEarned}
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg flex-1">
                    <div className="text-sm text-muted-foreground">Pending Payments</div>
                    <div className="text-2xl font-bold flex items-center mt-1">
                      <DollarSign className="w-5 h-5 text-primary mr-1" />
                      {STATS.pendingEarnings}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Earnings History</h3>
                  
                  {REFERRALS.map((referral) => (
                    <div key={referral.id} className="flex flex-col md:flex-row justify-between gap-2 p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{referral.name}</div>
                        <div className="text-sm text-muted-foreground">{referral.position} at {referral.company}</div>
                        <div className="text-sm mt-1">{referral.referralCode}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="font-medium">{referral.earningAmount}</div>
                        <Badge 
                          variant={
                            referral.earningStatus === 'Paid' ? 'default' : 
                            referral.earningStatus === 'Processing' ? 'secondary' : 
                            'outline'
                          }
                        >
                          {referral.earningStatus}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Referrals;
