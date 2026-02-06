import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/DashboardNavbar';
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
      {isAuthenticated ? (
        <>
          {/* 登入後用 Dashboard Navbar */}
          <DashboardNavbar />
          <div style={{ paddingTop: '72px' }}> {/* 預留 navbar 空間 */}
            <Routes>
              <Route path="Dashboard.js" element={<Dashboard />} />
              <Route path="/my-recipes" element={<PrivateRoute><MyRecipesPage /></PrivateRoute>} />
              <Route path="/add-recipe" element={<PrivateRoute><AddRecipePage /></PrivateRoute>} />
              <Route path="/discover" element={<PrivateRoute><DiscoverPage /></PrivateRoute>} />
              <Route path="/recipe/:id" element={<PrivateRoute><RecipeDetailPage /></PrivateRoute>} />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </>
      ) : (
        <>
          {/* 未登入用舊 Navbar */}
          <Navbar />
          <Routes>
            {/* 現有登入路由... */}
          </Routes>
        </>
      )}
    </Router>
  );
}


export default App;
