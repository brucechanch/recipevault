import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DiscoverPage from './pages/DiscoverPage';
import AddRecipePage from './pages/AddRecipePage';
import MyRecipesPage from './pages/MyRecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/discover" /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/discover" /> : <RegisterPage onLogin={handleLogin} />} />
        
        <Route path="/discover" element={<PrivateRoute><DiscoverPage /></PrivateRoute>} />
        <Route path="/add-recipe" element={<PrivateRoute><AddRecipePage /></PrivateRoute>} />
        <Route path="/my-recipes" element={<PrivateRoute><MyRecipesPage /></PrivateRoute>} />
        <Route path="/recipe/:id" element={<PrivateRoute><RecipeDetailPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
