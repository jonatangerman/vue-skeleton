import Vue from 'vue';
import axios from 'axios';

// CREATE MAIN INSTANCE & DEFAULTS SETTINGS
const instance = axios.create({
    baseURL: CONFIG.API_URL,
});

// REQUEST INTERCEPTOR SETTINGS
instance.interceptors.request.use((config) => {
    /** GET YOUR AUTHENTICATION TOKEN HERE FROM YOUR CHOOSE GLOBAL DATA HANDLER (e.g. Cookies, Localstorage, Vuex, etc) **/
    // config.headers.common['Authorization'] = LOCAL_STORAGE_AUTH_TOKEN;

    return config;
}, (error) => {    
    return Promise.reject(error);
});

// RESPONSE INTERCEPTOR SETTINGS
instance.interceptors.response.use((response) => {
    /** SET YOUR AUTHENTICATION TOKEN HERE FROM YOUR CHOOSE GLOBAL DATA HANDLER (e.g. Cookies, Localstorage, Vuex, etc) **/
    return response;
}, (error) => {
    /** HANDLE FAILING AUTHENTICATION **/
    return Promise.reject(error);
});

export default instance;
