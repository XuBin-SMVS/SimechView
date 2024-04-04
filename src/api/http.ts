import axios from 'axios'
// import qs from 'qs'
// import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
// console.log(process.env.NODE_ENV)

let nodeEnv = process.env.NODE_ENV || "development"
switch (nodeEnv.toLowerCase()) {
    case "production":
        axios.defaults.baseURL = "http://10.192.24.233:443/"   // "http://192.168.3.254:443/"  // "http://10.192.24.233:443/"
        break;
    case "development":
        axios.defaults.baseURL = "http://127.0.0.1:443/"
        break;
    // default:
    //     axios.defaults.baseURL = "http://127.0.0.1"
}

axios.defaults.timeout = 0;
// axios.defaults.transformRequest = data => qs.stringify(data)

// axios.interceptors.response.use (response=>{
//     // console.log(response)
//     // console.log(process.env.NODE_ENV)
//     return response.data;

// }, error=>{ 
//     return Promise.reject(error)
// })

export default axios