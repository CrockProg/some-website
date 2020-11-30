
// Close function
function closePopup () {
	$.magnificPopup.close()
};

// Smooth scroll
$(document).on('click', '.menu__link', function (event) {
	event.preventDefault()
	$('html, body').animate({
		scrollTop: $($.attr(this, 'href')).offset().top
	}, 500)
})

document.addEventListener('DOMContentLoaded', function () {
	// Owl carousel
	$('.carousel-reviews').owlCarousel({
		loop: true,
		margin: 25,
		nav: false,
		dots: true,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 1
			},
			769: {
				items: 2
			}
		}
	})

	// Mobile menu
	const menu = document.querySelector('.header__nav')
	const burger = document.querySelector('.header__burger')
	const overlay = document.querySelector('.overlay')

	const lockScroll = () => {
		document.body.classList.add('lock')
	}

	const unlockScroll = () => {
		document.body.classList.remove('lock')
	}

	const initialMenu = () => {
		document.querySelector('.header__nav').querySelector('.menu').classList.remove('menu-transform')
		scrollTop()
	}

	const scrollTop = () => {
		menu.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	burger.addEventListener('click', () => {
		menu.classList.add('header__nav-open')
		overlay.classList.add('overlay-open')
		lockScroll()
		initialMenu()
	})

	overlay.addEventListener('click', () => {
		menu.classList.remove('header__nav-open')
		overlay.classList.remove('overlay-open')
		unlockScroll()
	})

	// Services interactive image
	const $planLinks = document.querySelectorAll('.plan__dot')
	const $title = document.querySelector('.info__title')
	const $descr = document.querySelector('.info__descr')
	const $data = document.getElementById('service')

	const requestData = (id = 1) => {
		fetch('js/data.json')
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				$title.innerHTML = `${data[id - 1].title}`
				$descr.innerHTML = `${data[id - 1].info}`
				$data.value = `${data[id - 1].title}`
			})
	}

	requestData()

	$planLinks.forEach(el => {
		el.addEventListener('click', (e) => {
			e.preventDefault()
			const self = e.currentTarget
			const selfClass = self.getAttribute('href')
			const currentElement = document.querySelector(`.plan__dot[href='${selfClass}']`)
			const id = parseInt(currentElement.dataset.id)
			requestData(id)
		})
	})

	$('.plan__dot').on('click', function () {
		$('.plan__dot').removeClass('plan__dot-active')
		$(this).addClass('plan__dot-active')
	})

	const selector = document.getElementById('phone')
	const im = new Inputmask({ mask: '+7(999) 999-99-99', clearIncomplete: true })
	im.mask(selector)

	// Popup with contact
	$('.open-contact-link').magnificPopup({
		preloader: false,
		autoFocusLast: true,
		focus: '#name',
		showCloseBtn: false,

		callbacks: {
			beforeOpen: function () {
				if ($(window).width() < 700) {
					this.st.focus = false
				} else {
					this.st.focus = '#name'
				}
			}
		}
	})

	$('.open-contact-link').click(function () {
		if ($(window).width() < 700) {
			// pass
		} else {
			$('#name').focus()
		}
	})

	// Popup with calculator
	$('.open-preliminary-link').magnificPopup({
		preloader: false,
		showCloseBtn: false

	})

	// Calculator
	$('#calc-btn').click(function calculate () {
		$('#work_price').html('')
		$('#material_price').html('')
		$('#total_price').html('')
		const a = document.getElementById('object').value
		let b = document.getElementById('repairs').value
		let c = document.getElementById('area').value
		let d = document.getElementById('rooms').value
		if (a === 'newBuilding') {
			d = d * 1500
			if (b === 'overhaul') {
				b = 10000
			}
			if (b === 'redecorating') {
				b = 8000
			}
			if (b === 'exclusive') {
				b = 12000
			}
		} else if (a === 'resale') {
			d = d * 2000
			if (b === 'overhaul') {
				b = 12000
			}
			if (b === 'redecorating') {
				b = 10000
			}
			if (b === 'exclusive') {
				b = 15000
			}
		}
		c = c * b
		const total = (c + d)
		$('#work_price').append(c + ' тг.')
		$('#material_price').append(d + ' тг.')
		$('#total_price').append(total + ' тг.')
	})
})
