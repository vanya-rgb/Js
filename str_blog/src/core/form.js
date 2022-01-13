export class Form {
    constructor(form, controls) {
        this.form = form
        this.controls = controls
    }

    value() {
        const value = {'text': 'test text'}

        //пробег по всем элементам контролов
        Object.keys(this.controls).forEach(control => {
            value[control] = this.form[control].value
        })

        return value
    }

    clear() {
        //присваниевание пустой строки
        Object.keys(this.controls).forEach(control => {
            this.form[control].value = ''
        })
    }

    isValid() {
        //проходит вся валидация
        let isFormValid = true

        //пробег по всем контролам
        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control]

            let isValid = true
            validators.forEach(validator => {
                isValid = validator(this.form[control].value) && isValid
            })

            //работа с ошибками
            if (!isValid) {
                setError(this.form[control])
            }
            else {
                clearError(this.form[control])
            }

            isFormValid = isFormValid && isValid
        })

        return isFormValid
    }
}

//индикатор ошибки
function setError($control) {
    clearError($control)
    //текст ошибки
    const error = '<p class = "validation-error">Введите норм значение</p>'
    $control.classList.add('invalid')
    //вcтавка в htlm 
    $control.insertAdjacentHTML('afterend', error)
}

//удаление повторного уведомления об ошибке
function clearError($control) {
    $control.classList.remove('invalid')

    //если форма не пуста
    if($control.nextSibling) {
        $control.closest('.form-control').removeChild($control.nextSibling)
    }
}