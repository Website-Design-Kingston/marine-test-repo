(function () {
  'use strict';

  function Index() {}

  Index.prototype.init = function () {
    MainService.initAudio();
    this.openLearnPopup();
    this.setupEvents();
    if ($(window).width() > 768) {
      this.blockView();
    }
  };

  Index.prototype.openLearnPopup = function () {
    var learnButton = $('a.learn');
    if (sessionStorage.getItem('learnButton') == null) {
      setTimeout(function () {
        $('.learn').trigger('click');
      }, 1500);
      sessionStorage.setItem('learnButton', 'true');
    }
  }

  Index.prototype.setupEvents = function () {
    $('.navi-area > div').on('click', function () {
      $('.navi-area > div').removeClass('active');
      $(this).addClass('active');
    });
  };

  /* Avoid click on main-content until learn box popup is closed*/
  Index.prototype.blockView = function(){
    $('#home-main-content').block({
      message: null,
      overlayCSS: { cursor : 'default'}
    });

    $('#home-learn-open').css('z-index', '1022');
    $('#home-learn-aside').css('z-index', '1033');

    $('#home-learn-close').click(function() {
      $('#home-main-content').unblock();
    });

  }

  $(document).ready(function () {
    var index = new Index();
    index.init();
  });

})();