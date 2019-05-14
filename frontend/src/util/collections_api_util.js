import axios from 'axios'; 

export const fetchCollections = ()  => {
    return axios.get('/api/collections')
}

export const createCollection = data => {
    return axios.post(`/api/collections/`, data)
}

export const fetchUserCollections = id => {
    return axios.get(`/api/collections/user/${id}`)
}


