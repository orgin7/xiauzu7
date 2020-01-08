import axios from 'axios'
import storage from './webStorage'
import { message } from 'antd';
axios.interceptors.request.use(function (config) {
   // Do something before request is sent
   config.data.token=storage.getItem('token')||''
  //  console.log(config)
   return config;
 }, function (error) {
   // Do something with request error
   return Promise.reject(error);
 });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
   // Do something with response data
   var arr=[-998,-997,-996,-999]
   if(arr.indexOf(response.data.err)!==-1){
     return message.warning('token失效',2)
   }
   return response.data;
 }, function (error) {
   // Do something with response error
   return Promise.reject(error);
 });
 export default axios