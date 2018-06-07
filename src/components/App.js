import React, { Component } from 'react';
import '../styles/App.css';
import block from "../helpers/BEM";
import Dish from "./Dish";
import RecipeForm from "./RecipeForm";
import { showHideRecipeForm } from "../actions/recipeForm";
import { connect } from "react-redux";
import { isRecipeForm,recipeFormItem,getAllRecipes,isRecipesFetching } from "../reducers";
import { fetchRecipes } from "../actions/recipe"

const b = block("App");

class App extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillReceiveProps() {
    if (!this.props.isFetching.all){
      // this.props.fetchAllRecipes();
    }
  }

  componentWillMount() {
    this.props.fetchAllRecipes();
  }

  handleAdd(event) {
    this.props.showHideForm(true, {});
  }

  render() {
    return (
      <section className={b()}>
      <h1 className={b('name')}>Cook Book</h1>
      <button className={b('add-dish')} onClick={this.handleAdd}>Add new</button>
        <main className={b('main')}>
          <section className={b('recipes')} style={{display: this.props.recipes.length === 0 ? 'none' : 'block'}}>
            {this.props.recipes.map((recipe) =>
              <Dish recipe={recipe}/>
            )}
          </section>
          <section className={b('recipes', ['undefined'])} style={{display: this.props.recipes.length === 0 ? 'flex' : 'none'}}>There is no recipes yet</section>
          <section className={b('empty-container')} style={{display: this.props.isRecipeFormActive ? "flex" : "none"}}>
            <RecipeForm recipe={this.props.editRecipeItem} />
          </section>
        </main>
      </section>
    );
  }
}

export default connect((state, props) =>
  {
    const isRecipeFormActive = isRecipeForm(state);
    const editRecipeItem = recipeFormItem(state);
    const recipes = getAllRecipes(state);
    const isFetching = isRecipesFetching(state);
    return {isRecipeFormActive,editRecipeItem,recipes,isFetching}
  },
  (dispatch) => ({
    showHideForm: (visible, recipe) => dispatch(showHideRecipeForm(visible, recipe)),
    fetchAllRecipes: () => dispatch(fetchRecipes())
  })
)(App);
