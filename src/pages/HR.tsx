
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, FileText, Award, Clock, User, UserPlus, BriefcaseBusiness, ScrollText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const HR = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">HR Portal</h1>
          <p className="text-muted-foreground">Manage your HR-related tasks and information</p>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leave">Leave Requests</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/50 backdrop-blur-sm border dark:bg-gray-900/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <CalendarDays className="mr-2 h-5 w-5 text-primary" />
                    Time Off Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Vacation</p>
                      <p className="text-2xl font-semibold">12 days</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Sick Leave</p>
                      <p className="text-2xl font-semibold">5 days</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Personal</p>
                      <p className="text-2xl font-semibold">3 days</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Used YTD</p>
                      <p className="text-2xl font-semibold">7 days</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">Request Time Off</Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white/50 backdrop-blur-sm border dark:bg-gray-900/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Last Review</p>
                      <p className="text-lg font-semibold">June 15, 2023</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Next Review</p>
                      <p className="text-lg font-semibold">December 15, 2023</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold mr-2">Exceeds Expectations</p>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          4.7/5
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">View Full Report</Button>
                </CardContent>
              </Card>
              
              <Card className="bg-white/50 backdrop-blur-sm border dark:bg-gray-900/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Award className="mr-2 h-5 w-5 text-primary" />
                    Recognition & Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Work Anniversary</p>
                      <p className="text-lg font-semibold">3 years (Oct 12)</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Recent Awards</p>
                      <div className="flex flex-col gap-2">
                        <Badge className="w-fit bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                          Quarterly Star (Q2 2023)
                        </Badge>
                        <Badge className="w-fit bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                          Innovation Award
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">Nominate a Colleague</Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/50 backdrop-blur-sm border dark:bg-gray-900/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Upcoming Time Off
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'John Smith', role: 'UI Designer', dates: 'Sep 20 - Sep 27', type: 'Vacation' },
                      { name: 'Sarah Johnson', role: 'Project Manager', dates: 'Sep 22', type: 'Personal Day' },
                      { name: 'Alex Wong', role: 'Developer', dates: 'Oct 5 - Oct 10', type: 'Vacation' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarFallback>
                              {item.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{item.dates}</p>
                          <p className="text-xs text-muted-foreground">{item.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/50 backdrop-blur-sm border dark:bg-gray-900/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <User className="mr-2 h-5 w-5 text-primary" />
                    Quick Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: UserPlus, label: 'Referral Program', color: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30' },
                      { icon: BriefcaseBusiness, label: 'Job Openings', color: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30' },
                      { icon: ScrollText, label: 'HR Policies', color: 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30' },
                      { icon: Award, label: 'Training Courses', color: 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30' },
                    ].map((item, i) => (
                      <motion.button 
                        key={i}
                        className={cn(
                          "flex flex-col items-center justify-center p-6 rounded-xl hover-lift",
                          item.color
                        )}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <item.icon className="h-6 w-6 mb-2" />
                        <span className="text-sm font-medium text-center">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="leave">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Leave Management</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    This section will allow you to request and track time off, view team calendars, and manage your leave balance.
                  </p>
                  <Button>Request Time Off</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="benefits">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Benefits Portal</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    View and manage your benefits including health insurance, retirement plans, and other perks.
                  </p>
                  <Button>Explore Benefits</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">HR Documents</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Access important documents including company policies, forms, and personal records.
                  </p>
                  <Button>View Documents</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default HR;
