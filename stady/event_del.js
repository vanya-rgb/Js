var p = document.querySelectorAll('p')

for(var i = 0; i < p.length; i++) {
    p.addEventListener('click', function(event){
        event.target.style.color = 'blue'
    })
}
