const express = require('express');
const router = express.Router();
const db = require('../db');
var ObjectId = require('mongodb').ObjectID;

router.get('/allrecipes', async (req, res) => {
  const recipes = await db.get().collection('recipes')
                                .find()
                                .toArray();
  recipes.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });
  res.send(recipes);
});

router.get('/:id', async (req, res) => {
    const recipeId = req.params.id;
    const recipe = await db.get().collection('recipes').findOne(ObjectId(recipeId));
    res.send(recipe);
});

router.post('/add', async (req, res) => {
    let recipe = {...req.body};
    delete recipe._id;
    if (!req.body._id) {
      const date = new Date();
      recipe.date = date;
      const savedRecipe = await db.get().collection('recipes').save(recipe);
      res.send(savedRecipe.ops[0]);
    } else {
      const savedRecipe = await db.get().collection('recipes').findOneAndUpdate({_id: ObjectId(req.body._id)}, {$set: recipe}, {returnOriginal: false});
      res.send(savedRecipe.value);
    }
});

router.delete('/delete', async (req, res) => {
    let recipe = req.body;
    const deletedRecipe = await db.get().collection('recipes').findOneAndDelete({_id: ObjectId(recipe._id)});
    res.send(deletedRecipe.value);
});


module.exports = router;
