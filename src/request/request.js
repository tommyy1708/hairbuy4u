import axios from "axios";

//settings
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASEURL}`,
  timeout: 5000,
});

//add request interceptor
instance.interceptors.request.use(function (config) {

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