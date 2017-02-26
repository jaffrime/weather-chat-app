$('#searchbtn').on('click', function(){
  $.ajax({
    method: "GET",
    // http://api.openweathermap.org/data/2.5/weather?q={city name},{country code}
    // &appid=3cd94b4dd9f9500379beff57f6c3b579
    url: "http://api.openweathermap.org/data/2.5/weather?q=telaviv&appid=d703871f861842b79c60988ccf3b17ec",
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
