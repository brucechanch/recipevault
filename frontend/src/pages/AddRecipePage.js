import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipeAPI } from '../api/client';

function AddRecipePage() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '', description: '', sourceUrl: '', cuisineType: '', difficulty: 'Easy',
    ingredients: [{ name: '', quantity: 0, unit: 'g' }],
    instructions: ['']
  });

  const [nutrition, setNutrition] = useState({ protein: 32, carbs: 45, fat: 18, calories: 485 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { name: '', quantity: 0, unit: 'g' }] });
  };

  const removeIngredient = (index) => {
    setRecipe({ ...recipe, ingredients: recipe.ingredients.filter((_, i) => i !== index) });
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
      alert('Failed to create recipe');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '20px 40px', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', fontSize: '14px', color: '#6b7280' }}>
          Home › <span style={{ color: '#22c55e' }}>Add New Recipe</span>
        </div>
      </div>

      {/* Page Header */}
      <div style={{ padding: '32px 40px 24px', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
          Add New Recipe
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
          Consolidate your favorite recipes with precise nutritional tracking and automated macros.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px', padding: '0 40px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Left Column */}
        <div>
          {/* General Information */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '28px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ width: '28px', height: '28px', backgroundColor: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
                <span style={{ color: 'white', fontSize: '16px', fontWeight: '700' }}>✓</span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#111827' }}>General Information</h2>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#374151' }}>Recipe Title</label>
              <input
                type="text"
                name="title"
                value={recipe.title}
                onChange={handleInputChange}
                placeholder="e.g. Grandma's Famous Lasagna"
                required
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#374151' }}>Source URL (Optional)</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="url"
                  name="sourceUrl"
                  value={recipe.sourceUrl}
                  onChange={handleInputChange}
                  placeholder="Link to Instagram, TikTok, or Blog"
                  style={{ flex: 1, padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box' }}
                />
                <button type="button" style={{ padding: '12px 24px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                  Fetch
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#374151' }}>Cuisine Type</label>
                <select name="cuisineType" value={recipe.cuisineType} onChange={handleInputChange} required style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box' }}>
                  <option value="">Select Cuisine</option>
                  {['Italian', 'Chinese', 'Mexican', 'Japanese', 'French', 'Indian', 'Korean', 'Thai'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#374151' }}>Difficulty</label>
                <select name="difficulty" value={recipe.difficulty} onChange={handleInputChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box' }}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#374151' }}>Description</label>
              <textarea
                name="description"
                value={recipe.description}
                onChange={handleInputChange}
                placeholder="Briefly describe what makes this recipe special..."
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', minHeight: '100px', boxSizing: 'border-box', fontFamily: 'inherit' }}
              />
            </div>
          </div>

          {/* Ingredient List Builder */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '28px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '28px', height: '28px', backgroundColor: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
                  <span style={{ color: 'white', fontSize: '16px', fontWeight: '700' }}>✓</span>
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#111827' }}>Ingredient List Builder</h2>
              </div>
              <span style={{ padding: '4px 12px', background: '#d1fae5', color: '#065f46', borderRadius: '999px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>Auto-calculating</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 100px 100px 40px', gap: '12px', marginBottom: '12px', fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' }}>
              <div>INGREDIENT NAME</div>
              <div>QTY</div>
              <div>UNIT</div>
              <div></div>
            </div>

            {recipe.ingredients.map((ing, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 100px 100px 40px', gap: '12px', marginBottom: '12px' }}>
                <input type="text" placeholder="Search ingredient (e.g. Chicken Breast)" value={ing.name} onChange={(e) => handleIngredientChange(i, 'name', e.target.value)} style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }} />
                <input type="number" placeholder="150" value={ing.quantity} onChange={(e) => handleIngredientChange(i, 'quantity', e.target.value)} style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }} />
                <select value={ing.unit} onChange={(e) => handleIngredientChange(i, 'unit', e.target.value)} style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px' }}>
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="cup">cup</option>
                </select>
                <button type="button" onClick={() => removeIngredient(i)} style={{ padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer' }}>🗑</button>
              </div>
            ))}

            <button type="button" onClick={addIngredient} style={{ width: '100%', padding: '14px', background: 'white', border: '2px dashed #d1d5db', borderRadius: '8px', color: '#6b7280', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}>
              ⊕ Add Another Ingredient
            </button>
          </div>

          {/* Cooking Instructions */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ width: '28px', height: '28px', backgroundColor: '#22c55e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
                <span style={{ color: 'white', fontSize: '16px', fontWeight: '700' }}>✓</span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#111827' }}>Cooking Instructions</h2>
            </div>

            {recipe.instructions.map((inst, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#6b7280' }}>{i + 1}. Preheat oven to 375°F...</label>
                <textarea value={inst} onChange={(e) => handleInstructionChange(i, e.target.value)} placeholder={`Season chicken with salt and pepper...`} style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', minHeight: '80px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
              </div>
            ))}

            <button type="button" onClick={addInstruction} style={{ padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>+ Add Step</button>
          </div>
        </div>

        {/* Right Sidebar - Nutritional Summary */}
        <div style={{ position: 'sticky', top: '88px', height: 'fit-content' }}>
          <div style={{ background: '#1e293b', color: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ width: '24px', height: '24px', backgroundColor: '#22c55e', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                <span style={{ color: 'white', fontSize: '14px', fontWeight: '700' }}>✓</span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Nutritional Summary</h2>
            </div>

            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
              <div style={{ fontSize: '56px', fontWeight: '800', color: '#22c55e', marginBottom: '4px', lineHeight: 1 }}>{nutrition.calories}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '28px' }}>TOTAL CALORIES</div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Protein</span>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#22c55e' }}>{nutrition.protein}g</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '70%', backgroundColor: '#22c55e', borderRadius: '3px' }}></div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Carbohydrates</span>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#3b82f6' }}>{nutrition.carbs}g</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '55%', backgroundColor: '#3b82f6', borderRadius: '3px' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Total Fat</span>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#f59e0b' }}>{nutrition.fat}g</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '35%', backgroundColor: '#f59e0b', borderRadius: '3px' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <div style={{ flex: 1, background: '#1e293b', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>4.2g</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>FIBER</div>
                </div>
                <div style={{ flex: 1, background: '#1e293b', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'white' }}>120mg</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>SODIUM</div>
                </div>
              </div>
            </div>

            <button type="submit" style={{ width: '100%', padding: '16px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px' }}>
              Save Recipe
            </button>
            <button type="button" style={{ width: '100%', padding: '14px', background: 'transparent', color: '#94a3b8', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '12px' }}>
              Save as Draft
            </button>
            <button type="button" onClick={() => navigate('/dashboard')} style={{ width: '100%', padding: '14px', background: 'transparent', color: '#ef4444', border: 'none', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              Discard Recipe
            </button>

            <div style={{ marginTop: '24px', padding: '16px', background: '#065f46', borderRadius: '10px', fontSize: '13px', lineHeight: '1.6', color: '#d1fae5' }}>
              <div style={{ fontWeight: '700', marginBottom: '6px' }}>💡 Pro-tip:</div>
              Adding the Source URL helps us fetch the original image and creator credits automatically!
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddRecipePage;
