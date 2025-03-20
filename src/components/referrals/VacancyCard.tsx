
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Briefcase, Building, MapPin, DollarSign, Award,
  Share2, Mail, Linkedin, Facebook, Calendar, Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Vacancy {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  salary: string;
  referralBonus: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

interface VacancyCardProps {
  vacancy: Vacancy;
  onShare: (platform: string, vacancy: Vacancy) => void;
  referralCode: string;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ 
  vacancy, onShare, referralCode 
}) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(`Hi,\n\nI thought you might be interested in this job opportunity at ${vacancy.company}.\n\nPlease use my referral code: ${referralCode} when you apply.\n\nBest regards,`);

  const copyReferralLink = () => {
    const link = `https://careers.company.com/job/${vacancy.id}?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: 'Referral Link Copied!',
      description: 'The referral link has been copied to your clipboard.',
    });
  };

  const sendEmailReferral = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the referral email
    toast({
      title: 'Email Sent!',
      description: `Your referral for ${vacancy.title} has been sent to ${email}.`,
    });
    setEmail('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle>{vacancy.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Building className="w-4 h-4 mr-1" />
              {vacancy.company} • {vacancy.department}
            </CardDescription>
          </div>
          <Badge variant="outline" className="h-fit">
            <Award className="w-3 h-3 mr-1" />
            {vacancy.referralBonus} Bonus
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3 space-y-3">
        <div className="flex flex-wrap gap-y-2">
          <div className="flex items-center text-sm text-muted-foreground mr-4">
            <MapPin className="w-4 h-4 mr-1" />
            {vacancy.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground mr-4">
            <DollarSign className="w-4 h-4 mr-1" />
            {vacancy.salary}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            Posted: {formatDate(vacancy.postedDate)}
          </div>
        </div>

        <p className="text-sm">{vacancy.description}</p>

        <div>
          <div className="text-sm font-medium mb-1">Requirements:</div>
          <div className="flex flex-wrap gap-2">
            {vacancy.requirements.map((req, index) => (
              <Badge key={index} variant="secondary">{req}</Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Refer Someone
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Refer a Candidate</DialogTitle>
              <DialogDescription>
                Share this job opening with your network
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                <Button 
                  onClick={() => onShare('Email', vacancy)} 
                  variant="outline"
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  <Mail className="h-5 w-5" />
                  <span className="text-xs">Email</span>
                </Button>
                <Button 
                  onClick={() => onShare('LinkedIn', vacancy)}
                  variant="outline"
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="text-xs">LinkedIn</span>
                </Button>
                <Button 
                  onClick={() => onShare('Facebook', vacancy)}
                  variant="outline"
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="text-xs">Facebook</span>
                </Button>
                <Button 
                  onClick={copyReferralLink}
                  variant="outline"
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  <Copy className="h-5 w-5" />
                  <span className="text-xs">Copy Link</span>
                </Button>
              </div>
              
              <Separator />
              
              <form onSubmit={sendEmailReferral}>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Recipient Email
                    </label>
                    <Input 
                      id="email" 
                      placeholder="colleague@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="pt-2">
                    <Button type="submit">Send Referral</Button>
                  </div>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button variant="outline" size="sm" onClick={copyReferralLink}>
          <Copy className="w-4 h-4 mr-2" />
          Copy Referral Link
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VacancyCard;
