
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Chrome, Mail, Linkedin, Save, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export const SecuritySettingsTab = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [passwordSettings, setPasswordSettings] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    expiration: '90',
    historyCount: '5',
    lockoutThreshold: '5',
    lockoutDuration: '30',
  });

  const [ssoSettings, setSsoSettings] = useState({
    googleEnabled: false,
    microsoftEnabled: false,
    linkedinEnabled: false,
    allowLocalLogin: true,
    enforceSSO: false,
  });
  
  const [securitySettings, setSecuritySettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchSecuritySettings();
  }, []);

  const fetchSecuritySettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('security_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
        throw error;
      }
      
      if (data) {
        setSecuritySettings(data);
        
        // Update local state based on DB data
        setPasswordLength(data.min_password_length || 12);
        setPasswordSettings({
          uppercase: data.require_uppercase || false,
          lowercase: data.require_lowercase || false,
          numbers: data.require_numbers || false,
          symbols: data.require_special_chars || false,
          expiration: data.password_expiry_days?.toString() || '90',
          historyCount: '5',
          lockoutThreshold: data.max_login_attempts?.toString() || '5',
          lockoutDuration: '30',
        });
        
        setSsoSettings({
          googleEnabled: data.google_sso_enabled || false,
          microsoftEnabled: data.microsoft_sso_enabled || false,
          linkedinEnabled: data.linkedin_sso_enabled || false,
          allowLocalLogin: true,
          enforceSSO: false,
        });
      }
    } catch (error) {
      console.error('Error fetching security settings:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load security settings",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePasswordSetting = (setting, value) => {
    setPasswordSettings(prev => ({ ...prev, [setting]: value }));
  };

  const updateSSOSetting = (setting, value) => {
    setSsoSettings(prev => ({ ...prev, [setting]: value }));
  };

  const saveSettings = async () => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: "Only administrators can modify security settings",
      });
      return;
    }

    setSaving(true);
    
    try {
      const settingsToUpsert = {
        min_password_length: passwordLength,
        require_uppercase: passwordSettings.uppercase,
        require_lowercase: passwordSettings.lowercase,
        require_numbers: passwordSettings.numbers,
        require_special_chars: passwordSettings.symbols,
        password_expiry_days: parseInt(passwordSettings.expiration),
        max_login_attempts: parseInt(passwordSettings.lockoutThreshold),
        google_sso_enabled: ssoSettings.googleEnabled,
        microsoft_sso_enabled: ssoSettings.microsoftEnabled,
        linkedin_sso_enabled: ssoSettings.linkedinEnabled,
        id: securitySettings?.id // Will be null for first record
      };
      
      // Use upsert to ensure we only have one settings record
      const { data, error } = await supabase
        .from('security_settings')
        .upsert(settingsToUpsert)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Security settings saved successfully",
      });
      
      // Update local state with the saved settings
      setSecuritySettings(data);
    } catch (error) {
      console.error('Error saving security settings:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save security settings",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading security settings...</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="password" className="space-y-4">
        <TabsList className="bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger value="password">Password Policies</TabsTrigger>
          <TabsTrigger value="sso">SSO Providers</TabsTrigger>
          <TabsTrigger value="mfa">Multi-Factor Authentication</TabsTrigger>
        </TabsList>

        <TabsContent value="password">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card/40 backdrop-blur-md border border-white/10">
              <CardHeader>
                <CardTitle>Password Strength</CardTitle>
                <CardDescription>
                  Configure minimum password strength requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Minimum Password Length: {passwordLength}</Label>
                    <span className="text-sm text-muted-foreground">{getPasswordStrength(passwordLength)}</span>
                  </div>
                  <Slider 
                    value={[passwordLength]} 
                    min={6} 
                    max={24}
                    step={1}
                    onValueChange={(value) => setPasswordLength(value[0])}
                    disabled={!isAdmin}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="uppercase" className="flex-1">
                      Require uppercase
                    </Label>
                    <Switch 
                      id="uppercase" 
                      checked={passwordSettings.uppercase}
                      onCheckedChange={(checked) => updatePasswordSetting('uppercase', checked)}
                      disabled={!isAdmin}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="lowercase" className="flex-1">
                      Require lowercase
                    </Label>
                    <Switch 
                      id="lowercase" 
                      checked={passwordSettings.lowercase}
                      onCheckedChange={(checked) => updatePasswordSetting('lowercase', checked)}
                      disabled={!isAdmin}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="numbers" className="flex-1">
                      Require numbers
                    </Label>
                    <Switch 
                      id="numbers" 
                      checked={passwordSettings.numbers}
                      onCheckedChange={(checked) => updatePasswordSetting('numbers', checked)}
                      disabled={!isAdmin}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="symbols" className="flex-1">
                      Require symbols
                    </Label>
                    <Switch 
                      id="symbols" 
                      checked={passwordSettings.symbols}
                      onCheckedChange={(checked) => updatePasswordSetting('symbols', checked)}
                      disabled={!isAdmin}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/40 backdrop-blur-md border border-white/10">
              <CardHeader>
                <CardTitle>Password Policies</CardTitle>
                <CardDescription>
                  Configure password expiration and history policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="expiration">Password Expiration (days)</Label>
                  <Select 
                    value={passwordSettings.expiration}
                    onValueChange={(value) => updatePasswordSetting('expiration', value)}
                    disabled={!isAdmin}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select expiration period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="history">Password History Count</Label>
                  <Select 
                    value={passwordSettings.historyCount}
                    onValueChange={(value) => updatePasswordSetting('historyCount', value)}
                    disabled={!isAdmin}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select history count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 passwords</SelectItem>
                      <SelectItem value="5">5 passwords</SelectItem>
                      <SelectItem value="10">10 passwords</SelectItem>
                      <SelectItem value="20">20 passwords</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Users cannot reuse their previous passwords
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lockout">Account Lockout Threshold</Label>
                  <Select 
                    value={passwordSettings.lockoutThreshold}
                    onValueChange={(value) => updatePasswordSetting('lockoutThreshold', value)}
                    disabled={!isAdmin}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                  <Select 
                    value={passwordSettings.lockoutDuration}
                    onValueChange={(value) => updatePasswordSetting('lockoutDuration', value)}
                    disabled={!isAdmin}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="1440">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sso">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <SSOProviderCard 
                provider="Google"
                icon={<Chrome className="h-6 w-6" />}
                enabled={ssoSettings.googleEnabled}
                onToggle={(enabled) => updateSSOSetting('googleEnabled', enabled)}
                isAdmin={isAdmin}
              />
              
              <SSOProviderCard 
                provider="Microsoft"
                icon={<Mail className="h-6 w-6" />}
                enabled={ssoSettings.microsoftEnabled}
                onToggle={(enabled) => updateSSOSetting('microsoftEnabled', enabled)}
                isAdmin={isAdmin}
              />
              
              <SSOProviderCard 
                provider="LinkedIn"
                icon={<Linkedin className="h-6 w-6" />}
                enabled={ssoSettings.linkedinEnabled}
                onToggle={(enabled) => updateSSOSetting('linkedinEnabled', enabled)}
                isAdmin={isAdmin}
              />
            </div>
            
            <Card className="bg-card/40 backdrop-blur-md border border-white/10">
              <CardHeader>
                <CardTitle>SSO Settings</CardTitle>
                <CardDescription>
                  Configure how Single Sign-On works in your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="allow-local-login" className="block">Allow Local Login</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow users to log in with username/password even if SSO is enabled
                    </p>
                  </div>
                  <Switch 
                    id="allow-local-login" 
                    checked={ssoSettings.allowLocalLogin}
                    onCheckedChange={(checked) => updateSSOSetting('allowLocalLogin', checked)}
                    disabled={!isAdmin}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="enforce-sso" className="block">Enforce SSO</Label>
                    <p className="text-xs text-muted-foreground">
                      Require all users to authenticate using SSO
                    </p>
                  </div>
                  <Switch 
                    id="enforce-sso" 
                    checked={ssoSettings.enforceSSO}
                    onCheckedChange={(checked) => updateSSOSetting('enforceSSO', checked)}
                    disabled={!isAdmin}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mfa">
          <Card className="bg-card/40 backdrop-blur-md border border-white/10">
            <CardHeader>
              <CardTitle>Multi-Factor Authentication</CardTitle>
              <CardDescription>
                Configure MFA settings for your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="require-mfa" className="text-base font-medium">Require MFA</Label>
                    <p className="text-sm text-muted-foreground">
                      Require all users to set up multi-factor authentication
                    </p>
                  </div>
                  <Switch id="require-mfa" disabled={!isAdmin} />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base font-medium">Allowed Authentication Methods</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="authenticator-app" defaultChecked disabled={!isAdmin} />
                      <Label htmlFor="authenticator-app">Authenticator App</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms" defaultChecked disabled={!isAdmin} />
                      <Label htmlFor="sms">SMS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email" defaultChecked disabled={!isAdmin} />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="security-key" disabled={!isAdmin} />
                      <Label htmlFor="security-key">Security Key (WebAuthn)</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recovery-options" className="text-base font-medium">Recovery Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="backup-codes" defaultChecked disabled={!isAdmin} />
                      <Label htmlFor="backup-codes">Backup Codes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="recovery-email" defaultChecked disabled={!isAdmin} />
                      <Label htmlFor="recovery-email">Recovery Email</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="mfa-grace-period" className="text-base font-medium">MFA Grace Period</Label>
                <Select defaultValue="7" disabled={!isAdmin}>
                  <SelectTrigger className="mt-2 bg-background/50">
                    <SelectValue placeholder="Select grace period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No grace period</SelectItem>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Time users have to set up MFA after it becomes required
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={saveSettings} disabled={saving || !isAdmin}>
          {saving ? 'Saving...' : 'Save Security Settings'}
          {!saving && <Save className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

const SSOProviderCard = ({ provider, icon, enabled, onToggle, isAdmin }) => {
  const [isConfiguring, setIsConfiguring] = useState(false);
  
  return (
    <Card className="bg-card/40 backdrop-blur-md border border-white/10">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-medium">{provider}</h3>
          </div>
          <Switch 
            checked={enabled} 
            onCheckedChange={onToggle}
            disabled={!isAdmin}
          />
        </div>
        
        {enabled ? (
          <div className="space-y-3">
            {isConfiguring ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor={`${provider.toLowerCase()}-client-id`}>Client ID</Label>
                  <Input 
                    id={`${provider.toLowerCase()}-client-id`}
                    placeholder="Enter client ID"
                    className="bg-background/50"
                    disabled={!isAdmin}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${provider.toLowerCase()}-client-secret`}>Client Secret</Label>
                  <Input 
                    id={`${provider.toLowerCase()}-client-secret`}
                    type="password"
                    placeholder="Enter client secret"
                    className="bg-background/50"
                    disabled={!isAdmin}
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-2">
                  <Button size="sm" variant="outline" onClick={() => setIsConfiguring(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => setIsConfiguring(false)} disabled={!isAdmin}>
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  {provider} SSO is enabled but needs configuration.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setIsConfiguring(true)}
                  disabled={!isAdmin}
                >
                  Configure
                </Button>
              </>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enable {provider} Single Sign-On integration
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const getPasswordStrength = (length) => {
  if (length < 8) return "Weak";
  if (length < 12) return "Medium";
  if (length < 16) return "Strong";
  return "Very Strong";
};
