import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ComicPanel from '../components/ComicPanel';
import { useAffirmationsStore } from '../store/useAffirmationsStore';
import { ChevronLeft, ChevronRight, Shuffle, VolumeIcon } from 'lucide-react';

const Affirmations: React.FC = () => {
  const { 
    affirmations, 
    currentIndex, 
    nextAffirmation, 
    previousAffirmation, 
    shuffleAffirmations,
    speakAffirmation
  } = useAffirmationsStore();
  
  const currentAffirmation = affirmations[currentIndex];
  
  const handleSpeak = () => {
    speakAffirmation(currentAffirmation);
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <motion.h1 
          className="font-bangers text-4xl md:text-6xl text-accent mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          POWER-UP AFFIRMATIONS
        </motion.h1>
        <p className="font-comic text-xl text-comic-black">
          Supercharge your mindset with these powerful statements
        </p>
      </header>
      
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="w-full"
            >
              <ComicPanel className="bg-accent min-h-[300px] flex flex-col items-center justify-center p-8">
                <h2 className="font-bangers text-3xl text-comic-black mb-6 text-center">
                  TODAY'S BOOST
                </h2>
                <p className="font-comic text-2xl md:text-3xl text-comic-black text-center">
                  "{currentAffirmation}"
                </p>
              </ComicPanel>
            </motion.div>
          </AnimatePresence>
          
          <button 
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 comic-btn bg-secondary p-2"
            onClick={previousAffirmation}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 comic-btn bg-secondary p-2"
            onClick={nextAffirmation}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          className="comic-btn bg-primary"
          onClick={shuffleAffirmations}
        >
          <Shuffle size={20} className="mr-2" />
          SHUFFLE
        </button>
        
        <button
          className="comic-btn bg-secondary"
          onClick={handleSpeak}
        >
          <VolumeIcon size={20} className="mr-2" />
          HEAR IT
        </button>
      </div>
      
      <div className="mt-12">
        <ComicPanel className="bg-comic-white">
          <h3 className="font-bangers text-2xl text-primary mb-4">
            WHY AFFIRMATIONS WORK
          </h3>
          <p className="font-comic text-lg mb-4">
            Positive affirmations help rewire your brain by creating new neural pathways. When you repeat empowering statements regularly, you're literally changing your brain's structure!
          </p>
          <p className="font-comic text-lg">
            For best results, say these affirmations out loud each morning, or whenever you feel tempted. Your brain responds to your own voice even more powerfully than reading silently.
          </p>
        </ComicPanel>
      </div>
    </div>
  );
};

export default Affirmations;