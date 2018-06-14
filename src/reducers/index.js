import {combineReducers} from 'redux';
import recipes, * as fromRecipes from './recipes';

const recipeApp = combineReducers({
    recipes
});

export const getAllRecipes = (state) => fromRecipes.getAllRecipes(state.recipes);
export const isRecipesFetching = (state) => fromRecipes.isRecipesFetching(state.recipes);
export const getRecipeById = (state, id) => fromRecipes.getAllRecipes(state.recipes).find((el) => el._id === id);

export default recipeApp;
