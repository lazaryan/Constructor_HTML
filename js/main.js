'use strict';

var body = document.querySelector('#body');
var nav = document.querySelector('#nav');
var nav_button = document.querySelector('#nav-button');

nav_button.addEventListener('click', function () {
	nav.classList.toggle('nav_disactive');
});