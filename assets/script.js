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
