import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Siren, X, ArrowLeft } from 'lucide-react';

const PanicButton: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showPushups, setShowPushups] = useState(false);
  const [showShower, setShowShower] = useState(false);

  const handlePanic = () => {
    navigate('/minigame');
  };

  const handleCoping = (technique: string) => {
    if (technique === 'push-ups') {
      setShowPushups(true);
      return;
    }
    if (technique === 'cold-shower') {
      setShowShower(true);
      return;
    }
    // This would implement the coping technique
    setIsOpen(false);
  };

  const techniques = [
    { name: 'Play Mini-Game', action: () => handlePanic() },
    { name: 'Deep Breathing', action: () => handleCoping('breathing') },
    { name: 'Cold Shower', action: () => handleCoping('cold-shower') },
    { name: 'Push-ups', action: () => handleCoping('push-ups') },
  ];

  return (
    <>
      {/* Main Panic Button */}
      <motion.button
        className="fixed bottom-20 right-6 md:bottom-10 md:right-10 z-40 
          bg-primary text-comic-white comic-border rounded-full p-4 shadow-lg
          animate-pulse-strong"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { setIsOpen(true); setShowPushups(false); setShowShower(false); }}
        aria-label="Panic Button"
      >
        <Siren size={32} />
      </motion.button>

      {/* Panic Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-comic-black bg-opacity-70"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="comic-panel w-11/12 max-w-md m-4 p-5 bg-comic-white"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bangers text-3xl text-primary">STAY STRONG!</h2>
              <button
                onClick={() => { setIsOpen(false); setShowPushups(false); setShowShower(false); }}
                className="bg-comic-gray-200 rounded-full p-1"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Show cold shower image if selected */}
            {showShower ? (
              <div className="flex flex-col items-center justify-center">
                <img
                  src="/graphics/shower.webp"
                  alt="Cold Shower"
                  className="w-full max-w-xs h-auto mb-6 comic-border rounded-lg"
                />
                <button
                  className="comic-btn bg-secondary flex items-center mb-2"
                  onClick={() => setShowShower(false)}
                >
                  <ArrowLeft size={20} className="mr-2" />
                  BACK
                </button>
                <p className="font-comic text-lg text-center">Take a cold shower to refresh your body and mind!</p>
              </div>
            ) : showPushups ? (
              <div className="flex flex-col items-center justify-center">
                <img
                  src="/graphics/pushup.webp"
                  alt="Push-ups"
                  className="w-full max-w-xs h-auto mb-6 comic-border rounded-lg"
                />
                <button
                  className="comic-btn bg-secondary flex items-center mb-2"
                  onClick={() => setShowPushups(false)}
                >
                  <ArrowLeft size={20} className="mr-2" />
                  BACK
                </button>
                <p className="font-comic text-lg text-center">Do 10 push-ups to reset your mind and body!</p>
              </div>
            ) : (
              <>
                <p className="font-comic text-lg mb-6">Choose a quick action to overcome the urge:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {techniques.map((technique, index) => (
                    <motion.button
                      key={index}
                      className="comic-btn bg-secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={technique.action}
                    >
                      {technique.name}
                    </motion.button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default PanicButton;