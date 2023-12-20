import axios from 'axios';


export const customFetch = axios.create({
    baseURL: "/api/v1/light/bloodbank",

});