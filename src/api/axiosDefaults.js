// The code in this file was copied from the 'Moments' walkthrough project.

import axios from "axios";

axios.defaults.baseURL = 'https://take-control-api-d106d6135431.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Below intercepts the request
export const axiosReq = axios.create();
// Below intercepts the response
export const axiosRes = axios.create();