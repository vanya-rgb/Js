const puppeteer = require('puppeteer');
const userAgent = require('user-agents');

//const url = 'https://www.gismeteo.ru/weather-miass-4566/now/';

module.exports = async function (url, city) {
    if (!city){
        throw new Error('expected new city!')
    }
    const browser = await puppeteer.launch({ 
        headless: false, // false: позволяет просматривать экземпляр Chrome в действии
        defaultViewport: null, // (необязательно) полезно только в non-headless mode
    });
    //страница браузера
    //можно создать сразу несколько страниц
    const page = await browser.newPage();

    // Для рандомизации
    await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'
       )
    //не более 2 подключений, работающих в течение не менее 500 мс.
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    //ожидание поля ввода для поиска
    await page.waitForSelector('input[name=request]');
    console.log("прошел")
    //имитация ввода запроса searchTerm
    
    
    //await page.evaluate(val => {document.querySelector('input[name="q"]').value = val}, city);
    //await page.$eval('input[class="mini-suggest-form__input mini-suggest__input"]', (el, val) => el.value = val, city);
    await page.type('input[name=request]', city, { delay: 128}) 
    

    await page.keyboard.press('ArrowDown');
    //await page.click('input[class="mini-suggest-form__input mini-suggest__input"]')
    await page.keyboard.down('Enter');
    await page.keyboard.up('Enter');

    await page
    .waitForSelector(`div[class="fact__theme fact__theme_night-cloudy"]`)
    .then(() => console.log('i am in'))
    
    
    const result = await page.evaluate(() => {
        // counts total number of products
        let weather = {
            temp: '',
            type: '',
        };
        //берем температуру
        let tempGrad = document.querySelector(`div[class="temp fact__temp fact__temp_size_s"]`);
        weather.temp = tempGrad ? tempGrad.innerText : '';

        //берем тип погоды
        let weatherType = document.querySelector(`div[class="link__condition day-anchor i-bem"]`)
        weather.type = weatherType ? weatherType.innerText : '';
        
        return weather
    })
    browser.close();
    return {
        temp: result.temp,
        type: result.type
    }
    //console.log(result)

}
//qwe('https://yandex.ru/pogoda/details', 'миасс')