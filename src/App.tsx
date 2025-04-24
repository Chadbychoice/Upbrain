import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// Components
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Affirmations from './pages/Affirmations';
import Knowledge from './pages/Knowledge';
import MiniGame from './pages/MiniGame';
import NotFound from './pages/NotFound';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />         
          <Route path="calendar" element={<Calendar />} />          <Route path="affirmations" element={<Affirmations />} />          <Route path="knowledge" element={<Knowledge />} />          <Route path="minigame" element={<MiniGame />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />          
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;