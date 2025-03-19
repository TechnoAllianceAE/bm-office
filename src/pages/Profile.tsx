
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth/AuthContext';
import { UserCog, Mail, User as UserIcon, Calendar, Shield, Phone, Building, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Profile = () => {
  const { user, userRole } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    jobTitle: '',
    department: '',
    phoneNumber: '',
    location: '',
    bio: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      // Load data from user metadata
      setFormData({
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
        jobTitle: user.user_metadata?.job_title || '',
        department: user.user_metadata?.department || '',
        phoneNumber: user.user_metadata?.phone_number || '',
        location: user.user_metadata?.location || '',
        bio: user.user_metadata?.bio || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsSaving(true);
    try {
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          full_name: formData.fullName,
          job_title: formData.jobTitle,
          department: formData.department,
          phone_number: formData.phoneNumber,
          location: formData.location,
          bio: formData.bio
        }
      });
      
      if (updateError) {
        throw updateError;
      }
      
      // Update app_users table
      const { error: dbUpdateError } = await supabase
        .from('app_users')
        .update({ 
          full_name: formData.fullName,
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
                <h2 className="text-xl font-semibold">{formData.fullName || formData.email}</h2>
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
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Your job title"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="Your department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="Your phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Your location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="w-full rounded-md bg-background/50 backdrop-blur-sm border border-input p-3 h-24"
                  placeholder="A short bio about yourself"
                  value={formData.bio}
                  onChange={handleChange}
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
              
              <div className="flex items-center gap-2 p-2 rounded-md bg-secondary/30">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm">{formData.phoneNumber || 'Not set'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 rounded-md bg-secondary/30">
                <Building className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="text-sm">{formData.department || 'Not set'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 rounded-md bg-secondary/30">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm">{formData.location || 'Not set'}</p>
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
