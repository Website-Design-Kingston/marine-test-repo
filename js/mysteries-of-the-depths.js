(function () {
    'use strict';

    function MysteriesDepths() {}
    MysteriesDepths.prototype.init = function () {
        // this.initTemplate();
        //MainService.initAudio();
        this.openLearnPopup();
        this.startSlider();
        this.blockView()
    };
    /*     MysteriesDepths.prototype.initTemplate = function() {
            var isMobile = window.innerWidth < 1200;
            var $information = $('.mysteries-depths--slider-information');
            var $thumbnailContainer = $('.mysteries-depths--slider-image');
            if (isMobile) {
                $information.removeClass('sp-layer sp-static');
                $information.removeAttr('data-position data-horizontal data-vertical data-width');
                $thumbnailContainer.removeClass('sp-layer sp-static');
                $thumbnailContainer.removeAttr('data-position data-horizontal data-vertical data-width');
            }
        }; */
    MysteriesDepths.prototype.openLearnPopup = function () {
        var learnButton = $('button.learn');
        if (sessionStorage.getItem('learnButton') == null) {
            setTimeout(function () {
                $('.learn').trigger('click');
            }, 1500);
            sessionStorage.setItem('learnButton', 'true');
        }
    };

    /* Avoid click on map-menu and main-content (.page--mysteries) until learn box popup is closed*/
    MysteriesDepths.prototype.blockView = function(){

        $('.page--mysteries').block({
            message: null,
            overlayCSS: { cursor : 'default'}
        });

        $('#map-menu').block({
            message: null,
            overlayCSS: { cursor : 'default'}
        });

        $('#mysteries-learn-open').css('z-index', '1022');
        $('#mysteries-learn-popup').css('z-index', '1033');

        $('#mysteries-learn-close').click(function() {
            $('#map-menu').unblock();
            $('.page--mysteries').unblock();
        });

    }

    MysteriesDepths.prototype.startSlider = function () {
        var _this = this;
        if ($('.page--mysteries-text').length) {
            $('.page--mysteries-text').on('click', function (e) {
                e.preventDefault();
                // NEW: Cache launcher control
                var launcher = $(this);
                var target = $(this).attr('data-modal');
                $(target).modal({
                    fadeDuration: 250,
                    fadeDelay: 1.5,
                    closeExisting: false,
                });
                $(target).on($.modal.OPEN, function (event, modal) { //Do this actions when the modal opens
                    _this.registerSlider(target);
                    $('.close-modal .focus-within').attr('tabindex', 0);
                    $('span.sp-arrow').attr('tabindex', -1);
                    $('.sp-has-buttons .sp-arrow.sp-previous-arrow').text('Back');
                    $('.sp-has-buttons .sp-arrow.sp-next-arrow').text('Next');

                    // NEW: Set modal attributes and focus on open
                    $(target).attr('role', 'dialog').attr('aria-label', $(target).find('h3').text()).focus();

                    // NEW: Set all the divs not the modal container as inert
                    $('body > div:not(".jquery-modal")').attr('inert', '');
                });
                // NEW: Close function
                $(target).on($.modal.CLOSE, function (event, modal) {
                    ;
                    // Remove inert
                    $('body > div').removeAttr('inert');
                    // Wait for inert to finish…
                    setTimeout(function () {
                        // Set focus back to the launcher control on close
                        launcher.focus();
                    }, 100);
                });

                /*Remove yellow border after modale closes*/
                $(target).on($.modal.AFTER_CLOSE, function(event, modal) {

                    $('#one-menu').css('border', 'medium none');
                    $('#one-menu').css('text-decoration', 'none');

                    $('#two-menu').css('border', 'medium none');
                    $('#two-menu').css('text-decoration', 'none');

                    $('#three-menu').css('border', 'medium none');
                    $('#three-menu').css('text-decoration', 'none');

                });
            });
        }
    };
    MysteriesDepths.prototype.registerSlider = function (element) {
        $('.slider-pro').sliderPro({
            width: '70vw',
            height: '68vh',
            autoHeight: false,
            updateHash: true,
            arrows: true,
            fade: true,
            autoplay: false,
            touchSwipe: true,
            loop: true,
        });
    };

    $(document).ready(function () {
        $('.sp-thumbnail-container a').simpleLightbox();
    });

    $(document).ready(function () {
        var mysteriesDepths = new MysteriesDepths();
        mysteriesDepths.init();
    });

    $(document).ready(function () {
        /*WDK added for submenu hover */
        $('#one-menu').hover(function () {
            $('.book-one').addClass("change");
        }, function () {
            $('.book-one').removeClass("change")
        });
        $('.book-one').hover(function () {
            $('#one-menu').css('text-decoration', 'underline');
        }, function () {
            $('#one-menu').css('text-decoration', 'none');
        });

        $('#one-menu').focus(function() {
            $('.book-one').addClass("change");
        });
        $('#one-menu').focusout(function() {
            $('.book-one').removeClass("change");
        });
        $('.book-one').focus(function() {
            $('#one-menu').css("border", "4px solid #FFBE00");
        });
        $('.book-one').focusout(function() {
            $('#one-menu').css("border", "none");
        });

        $('#two-menu').hover(function () {
            $('.book-two').addClass("change");
        }, function () {
            $('.book-two').removeClass("change")
        });
        $('.book-two').hover(function () {
            $('#two-menu').css('text-decoration', 'underline');
        }, function () {
            $('#two-menu').css('text-decoration', 'none');
        });

        $('#two-menu').focus(function() {
            $('.book-two').addClass("change");
        });
        $('#two-menu').focusout(function() {
            $('.book-two').removeClass("change");
        });
        $('.book-two').focus(function() {
            $('#two-menu').css("border", "4px solid #FFBE00");
        });
        $('.book-two').focusout(function() {
            $('#two-menu').css("border", "none");
        });


        $('#three-menu').hover(function () {
            $('.book-three').addClass("change");
        }, function () {
            $('.book-three').removeClass("change")
        });
        $('.book-three').hover(function () {
            $('#three-menu').css('text-decoration', 'underline');
        }, function () {
            $('#three-menu').css('text-decoration', 'none');
        });

        $('#three-menu').focus(function() {
            $('.book-three').addClass("change");
        });
        $('#three-menu').focusout(function() {
            $('.book-three').removeClass("change");
        });
        $('.book-three').focus(function() {
            $('#three-menu').css("border", "4px solid #FFBE00");
        });
        $('.book-three').focusout(function() {
            $('#three-menu').css("border", "none");
        });
    });
    $(document).ready(function () {
        $('.image-error').delay(8000).fadeIn(400);
    });
})();