import axios from 'axios'

const INSTANCE = axios.create({
    //baseURL:"http://app.consumenuble.cl/commerce/"
    baseURL:"http://localhost:8000/commerce/"
})

const INSTANCE_LOGIN = axios.create({
    //baseURL:"http://app.consumenuble.cl/users/"
    baseURL:"http://localhost:8000/users/"
})


export const GET = async(endpoint) =>{    
    const request = await INSTANCE.get(endpoint)    
    return request

}

export const POST_LOGIN = async (endpoint ,data) =>{

    const request = await INSTANCE_LOGIN.post(endpoint, data)

    return request
}

export const POST_CREATE_USER = async (endpoint, data)=>{
    
    const request = await INSTANCE_LOGIN.post(endpoint, data)
    
    return request
}

export const POST = async (endpoint, data)=>{
    const token = JSON.parse(localStorage.getItem('access_token') || null)
    console.log(data)
    const options = {
        headers: {
            Authorization: `Token ${token}`
        }
    }
    const request = await INSTANCE.post(endpoint, data, options)
    
    return request
}

export const PATCH = async(endpoint, data)=>{

    const token = JSON.parse(localStorage.getItem('access_token') || null)
    
    const options = {
        headers: {
            Authorization: `Token ${token}`
        }
    }
    const request = await INSTANCE_LOGIN.patch(endpoint, data, options)
    
    return request
}
