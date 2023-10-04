import axios from "axios";
import request from "./request";

//export Login API
export const LoginApi = (params) => request.post('/login', params);

export const TestApi = (params) => axios.post('/api/finished', params);