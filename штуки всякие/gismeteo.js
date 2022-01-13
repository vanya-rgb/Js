// const puppeteer = require('puppeteer');
// const userAgent = require('user-agents');

// const url = 'https://www.gismeteo.ru/weather-miass-4566/now/';

// async function fetchProductList(url, city) {
//     const browser = await puppeteer.launch({ 
//         headless: false, // false: позволяет просматривать экземпляр Chrome в действии
//         defaultViewport: null, // (необязательно) полезно только в non-headless mode
//     });
//     страница браузера
//     можно создать сразу несколько страниц
//     const page = await browser.newPage();

//     Для рандомизации
//     await page.setUserAgent(
//         'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'
//        )
//     не более 2 подключений, работающих в течение не менее 500 мс.
//     await page.goto(url, { waitUntil: 'networkidle2' });
    
//     ожидание поля ввода для поиска
//     await page.waitForSelector('input[class="search_input"]');
    
//     имитация ввода запроса searchTerm
    
//     await page.click('#js-search')
//     await page.waitForSelector('div[class="found__header"]')

//     await page.evaluate(city=>{
//         for (i=0 ; i<city.length-1; i++){
//             num = Math.random()*1000;
            
//         }
//     }, city)
//     await page.evaluate(val => {document.querySelector('input[name="q"]').value = val}, city);
//     await page.$eval('input[name=q]', (el, val) => el.value = val, city);

//     await page.click('a.nolink.blue.js-li.js-a.js-myloc-uid-4566 found__item.founditem');
//     await page.type('#js-search', city)

//     await page.waitForSelector('div[id="js-search-container"]')

//     await page.keyboard.press('ArrowDown');
//     await page.keyboard.down('Enter');
//     await page.keyboard.up('Enter');

//     await page
//     .waitForSelector(`div[class="weathertab-wrap"]`)
//     .then(() => console.log('i am in'))

//     const result = await page.evaluate(() => {
//         counts total number of products
//         let weather = {
//             temp: '',
//             type: '',
//             pressure: '',
//             humidity: '',
//             wind: ''
//         };
//         берем температуру
//         let tempGrad = document.querySelector(`span[class="unit unit_temperature_c"] .nowvalue__text_l`);
//         weather.temp = tempGrad ? tempGrad.innerText : '';

//         берем тип погоды
//         let weatherType = document.querySelector(`span[class="tip _top _center"]`)
//         weather.type = weatherType ? weatherType.innerText : '';

//         let pressureNow = document.querySelector(`div[class="unit unit_pressure_mm_hg_atm"]`)
//         weather.pressure = pressureNow ? pressureNow.innerText : ''

//         let humidityNow = document.querySelector(`div[class="nowinfo__item nowinfo__item_humidity"]`)
//         weather.humidity = humidityNow ? humidityNow.innerText : ''

//         let windNow  = document.querySelector(`div[class="nowinfo__item nowinfo__item_wind"]`)
//         weather.wind = windNow ? windNow.innerText : ''
        
//         return weather
//     })
//     console.log(result)
//     browser.close();
// }

// fetchProductList('https://www.gismeteo.ru', 'белгород')