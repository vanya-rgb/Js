//var div = document.getElementById('playground')
//console.log(div)

//var p = document.getElementsByClassName('text')
//console.log(p)

//var h1 = document.getElementsByTagName('h1')
//console.log(h1)

var a = document.querySelector('a')
var oldHref = a.getAttribute('href')

a.setAttribute('href', 'http://ya.ru/')
a.setAttribute('title', 'go to ya')
a.textContent = 'Yandex'

var box1 = document.querySelector('#box1')
var box2 = document.querySelector('#box2')

box1.classList.add('red')
box2.classList.remove('blue')
var hasClass = box2.classList.contains('blue')

console.log(hasClass)

if (hasClass){
    box2.classList.remove('blue')
}
else{
    box2.classList.add('blue')
}