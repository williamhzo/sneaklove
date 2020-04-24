import { APIHandler } from './APIHandler.js';
const sneakersAPI = new APIHandler('/api/sneakers/');

// charactersAPI.getFullList().then((r) => console.log(r.data));

window.onload = () => {
	const allDeleteBtn = document.querySelectorAll('.table-division:nth-last-child(1)');
	allDeleteBtn.forEach((btn) => {
		btn.addEventListener('click', (event) => {
			const id = event.target.getAttribute('data-id-sneaker');

			sneakersAPI
				.delete(id)
				.then((APIResult) => {
					event.target.closest('tr').remove();
				})
				.catch((APIerror) => console.log(APIerror));
		});
	});
};
