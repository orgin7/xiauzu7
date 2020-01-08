import axios from "axios"
import {getItem} from '../utils/webStorage'
import store from  '../store/store'
import ActionCreator from  '../store/actionCreator'
import qs from "querystring"
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // console.log(getItem('token'))
    // console.log(config.data)
    if(config.data){
       config.data.token=getItem('token')||''
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded' 
      if (config.method === 'post') { 
        config.data = qs.stringify({
          ...config.data
        })
      }

    // Do something before request is sent
   
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    let list = [-996,-997,-998,-999]
    if(list.indexOf(response.data.err)!==-1){
      // console.log('token有问题')
      store.dispatch(ActionCreator.setTokenModal(true))
      return Promise.reject(response)
    }
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

  export default axios

