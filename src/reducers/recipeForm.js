import {
  SHOW_HIDE_RECIPE_FORM
} from '../helpers/actionTypes';

const initialState = {
  visible: false,
  recipe: {}
}

const recipeForm = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_HIDE_RECIPE_FORM:
      return {
        visible: action.visible,
        recipe: {...action.recipe}
      }
    default:
        return state;
  }
};

export const isRecipeForm = (state) => state.visible;
export const recipeFormItem = (state) => state.recipe;

export default recipeForm;
