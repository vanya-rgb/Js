const fetch = require('node-fetch')

module.exports = async function(ip) {
    
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
    var token = "bbc1701e1d770fa8ebfb3cf0c6cd9b5adeff902a";
    var query = `${ip}`;

    var options = {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
        }
    }

    var response = await fetch(url + query, options)
    var jsonData = await response.json()

    try{
        var city = jsonData.location.data.city
        var lat = jsonData.location.data.geo_lat
        var lon = jsonData.location.data.geo_lon
        //console.log(city, lat, lon)
        return {
            city: city,
            lat: lat,
            long: lon
        }
    }
    catch(error){
        console.log(error)
        return {
            city: null,
            lat: null,
            long: null
        }
    }
}

