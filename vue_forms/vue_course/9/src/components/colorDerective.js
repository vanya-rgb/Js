let interval 
let defaultColor

const mouseover = event => {
    event.target.style.color = 'red'
}

const mouseout = event => {
    event.target.style.color = defaultColor
}

export default {
    mounted(el, binding) {
        el.style[binding.arg] = binding.value

        defaultColor = binding.value
        //blink
        if (binding.modifiers.blink) {

            let flag = true
            interval = setInterval( () => {
                el.style.color = flag ? '#fff' : binding.value

                flag = !flag
            }, 1000)
        }
        //hover
        if (binding.modifiers.hover) {
            el.addEventListener('mouseover', mouseover)
            el.addEventListener('mouseout', mouseout)
        }
    },

    updated(el, binding) {
        console.log(el)
        console.log(binding)

        el.style[binding.arg] = binding.value
    },

    //чистка (не допустить утечки памяти)
    unmounted(el) {
        console.log('unmounted')
        if(interval) {
            clearInterval(interval)
        }

        //удаляем у конкретного элемента конкретный метод
        el.removeEventListener('mouseover', mouseover)
        el.removeEventListener('mouseout', mouseout)
        
    }
}