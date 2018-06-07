import React, { Component } from 'react';
import '../styles/RecipeForm.css';
import block from "../helpers/BEM";
import { showHideRecipeForm } from "../actions/recipeForm";
import { connect } from "react-redux";
import { postRecipes } from "../actions/recipe";


const b = block("RecipeForm");

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.recipe.name || "",
      image: props.recipe.image || "",
      description: props.recipe.description || "",
      recipe: props.recipe.recipe || "",
      _id: props.recipe._id || ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      name: props.recipe.name || "",
      image: props.recipe.image || "",
      description: props.recipe.description || "",
      recipe: props.recipe.recipe || "",
      _id: props.recipe._id || ""
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
    this.props.showHideForm(false, {});
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.showHideForm(false, {});
  }

  onImageChange(name, val) {
    this.setState({
      ...this.state,
      [name]: val
    });
  }

  render() {
    const isEnabled =
    this.state.name.length > 0 &&
    this.state.description.length > 0 &&
    this.state.recipe.length > 0;
    return (
      <section className={b()}>
        <h2 className={b('header')}>Recipe Form</h2>
        <form className={b('form')} onSubmit={this.handleSubmit}>
          <label className={b('label')}>
            Name
            <input className={b('input')} name="name" value={this.state.name} onChange={this.handleChange}/>
          </label>
          <label className={b('label')}>
            Image
            <input className={b('input')} type="file" accept="image/*" onChange={this.handleChange}/>
          </label>
          <label className={b('label')}>
            Description
            <textarea className={b('input')} name="description" value={this.state.description} onChange={this.handleChange}/>
          </label>
          <label className={b('label')}>
            Recipe
            <textarea rows="6" className={b('input')} name="recipe" value={this.state.recipe} onChange={this.handleChange}/>
          </label>
          <input className={b('button')} type="submit" value="Submit" style={{display: isEnabled ? "inline-block" : "none"}}/>
          <button className={b('button', ['cancel'])} onClick={this.handleCancel}>Cancel</button>
        </form>
      </section>
    );
  }
}

export default connect((state, props) =>
  null,
  (dispatch) => ({
    showHideForm: (visible, recipe) => dispatch(showHideRecipeForm(visible, recipe)),
    postRecipeToDB: (recipe) => dispatch(postRecipes(recipe))
  })
)(RecipeForm);
