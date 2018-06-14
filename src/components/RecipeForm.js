import React, { Component } from 'react';
import '../styles/RecipeForm.css';
import block from '../helpers/BEM';
import { connect } from 'react-redux';
import { postRecipes,fetchRecipeById } from '../actions/recipe';
import { NavLink } from 'react-router-dom';
import { getRecipeById } from '../reducers';

const b = block('RecipeForm');

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    let { recipe, recipeId } = this.props;
    if (!recipe) {
      recipeId && this.props.recipeById(recipeId);
      recipe = {};
    }
    this.state = {
      name: recipe.name || '',
      image: recipe.image || '',
      description: recipe.description || '',
      recipe: recipe.recipe || '',
      _id: recipe._id || ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    let recipe = props.recipe || {};
    this.setState({
      name: recipe.name || '',
      image: recipe.image || '',
      description: recipe.description || '',
      recipe: recipe.recipe || '',
      _id: recipe._id || ''
    });
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.postRecipeToDB(this.state);
  }

  render() {
    const isEnabled = this.state && this.state.name.length > 0 &&
    this.state.description.length > 0 &&
    this.state.recipe.length > 0;
    return (
      <section className={b()}>
        <h2 className={b('header')}>Recipe Form</h2>
        <form className={b('form')} onSubmit={this.handleSubmit}>
          <label className={b('label')}>
            Name
            <input className={b('input')} name='name' value={this.state.name} onChange={this.handleChange}/>
          </label>
          <label className={b('label')}>
            Image
            <input className={b('input')} type='file' accept='image/*' onChange={this.handleChange}/>
          </label>
          <label className={b('label')}>
            Description
            <textarea className={b('input')} name='description' value={this.state.description} onChange={this.handleChange}/>
          </label>
          <label className={b('label')}>
            Recipe
            <textarea rows='6' className={b('input')} name='recipe' value={this.state.recipe} onChange={this.handleChange}/>
          </label>
          <input className={b('button')} type='submit' value='Submit' style={{display: isEnabled ? 'inline-block' : 'none'}}/>
          <NavLink to='/'>
            <button className={b('button', ['cancel'])}>Cancel</button>
          </NavLink>
        </form>
      </section>
    );
  }
}


export default connect((state, props) => {
    const recipeId = props.match.params.id;
    const recipe = getRecipeById(state, recipeId);
    return {recipeId, recipe}
  },(dispatch) => ({
    postRecipeToDB: (recipe) => dispatch(postRecipes(recipe)),
    recipeById: (id) => dispatch(fetchRecipeById(id))
  })
)(RecipeForm);
