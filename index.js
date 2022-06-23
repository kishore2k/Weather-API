  var randomNum = Math.floor(Math.random()*3)+1;
  var img = "images/img"+randomNum+".jpg";
  // $('body').css('background-image','url('+ img +')');
  $('body').attr('style','background-image : url('+img+')');

  $(".flex .btn").on("click",function(){
    weather.search();
  });

  $(document).on("keypress",function(event)
{
  if(event.key==="Enter")
  {
    weather.search();
  }
});

  let weather = {
    "apikey" : "9c57ee325f71c2ce074a73659ae5c7fd",
    fetchWeather : function(city){
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="
        +city
        +"&units=metric&appid="
        +this.apikey
      )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
   },
   displayWeather : function(data){
     const {name} =data;
     const {icon,description} = data.weather[0];
     const {temp,humidity} = data.main;
     const {speed} = data.wind;
     const {temp_min,temp_max}= data.main;
     const {all} = data.clouds;
     console.log(name,icon,description,temp,humidity,speed,temp_min,temp_max);
     $("div").removeClass("visible");
     $("img").removeClass("visible");
     $(".card").css("border-radius","15%")
     $(".city").html("Weather in "+name);
     $(".temp h1").html(temp+"°C");
     $(".icon").attr('src',"http://openweathermap.org/img/wn/"+icon+"@2x.png");
     $(".description").html("<h2>"+description+"<h2>");
     $(".humidity").html("Humidity : "+humidity+"%");
     $(".windspeed").html("WindSpeed : "+speed+" m/sec")
     $(".temp-range").html("<h5>"+"Temperature Range : "+temp_min+"°C - "+temp_max+"°C"+"<h5>");;
   },
   search: function(){
     this.fetchWeather($(".search-bar").val());
   }

};
