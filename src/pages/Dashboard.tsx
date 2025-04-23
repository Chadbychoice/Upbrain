import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gamepad2, Sparkles, Calendar, Star } from 'lucide-react';
import ComicPanel from '../components/ComicPanel';
import StreakCounter from '../components/StreakCounter';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <motion.h1 
          className="font-bangers text-4xl md:text-6xl text-primary mb-2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          WELCOME BACK, HERO!
        </motion.h1>
        <motion.p 
          className="font-comic text-xl text-comic-black"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Keep pushing forward on your heroic journey!
        </motion.p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <div className="relative">
            <img 
              src="https://i.ibb.co/pBScgBFg/janfh-cool-cel-shaded-man-hero-pose-comic-style-thick-lines-on-ba145714-53c0-46a8-b218-a4a76628f4d2.png" 
              alt="Hero background" 
              className="w-full h-64 md:h-80 object-cover comic-border rounded-lg"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <StreakCounter />
            </div>
          </div>
        </div>

        <Link to="/calendar">
          <ComicPanel className="h-full bg-secondary hover:scale-105 transition-transform">
            <div className="flex flex-col items-center h-full justify-between p-6">
              <Calendar size={48} className="mb-4 text-comic-white" />
              <h2 className="font-bangers text-3xl text-comic-white text-center">TRACK YOUR JOURNEY</h2>
              <p className="font-comic text-center mt-4 text-comic-white">
                Log your progress and build lasting habits
              </p>
            </div>
          </ComicPanel>
        </Link>

        <Link to="/affirmations">
          <ComicPanel className="h-full bg-accent hover:scale-105 transition-transform">
            <div className="flex flex-col items-center h-full justify-between p-6">
              <Star size={48} className="mb-4 text-comic-black" />
              <h2 className="font-bangers text-3xl text-comic-black text-center">DAILY POWER-UPS</h2>
              <p className="font-comic text-center mt-4 text-comic-black">
                Boost your motivation with powerful affirmations
              </p>
            </div>
          </ComicPanel>
        </Link>

        <Link to="/knowledge">
          <ComicPanel className="h-full bg-primary hover:scale-105 transition-transform">
            <div className="flex flex-col items-center h-full justify-between p-6">
              <Sparkles size={48} className="mb-4 text-comic-white" />
              <h2 className="font-bangers text-3xl text-comic-white text-center">LEVEL UP YOUR MIND</h2>
              <p className="font-comic text-center mt-4 text-comic-white">
                Learn the science behind habits and break free
              </p>
            </div>
          </ComicPanel>
        </Link>

        <Link to="/minigame">
          <ComicPanel className="h-full bg-comic-black hover:scale-105 transition-transform">
            <div className="flex flex-col items-center h-full justify-between p-6">
              <Gamepad2 size={48} className="mb-4 text-comic-white" />
              <h2 className="font-bangers text-3xl text-comic-white text-center">DISTRACTION GAME</h2>
              <p className="font-comic text-center mt-4 text-comic-white">
                Play a quick game to overcome urges and earn rewards
              </p>
            </div>
          </ComicPanel>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;