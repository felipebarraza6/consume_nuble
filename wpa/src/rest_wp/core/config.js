import axios from 'axios'

const INSTANCE = axios.create({
    baseURL:"https://xn--consumeuble-7db.cl/wp-json/wp/v2"
})

export const GET = async(endpoint) =>{    
    const request = await INSTANCE.get(endpoint)    
    return request

}


