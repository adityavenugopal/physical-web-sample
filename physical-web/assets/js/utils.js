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

  $('#getPnrBtn').on('click',function(){
    getPnr(this);
  });

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

function getPnr(){
  $('.inner-loader').show();
  pnrNumber = $('.pnr-field').val();
  $.ajax({
    url: "http://api.railwayapi.com/pnr_status/pnr/"+pnrNumber+"/apikey/mrlwu2728/",
    type: "get",
    success: function(response) {

      if(response.error == false){
        insertPnrContent(response);
        $('.inner-loader').fadeOut(300);
      }
      else{
        $('.inner-loader').fadeOut(300);
        $('.pnr-form .error-msg').slideDown(1000).delay(3000).slideUp(1000);
      }
    },
    error: function(xhr) {
      console.log(xhr);
      $('.inner-loader').fadeOut(300);
    }
  });
}

function insertPnrContent(data){

  var index = 0;
  var passengers_count = 0;

  passengers = data.total_passengers;
  journey_details = [data.train_num,data.doj,data.from_station.code,data.to_station.code,data.reservation_upto.code,data.boarding_point.code,data.class];

  $('.pnr-train-name').html(data.train_name);

  $('.pnr-journey-body .panel-elem-val').each(function(){
    $(this).html(journey_details[index]);
    index++;
  });

  passenger_details = data.passengers;
  passengers_temp = $('.passenger-details-wrap');

  for(j=0; j<(passengers-1); j++){
    passengers_temp.append(passengers_temp.html());
  }

  $('.passenger-details').each(function(){
    $(this).find('.panel-title').html('Passenger '+(passengers_count+1));
    $(this).find('.prev-status').html(passenger_details[passengers_count].booking_status);
    $(this).find('.crnt-status').html(passenger_details[passengers_count].current_status);
    passengers_count++;
  });
}
