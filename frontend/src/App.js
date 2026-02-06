import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import DashboardNavbar from './components/DashboardNavbar'; // 只有呢個

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DiscoverPage from './pages/DiscoverPage';
import AddRecipePage from './pages/AddRecipePage';
import MyRecipesPage from './pages/MyRecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => setIsAuthenticated(true);

  const PrivateRoute = ({ children }) => 
    isAuthenticated ? children : <Navigate to="/login" />;

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <DashboardNavbar />
          <div style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-recipes" element={<PrivateRoute><MyRecipesPage /></PrivateRoute>} />
              <Route path="/add-recipe" element={<PrivateRoute><AddRecipePage /></PrivateRoute>} />
              <Route path="/discover" element={<PrivateRoute><DiscoverPage /></PrivateRoute>} />
              <Route path="/recipe/:id" element={<PrivateRoute><RecipeDetailPage /></PrivateRoute>} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </>
      ) : (
        <div>
          {/* 未登入用 HomePage 內置 navbar */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
