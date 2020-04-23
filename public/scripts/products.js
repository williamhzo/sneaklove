import { APIHandler } from './APIHandler.js';
const sneakersAPI = new APIHandler('/api/sneakers/');

// charactersAPI.getFullList().then((r) => console.log(r.data));

window.onload = () => {
	document.getElementById('btn_new_tag').addEventListener('click', (event) => {
		const label = document.getElementById('new_tag_name').value;
		if (label === '') {
			return;
		} else {
			sneakersAPI
				.findTag({ label })
				.then((APIresult) => {
					if (APIresult.data === null) {
						sneakersAPI
							.addTag(label)
							.then(() => {
								document.getElementById('new_tag_name').value = '';
							})
							.catch((APIError) => console.log(APIError));
					} else {
						document.getElementById('add-tag-message').textContent = 'Tag already exist.';
					}
				})
				.catch((APIError) => console.log(APIError));
		}
	});
};