import axios from "axios"
import router from '../router'


const storageAxios =  axios.create({
    baseURL: process.env.VUE_APP_FB_STORAGE
})


storageAxios.interceptors.response.use(null, error => {
    //редирект при ошибке 401
    if (error.response.status == 401) {
        router.push('/auth?message=auth')
    }
    
    return Promise.reject(error);
  })

export default storageAxios