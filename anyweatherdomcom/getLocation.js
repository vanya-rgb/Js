const fetch = require('node-fetch')

module.exports = async function(ip) {
    
    var url = "http://ipwhois.app/json/"+ip;

    var options = {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        }
    }

    var response = await fetch(url, options)
    var jsonData = await response.json()

    try{
        //console.log(jsonData)
        var city = jsonData.city
        var lat = jsonData.latitude
        var long = jsonData.longitude
        var org = jsonData.isp
        var timeZone = jsonData.timezone_gmt
        //console.log(city, lat, long, org, timeZone)
        return {
            city: city,
            lat: lat,
            long: long,
            org: org,
            timeZone: timeZone
        }
        
    }
    catch(error){
        console.log(error)
        return {
            city: null,
            lat: null,
            long: null,
            org: null,
            timeZone: null
        }
        
    }
}