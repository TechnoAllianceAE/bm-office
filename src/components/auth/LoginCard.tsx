
import { useState } from 'react';
import { useAuth } from '@/contexts/auth/AuthContext';
import { Shield } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoginForm, LoginFormValues } from './LoginForm';
import { SignupForm, SignupFormValues } from './SignupForm';
import { SuperAdminForm, SuperAdminFormValues } from './SuperAdminForm';

export const LoginCard = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { signIn, signUp, createSuperAdmin, isLoading } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuperAdminLoading, setIsSuperAdminLoading] = useState(false);
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false);

  const onLoginSubmit = async (values: LoginFormValues) => {
    try {
      setIsLoginSubmitting(true);
      await signIn(values.email, values.password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoginSubmitting(false);
    }
  };

  const onSignupSubmit = async (values: SignupFormValues) => {
    try {
      setIsSignupSubmitting(true);
      await signUp(values.email, values.password, values.fullName);
      setActiveTab('login');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsSignupSubmitting(false);
    }
  };

  const onSuperAdminSubmit = async (values: SuperAdminFormValues) => {
    try {
      setIsSuperAdminLoading(true);
      await createSuperAdmin(values.email, values.password, values.fullName);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Super Admin creation error:', error);
    } finally {
      setIsSuperAdminLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-card/40 backdrop-blur-md border border-white/10">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">BM Office</CardTitle>
        <CardDescription>Sign in to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm 
              onSubmit={onLoginSubmit} 
              isSubmitting={isLoginSubmitting || isLoading} 
            />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm 
              onSubmit={onSignupSubmit} 
              isSubmitting={isSignupSubmitting || isLoading} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <p className="w-full text-center text-sm text-muted-foreground">
          Protected by BM Office Security
        </p>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <Shield className="h-4 w-4 mr-2" />
              Create Super Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Super Admin Account</DialogTitle>
              <DialogDescription>
                Super Admin has full access to all system features including user management.
              </DialogDescription>
            </DialogHeader>
            
            <SuperAdminForm 
              onSubmit={onSuperAdminSubmit}
              onCancel={() => setIsDialogOpen(false)}
              isSubmitting={isSuperAdminLoading}
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
