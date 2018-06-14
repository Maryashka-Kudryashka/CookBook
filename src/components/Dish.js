import React, { Component } from 'react';
import '../styles/Dish.css';
import block from '../helpers/BEM';
import Recipe from './Recipe';
import { connect } from 'react-redux';
import { deleteRecipes,showRecipe } from '../actions/recipe';
import { NavLink } from 'react-router-dom';

const b = block('Dish');

class Dish extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
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
            <img className={b('image', [recipe.image !== '' ? '' : 'disabled'])} src={recipe.image} alt='Dish'/>
            <span className={b('image-placeholder', [recipe.image !== '' ? 'disabled' : ''])}></span>
            <div className={b('info')}>
              <h2 className={b('name')}>{recipe.name}</h2>
              <time className={b('date')}>{date}</time>
            </div>
            <span className={b('description')}>{recipe.description}</span>
          </div>
          <div className={b('icons')}>
            <NavLink to={`/recipe-form/${recipe._id}`} style={{display: 'flex'}}>
              <span className={b('edit')}></span>
            </NavLink>
            <span className={b('delete')} onClick={this.handleDelete}></span>
          </div>
        </section>
        <Recipe recipe={this.props.recipe}/>
      </section>
    );
  }
}

export default connect((state, props) =>
  {return state},
  (dispatch) => ({
    deleteRecipe: (recipe) => dispatch(deleteRecipes(recipe)),
    recipeShow: (recipe, expanded) => dispatch(showRecipe(recipe, expanded))
  })
)(Dish);
