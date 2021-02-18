/*if (window.innerHeight > window.innerWidth) {
  alert("Please use Landscape!");
}*/

var isVideoStopped = false;
var isAllTwinklesInLastActiveStillOpened = false;
var isOneTwinkleInDiveWasOpened = false;
var currentPart = '';
var itemsPartDefaultPosition = {
  '.part1': {
    '.part1-item1': 'top: 15%; left: 84%;',
    '.part1-item2': 'top: 74%; left: 29%;'
  },
  '.part2': {
    '.part2-item1': 'top: 27%; left: 61%;',
    '.part2-item2': 'top: 27%; left: 33%;',
    '.part2-item3': 'top: 45%; left: 44%;',
    '.part2-item4': 'top: 76%; left: 77%;'
  },
  '.part3': {
    '.part3-item1': 'top: 37%; left: 17%;',
    '.part3-item2': 'top: 28%; left: 60%;',
    '.part3-item3': 'top: 14%; left: 74%;'
  },
  '.part4': {
    '.part4-item1': 'top: 72%; left: 24%;',
    '.part4-item2': 'top: 23%; left: 39%;',
    '.part4-item3': 'top: 37%; left: 63%;'
  },
  '.part5': {
    '.part5-item1': 'top: 49%; left: 50%;',
    '.part5-item2': 'top: 52%; left: 64%;'
  },
  '.part6': {
    '.part6-item1': 'top: 36%; left: 60%;',
    '.part6-item2': 'top: 32%; left: 20%;',
    '.part6-item3': 'top: 62%; left: 35%;',
    '.part6-item4': 'top: 60%; left: 75%;'
  },
  '.part7': {
    '.part7-item1': 'top: 23%; left: 60%;',
    '.part7-item2': 'top: 57%; left: 25%;',
    '.part7-item3': 'top: 64%; left: 13%;'
  },
  '.part8': {
    '.part8-item1': 'top: 32%; left: 47%;'
  },
  '.part9': {
    '.part9-item1': 'top: 47%; left: 37%;',
    '.part9-item2': 'top: 51%; left: 58%;',
    '.part9-item3': 'top: 70%; left: 24%;'
  },
  '.part10': {
    '.part10-item1': 'top: 22%; left: 56%;',
    '.part10-item2': 'top: 38%; left: 23%;'
  },
  '.part11': {
    '.part11-item1': 'top: 59%; left: 67%;',
    '.part11-item2': 'top: 63%; left: 29%;',
    '.part11-item3': 'top: 31%; left: 30%;',
    '.part11-item4': 'top: 25%; left: 59%;'
  },
  '.part12': {
    '.part12-item1': 'top: 48%; left: 23%;'
  },
  '.part13': {
    '.part13-item1': 'top: 30%; left: 26%;',
    '.part13-item2': 'top: 51%; left: 36%;',
    '.part13-item3': 'top: 58%; left: 65%;'
  },
  '.part14': {
    '.part14-item1': 'top: 34%; left: 22%;'
  }
};
var videoEndShot = {
  part1: 8.5,
  part2: 12.5,
  part3: 6.5,
  part4: 11.5,
  part5: 12,
  part6: 6.7,
  part7: 12,
  part8: 11.5,
  part9: 12.5,
  part10: 4,
  part11: 8.5,
  part12: 4.5,
  part13: 12,
  part14: 4
};
$(document).ready(function () {
  MainService.initAudio();
  currentPart = 'part1';
  activatePart('.part1');
  $('.body--wreck-diver .btn-dive-now').click(function (event) { //when "Learn About" popup close cross is clicked => play the first part video

    //Fade out the background image when starting the dive
    if(currentPart === 'part1'){
      $('.full-width-bg').fadeOut(2800);
      function openVideo(){
        $('#part1-video').attr("hidden", false)
      }
      setTimeout(openVideo, 2600);
    }else {
      $('.full-width-bg').fadeOut(3000);
      function openVideo(){
        $('#part8-video').attr("hidden", false)
      }
      setTimeout(openVideo, 3100);
    }

    MainService.startAudio();
    $('.learn').removeClass('active');
    $('.help').removeClass('active');
    setTimeout(function () {
      $('.learn').hide();
    }, 100);
    var activeDive = getActiveDive(); //get the value of data-dive. the value must be '1' or '2'

    if (activeDive === '2') {

      playPartBegin('part8-video');
    } else {
      playPartBegin('part1-video');
    }
  });

  $('.dive-two-button').click(function () {//when "Go To Dive 2" button is clicked.
    $(this).hide();
    $('.learn-popup').hide();
    $('.journal').removeClass('active');
    $('button.learn').removeClass('active');
    $('button.learn').hide();
    nonactiveControlAndCollection();
    MainService.resetStyleByJournal();
    if (parseInt(getActiveDive()) < 2) {
      setActiveDive(parseInt(getActiveDive()) + 1);
    }
    //We go directly to dive2 and play part8
    currentPart = 'part8';
    activatePart('.part8');
    $('.full-width-bg').fadeIn();
    playPartBegin('part8-video');
    MainService.startAudio();
  });

  $('.dive-one-button').click(function () {//when "Go To Dive 1" button is clicked.
    $(this).hide();
    $('.learn-popup').hide();
    $('.journal').removeClass('active');
    $('button.learn').removeClass('active');
    $('button.learn').hide();
    nonactiveControlAndCollection();
    MainService.resetStyleByJournal();
    window.location.reload()
  });


  $('.resume-dive').click(function () {//when "Resume Dive" button is clicked
    $(this).hide();
    $('.learn-popup').hide();
    $('.journal').removeClass('active');
    $('button.learn').removeClass('active');
    $('button.learn').hide();
    nonactiveControlAndCollection();
    if (currentPart == 'part1' || currentPart == 'part8'){
      $('.full-width-bg').fadeIn();
    }
    MainService.resetStyleByJournal();

    activatePart('.' + currentPart);
    if (currentPart == 'part1' || currentPart == 'part8'){
      playPartBegin(currentPart +'-video');
    }else {
      playPart(currentPart);
    }

    MainService.startAudio();

  });


  $('.page--wreck-diver').on('click', '.skip-video', function (event) {
    $(this).hide();
    var video = {};
    if ($('.part1').hasClass('active')) {
      $('.body--wreck-diver .learn').hide();
      video = document.getElementById('part1-video');
      video.currentTime = 6;
    } else if ($('.part8').hasClass('active')) {
      video = document.getElementById('part8-video');
      video.currentTime = 6.5;
    }
    if (video.hasOwnProperty()) {
      handleEndOfFirstVideo(video);
    }
  });

  $('.head-to-surface p').click(function (event) {
    // $('.head-to-surface .confirm').show();
    $('.collection').removeClass('showCollection');
    $('.dive-complete-message', '.dive-incomplete-message').css('opacity', 0.5);
  });

  $('.head-to-surface').click(function (event) {
    // var action = $(event.target).text();
    // if (action === 'YES') {
    //     if (!isAllItemInActiveDiveFound() && !isLastStillOfEachDiveActive()) {
    //     !resetCollectionItemFoundInActivePart();
    // };
    activeControlAndCollection();

    if(getActiveDive() == 1){
      $('.dive-one-button').attr("hidden", true);
      $('.dive-two-button').attr("hidden", false);
    }else {
      $('.dive-two-button').attr("hidden", true);
      $('.dive-one-button').attr("hidden", false);
    }

    activatePart('.part-head-to-surface');
    $('.part-item').removeClass('active');
    $('.help').hide();
    $('.head-to-surface').hide();
    //$('.resume-dive').hide();
    $('.head-to-surface .confirm').hide();
    $('.page--wreck-diver .help-popup').hide();
    $('.dive-complete-message, .dive-incomplete-message').hide();
    playPartHeadToSurface();
    setTimeout(function () {
      MainService.stopAudio();
    }, 5000);
    // } else {
    //   $('.head-to-surface .confirm').hide();
    // }
  });

  /* WDK Custom "HEAD TO SURFACE" button - Start */

  $('.head-to-surface-anytime').click(function () {
    nonactiveControlAndCollection(); //remove the collection part

    if(getActiveDive() == 1){
      $('.dive-one-button').attr("hidden", true);
      $('.dive-two-button').attr("hidden", false);
    }else {
      $('.dive-two-button').attr("hidden", true);
      $('.dive-one-button').attr("hidden", false);
    }
    activatePart('.part-head-to-surface');
    $('.part-item').removeClass('active');
    $('.help').hide();
    $('.head-to-surface-anytime').hide();
    $('.page--wreck-diver .help-popup').hide();
    $('.dive-complete-message, .dive-incomplete-message').hide();
    checkOneTwinkleInDiveWasOpened()
    playPartHeadToSurfaceAnytime();
	 setTimeout(function () {
      MainService.stopAudio();
    }, 5000);
  });

  function playPartHeadToSurfaceAnytime() { //head to surface without finish the current dive section
    $('.page--wreck-diver .adventure .part.active .continue').css('opacity', 0);
    var video = document.getElementById('part-head-to-surface-video');
    isVideoStopped = false;
    video.play();
    video.addEventListener("ended", function () {
      var activeDive = getActiveDive();

      $('button.learn').show();
      $('button.learn').addClass('active');

      setActiveDive(parseInt(activeDive)); //stay in the current dive


      if (isOneTwinkleInDiveWasOpened) { //if at least one twikle was opened
        activeControlAndCollection();
        $('.resume-dive').removeAttr('style');
        activatePart('.part-journal');
        $('.learn-popup').show();
        $('.learn-popup .learn-content.to-journal').addClass('active');
        $('button.learn').addClass('active').css('z-index', 1);
        $('.learn-popup .learn-content.to-restart').removeClass('active');
        $('.learn-popup .to-journal .close-menu').text('');

      } else {
        if (activeDive === "1") {
          activatePart('.part1');
          $('.full-width-bg').fadeIn();
        } else {
          activatePart('.part8');
          $('.full-width-bg').fadeIn();
          $('.learn-popup .learn-content.to-journal').removeClass('active');
          nonactiveControlAndCollection()
          $('button.learn').addClass('active').css('z-index', 0);
          $('.learn-popup .learn-content.to-restart').addClass('active');
          $('.learn-popup .to-journal .close-menu').text('Dive now!');

        }

        $('.learn-popup').show();
        $('.bag > div[data-dive="' + activeDive + '"]').removeAttr('style');
      }
      $('.page--wreck-diver .adventure .part.active .continue').css('opacity', 0);
    }, false);


  }
  /* WDK Custom "HEAD TO SURFACE ANYTIME " button - End */

 /* $(document).click(function (event) {
    disableAllDescription();
  });*/

  var flag = true;
  $('.navigation > div, .navigation > div img').on('mousedown touchstart', function (event) {
    if (!flag) return;
    var direction = event.target.tagName === 'IMG' ? $(event.target).parent().attr('id') : $(event.target).attr('id');
    moveBackgroud(direction);
    window.moveBackgroundInterval = setInterval(function () {
      moveBackgroud(direction);
    }, 500);
    flag = false;
  });
  $('.navigation > div, .navigation > div img').on('mouseup mouseleave touchend', function (event) {
    window.clearInterval(window.moveBackgroundInterval);
    flag = true;
  });
  navigationKeyBoardSupport();
  $('.page--wreck-diver .adventure').on('click', '.part.active .continue .clickable', function () {
    toNextLocation(); // on skip or next location click
  });
  $('.body--wreck-diver .btn-view-journal').click(function (event) {
    MainService.activeJournal();
    MainService.attributeTabindexToDiscoveredItems();
    $(".collection").addClass('showCollection');
    $(".journal").animate({right: '150px'});
  });
});

function playPart(partName) {
  var partSelector = '.' + partName;

  //make unclickable "SWIM TO NEXT LOCATION"
  $('.page--wreck-diver .adventure .part.active .continue').css('opacity', 0.5);
  $('.part .continue .clickable').css('pointer-events', 'none');

  //make un unclickable "HEAD TO SURFACE"
  $('.head-to-surface-anytime').show();
  $('.head-to-surface-anytime').css('opacity', 0.5);
  $('.head-to-surface-anytime').css('pointer-events', 'none');


  var video = document.getElementById($('.part-video', partSelector).attr('id'));
  isVideoStopped = false;
  video.currentTime = 0;
  video.play();
  isVideoStopped = false;
  video.addEventListener("timeupdate", function () {

    setTimeout(function () {
      $('button.help').show();
    }, 500);

    console.log("nous somme au:", partSelector)

    if (this.currentTime >= videoEndShot[partName] && !isVideoStopped) {
      this.pause();
      console.log("on est au niveau:", partName)

      $('button.help').click(); // open help popup on each part of the dive to give indications

      if (!(partName == 'part7' || partName == 'part14')) {

        //make clickable "NEXT LOCATION" button
        $('.page--wreck-diver .adventure .part.active .continue').css({
          'opacity': 1,
          'color': '#fff'
        });
        $('.page--wreck-diver .adventure .part.active .continue .clickable').css('pointer-events', 'auto');

        //make clickable the button "TO SURFACE"
        $('.head-to-surface-anytime').css('opacity', 1);
        $('.head-to-surface-anytime').css('pointer-events', 'auto');
      } else {
        // hide "next location" and "skip" buttons
        $('.page--wreck-diver .adventure .part.active .continue').hide();

        //new change ::  Display the "TO SURFACE" button anyway even if we are on part7 or part14 and all twinkles of the last active part are selected or not.
        $('button.head-to-surface-anytime').show();
        $('.head-to-surface-anytime').css('opacity', 1);
        $('.head-to-surface-anytime').css('pointer-events', 'auto');
      }
      isVideoStopped = true;
      activeItemsInAnActivatedPart();
      setupCollectingEvent();
      activeControlAndCollection();
    }
  }, false);
}

function disableAllDescription() {
  var visibleDescription = false;
  $('.description').each(function (index, element) {
    if ($(element).css('visibility') === 'visible') {
      visibleDescription = true;
    }
  });
  if (isVideoStopped && visibleDescription) {
    $('.description').css({
      visibility: 'hidden',
      'z-index': 0
    });
  }
}

function playPartHeadToSurface() {
  $('.page--wreck-diver .adventure .part.active .continue').css('opacity', 0.5);
  var video = document.getElementById('part-head-to-surface-video');
  isVideoStopped = false;
  video.play();
  video.addEventListener("ended", function () {
    var activeDive = getActiveDive();
    $('.page--wreck-diver .collection').addClass('active');
    activatePart('.part-journal');
    $('.learn-popup').hide();
    $('.learn-popup .learn-content.to-journal').addClass('active');
    $('button.learn').show();
    $('button.learn').addClass('active');
    $('.learn-popup .learn-content.to-restart').removeClass('active');
    $('.learn-popup .to-journal .close-menu').text('');
    if (parseInt(activeDive) < 2 && isAllItemInActiveDiveFound()) {
      setActiveDive(parseInt(activeDive) + 1);
    }
    //  if (!isAllItemInActiveDiveFound()) {
    //   resetCollectionItemFoundInActivePart();
    // }

    if (isAllItemInActiveDiveFound() || isAllTwinklesInLastActiveStillOpened) {

      $('.resume-dive').hide();

      $('.page--wreck-diver .collection').addClass('active');
      activatePart('.part-journal');
      $('.learn-popup').show();
      $('.learn-popup .learn-content.to-journal').addClass('active');
      $('button.learn').addClass('active').css('z-index', 0);
      $('.learn-popup .learn-content.to-restart').removeClass('active');
      $('.learn-popup .to-journal .close-menu').text('');

      if (parseInt(activeDive) < 2) {
        setActiveDive(parseInt(activeDive) + 1);
      }

    } else {
      if (activeDive === "1") {
        activatePart('.part1');
      } else {
        activatePart('.part8');
        $('.page--wreck-diver .collection').addClass('active');
      }

      $('.learn-popup').show();
      $('.learn-popup .learn-content.to-restart').addClass('active');
      $('.learn-popup .learn-content.to-journal').removeClass('active');
      $('.learn-popup .to-restart .close-menu').text('Dive again!');
      //$('.bag > div[data-dive="' + activeDive + '"]').css('opacity', '0.2');
    }
    $('.page--wreck-diver .adventure .part.active .continue').css('opacity', 0);
  }, false);
}

function playPartBegin(videoId) { //start playing the video
  $('button.skip-video').show(); //show "SKIP DESCENT" button
  $('.part.active .continue').css('opacity', 0); //hide "SWIM TO NEXT LOCATION" button
  isAllTwinklesInLastActiveStillOpened = false;
  var video = document.getElementById(videoId);
  isVideoStopped = false;
  video.play();

  $('.full-width-bg').fadeOut(3000);

  function openVideo(){
    $('#'+videoId).attr("hidden", false)
  }
  setTimeout(openVideo, 3100);

  handleEndOfFirstVideo(video);
}

function handleEndOfFirstVideo(video) {
  //handler should be bound first
  video.addEventListener("timeupdate", function (event) { // update currentTime attribute before trigger the function
    var partName = $(video).closest('.part').attr('name');
    if (this.currentTime >= videoEndShot[partName] && !isVideoStopped) { //if the video finish to play => pause it and update the view
      isVideoStopped = true;
      this.pause();

      $('.part.active .continue').css('opacity', 1); //show the "SWIM TO NEXT LOCATION" button
      $('.part.active .continue .clickable').css('pointer-events', 'auto');

      $('.skip-video').hide();
      //$('.skip-video').css('opacity', 0);

      $('.head-to-surface-anytime').show(); //show the "HEAD TO SURFACE" button.
      $('.head-to-surface-anytime').css('opacity', 1);
      $('.head-to-surface-anytime').css('pointer-events', 'auto');

      // $('button.learn').hide();
      setTimeout(function () {
        $('button.help').show();
        //$('.head-to-surface').show();
        $('button.help').trigger('click');
      }, 500);
      activeItemsInAnActivatedPart();
      setupCollectingEvent();
      activeControlAndCollection();
    }
  }, false);
}

function setupCollectingEvent() {


  // collect all items accessibility button
  $('.collection-button').on('keypress',function(event) {
    if(event.which == 13) {
      event.stopPropagation();
      $('.part-item.active .twinkles').css({
        'animation-name': 'stop-it',
        background: 'none'
      });
      $('img', '.part-item.active .twinkles').show();

      $('img', '.part-item.active .twinkles').trigger('click');

      $('.show-desc').css("visibility", "visible")

    }
  });

  // collect all items accessibility button
  $('.collection-button').on('click', function (event) {
    event.stopPropagation();
    $('.part-item.active .twinkles').css({
      'animation-name': 'stop-it',
      background: 'none'
    });
    $('img', '.part-item.active .twinkles').show();

    $('img', '.part-item.active .twinkles').trigger('click');

    $('.show-desc').css("visibility", "visible")

  });


  // collect all twikles of the current dive part if "Skip" button is pressed and move to next location
 /* $('.skip-collect').on('keypress',function(event) {
    if(event.which == 13) {
      event.stopPropagation();
      $('.part-item.active .twinkles').css({
        'animation-name': 'stop-it',
        background: 'none'
      });
      $('img', '.part-item.active .twinkles').show();

      $('img', '.part-item.active .twinkles').trigger('click');

      $('.show-desc').css("visibility", "visible")

      setTimeout(function () {
        toNextLocation();
      }, 500);
    }
  });*/

  // collect all twikles of the current dive part if "Skip" button is clicked and move to next location
  $('.skip-collect').on('click', function (event) {
    event.stopPropagation();
    $('.part-item.active .twinkles').css({
      'animation-name': 'stop-it',
      background: 'none'
    });
    $('img', '.part-item.active .twinkles').show();

    $('img', '.part-item.active .twinkles').trigger('click');

    $('.show-desc').css("visibility", "visible")

    setTimeout(function () {
      toNextLocation();
    }, 500);

  });

  $('.part-item.active .twinkles').on('click', function (event) {
    event.stopPropagation();
    $(this).css({
      'animation-name': 'stop-it',
      background: 'none'
    });
    $('img', event.target).show();
    $('img', event.target).trigger('click');
  });

  $('.mobile-item.active').on('click', function (event) {

    var mobileButton = $(this);

    var itemInCollectionClass = $(mobileButton).data('target'); // get the item number of the selected element

      // Remove existing selected class from the twikles
      $(".twinkles").removeClass("selected");

      // Select twinkle element based on its data-target attribute value
      $('.twinkles[data-target=' + itemInCollectionClass + ']').addClass("selected");

      $('.selected').click(); // this will trigger a click as 'twikles' click


  });


  $('.part-item.active .twinkles img').on('click', function (event) {
    var parentContext = $(this).parent().parent(); //this is the div element with class part-item
    disableAllDescription();
    $('.description', $(this).parent().parent()).css({ //show the description of the image selected inside part-item
      visibility: 'visible',
      display: 'inline-block',
      'z-index': 0
    });
    var itemInCollectionClass = $('.twinkles', parentContext).data('target'); //get the item number of the selected element

    handleSelectedItems(itemInCollectionClass);

   /* DONT REMOVE THIS COMMENT PLEASE IT CAN BE HELPFULL
    if (isAllTwinklesInLastActiveStillOpened) { //show "HEAD TO SURFACE" button if all twinkles of the last active part are selected
      if (isAllItemInActiveDiveFound()) {
        $('.collection .dive-complete-message').show();
      } else {
        $('.collection .dive-incomplete-message').show();
      }
      setTimeout(function () {
        $('.head-to-surface').show();
      }, 1500);
    }*/
  });
}

function getAllDuplicateItems(itemInCollectionClass) {
  var top = $('.' + itemInCollectionClass, '.collection').css('top');
  var left = $('.' + itemInCollectionClass, '.collection').css('left');
  return $('[discover=true]', '.collection').toArray().filter(function (item) {
    return $(item).css('top') === top && $(item).css('left') === left;
  });
}

function activeControlAndCollection() {
  $('.page--wreck-diver .collection').addClass('active');
}

function nonactiveControlAndCollection() {
  $('.page--wreck-diver .collection').removeClass('active');
}

function toNextLocation() { // handle the next location action. Used by "Next Location" and "Skip button"
  $('.part .continue .clickable').css('pointer-events', 'none');
  $('.help-popup > button.close-menu').click();
  $('.adventure').scrollTop(0);
  $(".collection").removeClass('showCollection');
  disableAllDescription();
  var nextPartSelector = '.' + $('.part.active').next().attr('name');
  currentPart = $('.part.active').next().attr('name');
  var nextPartName = $('.part.active').next().attr('name');
  activatePart(nextPartSelector);
  playPart(nextPartName);
}

function handleSelectedItems(itemInCollectionClass){ // handle the collected element action. Called when select an item during the dive
  $('.' + itemInCollectionClass, '.collection').attr('discover', true); //change on true the discover attribute's value  for the element where class = item number of the selected element
  var duplicateItems = getAllDuplicateItems(itemInCollectionClass); //array of element with discover attribute on true
  duplicateItems.forEach(function (item) {
    $(item).removeClass('active');
  });
  $(duplicateItems[duplicateItems.length - 1]).addClass('active');
  if (isLastStillOfEachDiveActive()) {//check if we are on the part7 or part14
    checkAllTwinklesInLastStillOpened(); //update isAllTwinklesInLastActiveStillOpened value to true or false

    if (isAllItemInActiveDiveFound()) {
      $('.collection .dive-complete-message').show();
    } else {
      $('.collection .dive-incomplete-message').show();
    }
  }
}
function navigationKeyBoardSupport() {
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
        moveBackgroud('left');
        break;
      case 38:
        moveBackgroud('up');
        break;
      case 39:
        moveBackgroud('right');
        break;
      case 40:
        moveBackgroud('down');
        break;
    }
  };
}

/* function moveBackgroud(direction) {
  disableAllDescription();
  var videoElement = $('.page--wreck-diver .adventure .part.active .part-video');
  var topVideoPosition = parseInt(videoElement.css('top'));
  var leftVideoPosition = parseInt(videoElement.css('left'));
  var itemElements = $('.page--wreck-diver .adventure .part.active .part-item');
  var controlElement = $('.page--wreck-diver .adventure .control');
  var collectionElement = $('.page--wreck-diver .collection');
  var headerHeight = $('header').height();
  switch (direction) {
    case 'up':
      if (topVideoPosition < headerHeight) {
        videoElement.css('top', topVideoPosition + 10);
      }
      $.each(itemElements, function (index, itemElement) {
        var topItemPosition = parseInt($(itemElement).css('top'));
        if (topVideoPosition < headerHeight) {
          $(itemElement).css('top', topItemPosition + 10);
        }
        handlePopUpVerticalPosition(parseInt($(itemElement).css('top')), itemElement);
      });
      break;
    case 'down':
      if (Math.abs(topVideoPosition) < controlElement.height()) {
        videoElement.css('top', topVideoPosition - 10);
      }
      $.each(itemElements, function (index, itemElement) {
        var topItemPosition = parseInt($(itemElement).css('top'));
        if (Math.abs(topVideoPosition) < controlElement.height()) {
          $(itemElement).css('top', topItemPosition - 10);
        }
        handlePopUpVerticalPosition(parseInt($(itemElement).css('top')), itemElement);
      });
      break;
    case 'left':
      if (leftVideoPosition < 0) {
        videoElement.css('left', leftVideoPosition + 10);
      }
      $.each(itemElements, function (index, itemElement) {
        var leftItemPosition = parseInt($(itemElement).css('left'));
        if (leftVideoPosition < 0) {
          $(itemElement).css('left', leftItemPosition + 10);
        }
        if ($(itemElement).find('.onleft').length > 0) {
          //handlePopUpHorizonPosition(leftItemPosition, itemElement);
        }
      });
      break;
    case 'right':
      if (Math.abs(leftVideoPosition) < collectionElement.width()) {
        videoElement.css('left', leftVideoPosition - 10);
      }
      $.each(itemElements, function (index, itemElement) {
        var leftItemPosition = parseInt($(itemElement).css('left'));
        if (Math.abs(leftVideoPosition) < collectionElement.width()) {
          $(itemElement).css('left', leftItemPosition - 10);
        }
        if ($(itemElement).find('.onleft').length > 0) {
          //handlePopUpHorizonPosition(leftItemPosition, itemElement);
        }
      });
      break;
  }
} */

function activatePart(partSelector) {

  if(partSelector === '.part1'){ //hide the video tag
     $('#part1-video').attr("hidden", true);
  }

  if(partSelector === '.part8'){ //hide the video tag
    $('#part8-video').attr("hidden", true);
  }

  $('.part').removeClass('active');
  $(partSelector).addClass('active');
  if (partSelector === 'none' || $(partSelector).find('.part-video').length < 1) return;
  setVideoCurrentTime($(partSelector).find('.part-video').attr('id'), 0.1);
  renderDefaultItemsPositionInActivePart(partSelector);
  resetVideoPostionToTopLeft(partSelector);
  clearItemsStyle(partSelector);
}

function renderDefaultItemsPositionInActivePart(partSelector) {
  for (var itemSelector in itemsPartDefaultPosition[partSelector]) {
    $(itemSelector).attr('style', itemsPartDefaultPosition[partSelector][itemSelector]);
  }
}

function resetVideoPostionToTopLeft(partSelector) {
  $('.part-video', partSelector).removeAttr('style');
}

function clearItemsStyle(partSelector) {
  $('.part-item .description, .part-item .arrow, .part-item .twinkles, .part-item .twinkles img', partSelector).removeAttr('style');
}

function setVideoCurrentTime(videoId, certainSecond) {
  var video = document.getElementById(videoId);
  video.currentTime = certainSecond;
}

function activeItemsInAnActivatedPart() { // remove the active class from current part and add it to next part
  $('.part-item').removeClass('active');
  $('.mobile-item').removeClass('active');

  $('.part.active .video .part-item').addClass('active');
  $('.part.active .item-button-wrap .mobile-item').addClass('active');

  $('.part.active .video .part-item').each(function (index, element) {
    handlePopUpVerticalPosition(parseInt($(element).css('top')), element);
  });
}

function resetCollectionItemFoundInActivePart() {
  var diveNumber = $('.adventure').find('.part.active').attr('data-dive');
  $('.bag > div[data-dive="' + diveNumber + '"]').attr('discover', 'false');
      //.css('opacity', '0.4');
}

function isAllItemInActiveDiveFound() {
  var diveNumber = $('.adventure').find('.part.active').attr('data-dive');
  return $('.bag > div[data-dive="' + diveNumber + '"]').toArray().every(function (item) {
    return $(item).attr('discover') === 'true';
  });
}

function handlePopUpVerticalPosition(topItemPosition, itemElement) {
  var headerHeight = $('header').height();
  if ($(itemElement).find('.ontop').length > 0) {
    /*     if (topItemPosition <= headerHeight) {
          $('.description', itemElement).css('transform', 'translateY(' + ($(itemElement).height() - 30) + 'px)');
          $('.description .arrow', itemElement).css({
            top: '-4vh',
            bottom: 'unset',
            'border-left-color': 'transparent',
            'border-right-color': 'transparent',
            'border-bottom-color': 'inherit',
            'border-top-color': 'transparent'
          });
        } else { */
    $('.description', itemElement).css('transform', 'translateY(0)');
    $('.description .arrow', itemElement).css({
      top: 'unset',
      bottom: '-4vh',
      'border-left-color': 'transparent',
      'border-right-color': 'transparent',
      'border-bottom-color': 'transparent',
      'border-top-color': 'inherit'
    });
  } else if ($(itemElement).find('.onleft').length > 0) {
    if (topItemPosition <= headerHeight / 4) {
      $('.description', itemElement).css('transform', 'translate(calc(-50% - 7vh), ' + ($(itemElement).height() + 10) + 'px)');
      $('.description .arrow', itemElement).css({
        top: '-4vh',
        bottom: 'unset',
        transform: 'translateY(-50%)',
        left: 'calc(50%)',
        'border-left-color': 'transparent',
        'border-right-color': 'transparent',
        'border-bottom-color': 'inherit',
        'border-top-color': 'transparent'
      });
    } else if (topItemPosition + $(itemElement).height() >= window.innerHeight - $('.page--wreck-diver .adventure .continue').height() * 1.25) {
      $('.description', itemElement).css('transform', 'translateY(0)');
      $('.description .arrow', itemElement).css({
        top: 'unset',
        bottom: '-4vh',
        left: '50%',
        transform: 'translateX(-50%)',
        'border-left-color': 'transparent',
        'border-right-color': 'transparent',
        'border-bottom-color': 'transparent',
        'border-top-color': 'inherit'
      });
    } else {
      $('.description', itemElement).css('transform', 'translate(calc(-50% - 7vh), calc(50% - 6.5vh))');
      $('.description .arrow', itemElement).css({
        left: 'calc(100% + 2.3vh)',
        bottom: 'calc(50%)',
        transform: 'translate(-50%, 50%)',
        top: 'unset',
        'border-left-color': 'inherit',
        'border-right-color': 'transparent',
        'border-bottom-color': 'transparent',
        'border-top-color': 'transparent'
      });
    }
  } else if ($(itemElement).find('.onright').length > 0) {
    if (topItemPosition <= headerHeight / 2) {
      $('.description', itemElement).css('transform', 'translate(0, ' + ($(itemElement).height() + 20) + 'px)');
      $('.description .arrow', itemElement).css({
        top: '-4vh',
        bottom: 'unset',
        transform: 'translateX(-50%)',
        left: 'calc(50%)',
        right: 'unset',
        'border-left-color': 'transparent',
        'border-right-color': 'transparent',
        'border-bottom-color': 'inherit',
        'border-top-color': 'transparent'
      });
    } else if (topItemPosition + $(itemElement).height() >= window.innerHeight) {
      $('.description', itemElement).css('transform', 'translateY(' + ($(itemElement).height() - 30) + 'px)');
      $('.description .arrow', itemElement).css({
        top: 'unset',
        bottom: '-4vh',
        left: '50%',
        right: 'unset',
        transform: 'translateX(-50%)',
        'border-left-color': 'transparent',
        'border-right-color': 'transparent',
        'border-bottom-color': 'transparent',
        'border-top-color': 'inherit'
      });
    } else {
      $('.description', itemElement).css('transform', 'translate(calc(50% - 15vh), calc(-100% - 6vw))');
      $('.description .arrow', itemElement).css({
        'right': 'calc(100% + -2vh)',
        'left': 'unset',
        'bottom': 'calc(50%)',
        'transform': 'translate(-50%, 50%)',
        'border-right-color': 'inherit',
        'border-left-color': 'transparent',
        'border-bottom-color': 'transparent',
        'border-top-color': 'transparent'
      });
    }
  }
}

function handlePopUpHorizonPosition(leftItemPosition, itemElement) {
  if (leftItemPosition < 10) {
    $('.description', itemElement).css('transform', 'translateX(' + ($(itemElement).width() + 10) + 'px)');
  } else {
    $('.description', itemElement).css('transform', 'translateX(0)');
  }
}

function handlePopUpHorizonPosition(leftItemPosition, itemElement) {
  if (leftItemPosition > 80) {
    $('.description', itemElement).css('transform', 'translateX(' - ($(itemElement).width() - 10) + 'px)');
  } else {
    $('.description', itemElement).css('transform', 'translateX(0)');
  }
}

function getActiveDive() {
  return $('.part-journal').attr('data-dive');
}

function setActiveDive(activeDiveNumber) {
  $('.part-head-to-surface, .part-journal').attr('data-dive', activeDiveNumber);
}


function isLastStillOfEachDiveActive() {
  return ['part7', 'part14'].indexOf($('.adventure').find('.part.active').attr('name')) !== -1;
}

function checkAllTwinklesInLastStillOpened() {
  var dive = getActiveDive();
  if (dive === '1') {
    isAllTwinklesInLastActiveStillOpened = $('.bag div[data-dive=' + dive + '][part=7]').toArray().every(function (collectionItem) {
      return $(collectionItem).attr('discover') === 'true';
    });
  } else {
    isAllTwinklesInLastActiveStillOpened = $('.bag div[data-dive=' + dive + '][part=14]').toArray().every(function (collectionItem) {
      return $(collectionItem).attr('discover') === 'true';
    });
  }
}

/**
 * This function checks if one twickle was opened during a dive or not
 */
function checkOneTwinkleInDiveWasOpened() {
  let currentDive = getActiveDive();
  if (currentDive === '1' ){
    for (let i = 1 ; i < 8; i++){
      isOneTwinkleInDiveWasOpened = $('.bag div[data-dive=' + currentDive + '][part=' + i + ']').toArray().some(function (collectionItem) {
        return $(collectionItem).attr('discover') === 'true';
      });

      if (isOneTwinkleInDiveWasOpened) break;
    }
  }else {
    for (let i = 8 ; i < 15; i++){
      isOneTwinkleInDiveWasOpened = $('.bag div[data-dive=' + currentDive + '][part=' + i + ']').toArray().some(function (collectionItem) {
        return $(collectionItem).attr('discover') === 'true';
      });

      if (isOneTwinkleInDiveWasOpened) break;
    }
  }
}

// Slide-Outs
this.$slideOut = $('.collection');

// Collection Slideout show

function toggleCollectionTab(){
  let result = $(".collection").toggleClass('showCollection');
  if (result.hasClass('showCollection')){
    $(".journal").animate({right: '+=150px'});
  }else {
    $(".journal").animate({right: '-=150px'});
  }
}

this.$slideOut.find('.collectionTab').on('click', function () {
  toggleCollectionTab()
});

this.$slideOut.find('.bag-wrap').on('click', function () {
  toggleCollectionTab()
});

$(".collection").click(function (e) {
  e.preventDefault();
  e.stopPropagation();
  $('.showCollection').show();
});

$("video, .twinkles, .description, .journal").click(function () {
  $(".collection").removeClass('showCollection');
});

// Change help-text
$('.page--wreck-diver .help').on('click', function (event) {
  if ($('.part1').hasClass('active') && $('#add-on-help').length < 1) {
    $('#help-content').append("<span id='add-on-help'><em>Look for 2 artifacts at this location.</em></span>");
  } else if ($('.part2').hasClass('active') && $('#add-on-help').length < 1) {
   $('#help-content').append("<span id='add-on-help'><p><em>Look for 4 artifacts at this location.</em></p></span>");
  } else if ($('.part3').hasClass('active') && $('#add-on-help').length < 1) {
   $('#help-content').append("<span id='add-on-help'><p><em>Look for 3 artifacts at this location.</em></p></span>");
  } else if ($('.part4').hasClass('active') && $('#add-on-help').length < 1) {
   $('#help-content').append("<span id='add-on-help'><p><em>Look for 3 artifacts at this location.</em></p></span>");
  } else if ($('.part5').hasClass('active') && $('#add-on-help').length < 1) {
   $('#help-content').append("<span id='add-on-help'><p><em>Look for 2 artifacts at this location.</em></p></span>");
  } else if ($('.part6').hasClass('active') && $('#add-on-help').length < 1) {
   $('#help-content').append("<span id='add-on-help'><p><em>Look for 4 artifacts at this location.</em></p></span>");
  } else if ($('.part7').hasClass('active') && $('#add-on-help').length < 1) {
   $('#help-content').append("<span id='add-on-help'><p><em>Look for 3 artifacts at this location.</em></p></span>");
  } else if ($('.part8').hasClass('active')) {
   $('#help-content').html("<p>This is your second dive on the wreck of the George A. Marsh. You will be exploring from the stern (the back) of the wreck to the bow (the front).</p><span id='add-on-help'><p><em>Look for 1 artifact at this location.</em></p></span>");
  } else if ($('.part9').hasClass('active') && $('#add-on-help').length < 1) {
   $('#help-content').append("<span id='add-on-help'><p><em>Look for 3 artifacts at this location.</em></p></span>");
  } else if ($('.part10').hasClass('active') && $('#add-on-help').length < 1) {
   $('#help-content').append("<span id='add-on-help'><p><em>Look for 2 artifacts at this location.</em></p></span>");
  } else if ($('.part11').hasClass('active') && $('#add-on-help').length < 1) {
   $('#help-content').append("<span id='add-on-help'><p><em>Look for 4 artifacts at this location.</em></p></span>");
  } else if ($('.part12').hasClass('active') && $('#add-on-help').length < 1) {
   $('#help-content').append("<span id='add-on-help'><p><em>Look for 1 artifact at this location.</em></p></span>");
  } else if ($('.part13').hasClass('active') && $('#add-on-help').length < 1) {
   $('#help-content').append("<span id='add-on-help'><p><em>Look for 3 artifacts at this location.</em></p></span>");
  } else if ($('.part14').hasClass('active') && $('#add-on-help').length < 1) {
   $('#help-content').append("<span id='add-on-help'><p><em>Look for 1 artifact at this last location.</em></p></span>");
  }
  if ($('.part8').hasClass('active')) {
    $('.page--wreck-diver #main-content > .content > div > aside > h3').html("Your Second Dive");
  }
});
$('.page--wreck-diver .help-popup > button.close-menu').on('click', function (event) {

  if ($('.part').hasClass('active')) {
    $('#add-on-help').remove();

    $(".collection").removeClass('showCollection');
  }
});