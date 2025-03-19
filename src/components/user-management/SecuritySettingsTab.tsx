
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { AlertCircle, Shield, Key, RefreshCw, User, Save, Lock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SecuritySettings {
  id: string;
  min_password_length: number;
  require_uppercase: boolean;
  require_lowercase: boolean;
  require_numbers: boolean;
  require_special_chars: boolean;
  password_expiry_days: number;
  max_login_attempts: number;
  google_sso_enabled: boolean;
  microsoft_sso_enabled: boolean;
  linkedin_sso_enabled: boolean;
}

export function SecuritySettingsTab() {
  const [settings, setSettings] = useState<SecuritySettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('security_settings')
        .select('*')
        .limit(1)
        .single();
      
      if (error) {
        throw error;
      }
      
      setSettings(data as SecuritySettings);
    } catch (error) {
      console.error('Error fetching security settings:', error);
      toast.error('Failed to load security settings');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = <K extends keyof SecuritySettings>(key: K, value: SecuritySettings[K]) => {
    if (settings) {
      setSettings({ ...settings, [key]: value });
      setHasChanges(true);
    }
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('security_settings')
        .update({
          min_password_length: settings.min_password_length,
          require_uppercase: settings.require_uppercase,
          require_lowercase: settings.require_lowercase,
          require_numbers: settings.require_numbers,
          require_special_chars: settings.require_special_chars,
          password_expiry_days: settings.password_expiry_days,
          max_login_attempts: settings.max_login_attempts,
          google_sso_enabled: settings.google_sso_enabled,
          microsoft_sso_enabled: settings.microsoft_sso_enabled,
          linkedin_sso_enabled: settings.linkedin_sso_enabled,
        })
        .eq('id', settings.id);
      
      if (error) {
        throw error;
      }
      
      toast.success('Security settings saved successfully');
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving security settings:', error);
      toast.error('Failed to save security settings');
    } finally {
      setIsSaving(false);
    }
  };

  const getPasswordStrengthLabel = () => {
    if (!settings) return 'Low';
    
    let score = 0;
    if (settings.min_password_length >= 12) score += 2;
    else if (settings.min_password_length >= 8) score += 1;
    
    if (settings.require_uppercase) score += 1;
    if (settings.require_lowercase) score += 1;
    if (settings.require_numbers) score += 1;
    if (settings.require_special_chars) score += 1;
    
    if (score >= 5) return 'Very High';
    if (score >= 4) return 'High';
    if (score >= 3) return 'Medium';
    if (score >= 2) return 'Low';
    return 'Very Low';
  };

  const getPasswordStrengthColor = () => {
    const label = getPasswordStrengthLabel();
    switch (label) {
      case 'Very High': return 'bg-green-500';
      case 'High': return 'bg-green-400';
      case 'Medium': return 'bg-yellow-400';
      case 'Low': return 'bg-orange-400';
      default: return 'bg-red-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!settings) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Could not load security settings. Please try refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Security Settings</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchSettings} 
            disabled={isSaving}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            size="sm" 
            onClick={handleSaveSettings} 
            disabled={!hasChanges || isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="password">
        <TabsList className="mb-6 bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger value="password">
            <Lock className="h-4 w-4 mr-2" />
            Password Policy
          </TabsTrigger>
          <TabsTrigger value="sso">
            <User className="h-4 w-4 mr-2" />
            SSO Providers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="password">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/40 backdrop-blur-md border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Password Policy
                </CardTitle>
                <CardDescription>
                  Configure password requirements for all users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="min_length">Minimum Length: {settings.min_password_length}</Label>
                      <span className="text-sm text-muted-foreground">
                        {settings.min_password_length} characters
                      </span>
                    </div>
                    <Slider
                      id="min_length"
                      value={[settings.min_password_length]}
                      min={6}
                      max={24}
                      step={1}
                      onValueChange={(value) => updateSetting('min_password_length', value[0])}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require_uppercase">Require Uppercase</Label>
                    <Switch
                      id="require_uppercase"
                      checked={settings.require_uppercase}
                      onCheckedChange={(checked) => updateSetting('require_uppercase', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require_lowercase">Require Lowercase</Label>
                    <Switch
                      id="require_lowercase"
                      checked={settings.require_lowercase}
                      onCheckedChange={(checked) => updateSetting('require_lowercase', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require_numbers">Require Numbers</Label>
                    <Switch
                      id="require_numbers"
                      checked={settings.require_numbers}
                      onCheckedChange={(checked) => updateSetting('require_numbers', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="require_special">Require Special Characters</Label>
                    <Switch
                      id="require_special"
                      checked={settings.require_special_chars}
                      onCheckedChange={(checked) => updateSetting('require_special_chars', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/40 backdrop-blur-md border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Additional Security
                </CardTitle>
                <CardDescription>
                  Configure additional security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="password_expiry">Password Expiry: {settings.password_expiry_days} days</Label>
                    <span className="text-sm text-muted-foreground">
                      {settings.password_expiry_days === 0 ? 'Never' : `${settings.password_expiry_days} days`}
                    </span>
                  </div>
                  <Slider
                    id="password_expiry"
                    value={[settings.password_expiry_days]}
                    min={0}
                    max={365}
                    step={30}
                    onValueChange={(value) => updateSetting('password_expiry_days', value[0])}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Set to 0 to disable password expiration
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="max_attempts">Max Login Attempts</Label>
                    <span className="text-sm text-muted-foreground">
                      {settings.max_login_attempts} attempts
                    </span>
                  </div>
                  <Slider
                    id="max_attempts"
                    value={[settings.max_login_attempts]}
                    min={3}
                    max={10}
                    step={1}
                    onValueChange={(value) => updateSetting('max_login_attempts', value[0])}
                  />
                </div>
                
                <div className="mt-6 border-t pt-4">
                  <p className="text-sm font-medium mb-2">Overall Password Strength</p>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getPasswordStrengthColor()}`}
                      style={{ 
                        width: `${Math.min(100, (
                          20 + 
                          (settings.min_password_length >= 8 ? 15 : 0) + 
                          (settings.require_uppercase ? 15 : 0) + 
                          (settings.require_lowercase ? 15 : 0) + 
                          (settings.require_numbers ? 15 : 0) + 
                          (settings.require_special_chars ? 20 : 0)
                        ))}%` 
                      }}
                    />
                  </div>
                  <p className="text-sm text-right mt-1">{getPasswordStrengthLabel()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sso">
          <Card className="bg-card/40 backdrop-blur-md border border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                SSO Providers
              </CardTitle>
              <CardDescription>
                Configure Single Sign-On options for your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Google</p>
                  <p className="text-sm text-muted-foreground">
                    Allow users to sign in with their Google account
                  </p>
                </div>
                <Switch
                  checked={settings.google_sso_enabled}
                  onCheckedChange={(checked) => updateSetting('google_sso_enabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Microsoft</p>
                  <p className="text-sm text-muted-foreground">
                    Allow users to sign in with their Microsoft account
                  </p>
                </div>
                <Switch
                  checked={settings.microsoft_sso_enabled}
                  onCheckedChange={(checked) => updateSetting('microsoft_sso_enabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">
                    Allow users to sign in with their LinkedIn account
                  </p>
                </div>
                <Switch
                  checked={settings.linkedin_sso_enabled}
                  onCheckedChange={(checked) => updateSetting('linkedin_sso_enabled', checked)}
                />
              </div>
              
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  To complete SSO setup, you'll need to configure OAuth credentials for each provider in your Supabase project settings.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
