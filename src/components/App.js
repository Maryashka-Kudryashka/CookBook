import React, { Component } from 'react';
import '../styles/App.css';
import block from '../helpers/BEM';
import Dish from './Dish';
import { connect } from 'react-redux';
import { getAllRecipes,isRecipesFetching } from '../reducers';
import { fetchRecipes } from '../actions/recipe'
import { NavLink } from 'react-router-dom';

const b = block('App');

class App extends Component {
  componentWillMount() {
    this.props.fetchAllRecipes();
  }

  render() {
    const { recipes } = this.props;
    recipes.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    });
    return (
      <section className={b()}>
        <h1 className={b('name')}>Cook Book</h1>
        <NavLink to={`/recipe-form/`}>
          <button className={b('add-dish')}>Add new</button>
        </NavLink>
        <main className={b('main')}>
          <section className={b('recipes')} style={{display: this.props.recipes.length === 0 ? 'none' : 'block'}}>
            {this.props.recipes.map((recipe, i) =>
              <Dish recipe={recipe} key={i}/>
            )}
          </section>
          <section className={b('recipes', ['undefined'])} style={{display: this.props.recipes.length === 0 ? 'flex' : 'none'}}>There is no recipes yet</section>
        </main>
      </section>
    );
  }
}

export default connect((state, props) =>
  {
    const recipes = getAllRecipes(state);
    const isFetching = isRecipesFetching(state);
    return {recipes,isFetching}
  },
  (dispatch) => ({
    fetchAllRecipes: () => dispatch(fetchRecipes())
  })
)(App);
