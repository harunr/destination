(function ($) {

    $(function () {



        if ($(window).width() > 992) {
            $('.menu a').click(function (e) {
                e.preventDefault();
                $('.nav-wrap').fadeToggle();
                $('body').toggleClass('navshown');
            })
        }
        if ($(window).width() < 769) {
            
            $('.menu').click(function (e) {
                e.preventDefault();
                $('body').toggleClass('navshown');
            })
            
            $('.menu a').click(function (e) {
                e.preventDefault();
                $('.nav-wrap').fadeIn();
                $('body').addClass('navshown');
            })
            $('.menu-close').click(function (e) {
                e.preventDefault();
                $('.nav-wrap').fadeOut();
                $('body').removeClass('navshown');
            })
        }


        if ($(".about-section").length) {
            $("body").addClass('about-page');
        }

        if ($(".blog-summary").length) {
            $("body").addClass('blog-summary-main');
        }

        if ($(".blog-post").length) {
            $("body").addClass('blog-post-main');
        }

        if ($(".contact-section").length) {
            $("body").addClass('contact-page');
        }

        if ($(".specials-page ").length) {
            $("body").addClass('specials');
        }

        
        if($(".error").length){	
            $("body").addClass('error-page');	
        }	

        

        $(".hero-bottom-content-wrap .close-icon").click(function () {
            $('.hero-bottom-content-wrap').fadeOut();
        });

        $('.itinerary-accordion').click(function () {
            var $$_this = $(this);
            setTimeout(function () {
                $('html,body').animate({
                    scrollTop: $$_this.closest($$_this).offset().top
                }, 1000);
            }, 500);
        });

        // ANIMATION CHECK IF IN VIEW
        var $animation_elements = $('.anim-el');
        var $window = $(window);

        function check_if_in_view() {
            var window_height = $window.height();
            var insetAmount = window_height / 20 // fifth of the screen
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + window_height) - insetAmount;

            $.each($animation_elements, function () {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);

                //check to see if this current container is within viewport
                if (element_top_position <= window_bottom_position) {
                    $element.addClass('in-view');
                }
                /* else {
                                    if(!$element.hasClass('anim-once')) {
                                        $element.removeClass('in-view');
                                    }
                                }*/
            });
        }
        $window.on('scroll orientationchange resize', check_if_in_view);
        $window.trigger('scroll');


        const updateProperties = (elem, state) => {
            elem.style.setProperty('--x', `${state.x}px`)
            elem.style.setProperty('--y', `${state.y}px`)
            elem.style.setProperty('--width', `${state.width}px`)
            elem.style.setProperty('--height', `${state.height}px`)
            elem.style.setProperty('--radius', state.radius)
            elem.style.setProperty('--scale', state.scale)
        }


        if ($('.accommodation-item-wrap').length) {
            $('.accommodation-item-wrap').slick({
                arrows: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 4300,
                speed: 1000,
                navigation: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                centerMode: false,
                focusOnSelect: false,
                fade: true,
            });
            $(window).on('resize', function () {
                $('.accommodation-item-wrap').slick('resize');

            });
        }

        //Animate heading
        if ($('.split-heading').length) {
            var res = Splitting({
                target: '.split-heading',
                by: 'lines',
            });

            Splitting();

            res.forEach((splitResult) => {
                const wrappedLines = splitResult.lines.map((wordsArr) => `
            <span class="line"><span class="mask-up">
            ${wordsArr.map((word) => `${word.outerHTML}<span class="whitespace">
            </span>`).join('')}
            </span></span>`).join('');
                splitResult.el.innerHTML = wrappedLines;
            });
            inView.threshold(0.75);
            inView(".split-heading").on("enter", function (el) {
                if (!el.classList.contains("has-animated")) {
                    anime({
                        targets: el.querySelectorAll(".mask-up"),
                        translateY: ["100%", "0%"],
                        duration: 700,
                        delay: anime.stagger(200),
                        easing: "easeOutQuad",
                        autoplay: true
                    });
                    el.classList.add("has-animated");
                }
            });
        }

        //Animate paragraph
        if ($('.split-content').length) {
            var res = Splitting({
                target: '.split-content',
                by: 'lines',
            });

            Splitting();

            res.forEach((splitResult) => {
                const wrappedLines = splitResult.lines.map((wordsArr) => `
            <span class="line"><span class="mask-up">
            ${wordsArr.map((word) => `${word.outerHTML}<span class="whitespace">
            </span>`).join('')}
            </span></span>`).join('');
                splitResult.el.innerHTML = wrappedLines;
            });

            inView.threshold(0.75);
            inView(".split-content").on("enter", function (el) {
                if (!el.classList.contains("has-animated")) {
                    anime({
                        targets: el.querySelectorAll(".mask-up"),
                        translateY: ["100%", "0%"],
                        /* duration: 300,*/
                        delay: anime.stagger(20),
                        /*easing: "easeOutQuad",*/
                        autoplay: true
                    });
                    el.classList.add("has-animated");
                }
            });
        }

        if ($('.discover-left-thumb').length) {
            $(window).on("load scroll", function () {
                var parallaxElement = $(".discover-left-thumb.is-inview"),
                    parallaxQuantity = parallaxElement.length;
                window.requestAnimationFrame(function () {
                    for (var i = 0; i < parallaxQuantity; i++) {
                        var currentElement = parallaxElement.eq(i),
                            windowTop = $(window).scrollTop(),
                            elementTop = currentElement.offset().top,
                            elementHeight = currentElement.height(),
                            viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
                            scrolled = windowTop - elementTop + viewPortHeight;
                        currentElement.css({
                            transform: "translate3d(0," + scrolled * -0.11 + "px, 0)"
                        });
                    }
                });
            });
        }



        $(".cta-wrap a").bind('click', 'touchend', function (e) {
            e.preventDefault();
            $('.cta-content-wrap').slideToggle();
        });

        $(window).scroll(function () {
            var theta = $(window).scrollTop() / 300 % Math.PI;
            $('.discover-left-tittle img, .package-main-content img, .animated-sun img, .unique-content img').css({
                transform: 'rotate(' + theta + 'rad)'
            });
        });

        if ($('.special-package').length) {
            $('.special-package').slick({
                arrows: false,
                infinite: true,
                autoplay: false,
                navigation: false,
                dots: false,
                centerMode: false,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 9999999,
                        settings: "unslick"
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            autoplay: false,
                            speed: 1500,
                            swipe: true,
                        }
                    },
                ]
            });
            $(window).on('resize', function () {
                $('.special-package').slick('resize');
            });
        }

        // ANIMATION CHECK IF IN VIEW
        var $animation_elements = $('.anim-el');
        var $window = $(window);

        function check_if_in_view() {
            var window_height = $window.height();
            var insetAmount = window_height / 20 // fifth of the screen
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + window_height) - insetAmount;

            $.each($animation_elements, function () {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);

                //check to see if this current container is within viewport
                if (element_top_position <= window_bottom_position) {
                    $element.addClass('is-inview');
                }
            });
        }
        $window.on('scroll orientationchange resize', check_if_in_view);
        $window.trigger('scroll');

        // journey
        $(".itinerary-accordion").each(function () {
            var $this = $(this);
            $this.find(" > .itinerary-accordion-heading").on("click touch", function () {
                $(".itinerary-accordion").removeClass("accordion-active")
                $(".itinerary-accordion-content").slideUp();
                if ($this.find(".itinerary-accordion-content:visible").length) {
                    $(".itinerary-accordion-content").removeClass("accordion-active")
                    $(".itinerary-accordion-content").slideUp();
                } else {
                    $this.addClass("accordion-active")
                    $(".itinerary-accordion-content").slideUp();
                    $this.find(" > .itinerary-accordion-content").slideDown();
                }
            })
        })

        $('.add-accordion .itinerary-accordion').slice(0,3).addClass('shown');
        $('.add-accordion .itinerary-accordion').not('.shown').hide();

        if ($(window).width() > 768){
            $('.show-all-btn-wrap').on('click',function(){
                $('.add-accordion .itinerary-accordion').not('.shown').slideToggle(800);
                $(this).toggleClass('showLess');
            });
        }
        if ($(window).width() < 769){
            $('.itinerary-accordion-wrap-btn a').on('click',function(e){
                e.preventDefault();
                $('.add-accordion .itinerary-accordion').not('.shown').slideToggle(800);
                $(this).toggleClass('showLess');
            });
        }



        //itinerary-slider-item-wrap
        var $slider = $('.itinerary-slider-item-wrap');
        if ($slider.length) {
            var currentSlide;
            var slidesCount;
            var sliderCounter = document.createElement('div');
            sliderCounter.classList.add('slide-count-wrap');

            var updateSliderCounter = function (slick, currentIndex) {
                currentSlide = slick.slickCurrentSlide() + 1;
                slidesCount = slick.slideCount;
                $(sliderCounter).html('<span class="current">' + '0' + currentSlide + '</span>' + '<em>' + ' / ' + '</em>' + '<span class="total">' + '0' + slidesCount + '</span>')
            };

            $slider.on('init', function (event, slick) {
                $slider.append(sliderCounter);
                updateSliderCounter(slick);
            });

            $slider.on('afterChange', function (event, slick, currentSlide) {
                updateSliderCounter(slick, currentSlide);
            });

            $slider.slick({
                dots: false,
                arrows: true,
                autoplay: false,
                autoplaySpeed: 1500,
                infinite: true,
                navigation: false,
                slidesToShow: 1,
                slidesToScroll: 1,
            });
        }

        $(function () {
            if ($(".check-in").length) {
            $(".check-in").datepicker({
                dateFormat: "d MM yy",
                duration: "medium"
            });
            }
            if ($(".check-out").length) {
            $(".check-out").datepicker({
                dateFormat: "d MM yy",
                duration: "medium"
            });
            }
        });

        /* Cart */
        if ($("select.styled-select").length) {
            $("select.styled-select").selectric({

            });
        }

        var $_tripContainer = $('div.trip-content-inner');
        var $_tripNav = $('.trip-nav ul li');
        $('.trip-nav ul li').eq(0).addClass('active');
        $_tripContainer.hide();
        $_tripContainer.eq(0).show();
        if ($(window).width() > 767) {
            $('.trip-nav ul li').eq(0).addClass('active');
            $_tripContainer.hide();
            $_tripContainer.eq(0).show();
            $('.trip-nav ul li a').click(function (e) {
                e.preventDefault();
                $_tripNav.removeClass('active');
                $(this).parent().addClass('active');
                $_tripContainer.hide();
                var activeTab = $(this).attr('href');
                $(activeTab).fadeIn(700);
                return false;
            });
        }

        $_tripContainer.each(function(i){
            var $_this = $(this)
            $_this.find('div.trip-prev > a').click(function (e) {
                e.preventDefault();
                $_tripNav.removeClass('active');
                $_tripNav.eq(i-1).addClass('active');
                $_tripContainer.hide();
                var tabActive = $(this).attr('href');
                $(tabActive).fadeIn(700);
            })
            $_this.find('div.trip-next > a').click(function () {
                $_tripNav.removeClass('active');
                $_tripNav.eq(i+1).addClass('active');
                $_tripContainer.hide();
                var tabActive = $(this).attr('href');
                $(tabActive).fadeIn(700);
            })
        })
            
             
        
        $('.destination div.trip-next > a, .activities div.trip-next > a, .date-guest div.trip-next > a').click(function (e) {
            e.preventDefault();
        })
        
        $(".enquire .trip-checkbox").click(function(){
            $(".enquire .trip-checkbox input").prop("checked", true);
        });
        
        $(".destination .trip-checkbox input[type='checkbox']").click(function(){
            var checkBoxes = [];
            $.each($("input[name='tripCheckbox']:checked"), function(){     
                checkBoxes.push($(this).val());
            });

            $('.trip-content p dfn').html(checkBoxes.join(", "))
        });
        
        
        
        
      
        
        $('.get-in-touch-input-row, .popup-input-row, .input-col').each(function(){
            var $_this = (this)
            $('.get-in-touch-input-row, .popup-input-row, .input-col').find('input, textarea').on('keyup', function() {       
                var $$_this = $(this)
                
            if ($$_this.val() == '') {
                $$_this.parent('.get-in-touch-input-row, .popup-input-row, .input-col').removeClass('add_border');
            } else {
                $$_this.parent('.get-in-touch-input-row, .popup-input-row, .input-col').addClass('add_border');
            }
        });

        })
        
		
		
		
        // cart
        $('.header-btn>a').click(function () {
            $(".trip-wrap").fadeIn();
			
        });
        $('.trip-close').click(function () {
            $(".trip-wrap").fadeOut();
        });

		
		
		
		
		
		
		
        
    }) // End ready function.




})(jQuery)

function increaseCount(e, el) {
    var input = el.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
}

function decreaseCount(e, el) {
    var input = el.nextElementSibling;
    var value = parseInt(input.value, 10);
    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        input.value = value;
    }
}







