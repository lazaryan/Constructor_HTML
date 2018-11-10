'use strict';

var navigation = {
	title: {
		title: 'заголовок',
		preview_src: './img/Снимок.PNG',
		template: '<h1>Текст</h1>'
	},
	block: {
		title: 'блок',
		preview_src: './img/Снимок.PNG',
		template: '<div>Просто блок</div>'
	}
};

var navWrapper = document.querySelector('#navWrapper');

var node = document.createElement('ul');
node.classList = 'nav__list';

Object.keys(navigation).forEach(function (key) {
	var elem = document.createElement('li');
	elem.classList = 'nav__item';

	var title = document.createElement('p');
	title.innerHTML = navigation[key].title;
	title.classList = 'nav-item__title';

	var img = document.createElement('img');
	img.src = navigation[key].preview_src;
	img.classList = 'nav-item__show js-draggable';
	img.dataset.name = key;

	elem.appendChild(title);
	elem.appendChild(img);

	node.appendChild(elem);
});

navWrapper.appendChild(node);