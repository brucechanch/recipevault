import React, { useState, useEffect } from 'react';
import { recipeAPI } from '../api/client';
import { useNavigate } from 'react-router-dom';

function MyRecipesPage() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

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

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Sidebar - Fixed Width */}
      <aside style={{ width: '260px', borderRight: '1px solid #e2e8f0', background: 'white', display: 'flex', flexDirection: 'column', flexShrink: 0, height: 'calc(100vh - 72px)', position: 'sticky', top: '72px' }}>
        <div style={{ padding: '24px 20px 16px' }}>
          <p style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Library</p>
          <NavItem icon="📂" text="All Recipes" active count={recipes.length} />
          <NavItem icon="⏰" text="To Try" count="3" />
          <NavItem icon="❤️" text="Favorites" count="8" />
        </div>

        <div style={{ padding: '16px 20px', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <p style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Collections</p>
            <button style={{ color: '#22c55e', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', padding: 0 }}>+</button>
          </div>
          <NavItem icon="💪" text="High Protein" />
          <NavItem icon="⚡" text="Quick Meals" />
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>My Recipes Collection</h1>
            <p style={{ color: '#64748b', fontSize: '15px' }}>{recipes.length} recipes organized across your collections</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
             <button style={{ padding: '10px 16px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: '600', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <span>⚡</span> Bulk Edit
             </button>
             <button onClick={() => navigate('/add-recipe')} style={{ padding: '10px 20px', background: '#22c55e', border: 'none', borderRadius: '10px', fontWeight: '700', color: 'white', cursor: 'pointer', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)' }}>
               + Add Recipe
             </button>
          </div>
        </div>

        {/* Recently Added Carousel */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>Recently Added</h3>
            <button style={{ color: '#22c55e', background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>View All</button>
          </div>
          <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '12px' }}>
            {recipes.slice(0, 4).map(recipe => (
               <div key={recipe._id} style={{ minWidth: '280px', cursor: 'pointer' }}>
                 <div style={{ aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', position: 'relative' }}>
                   <img 
                     src={recipe.imageUrl || 'https://via.placeholder.com/400'} 
                     alt={recipe.title} 
                     style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                   />
                   <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: '#22c55e', color: 'white', fontSize: '10px', fontWeight: '700', padding: '4px 8px', borderRadius: '6px' }}>NEW</div>
                 </div>
                 <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{recipe.title}</h4>
                 <div style={{ fontSize: '13px', color: '#64748b' }}>{Math.round(recipe.calories || 0)} Cal • {recipe.cookTime || 15}m</div>
               </div>
            ))}
          </div>
        </section>

        {/* Filter Toolbar */}
        <div style={{ background: 'white', padding: '8px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingLeft: '8px' }}>
             <div style={{ background: '#f1f5f9', borderRadius: '10px', padding: '4px', display: 'flex' }}>
               <button onClick={() => setViewMode('grid')} style={{ padding: '6px', background: viewMode === 'grid' ? 'white' : 'transparent', borderRadius: '8px', border: 'none', cursor: 'pointer', boxShadow: viewMode === 'grid' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' }}>🔲</button>
               <button onClick={() => setViewMode('list')} style={{ padding: '6px', background: viewMode === 'list' ? 'white' : 'transparent', borderRadius: '8px', border: 'none', cursor: 'pointer', boxShadow: viewMode === 'list' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' }}>☰</button>
             </div>
             <span style={{ height: '24px', width: '1px', background: '#e2e8f0' }}></span>
             <select style={{ border: 'none', fontWeight: '600', color: '#475569', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
               <option>Date Added (Newest)</option>
               <option>Calories (Lowest)</option>
             </select>
           </div>
           
           <div style={{ display: 'flex', gap: '8px', paddingRight: '8px' }}>
             <FilterPill text="High Protein" active />
             <FilterPill text="Under 30m" />
             <FilterPill text="Vegan" />
           </div>
        </div>

        {/* Recipes Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8' }}>Loading recipes...</div>
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
      </main>
    </div>
  );
}

// Helper Components
const NavItem = ({ icon, text, active, count }) => (
  <div style={{ 
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 12px', borderRadius: '10px',
    background: active ? '#f0fdf4' : 'transparent',
    color: active ? '#16a34a' : '#475569',
    cursor: 'pointer', marginBottom: '4px', transition: 'all 0.2s'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: active ? '700' : '500', fontSize: '14px' }}>
      <span>{icon}</span> {text}
    </div>
    {count && <span style={{ fontSize: '12px', fontWeight: '700', opacity: 0.6 }}>{count}</span>}
  </div>
);

const FilterPill = ({ text, active }) => (
  <button style={{ 
    padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
    background: active ? '#dcfce7' : '#f1f5f9', color: active ? '#16a34a' : '#64748b',
    border: 'none', cursor: 'pointer' 
  }}>{text}</button>
);

const RecipeCard = ({ recipe, selected, onToggle, navigate }) => (
  <div style={{ 
    background: 'white', borderRadius: '20px', overflow: 'hidden', 
    border: selected ? '2px solid #22c55e' : '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', transition: 'all 0.3s',
    position: 'relative', cursor: 'pointer'
  }} className="group">
    
    <div onClick={onToggle} style={{ 
      position: 'absolute', top: '12px', left: '12px', zIndex: 10,
      width: '24px', height: '24px', borderRadius: '6px',
      background: selected ? '#22c55e' : 'white', border: selected ? 'none' : '1px solid #cbd5e1',
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold'
    }}>
      {selected && '✓'}
    </div>

    <div style={{ aspectRatio: '1/1', position: 'relative' }}>
      <img 
        src={recipe.imageUrl || 'https://via.placeholder.com/400'} 
        alt={recipe.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      <div style={{ 
        position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
        display: 'flex', alignItems: 'flex-end', padding: '16px', opacity: 0, transition: 'opacity 0.2s'
      }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
        <button onClick={() => navigate(`/recipe/${recipe._id}`)} style={{ width: '100%', padding: '10px', background: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Quick View</button>
      </div>
    </div>

    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a', lineHeight: '1.4' }}>{recipe.title}</h3>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '10px', fontWeight: '700', color: '#16a34a', background: '#dcfce7', padding: '4px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>High Protein</span>
        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>• {recipe.cookTime || 20}m</span>
      </div>

      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '-4px' }}>
           <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e2e8f0', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700' }}>P</div>
           <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#cbd5e1', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700', marginLeft: '-6px' }}>C</div>
           <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#94a3b8', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700', marginLeft: '-6px' }}>F</div>
        </div>
        <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b' }}>{Math.round(recipe.calories || 0)} Cal</span>
      </div>
    </div>
  </div>
);

export default MyRecipesPage;
