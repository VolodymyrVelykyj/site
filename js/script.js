'use strict'
// check Mobile
let isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};
// Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu) {
	let menuBody = document.querySelector(".menu__body");
	let body = document.querySelector("body");
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock')
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
};

// Drag and Drop

const cards = document.querySelectorAll('.js-card');
const cells = document.querySelectorAll('.js-cell');
const container = document.querySelector('.dragging__container');
const elementTitle = document.querySelector('.draging-drop__title');


let progresCell = document.querySelector('._progres')
let completedCell = document.querySelector('._completed')
let numberProgres = cards.length;
let numberComplete = 0;

function showResultProgres () {
	progresCell.innerHTML =`${numberProgres}`;
};

function showResultComplete () {
	completedCell.innerHTML =`${numberComplete}`;
};

showResultProgres ();
showResultComplete ()

if (isMobile.any()) {
	cards.forEach(card => {
		card.addEventListener('touchmove', touchMove);
		card.addEventListener('touchend', touchEnd);
	});

	let itemAppend;
	function touchMove(event) {
		event.preventDefault();
		let touch = event.targetTouches[0];
		this.style.transform = `translate(${touch.pageX - container.offsetLeft - (this.offsetWidth / 2) - this.offsetLeft}px, ${touch.pageY - container.offsetTop - (this.offsetHeight / 2) - this.offsetTop - elementTitle.offsetHeight}px)`;
		this.classList.add('hide');
		cells.forEach(cell => {
			if (
				this.getBoundingClientRect().top + this.offsetHeight / 2 < cell.getBoundingClientRect().bottom &&
				this.getBoundingClientRect().right - this.offsetWidth / 2 > cell.getBoundingClientRect().left &&
				this.getBoundingClientRect().bottom - this.offsetHeight / 2 > cell.getBoundingClientRect().top &&
				this.getBoundingClientRect().left + this.offsetWidth / 2 < cell.getBoundingClientRect().right
			) {
				cell.classList.add('hovered');
				itemAppend = cell;
			} else {
				cell.classList.remove('hovered');
			}
		});
	}

	function touchEnd(event) {
		if (!(itemAppend.classList.contains('stop'))) {
			itemAppend.append(this);
			this.style.transform = `translate(${itemAppend.clientLeft}px, ${itemAppend.clientTop}px)`;
			this.classList.remove('hide');

			numberProgres--;
			showResultProgres ();

			numberComplete++;
			showResultComplete ();

			itemAppend.classList.add('stop');
			this.removeEventListener('touchmove', touchMove);
			this.removeEventListener('touchend', touchEnd);
		} else {
			this.style.transform = `translate(${itemAppend.clientLeft}px, ${itemAppend.clientTop}px)`;
			this.classList.remove('hide');
			itemAppend.classList.remove('hovered');
		}
	}
} else {
	cards.forEach(card => {
		card.addEventListener('dragstart', dragStart);
		card.addEventListener('dragend', dragEnd);
	});

	cells.forEach(cell => {
		cell.addEventListener('dragenter', dragEnter);
		cell.addEventListener('dragleave', dragLeave);
		cell.addEventListener('dragover', dragOver);
		cell.addEventListener('drop', dragDrop);
	});


	let draggedItem = null;

	function dragStart (event) {
		this.classList.add('hide');
		draggedItem = this;
	}


	function dragEnd (event) {
		this.classList.remove('hide');
	}


	function dragEnter (event) {
		event.preventDefault();
		this.classList.add('hovered');
	}

	function dragLeave (event) {
		this.classList.remove('hovered');
	}

	function dragOver (event) {
		event.preventDefault();
	}

	function dragDrop (event) {
		this.append(draggedItem);
		draggedItem.removeAttribute('draggable');
		this.classList.add('stop');
		this.classList.remove('hovered');

		numberProgres--;
		showResultProgres ();

		numberComplete++;
		showResultComplete ();

		this.removeEventListener('dragover', dragOver);
		this.removeEventListener('drop', dragDrop);
	}
}


// Slider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('LightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }



let dragingSlider = new Swiper('.draging-slider', {
	// effect: 'fade',
	// autoplay: {
	// 	delay: 3000,
	// 	disableOnInteraction: false,
	// },
	// observer: true,
	// observeParents: true,
	slidesPerView: 1,
	spaceBetween: 16,
	// autoHeight: true,
	speed: 800,
	// touchRatio: 0,
	// simuLateTouch: false,
	loop: true,
	// Dotts
	// pagination: {
	// 	el: '.mainslider__dotts',
	// 	clickable: true,
	// },
	// Arrows
	navigation: {
		nextEl: '.draging-arrows__arrow_right',
		prevEl: '.draging-arrows__arrow_left',
	},
	// breacpoints: {
	// 	320: {
	// 		slidesPerView: 1,
	// 		spaceBetween: 0,
	// 		autoHeight: true,
	// 	},
	// 	768: {
	// 		slidesPerView: 2,
	// 		spaceBetween: 20,
	// 	},
	// 	992: {
	// 		slidesPerView: 3,
	// 		spaceBetween: 20,
	// 	},
	// 	1268: {
	// 		slidesPerView: 4,
	// 		spaceBetween: 30,
	// 	},
	// },
	// on: {
	// 	lazyImageReady: function() {
	// 		ibg();
	// 	},
	// }
	//And if me need scrollbar
	//scrollbar: {
	// 	el: '.swiper-scrollbar',
	// },
});

