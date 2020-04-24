export class APIHandler {
	constructor(baseUrl) {
		// this.BASE_URL = baseUrl;
		// "http://localhost:8000"
		this.service = axios.create({
			baseURL: baseUrl,
		});
	}

	getFullList() {
		return this.service.get('/');
	}

	addTag(label) {
		return this.service.post(`/${label}`);
	}

	findTag(label) {
		return this.service.get(`/${label}`);
	}

	delete(id) {
		return this.service.delete(`/${id}`);
	}

	filterByTags(tagArray, category = '') {
		let string = tagArray.join('-');
		let categ = category === '' ? 'none' : category;
		return this.service.get(`/filter/${string}/${categ}`);
	}
	getAllSneakers(category = '') {
		let categ = category === '' ? 'none' : category;
		return this.service.get(`/sneakers/${categ}`);
	}
}
