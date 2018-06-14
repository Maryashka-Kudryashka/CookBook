import { combineReducers } from 'redux';
import {
    FETCH_RECIPES_START,
    FETCH_RECIPES_SUCCESS,
    POST_RECIPE_SUCCESS,
    DELETE_RECIPE_SUCCESS,
    SHOW_RECIPE,
    FETCH_RECIPE_ID_SUCCESS
} from '../helpers/actionTypes';

export const allRecipes = (state = [], action) => {
  switch (action.type) {
    case FETCH_RECIPES_SUCCESS:
      return [
        ...action.recipes
      ].map(el => ({
        ...el,
        expanded: false
      }))
    case POST_RECIPE_SUCCESS:
      if(state.find((el) => el._id === action.recipe._id)) {
        return state.map(recipe => {
          if(recipe._id === action.recipe._id) {
            return {...action.recipe}
          }
          return recipe;
        })
      } else {
        return [
          action.recipe,
          ...state
        ]
      }

    case DELETE_RECIPE_SUCCESS:
      return state.filter(el => el._id !== action.recipe._id);
    case SHOW_RECIPE:
      return state.map(recipe => {
        if (recipe._id === action.recipe._id) {
          return {
            ...recipe,
            expanded: action.expanded
          }
        }

        return recipe;
      });
    case FETCH_RECIPE_ID_SUCCESS:
      return [
        action.recipe,
        ...state
      ]
    default:
        return state;
  }
};

export const fetching = (state = {}, action) => {
    switch (action.type) {
        case FETCH_RECIPES_START:
          return {all:true}
        case FETCH_RECIPES_SUCCESS:
            return {all:false};
        default:
            return state;
    }
};

const recipes = combineReducers({
    allRecipes,
    fetching
});

export const getAllRecipes = (state) => state.allRecipes;
export const isRecipesFetching = (state) => state.fetching;

export default recipes;
