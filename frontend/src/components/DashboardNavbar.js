// src/components/DashboardNavbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '72px',
      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)'
    }}>
      <Link to="/dashboard" style={{
        display: 'flex', alignItems: 'center',
        fontSize: '24px', fontWeight: '700', color: 'white',
        textDecoration: 'none', marginRight: '48px'
      }}>
        <span style={{ marginRight: '8px' }}>🍳</span>RecipeVault
      </Link>

      <div style={{ display: 'flex', gap: '32px', marginRight: 'auto' }}>
        <Link to="/dashboard" style={navStyle(false)}>Dashboard</Link>
        <Link to="/my-recipes" style={navStyle(false)}>My Recipes</Link>
        <Link to="/meal-planner" style={navStyle(false)}>Meal Planner</Link>
        <Link to="/discover" style={navStyle(false)}>Discovery</Link>
      </div>

      <Link to="/add-recipe" style={{
        padding: '8px 20px', background: 'rgba(255,255,255,0.2)',
        color: 'white', borderRadius: '24px', textDecoration: 'none',
        fontSize: '14px', fontWeight: '500'
      }}>
        + Add Recipe
      </Link>

      <button onClick={handleLogout} style={{
        marginLeft: '16px', padding: '8px 16px',
        background: 'transparent', color: 'white',
        border: '1px solid rgba(255,255,255,0.3)', borderRadius: '20px',
        cursor: 'pointer', fontSize: '14px'
      }}>
        Logout
      </button>
    </nav>
  );
};

const navStyle = (active) => ({
  color: active ? 'white' : 'rgba(255,255,255,0.8)',
  textDecoration: 'none', fontSize: '15px', fontWeight: '500',
  padding: '8px 0', borderBottom: active ? '3px solid rgba(255,255,255,0.5)' : 'none'
});

export default DashboardNavbar;
