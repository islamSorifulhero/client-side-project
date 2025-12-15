
import { useState, useEffect } from 'react';

const useTheme = () => {
    
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    useEffect(() => {
        const root = document.documentElement; // 
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        
        root.setAttribute('data-theme', theme);


        localStorage.setItem('theme', theme);

    }, [theme]);

    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    return [theme, toggleTheme];
};

export default useTheme;