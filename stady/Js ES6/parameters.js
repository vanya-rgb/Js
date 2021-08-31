const createPost = (title, text, date = new Date().toLocaleDateString()) => {

    
    return {
        title,
        text,
        date,
    }
}

const post = createPost('Скоро новый год', 'скоро будет 2022')
console.log(post)
