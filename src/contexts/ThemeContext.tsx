
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'blue' | 'purple';
export type BackgroundImage = 'none' | 'gradient1' | 'gradient2' | 'gradient3' | 'pattern1' | 'pattern2' | string;

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  backgroundImage: BackgroundImage;
  setBackgroundImage: (image: BackgroundImage) => void;
  glassEnabled: boolean;
  setGlassEnabled: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Get the theme from localStorage if available
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light'; // Set default theme to light
  });

  const [backgroundImage, setBackgroundImage] = useState<BackgroundImage>(() => {
    const savedBg = localStorage.getItem('backgroundImage');
    return (savedBg as BackgroundImage) || 'gradient1'; // Set default background
  });

  const [glassEnabled, setGlassEnabled] = useState<boolean>(() => {
    const savedGlass = localStorage.getItem('glassEnabled');
    return savedGlass ? savedGlass === 'true' : true; // Enable glass by default
  });

  useEffect(() => {
    // Save the theme to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply the theme to the document element
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Save the background image setting
    localStorage.setItem('backgroundImage', backgroundImage);
    
    // Apply the background image class
    document.body.className = '';
    if (backgroundImage !== 'none') {
      document.body.classList.add(`bg-${backgroundImage}`);
    }
  }, [backgroundImage]);

  useEffect(() => {
    // Save glass setting
    localStorage.setItem('glassEnabled', glassEnabled.toString());
    
    // Apply glass effect
    if (glassEnabled) {
      document.documentElement.classList.add('glass-enabled');
    } else {
      document.documentElement.classList.remove('glass-enabled');
    }
  }, [glassEnabled]);

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme, 
        backgroundImage, 
        setBackgroundImage,
        glassEnabled,
        setGlassEnabled
      }}
    >
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
