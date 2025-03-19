
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth/AuthContext';
import { UserCog, Mail, User as UserIcon, Calendar, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Profile = () => {
  const { user, userRole } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setFullName(user?.user_metadata?.full_name || '');
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsSaving(true);
    try {
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });
      
      if (updateError) {
        throw updateError;
      }
      
      // Update app_users table
      const { error: dbUpdateError } = await supabase
        .from('app_users')
        .update({ 
          full_name: fullName,
        })
        .eq('user_id', user.id);
      
      if (dbUpdateError) {
        throw dbUpdateError;
      }
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

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
                <h2 className="text-xl font-semibold">{fullName || email}</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Shield className="h-3 w-3" /> {userRole || 'User'}
                </p>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSaveProfile}>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                />
              </div>

              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
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
