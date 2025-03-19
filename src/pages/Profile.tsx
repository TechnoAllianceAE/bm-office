
import React from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { UserCog, Mail, User as UserIcon, Calendar, Shield } from 'lucide-react';

const Profile = () => {
  const { user, userRole } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.user_metadata?.full_name || user?.email}</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Shield className="h-3 w-3" /> {userRole || 'User'}
                </p>
              </div>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Your full name"
                  defaultValue={user?.user_metadata?.full_name || ''}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email || ''}
                  disabled
                />
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          </div>
        </Card>

        <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Account Information</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2 rounded-md bg-secondary/30">
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm">{user?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 rounded-md bg-secondary/30">
                <UserCog className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Role</p>
                  <p className="text-sm">{userRole || 'User'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 rounded-md bg-secondary/30">
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Joined</p>
                  <p className="text-sm">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
