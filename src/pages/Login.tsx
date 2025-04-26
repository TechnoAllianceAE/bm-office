
import { Mail, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { PasswordInput } from '@/components/auth/PasswordInput';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md relative animate-fade-in">
        {/* Logo */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 animate-fade-in">
          <div className="rounded-xl glass-panel p-2.5 shadow-glass">
            <img 
              src="/lovable-uploads/05305298-8812-4b79-9e2e-0f8fa2dc1d97.png" 
              alt="BM Office Logo" 
              className="h-8 w-8"
            />
          </div>
        </div>

        <Card className="glass-card backdrop-blur-md bg-white/90 shadow-glass border-0">
          <CardHeader className="space-y-1 text-center pt-8">
            <CardTitle className="text-2xl font-bold tracking-tight text-gradient">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to continue to the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  className="pl-9 glass-panel"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput id="password" className="glass-panel" />
              <div className="text-right">
                <Button variant="link" className="px-0 font-normal text-xs">
                  Forgot your password?
                </Button>
              </div>
            </div>
            
            <Button 
              className="w-full bg-primary hover:bg-primary/90 shadow-glass" 
              size="lg"
            >
              Sign in with Email
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="glass-panel px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <SocialLoginButtons />
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Button variant="link" className="p-0 font-normal h-auto">
                  Sign up
                </Button>
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-3 w-3" />
              Secured by Clerk
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
