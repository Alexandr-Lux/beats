$('.reviews__switcher-link').on('click', function (e) {
	let currentSwitcher = $(e.currentTarget);
	let getId = +currentSwitcher.attr('id').slice(-1);
	let idReview = `review${getId}`;
	$('.reviews__item').removeClass('current');
	$('.reviews__switcher-item').removeClass('active');
	$(`#${idReview}`).addClass('current');
	currentSwitcher.closest('.reviews__switcher-item').addClass('active')
});