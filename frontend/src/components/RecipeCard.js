import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 16px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      }}>
        
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden', background: '#f3f4f6' }}>
          <img
            src={recipe.imageUrl || 'https://via.placeholder.com/280x200'}
            alt={recipe.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => e.target.src = 'https://via.placeholder.com/280x200'}
          />
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#2a7f62'
          }}>
            {recipe.sourceType}
          </div>
        </div>

        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {recipe.title}
          </h3>
          
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px 0' }}>
            {recipe.cuisineType} • {recipe.difficulty}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: 'auto' }}>
            <div style={{ textAlign: 'center', padding: '8px', background: '#f3f4f6', borderRadius: '6px' }}>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>Protein</div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#22c55e' }}>
                {Math.round(recipe.nutritionTotals?.protein || 0)}g
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '8px', background: '#f3f4f6', borderRadius: '6px' }}>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>Carbs</div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#3b82f6' }}>
                {Math.round(recipe.nutritionTotals?.carbs || 0)}g
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '8px', background: '#f3f4f6', borderRadius: '6px' }}>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>Fat</div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#f59e0b' }}>
                {Math.round(recipe.nutritionTotals?.fat || 0)}g
              </div>
            </div>
            <div style={{ textAlign: 'center', padding: '8px', background: '#f3f4f6', borderRadius: '6px' }}>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>Cal</div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#ef4444' }}>
                {Math.round(recipe.nutritionTotals?.calories || 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
