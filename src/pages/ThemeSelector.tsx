import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeSelector: React.FC = () => {
    const { setTheme } = useTheme();

    const themes = [
        { name: 'Blue & Purple', value: 'linear-gradient(45deg, #2196f3 30%, #9c27b0 90%)' },
        { name: 'Black & Red', value: 'linear-gradient(45deg, #000000 30%, #ff0000 90%)' },
        { name: 'Green & Orange', value: 'linear-gradient(45deg, #32cd32 30%, #ff8c00 90%)' },
        { name: 'Pink & Turquoise', value: 'linear-gradient(45deg, #ff69b4 30%, #40e0d0 90%)' },
        { name: 'White', value: '#ffffff' },
    ];

    return (
        <div className="p-4 space-y-2">
            <h2 className="text-lg font-bold">Välj ett färgtema:</h2>
            <div className="flex flex-wrap gap-2">
                {themes.map((theme) => (
                    <button
                        key={theme.name}
                        className="p-2 border rounded shadow"
                        style={{ background: theme.value, color: theme.name === 'White' ? 'black' : 'white' }}
                        onClick={() => setTheme(theme.value)}
                    >
                        {theme.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeSelector;
