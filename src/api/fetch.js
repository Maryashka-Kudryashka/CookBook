export async function allRecipes() {
  return await ((await fetch(`http://localhost:5000/recipes/allrecipes`)).json());
}

export async function postRecipe(recipe) {
  return await ((await fetch(`http://localhost:5000/recipes/add`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(recipe)
  })).json());
}

export async function deleteRecipe(recipe) {
  return await  ((await fetch(`http://localhost:5000/recipes/delete`, {
    method: 'DELETE',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(recipe)
  })).json());
}

export async function recipeById(id) {
  return await ((await fetch(`http://localhost:5000/recipes/${id}`)).json());
}
