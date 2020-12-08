(function () {
  'use strict';

  function Index() {}

  Index.prototype.init = function () {
    MainService.initAudio();
    this.openLearnPopup();
    this.setupEvents();
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

  $(document).ready(function () {
    var index = new Index();
    index.init();
  });

})();