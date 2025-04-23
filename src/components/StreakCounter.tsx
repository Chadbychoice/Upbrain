import React from 'react';
import { motion } from 'framer-motion';
import { useStreakStore } from '../store/useStreakStore';
import { Plus } from 'lucide-react';

const StreakCounter: React.FC = () => {
  const { streak, incrementStreak } = useStreakStore();

  const handleIncrement = () => {
    incrementStreak();
  };

  return (
    <div className="relative">
      <motion.div 
        className="comic-panel bg-secondary flex flex-col items-center justify-center py-8 px-12"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h3 className="font-bangers text-xl text-comic-white mb-2">YOUR STREAK</h3>
        <motion.div
          key={streak}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 15
          }}
          className="font-bangers text-7xl md:text-9xl text-comic-white text-outline"
        >
          {streak}
        </motion.div>
        <p className="font-comic text-lg text-comic-white mt-2">DAYS STRONG</p>
      </motion.div>
      
      <motion.button
        className="absolute -right-4 top-1/2 -translate-y-1/2 bg-primary text-comic-white comic-border rounded-full p-4 shadow-lg"
        style={{ translateY: '-50%' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.15 }}
        onClick={handleIncrement}
      >
        <Plus size={32} />
      </motion.button>
    </div>
  );
};

export default StreakCounter;