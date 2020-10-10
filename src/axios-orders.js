import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rcg---burger-builder.firebaseio.com/'
});

export default instance;