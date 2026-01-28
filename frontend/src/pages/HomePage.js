import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#2a7f62', marginBottom: '16px' }}>
          🥗 Welcome to RecipeVault
        </h1>
        
        <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px', lineHeight: '1.6' }}>
          Save recipes from Instagram, Xiaohongshu, TikTok, and more. Track nutrition automatically. 
          Build your perfect recipe collection.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{
            padding: '14px 28px',
            background: '#22c55e',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px'
          }}>
            Get Started
          </Link>
          <Link to="/login" style={{
            padding: '14px 28px',
            background: 'white',
            color: '#2a7f62',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            border: '2px solid #2a7f62'
          }}>
            Sign In
          </Link>
        </div>

        <div style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          <div>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📱</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Save from Social</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>Capture recipes from any platform</p>
          </div>
          <div>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🧮</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Auto Nutrition</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>Automatic calorie & macro calculation</p>
          </div>
          <div>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Smart Search</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>Find recipes by cuisine or nutrition</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
