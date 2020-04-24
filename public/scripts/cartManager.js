import { APIHandler } from './APIHandler.js';
const sneakersAPI = new APIHandler();

window.onload = () => {
	document.getElementById('add-to-cart').addEventListener('click', (event) => {
		event.preventDefault();
		const ref = document.querySelector('.sneak-ref').textContent.substr(5);
		const size = document.getElementById('main_category').value;
		if (size === '-1') {
			return;
		}
		let product = { ref, size };
		sneakersAPI
			.addThisToCart(product)
			.then((APIResult) => {
				console.log('YAY');
			})
			.catch((APIError) => {
				console.log('DOH !');
			});
	});
};
