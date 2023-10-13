import axios from "axios";

export const VerifyTokenApi = (params) => axios.get('/api/verify', params);

export const CartDataApi = (params) => axios.post('/api/finished', params);

export const ProductsDetailApi = (params) => axios.post('/api/products/:id', params);

export const LoginApi = (params) => axios.post('/api/login', params);