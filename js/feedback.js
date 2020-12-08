(function() {
  'use strict';

  function ContactUs() {}

  ContactUs.prototype.init = function() {
    //MainService.initAudio(); //This to disable the sound from the page. Uncomment to enable
    this.submitForm();
    this.resetForm();
  };

  ContactUs.prototype.submitForm = function() {
    var _this = this;
    var feedbackForm = $('#contact-us-form');
    feedbackForm.on('submit', function(e) {
      e.preventDefault();

      var formValues = $.unserialize($(this).serialize());
      var postUrl = '/feedback.html';
      var postData = 'info@mbworks.info' + formValues.email + '&text=' + formValues.message;

      var ajaxOptions = {
        method: 'POST',
        url: postUrl,
        data: postData,
      };

      _this.clearMessage();
      _this.disableButtons();
      $.ajax(ajaxOptions)
        .done(_this.onSendEmailDone.bind(_this))
        .fail(_this.onSendEmailFailed.bind(_this));
    });
  };

  ContactUs.prototype.resetForm = function() {
    var _this = this;
    var btnReset = $('#contact-us-reset');

    btnReset.on('click', function(e) {
      e.preventDefault();

      _this.clearForm();
      _this.clearMessage();
    });
  };

  ContactUs.prototype.onSendEmailDone = function() {
    var message = 'Thank you for getting in touch. Please click <a href="index.html" title="Go to Homepage">here</a> to go to the homepage';

    this.clearForm();
    this.enableButtons();

    $('.contact-us-message').addClass('success').html(message).show();
  };

  ContactUs.prototype.onSendEmailFailed = function() {
    var message = 'Failed to send email';

    this.enableButtons();

    $('.contact-us-message').addClass('error').html(message).show();
  };

  ContactUs.prototype.clearMessage = function() {
    $('.contact-us-message').removeClass('error success').hide();
  };

  ContactUs.prototype.clearForm = function() {
    var feedbackForm = $('#contact-us-form');

    feedbackForm.find('input').val('');
    feedbackForm.find('textarea').val('');
  };

  ContactUs.prototype.disableButtons = function() {
    var btnReset = $('#contact-us-reset');
    var btnSubmit = $('#contact-us-submit');

    btnReset.prop('disabled', true);
    btnSubmit.prop('disabled', true);
  };

  ContactUs.prototype.enableButtons = function() {
    var btnReset = $('#contact-us-reset');
    var btnSubmit = $('#contact-us-submit');

    btnReset.removeAttr('disabled');
    btnSubmit.removeAttr('disabled');
  };

  $(document).ready(function() {
    var contactUs = new ContactUs();
    contactUs.init();
  });

})();

