import axios from "axios";
import request from "./request";

//export Login API
export const LoginApi = (params) => request.post('/login', params);

export const TestApi = () => axios.get('/api/finished');