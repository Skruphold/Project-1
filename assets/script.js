// console.log("hello world"); tested script file

// astablishing main variables
var locationInput = $("#location");
var eventInput = $("#eventInput");
var concertsEl = $("#concert");
var sportsEl = $("#sports");
var attractionsEl = $("#attractions");
var submitBtn = $("#submitBtn");
var resultsPage = $("#resultsPage");
var searchPage = $("#searchPage");
// var resultsTable = $("#resultsPage");

// Hunter's api key
var tmAPIkey = "j6vHekkc5X8bANXHOmkGTl9eTugoLWGi"


// Creating a event listener to the submit button that call's on our api call's and empty the inputed text.
submitBtn.on("click", function(event) {
    event.preventDefault();
    var locationValue = locationInput.val().trim();
    var eventValue = eventInput.val().trim();
    resultsPage.removeAttr('id', 'resultsPage');
    searchPage.attr('id', 'resultsPage');
    getLocation(locationValue, eventValue);
    apiCovid();
    locationInput.val("");
    // console.log(eventValue);
})

// made a function to call on an api based on the user inputed values that displays our response in the console. 
function getLocation (locationValue, eventValue) {
    // var tmURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + tmAPIkey;
    var tmURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=" + eventValue + "&city=" + locationValue + "&apikey=" + tmAPIkey;
    fetch(tmURL)
        .then(function(response){
            if (response.ok){
               response.json().then(function(data){
                    console.log(data);
                var tableBody= document.createElement("tbody");
                var newEntry = document.createElement("tr");
                var city = document.createElement("td");
                console.log(data._embedded.events[1].name);
                city.textContent=locationValue;
                $(newEntry).append(city);
                $(tableBody).append(newEntry);
               
                $("#resultsTable").append(tableBody);
                // newEntry.append(artist);
                // table.append(newEntry);



                })
                }
        // catching any errors
        })
        .catch(function(){
            alert("error");
        })

}

// Calling on getLocation
// getLocation();

var stateInput = $("#state")

var apiCovid = function(){

    var stateValue = stateInput.val().trim();

    var rightNow = moment().format('YYYY-MM-DD');
    console.log(rightNow);

    var apiUrl = "https://api.covid19tracking.narrativa.com/api/" + rightNow + "/country/US/region/washington";


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


