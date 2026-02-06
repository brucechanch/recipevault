// pages/Dashboard.js
import { useState, useEffect } from 'react';
import { recipeAPI } from '../api/client';
import RecipeCard from '../components/RecipeCard';


function Dashboard() {
  const [stats, setStats] = useState({ total: 0, favorites: 0 });
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [recipesRes] = await Promise.all([recipeAPI.getAll()]);
      const recipes = recipesRes.data.recipes || [];
      setStats({
        total: recipes.length,
        favorites: recipes.filter(r => r.isFavorite).length
      });
      setRecentRecipes(recipes.slice(0, 4));
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div style={statCardStyle}>
          <div style={{ fontSize: '48px', fontWeight: '700', color: '#22c55e' }}>{stats.total}</div>
          <div style={{ color: '#6b7280', fontSize: '14px' }}>Total Recipes</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '48px', fontWeight: '700', color: '#f59e0b' }}>{stats.favorites}</div>
          <div style={{ color: '#6b7280', fontSize: '14px' }}>Favorites</div>
        </div>
      </div>

      {/* Recent Recipes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '24px' }}>Recent Recipes</h1>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {recentRecipes.map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>

        {/* Nutrition Summary Sidebar */}
        <div style={{
          background: '#1f2937',
          color: 'white',
          borderRadius: '16px',
          padding: '32px',
          height: 'fit-content'
        }}>
          <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Nutrition Summary</h3>
          {/* 放你想要嘅 nutrition panel */}
          <div style={{ textAlign: 'center', color: '#9ca3af' }}>
            Average across all recipes<br />
            Protein: 45g | Carbs: 60g | Fat: 25g
          </div>
        </div>
      </div>
    </div>
  );
}

const statCardStyle = {
  background: 'white',
  padding: '32px',
  borderRadius: '16px',
  textAlign: 'center',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
};

export default Dashboard;
