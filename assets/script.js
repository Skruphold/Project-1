console.log("hello world");

var tmAPIkey = "j6vHekkc5X8bANXHOmkGTl9eTugoLWGi"

function getLocation () {
    var tmURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + tmAPIkey;

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


