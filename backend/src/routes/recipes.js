const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');

// Get all recipes (with filtering)
router.get('/', async (req, res) => {
  try {
    const { cuisineType, sourceType, proteinMin, proteinMax, carbsMin, carbsMax, fatMin, fatMax } = req.query;
    
    let filter = {};
    if (cuisineType) filter.cuisineType = cuisineType;
    if (sourceType) filter.sourceType = sourceType;
    
    if (proteinMin || proteinMax) {
      filter['nutritionTotals.protein'] = {};
      if (proteinMin) filter['nutritionTotals.protein'].$gte = parseFloat(proteinMin);
      if (proteinMax) filter['nutritionTotals.protein'].$lte = parseFloat(proteinMax);
    }
    
    const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's recipes
router.get('/user/my-recipes', auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create recipe
router.post('/', auth, async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      userId: req.userId
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update recipe
router.put('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    if (recipe.userId.toString() !== req.userId) return res.status(403).json({ error: 'Not authorized' });
    
    Object.assign(recipe, req.body);
    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete recipe
router.delete('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    if (recipe.userId.toString() !== req.userId) return res.status(403).json({ error: 'Not authorized' });
    
    await Recipe.deleteOne({ _id: req.params.id });
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search recipes
router.get('/search/:query', async (req, res) => {
  try {
    const recipes = await Recipe.find({ $text: { $search: req.params.query } });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle favorite
router.patch('/:id/favorite', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    if (recipe.userId.toString() !== req.userId) return res.status(403).json({ error: 'Not authorized' });
    
    recipe.isFavorite = !recipe.isFavorite;
    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
