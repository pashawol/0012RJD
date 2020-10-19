const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".nav-wrap"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				document.querySelector("html").classList.add("fixed")
			},
			afterClose: function () {
				document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					// document.body.classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			// document.body.classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			// document.addEventListener('mouseup', (event) => {
			// 	let container = event.target.closest(".menu-mobile--js.active"); // (1)
			// 	if (!container) {
			// 		this.closeMenu();
			// 	}
			// }, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// табы  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.${tab}__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.${tab}__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				} 
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /табы

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[ ][0-9]{3}[ ][0-9]{3}[ ][0-9]{2}[ ][0-9]{2}")
		});
		Inputmask("+7 999 999 99 99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").prepend('<p   class="browsehappy container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p>')

		}
	},
 
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.tabscostume('tabs-inner');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.ifie();  

	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	var x = window.location.host;
	let screenName;
	screenName = 'main.jpg';
	if (screenName && x === "localhost:3000") {
		$(".footer").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	// /добавляет подложку для pixel perfect


	function whenResize() {
		const topH = $(".top-nav").height();
		$(window).scroll(  function () {

			if ($(window).scrollTop() > topH) {
				$('.top-nav  ').addClass('fixed');
			} else {
				$('.top-nav  ').removeClass('fixed');
			}
		})

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		// navigation: {
		// 	nextEl: '.swiper-button-next',
		// 	prevEl: '.swiper-button-prev',
		// },
		// pagination: {
		// 	el: ' .swiper-pagination',
		// 	type: 'bullets',
		// 	clickable: true,
		// 	// renderBullet: function (index, className) {
		// 	// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// 	// }
		// },
	}
	const swiper6 = new Swiper('.sWelcome__slider--js', {
		// slidesPerView: 5,
		loop: true,
		// autoplay: {
		// 	delay: 9000,
		// },
		navigation: {
			nextEl: '.sWelcome .swiper-button-next',
			prevEl: '.sWelcome .swiper-button-prev',
		},
		pagination: {
			el: '.sWelcome .swiper-pagination',
			type: 'bullets',
			clickable: true,
		}, 
		lazy: {
			loadPrevNext: true,
		},
	});
	const swipersRew = new Swiper('.sRews__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1,
		spaceBetween: 20,
		loop: false,
		navigation: {
			nextEl: '.sRews .swiper-button-next',
			prevEl: '.sRews .swiper-button-prev',
		},
		pagination: {
			el: '.sRews .swiper-pagination',
			type: 'bullets',
			clickable: true, 
		},
		breakpoints: { 
			992: {
				spaceBetween: 39,
				slidesPerView: 2
			}, 
		}
	});
	
	const swipersSpeakers = new Swiper('.sSpeakers__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1,
		spaceBetween: 20,
		loop: false,
		navigation: {
			nextEl: '.sSpeakers .swiper-button-next',
			prevEl: '.sSpeakers .swiper-button-prev',
		},
		pagination: {
			el: '.sSpeakers .swiper-pagination',
			type: 'bullets',
			clickable: true, 
		},
		breakpoints: {
			 
			576: {
				spaceBetween: 39,
				slidesPerView: 2
			},
			992: {
				spaceBetween: 39,
				slidesPerView: 3
			},
			1200: { 
				spaceBetween: 39,
				slidesPerView: 4
			},
		}
	});

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	const swiper5 = new Swiper('.sStream__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		lazy: {
			loadPrevNext: true,
		},
		effect: 'coverflow',
		spaceBetween: 0,
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		coverflowEffect: {
			rotate: 0,
			// stretch: -60,
			depth: 450,
			modifier: 1,
			slideShadows: false,
		},

	});


	// modal window

	$(document).on('click', '.sSpeakersCard__btn, .sPartners__item', function(){
		$('#modal-content .modal-inner').html($(this).next().html());
	});



 
	function CountDown(el) {
		let block = document.querySelector(el);
		let date = block.dataset.date;
		if (block) {
			var countDownDate = new Date(date).getTime();
			let daysEl = block.querySelector('.days');
			let hoursEl = block.querySelector('.hours');
			let minutesEl = block.querySelector('.minutes');
			let secondsEl = block.querySelector('.seconds');
			// Update the count down every 1 second
			var x = setInterval(function () {
				
				// Get today's date and time
				var now = new Date().getTime();
				
				// Find the distance between now and the count down date
				var distance = countDownDate - now;
				
				// Time calculations for days, hours, minutes and seconds
				var days = Math.floor(distance / (1000 * 60 * 60 * 24));
				var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((distance % (1000 * 60)) / 1000);
				

				function getTime(el, time) { 
					el.innerHTML = time > 9 ? time : '0' + time;
				}
				getTime(daysEl, days);
				getTime(hoursEl, hours);
				getTime(minutesEl, minutes);
				getTime(secondsEl, seconds); 
				if (distance < 0) {
					clearInterval(x);
					// block.innerHTML = "EXPIRED";
				}
			}, 1000);
		}
	}
	let timer = document.querySelector('.timer-box-js');
	if (timer) {
		
		CountDown(timer);
	}
	};
	if (document.readyState !== 'loading') {
		eventHandler();
	} else {
		document.addEventListener('DOMContentLoaded', eventHandler);
	}
	