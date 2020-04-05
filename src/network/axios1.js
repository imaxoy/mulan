import axios from "axios";


const BASEURL = "http://10.18.255.25:2345/v1";

const service = axios.create({
  baseURL: BASEURL
  // timeout: 15000,   // 超时
  // 网络请求接口，假设 5000
  // 1000 2000，
});

/**
 * 请求接口前，做一些数据处理（请求拦截器）
 */
service.interceptors.request.use(
    function(config) {
      // 在发送请求之前做些什么
      // 后台需要前端这边传相关的参数（在请求头添加参数）
      // Tokey
      // userId
      // sui
      // 业务需求

      // 最终目地不是在请求头添加参数

      config.headers["token"] = sessionStorage.getItem("token");

      // config.headers['userId'] = '44444444'
      // config.headers['sui'] = '33333'

      return config;
    },
    function(error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
);

/**
 * 请求接口后，返回数据进行拦截（响应拦截器）
 */
service.interceptors.response.use(
    function(response) {
      // 返回处理后的数据
      let data = response.data;
      return data;
    },
    function(error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
);

export default service;

/**
 * 使用export default时，但不能同时存在多个default。
 * 文件 import 不需要花括号，
 */
