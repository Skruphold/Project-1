console.log("hello world");

var locationInput = $("#location");
var eventInput = $("#eventInput");
var concertsEl = $("#concert");
var sportsEl = $("#sports");
var attractionsEl = $("#attractions");
var submitBtn = $("#submitBtn");

var tmAPIkey = "j6vHekkc5X8bANXHOmkGTl9eTugoLWGi"

submitBtn.on("click", function(event) {
    event.preventDefault();
    var locationValue = locationInput.val().trim();
    getLocation(locationValue);
})

function getLocation (locationValue) {
    // var tmURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + tmAPIkey;
    var tmURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=" + locationValue + "&apikey=" + tmAPIkey;

    fetch(tmURL)
        .then(function(response){
            if (response.ok){
               response.json().then(function(data){
                    console.log(data);
                })
                }
        })
  .catch(function(){
      alert("test");
        })
}
getLocation();

var apiCovid = function(){
    var apiUrl = "https://api.covid19tracking.narrativa.com/api/2022-01-04/country/us/region/minnesota"

    fetch(apiUrl)
        .then(function(response){
            if(response.ok){

                response.json().then(function(data){
                    console.log(data);
                })
            }
        })
};
apiCovid();


