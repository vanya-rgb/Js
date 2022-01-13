var $boxOpen = document.querySelector('.glob')
var $boxMail = document.querySelector('.weatherMail')
var $boxYan = document.querySelector('.weatherYan')
var $body = document.body
var $type = document.querySelector('.type').innerText
var $image = document.querySelector('.coolImage')
switch($type){
    case 'Clouds':{
        $body.style.backgroundImage = 'url(final2.png)'
        $image.src = "pony.png"
        $image.style.width = '30%'
        break
    }
    case 'Clear':{
        $body.style.backgroundImage = 'url(final3.png)'
        $image.src = "pony.png"
        $image.style.width = '50%'
        break
    }
    case 'Snow':{
        $body.style.backgroundImage = 'url(final5.png)'
        break
    }
    case 'Mist':{
        $body.style.backgroundImage = 'url(finalFog.png)'
        break
    }
    case 'Rain':{
        $body.style.backgroundImage = 'url(rain.png)'
        $image.src = "pepe.png"
        $image.style.width = '50%'
        break
    }
    default: {
        $body.style.backgroundImage = 'url(final1.png)' 
    }
}


// $boxYan.addEventListener('mouseenter', (event) =>{
// event.target.style.boxShadow = "18px 10px 7px 3px rgb(0 0 0 / 14%)";
// })
// $boxYan.addEventListener('mouseleave', (event) =>{
// event.target.style.boxShadow = ''
// })

// $boxMail.addEventListener('mouseenter', (event) =>{
// event.target.style.boxShadow = "18px 10px 7px 3px rgb(0 0 0 / 14%)";
// })
// $boxMail.addEventListener('mouseleave', (event) =>{
// event.target.style.boxShadow = ''
// })
    
// $boxOpen.addEventListener('mouseenter', (event) =>{
// event.target.style.boxShadow = "10px 11px 4px 3px rgb(0 0 0 / 64%)";
// })
// $boxOpen.addEventListener('mouseleave', (event) =>{
// event.target.style.boxShadow = ''
// })