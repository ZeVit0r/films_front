import axios  from 'axios';

export const tstapi = axios.create({
    baseURL: 'https://tstapi.ffcloud.com.br/',
})

export const omdbapi = axios.create({
    baseURL: 'https://www.omdbapi.com/',
})