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
							.then((APIResult) => {
								document.getElementById('new_tag_name').value = '';
								document.getElementById(
									'tags'
								).innerHTML += `<option value="${APIResult.data._id}">${APIResult.data.label}</option>`;
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
