//var div = document.getElementById('playground')
//console.log(div)

//var p = document.getElementsByClassName('text')
//console.log(p)

//var h1 = document.getElementsByTagName('h1')
//console.log(h1)

var div = document.querySelector('#playground')
var p = document.querySelectorAll('.text')
var h1 = document.querySelector('h1')
var input = document.querySelector('input')

div.innerHTML = '<h2 style = "color: red">From Java</h2>'
h1.textContent = 'Chenge'
console.log(div.innerHTML);
console.log(p);
console.log(h1.textContent);
console.log(input.value);



