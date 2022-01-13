var $start = document.querySelector('.diogramaEx')
var $cont = document.querySelector('.diogramaOne')
var $chart = document.querySelector('.chart')
$start.addEventListener('click', start)
$cont.addEventListener('click', cont)


function getCorect (text) {

    text[0] == '−' ? str = '-'+text.substring(1, text.lenght) : str = text
    
    var num = parseInt(str, 10)
    return num
}


var yanWeekend = []
var openWeekend = []
var mailWeekend = []
var flag = {
    i: 0
}

//температура mailRu
if (isNaN(parseInt(document.querySelector('.mailtempofDay1').innerText))){
    for (i=1; i<15; i++){
        mailWeekend.push({
            temp: null
        })
    }
}
else {
    for (i=1; i<15; i++) {
        mailWeekend.push({
            temp: parseInt(document.querySelector(`.mailtempofDay${i}`).innerText)
        })
    }
    flag.i += 1
}
console.log(mailWeekend)
//температура openWeather
if (isNaN(parseInt(document.querySelector('.opentempofDay1').innerText))){
    for (i=1; i<15; i++){
        openWeekend.push({
            temp: null
        })
    }
}
else {
    for (i=1; i<15; i++) {
        openWeekend.push({
            temp: parseInt(document.querySelector(`.opentempofDay${i}`).innerText)
        })
    }
    flag.i += 1
}
console.log(openWeekend)

//температура yandex
if (isNaN(getCorect(document.querySelector('.tempofDay1').innerText))){
    for (i=1; i<15; i++){
        yanWeekend.push({
            temp: null,
        })
    }
    for (i=1; i<9; i++){
        yanWeekend.push({
        day: document.querySelector(`.dayofWeek${i}`).innerText
        })
    }
}
else{
    for (i=1; i<15; i++) {
        yanWeekend.push({
            temp: getCorect(document.querySelector(`.tempofDay${i}`).innerText),
        })
    }
    for (i=1; i<9; i++){
        yanWeekend.push({
        day: document.querySelector(`.dayofWeek${i}`).innerText
        })
    }
    
    flag.i += 1
}
console.log(yanWeekend)

$chart.classList.remove('hide')
    $("#chart").shieldChart({
    seriesSettings: {
            area: {
                activeSettings: {
                    pointHoveredState: {
                        enabled: true,
                        drawWidth: 12
                    }
                }
            }
    },
    exportOptions: {
        image: false,
        print: false
    },
    backgroundColor: '#08376b00',
    primaryHeader: {
        align: 'center',
        text: "Прогноз на неделю",
    },
    axisY: [{
        decimalTicks: false,
        axisTickText: {
            format: function(text) {
                return text + "°C";
            },
            style: {
            color: 'black'
            }
        }
    }],
    
    axisX: {
        ticksHeight: 1,
        categoricalValues: [yanWeekend[14].day,yanWeekend[15].day,'',yanWeekend[16].day,'',yanWeekend[17].day,'',yanWeekend[18].day,'',yanWeekend[19].day,'',yanWeekend[20].day,'',yanWeekend[21].day],
        axisTickText: {
            step: 1,
            // x: -20
        }
    },
    

    dataSeries: [{
        seriesType: 'spline',
        collectionAlias: "Average value",
        data: [parseInt(((yanWeekend[0].temp+mailWeekend[0].temp+openWeekend[0].temp)/flag.i), 10), parseInt(((yanWeekend[7].temp+mailWeekend[7].temp+openWeekend[7].temp)/flag.i), 10), parseInt(((yanWeekend[1].temp+mailWeekend[1].temp+openWeekend[1].temp)/flag.i), 10), parseInt(((yanWeekend[8].temp+mailWeekend[8].temp+openWeekend[8].temp)/flag.i), 10), parseInt(((yanWeekend[2].temp+mailWeekend[2].temp+openWeekend[2].temp)/flag.i), 10), parseInt(((yanWeekend[9].temp+mailWeekend[9].temp+openWeekend[9].temp)/flag.i), 10), parseInt(((yanWeekend[3].temp+mailWeekend[3].temp+openWeekend[3].temp)/flag.i), 10), parseInt(((yanWeekend[10].temp+mailWeekend[10].temp+openWeekend[10].temp)/flag.i), 10),parseInt(((yanWeekend[4].temp+mailWeekend[4].temp+openWeekend[4].temp)/flag.i), 10), parseInt(((yanWeekend[11].temp+mailWeekend[11].temp+openWeekend[11].temp)/flag.i), 10),parseInt(((yanWeekend[5].temp+mailWeekend[5].temp+openWeekend[5].temp)/flag.i), 10), parseInt(((yanWeekend[12].temp+mailWeekend[12].temp+openWeekend[12].temp)/flag.i), 10),parseInt(((yanWeekend[6].temp+mailWeekend[6].temp+openWeekend[6].temp)/flag.i), 10), parseInt(((yanWeekend[13].temp+mailWeekend[13].temp+openWeekend[13].temp)/flag.i), 10)]
    }]
    
    });


function cont(){
    $chart.classList.remove('hide')
    $("#chart").shieldChart({
    seriesSettings: {
            area: {
                activeSettings: {
                    pointHoveredState: {
                        enabled: true,
                        drawWidth: 12
                    }
                }
            }
    },
    exportOptions: {
        image: false,
        print: false
    },
    backgroundColor: '#08376b00',
    primaryHeader: {
        align: 'center',
        text: "Прогноз на неделю",
    },
    axisY: [{
        decimalTicks: false,
        axisTickText: {
            format: function(text) {
                return text + "°C";
            },
            style: {
            color: 'black'
            }
        }
    }],
    
    axisX: {
        ticksHeight: 1,
        categoricalValues: [yanWeekend[14].day,yanWeekend[15].day,'',yanWeekend[16].day,'',yanWeekend[17].day,'',yanWeekend[18].day,'',yanWeekend[19].day,'',yanWeekend[20].day,'',yanWeekend[21].day],
        axisTickText: {
            step: 1,
            // x: -20
        }
    },
    

    dataSeries: [{
        seriesType: 'spline',
        collectionAlias: "Average value",
        data: [parseInt(((yanWeekend[0].temp+mailWeekend[0].temp+openWeekend[0].temp)/flag.i), 10), parseInt(((yanWeekend[7].temp+mailWeekend[7].temp+openWeekend[7].temp)/flag.i), 10), parseInt(((yanWeekend[1].temp+mailWeekend[1].temp+openWeekend[1].temp)/flag.i), 10), parseInt(((yanWeekend[8].temp+mailWeekend[8].temp+openWeekend[8].temp)/flag.i), 10), parseInt(((yanWeekend[2].temp+mailWeekend[2].temp+openWeekend[2].temp)/flag.i), 10), parseInt(((yanWeekend[9].temp+mailWeekend[9].temp+openWeekend[9].temp)/flag.i), 10), parseInt(((yanWeekend[3].temp+mailWeekend[3].temp+openWeekend[3].temp)/flag.i), 10), parseInt(((yanWeekend[10].temp+mailWeekend[10].temp+openWeekend[10].temp)/flag.i), 10),parseInt(((yanWeekend[4].temp+mailWeekend[4].temp+openWeekend[4].temp)/flag.i), 10), parseInt(((yanWeekend[11].temp+mailWeekend[11].temp+openWeekend[11].temp)/flag.i), 10),parseInt(((yanWeekend[5].temp+mailWeekend[5].temp+openWeekend[5].temp)/flag.i), 10), parseInt(((yanWeekend[12].temp+mailWeekend[12].temp+openWeekend[12].temp)/flag.i), 10),parseInt(((yanWeekend[6].temp+mailWeekend[6].temp+openWeekend[6].temp)/flag.i), 10), parseInt(((yanWeekend[13].temp+mailWeekend[13].temp+openWeekend[13].temp)/flag.i), 10)]
    }]
    
    });
}

function start() {
    $chart.classList.remove('hide')
    $("#chart").shieldChart({
    backgroundColor: '#08376b00',
    primaryHeader: {
        text: "Прогноз на неделю"
    },
    exportOptions: {
        image: false,
        print: false
    },
    axisY: [{
        decimalTicks: false,
        axisTickText: {
            format: function(text, axis, chart) {
                return text + "°C";
            },
            style: {
            color: 'black'
            }
        }
    }],
    
    axisX: {
        ticksHeight: 1,
        categoricalValues: [yanWeekend[14].day,yanWeekend[15].day,'',yanWeekend[16].day,'',yanWeekend[17].day,'',yanWeekend[18].day,'',yanWeekend[19].day,'',yanWeekend[20].day,'',yanWeekend[21].day],
        axisTickText: {
            step: 1,
            // x: -20
        }
    },

    dataSeries: [{
        seriesType: 'spline',
        axisY: 0,
        collectionAlias: "@mail.ru",
        data: [mailWeekend[0].temp, mailWeekend[7].temp, mailWeekend[1].temp, mailWeekend[8].temp, mailWeekend[2].temp, mailWeekend[9].temp,mailWeekend[3].temp,mailWeekend[10].temp,mailWeekend[4].temp,mailWeekend[11].temp,mailWeekend[5].temp,mailWeekend[12].temp,mailWeekend[6].temp,mailWeekend[13].temp]
    }, 
    
    {
        seriesType: 'spline',
        axisY: 0,
        collectionAlias: "openWeather",
        data: [openWeekend[0].temp, openWeekend[7].temp, openWeekend[1].temp, openWeekend[8].temp, openWeekend[2].temp, openWeekend[9].temp,openWeekend[3].temp,openWeekend[10].temp, openWeekend[4].temp, openWeekend[11].temp, openWeekend[5].temp, openWeekend[12].temp, openWeekend[6].temp,openWeekend[13].temp]
    }, 

    {
        seriesType: 'spline',
        axisY: 0,
        collectionAlias: "Yandex",
        data: [yanWeekend[0].temp, yanWeekend[7].temp, yanWeekend[1].temp, yanWeekend[8].temp, yanWeekend[2].temp, yanWeekend[9].temp, yanWeekend[3].temp,yanWeekend[10].temp, yanWeekend[4].temp, yanWeekend[11].temp, yanWeekend[5].temp, yanWeekend[12].temp, yanWeekend[6].temp, yanWeekend[13].temp]
    }]
    });
}