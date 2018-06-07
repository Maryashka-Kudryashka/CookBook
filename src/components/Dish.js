import React, { Component } from 'react';
import '../styles/Dish.css';
import block from "../helpers/BEM";
import Recipe from "./Recipe";
import { connect } from "react-redux";
import { showHideRecipeForm } from "../actions/recipeForm";
import { deleteRecipes,showRecipe } from "../actions/recipe";

const b = block("Dish");

class Dish extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleEdit(event) {
    event.stopPropagation();
    this.props.showHideForm(true, this.props.recipe);
  }

  handleDelete(event) {
    event.stopPropagation();
    this.props.deleteRecipe(this.props.recipe);
  }

  handleExpand(event) {
    if(this.props.recipe.expanded) {
      this.props.recipeShow(this.props.recipe, false);
    } else {
      this.props.recipeShow(this.props.recipe, true);
    }
  }

  render() {
    const { recipe } = this.props;
    let date = new Date(recipe.date).toLocaleDateString();
    return (
      <section className={b()} onClick={this.handleExpand}>
        <section className={b('preview')}>
          <div className={b('info-container')}>
            <img className={b('image')} style={{display: recipe.image !== "" ? 'flex' : 'none'}} src={recipe.image} alt="Dish"/>
            <span className={b('image',['undefined'])} style={{display: recipe.image ? 'none' : 'flex'}}></span>
            <div className={b('info')}>
              <h2 className={b('name')}>{recipe.name}</h2>
              <time className={b('date')}>{date}</time>
            </div>
            <span className={b('description')}>{recipe.description}</span>
          </div>
          <div className={b('icons')}>
            <span className={b('edit')} onClick={this.handleEdit}></span>
            <span className={b('delete')} onClick={this.handleDelete}></span>
          </div>
        </section>
        <Recipe recipe={this.props.recipe}/>
      </section>
    );
  }
}

export default connect((state, props) =>
  null,
  (dispatch) => ({
    showHideForm: (visible, recipe) => dispatch(showHideRecipeForm(visible, recipe)),
    deleteRecipe: (recipe) => dispatch(deleteRecipes(recipe)),
    recipeShow: (recipe, expanded) => dispatch(showRecipe(recipe, expanded))
  })
)(Dish);
