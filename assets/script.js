// console.log("hello world"); tested script file

// astablishing main variables
var locationInput = $("#location");
var eventInput = $("#eventInput");
var concertsEl = $("#concert");
var sportsEl = $("#sports");
var attractionsEl = $("#attractions");
var submitBtn = $("#submitBtn");
var resultsPage = $("#resultsPage");
var searchPage = $("#searchPage")

// Hunter's api key
var tmAPIkey = "j6vHekkc5X8bANXHOmkGTl9eTugoLWGi"


// Creating a event listener to the submit button that call's on our api call's and empty the inputed text.
submitBtn.on("click", function(event) {
    event.preventDefault();
    var locationValue = locationInput.val().trim();
    var eventValue = eventInput.val().trim();
    getLocation(locationValue, eventValue);
    apiCovid();
    locationInput.val("");
    // console.log(eventValue);
})

// made a function to call on an api based on the user inputed values that displays our response in the console. 
function getLocation (locationValue, eventValue) {
    // var tmURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + tmAPIkey;
    var tmURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=" + eventValue + "&city=" + locationValue + "&apikey=" + tmAPIkey;
    resultsPage.removeAttr('id', 'resultsPage');
    searchPage.attr('id', 'resultsPage');

    fetch(tmURL)
        .then(function(response){
            if (response.ok){
               response.json().then(function(data){
                    console.log(data);
                })
                }
        // catching any errors
        })
        .catch(function(){
            alert("error");
        })

}

// Calling on getLocation
getLocation();

var stateInput = $("#state")

var apiCovid = function(){


    // var stateValue = stateInput.val().trim();

   

    var apiUrl = "https://api.covid19tracking.narrativa.com/api/2022-01-04/country/US/region/Minnesota";


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


