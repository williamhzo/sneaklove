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
				.addTag(label)
				.then((APIResult) => {
					document.getElementById('new_tag_name').value = '';
					document.getElementById(
						'tags'
					).innerHTML += `<option value="${APIResult.data._id}">${APIResult.data.label}</option>`;
					document.getElementById('add-tag-message').classList.remove('error');
					document.getElementById('add-tag-message').classList.add('success');
					document.getElementById('add-tag-message').textContent = 'Tag Created !';
				})
				.catch((APIError) => {
					document.getElementById('add-tag-message').classList.remove('success');
					document.getElementById('add-tag-message').classList.add('error');
					document.getElementById('add-tag-message').textContent = 'Tag already exist.';
				});
		}
	});
};
