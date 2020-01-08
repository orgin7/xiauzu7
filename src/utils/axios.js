import axios from 'axios'
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.data.token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg0ODE4NTcsImV4cCI6MTU3ODQ4NTQ1N30.ng25GfwghsyE0XUNBdrgWH7WqnWc8BVTMe1XnJj6MuM'
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
  export default axios