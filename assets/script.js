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
// var locationValue = locationInput.val().trim();
// var eventValue = eventInput.val().trim();
// var resultsTable = $("#resultsPage");

// Hunter's api key
var tmAPIkey = "j6vHekkc5X8bANXHOmkGTl9eTugoLWGi"

// Creating a event listener to the submit button that call's on our api call's and empty the inputed text.
submitBtn.on("click", function(event) {
    event.preventDefault();
    var locationValue = locationInput.val().trim();
    var eventValue = eventInput.val().trim();
    // if (locationValue==="") {
    //     return;
    // } else if (stateValue===""){
    //     return;
    // } else {
        resultsPage.removeAttr('id', 'resultsPage');
        searchPage.attr('id', 'resultsPage');
        getLocation(locationValue, eventValue);
        apiCovid();
        // recentStorage();
        locationInput.val("");
        
    // }
    // console.log(eventValue);
})

// pressing enter will also populate the page.
$(document).on('keypress', function(e) {
    if(e.which == 13) {
        submitBtn.click();
        e.preventDefault();
    }
})

// made a function to call on an api based on the user inputed values that displays our response in the console. 
function getLocation (locationValue, eventValue) {
    var tmURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=" + eventValue + "&city=" + locationValue + "&apikey=" + tmAPIkey;
    var stateValue = stateInput.val().trim();
    searchList.push({locationValue, stateValue, eventValue});
    localStorage.setItem("search", JSON.stringify(searchList));

    // var savedData= JSON.parse(localStorage.getItem("search"));
    // console.log(savedData);

    fetch(tmURL)
        .then(function(response){
            if (response.ok){
               response.json().then(function(data){
                    console.log(data);
                    //added a for loop through the list of events and appending the events on the html page.
                    for( var i = 0; i < data._embedded.events.length; i++) {
                    var tableBody= document.createElement("tbody");
                    var newEntry = document.createElement("tr");
                    // var city = document.createElement("td");
                    var eventName=data._embedded.events[i].name;
                   
                    // city.textContent=locationValue;
                    // $(newEntry).append(city);
                    var eventDate= document.createElement("td");
                    var dateTime=data._embedded.events[i].dates.start.localDate;
                    eventDate.textContent=dateTime;
                    $(newEntry).append(eventDate);
                    
                    var link = document.createElement("td");
                    var hrefurl = data._embedded.events[i].url;
                    var anchor = document.createElement("a");

                    $(anchor).attr("href", hrefurl );
                    $(anchor).attr("target", "_blank" );
                    anchor.textContent= eventName;

                    $(link).append(anchor);
                    $(newEntry).append(link);
                    
                    var venue=document.createElement("td");
                    var venuelocation=data._embedded.events[i]._embedded.venues[0].name;
                    venue.textContent=venuelocation
                    $(newEntry).append(venue);

                    $(tableBody).append(newEntry);  
                    $("#tmResults").append(tableBody);
                
                    }
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

var stateInput = $("#state");
// var stateValue = stateInput.val().trim();

var apiCovid = function(){

    var stateValue = stateInput.val().trim();
    // stateValue and grabs the input from input tag with id="state"

    var rightNow = moment().format('YYYY-MM-DD');
    // rightNow gives current day in the format for url to work
    console.log(rightNow);

    var apiUrl = "https://api.covid19tracking.narrativa.com/api/" + rightNow + "/country/US/region/" + stateValue;
    console.log(apiUrl);

    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    var covidData = data.dates[rightNow].countries.US.regions[0];
                    console.log(data);
                    console.log(covidData);
                    

                    var tableBody= document.createElement("tbody");
                    var newEntry = document.createElement("tr");
                    var newConfirmed = document.createElement("td");

                    var stateName = document.createElement("td");
                    stateValue=stateValue.charAt(0).toUpperCase()+stateValue.slice(1);
                    stateName.textContent = stateValue;
               
                    $(newEntry).append(stateName);
                    var todayconfirmedData = covidData.today_new_confirmed;
                    newConfirmed.textContent = todayconfirmedData;
                    var allTimeConfirmed = covidData.today_confirmed;
                    var allTime = document.createElement("td");
                    allTime.textContent = allTimeConfirmed;
                    $(newEntry).append(newConfirmed);
                    $(newEntry).append(allTime);
                    $(tableBody).append(newEntry);
                    $("#resultsTable").append(tableBody);
                    console.log(tableBody);
                    console.log(todayconfirmedData);
                })
            }
        })
};

//empty array  for storage
var searchStore = $('#search-history');
var searchList = JSON.parse(localStorage.getItem("search"));
if(searchList === null){
    var searchList = [];
};


function initialStore() {
    for (let i=0; i<searchList.length; i++) {
        var previouslist =document.createElement("ul");
        
        var listEntries =document.createElement("li");
        $(listEntries).attr("class", "history-btn");
        var searchedCity =JSON.stringify(searchList[i].locationValue).replace(/^"|"$/g, '');
        var searchedState =JSON.stringify(searchList[i].stateValue).replace(/^"|"$/g, '');
        var searchedEvent =JSON.stringify(searchList[i].eventValue).replace(/^"|"$/g, '');
       
        listEntries.textContent= "City: " + searchedCity.charAt(0).toUpperCase()+ searchedCity.slice(1) + " State: " + searchedState.charAt(0).toUpperCase()+ searchedState.slice(1) + " Event Type: " +searchedEvent;
        $(previouslist).append(listEntries);
        $(searchStore).append(previouslist);
        searchStore.on("click", "li.history-btn", function () {
            getLocation(searchedCity, searchedEvent);
            apiCovid(searchedState);
            resultsPage.removeAttr('id', 'resultsPage');
            searchPage.attr('id', 'resultsPage');
        })
    }
}

initialStore();

