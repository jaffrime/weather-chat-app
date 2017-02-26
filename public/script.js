// $(document).ready(function(){ // just to refresh
$('#searchbtn').on('click', function(){
  var citySearch = $('#searchVal').val();
  $('#searchVal').val("");
  $.ajax({
    method: "GET",
    // http://api.openweathermap.org/data/2.5/weather?q={city name},{country code}
    // &appid=3cd94b4dd9f9500379beff57f6c3b579
    // url: "http://api.openweathermap.org/data/2.5/weather?q=telaviv&appid=3cd94b4dd9f9500379beff57f6c3b579",
    url: "http://api.openweathermap.org/data/2.5/weather?q="+citySearch+"&appid=3cd94b4dd9f9500379beff57f6c3b579",
    dataType: "json",
    success: function(data) {
      console.log(data);
      displayData(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  })
});

var displayData = function(data) {
  var source = $('#weather-template').html();
  var template = Handlebars.compile(source);

  var cityData = {
    city: data.name,
    tempK: data.main.temp,
      tempC: Math.round(data.main.temp - 273.15),
      tempF: Math.round(data.main.temp * (9/5) - 459.67),
    requestTime: new Date()
  };
  // console.log(city + " C: " + tempC + " F: " + tempF);
  // console.log(requestTime);

  var newHTML = template(cityData);
  $('.weather-display').append(newHTML);

};

$('.weather-display').on('click', '.trashBtn', function(){
  $(this).closest('.weatherData').remove();
});

$('.weather-display').on('click', '.commentBtn', function(){
  var comment = $(this).closest('.comments-input').find('.commentVal').val();
  $(this).closest('.weatherData').find('.comments-section').append('<p>'+comment+'</p>');
  $(this).closest('.comments-input').find('.commentVal').val("");
});
