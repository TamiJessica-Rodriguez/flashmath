import React, { createContext, ReactNode, useContext, useState } from 'react';

type ThemeContextType = {
    theme: string;
    setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<string>('linear-gradient(45deg, #2196f3 30%, #9c27b0 90%)');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div
                style={{
                    background: theme,
                    minHeight: '100vh',
                    transition: 'background 0.5s ease',
                }}
            >
                {children}
            </div>
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
