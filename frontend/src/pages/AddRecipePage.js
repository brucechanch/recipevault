// frontend/src/pages/AddRecipePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipeAPI } from '../api/client';
import '../styles/AddRecipePage.css';

function AddRecipePage() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    sourceUrl: '',
    sourceType: 'Instagram',
    cuisineType: '',
    difficulty: 'Easy',
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    imageUrl: '',
    ingredients: [{ name: '', quantity: 0, unit: 'g', protein: 0, carbs: 0, fat: 0, calories: 0 }],
    instructions: [''],
    labels: []
  });

  const [nutrition, setNutrition] = useState({
    protein: 0,
    carbs: 0,
    fat: 0,
    calories: 0
  });

  const cuisines = ['Italian', 'Chinese', 'Mexican', 'Japanese', 'French', 'Indian', 'Korean', 'Thai', 'Vietnamese', 'Mediterranean'];

  const calculateNutrition = (ingredients) => {
    const totals = {
      protein: ingredients.reduce((sum, ing) => sum + (parseFloat(ing.protein) || 0), 0),
      carbs: ingredients.reduce((sum, ing) => sum + (parseFloat(ing.carbs) || 0), 0),
      fat: ingredients.reduce((sum, ing) => sum + (parseFloat(ing.fat) || 0), 0),
      calories: ingredients.reduce((sum, ing) => sum + (parseFloat(ing.calories) || 0), 0)
    };
    setNutrition(totals);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setRecipe({ ...recipe, ingredients: newIngredients });
    calculateNutrition(newIngredients);
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: '', quantity: 0, unit: 'g', protein: 0, carbs: 0, fat: 0, calories: 0 }]
    });
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
    calculateNutrition(newIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const addInstruction = () => {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recipeAPI.create(recipe);
      navigate('/my-recipes');
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('Failed to create recipe');
    }
  };

  return (
    <div className="add-recipe-container">
      <h1>Add New Recipe</h1>
      <p className="subtitle">Consolidate your favorite recipes with precise nutritional tracking and automated macros.</p>

      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-grid">
          <div className="form-section">
            <h2>General Information</h2>

            <div className="form-group">
              <label>Recipe Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Grandma's Famous Lasagna"
                value={recipe.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Source URL (Optional)</label>
              <div className="url-input">
                <input
                  type="url"
                  name="sourceUrl"
                  placeholder="Link to Instagram, TikTok, or Blog"
                  value={recipe.sourceUrl}
                  onChange={handleInputChange}
                />
                <button type="button" className="fetch-btn">Fetch</button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cuisine Type</label>
                <select
                  name="cuisineType"
                  value={recipe.cuisineType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Cuisine</option>
                  {cuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Difficulty</label>
                <select
                  name="difficulty"
                  value={recipe.difficulty}
                  onChange={handleInputChange}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Briefly describe what makes this recipe special..."
                value={recipe.description}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>

            <h3>Ingredient List Builder</h3>
            <div className="auto-calc">Auto-calculating</div>

            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row">
                <input
                  type="text"
                  placeholder="Search ingredient (e.g., Chicken Breast)"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="150"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                />
                <select
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                >
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="cup">cup</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
                </select>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeIngredient(index)}
                >
                  🗑
                </button>
              </div>
            ))}

            <button type="button" className="add-btn" onClick={addIngredient}>
              + Add Another Ingredient
            </button>

            <h3>Cooking Instructions</h3>
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="instruction-row">
                <span className="step-number">{index + 1}</span>
                <textarea
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  placeholder={`Step ${index + 1}...`}
                />
              </div>
            ))}

            <button type="button" className="add-btn" onClick={addInstruction}>
              + Add Step
            </button>
          </div>

          <div className="nutrition-summary">
            <h2>Nutritional Summary</h2>
            <div className="nutrition-display">
              <div className="calories-big">{Math.round(nutrition.calories)}</div>
              <div className="calories-label">TOTAL CALORIES</div>

              <div className="macro-row">
                <div className="macro">
                  <div className="macro-label">Protein</div>
                  <div className="macro-value" style={{ color: '#22c55e' }}>
                    {Math.round(nutrition.protein)}g
                  </div>
                  <div className="macro-bar" style={{ backgroundColor: '#22c55e', width: '100%', height: '4px', borderRadius: '2px' }}></div>
                </div>
              </div>

              <div className="macro-row">
                <div className="macro">
                  <div className="macro-label">Carbohydrates</div>
                  <div className="macro-value" style={{ color: '#3b82f6' }}>
                    {Math.round(nutrition.carbs)}g
                  </div>
                  <div className="macro-bar" style={{ backgroundColor: '#3b82f6', width: '100%', height: '4px', borderRadius: '2px' }}></div>
                </div>
              </div>

              <div className="macro-row">
                <div className="macro">
                  <div className="macro-label">Total Fat</div>
                  <div className="macro-value" style={{ color: '#f59e0b' }}>
                    {Math.round(nutrition.fat)}g
                  </div>
                  <div className="macro-bar" style={{ backgroundColor: '#f59e0b', width: '100%', height: '4px', borderRadius: '2px' }}></div>
                </div>
              </div>
            </div>

            <button type="submit" className="save-btn">Save Recipe</button>
            <button type="button" className="draft-btn">Save as Draft</button>
            <button type="button" className="discard-btn">Discard Recipe</button>

            <div className="pro-tip">
              💡 <strong>Pro-tip:</strong> Adding the Source URL helps us fetch the original image and creator credits automatically!
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddRecipePage;
