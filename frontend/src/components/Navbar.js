import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#1f2937',
      color: 'white',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #374151'
    }}>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '20px', fontWeight: '700', color: '#22c55e', textDecoration: 'none' }}>
          🥗 RecipeVault
        </Link>
        
        {isAuthenticated && (
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/discover" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Discover</Link>
            <Link to="/my-recipes" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>My Recipes</Link>
            <Link to="/add-recipe" style={{ color: '#22c55e', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>+ Add Recipe</Link>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Login</Link>
            <Link to="/register" style={{ color: '#22c55e', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
