import { HeadedComponent } from "./components/header.component";
import { NavigationComponent } from "./components/navigation.component";
import './css/style.css'
import { CreateComponent } from "./components/create.component";
import { FavoriteComponent } from "./components/favorite.component";
import { PostsComponent } from "./components/posts.component";
import { TestComponent } from "./components/test.component";
import { LoaderComponent } from "./components/loader.component";

new HeadedComponent('header')

const navigation = new NavigationComponent('navigation')
const loader = new LoaderComponent('loader')

const posts = new PostsComponent('posts', {loader})
const create = new CreateComponent('create')
const favorite = new FavoriteComponent('favorite', {loader})
const test = new TestComponent('test')

navigation.registerTabs([
    {name: 'create', component: create},
    {name: 'posts', component: posts},
    {name:'favorite', component: favorite},
    {name: 'test', component: test}
])