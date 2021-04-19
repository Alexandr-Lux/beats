const burgerBtn = document.querySelector('.burger');
const fullscreenMenu = document.querySelector('.overlay');
const closeBtn = document.querySelector('.overlay__close-btn');
const sliderBtn = document.querySelector('.shop-slider__btn');
const body = document.body;


burgerBtn.addEventListener("click", function() {
	fullscreenMenu.classList.add('active');
	body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', function() {
	fullscreenMenu.classList.remove('active');
	body.style.overflow = 'auto';
})


