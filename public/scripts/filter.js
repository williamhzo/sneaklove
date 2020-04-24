import { APIHandler } from './APIHandler.js';
const sneakersAPI = new APIHandler('/api/sneakers/');

window.onload = () => {
	const allTagsBox = document.querySelectorAll(`.tag-list-item input[type="checkbox"]`);
	allTagsBox.forEach((checkbox) => {
		checkbox.addEventListener('change', (event) => {
			// console.log(event.target.checked);
			let tagsChecked = [];
			allTagsBox.forEach((x) => {
				if (x.checked) tagsChecked.push(x.id.substr(6));
			});

			const productGrid = document.getElementById('products_grid');
			productGrid.innerHTML = '';
			const categ = document.getElementById('tag_list').getAttribute('data-category');

			if (!tagsChecked.length) {
				sneakersAPI
					.getAllSneakers(categ)
					.then((APIResult) => {
						if (APIResult.data.length === 0) {
							productGrid.innerHTML = '<p> Sorry, no sneakers yet!</p>';
							return;
						}
						APIResult.data.forEach((x) => {
							productGrid.innerHTML += sneakerBloc(x);
						});
						document.getElementById('products_count').textContent = `(${APIResult.data.length})`;
					})
					.catch((APIError) => console.log(APIError));
				return;
			}

			sneakersAPI
				.filterByTags(tagsChecked, categ)
				.then((APIResult) => {
					APIResult.data.forEach((x) => {
						productGrid.innerHTML += sneakerBloc(x);
					});
					document.getElementById('products_count').textContent = `(${APIResult.data.length})`;
				})
				.catch((APIError) => console.log(APIError));
		});
	});
};

function sneakerBloc(x) {
	return `
					        <a href="/sneakers/one-product/${x._id}" class="product-item-wrapper">
					            <div class="product-img">
					                <img src="${x.image}" alt="${x.name} : what a nice pair of kicks">
					            </div>
					            <p class="product-name">${x.name}</p>
					            <p class="product-cat">${x.category}</p>
					            <p class="product-price">${x.price}</p>
					        </a>`;
}

// const sneakerBloc = `
// <a href="/sneakers/one-product/${this._id}" class="product-item-wrapper">
//     <div class="product-img">
//         <img src="${this.image}" alt="${this.name} : what a nice pair of kicks">
//     </div>
//     <p class="product-name">${this.name}</p>
//     <p class="product-cat">${this.category}</p>
//     <p class="product-price">${this.price}</p>
// </a>`;
