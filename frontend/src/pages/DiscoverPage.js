// frontend/src/pages/DiscoverPage.js
import React, { useState, useEffect } from 'react';
import { recipeAPI } from '../api/client';
import RecipeCard from '../components/RecipeCard';
import '../styles/DiscoverPage.css';

function DiscoverPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    cuisineType: '',
    sourceType: '',
    proteinMin: '',
    proteinMax: '',
    carbsMin: '',
    carbsMax: '',
    fatMin: '',
    fatMax: ''
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeAPI.getAll();
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim()) {
      try {
        const response = await recipeAPI.search(e.target.value);
        setRecipes(response.data);
      } catch (error) {
        console.error('Error searching recipes:', error);
      }
    } else {
      fetchRecipes();
    }
  };

  const handleFilter = async (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    try {
      const response = await recipeAPI.filter(newFilters);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error filtering recipes:', error);
    }
  };

  const resetFilters = async () => {
    setFilters({
      cuisineType: '',
      sourceType: '',
      proteinMin: '',
      proteinMax: '',
      carbsMin: '',
      carbsMax: '',
      fatMin: '',
      fatMax: ''
    });
    setSearch('');
    fetchRecipes();
  };

  const cuisines = ['Italian', 'Chinese', 'Mexican', 'Japanese', 'French', 'Indian', 'Korean', 'Thai', 'Vietnamese', 'Mediterranean'];
  const sources = ['Instagram', 'Xiaohongshu', 'TikTok', 'Pinterest', 'Facebook'];

  return (
    <div className="discover-page">
      <div className="sidebar">
        <h3>MAIN</h3>
        <button className="nav-link active">All Recipes</button>
        <button className="nav-link">Favorites</button>
        <button className="nav-link">Meal Plan</button>

        <h3>CUISINE TYPE</h3>
        <div className="cuisine-buttons">
          {cuisines.map(cuisine => (
            <button
              key={cuisine}
              className={`cuisine-btn ${filters.cuisineType === cuisine ? 'active' : ''}`}
              onClick={() => handleFilter({ target: { name: 'cuisineType', value: filters.cuisineType === cuisine ? '' : cuisine } })}
            >
              {cuisine}
            </button>
          ))}
        </div>

        <h3>SOURCE</h3>
        {sources.map(source => (
          <label key={source} className="checkbox">
            <input
              type="checkbox"
              name="sourceType"
              value={source}
              checked={filters.sourceType === source}
              onChange={handleFilter}
            />
            {source}
          </label>
        ))}

        <h3>NUTRITIONAL TARGETS</h3>
        <div className="nutrient-filter">
          <label>Protein</label>
          <div className="range-inputs">
            <input
              type="number"
              name="proteinMin"
              placeholder="Min g"
              value={filters.proteinMin}
              onChange={handleFilter}
            />
            <input
              type="number"
              name="proteinMax"
              placeholder="Max g"
              value={filters.proteinMax}
              onChange={handleFilter}
            />
          </div>
        </div>

        <div className="nutrient-filter">
          <label>Carbs</label>
          <div className="range-inputs">
            <input
              type="number"
              name="carbsMin"
              placeholder="Min g"
              value={filters.carbsMin}
              onChange={handleFilter}
            />
            <input
              type="number"
              name="carbsMax"
              placeholder="Max g"
              value={filters.carbsMax}
              onChange={handleFilter}
            />
          </div>
        </div>

        <div className="nutrient-filter">
          <label>Fat</label>
          <div className="range-inputs">
            <input
              type="number"
              name="fatMin"
              placeholder="Min g"
              value={filters.fatMin}
              onChange={handleFilter}
            />
            <input
              type="number"
              name="fatMax"
              placeholder="Max g"
              value={filters.fatMax}
              onChange={handleFilter}
            />
          </div>
        </div>

        <button className="reset-btn" onClick={resetFilters}>Reset Filters</button>
      </div>

      <div className="main-content">
        <div className="header">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by ingredient, title, or chef..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⊞
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              ☰
            </button>
          </div>
        </div>

        <h1>Discover Recipes</h1>
        <p>Showing {recipes.length} saved recipes from your network.</p>

        {loading ? (
          <div className="loading">Loading recipes...</div>
        ) : (
          <div className={`recipes-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {recipes.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DiscoverPage;
