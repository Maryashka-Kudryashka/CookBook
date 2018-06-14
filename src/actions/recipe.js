import * as fromApi from '../api/fetch';
import { push } from 'react-router-redux';
import {
    FETCH_RECIPES_START,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAIL,
    POST_RECIPE_START,
    POST_RECIPE_SUCCESS,
    DELETE_RECIPE_START,
    DELETE_RECIPE_SUCCESS,
    SHOW_RECIPE,
    FETCH_RECIPE_ID_SUCCESS
} from '../helpers/actionTypes';


export const fetchRecipesStart = () => ({type: FETCH_RECIPES_START});

export const fetchRecipesSuccess = (recipes) => ({type: FETCH_RECIPES_SUCCESS, recipes});

export const fetchRecipesFail = () => ({type: FETCH_RECIPES_FAIL});

export const postRecipesStart = (recipe) => ({type: POST_RECIPE_START, recipe});

export const postRecipeSuccess = (recipe) => ({type: POST_RECIPE_SUCCESS, recipe});

export const deleteRecipesStart = (recipe) => ({type: DELETE_RECIPE_START, recipe});

export const deleteRecipeSuccess = (recipe) => ({type: DELETE_RECIPE_SUCCESS, recipe});

export const fetchRecipeByIdSuccess = (recipe) => ({type: FETCH_RECIPE_ID_SUCCESS, recipe});

export const showRecipe = (recipe, expanded) => ({type: SHOW_RECIPE, recipe, expanded});


export const fetchRecipes = () => async (dispatch) => {
    dispatch(fetchRecipesStart());
    let recipes = await fromApi.allRecipes();
    dispatch(fetchRecipesSuccess(recipes));
};

export const postRecipes = (recipe) => async (dispatch) => {
    dispatch(postRecipesStart(recipe));
    let result = await fromApi.postRecipe(recipe);
    dispatch(postRecipeSuccess(result));
    dispatch(push('/'));
};

export const deleteRecipes = (recipe) => async (dispatch) => {
    dispatch(deleteRecipesStart(recipe));
    let result = await fromApi.deleteRecipe(recipe);
    dispatch(deleteRecipeSuccess(result));
};

export const fetchRecipeById = (id) => async (dispatch) => {
    dispatch(fetchRecipesStart());
    let recipe = await fromApi.recipeById(id);
    dispatch(fetchRecipeByIdSuccess(recipe));
};
