import axios  from 'axios';

export const api = axios.create({
    baseURL: 'https://tstapi.ffcloud.com.br/',
})