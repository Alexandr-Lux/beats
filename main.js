/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};

const body = document.body;
const fullscreenMenu = document.querySelector('.overlay');
const menu = document.querySelector('.menu');
const burgerBtn = document.querySelector('.burger');
const menuDirect = document.querySelectorAll('.menu__link');

function overlayActive(){
	fullscreenMenu.classList.toggle('active');
	menu.classList.toggle('menu_vertical');
	burgerBtn.classList.toggle('active');

	if (burgerBtn.classList.contains('active')) {
		body.style.overflow = 'hidden'
	} else {
		body.style.overflow = 'auto'
	};
};

burgerBtn.addEventListener("click", function() {
	overlayActive()
});

menuDirect.forEach(e => {
	e.addEventListener('click', function() {
		if (fullscreenMenu.classList.contains('active')) {
			overlayActive();
		}
	});
});
$('.shop__list').slick({
	speed: 700
});
const teamName = document.querySelectorAll('.team-card__name');
const teamArea = document.querySelector('.team__list');

teamArea.addEventListener('click', (e) => {
	for (btn of teamName) {
		if (e.target === btn || btn.parentNode.classList.contains('active')) {
			btn.parentNode.classList.toggle('active');
		}
	}
});
$('.reviews__switcher-link').on('click', function (e) {
	let currentSwitcher = $(e.currentTarget);
	let getId = +currentSwitcher.attr('id').slice(-1);
	let idReview = `review${getId}`;
	$('.reviews__item').removeClass('current');
	$('.reviews__switcher-item').removeClass('active');
	$(`#${idReview}`).addClass('current');
	currentSwitcher.closest('.reviews__switcher-item').addClass('active')
});
const form = document.querySelector('.form');
const send = document.querySelector('.form__btn-send');

form.addEventListener('submit', e => {

	e.preventDefault();
	
	if (validateForm(form)) {
		const data = {
			name: form.elements.name.value,
			phone: form.elements.phone.value,
			street: form.elements.street.value,
			houseNum: form.elements.houseNum.value,
			apartmant: form.elements.apartmant.value,
			comment: form.elements.comment.value,
			to: 'test@mail.ru'
		}
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.open('post', 'https://webdev-api.loftschool.com/sendmail');
		xhr.setRequestHeader('content-type', 'application/json');
		xhr.send(JSON.stringify(data));
		xhr.addEventListener('load', () => {
			if (xhr.response.status) {
				$('.modal_yes').css('display', 'flex');
				body.style.overflow = 'hidden'
			} else {
				$('.modal_no').css('display', 'flex');
				body.style.overflow = 'hidden'
			};
		})
	};

	function validateForm(form) {
		let valid = true;
		 
		if (!validateField(form.elements.name)) {
			valid = false;
		}
		 
		if (!validateField(form.elements.phone)) {
			valid = false;
		}
		 
		if (!validateField(form.elements.street)) {
			valid = false;
		}
		 
		if (!validateField(form.elements.houseNum)) {
			valid = false;
		}
		 
		if (!validateField(form.elements.apartmant)) {
			valid = false;
		}

		if (!validateField(form.elements.comment)) {
			valid = false;
		}
		 
		return valid;
	};

	function validateField(field) {
		if (!field.checkValidity()) {
			field.style.border = '3px solid red'
			return false;
		} else {
			field.style.border = 'none'
			return true;
		}
	}
});


$('.modal__btn').on('click', e => {
	e.preventDefault();
	$('.modal').css('display', 'none');
	body.style.overflow = 'auto'
});
/******/ })()
;