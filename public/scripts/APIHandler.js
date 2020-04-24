export class APIHandler {
	constructor(baseUrl) {
		// this.BASE_URL = baseUrl;
		// "http://localhost:8000"
		this.service = axios.create({
			baseURL: baseUrl,
		});
		console.log('woohoo');
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
}
