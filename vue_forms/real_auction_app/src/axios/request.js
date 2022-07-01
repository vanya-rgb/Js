import axios from "axios"
import router from '../router'

const requestAxios =  axios.create({
    baseURL: process.env.VUE_APP_FB_URL
})


requestAxios.interceptors.response.use(null, error => {
    //редирект при ошибке 401
    if (error.response.status == 401) {
        router.push('/auth')
    }
    
    return Promise.reject(error);
  })

export default requestAxios