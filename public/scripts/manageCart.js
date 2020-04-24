import { APIHandler } from './APIHandler.js';
const sneakersAPI = new APIHandler('/api/sneakers/');

window.onload = () => {
	const allDeleteBtn = document.querySelectorAll('.table-division:nth-last-child(1)');
	allDeleteBtn.forEach((btn) => {
		btn.addEventListener('click', (event) => {
			const id = event.target.getAttribute('data-id-sneaker');

			sneakersAPI
				.removeFromCart(id)
				.then(() => {
					event.target.closest('tr').remove();
				})
				.catch(() => console.log('T.T'));
		});
	});
};
