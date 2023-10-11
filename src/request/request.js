import axios from "axios";

//settings
const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 3000,
});

//add request interceptor
instance.interceptors.request.use(function (config) {
  // let token = localStorage.getItem("cms-token")
  // if (token) {
  //   config.headers = {
  //     "cms-token":token
  //   }
  // }
  return config;
}, function (error) {
  //action for request error
  return Promise.reject(error);
})

//add response interceptor
instance.interceptors.response.use(function (response) {
  console.log('get response')
  return response.data;
}, function (error) {
  //action for response error
  return Promise.reject(error);
})
export default instance;