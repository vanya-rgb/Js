import { Component } from "../core/component";
import { Form } from "../core/form";
import { Validators } from "../core/validators";
import { apiService } from "../services/api.service";

export class CreateComponent extends Component {
    constructor(id) {
        super(id)

        // this.form = null
    } 

    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this))

        
        //работа с валидаторами и их настройка
        this.form = new Form(this.$el, {
            title: [Validators.required],
            fulltext: [Validators.required, Validators.minLength(1)]
        })
    } 
}


async function submitHandler(event) {
    event.preventDefault()

    if (this.form.isValid()) {
    //копируем содержание формы
    const formData = {
        type: this.$el.type.value,
        date: new Date().toLocaleDateString(),
        ...this.form.value()
    }

    //отправка данных
    await apiService.createPost(formData)

    //числим поле формы после удаления содержания
    this.form.clear()

    alert('Запись создана в базе данных')

    }
}