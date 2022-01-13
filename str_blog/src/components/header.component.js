import { Component } from "../core/component"

export class HeadedComponent extends Component{
    constructor(id){
        super(id)
    }

    init() {
        //заметка о ранее увиденной вкладке вступления
        if (localStorage.getItem('visited')) {
            this.hide()
        }
        const btn = this.$el.querySelector('.js-header-start')
        btn.addEventListener('click', buttonHandler.bind(this))
    }
}

function buttonHandler() {
    localStorage.setItem('visited', JSON.stringify(true))
    this.hide()
}