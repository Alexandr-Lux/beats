const sections = document.querySelectorAll('.section');
const content = document.querySelector('.main-content');
const dots = document.querySelectorAll('.fixed-menu__item');
const links = document.querySelectorAll('[data-scroll-position]');
let canScroll = true;
let autoContent = true;
let scrollPosition = 0;

links.forEach( elem => {
	elem.addEventListener('click', e => {
		e.preventDefault();
		scrollPosition = e.target.getAttribute('data-scroll-position');
		scrolling(scrollPosition);
	})
})

for ( let i = 0; i < dots.length; i++ ) {
	dots[i].addEventListener('click', e => {
		e.preventDefault();
		document.querySelector('.fixed-menu__item.active').classList.remove('active');
		e.currentTarget.classList.add('active');
		scrollPosition = i;
		scrolling(scrollPosition)
	})
}

function scrolling (numSection) {
	if (canScroll) {
		canScroll = false;

		const percentToScroll = numSection * -100;
		content.setAttribute('style', `transform: translateY(${percentToScroll}%)`)

		setTimeout(() =>{
			canScroll = true;
		}, 800);
	}

	document.querySelector('.fixed-menu__item.active').classList.remove('active');
	dots[numSection].classList.add('active');
}

window.addEventListener('wheel', e => {

	if (content.classList.contains('hidden')) {
		autoContent = false;
	} else {
		autoContent = true;
	}

	if ( e.deltaY > 0 && canScroll  && autoContent) {
		if ( scrollPosition < sections.length -1) {
			scrollPosition++;
		}
	} else {
		if ( scrollPosition > 0 && canScroll) {
			scrollPosition--;
		}
	}
	scrolling(scrollPosition);
});



let yStart = null;
let yEnd = null;
let up = false;
let down = false;

function handleTouchStart (e) {
	yStart = e.touches[0].clientY;
}


function handleTouchMove (e) {
	yEnd = e.changedTouches[0].clientY
	
	if ( yEnd < yStart && canScroll && (Math.abs(yEnd - yStart) > 70)  && autoContent) {
		if ( scrollPosition < sections.length -1) {
			scrollPosition++;
		}
	} else {
		if ( scrollPosition > 0 && canScroll && (Math.abs(yEnd - yStart) > 70)) {
			scrollPosition--;
		}
	}
	
	scrolling(scrollPosition)
}
window.addEventListener('touchmove', e => {

	if (content.classList.contains('hidden')) {
		autoContent = false;
	} else {
		autoContent = true;
	}

	window.addEventListener('touchstart', handleTouchStart);
	window.addEventListener('touchend', handleTouchMove);
})


