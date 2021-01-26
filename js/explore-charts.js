(function () {
    'use strict';

    function ExploreCharts() {
    }

    ExploreCharts.prototype.init = function () {
        this.initTemplate();
        this.openLearnPopup();
        this.startSlider();
        this.startLakeSlider();
        this.startModalSlider();
        this.startShipewreckSlider();
        if ($(window).width() > 768) {
            this.blockView();
        }
    };

    ExploreCharts.prototype.initTemplate = function () {
        var _this = this;

        $('.explore-charts--modal-content .tooltip').on('keypress', function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                e.stopPropagation();

                var target = $(this).attr('data-modal');
                if ($(target).closest('div.jquery-modal.blocker.current').length) {
                    $(target).modal("hide");
                } else {
                    $(target).modal({
                        fadeDuration: 250,
                        fadeDelay: 1.5,
                        closeExisting: false,
                    });
                    $(target).on($.modal.OPEN, function (event, modal) {
                        _this.registerSlider(target);
                        $('.close-modal').attr('tabindex', 1);
                    });
                }
            }
        });

    };

    /* Avoid click on map-menu and main-content (.page--explore-charts) until learn box popup is closed*/
    ExploreCharts.prototype.blockView = function(){

        $('#explore-charts-content').block({
            message: null,
            overlayCSS: { cursor : 'default'}
        });

        $('#map-menu').block({
            message: null,
            overlayCSS: { cursor : 'default'}
        });

        $('#explore-charts-learn-open').css('z-index', '1022');
        $('#explore-charts-learn-popup').css('z-index', '1033');

        $('#explore-charts-learn-close').click(function() {
            $('#map-menu').unblock();
            $('#explore-charts-content').unblock();
        });

    }

    ExploreCharts.prototype.openLearnPopup = function () {
        var learnButton = $('button.learn');
        if (sessionStorage.getItem('learnButton') == null) {
            setTimeout(function () {
                $('.learn').trigger('click');
            }, 1500);
            sessionStorage.setItem('learnButton', 'true');
        }
    }

    ExploreCharts.prototype.startSlider = function () {
        var _this = this;
        if ($('.page--explore-charts-box').length) {
            $('.page--explore-charts-box').on('click', function (e) {
                e.preventDefault();
                // NEW: Cache launcher control
                var launcher = $(this);
                var target = $(this).attr('data-modal');
                $(target).modal({
                    fadeDuration: 250,
                    fadeDelay: 1.5,
                    closeExisting: false,
                });
                $(target).on($.modal.OPEN, function (event, modal) {
                    _this.registerSlider(target);
                    $('.close-modal .focus-within').attr('tabindex', 0);
                    $('span.sp-arrow').attr('tabindex', -1);
                    $('.sp-has-buttons .sp-arrow.sp-previous-arrow').text('Back');
                    $('.sp-has-buttons .sp-arrow.sp-next-arrow').text('Next');

                    // NEW: Set modal attributes and focus on open
                    $(target).attr('role', 'dialog').attr('aria-label', $(target).find('h3').text()).focus();

                    // NEW: Set all the divs not the modal container as inert
                    $('body > div:not(".jquery-modal")').attr('inert', true);
                });

                // NEW: Close function
                $(target).on($.modal.CLOSE, function (event, modal) {
                    // Remove inert
                    $('body > div').removeAttr('inert');

                    // Wait for inert to finish…
                    setTimeout(function () {

                        // Set focus back to the launcher control on close
                        launcher.focus();
                    }, 100);
                });
            });
        }

    };

    ExploreCharts.prototype.startModalSlider = function () {
        var _this = this;
        if ($('.explore-charts--modal-content .tooltip').length) {
            $('.explore-charts--modal-content .tooltip').on('click', function (e) {
                e.preventDefault();

                var target = $(this).attr('data-modal');
                $(target).modal({
                    fadeDuration: 250,
                    fadeDelay: 1.5,
                    closeExisting: false,
                });

                $(target).on($.modal.OPEN, function (event, modal) {
                    _this.registerSlider(target);
                    $('.close-modal').attr('tabindex', 0);
                });
            });
            $('div.wreck').removeAttr('data-modal');
            $('div.wreck').removeClass('tooltip', 'focus-within')
            $('div.wreck').attr('tabindex', -1);
        }
    };

    ExploreCharts.prototype.startLakeSlider = function () {
        var _this = this;
        if ($('.wreck-single').length) {
            $('.wreck-single').on('click', function (e) {
                e.preventDefault();
                var target = $(this).attr('data-modal');
                $(target).modal({
                    fadeDuration: 250,
                    closeExisting: false,
                });
                $(target).on($.modal.OPEN, function (event, modal) {
                    _this.registerSliderLandscape(target);
                    $('.close-modal').attr('tabindex', 0);
                });
            });
        }

    };


    ExploreCharts.prototype.startShipewreckSlider = function () {
        var _this = this;
        if ($('.wreck-single-sub').length) {
            $('.wreck-single-sub').on('click', function (e) {
                e.preventDefault();
                var target = $(this).attr('data-modal');
                $(target).modal({
                    fadeDuration: 250,
                    closeExisting: false,
                });
                $(target).on($.modal.OPEN, function (event, modal) {
                    _this.registerSliderShipewreckLandscape(target);
                    $('.close-modal').attr('tabindex', 0);
                    $('.sp-has-buttons .sp-arrow.sp-previous-arrow').text('Back');
                    $('.sp-has-buttons .sp-arrow.sp-next-arrow').text('Next');
                });
            });
        }
    };
	
	

    ExploreCharts.prototype.registerSlider = function (element) {
        $('.slider-pro').sliderPro({
            width: '55vw',
            height: '75vh',
            autoHeight: false,
            updateHash: true,
            arrows: true,
            fade: true,
            autoplay: false,
            touchSwipe: false,
            loop: true,
            shuffle: false,

        });


        $('.slider-pro', '.map-enlarged').sliderPro({
            arrows: true,

        });
        $('.slider-pro', '.map-enlarged').sliderPro(
            'gotoSlide', 0
        );

    };

    ExploreCharts.prototype.registerSliderLandscape = function (element) {
        $('.slider-pro').sliderPro({
            width: '40vw',
            height: '82vh',
            autoHeight: false,
            updateHash: true,
            arrows: false,
            buttons: false,
            fade: true,
            autoplay: false,
            touchSwipe: false,
            loop: true,


        });
    };


    ExploreCharts.prototype.registerSliderShipewreckLandscape = function (element) {
        $('.slider-pro').sliderPro({
            width: '100%',
            height: '70vh',
            autoHeight: false,
            updateHash: true,
            arrows: true,
            buttons: true,
            fade: true,
            autoplay: false,
            touchSwipe: false,
            loop: true,
        });
    };

    $(document).ready(function () {
        var exploreCharts = new ExploreCharts();
        exploreCharts.init();
    });
    $(document).ready(function () {
        $('.image-error').delay(8000).fadeIn(400);
    });


    /* Handle slides when sub-menu list is clicked **/
    $(document).ready(function () {


        if (screen.width >= 1000 && screen.width <= 1640) {
            var scale = 'scale(.8)';
            document.body.style.zoom = scale;
        }

        /*start Great Lakes*/
        $('#great-lakes-menu').hover(function() {
            $('.page--explore-charts .left-box').addClass("left-box-hover");
        },function() {
            $('.page--explore-charts .left-box').removeClass("left-box-hover");
        });

        $('#great-lakes-menu').focus(function() {
            $('.page--explore-charts .left-box').addClass("left-box-hover");
        });
        $('#great-lakes-menu').focusout(function() {
                $('.page--explore-charts .left-box').removeClass("left-box-hover");
        });

        $('.page--explore-charts .left-box').hover(function() {
            $('#great-lakes-menu').addClass("menu-yellow-border");
        },function() {
            $('#great-lakes-menu').removeClass("menu-yellow-border");
        });

        $('.page--explore-charts .left-box').focus(function() {
            $('.page--explore-charts .left-box').addClass("left-box-hover");
            $('#great-lakes-menu').addClass("menu-yellow-border");
        });
        $('.page--explore-charts .left-box').focusout(function() {
            $('.page--explore-charts .left-box').removeClass("left-box-hover");
            $('#great-lakes-menu').removeClass("menu-yellow-border");
        });

        /*end Great Lakes*/

        /*start Kingston*/
        $('#kingston-menu').hover(function() {
            $('.page--explore-charts .right-box').addClass("right-box-hover");
        },function() {
            $('.page--explore-charts .right-box').removeClass("right-box-hover");
        });

        $('#kingston-menu').focus(function() {
            $('.page--explore-charts .right-box').addClass("right-box-hover");
        });
        $('#kingston-menu').focusout(function() {
            $('.page--explore-charts .right-box').removeClass("right-box-hover");
        });

        $('.page--explore-charts .right-box').hover(function() {
            $('#kingston-menu').addClass("menu-yellow-border");
        },function() {
            $('#kingston-menu').removeClass("menu-yellow-border");
        });

        $('.page--explore-charts .right-box').focus(function() {
            $('.page--explore-charts .right-box').addClass("right-box-hover");
            $('#kingston-menu').addClass("menu-yellow-border");
        });
        $('.page--explore-charts .right-box').focusout(function() {
            $('.page--explore-charts .right-box').removeClass("right-box-hover");
            $('#kingston-menu').removeClass("menu-yellow-border");
        });
        /*end Kingston*/


        /* Lake Superior */
        /* On the boats - menu click - opens the modals */
        $('.madeira').click(function () {
            $('.lake-superior-madeira').trigger('click');
            $('#lake-superior-madeira-slider').sliderPro('gotoSlide', 0);
        })

        $('.madeira').hover(function() {
            $('a#lake-superior-menu').focus()
            $('#madeira-menu').css('text-decoration','underline')
        }, function () {
            $('#madeira-menu').css('text-decoration','none')
            $('a#lake-superior-menu').blur()
        });

        $('.hesper').click(function () {
            $('.lake-superior-hesper').trigger('click');
            $('#lake-superior-hesper-slider').sliderPro('gotoSlide', 0);
        })

        $('.hesper').hover(function() {
            $('a#lake-superior-menu').focus()
            $('#hesper-menu').css('text-decoration','underline')
        }, function () {
            $('#hesper-menu').css('text-decoration','none')
            $('a#lake-superior-menu').blur()
        });

        $('.kamloops').click(function () {
            $('.lake-superior-kamloops').trigger('click');
            $('#lake-superior-kamloops-slider').sliderPro('gotoSlide', 0);
        })

        $('.kamloops').hover(function() {
            $('a#lake-superior-menu').focus()
            $('#kamloops-menu').css('text-decoration','underline')
        }, function () {
            $('#kamloops-menu').css('text-decoration','none')
            $('a#lake-superior-menu').blur()
        });

        $('.monarch').click(function () {
            $('.lake-superior-monarch').trigger('click');
            $('#lake-superior-monarch-slider').sliderPro('gotoSlide', 0);
        })

        $('.monarch').hover(function() {
            $('a#lake-superior-menu').focus()
            $('#monarch-menu').css('text-decoration','underline')
        }, function () {
            $('#monarch-menu').css('text-decoration','none')
            $('a#lake-superior-menu').blur()
        });
        /* On menu hover - change the boat color on yellow */
        $('#madeira-menu').hover(function () {
            $('.madeira').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.madeira').removeClass("boat-transform-on-menu-hover")
        });

        $('#hesper-menu').hover(function () {
            $('.hesper').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.hesper').removeClass("boat-transform-on-menu-hover")
        });

        $('#kamloops-menu').hover(function () {
            $('.kamloops').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.kamloops').removeClass("boat-transform-on-menu-hover")
        });

        $('#monarch-menu').hover(function () {
            $('.monarch').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.monarch').removeClass("boat-transform-on-menu-hover")
        });


        /* On menu focus - change the boat color in yellow*/
        $('#madeira-menu').focus(function() {
            $('.madeira').addClass("boat-transform-on-menu-hover");
        });
        $('#madeira-menu').focusout(function() {
            $('.madeira').removeClass("boat-transform-on-menu-hover");
        });

        $('#hesper-menu').focus(function() {
            $('.hesper').addClass("boat-transform-on-menu-hover");
        });
        $('#hesper-menu').focusout(function() {
            $('.hesper').removeClass("boat-transform-on-menu-hover");
        });

        $('#kamloops-menu').focus(function() {
            $('.kamloops').addClass("boat-transform-on-menu-hover");
        });
        $('#kamloops-menu').focusout(function() {
            $('.kamloops').removeClass("boat-transform-on-menu-hover");
        });

        $('#monarch-menu').focus(function() {
            $('.monarch').addClass("boat-transform-on-menu-hover");
        });
        $('#monarch-menu').focusout(function() {
            $('.monarch').removeClass("boat-transform-on-menu-hover");
        });


        /* End Lake Superior */


        /* Lake Michigan */
        /* On the boats - menu click */
        $('.alvinclark').click(function () {
            $('.lake-michigan-alvinclark').trigger('click');
            $('#lake-michigan-alvinclark-slider').sliderPro('gotoSlide', 0);
        })

        $('.alvinclark').hover(function() {
            $('a#lake-michigan-menu').focus();
            $('#alvinclark-menu').css('text-decoration','underline');
        }, function () {
            $('#alvinclark-menu').css('text-decoration','none');
            $('a#lake-michigan-menu').blur();
        });

        $('.frankoconnor').click(function () {
            $('.lake-michigan-frankoconnor').trigger('click');
            $('#lake-michigan-frankoconnor-slider').sliderPro('gotoSlide', 0);
        })

        $('.frankoconnor').hover(function() {
            $('a#lake-michigan-menu').focus()
            $('#frankoconnor-menu').css('text-decoration','underline')
        }, function () {
            $('#frankoconnor-menu').css('text-decoration','none')
            $('a#lake-michigan-menu').blur()
        });

        $('.carldbradley').click(function () {
            $('.lake-michigan-carldbradley').trigger('click');
            $('#lake-michigan-carldbradley-slider').sliderPro('gotoSlide', 0);
        })

        $('.carldbradley').hover(function() {
            $('a#lake-michigan-menu').focus()
            $('#carldbradley-menu').css('text-decoration','underline')
        }, function () {
            $('#carldbradley-menu').css('text-decoration','none')
            $('a#lake-michigan-menu').blur()
        });

        /* On menu hover */
        $('#alvinclark-menu').hover(function () {
            $('.alvinclark').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.alvinclark').removeClass("boat-transform-on-menu-hover")
        });

        $('#frankoconnor-menu').hover(function () {
            $('.frankoconnor').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.frankoconnor').removeClass("boat-transform-on-menu-hover")
        });

        $('#carldbradley-menu').hover(function () {
            $('.carldbradley').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.carldbradley').removeClass("boat-transform-on-menu-hover")
        });

        /* On menu focus - change the boat color in yellow*/
        $('#alvinclark-menu').focus(function() {
            $('.alvinclark').addClass("boat-transform-on-menu-hover");
        });
        $('#alvinclark-menu').focusout(function() {
            $('.alvinclark').removeClass("boat-transform-on-menu-hover");
        });

        $('#frankoconnor-menu').focus(function() {
            $('.frankoconnor').addClass("boat-transform-on-menu-hover");
        });
        $('#frankoconnor-menu').focusout(function() {
            $('.frankoconnor').removeClass("boat-transform-on-menu-hover");
        });

        $('#carldbradley-menu').focus(function() {
            $('.carldbradley').addClass("boat-transform-on-menu-hover");
        });
        $('#carldbradley-menu').focusout(function() {
            $('.carldbradley').removeClass("boat-transform-on-menu-hover");
        });

        /* End Lake Michigan */

        /* Lake Huron */
        /* On the boats - menu click */
        $('.danieljmorrell').click(function () {
            $('.lake-huron-danieljmorrell').trigger('click');
            $('#lake-huron-danieljmorrellslider-slider').sliderPro('gotoSlide', 0);
        })

        $('.danieljmorrell').hover(function() {
            $('a#lake-huron-menu').focus()
            $('#danieljmorrell-menu').css('text-decoration','underline')
        }, function () {
            $('#danieljmorrell-menu').css('text-decoration','none')
            $('a#lake-huron-menu').blur()
        });

        $('.charlesprice').click(function () {
            $('.lake-huron-charlesprice').trigger('click');
            $('#lake-huron-charlesprice-slider').sliderPro('gotoSlide', 0);
        })
        $('.charlesprice').hover(function() {
            $('a#lake-huron-menu').focus()
            $('#charlesprice-menu').css('text-decoration','underline')
        }, function () {
            $('#charlesprice-menu').css('text-decoration','none')
            $('a#lake-huron-menu').blur()
        });

        $('.waubuno').click(function () {
            $('.lake-huron-waubuno').trigger('click');
            $('#lake-huron-waubuno-slider').sliderPro('gotoSlide', 0);
        })

        $('.waubuno').hover(function() {
            $('a#lake-huron-menu').focus()
            $('#waubuno-menu').css('text-decoration','underline')
        }, function () {
            $('#waubuno-menu').css('text-decoration','none')
            $('a#lake-huron-menu').blur()
        });
		
        /* On menu hover */
        $('#danieljmorrell-menu').hover(function () {
            $('.danieljmorrell').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.danieljmorrell').removeClass("boat-transform-on-menu-hover")
        });

        $('#charlesprice-menu').hover(function () {
            $('.charlesprice').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.charlesprice').removeClass("boat-transform-on-menu-hover")
        });

        $('#waubuno-menu').hover(function () {
            $('.waubuno').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.waubuno').removeClass("boat-transform-on-menu-hover")
        });


        /* On menu focus - change the boat color in yellow*/
        $('#danieljmorrell-menu').focus(function() {
            $('.danieljmorrell').addClass("boat-transform-on-menu-hover");
        });
        $('#danieljmorrell-menu').focusout(function() {
            $('.danieljmorrell').removeClass("boat-transform-on-menu-hover");
        });

        $('#charlesprice-menu').focus(function() {
            $('.charlesprice').addClass("boat-transform-on-menu-hover");
        });
        $('#charlesprice-menu').focusout(function() {
            $('.charlesprice').removeClass("boat-transform-on-menu-hover");
        });

        $('#waubuno-menu').focus(function() {
            $('.waubuno').addClass("boat-transform-on-menu-hover");
        });
        $('#waubuno-menu').focusout(function() {
            $('.waubuno').removeClass("boat-transform-on-menu-hover");
        });
        /* End Lake Huron */


        /* Lake Erie */
        /* On the boats - menu click */
        $('.argo').click(function () {
            $('.lake-erie-argo').trigger('click');
            $('#lake-erie-argo-slider').sliderPro('gotoSlide', 0);
        })

        $('.argo').hover(function() {
            $('a#lake-erie-menu').focus()
            $('#argo-menu').css('text-decoration','underline')
        }, function () {
            $('#argo-menu').css('text-decoration','none')
            $('a#lake-erie-menu').blur()
        });

        $('.admiral').click(function () {
            $('.lake-erie-admiral').trigger('click');
            $('#lake-erie-admiral-slider').sliderPro('gotoSlide', 0);
        })

        $('.admiral').hover(function() {
            $('a#lake-erie-menu').focus()
            $('#admiral-menu').css('text-decoration','underline')
        }, function () {
            $('#admiral-menu').css('text-decoration','none')
            $('a#lake-erie-menu').blur()
        });

        $('.colgate').click(function () {
            $('.lake-erie-colgate').trigger('click');
            $('#lake-erie-colgate-slider').sliderPro('gotoSlide', 0);
        })

        $('.colgate').hover(function() {
            $('a#lake-erie-menu').focus()
            $('#colgate-menu').css('text-decoration','underline')
        }, function () {
            $('#colgate-menu').css('text-decoration','none')
            $('a#lake-erie-menu').blur()
        });

        $('.gpgriffith').click(function () {
            $('.lake-erie-gpgriffith').trigger('click');
            $('#lake-erie-slider').sliderPro('gotoSlide', 0);
        })

        $('.gpgriffith').hover(function() {
            $('a#lake-erie-menu').focus()
			$('#gpgriffith-menu').css('text-decoration','underline')
        }, function () {
            $('#gpgriffith-menu').css('text-decoration','none')
            $('a#lake-erie-menu').blur()
        });

        /* On menu hover */
        $('#argo-menu').hover(function () {
            $('.argo').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.argo').removeClass("boat-transform-on-menu-hover")
        });

        $('#admiral-menu').hover(function () {
            $('.admiral').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.admiral').removeClass("boat-transform-on-menu-hover")
        });

        $('#colgate-menu').hover(function () {
            $('.colgate').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.colgate').removeClass("boat-transform-on-menu-hover")
        });

        $('#gpgriffith-menu').hover(function () {
            $('.gpgriffith').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.gpgriffith').removeClass("boat-transform-on-menu-hover")
        });

        /* On menu focus - change the boat color in yellow*/
        $('#argo-menu').focus(function() {
            $('.argo').addClass("boat-transform-on-menu-hover");
        });
        $('#argo-menu').focusout(function() {
            $('.argo').removeClass("boat-transform-on-menu-hover");
        });

        $('#admiral-menu').focus(function() {
            $('.admiral').addClass("boat-transform-on-menu-hover");
        });
        $('#admiral-menu').focusout(function() {
            $('.admiral').removeClass("boat-transform-on-menu-hover");
        });

        $('#colgate-menu').focus(function() {
            $('.colgate').addClass("boat-transform-on-menu-hover");
        });
        $('#colgate-menu').focusout(function() {
            $('.colgate').removeClass("boat-transform-on-menu-hover");
        });

        $('#gpgriffith-menu').focus(function() {
            $('.gpgriffith').addClass("boat-transform-on-menu-hover");
        });
        $('#gpgriffith-menu').focusout(function() {
            $('.gpgriffith').removeClass("boat-transform-on-menu-hover");
        });
        /* End Lake Erie */

        /* Lake Ontario */
        /* On the boats - menu click */
        $('.hmsontario').click(function () {
            $('.lake-ontario-hmsontario').trigger('click');
            $('#lake-ontario-hmsontario-slider').sliderPro('gotoSlide', 0);
        });

        $('.hmsontario').hover(function() {
            $('a#lake-ontario-menu').focus()
            $('#hmsontario-menu').css('text-decoration','underline')
        }, function () {
            $('#hmsontario-menu').css('text-decoration','none')
            $('a#lake-ontario-menu').blur()
        });

        $('.milan').click(function () {
            $('.lake-ontario-milan').trigger('click');
            $('#lake-ontario-milan-slider').sliderPro('gotoSlide', 0);
        });
        $('.milan').hover(function() {
            $('a#lake-ontario-menu').focus()
            $('#milan-menu').css('text-decoration','underline')
        }, function () {
            $('#milan-menu').css('text-decoration','none')
            $('a#lake-ontario-menu').blur()
        });

        $('.brothers').click(function () {
            $('.lake-ontario-brothers').trigger('click');
            $('#lake-ontario-brothers-slider').sliderPro('gotoSlide', 0);
        });

        $('.brothers').hover(function() {
            $('a#lake-ontario-menu').focus()
            $('#brothers-menu').css('text-decoration','underline')
        }, function () {
            $('#brothers-menu').css('text-decoration','none')
            $('a#lake-ontario-menu').blur()
        });

        $('.roberval').click(function () {
            $('.lake-ontario-roberval').trigger('click');
            $('#lake-ontario-roberval-slider').sliderPro('gotoSlide', 0);
        });
        $('.roberval').hover(function() {
            $('a#lake-ontario-menu').focus()
            $('#roberval-menu').css('text-decoration','underline')
        }, function () {
            $('#roberval-menu').css('text-decoration','none')
            $('a#lake-ontario-menu').blur()
        });

        /* On menu hover */
        $('#hmsontario-menu').hover(function () {
            $('.hmsontario').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.hmsontario').removeClass("boat-transform-on-menu-hover")
        });

        $('#milan-menu').hover(function () {
            $('.milan').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.milan').removeClass("boat-transform-on-menu-hover")
        });

        $('#brothers-menu').hover(function () {
            $('.brothers').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.brothers').removeClass("boat-transform-on-menu-hover")
        });

        $('#roberval-menu').hover(function () {
            $('.roberval').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.roberval').removeClass("boat-transform-on-menu-hover")
        });

        /* On menu focus - change the boat color in yellow*/
        $('#hmsontario-menu').focus(function() {
            $('.hmsontario').addClass("boat-transform-on-menu-hover");
        });
        $('#hmsontario-menu').focusout(function() {
            $('.hmsontario').removeClass("boat-transform-on-menu-hover");
        });

        $('#milan-menu').focus(function() {
            $('.milan').addClass("boat-transform-on-menu-hover");
        });
        $('#milan-menu').focusout(function() {
            $('.milan').removeClass("boat-transform-on-menu-hover");
        });

        $('#brothers-menu').focus(function() {
            $('.brothers').addClass("boat-transform-on-menu-hover");
        });
        $('#brothers-menu').focusout(function() {
            $('.brothers').removeClass("boat-transform-on-menu-hover");
        });

        $('#roberval-menu').focus(function() {
            $('.roberval').addClass("boat-transform-on-menu-hover");
        });
        $('#roberval-menu').focusout(function() {
            $('.roberval').removeClass("boat-transform-on-menu-hover");
        });
        /* End Lake Ontario */

        /* Kingston Wrecks */

        $('.kph').click(function () {
            $('.kingston-north-kph').trigger('click');
            $('#kingston-north-kph-slider').sliderPro('gotoSlide', 0);
        })

        $('.kph').hover(function () {
            $('.kingston-north-kph').focus()
        }, function () {
            $('.kingston-north-kph').blur()
        })

        $('.kingston-north-kph').hover(function () {
            $('.kph').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.kph').removeClass("boat-transform-on-menu-hover")
        });

        $('.lawrence').click(function () {
            $('.kingston-north-lawrence').trigger('click');
            $('#kingston-north-lawrence-slider').sliderPro('gotoSlide', 0);
        })

        $('.lawrence').hover(function () {
            $('.kingston-north-lawrence').focus()
        }, function () {
            $('.kingston-north-lawrence').blur()
        })

        $('.kingston-north-lawrence').hover(function () {
            $('.lawrence').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.lawrence').removeClass("boat-transform-on-menu-hover")
        });


        $('.prince').click(function () {
            $('.kingston-north-prince').trigger('click');
            $('#kingston-north-prince-slider').sliderPro('gotoSlide', 0);
        })

        $('.prince').hover(function () {
            $('.kingston-north-prince').focus()
        }, function () {
            $('.kingston-north-prince').blur()
        })

        $('.kingston-north-prince').hover(function () {
            $('.prince').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.prince').removeClass("boat-transform-on-menu-hover")
        });

        $('.wolfe').click(function () {
            $('.kingston-north-wolfe').trigger('click');
            $('#kingston-north-wolfe-slider').sliderPro('gotoSlide', 0);
        })

        $('.wolfe').hover(function () {
            $('.kingston-north-wolfe').focus()
        }, function () {
            $('.kingston-north-wolfe').blur()
        })

        $('.kingston-north-wolfe').hover(function () {
            $('.wolfe').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.wolfe').removeClass("boat-transform-on-menu-hover")
        });


        $('.taber').click(function () {
            $('.kingston-west-taber').trigger('click');
            $('#kingston-north-taber-slider').sliderPro('gotoSlide', 0);
        })
        $('.taber').hover(function () {
            $('.kingston-west-taber').focus()
        }, function () {
            $('.kingston-west-taber').blur()
        })

        $('.kingston-west-taber').hover(function () {
            $('.taber').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.taber').removeClass("boat-transform-on-menu-hover")
        });

        $('.effie').click(function () {
            $('.kingston-west-effie').trigger('click');
            $('#kingston-north-effie-slider').sliderPro('gotoSlide', 0);
        })
        $('.effie').hover(function () {
            $('.kingston-west-effie').focus()
        }, function () {
            $('.kingston-west-effie').blur()
        })
        $('.kingston-west-effie').hover(function () {
            $('.effie').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.effie').removeClass("boat-transform-on-menu-hover")
        });

        $('.aloha').click(function () {
            $('.kingston-west-aloha').trigger('click');
            $('#kingston-north-aloha-slider').sliderPro('gotoSlide', 0);
        })

        $('.aloha').hover(function () {
            $('.kingston-west-aloha').focus()
        }, function () {
            $('.kingston-west-aloha').blur()
        })
        $('.kingston-west-aloha').hover(function () {
            $('.aloha').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.aloha').removeClass("boat-transform-on-menu-hover")
        });

        $('.comet').click(function () {
            $('.kingston-west-comet').trigger('click');
            $('#kingston-north-comet-slider').sliderPro('gotoSlide', 0);
        })

        $('.comet').hover(function () {
            $('.kingston-west-comet').focus()
        }, function () {
            $('.kingston-west-comet').blur()
        })

        $('.kingston-west-comet').hover(function () {
            $('.comet').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.comet').removeClass("boat-transform-on-menu-hover")
        });

        $('.george').click(function () {
            $('.kingston-west-george').trigger('click');
            $('#kingston-north-george-slider').sliderPro('gotoSlide', 0);
        })

        $('.george').hover(function () {
            $('.kingston-west-george').focus()
        }, function () {
            $('.kingston-west-george').blur()
        })

        $('.kingston-west-george').hover(function () {
            $('.george').addClass("boat-transform-on-menu-hover")
        }, function () {
            $('.george').removeClass("boat-transform-on-menu-hover")
        });


        /* On menu focus - change the boat color in yellow*/
        $('.kingston-north-kph').focus(function() {
            $('.kph').addClass("boat-transform-on-menu-hover");
        });
        $('.kingston-north-kph').focusout(function() {
            $('.kph').removeClass("boat-transform-on-menu-hover");
        });

        $('.kingston-north-lawrence').focus(function() {
            $('.lawrence').addClass("boat-transform-on-menu-hover");
        });
        $('.kingston-north-lawrence').focusout(function() {
            $('.lawrence').removeClass("boat-transform-on-menu-hover");
        });

        $('.kingston-north-prince').focus(function() {
            $('.prince').addClass("boat-transform-on-menu-hover");
        });
        $('.kingston-north-prince').focusout(function() {
            $('.prince').removeClass("boat-transform-on-menu-hover");
        });

        $('.kingston-north-wolfe').focus(function() {
            $('.wolfe').addClass("boat-transform-on-menu-hover");
        });
        $('.kingston-north-wolfe').focusout(function() {
            $('.wolfe').removeClass("boat-transform-on-menu-hover");
        });

        $('.kingston-west-taber').focus(function() {
            $('.taber').addClass("boat-transform-on-menu-hover");
        });
        $('.kingston-west-taber').focusout(function() {
            $('.taber').removeClass("boat-transform-on-menu-hover");
        });

        $('.kingston-west-effie').focus(function() {
            $('.effie').addClass("boat-transform-on-menu-hover");
        });
        $('.kingston-west-effie').focusout(function() {
            $('.effie').removeClass("boat-transform-on-menu-hover");
        });

        $('.kingston-west-aloha').focus(function() {
            $('.aloha').addClass("boat-transform-on-menu-hover");
        });
        $('.kingston-west-aloha').focusout(function() {
            $('.aloha').removeClass("boat-transform-on-menu-hover");
        });

        $('.kingston-west-comet').focus(function() {
            $('.comet').addClass("boat-transform-on-menu-hover");
        });
        $('.kingston-west-comet').focusout(function() {
            $('.comet').removeClass("boat-transform-on-menu-hover");
        });

        $('.kingston-west-george').focus(function() {
            $('.george').addClass("boat-transform-on-menu-hover");
        });
        $('.kingston-west-george').focusout(function() {
            $('.george').removeClass("boat-transform-on-menu-hover");
        });

        /* End Kingston Wrecks */

    });


})();