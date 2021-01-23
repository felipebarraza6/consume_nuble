import { GET, POST_LOGIN , POST, PATCH, POST_CREATE_USER } from './config'

const login = async(data)=>{
    const request = await POST_LOGIN('login/', {
        email: data.user,
        password: data.password
    })
    return request.data
}

const listPosts = async()=>{
    const request = await GET('posts/')
    return request
}
const listRoute = async() => {
    const request = await GET('routes/')
    return request
}

const createUser = async(data)=>{
    const request = await POST_CREATE_USER('signup/', data)
    return request.data
}

const updateUser = async(user, data)=>{

    const request = await PATCH(`${user}/`, data)
    return request
}

const getPlaces = async(is_place=false, is_enterprise=false) =>{
    const request = await GET(`places/?is_place=${is_place}&is_enterprise=${is_enterprise}`)
    return request
}

const getRatings = async(place) =>{
    const request = await GET(`ratings/?place=${place}&is_active=true`)
    return request
}

const getEnterprises = async() =>{
    const request = await GET(`enterprises/`)
    return request
}

const postRating = async(data) => {
    const request = await POST(`ratings/`, data)
    console.log(request)
    return request
}

export const endpoints = {
    places: {
        getPlaces
    },
    ratings: {
        getRatings,
        postRating
    },
    enterprises: {
        getEnterprises
    },
    login,
    createUser,
    updateUser,
    listPosts,
    listRoute
}

