import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Calendar, BookOpen, Star, Gamepad2 } from 'lucide-react';
import PanicButton from './PanicButton';

const Layout: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Brain, label: 'Dashboard' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/affirmations', icon: Star, label: 'Affirmations' },
    { path: '/knowledge', icon: BookOpen, label: 'Knowledge' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-comic-gray-100 bg-halftone-light">
      <header className="sticky top-0 z-50 bg-comic-white comic-border border-b-4 border-comic-black shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Brain size={32} className="text-primary" />
            <h1 className="font-bangers text-3xl text-primary">UPBRAIN</h1>
          </Link>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-1 font-comic text-lg px-3 py-1 rounded-lg transition-all 
                  ${location.pathname === item.path 
                    ? 'bg-secondary text-comic-white font-bold' 
                    : 'text-comic-black hover:bg-comic-gray-200'}
                `}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
        
        <PanicButton />
      </main>

      <footer className="bg-comic-black text-comic-white py-4 md:hidden">
        <div className="container mx-auto">
          <nav className="flex justify-around items-center">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex flex-col items-center py-1 px-4 rounded-lg ${
                  location.pathname === item.path 
                    ? 'text-secondary' 
                    : 'text-comic-white'
                }`}
              >
                <item.icon size={24} />
                <span className="text-xs font-comic">{item.label}</span>
              </Link>
            ))}
            <Link 
              to="/minigame"
              className="flex flex-col items-center py-1 px-4 rounded-lg text-accent"
            >
              <Gamepad2 size={24} />
              <span className="text-xs font-comic">Game</span>
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Layout;