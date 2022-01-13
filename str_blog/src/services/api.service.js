class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl
    }

    //создание поста
    async createPost(post) {
        try {
            const request = new Request(this.url + '/posts.json', {
                //набор опций
                method: 'post',
                body: JSON.stringify(post)
            })

            return useRequest(request)
        } catch(error) {
            console.log(error);
        }
    }

    //запрос поста
    async fetchPosts() {
        try {
            const request = new Request(`${this.url}/posts.json`, {
                method: 'get'
            })
            return useRequest(request)
        } catch(error) {
            console.error(error);
        }

    } 

    async fetchPostById(id) {

        try {
            const request = new Request(`${this.url}/posts/${id}.json`, {
                method: 'get'
            })
            return useRequest(request)
        } catch(error) {
            console.error(error);
        }
    }
}

//вынес запрос данных
async function useRequest(request) {
    const response = await fetch(request)
    return await response.json()
}

export const apiService = new ApiService('https://wfm-js-b6332-default-rtdb.firebaseio.com')