import axios from "axios";

export const VerifyTokenApi = (params) => axios.get('/api/verify', params);
//add new order to orders database
export const AddCartDataApi = (params) =>
  axios.post('/api/shopping-cart', params);

//minus amount where from newOrder
export const UpdateStockDataApi = (params) => axios.post('/api/shopping-cart/update', params);

export const ProductsDetailApi = (params) => axios.post('/api/products/:id', params);

export const LoginApi = (params) => axios.post('/api/login', params);

//Update products from inventory
export const ProductsUpdateApi = (params) =>
  axios.put('/api/products/update', params);

//Add new client
export const AddNewClientApi = (params) => axios.post('/api/client',params)

//Inquiry client
export const InquiryClientApi = () => axios.get('/api/client')