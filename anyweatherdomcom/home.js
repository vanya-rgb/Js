var express = require('express');
const maxmind = require('maxmind');
const weatherRequest = require('./requests/weather.request')
const yanInfo = require('./requests/yandex.request');
var router = express.Router();
const mysql = require("mysql2");
const detranslator = require('./detranslator')
const mailInfo = require('./requests/mail.request')
const yanCoord = require('./getCoord')
const cityByIp = require('./getLocation.js')

const connection = mysql.createConnection({
    host: "95.213.236.125",
    user: "user",
    database: "cities",
    password: "pass"
})

connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });

router.get('/', async(req,res) => {

    var city = async () => {
        
        if (req.cookies.city != null){
            var city = req.cookies.city;
            var lat = req.cookies.lat
            var long = req.cookies.long
            console.log('Считали куки!')
            return {
                cityCookie:city,
                lat:lat,
                long:long
            }
        }
        else{
            try{
                var clientIp1 = req.ipInfo.ip
                console.log("client Ip = ", clientIp1)
                var clientIp1 = "37.220.182.81"

                //поиск по базе ip
                connection.query(`SELECT * FROM ip_info WHERE ip = '${clientIp1}'`, async function(err, results){
                    if (results.length == 0) {
                        connection.query(`INSERT INTO ip_info(ip, dateUpdate, dateCreate, accessCount) VALUES('${clientIp1}', NOW(), NOW(), 0)`, (err, results) => {
                            if (err) console.log(err)
                            console.log("Внесли в базу ip в пост запросе!")
                        })
                    }
                    else {
                        var accessCount = results[0].accessCount + 1
                        connection.query(`UPDATE ip_info SET accessCount = ${accessCount}, dateUpdate = NOW() WHERE ip = '${clientIp1}'` , (err, results) => {
                            if (err) console.log(err)
                            console.log("обновили accessCount!")
                        })
                    }
                })

                var {city, lat, long, org, timeZone} = await cityByIp(clientIp1)

                //поиск по базе данных городов
                connection.query(`SELECT * FROM mytable1 WHERE nameOfCity = '${city}'`, async function(err, results) {

                    //если города раньше не было в базе
                    if (results.length == 0) {
                        
                        connection.query(`INSERT INTO mytable1(nameOfCity, latitude, longitude, dateCreate, dateUpdate, accessCount, org, time_zone) VALUES('${city}', ${lat}, ${long}, NOW(), NOW(), 0, '${org}', '${timeZone}')`, (err, results) => {
                            if (err) console.log(err)
                            console.log("Внесли в базу в пост запросе!")
                        })
                    }
                })

                //отправка кукисов
                res.cookie('city', city)
                res.cookie('lat', lat)
                res.cookie('long', long)
                return {
                    cityCookie: city,
                    lat: lat,
                    long: long
                }
            }
            catch(error){
                console.log(error)
                city = 'Екатеринбург'
                lat = 56.83801
                long = 60.5974
                return {
                    cityCookie: city,
                    lat: lat,
                    long: long
                }
            }     
        }
    }

    var {cityCookie, lat, long} = await city()

    cityLower = cityCookie.toLocaleLowerCase()

    console.log("НАш город:", cityCookie)
    console.log("широта и долгота:", lat, long)
 
    //язык в браузере
    // var clientLang = JSON.stringify(req.headers["accept-language"]
    // .substr(0, 2));
    
    //парсинг по текущему положению
    const {opentempofWeek1,opentempofWeek2,opentempofWeek3,opentempofWeek4,opentempofWeek5,opentempofWeek6,opentempofWeek7,opentempofNight1,opentempofNight2,opentempofNight3,opentempofNight4,opentempofNight5,opentempofNight6,opentempofNight7,timezone,openTemp,openType,openWind,openPressure,openHumidity,lsVisible,error} = await weatherRequest(lat, long);

    const {dayofWeek1,dayofWeek2,dayofWeek3,dayofWeek4,dayofWeek5,dayofWeek6,dayofWeek7,dayofWeek8,tempofDay1,tempofDay2,tempofDay3,tempofDay4,tempofDay5,tempofDay6,tempofDay7,tempofNihgt1,tempofNihgt2,tempofNihgt3,tempofNihgt4,tempofNihgt5,tempofNihgt6,tempofNihgt7,weatherYan,mainYan,windYan,pressureYan,humidityYan,lsVisibleYan,cityYan,errorYan} = await yanInfo(lat, long)

    const {mailtempofDay1,mailtempofDay2,mailtempofDay3,mailtempofDay4,mailtempofDay5,mailtempofDay6,mailtempofDay7,mailtempoNight1,mailtempoNight2,mailtempoNight3,mailtempoNight4,mailtempoNight5,mailtempoNight6,mailtempoNight7,tempMailNow,typeMailNow,pressureMailNow,humidityMailNow,windMailNow,isVisibleMail} = await mailInfo(cityLower)
    
    var citytoRender = cityYan ? cityYan : cityCookie

    res.render('templateEn', {citytoRender,opentempofWeek1,opentempofWeek2,opentempofWeek3,opentempofWeek4,opentempofWeek5,opentempofWeek6,opentempofWeek7,opentempofNight1,opentempofNight2,opentempofNight3,opentempofNight4,opentempofNight5,opentempofNight6,opentempofNight7,timezone,openTemp,openType,openWind,openPressure,openHumidity,lsVisible,error,weatherYan,mainYan,windYan,pressureYan,humidityYan,lsVisibleYan,errorYan,tempofDay1,tempofDay2,tempofDay3,tempofDay4,tempofDay5,tempofDay6,tempofDay7,tempofNihgt1,tempofNihgt2,tempofNihgt3,tempofNihgt4,tempofNihgt5,tempofNihgt6,tempofNihgt7,dayofWeek1,dayofWeek2,dayofWeek3,dayofWeek4,dayofWeek5,dayofWeek6,dayofWeek7,dayofWeek8,mailtempofDay1,mailtempofDay2,mailtempofDay3,mailtempofDay4,mailtempofDay5,mailtempofDay6,mailtempofDay7,mailtempoNight1,mailtempoNight2,mailtempoNight3,mailtempoNight4,mailtempoNight5,mailtempoNight6,mailtempoNight7,tempMailNow,typeMailNow,pressureMailNow,humidityMailNow,windMailNow,isVisibleMail})
   
})

module.exports = router;