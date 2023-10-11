import axios from "axios";
import request from "./request";


export const TestApi = (params) => axios.post('/api/finished', params);

export const ProductsDetailApi = (params) => axios.post('/api/products/:id', params);

export const LoginApi = (params) => axios.post('/api/login', params);