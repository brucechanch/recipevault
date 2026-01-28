const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  sourceUrl: String,
  sourceType: {
    type: String,
    enum: ['Instagram', 'Xiaohongshu', 'Facebook', 'TikTok', 'Pinterest', 'Personal'],
    default: 'Personal'
  },
  cuisineType: String,
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  prepTime: Number,
  cookTime: Number,
  servings: { type: Number, default: 1 },
  imageUrl: String,
  
  ingredients: [{
    name: String,
    quantity: Number,
    unit: String,
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    calories: { type: Number, default: 0 }
  }],
  
  instructions: [String],
  labels: [String],
  
  nutritionTotals: {
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    calories: { type: Number, default: 0 }
  },
  
  isFavorite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Auto-calculate nutrition before saving
RecipeSchema.pre('save', function(next) {
  if (this.ingredients && this.ingredients.length > 0) {
    this.nutritionTotals = {
      protein: this.ingredients.reduce((sum, ing) => sum + (ing.protein || 0), 0),
      carbs: this.ingredients.reduce((sum, ing) => sum + (ing.carbs || 0), 0),
      fat: this.ingredients.reduce((sum, ing) => sum + (ing.fat || 0), 0),
      calories: this.ingredients.reduce((sum, ing) => sum + (ing.calories || 0), 0)
    };
  }
  next();
});

// Index for better query performance
RecipeSchema.index({ userId: 1, createdAt: -1 });
RecipeSchema.index({ cuisineType: 1 });
RecipeSchema.index({ sourceType: 1 });
RecipeSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Recipe', RecipeSchema);
