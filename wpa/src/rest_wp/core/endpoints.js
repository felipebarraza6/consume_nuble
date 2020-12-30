import { GET } from './config'

const getPosts = async() => {
    const request = await GET('/posts')    
    return request
}

export const endpoints = {
    posts: {
        getPosts
    }
}