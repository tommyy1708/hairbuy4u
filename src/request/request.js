import axios from "axios";

//settings
const axiosOption = {
  baseURL: '/api',
  timeout:5000
}

//create a instance
const instance = axios.create(axiosOption)

//add request interceptor
instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("cms-token")
  if (token) {
    config.headers = {
      "cms-token":token
    }
  }
  return config;
}, function (error) {
  //action for request error
  return Promise.reject(error);
})

//add response interceptor
instance.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  //action for response error
  return Promise.reject(error);
})
export default instance;