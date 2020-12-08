(function () {
  'use strict';

  function ExploreCharts() {}

  ExploreCharts.prototype.init = function () {
    MainService.initAudio();
    this.initTemplate();
    this.openLearnPopup();
    this.startSlider();
    this.startNewSlider();
    this.startModalSlider();
    // this.setupTooltip();
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

  /*    ExploreCharts.prototype.initTemplate = function() {
          var isMobile = window.innerWidth < 768;
          var $information = $('mysteries-depths--slider-information');
          var $thumbnailContainer = $('.mysteries-depths--slider-image');
          if (isMobile) {
              $information.removeClass('sp-layer sp-static');
              $information.removeAttr('data-position data-horizontal data-vertical data-width');
              $thumbnailContainer.removeClass('sp-layer sp-static');
              $thumbnailContainer.removeAttr('data-position data-horizontal data-vertical data-width');
          }
      }; */

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
          $(target).attr('tabindex', -1).attr('role', 'dialog').attr('aria-label', $(target).find('h3').text()).focus();

          // NEW: Set all the divs not the modal container as inert
          $('body > div:not(".jquery-modal")').attr('inert', true);
        });

        // NEW: Close function
        $(target).on($.modal.CLOSE, function (event, modal) {
          // Remove inert
          $('body > div').removeAttr('inert');

          // Wait for inert to finish…
          setTimeout(function () {

            // Set focus back to the launcher contorl on close
            launcher.focus();
          }, 100);
        });
      });
    }
  };

  /*   ExploreCharts.prototype.setupTooltip = function() {
      if ($('.tooltip').length) {
        $('.tooltip').tooltipster();
      }
    }; */

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

  ExploreCharts.prototype.startNewSlider = function () {
    var _this = this;
    if ($('.wreck-single').length) {
      $('.wreck-single').on('click', function (e) {
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
    }
  };

  ExploreCharts.prototype.registerSlider = function (element) {
    $('.slider-pro').sliderPro({
      width: '130vh',
      //height: '75vh',
      autoHeight: true,
      updateHash: true,
      arrows: true,
      fade: true,
      autoplay: false,
      touchSwipe: true,
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

  $(document).ready(function () {
    var exploreCharts = new ExploreCharts();
    exploreCharts.init();
  });
  $(document).ready(function () {
    $('.image-error').delay(8000).fadeIn(400);
  });


  /* Handle slides when sub-menu list is clicked **/
  $(document).ready(function(){

    /*Lake Superior*/
    $('#enlarged-great-lakes-location-madeira').click(function(){
      $('#lake-superior-slider' ).sliderPro('gotoSlide' , 1);
     return false;
    });

    $('#enlarged-great-lakes-location-hesper').click(function(){
      $('#lake-superior-slider' ).sliderPro('gotoSlide' , 3);
      return false;
    });

    $('#enlarged-great-lakes-location-kamloops').click(function(){
      $('#lake-superior-slider' ).sliderPro('gotoSlide' , 6);
      return false;
    });

    $('#enlarged-great-lakes-location-monarch').click(function(){
      $('#lake-superior-slider' ).sliderPro('gotoSlide' , 8);
      return false;
    });

    $('.lake-superior-menu-slide').click(function(){
      $('#lake-superior-slider' ).sliderPro('gotoSlide' , 0);
      return false;
    });

    /*Lake Michigan*/
    $('#enlarged-great-lakes-location-alvinclark').click(function(){
      $('#lake-michigan-slider' ).sliderPro('gotoSlide' , 1);
      return false;
    });

    $('#enlarged-great-lakes-location-frankoconnor').click(function(){
      $('#lake-michigan-slider' ).sliderPro('gotoSlide' , 3);
      return false;
    });

    $('#enlarged-great-lakes-location-carldbradley').click(function(){
      $('#lake-michigan-slider' ).sliderPro('gotoSlide' , 5);
      return false;
    });

    $('.lake-michigan-menu-slide').click(function(){
      $('#lake-michigan-slider' ).sliderPro('gotoSlide' , 0);
      return false;
    });

    /*Lake Huron*/
    $('#enlarged-great-lakes-location-danieljmorrell').click(function(){
      $('#lake-huron-slider' ).sliderPro('gotoSlide' , 1);
      return false;
    });

    $('#enlarged-great-lakes-location-charlesprice').click(function(){
      $('#lake-huron-slider' ).sliderPro('gotoSlide' , 5);
      return false;
    });

    $('#enlarged-great-lakes-location-waubuno').click(function(){
      $('#lake-huron-slider' ).sliderPro('gotoSlide' , 7);
      return false;
    });

    $('.lake-huron-menu-slide').click(function(){
      $('#lake-huron-slider' ).sliderPro('gotoSlide' , 0);
      return false;
    });


    /*Lake Erie*/
    $('#enlarged-great-lakes-location-argo').click(function(){
      $('#lake-erie-slider' ).sliderPro('gotoSlide' , 1);
      return false;
    });

    $('#enlarged-great-lakes-location-admiral').click(function(){
      $('#lake-erie-slider' ).sliderPro('gotoSlide' , 2);
      return false;
    });

    $('#enlarged-great-lakes-location-colgate').click(function(){
      $('#lake-erie-slider' ).sliderPro('gotoSlide' , 3);
      return false;
    });
    $('#enlarged-great-lakes-location-gpgriffith').click(function(){
      $('#lake-erie-slider' ).sliderPro('gotoSlide' , 6);
      return false;
    });

    $('.lake-erie-menu-slide').click(function(){
      $('#lake-erie-slider' ).sliderPro('gotoSlide' , 0);
      return false;
    });


    /*Lake Ontario*/
    $('#enlarged-great-lakes-location-ontario').click(function(){
      $('#lake-ontario-slider' ).sliderPro('gotoSlide' , 1);
      return false;
    });

    $('#enlarged-great-lakes-location-milan').click(function(){
      $('#lake-ontario-slider' ).sliderPro('gotoSlide' , 3);
      return false;
    });

    $('#enlarged-great-lakes-location-brothers').click(function(){
      $('#lake-ontario-slider' ).sliderPro('gotoSlide' , 5);
      return false;
    });

    $('#enlarged-great-lakes-location-roberval').click(function(){
      $('#lake-ontario-slider' ).sliderPro('gotoSlide' , 9 );
      return false;
    });

    $('.lake-ontario-menu-slide').click(function(){
      $('#lake-ontario-slider' ).sliderPro('gotoSlide' , 0);
      return false;
    });



    /*Kingston North*/
    $('#enlarged-kingston-kph').click(function(){
      $('#kingston-north-slider' ).sliderPro('gotoSlide' , 1);
      return false;
    });

    $('#enlarged-kingston-lawrence').click(function(){
      $('#kingston-north-slider' ).sliderPro('gotoSlide' , 3);
      return false;
    });

    $('#enlarged-kingston-prince').click(function(){
      $('#kingston-north-slider' ).sliderPro('gotoSlide' , 5);
      return false;
    });

    $('#enlarged-kingston-wolfe').click(function(){
      $('#kingston-north-slider' ).sliderPro('gotoSlide' , 7);
      return false;
    });

    $('.kingston-north-menu-slide').click(function(){
      $('#kingston-north-slider' ).sliderPro('gotoSlide' , 0);
      return false;
    });


    /*Kingston West*/
    $('#enlarged-kingston-taber').click(function(){
      $('#kingston-west-slider' ).sliderPro('gotoSlide' , 1);
      return false;
    });

    $('#enlarged-kingston-effie').click(function(){
      $('#kingston-west-slider' ).sliderPro('gotoSlide' , 2);
      return false;
    });

    $('#enlarged-kingston-aloha').click(function(){
      $('#kingston-west-slider' ).sliderPro('gotoSlide' , 4);
      return false;
    });

    $('#enlarged-kingston-comet').click(function(){
      $('#kingston-west-slider' ).sliderPro('gotoSlide' , 6);
      return false;
    });

    $('#enlarged-kingston-george').click(function(){
      $('#kingston-west-slider' ).sliderPro('gotoSlide' , 7);
      return false;
    });

    $('.kingston-west-menu-slide').click(function(){
      $('#kingston-west-slider' ).sliderPro('gotoSlide' , 0);
      return false;
    });




  });


})();