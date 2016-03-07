var scrollArea = $('.header-tab-bar');
var toScroll = $('.header-tab-bar ul li');


$(window).load(function(){
  $('.loader').fadeOut(300);
  $('body').removeClass('notLoaded');
});

$(document).ready(function(){
  fixedHeader();
  bookmark();
  switchTabs();
  scrollTab();
});

function bookmark(){
  var click = 0;
  var $elem = $("#bookmark i");
  $('#bookmark').on('click',function(){
    click++;
    if(click%2==1){
      $elem.removeClass('icon-bookmark-empty');
      $elem.addClass('icon-bookmark');
    }
    else{
      $elem.removeClass('icon-bookmark');
      $elem.addClass('icon-bookmark-empty');
    }
  });
}

function switchTabs(){
  $('.header-tab-bar ul li').on('click',function(){
    $('.active-tab').removeClass('active-tab');
    $(this).addClass('active-tab');
  });
}

function scrollTab() {
    toScroll.each(function() {
        var self = $(this);
        $(this).on('click', function () {
            scrollArea.scrollLeft()
            var leftOffset = self.offset().left - scrollArea.offset().left +    scrollArea.scrollLeft();
            scrollArea.animate({ scrollLeft: leftOffset });
        });
    });
};

function fixedHeader(){
  var headerHt = $('header').innerHeight();
  $('.contentWrap').css('padding-top',headerHt);
}
