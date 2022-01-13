import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";
import { renderPost } from "../templates/post.template";

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    init() {
      this.$el.addEventListener('click', buttonHandler.bind(this))
    }

    async onShow() {
      
        this.loader.show()
        const fbData = await apiService.fetchPosts()
        const posts = TransformService.fbObjectToArray(fbData)
        const html = posts.map(post => renderPost(post, {withButton: true}))
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
    }  

    onHide() {
        this.$el.innerHTML = ''
    }
}


function buttonHandler(event) {

  const $el = event.target
  //забираем из post.template data компонент
  const id = $el.dataset.id
  const title = $el.dataset.title

  if (id) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const candidate = favorites.find(p => p.id === id)
    
    if (candidate) {
      //Удалить элемент
      $el.textContent = 'Cохранить'
      $el.classList.add('button-primary')
      $el.classList.remove('button-danger')
      //удалить элемент
      favorites = favorites.filter(p => p.id !== id)
      

      //Добавить элемент 
    } else {
      $el.classList.add('button-danger')
      $el.classList.remove('button-primary')
      
      $el.textContent = 'Удалить'
      //добавить
      favorites.push({id, title})
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
  
}
