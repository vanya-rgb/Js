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



var promise = new Promise(function(resolve, reject) {
    setTimeout(function(){
        console.log('Сервер: запрашиваю список пользователей в бд')
        console.log('...')
        resolve()
    }, 1000)
})


promise.then(function(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            var users = [
                {uid: 'id1', name: 'Maxim'},
                {uid: 'id2', name: 'Elena'},
            ]
            // reject('БД не смогла получить список пользователей')
            console.log('база данных: формирую список пользователей', users)
            console.log('...')
            resolve(users)
        }, 500)
    })
})
.then(function(dbUsers){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log('сервер: трансформирую данные для клиента')
            console.log('...')
            var users = dbUsers.map(function(user){
                return {
                    id: user.uid,
                    firstName: user.name,
                    timestamp: Date.now()
                }
            })
            resolve(users)
        }, 500)
    }) 
})
.then(function(users){
    setTimeout(function(){
        console.log('клиент: получил данные', users)
        console.log('...')
    })
}, 1000)

.catch(function(error){
    console.error(error)
})

.finally(function() {
    console.log('Finally')
})