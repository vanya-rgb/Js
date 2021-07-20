document.querySelector('#alert').addEventListener('click', function(){
    alert('вы успешно кликнули!)')
})

document.querySelector('#confirm').addEventListener('click', function(){
    var decision = confirm('вы уверены?)')
    if (decision){
        alert('вы успешно кликнули!)')
    }
})

document.querySelector('#prompt').addEventListener('click', function(){
    var age = prompt('Введите свой возраст', 18)
    if (age >= 18){
        alert('какой вы взрослый!)')
    }
    else{
        alert('вы еще слишком молоды')
    }
})


console.error('error')
console.log('log')
console.warn('console.warn')
console.info('info')

throw new Error('error')