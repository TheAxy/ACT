/**
 * The script is encapsulated in an self-executing anonymous function,
 * to avoid conflicts with other libraries
 */
(function($) {


	/**
	 * Declare 'use strict' to the more restrictive code and a bit safer,
	 * sparing future problems
	 */
	"use strict";



	/***********************************************************************/
	/*****************************  $Content  ******************************/
	/**
	* + Content
	* + Collapse Icon
	* + Donations Steps
	* + Flickr Feed
	* + GMaps
	* + Owl Carousel - Gallery
	* + Select Amount
	* + Send Forms
	* + Slider Range
	* + Slider Revolution
	* + Tabs
	* + Tootips
	*/

	/***************************  $Collapse Icon  **************************/
	function changeIcon(e, icons){
		var $emt = $(e.target).parents('.panel'),
			$ico = $emt.find('h4 a i'),
			evt = e.type,
			isIn = ($emt.find('.panel-collapse').hasClass('in')),
			icoClosed = icons[0],	//icon when panel is close
			icoOpen   = icons[1],	//icon when panel is open
			icoHover  = icons[2];			//icon when panel is hover

		$ico.removeClass();
		
		if (evt == 'show'){ 				$ico.addClass(icoOpen);
		} else if (evt == 'hide'){ 			$ico.addClass(icoClosed);
		} else if (evt == 'mouseenter'){ 	$ico.addClass(icoHover);
		} else if (evt == 'mouseleave'){ 
			( isIn )? $ico.addClass(icoOpen) : $ico.addClass(icoClosed);
		}
	}

	function bindChangeIcon(collapse, heading, icons){
		collapse.on('hide.bs.collapse', function (e){ changeIcon(e, icons); });
		collapse.on('show.bs.collapse', function (e){ changeIcon(e, icons); });
		heading.on('mouseenter', function (e){ changeIcon(e, icons); });
		heading.on('mouseleave', function (e){ changeIcon(e, icons); });
	}

	var $collapse = $('#accordion-work'),
		$heading = $collapse.find('.panel-heading'),
		icons = ['icon-down-circled', 'icon-up-circled', 'icon-down-circled'];
	
	bindChangeIcon($collapse, $heading, icons);



	/**************************  $Donations Steps  *************************/
	$('.btn-tab-action').click(function(e){
		e.preventDefault()
		$('#donation-steps a[href="' + $(this).attr('href') + '"]').tab('show')
	})
	


	/***************************  $Flickr Feed  ****************************/
	if ($('.flickr-feed').length) {
		$('.flickr-feed').jflickrfeed({
			limit: 8,
			qstrings: {
				id: '94975828@N00'
			},
			itemTemplate: '												\
				<li>													\
					<a href="{{link}}" target="_blank">					\
						<img src="{{image_s}}" alt="//">				\
					</a>												\
				</li>'
		});
	}


	/*****************************  $GMaps  ********************************/
	if ($('#map').length) {
		var map = new GMaps({ 
			div: '#map', 
			lat: 53.339642, 
			lng: 83.672403,
			disableDefaultUI: false,
			scrollwheel: true,
		});
		
		map.addMarker({ 
			lat: 53.339642,
			lng: 83.672403
		});
	}
	if ($('#map2').length) {
		var map2 = new GMaps({ 
			div: '#map2', 
			lat: 53.339642, 
			lng: 83.672403,
			disableDefaultUI: false,
			scrollwheel: true,
		});
		
		map2.addMarker({ 
			lat: 53.339642,
			lng: 83.672403
		});
		map2.addMarker({ 
			lat: 53.339642,
			lng: 83.672403
		});
	}

	


	/**********************  $Owl Carousel - Gallery  **********************/
	$("#owl-partners").owlCarousel({
		items: 4,
		slideSpeed: 300,
		paginationSpeed: 400,
		navigation: true,
		navigationText: ['<i class="icon-left-open-big"></i>','<i class="icon-right-open-big"></i>'],
		pagination: false,
	});


	/**************************  $Send Forms  ******************************/
	$("#contact, #newsletter").submit(function() {
		var elem = $(this);
		var urlTarget = $(this).attr("action");
		$.ajax({
			type : "POST",
			url : urlTarget,
			dataType : "html",
			data : $(this).serialize(),
			beforeSend : function() {
				elem.prepend("<div class='alert alert-info'>" + "<a class='close' data-dismiss='alert'>×</a>" + "Loading" + "</div>");
				//elem.find(".loading").show();
			},
			success : function(response) {
				elem.prepend(response);
				elem.find(".response").html(response);
				elem.find(".alert-info").hide();
				//elem.find(".alert-danger").hide();
				elem.find("input[type='text'],input[type='email'],input[type='text'],textarea").val("");
			}
		});
		return false;
	});
	/***************************  $Slider Range  ***************************/
	if ($('#slider-price').length) { 
			initSliderRange(
				$('#slider-price .slider'),
				'$ ',
				'',
				1000,
				100000,
				1000,
				[25000,75000],
				'hide'
			) 
		}

	function initSliderRange(element, pre, app, min, max, step, val, tooltip) {
		element.slider({
				range: true,
				min: min,
				max: max,
				value : val,
				step: step,
				tooltip: tooltip,
			})
			.on('slide', function(ev){
				$(this).parent().parent().find('.input_range.min').val(ev.value[0])
				$(this).parent().parent().find('.span_range.min').html(pre + ev.value[0] + app)

				$(this).parent().parent().find('.input_range.max').val(ev.value[1])
				$(this).parent().parent().find('.span_range.max').html(pre + ev.value[1] + app)
			});
	}



	/***********************  $Slider Revolution  **************************/
	function startRevolution(){
		var $banner = $('#slider-revolution'),
			args = {};
		
		args = {
			startheight:750,
			startwidth:1500,
			
			fullWidth:"on",
			fullScreen:"off",

			shadow:0,

			onHoverStop: "on",

			hideThumbs:1,
			navigationType: "bullet",
			navigationHAlign: "center",
			navigationVAlign: "bottom"
		}

		if(jQuery().revolution) {
			$banner.revolution(args);
		}
	}

	$(document).ready(function() { startRevolution(); });



	/*******************************  $Tabs  *******************************/
	$('.nav-tabs a').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	})



	/*****************************  $Tootips  ******************************/
	function changeTooltipColorTo(color) {
		//solution from: http://stackoverflow.com/questions/12639708/modifying-twitter-bootstraps-tooltip-colors-based-on-position
		$('.tooltip-inner').css('background-color', color)
		$('.tooltip.top .tooltip-arrow').css('border-top-color', color);
		$('.tooltip.right .tooltip-arrow').css('border-right-color', color);
		$('.tooltip.left .tooltip-arrow').css('border-left-color', color);
		$('.tooltip.bottom .tooltip-arrow').css('border-bottom-color', color);
	}

	$('.donation-item .progress-bar').tooltip({placement: 'top'})
	$('.donation-item .progress-bar').hover(function() {changeTooltipColorTo('#d91d2b')});

	/**
	 *
	 *
	/*************************  $Timetable Tooltip  ************************/
	$('.timetable a').tooltip({placement: 'top'})
	

	/***************************  $Show Videos  ****************************/
	$('#video-bg').click(function(e){
		e.preventDefault();
		
		var $container = $(this).parent().parent();
		var $over = $container.find('.over');
		var overInitLeft = $over.css('left');
		var $stop = $container.find('.stop');
		var $video = $container.find('.yt-video iframe');
		var video_src = $video.attr('src');

		if ( video_src.indexOf('?') == '-1'){
			var separator = '?';
		}else{
			var separator = '&amp;';
		}

		$video.attr('src',video_src+separator+'autoplay=1')
		
		$over.animate({
			left: '-150%',
		}, 500);

		$stop.click(function(e){
			e.preventDefault();
			$video.attr('src',video_src);

			$over.animate({
				left: overInitLeft,
			}, 500);

			setTimeout(function(){
				$stop.animate({
					opacity: 0
				}, 1000, function(){
					$stop.hide();
				})
			}, 1000)
		})


		$stop.show(0, function(){
			setTimeout(function(){
				$stop.animate({
					opacity: 1
				}, 1000)
			}, 3000)
		})

	});


	/*****************************  $Parallax  *****************************/
	$('.parallax').each(function(){ 
		//http://mrbool.com/how-to-create-parallax-effect-with-css-and-jquery/27274#ixzz34LPRngy6
		var $obj = $(this);
		$(window).scroll(function() { 
			if($(document).width() > 500) {
				var yPos = ( $obj.offset().top - $(window).scrollTop() ) / $obj.data('speed');
				var bgpos = '50% '+ yPos + 'px';
				$obj.css('background-position', bgpos );
			} else{
				$obj.css('background-position', '50% 0px' );
			}
		});
	});


	/***************************  $Collapse Icon  **************************/
	function changeIcon(e, icons){
		var $emt = $(e.target).parents('.panel'),
			$ico = $emt.find('h4 a i'),
			evt = e.type,
			isIn = ($emt.find('.panel-collapse').hasClass('in')),
			icoClosed = icons[0],	//icon when panel is close
			icoOpen   = icons[1],	//icon when panel is open
			icoHover  = icons[2];			//icon when panel is hover

		$ico.removeClass();
		
		if (evt == 'show'){ 				$ico.addClass(icoOpen);
		} else if (evt == 'hide'){ 			$ico.addClass(icoClosed);
		} else if (evt == 'mouseenter'){ 	$ico.addClass(icoHover);
		} else if (evt == 'mouseleave'){ 
			( isIn )? $ico.addClass(icoOpen) : $ico.addClass(icoClosed);
		}
	}

	function bindChangeIcon(collapse, heading, icons){
		collapse.on('hide.bs.collapse', function (e){ changeIcon(e, icons); });
		collapse.on('show.bs.collapse', function (e){ changeIcon(e, icons); });
		heading.on('mouseenter', function (e){ changeIcon(e, icons); });
		heading.on('mouseleave', function (e){ changeIcon(e, icons); });
	}


	var $collapse = $('.panel-group'),
		$heading = $collapse.find('.panel-heading'),
		icons = ['icon-plus', 'icon-minus', 'icon-plus'];
	
	bindChangeIcon($collapse, $heading, icons);

/**
 *
 *
/********************************  $Charts  ********************************/
    if ($('.chart').length) {
	    $('.chart').easyPieChart({
	        barColor: "#ff6633",
	        lineWidth: 7,
	        size: 190,
	        scaleColor: false,
	        lineCap: 'square'
	    });
	}

/**
 *
 *
/********************************  $Isotope  *******************************/
	function startIsotope(args){
		// cache container
		var $container = $(args.container);
		
		// initialize isotope
		if(jQuery().isotope) {
 			$container.isotope({ 
 				layoutMode: args.layoutMode,
 				itemSelector: args.selector	
 			});

 			if(args.hasFilters) {
				$(args.filters).click(function(e){
					e.preventDefault();
					
					$(args.filters).removeClass('active');
					$(this).addClass('active');
								
					refreshIsotope();
				});
 			}
		}

		function refreshIsotope() {
			var $filters = $(args.filters+'.active'),
				selectors = '';

			$filters.each(function( index ) {
				if (selectors != ''){selectors += ', '}
				selectors += $( this ).attr('data-filter');
			});

			$container.isotope({ filter: selectors });
		}
	}

	if ($('.grid').length) {
		var args = {
			container: ".grid",
			selector: 'figure',
			hasFilters: true,
			filters: '.filters a',
			layoutMode: 'fitColumns'
		}
		
		if ($('.classes.two-columns').length) {
			args.selector = '.classes-item';
			args.layoutMode = 'fitRows';
		}

		if($(document).width() < 500) {
			args.layoutMode = 'masonry';
		}

		$(window).load(	function () {
			startIsotope(args);
		});
	}


/**
 *
 *
/**************************  $Custom Scroll Bars  **************************/
	if ($('.customScroll').length) {
		$(window).load(	function () {
			$(".customScroll").mCustomScrollbar();
		});
	}

/**************************  $Header menu  **************************/
	let bodyLockStatus = true;
	let bodyLockToggle = (delay = 500) => {
		if (document.documentElement.classList.contains('lock')) {
			bodyUnlock(delay);
		} else {
			bodyLock(delay);
		}
	}
	let bodyUnlock = (delay = 500) => {
		let body = document.querySelector("body");
		if (bodyLockStatus) {
			let lock_padding = document.querySelectorAll("[data-lp]");
			setTimeout(() => {
				for (let index = 0; index < lock_padding.length; index++) {
					const el = lock_padding[index];
					el.style.paddingRight = '0px';
				}
				body.style.paddingRight = '0px';
				document.documentElement.classList.remove("lock");
			}, delay);
			bodyLockStatus = false;
			setTimeout(function () {
				bodyLockStatus = true;
			}, delay);
		}
	}
	let bodyLock = (delay = 500) => {
		let body = document.querySelector("body");
		if (bodyLockStatus) {
			let lock_padding = document.querySelectorAll("[data-lp]");
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
			}
			document.documentElement.classList.add("lock");

			bodyLockStatus = false;
			setTimeout(function () {
				bodyLockStatus = true;
			}, delay);
		}
	}
	
	if (document.querySelector(".icon-menu")) {
		document.addEventListener("click", function (e) {
			if (bodyLockStatus && e.target.closest('.icon-menu')) {
				bodyLockToggle();
				document.documentElement.classList.toggle("menu-open");
				console.log(1)
			}
		});
	}
	



})(jQuery);