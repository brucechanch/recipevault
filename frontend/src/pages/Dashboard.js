import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recipeAPI } from '../api/client';
import RecipeCard from '../components/RecipeCard';

function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const res = await recipeAPI.getAll();
      setRecipes(res.data.recipes || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filters = ['all', 'favorites', 'recent', 'high-protein'];

  return (
    <div style={{ padding: '40px 32px 32px', maxWidth: '1600px', margin: '0 auto', backgroundColor: '#f8fafc' }}>
      <div style={{ display: 'flex', gap: '40px' }}>
        {/* 左側 Sidebar */}
        <div style={{ width: '320px', flexShrink: 0 }}>
          <div style={{ 
            background: 'white', 
            borderRadius: '16px', 
            padding: '24px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            height: 'fit-content'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#22c55e', marginBottom: '20px', textTransform: 'uppercase' }}>
              My Favorites
            </h3>
            <div style={{ marginBottom: '24px' }}>
              {['Avocado Zen Bowl', 'Crispy Basil Pizza', 'Zesty Summer Salad'].map(item => (
                <div key={item} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '12px', 
                  background: '#f8fafc', 
                  borderRadius: '12px', 
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#e0f2fe', marginRight: '12px' }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>{item}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>38g 42g 18g</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#22c55e', marginBottom: '20px', textTransform: 'uppercase' }}>
              Meal Plan
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                <div key={day} style={{ 
                  padding: '12px', 
                  background: '#f8fafc', 
                  borderRadius: '12px', 
                  textAlign: 'center',
                  cursor: 'pointer'
                }}>
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 主內容區 */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: '700', margin: '0 0 8px 0', color: '#1e293b' }}>
                Discover Recipes
              </h1>
              <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>
                Showing 140 recipes from your network
              </p>
            </div>
            <Link to="/add-recipe" style={{
              padding: '16px 32px',
              background: '#22c55e',
              color: 'white',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              + Add Recipe
            </Link>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '12px 24px',
                  background: activeFilter === filter ? '#22c55e' : 'white',
                  color: activeFilter === filter ? 'white' : '#374151',
                  border: '2px solid #e2e8f0',
                  borderRadius: '999px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {filter.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>

          {/* Recipes Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px', color: '#64748b' }}>Loading recipes...</div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
              gap: '24px' 
            }}>
              {recipes.slice(0, 12).map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
