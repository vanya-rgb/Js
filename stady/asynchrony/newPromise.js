function sleep(ms) {
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve()
        }, ms)
    })
}


var p1 =  sleep(1500).then(function(){
    return{
        name: 'Promise 1500'
    }
})

var p2 = sleep(3000).then(function(){
    return{
        name: 'Promise 3000'
    }
})

async function start (){
        //ждет все
    var dataAll = await Promise.all([p1,p2])

    //когда отрабатывает первый способ
    var daraRace = await Promise.race([p1,p2])

    console.log('dataAll', dataAll)
    console.log('dataRace', daraRace)
}

start()

