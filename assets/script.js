console.log("hello world");

var apiCovid = function(){
    var apiUrl = "https://api.covid19tracking.narrativa.com/api/2020-03-22/country/spain"

    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    console.log(data);
                })
            }
        })

        .catch(function(){
            alert("test")
        });

};