import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 5000;
/*
*请求前拦截
*/
axios.interceptors.request.use(
    config => {
        config.headers = {
            '_bkAccessToken_':"token",
            'kp-app-id':10001,
            'Content-Type':'application/x-www-form-urlencoded'
        }
        if (config.method == 'post') {
            config.data = qs.stringify(config.data);
        }else if(config.method == 'get'){
            config.params = config.data;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
/*
*请求后拦截
*/
axios.interceptors.response.use(
    response => {
        if(response.data.status){
            return response;
        }else{
            
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status){
                case 401:
            }
        }
        return Promise.reject(error.response.data)
    });
export default axios;