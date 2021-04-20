const burgerBtn = document.querySelector('.burger');
const fullscreenMenu = document.querySelector('.overlay');
const closeBtn = document.querySelector('.overlay__close-btn');
const sliderBtn = document.querySelector('.shop-slider__btn');
const menu = document.querySelector('.menu');
const body = document.body;
const menuDirect = document.querySelectorAll('.menu__link');

function overlayActive(){
	fullscreenMenu.classList.toggle('active');

	setTimeout(menu.classList.toggle('menu_vertical'), 400);
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




