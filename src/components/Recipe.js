import React, { Component } from 'react';
import '../styles/Recipe.css';
import block from "../helpers/BEM";

const b = block("Recipe");

class Recipe extends Component {
  render() {
    const { recipe } = this.props;
    return (
      <section className={b()} style={{display: recipe.expanded ? 'block' : 'none'}}>
        <h3 className={b('header')}>Recipe</h3>
        <span className={b('text')}>{recipe.recipe}</span>
      </section>
    );
  }
}

export default Recipe;
