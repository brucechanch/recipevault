import React, { useState, useEffect } from 'react';
import { recipeAPI } from '../api/client';
import { useNavigate } from 'react-router-dom';

function MyRecipesPage() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

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

  const toggleSelection = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const getNutritionValue = (recipe, key) => {
    // Mock calculation if not available directly
    const ingredients = recipe.ingredients || [];
    return Math.round(ingredients.reduce((sum, ing) => sum + (parseFloat(ing[key]) || 0), 0));
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)', backgroundColor: '#f6f8f6' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', borderRight: '1px solid #e2e8f0', background: 'white', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#22c55e', color: 'white', padding: '8px', borderRadius: '8px', display: 'flex' }}>
            <span style={{ fontSize: '20px' }}>🍽️</span>
          </div>
          <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>CookBook</h1>
        </div>

        <nav style={{ flex: 1, padding: '0 16px', overflowY: 'auto' }}>
          <div style={{ paddingBottom: '16px' }}>
            <p style={{ padding: '0 12px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>Library</p>
            <NavItem icon="📂" text="All Recipes" active />
            <NavItem icon="⏰" text="To Try" />
            <NavItem icon="❤️" text="Favorites" />
          </div>

          <div style={{ paddingBottom: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 12px', marginBottom: '8px' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Collections</p>
              <button style={{ color: '#22c55e', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}>+</button>
            </div>
            <NavItem icon="💪" text="High Protein" />
            <NavItem icon="⚡" text="Quick Meals" />
            <NavItem icon="☁️" text="Imported" />
          </div>
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid #e2e8f0' }}>
          <NavItem icon="⚙️" text="Settings" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', marginTop: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden' }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" style={{ width: '100%', height: '100%' }} />
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>Alex Chef</p>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Pro Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Top Header */}
        <header style={{ height: '64px', borderBottom: '1px solid #e2e8f0', background: 'white', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ position: 'relative', width: '400px' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Search in My Recipes..." 
              style={{ width: '100%', padding: '10px 10px 10px 40px', background: '#f1f5f9', border: 'none', borderRadius: '12px', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={() => navigate('/add-recipe')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#22c55e', color: 'white', padding: '8px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
            >
              <span>+</span> Add New Recipe
            </button>
            <button style={{ padding: '8px', background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>🔔</button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Title Section */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '30px', fontWeight: '900', color: '#0f172a', margin: 0 }}>My Recipes Collection</h2>
                <p style={{ color: '#64748b', marginTop: '4px', fontWeight: '500' }}>{recipes.length} recipes organized across your collections</p>
              </div>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                <span>📝</span> Bulk Edit
              </button>
            </div>

            {/* Recently Added Carousel */}
            <section style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Recently Added</h3>
                <button style={{ fontSize: '14px', fontWeight: '600', color: '#22c55e', background: 'none', border: 'none', cursor: 'pointer' }}>View All</button>
              </div>
              <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                {recipes.slice(0, 4).map(recipe => (
                  <RecentCard key={recipe._id} recipe={recipe} />
                ))}
              </div>
            </section>

            {/* Filter Toolbar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '16px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#f1f5f9', padding: '4px', borderRadius: '8px', display: 'flex' }}>
                  <button onClick={() => setViewMode('grid')} style={{ padding: '6px', background: viewMode === 'grid' ? 'white' : 'transparent', borderRadius: '6px', border: 'none', cursor: 'pointer', boxShadow: viewMode === 'grid' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' }}>🔲</button>
                  <button onClick={() => setViewMode('list')} style={{ padding: '6px', background: viewMode === 'list' ? 'white' : 'transparent', borderRadius: '6px', border: 'none', cursor: 'pointer', boxShadow: viewMode === 'list' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' }}>fh</button>
                </div>
                <select style={{ background: 'transparent', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer', outline: 'none' }}>
                  <option>Date Added (Newest)</option>
                  <option>Title (A-Z)</option>
                  <option>Calories (Lowest)</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Filter by:</span>
                <FilterPill text="Vegan" />
                <FilterPill text="High Protein" active />
                <FilterPill text="Under 30m" />
                <FilterPill text="More..." />
              </div>
            </div>

            {/* Recipe Grid */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '64px', color: '#94a3b8' }}>Loading recipes...</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {recipes.map(recipe => (
                  <RecipeCard 
                    key={recipe._id} 
                    recipe={recipe} 
                    selected={selectedIds.includes(recipe._id)}
                    onToggle={() => toggleSelection(recipe._id)}
                    navigate={navigate}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Floating Bulk Action Bar */}
        {selectedIds.length > 0 && (
          <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
            <div style={{ background: '#0f172a', color: 'white', padding: '12px 24px', borderRadius: '999px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid #334155', paddingRight: '24px' }}>
                <span style={{ background: '#22c55e', color: '#0f172a', width: '20px', height: '20px', borderRadius: '50%', fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{selectedIds.length}</span>
                <span style={{ fontSize: '14px', fontWeight: '700' }}>Selected</span>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <ActionButton icon="📁" text="Move" />
                <ActionButton icon="🏷️" text="Tag" />
                <ActionButton icon="🗑️" text="Delete" color="#ef4444" />
                <button onClick={() => setSelectedIds([])} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// --- Sub Components ---

const NavItem = ({ icon, text, active }) => (
  <a href="#" style={{ 
    display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', 
    borderRadius: '8px', 
    background: active ? 'rgba(34, 197, 94, 0.1)' : 'transparent', 
    color: active ? '#16a34a' : '#475569',
    textDecoration: 'none', marginBottom: '4px', transition: 'all 0.2s',
    fontWeight: active ? '600' : '400'
  }}>
    <span style={{ fontSize: '20px' }}>{icon}</span>
    <span style={{ fontSize: '14px' }}>{text}</span>
  </a>
);

const FilterPill = ({ text, active }) => (
  <button style={{ 
    padding: '6px 12px', borderRadius: '999px', 
    background: active ? 'rgba(34, 197, 94, 0.1)' : '#f1f5f9', 
    color: active ? '#16a34a' : '#475569', 
    border: active ? '1px solid rgba(34, 197, 94, 0.3)' : 'none',
    fontSize: '12px', fontWeight: '700', cursor: 'pointer' 
  }}>
    {text}
  </button>
);

const ActionButton = ({ icon, text, color = 'white' }) => (
  <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: color, fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
    <span>{icon}</span> {text}
  </button>
);

const RecipeCard = ({ recipe, selected, onToggle, navigate }) => (
  <div 
    style={{ 
      background: 'white', borderRadius: '16px', border: selected ? '2px solid #22c55e' : '1px solid #e2e8f0', 
      overflow: 'hidden', position: 'relative', transition: 'all 0.3s',
      boxShadow: selected ? '0 10px 15px -3px rgba(34, 197, 94, 0.1)' : 'none'
    }}
    className="group"
  >
    <div 
      onClick={onToggle}
      style={{ 
        position: 'absolute', top: '12px', left: '12px', zIndex: 10, 
        width: '24px', height: '24px', borderRadius: '6px', 
        background: selected ? '#22c55e' : 'rgba(255,255,255,0.9)', 
        border: selected ? 'none' : '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        color: 'white', fontWeight: 'bold'
      }}
    >
      {selected && '✓'}
    </div>

    <div style={{ aspectRatio: '1/1', background: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
      <img src={recipe.imageUrl || 'https://via.placeholder.com/400'} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'flex-end', padding: '16px' }} 
           onMouseEnter={e => e.currentTarget.style.opacity = 1} 
           onMouseLeave={e => e.currentTarget.style.opacity = 0}
      >
        <button onClick={() => navigate(`/recipe/${recipe._id}`)} style={{ width: '100%', padding: '8px', background: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Quick View</button>
      </div>
    </div>

    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <h5 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a', lineHeight: '1.2' }}>{recipe.title}</h5>
        <span style={{ color: recipe.isFavorite ? '#ef4444' : '#cbd5e1', cursor: 'pointer', fontSize: '20px' }}>♥</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '10px', fontWeight: '700', color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>High Protein</span>
        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>• {recipe.cookTime || 20}m</span>
      </div>

      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '-4px' }}>
          <MacroCircle label="P" color="#e2e8f0" />
          <MacroCircle label="C" color="#cbd5e1" />
          <MacroCircle label="F" color="#94a3b8" />
        </div>
        <span style={{ fontSize: '10px', fontWeight: '900', color: '#64748b' }}>{Math.round(recipe.calories || 0)} Cal</span>
      </div>
    </div>
  </div>
);

const RecentCard = ({ recipe }) => (
  <div style={{ width: '280px', flexShrink: 0, cursor: 'pointer' }}>
    <div style={{ aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px', position: 'relative' }}>
      <img src={recipe.imageUrl || 'https://via.placeholder.com/300'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase' }}>{recipe.sourceType || 'Web'}</div>
    </div>
    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{recipe.title}</h4>
    <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#64748b' }}>
      <span>⏱️ {recipe.cookTime || 15}m</span>
      <span>🔥 {Math.round(recipe.calories || 0)} Cal</span>
    </div>
  </div>
);

const MacroCircle = ({ label, color }) => (
  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: color, border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', fontWeight: '700', color: '#475569', marginLeft: '-4px' }}>{label}</div>
);

export default MyRecipesPage;
