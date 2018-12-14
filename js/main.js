 $(window).on('beforeunload', function () {
 	$(window).scrollTop(0);
 });

 //preload

 $(window).on('load', function () {
 	$preloader = $('.preload_container'),
 		$loader = $preloader.find('.preload');
 	$loader.fadeOut();
 	$preloader.delay(100).fadeOut('slow');
 })


 //lang

 $(document).ready(function () {
 	$(".language input[type='radio']").click(function () {
 		$(".language input[type='radio']").not(this).prop('checked', false);
 	});
 });


 //modal shadow
 $(document).ready(function () {
 	$('.section-1_start-video').click(function () {
 		var buttonId = $(this).attr('id');
 		$('#modal-container').removeAttr('class').addClass(buttonId);
 		$('body').addClass('modal-active');
 	})

 	$('.modal').click(function () {
 		$('#modal-container').addClass('out');
 		$('body').removeClass('modal-active');
 		$('iframe').attr('src', $('iframe').attr('src'));
 		$('.start-modal').fadeIn('normal');
 	});
 });

 // map
 var map_center;
 var map_rus;
 var map_ua;
 var map_blr;
 var map_cze;
 var map_lva;
 var map_ltu;
 var localMap;
 $(document).ready(function () {
 	ymaps.ready(init);

 	function init() {

 		//	Карты отделений

 		$(".location").hover(function () {
 				$(this).find('.location_map').show();
 				$(this).find('.location_map').removeClass('location_map-out');
 				$(this).find('.location_map').addClass('location_map-in');
 				place = $(this).find('.map').attr('id');
 				if (place == 'map-rus') {
 					var coordinates = [55.7995988293779, 37.54119678836058];
 					var coordinates_center = [55.7995988293779, 37.54119678836058];
 				}
 				if (place == 'map-ua') {
 					var coordinates = [50.47051707299949, 30.519620008598245];
 					var coordinates_center = [50.47051707299949, 30.519620008598245];
 				}
 				if (place == 'map-blr') {
 					var coordinates = [53.86510657069037, 27.524272499999977];
 					var coordinates_center = [53.86510657069037, 27.524272499999977];
 				}
 				if (place == 'map-ltu') {
 					var coordinates = [54.697626,
 						25.266975];
 					var coordinates_center = [54.697626,
 						25.266975];
 				}
 				if (place == 'map-lva') {
 					var coordinates = [56.95844098295402, 24.121345966270425];
 					var coordinates_center = [56.95844098295402, 24.121345966270425];
 				}

 				if (place == 'map-cze') {
 					var coordinates = [50.11046036410496, 14.515222169044497];
 					var coordinates_center = [50.11046036410496, 14.515222169044497];

 				}
 				var localMap = new ymaps.Map(place, {
 					center: coordinates_center,
 					zoom: 16,
 					controls: []
 				});
 				// Создаём макет содержимого.
 				var localIconContentLayout = ymaps.templateLayoutFactory.createClass(
 					'<div class="map-placemark">$[properties.iconContent]</div>'
 				);
 				var localPlacemark = new ymaps.Placemark(localMap.getCenter(), {
 					hintContent: 'Hotey Technology Company'

 				}, {
 					iconLayout: 'default#imageWithContent',
 					// Своё изображение иконки метки.
 					iconImageHref: 'image/Placemark.png',
 					// Размеры метки.
 					iconImageSize: [60, 64],
 					// Смещение левого верхнего угла иконки относительно
 					// её "ножки" (точки привязки).
 					iconImageOffset: [-30, -55],
 					// Смещение слоя с содержимым относительно слоя с картинкой.
 					iconContentOffset: [50, 0],
 					// Макет содержимого.
 					iconContentLayout: localIconContentLayout
 				});

 				localMap.geoObjects.add(localPlacemark);
 				localMap.behaviors.disable('scrollZoom');
 				localMap.controls.add(new ymaps.control.ZoomControl({
 					options: {
 						position: {
 							right: 10,
 							top: 100
 						}
 					}
 				}));

 				localMap.controls.add('rulerControl', {
 					// Отключим отображение масштабного отрезка рядом с линейкой.
 					// Подробнее о настройке опций.
 					scaleLine: false
 				});
 			},

 			function () {
 				$(this).find('.location_map').addClass('location_map-out');
 				$(this).find('.location_map').removeClass('location_map-in');
 				$(this).find('.location_map').hide(300);
 				$(this).find('ymaps').remove();

 			});
 	}
 });


 //mobile contact
 $(document).ready(function () {
 	$(".mobile-contact").on("click", "a", function (event) {
 		event.preventDefault();
 		var id = $(this).attr('href'),
 			top = $(id).offset().top;
 		$(".topmenu-container a").removeClass('active');
 		$(this).addClass('active');
 		$('body,html').animate({
 			scrollTop: top - 25
 		}, 1500);
 	});
 });



 //registration account

 jQuery(document).ready(function ($) {
 	var $form_modal = $('.cd-user-modal'),
 		$form_login = $form_modal.find('#cd-login'),
 		$form_signup = $form_modal.find('#cd-signup'),
 		$form_forgot_password = $form_modal.find('#cd-reset-password'),
 		$form_modal_tab = $('.cd-switcher'),
 		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
 		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
 		$forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
 		$back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
 		$main_nav = $('.main-nav');

 	//открыть модальное окно
 	$main_nav.on('click', function (event) {
 		$('body').css({
 			"overflow-y": 'hidden'
 		});
 		if ($(event.target).is($main_nav)) {
 			// открыть на мобильных подменю
 			$(this).children('ul').toggleClass('is-visible');
 		} else {
 			// закрыть подменю на мобильных
 			$main_nav.children('ul').removeClass('is-visible');
 			//показать модальный слой
 			$form_modal.addClass('is-visible');
 			//показать выбранную форму
 			($(event.target).is('.cd-signup')) ? signup_selected(): login_selected();
 		}

 	});

 	//закрыть модальное окно
 	$('.cd-user-modal').on('click', function (event) {
 		if ($(event.target).is($form_modal) || $(event.target).is('.cd-close-form')) {
 			$form_modal.removeClass('is-visible');
 			$('body').css({
 				"overflow-y": 'scroll'
 			});
 		}
 	});
 	//закрыть модальное окно нажатье клавиши Esc 
 	$(document).keyup(function (event) {
 		if (event.which == '27') {
 			$form_modal.removeClass('is-visible');
 			$('body').css({
 				"overflow-y": 'scroll'
 			});
 		}
 	});

 	//переключения  вкладки от одной к другой
 	$form_modal_tab.on('click', function (event) {
 		$('body').css({
 			"overflow-y": 'hidden'
 		});
 		event.preventDefault();
 		($(event.target).is($tab_login)) ? login_selected(): signup_selected();
 	});

 	//скрыть или показать пароль
 	$('.hide-password').on('click', function () {
 		var $this = $(this),
 			$password_field = $this.prev('input');

 		('password' == $password_field.attr('type')) ? $password_field.attr('type', 'text'): $password_field.attr('type', 'password');
 		('скрыть' == $this.text()) ? $this.text('показать'): $this.text('скрыть');
 		//фокус и перемещение курсора в конец поля ввода
 		$password_field.putCursorAtEnd();
 	});
 	//показать форму востановления пароля 
 	$forgot_password_link.on('click', function (event) {
 		$('body').css({
 			"overflow-y": 'hidden'
 		});
 		event.preventDefault();
 		forgot_password_selected();
 	});

 	//Вернуться на страницу входа с формы востановления пароля
 	$back_to_login_link.on('click', function (event) {
 		$('body').css({
 			"overflow-y": 'hidden'
 		});
 		event.preventDefault();
 		login_selected();
 	});

 	function login_selected() {
 		$form_login.addClass('is-selected');
 		$form_signup.removeClass('is-selected');
 		$form_forgot_password.removeClass('is-selected');
 		$tab_login.addClass('selected');
 		$tab_signup.removeClass('selected');
 	}

 	function signup_selected() {
 		$form_login.removeClass('is-selected');
 		$form_signup.addClass('is-selected');
 		$form_forgot_password.removeClass('is-selected');
 		$tab_login.removeClass('selected');
 		$tab_signup.addClass('selected');
 	}

 	function forgot_password_selected() {
 		$form_login.removeClass('is-selected');
 		$form_signup.removeClass('is-selected');
 		$form_forgot_password.addClass('is-selected');
 	}

 	//при желании можно отключить - это просто, сообщения об ошибках при заполнении
 	$form_login.find('input[type="submit"]').on('click', function (event) {
 		event.preventDefault();
 		$form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
 	});
 	$form_signup.find('input[type="submit"]').on('click', function (event) {
 		event.preventDefault();
 		$form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
 	});


 	//     //запасной placeholder для IE9
 	//     //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
 	//     if (!Modernizr.input.placeholder) {
 	//         $('[placeholder]').focus(function () {
 	//             var input = $(this);
 	//             if (input.val() == input.attr('placeholder')) {
 	//                 input.val('');
 	//             }
 	//         }).blur(function () {
 	//             var input = $(this);
 	//             if (input.val() == '' || input.val() == input.attr('placeholder')) {
 	//                 input.val(input.attr('placeholder'));
 	//             }
 	//         }).blur();
 	//         $('[placeholder]').parents('form').submit(function () {
 	//             $(this).find('[placeholder]').each(function () {
 	//                 var input = $(this);
 	//                 if (input.val() == input.attr('placeholder')) {
 	//                     input.val('');
 	//                 }
 	//             })
 	//         });
 	//     }

 });


 //credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
 jQuery.fn.putCursorAtEnd = function () {
 	return this.each(function () {
 		// If this function exists...
 		if (this.setSelectionRange) {
 			// ... then use it (Doesn't work in IE)
 			// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
 			var len = $(this).val().length * 2;
 			this.setSelectionRange(len, len);
 		} else {
 			// ... otherwise replace the contents with itself
 			// (Doesn't work in Google Chrome)
 			$(this).val($(this).val());
 		}
 	});
 };
