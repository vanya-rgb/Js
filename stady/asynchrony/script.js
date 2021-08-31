// window.setTimeout(function() {
//     alert('hello')
// }, 2 * 1000)

// var counter = 0

// var interval = setInterval(function() {
//     console.log(++counter)
// }, 1000*2)

// setTimeout(function() {
//     clearInterval(interval)
// }, 5*1000)

console.log('клиент: хочу список пользователей')
console.log('...')

setTimeout(function(){
    console.log('Сервер: запрашиваю список пользователей в бд')
    console.log('...')

    setTimeout(function() {
        console.log('база данных: формирую список пользователей')
        console.log('...')

    setTimeout(function(){
        console.log('сервер: трансформирую данные для клиента')
        console.log('...')

        setTimeout(function(){
            console.log('клиент: получил данные')
            console.log('...')
        }, 1000)
    
    }, 500)
    
    }, 500)
}, 1* 1000)

