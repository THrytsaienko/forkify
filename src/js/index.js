import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of our app
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/

const state = {}

/* Search Controller */

const controleSearch = async () => {
	// get query from the view
	const query = searchView.getInput();

	if (query) {
		// new search object and add it to a state
		state.search = new Search(query);

		// prepare UI for results
		searchView.clearInput();
		renderLoader(elements.searchRes);
		searchView.clearResults();

		try {
			// search for recipes
			await state.search.getResults();
	
			// render resulys on UI
			clearLoader();
			searchView.renderResults(state.search.result);
		} catch (error) {
			alert('Something wrong with the search...');
			clearLoader();
		}
	}
}

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controleSearch();
});

// TESTING
// window.searchForm.addEventListener('submit', e => {
// 	e.preventDefault();
// 	controleSearch();
// });

elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		searchView.clearResults();
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.renderResults(state.search.result, goToPage);
	}
});


/* Recipe Controller */

const controlRecipe = async () => {
	// Get ID from url
	const id = window.location.hash.replace('#', '');

	if (id) {
		// Prepare UI for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		// Highlight selected search item
		if (state.search) searchView.highlightSelected(id);

		// Create new recipe object
		state.recipe = new Recipe(id);

		try {
			// Get recipe data and parse ingredients
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();

			// Calculate servings and time
			state.recipe.calcTime();
			state.recipe.calcServings();

			// Render recipe
			clearLoader();
			recipeView.renderRecipe(
				state.recipe
				// state.likes.isLiked(id)
			);

		} catch (err) {
			console.log(err);
			alert('Error processing recipe!');
		}
	}
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));