// JavaScript Document

(function() {
  'use strict';

  function ExploreHmsLawrence() {}
  
  ExploreHmsLawrence.prototype.init = function() {
    //MainService.initAudio(); //This to disable the sound from the page. Uncomment to enable
    this.openLearnPopup();
    this.startSlider();
    this.startTextModal();
    this.toggleTranscript();
	this.toggleClipping(); //toggle for additional function WDK
      this.blockView();
  };

    /* Avoid click on map-menu and main-content until learn box popup is closed*/
    ExploreHmsLawrence.prototype.blockView = function(){

        $('.page--exploring-hms-lawrence').block({
            message: null,
            overlayCSS: { cursor : 'default'}
        });

        $('#exploring-hms-learn-open').css('z-index', '1022');
        $('#exploring-hms-learn-popup').css('z-index', '1033');

        $('#exploring-hms-learn-close').click(function() {
            $('.page--exploring-hms-lawrence').unblock();
        });

    }

  ExploreHmsLawrence.prototype.initTemplate = function() {
    var isMobile = window.innerWidth < 1200;
    var $information = $('.exploring-hms--slider-information');
    var $thumbnailContainer = $('.exploring-hms--slider-image');

    if (isMobile) {
      $information.removeClass('sp-layer sp-static');
      $information.removeAttr('data-position data-horizontal data-vertical data-width');

      $thumbnailContainer.removeClass('sp-layer sp-static');
      $thumbnailContainer.removeAttr('data-position data-horizontal data-vertical data-width');
    }
  };

    ExploreHmsLawrence.prototype.openLearnPopup = function() {
        var learnButton = $('button.learn');
        if (sessionStorage.getItem('learnButton') == null) {
            setTimeout(function() {
                $('.learn').trigger('click');
            }, 1500);
            sessionStorage.setItem('learnButton', 'true');
        }
    };

  ExploreHmsLawrence.prototype.startSlider = function() {
    var _this = this;
    if ($('.page--exploring-hms-lawrence .page--exploring-video').length) {
      $('.page--exploring-hms-lawrence .st-lawrence > a').on('click', function() {
        var target = $(this).attr('data-modal');
        $(target).on($.modal.OPEN, function() {
          $(target).find('.close-modal').focus();
        });
      });

      $('.page--exploring-hms-lawrence .page--exploring-video').on('click', function(e) {
        e.preventDefault();
		
		// NEW: Cache launcher control
        var launcher = $(this);


        var target = $(this).attr('data-modal');
        $(target).modal({
          fadeDuration: 250,
          fadeDelay: 1.5,
        });

        var video = document.getElementById('page--exploring-hms-video');
        video.currentTime = 0;

        $(target).on($.modal.OPEN, function() {
          $('.close-modal').attr('tabindex', 0);
          video.play();
		  
		  // NEW: Set modal attributes and focus on open
          $(target).attr('tabindex', -1).attr('role', 'dialog').attr('aria-label', $(target).find('h3').text()).focus();

          // NEW: Set all the divs not the modal container as inert
          $('body > div:not(".jquery-modal")').attr('inert', true);
        });

        // NEW: Close function
        $(target).on($.modal.CLOSE, function(event, modal) {
          // Remove inert
          $('body > div').removeAttr('inert');

          // Wait for inert to finishâ€¦
          setTimeout(function() {

            // Set focus back to the launcher contorl on close
            launcher.focus();
          }, 100);
          video.pause();

        });

          /*Remove yellow border after modale closes*/
          $(target).on($.modal.AFTER_CLOSE, function(event, modal) {

              $('#eight-menu').css('border', 'medium none');
              $('#eight-menu').css('text-decoration', 'none');

          });
      });
    }
  };

  ExploreHmsLawrence.prototype.startTextModal = function() {
    var _this = this;
    if ($('.page--exploring-text').length) {
      $('.page--exploring-text').on('click', function(e) {
        e.preventDefault();

        // NEW: Cache launcher control
        var launcher = $(this);

        var target = $(this).attr('data-modal');
        $(target).modal({
          fadeDuration: 250,
          fadeDelay: 1.5,
        });

        $(target).on($.modal.OPEN, function(event, modal) {
          _this.registerSlider(target);
          $('.close-modal .focus-within').attr('tabindex', 0);
          $('.exploring-hms--slider-content .sp-arrow.sp-previous-arrow').text('Back');
          $('.exploring-hms--slider-content .sp-arrow.sp-next-arrow').text('Next');

          // NEW: Set modal attributes and focus on open
          $(target).attr('tabindex', 0).attr('role', 'dialog').attr('aria-label', $(target).find('h3').text()).focus();

          // NEW: Set all the divs not the modal container as inert
          $('body > div:not(".jquery-modal")').attr('inert', true);
        });

        // NEW: Close function
        $(target).on($.modal.CLOSE, function(event, modal) {

          // Remove inert
          $('body > div').removeAttr('inert');

          // Wait for inert to finishâ€¦
          setTimeout(function() {

            // Set focus back to the launcher contorl on close
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

              $('#four-menu').css('border', 'medium none');
              $('#four-menu').css('text-decoration', 'none');

              $('#five-menu').css('border', 'medium none');
              $('#five-menu').css('text-decoration', 'none');

              $('#six-menu').css('border', 'medium none');
              $('#six-menu').css('text-decoration', 'none');

              $('#seven-menu').css('border', 'medium none');
              $('#seven-menu').css('text-decoration', 'none');
          });

      });
    }
  };

if (window.matchMedia("(max-width: 767px)").matches) {
    ExploreHmsLawrence.prototype.registerSlider = function(element) {
    $('.slider-pro').sliderPro({
        width: '100vw',
        height: '40vh',
      autoHeight: false,
      updateHash: true,
      arrows: true,
      fade: true,
      autoplay: false,
	  loop: true,
      touchSwipe: false,
    });
  };
} else {
    ExploreHmsLawrence.prototype.registerSlider = function(element) {
    $('.slider-pro').sliderPro({
        width: '64vw',
        height: '65vh',
      autoHeight: false,
      updateHash: true,
      arrows: true,
      fade: true,
      autoplay: false,
	  loop: true,
      touchSwipe: false,
    });
  };
}

  ExploreHmsLawrence.prototype.toggleTranscript = function() {
    var btnShowTranscript = $('.exploring-hms--transcript-show');
    var btnHideTranscript = $('.exploring-hms--transcript-hide');

    if (btnShowTranscript.length && btnShowTranscript.length) {
      btnShowTranscript.on('click', function() {
        $(this).addClass('hidden');
        btnHideTranscript.removeClass('hidden');
        $($(this).attr('href')).removeClass('hidden');
      });

      btnHideTranscript.on('click', function() {
        $(this).addClass('hidden');
        btnShowTranscript.removeClass('hidden');
        $($(this).attr('href')).addClass('hidden');
      });
    }
  };
  
  ExploreHmsLawrence.prototype.toggleClipping = function() {   //WDK duplicated function for clipping toggle link, they were messing each other up
    var btnShowTranscript = $('.exploring-hms--clipping-show');
    var btnHideTranscript = $('.exploring-hms--clipping-hide');

    if (btnShowTranscript.length && btnShowTranscript.length) {
      btnShowTranscript.on('click', function() {
        $(this).addClass('hidden');
        btnHideTranscript.removeClass('hidden');
        $($(this).attr('href')).removeClass('hidden');
      });

      btnHideTranscript.on('click', function() {
        $(this).addClass('hidden');
        btnShowTranscript.removeClass('hidden');
        $($(this).attr('href')).addClass('hidden');
      });
    }
  };
	
	$(document).ready(function() {
		var exploreHms = new ExploreHmsLawrence();
		exploreHms.init();
	});
	
	$(document).ready(function() {  /*WDK added for submenu hover */

        /*start one*/
		$('#one-menu').hover(function() {
			$('.one').addClass("change");
		}, function() {
			$('.one').removeClass("change")
		});
		$('.one').hover(function() {
			$('#one-menu').css('text-decoration', 'underline');
		}, function() {
			$('#one-menu').css('text-decoration', 'none');
		});

        $('#one-menu').focus(function() {
            $('.one').addClass("change");
        });
        $('#one-menu').focusout(function() {
            $('.one').removeClass("change");
        });

        $('.one').focus(function() {
            $('#one-menu').css("border", "4px solid #FFBE00");
        });
        $('.one').focusout(function() {
            $('#one-menu').css("border", "none");
        });
        /*end one*/

        /*start two*/
		$('#two-menu').hover(function() {
			$('.two').addClass("change");
		}, function() {
			$('.two').removeClass("change")
		}); 
		$('.two').hover(function() {
			$('#two-menu').css('text-decoration', 'underline');
		}, function() {
			$('#two-menu').css('text-decoration', 'none');
		});

        $('#two-menu').focus(function() {
            $('.two').addClass("change");
        });
        $('#two-menu').focusout(function() {
            $('.two').removeClass("change");
        });
        $('.two').focus(function() {
            $('#two-menu').css("border", "4px solid #FFBE00");
        });
        $('.two').focusout(function() {
            $('#two-menu').css("border", "none");
        });
        /*end two*/

        /*start three*/
		$('#three-menu').hover(function() {
			$('.three').addClass("change");
		}, function() {
			$('.three').removeClass("change")
		}); 
		$('.three').hover(function() {
			$('#three-menu').css('text-decoration', 'underline');
		}, function() {
			$('#three-menu').css('text-decoration', 'none');
		});

        $('#three-menu').focus(function() {
            $('.three').addClass("change");
        });
        $('#three-menu').focusout(function() {
            $('.three').removeClass("change");
        });
        $('.three').focus(function() {
            $('#three-menu').css("border", "4px solid #FFBE00");
        });
        $('.three').focusout(function() {
            $('#three-menu').css("border", "none");
        });
        /*end three*/

        /*start four*/
		$('#four-menu').hover(function() {
			$('.four').addClass("change");
		}, function() {
			$('.four').removeClass("change")
		}); 
		$('.four').hover(function() {
			$('#four-menu').css('text-decoration', 'underline');
		}, function() {
			$('#four-menu').css('text-decoration', 'none');
		});

        $('#four-menu').focus(function() {
            $('.four').addClass("change");
        });
        $('#four-menu').focusout(function() {
            $('.four').removeClass("change");
        });
        $('.four').focus(function() {
            $('#four-menu').css("border", "4px solid #FFBE00");
        });
        $('.four').focusout(function() {
            $('#four-menu').css("border", "none");
        });
        /*end four*/

        /*start five*/
		$('#five-menu').hover(function() {
			$('.five').addClass("change");
		}, function() {
			$('.five').removeClass("change")
		}); 
		$('.five').hover(function() {
			$('#five-menu').css('text-decoration', 'underline');
		}, function() {
			$('#five-menu').css('text-decoration', 'none');
		});

        $('#five-menu').focus(function() {
            $('.five').addClass("change");
        });
        $('#five-menu').focusout(function() {
            $('.five').removeClass("change");
        });
        $('.five').focus(function() {
            $('#five-menu').css("border", "4px solid #FFBE00");
        });
        $('.five').focusout(function() {
            $('#five-menu').css("border", "none");
        });
        /*end five*/

        /*start six*/
		$('#six-menu').hover(function() {
			$('.six').addClass("change");
		}, function() {
			$('.six').removeClass("change")
		}); 
		$('.six').hover(function() {
			$('#six-menu').css('text-decoration', 'underline');
		}, function() {
			$('#six-menu').css('text-decoration', 'none');
		});

        $('#six-menu').focus(function() {
            $('.six').addClass("change");
        });
        $('#six-menu').focusout(function() {
            $('.six').removeClass("change");
        });
        $('.six').focus(function() {
            $('#six-menu').css("border", "4px solid #FFBE00");
        });
        $('.six').focusout(function() {
            $('#six-menu').css("border", "none");
        });
        /*end six*/

        /*start seven*/
		$('#seven-menu').hover(function() {
			$('.seven').addClass("change");
		}, function() {
			$('.seven').removeClass("change")
		}); 
		$('.seven').hover(function() {
			$('#seven-menu').css('text-decoration', 'underline');
		}, function() {
			$('#seven-menu').css('text-decoration', 'none');
		});

        $('#seven-menu').focus(function() {
            $('.seven').addClass("change");
        });
        $('#seven-menu').focusout(function() {
            $('.seven').removeClass("change");
        });
        $('.seven').focus(function() {
            $('#seven-menu').css("border", "4px solid #FFBE00");
        });
        $('.seven').focusout(function() {
            $('#seven-menu').css("border", "none");
        });
        /*end seven*/

        /*start eight*/
		$('#eight-menu').hover(function() {
			$('.eight').addClass("change");
		}, function() {
			$('.eight').removeClass("change")
		}); 
		$('.eight').hover(function() {
			$('#eight-menu').css('text-decoration', 'underline');
		}, function() {
			$('#eight-menu').css('text-decoration', 'none');
		});

        $('#eight-menu').focus(function() {
            $('.eight').addClass("change");
        });
        $('#eight-menu').focusout(function() {
            $('.eight').removeClass("change");
        });
        $('.eight').focus(function() {
            $('#eight-menu').css("border", "4px solid #FFBE00");
        });
        $('.eight').focusout(function() {
            $('#eight-menu').css("border", "none");
        });
        /*end eight*/
	});
})();
