import axios from 'axios';
//login page Api
export const LoginApi = (params) => axios.post('/api/login', params);
//verify token Api
export const VerifyTokenApi = (params) =>
  axios.get('/api/verify', params);
//add new order to orders database
export const AddCartDataApi = (params) =>
  axios.post('/api/shopping-cart', params);
//update stock by new order
export const UpdateStockDataApi = (params) =>
  axios.post('/api/shopping-cart/update', params);
//count spend on client
export const AddSpendOnClient = (params) =>
  axios.post('/api/shopping-cart/client_update/', params);
//Inquire Products Details Api
export const ProductsDetailApi = (params) =>
  axios.post('/api/products/:id', params);
//Update products info from product details page Api
export const ProductsUpdateApi = (params) =>
  axios.put('/api/products/update', params);
//add new inventory for product
export const AddNewInventoryApi = (params) => axios.post('/api/add-inventory', params);
//Got elements from table of add_inventory_data
export const GotInventoryDataApi = (params) => axios.get('/api/add-inventory', { params });
//add new inventory for product
export const AsynchronousApi = (params) => axios.put('/api/add-inventory', params);
// Update add_inventory_data
export const ModifyAddNewInventoryApi = (params) => axios.put('/api/add-inventory-modify', params);
//Add new client
export const AddNewClientApi = (params) =>
  axios.post('/api/client', params);
//Inquiry client
export const InquiryClientApi = () => axios.get('/api/client');
