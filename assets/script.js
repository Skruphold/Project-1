console.log("hello world");

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

        .catch(function(){
            alert("test")
        });

};

apiCovid();

