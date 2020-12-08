(function() {
  'use strict';

  function Credits() {}

  Credits.prototype.init = function() {
    MainService.initAudio();
  };

  $(document).ready(function() {
    var credits = new Credits();
    credits.init();
  });

})();

