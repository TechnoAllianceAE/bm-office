
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/common/Card';
import { toast } from 'sonner';
import { Save, Lock } from 'lucide-react';

export function SecuritySettingsTab() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Password complexity settings
  const [minPasswordLength, setMinPasswordLength] = useState(8);
  const [requireUppercase, setRequireUppercase] = useState(true);
  const [requireLowercase, setRequireLowercase] = useState(true);
  const [requireNumbers, setRequireNumbers] = useState(true);
  const [requireSpecialChars, setRequireSpecialChars] = useState(false);
  const [passwordExpiryDays, setPasswordExpiryDays] = useState(90);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
  
  // SSO settings
  const [googleSSOEnabled, setGoogleSSOEnabled] = useState(false);
  const [microsoftSSOEnabled, setMicrosoftSSOEnabled] = useState(false);
  const [linkedInSSOEnabled, setLinkedInSSOEnabled] = useState(false);
  
  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Security settings saved successfully');
    } catch (error) {
      console.error('Error saving security settings:', error);
      toast.error('Failed to save security settings');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Password Policy */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Password Policy</h3>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="password-length">Minimum Password Length</Label>
              <span className="text-sm font-medium">{minPasswordLength} characters</span>
            </div>
            <Slider 
              id="password-length" 
              min={6} 
              max={20} 
              step={1} 
              value={[minPasswordLength]} 
              onValueChange={(value) => setMinPasswordLength(value[0])} 
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="require-uppercase">Require Uppercase Letters</Label>
              <Switch 
                id="require-uppercase" 
                checked={requireUppercase} 
                onCheckedChange={setRequireUppercase} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="require-lowercase">Require Lowercase Letters</Label>
              <Switch 
                id="require-lowercase" 
                checked={requireLowercase} 
                onCheckedChange={setRequireLowercase} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="require-numbers">Require Numbers</Label>
              <Switch 
                id="require-numbers" 
                checked={requireNumbers} 
                onCheckedChange={setRequireNumbers} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="require-special">Require Special Characters</Label>
              <Switch 
                id="require-special" 
                checked={requireSpecialChars} 
                onCheckedChange={setRequireSpecialChars} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password-expiry">Password Expiry (Days)</Label>
              <Input 
                id="password-expiry" 
                type="number" 
                min={0} 
                value={passwordExpiryDays} 
                onChange={(e) => setPasswordExpiryDays(parseInt(e.target.value) || 0)} 
              />
              <p className="text-xs text-muted-foreground">0 = no expiration</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="max-attempts">Max Failed Login Attempts</Label>
              <Input 
                id="max-attempts" 
                type="number" 
                min={1} 
                value={maxLoginAttempts} 
                onChange={(e) => setMaxLoginAttempts(parseInt(e.target.value) || 1)} 
              />
            </div>
          </div>
        </div>
      </Card>
      
      {/* Single Sign-On */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Single Sign-On (SSO)</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="google-sso">Google SSO</Label>
            <Switch 
              id="google-sso" 
              checked={googleSSOEnabled} 
              onCheckedChange={setGoogleSSOEnabled} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="microsoft-sso">Microsoft SSO</Label>
            <Switch 
              id="microsoft-sso" 
              checked={microsoftSSOEnabled} 
              onCheckedChange={setMicrosoftSSOEnabled} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="linkedin-sso">LinkedIn SSO</Label>
            <Switch 
              id="linkedin-sso" 
              checked={linkedInSSOEnabled} 
              onCheckedChange={setLinkedInSSOEnabled} 
            />
          </div>
        </div>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}
