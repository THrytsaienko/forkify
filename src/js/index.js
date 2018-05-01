import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of our app
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/

const state = {}

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

		// search for recipes
		await state.search.getResults();

		// render resulys on UI
		clearLoader();
		searchView.renderResults(state.search.result);
	}
}

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controleSearch();
});

elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		searchView.clearResults();
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.renderResults(state.search.result, goToPage);
	}
});