export class APIHandler {
	constructor() {
		// this.BASE_URL = baseUrl;
		// "http://localhost:8000"
		// this.baseUrl = '/api/sneakers/';
		this.service = axios.create({
			baseURL: '/api/sneakers/',
			withCredentials: true,
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

	addThisToCart(product) {
		return this.service.get(`/cart/add/${product.ref}/${product.size}`);
	}

	removeFromCart(id) {
		return this.service.get(`/cart/del/${id}`);
	}
}
