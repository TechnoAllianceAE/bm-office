
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'blue' | 'purple';

interface ThemeSettings {
  theme: Theme;
  backgroundImage: string;
}

interface ThemeContextType {
  settings: ThemeSettings;
  setTheme: (theme: Theme) => void;
  setBackgroundImage: (url: string) => void;
}

const defaultSettings: ThemeSettings = {
  theme: 'light',
  backgroundImage: '/lovable-uploads/05305298-8812-4b79-9e2e-0f8fa2dc1d97.png'
};

const SETTINGS_STORAGE_KEY = 'app-theme-settings';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    // Get the settings from localStorage if available
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    // Save the settings to localStorage
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    
    // Apply the theme to the document element
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    // Apply background image if set
    if (settings.backgroundImage) {
      document.body.style.backgroundImage = `url(${settings.backgroundImage})`;
    } else {
      document.body.style.backgroundImage = 'none';
    }
  }, [settings]);

  const setTheme = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const setBackgroundImage = (url: string) => {
    setSettings(prev => ({ ...prev, backgroundImage: url }));
  };

  return (
    <ThemeContext.Provider value={{ settings, setTheme, setBackgroundImage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
