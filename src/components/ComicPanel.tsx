import React from 'react';
import { motion } from 'framer-motion';

interface ComicPanelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  animate?: boolean;
}

const ComicPanel: React.FC<ComicPanelProps> = ({ 
  children, 
  className = '', 
  style = {}, 
  onClick,
  animate = true
}) => {
  return (
    <motion.div
      className={`comic-panel p-4 ${className}`}
      style={style}
      onClick={onClick}
      whileHover={animate ? { scale: 1.02, y: -5 } : undefined}
      whileTap={animate ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {children}
    </motion.div>
  );
};

export default ComicPanel;