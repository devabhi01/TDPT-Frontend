import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BackToTopButton } from '../common/BackToTopButton';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="site-shell flex flex-col min-h-screen bg-dark-950 text-slate-100 selection:bg-brand-500 selection:text-dark-950 overflow-x-hidden" data-theme={theme}>
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <BackToTopButton />
      <button type="button" className="site-theme-fab" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}<span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span></button>
    </div>
  );
};
