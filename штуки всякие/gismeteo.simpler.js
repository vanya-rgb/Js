const cheerio = require('cheerio');
const axios = require('axios');
//const fs = require('fs')
//var CronJob = require('cron').CronJob;
var cities = require('./citiesMap.json')
const translator = require('./tranlator')




module.exports = async function(cityData= '') {

    if (!cityData){
        throw new Error('expected new city!')
    }

    var cityLower = cityData.toLocaleLowerCase()
    //пользуем транслит
    
    
    const getHTML = async(url) => {
       const { data } = await axios.get(url)
       return cheerio.load(data)
    } 

    let weather = {
        temp: '',
        type: '',
        pressure: '',
        humidity: '',
        wind: ''
    };

    //const json = cities.parse()
    //var id = cities[city][0].id

    //var 
    if (cities[city])
    {
        id = cities[city][0].id
    }
    else{
        return{
            weather: null,
            //чтобы добраться до текста ошибки
            errorGis: "Город не найден:("
        }
    }

    const engCity = translator(city)
    console.log(engCity)


    const url = 'https://www.gismeteo.ru/weather-'+engCity+'-'+id+'/now/';
    console.log(url)

    const selector = await getHTML(url)
    //console.log(selector)
    
        //какой класс взять?
    const tempGrad = selector('div.now__weather').find('span.unit.unit_temperature_c').find('span.nowvalue__text_l').text()
    const tempGrad1 = selector('div.now-weather').find('span.unit.unit_temperature_c').text()
    weather.temp = (tempGrad.length > 0) ? tempGrad : tempGrad1;
    // var qwe = weather.temp
    // console.log(qwe)

    const typeNow = selector('div.now__desc').text()
    const typeNow1 = selector('div.now-desc').text()
    weather.type = typeNow ? typeNow : typeNow1;

    const pressureNow = selector('div.nowinfo__item.nowinfo__item_pressure').find('div.nowinfo__block').find('div.unit.unit_pressure_mm_hg_atm').find('div.nowinfo__value').text()
    const pressureNow1 = selector('div.now-info-item.pressure').find('div.item-value').find('div.unit.unit_pressure_mm_hg_atm').text()
    weather.pressure = pressureNow ? pressureNow : pressureNow1

    const humidityNow = selector('div.nowinfo__item.nowinfo__item_humidity').find('div.nowinfo__block').find('div.nowinfo__value').text()
    const humidityNow1 = selector('div.now-info-item.humidity').find('div.item-value').text()
    weather.humidity = humidityNow ? humidityNow : humidityNow1

    const windNow = selector('div.nowinfo__item.nowinfo__item_wind').find('div.nowinfo__block').find('div.unit.unit_wind_m_s').find('div.nowinfo__value').text()
    const windNow1 = selector('div.now-info-item.wind').find('div.item-value').find('div.unit.unit_wind_m_s').text()
    weather.wind = windNow ? windNow : windNow1
    //const link = {selector(element).find('a').attr('href')}`

    //fs.appendFileSync('./d.txt', `${title}; ${link}\n`)
    
    
        try{
            //console.log(weather)
            return {
                weatherGis: weather.temp,
                mainGis: weather.type,
                windGis: weather.wind,
                pressureGis: weather.pressure,
                humidityGis: weather.humidity,
                lsVisibleGis: true,
                errorGis: null
            }
    
        } 
        catch(error){
            //console.log(error);
            return{
                weatherGis: null,
                mainGis: null,
                windGis: null,
                pressureGis: null,
                humidityGis: null,
                lsVisibleGis: false,
                //чтобы добраться до текста ошибки
                errorGis: error.error.message
            }
        }
    }


//qwe('нижний новгород')
