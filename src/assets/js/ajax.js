import axios from 'axios'
import qs from 'qs'
import { Toast,Indicator } from 'mint-ui';
axios.defaults.timeout = 5000;
/*
*请求前拦截
*/
axios.interceptors.request.use(
    config => {
        config.headers = {
            '_bkAccessToken_':"token",
            'kp-app-id':10001,
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
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
        if(!response.data.status){
            Toast(response.data.msg);
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status){
                case 404:
                    Toast('404,错误请求');
                    break
                  case 401:
                    Toast('401,未授权');
                    break
                  case 403:
                    Toast('403,禁止访问');
                    break
                  case 408:
                    Toast('408,请求超时');
                    break
                  case 500:
                    Toast('500,服务器内部错误');
                    break
                  case 501:
                    Toast('501,功能未实现');
                    break
                  case 503:
                    Toast('503,服务不可用');
                    break
                  case 504:
                    Toast('504,网关错误');
                    break
                  default:
                    Toast('未知错误');
                }
                Indicator.close();
            }
        return Promise.reject(error.response.data);
    });
export default axios;