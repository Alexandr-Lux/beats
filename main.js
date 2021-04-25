const burgerBtn = document.querySelector('.burger');
const fullscreenMenu = document.querySelector('.overlay');
const closeBtn = document.querySelector('.overlay__close-btn');
const sliderBtn = document.querySelector('.shop-slider__btn');
const menu = document.querySelector('.menu');
const body = document.body;
const menuDirect = document.querySelectorAll('.menu__link');
const teamName = document.querySelectorAll('.team-card__name');
const teamArea = document.querySelector('.team__list');

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

teamArea.addEventListener('click', (e) => {
	for (btn of teamName) {
		if (e.target === btn || btn.parentNode.classList.contains('active')) {
			btn.parentNode.classList.toggle('active');
		}
	}
});


$('.shop__list').slick({
	speed: 700
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


send.addEventListener('click', e => {
	e.preventDefault();
	
	if (validateForm(form)) {
		const data = {
			name: form.elements.name.value,
			phone: form.elements.phone.value,
			street: form.elements.street.value,
			houseNum: form.elements.houseNum.value,
			apartmant: form.elements.apartmant.value
		}
		console.log(data);
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.open('post', 'https://webdev-api.loftschool.com/sendmail');
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




