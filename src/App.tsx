import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Layout from './components/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Affirmations from './pages/Affirmations';
import Knowledge from './pages/Knowledge';
import MiniGame from './pages/MiniGame';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="affirmations" element={<Affirmations />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="minigame" element={<MiniGame />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;