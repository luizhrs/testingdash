import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api-crm-jb.firebaseio.com/'
})

export default instance;