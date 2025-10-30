import React, { createContext, useContext, useState, useEffect } from 'react';

// Define theme options
export const themeOptions = {
  colors: {
    default: {
      primary: '#F97316',
      secondary: '#64748B',
      accent: '#FFB31F',
      success: '#28AA7A',
      danger: '#EC5347',
      info: '#009BD3',
      warning: '#FFB31F',
      light: '#FFFFFF',
      dark: '#081021',
      lightBg: '#FFFFFF',
      darkBg: '#112A46',
      lightAccent: '#FFC9CA',
      darkAccent: '#FDE5E3',
    },
    blue: {
      primary: '#3B82F6',
      secondary: '#64748B',
      accent: '#60A5FA',
      success: '#10B981',
      danger: '#EF4444',
      info: '#3B82F6',
      warning: '#F59E0B',
      light: '#FFFFFF',
      dark: '#1E3A8A',
      lightBg: '#FFFFFF',
      darkBg: '#1E3A8A',
      lightAccent: '#BFDBFE',
      darkAccent: '#DBEAFE',
    },
    green: {
      primary: '#10B981',
      secondary: '#64748B',
      accent: '#34D399',
      success: '#10B981',
      danger: '#EF4444',
      info: '#3B82F6',
      warning: '#F59E0B',
      light: '#FFFFFF',
      dark: '#064E3B',
      lightBg: '#FFFFFF',
      darkBg: '#064E3B',
      lightAccent: '#A7F3D0',
      darkAccent: '#D1FAE5',
    },
    purple: {
      primary: '#8B5CF6',
      secondary: '#64748B',
      accent: '#A78BFA',
      success: '#10B981',
      danger: '#EF4444',
      info: '#3B82F6',
      warning: '#F59E0B',
      light: '#FFFFFF',
      dark: '#4C1D95',
      lightBg: '#FFFFFF',
      darkBg: '#4C1D95',
      lightAccent: '#DDD6FE',
      darkAccent: '#EDE9FE',
    },
    pink: {
      primary: '#EC4899',
      secondary: '#64748B',
      accent: '#F472B6',
      success: '#10B981',
      danger: '#EF4444',
      info: '#3B82F6',
      warning: '#F59E0B',
      light: '#FFFFFF',
      dark: '#831843',
      lightBg: '#FFFFFF',
      darkBg: '#831843',
      lightAccent: '#FBCFE8',
      darkAccent: '#FCE7F3',
    },
  }
};

const ThemeContext = createContext(undefined); // Initialize with undefined to help catch context issues

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme === 'dark';
  });

  const [colorScheme, setColorScheme] = useState(() => {
    const savedColorScheme = localStorage.getItem('colorScheme');
    // Ensure 'default' is always a valid key in themeOptions.colors
    return (savedColorScheme && themeOptions.colors[savedColorScheme]) ? savedColorScheme : 'default';
  });

  // Helper to get the current valid scheme key, defaulting to 'default'
  const getCurrentSchemeKey = (scheme) => {
    return (themeOptions.colors[scheme]) ? scheme : 'default';
  };

  // Get current theme colors based on color scheme and mode
  const getThemeColors = () => {
    const currentKey = getCurrentSchemeKey(colorScheme);
    const colors = themeOptions.colors[currentKey];
    
    // Ensure colors object is valid before spreading and accessing properties
    if (!colors) {
      console.error(`Theme colors not found for scheme: ${currentKey}. Defaulting.`);
      const defaultColors = themeOptions.colors.default;
      return {
        ...defaultColors,
        current: {
          bg: isDarkMode ? defaultColors.darkBg : defaultColors.lightBg,
          text: isDarkMode ? defaultColors.light : defaultColors.dark,
          accent: isDarkMode ? defaultColors.darkAccent : defaultColors.lightAccent,
        }
      };
    }

    return {
      ...colors,
      current: {
        bg: isDarkMode ? colors.darkBg : colors.lightBg,
        text: isDarkMode ? colors.light : colors.dark,
        accent: isDarkMode ? colors.darkAccent : colors.lightAccent,
      }
    };
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('themeMode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('themeMode', 'light');
    }
    
    const currentKey = getCurrentSchemeKey(colorScheme);
    const colors = themeOptions.colors[currentKey];

    if (colors) {
      document.documentElement.style.setProperty('--color-primary', colors.primary);
      document.documentElement.style.setProperty('--color-secondary', colors.secondary);
      document.documentElement.style.setProperty('--color-accent', colors.accent);
      document.documentElement.style.setProperty('--color-success', colors.success);
      document.documentElement.style.setProperty('--color-danger', colors.danger);
      document.documentElement.style.setProperty('--color-info', colors.info);
      document.documentElement.style.setProperty('--color-warning', colors.warning);
      document.documentElement.style.setProperty('--color-light-accent', colors.lightAccent);
      document.documentElement.style.setProperty('--color-dark-accent', colors.darkAccent);
    } else {
        console.error(`Cannot set CSS variables: Theme colors not found for scheme: ${currentKey}`);
    }
  }, [isDarkMode, colorScheme]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const changeColorScheme = (scheme) => {
    if (themeOptions.colors[scheme]) {
      setColorScheme(scheme);
      localStorage.setItem('colorScheme', scheme);
    } else {
      console.warn(`Attempted to set invalid color scheme: ${scheme}. Defaulting to 'default'.`);
      setColorScheme('default');
      localStorage.setItem('colorScheme', 'default');
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme, 
      colorScheme, 
      changeColorScheme,
      themeColors: getThemeColors(), // This is called on every render, ensure getThemeColors is efficient
      availableThemes: Object.keys(themeOptions.colors)
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
