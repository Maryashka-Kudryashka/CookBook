import {combineReducers} from 'redux';
import recipeForm, * as fromRecipeForm from './recipeForm';
import recipes, * as fromRecipes from './recipes';

const recipeApp = combineReducers({
    recipes,
    recipeForm
});

export const isRecipeForm = (state) => fromRecipeForm.isRecipeForm(state.recipeForm);
export const recipeFormItem = (state) => fromRecipeForm.recipeFormItem(state.recipeForm);
export const getAllRecipes = (state) => fromRecipes.getAllRecipes(state.recipes);
export const isRecipesFetching = (state) => fromRecipes.isRecipesFetching(state.recipes);

export default recipeApp;
