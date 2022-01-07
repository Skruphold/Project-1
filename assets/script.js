// establishing main variables
var stateInput = $("#state");
var locationInput = $("#location");
var eventInput = $("#eventInput");
var concertsEl = $("#concert");
var sportsEl = $("#sports");
var attractionsEl = $("#attractions");
var submitBtn = $("#submitBtn");
var resultsPage = $("#resultsPage");
var searchPage = $("#searchPage");


var searchStore = $('#search-history');
var noDup = JSON.parse(localStorage.getItem("search"));
var searchList = [];
console.log(searchList);
if(searchList === null){
    var searchList = [];
    var noDup = Array.from(searchList.reduce((map, obj) => map.set(obj.locationValue, obj), new Map()).values());
};

// var noDup = Array.from(searchList.reduce((map, obj) => map.set(obj.locationValue, obj), new Map()).values());

// Hunter's api key
var tmAPIkey = "j6vHekkc5X8bANXHOmkGTl9eTugoLWGi"

// Creating a event listener to the submit button that call's on our api call's and empty the inputed text.
submitBtn.on("click", function(event) {
    event.preventDefault();
    var locationValue = locationInput.val().trim();
    var eventValue = eventInput.val().trim();
    var stateValue = stateInput.val().trim();
    if (locationValue==="") {
        return;
    } else if (stateValue===""){
        return;
    } else {
        getLocation(locationValue, eventValue, stateValue);
        apiCovid(stateValue);
        // recentStorage();
        locationInput.val("");
        stateInput.val("");
    }
    localStorage.setItem("search", noDup);
})

// pressing enter will also populate the page.
$(document).on('keypress', function(e) {
    if(e.which == 13) {
        submitBtn.click();
        e.preventDefault();
    }
})

// made a function to call on an api based on the user inputed values that displays our response in the console. 
function getLocation (locationValue, eventValue, stateValue) {
    var tmURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=" + eventValue + "&city=" + locationValue + "&apikey=" + tmAPIkey + "&sort=date,asc";

    fetch(tmURL)
        .then(function(response){
            if (response.ok){
               response.json().then(function(data){
                    console.log(data);
                    if(data._embedded){
                        resultsPage.removeAttr('id', 'resultsPage');
                        searchPage.attr('id', 'resultsPage');
                        // alert("not a city!")
                        for( var i = 0; i < data._embedded.events.length; i++) {
                            var tableBody= document.createElement("tbody");
                            var newEntry = document.createElement("tr");
                            var eventName=data._embedded.events[i].name;
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

                            searchList.push({locationValue, stateValue, eventValue});
                            // localStorage.setItem("search", JSON.stringify(searchList));
                            }
                    } else {
                        alert("not a city!")
                        // searchList.pop();
                        searchList.pop();
                    }
                    console.log(searchPage.attr("id"));
                    if(searchPage.attr("id") === resultsPage){
                        alert("error 4324!");
                        // searchList.splice(-1,1);
                        // searchList.pop();
                        // searchList.push({locationValue, stateValue, eventValue});
                        // localStorage.setItem("search", JSON.stringify(searchList));
                     } 
                     else {
                        //  alert("error 3123!");
                        // searchList.push({locationValue, stateValue, eventValue});
                        // localStorage.setItem("search", JSON.stringify(searchList));
                     }
                    //  localStorage.setItem("search", JSON.stringify(searchList));
                     searchList.push({locationValue, eventValue, stateValue});
                     var noDup = Array.from(searchList.reduce((map, obj) => map.set(obj.locationValue+obj.stateValue+obj.eventValue, obj), new Map()).values());
                     console.log(noDup);
                     localStorage.setItem("search", JSON.stringify(noDup));
                })
            }
        // catching any errors
        })
        .catch(function(){
            alert("error");
        })
}

var apiCovid = function(stateValue){

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
                    console.log(covidData.id);
                    if(stateValue.replace(" ", "_") === covidData.id){

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
                    } else {
                        alert("not a state!")
                        console.log(stateValue.replace(" ", "_"));
                        console.log(covidData.id);
                    };
                })
            }
        })
};

searchStore.on("click", "li.history-btn", function (event) {
    var userCity = $(event.target).attr('data-city');
    var userState = $(event.target).attr('data-state');
    var userEvent = $(event.target).attr('data-event');
    getLocation(userCity, userEvent, userState);
    apiCovid(userState);
});


// function initialStore() {
//     for (let i=0; i<searchList.length; i++) {
//         var previouslist =document.createElement("ul");
        
//         const listEntries =document.createElement("li");
//         $(listEntries).attr("class", "history-btn");
//         var searchedCity =JSON.stringify(searchList[i].locationValue).replace(/^"|"$/g, '');
//         var searchedState =JSON.stringify(searchList[i].stateValue).replace(/^"|"$/g, '');
//         var searchedEvent =JSON.stringify(searchList[i].eventValue).replace(/^"|"$/g, '');
//         $(listEntries).attr("data-city", searchedCity);
//         $(listEntries).attr("data-state", searchedState);
//         $(listEntries).attr("data-event", searchedEvent);
       
//         function capitalize(searchedState) {
//             return searchedState.charAt(0).toUpperCase() + searchedState.slice(1);
//         };
//         function capitalize(searchedCity) {
//             return searchedCity.charAt(0).toUpperCase() + searchedCity.slice(1);
//         };
//         listEntries.textContent= "City: " + searchedCity.split(' ').map(capitalize).join(' ') + " State: " + searchedState.split(' ').map(capitalize).join(' ') + " Event Type: " +searchedEvent;
//         $(previouslist).append(listEntries);
//         $(searchStore).append(previouslist);
//     }
// }
function initialStore() {
    for (let i=0; i<noDup.length; i++) {
        var previouslist =document.createElement("ul");
        
        const listEntries =document.createElement("li");
        $(listEntries).attr("class", "history-btn");
        var searchedCity =JSON.stringify(noDup[i].locationValue).replace(/^"|"$/g, '');
        var searchedState =JSON.stringify(noDup[i].stateValue).replace(/^"|"$/g, '');
        var searchedEvent =JSON.stringify(noDup[i].eventValue).replace(/^"|"$/g, '');
        $(listEntries).attr("data-city", searchedCity);
        $(listEntries).attr("data-state", searchedState);
        $(listEntries).attr("data-event", searchedEvent);
       
        function capitalize(searchedState) {
            return searchedState.charAt(0).toUpperCase() + searchedState.slice(1);
        };
        function capitalize(searchedCity) {
            return searchedCity.charAt(0).toUpperCase() + searchedCity.slice(1);
        };
        listEntries.textContent= "City: " + searchedCity.split(' ').map(capitalize).join(' ') + " State: " + searchedState.split(' ').map(capitalize).join(' ') + " Event Type: " +searchedEvent;
        $(previouslist).append(listEntries);
        $(searchStore).append(previouslist);
    }
}

// var myIndex = 0;
// carousel();

// function carousel() {
//   var i;
//   var x = document.getElementsByClassName("mySlides");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";  
//   }
//   myIndex++;
//   if (myIndex > x.length) {myIndex = 1}    
//   x[myIndex-1].style.display = "block";  
//   setTimeout(carousel, 5000); // Change image every 2 seconds
// }

initialStore();


