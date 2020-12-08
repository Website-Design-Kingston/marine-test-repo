(function() {
  'use strict';

  function Sitemap() {}

  Sitemap.prototype.init = function() {
    //MainService.initAudio(); //This to disable the sound from the page. Uncomment to enable
  };

  $(document).ready(function() {
    var sitemap = new Sitemap();
    sitemap.init();
  });

})();

