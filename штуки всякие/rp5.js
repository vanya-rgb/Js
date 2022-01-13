const cheerio = require('cheerio');
const axios = require('axios');
const { cityIn } = require('lvovich');

module.exports = async function(city = ''){

    if (!city){
        throw new Error('expected new City!')
    }

    var info = {
        url: ''
    }

    var cityFirstUpper = city[0].toUpperCase() + city.substring(1)

    let regexp = /\p{sc=Cyrillic}/gu;
    //если запрос на кирилице
    if(cityFirstUpper.match(regexp)){  
         var correctCity = cityIn(cityFirstUpper)
        console.log(correctCity)
        info.url = `https://rp5.ru/Погода_в_`+correctCity
    }
    else {
        info.url = `https://rp5.ru/Weather_in_`+cityFirstUpper
    }

    var link = info.url
    console.log("Ссылка на Rp5", link)

    const getHTML = async(url) => {
        const { data } = await axios.get(url)
        return cheerio.load(data)
    } 
    const encodedURI = encodeURI(link);
    const selector = await getHTML(encodedURI)
    //console.log(selector)

    var data = []
   // сегодня!
    const temprpNow = selector('div#archiveString').find('div#ArchTemp').find('span.t_0').text()
    data.push({
        temp: temprpNow ? temprpNow : `Haven't found:(`
    })

    //ищем поле гребанное туман
    var flag = selector('table#forecastTable tr:nth-child(5) td[class="title"]').text()

    //прогноз на 5-6 дней
    flag ? str = 6 : str = 5;
    selector(`table#forecastTable tr:nth-child(${str}) td[dir="ltr"]`).each((i, elem) => {
        data.push({
            temp: selector(elem).find('div.t_0').text()
        })
    })
    console.log(data)
    
    // var localTime = selector('div#pointNavi-container span#tPoint.tPoint').text()
    // console.log('local time:', localTime)

    var i = 4
    var len = data.length

    try{
        return {
            rptempofDay1: data[0].temp,
            rptempofDay2: data[i].temp,
            rptempofDay3: data[2*i].temp,
            rptempofDay4: data[3*i].temp,
            rptempofDay5: data[4*i].temp,
            rptempofDay6: data[5*i].temp,
            rptempofDay7: data[len-1].temp,
            errorRp: null
        }
    } 
    catch(error){
        console.log("Ошибка:", error);
        return{
            rptempofDay1: null,
            rptempofDay2: null,
            rptempofDay3: null,
            rptempofDay4: null,
            rptempofDay5: null,
            rptempofDay6: null,
            errorRp: error.message,
        }
    }
}
