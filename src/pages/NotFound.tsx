import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ComicPanel from '../components/ComicPanel';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ComicPanel className="bg-comic-white text-center p-8 max-w-lg mx-auto">
          <h1 className="font-bangers text-6xl text-primary mb-6">OOPS!</h1>
          <p className="font-comic text-2xl mb-6">
            This page has vanished into another dimension!
          </p>
          <img 
            src="https://images.pexels.com/photos/6333931/pexels-photo-6333931.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Confused character"
            className="w-full h-48 object-cover rounded-lg comic-border mb-6"
          />
          <Link to="/" className="comic-btn bg-secondary inline-flex items-center">
            <Home size={20} className="mr-2" />
            BACK TO BASE
          </Link>
        </ComicPanel>
      </motion.div>
    </div>
  );
};

export default NotFound;