import {
    SHOW_HIDE_RECIPE_FORM
} from '../helpers/actionTypes';

export const showHideRecipeForm = (visible, recipe) => ({type: SHOW_HIDE_RECIPE_FORM, visible, recipe});
