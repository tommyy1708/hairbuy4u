import axios from "axios";

export const VerifyTokenApi = (params) => axios.get('/api/verify', params);

export const CartDataApi = (params) =>
  axios.post('/api/shopping-cart', params);

export const ProductsDetailApi = (params) => axios.post('/api/products/:id', params);

export const LoginApi = (params) => axios.post('/api/login', params);

//Update products from inventory
export const ProductsUpdateApi = (params) =>
  axios.put('/api/products/update', params);

//Add new client
export const AddNewClientApi = (params) => axios.post('/api/client')

//Inquiry client
export const InquiryClientApi = () => axios.get('/api/client')