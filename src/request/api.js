import request from "./request";

//export Login API
export const LoginApi = (params) => request.post('/login', params);