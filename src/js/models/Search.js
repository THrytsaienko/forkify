import axios from 'axios';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getResults() {
		// const proxy = 'https://crossorigin.me/';
		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const key = 'c4670ff25b009a5e83041ffc02f20ed7';
		try {
			const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
			this.result = res.data.recipes;
		} catch (error) {
			alert(error);
		}
	}
}