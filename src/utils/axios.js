import axios from 'axios'
import {getItem} from './webStorage'


// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // let list = [-997, -998, -999, -996]
  // if(list.indexOf(response.data.err) !== -1){
  //   //token 出问题了
  //   console.log('token 出问题了')
  //   store.dispatch(actionCreator.setTokenModal(true))
  //   return Promise.reject(response)
  // }
  return response.data;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default axios