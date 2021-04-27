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