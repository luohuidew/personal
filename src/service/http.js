// created by lyx @ 2017-09-09

import Vue from 'vue'
import axios from 'axios';

let AUTH_TOKEN = '';

const axiosIns = axios.create({
  timeout: 60000,
  baseURL: '/api',
});

axiosIns.interceptors.request.use(
  config => {
    if (AUTH_TOKEN) {
      config.headers.authorization = AUTH_TOKEN;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosIns.interceptors.response.use(
  res => {
    let data = res.data;
    let status = res.status;
    if (status === 200) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(res);
    }
  },
  error => {
    let errorInfo =  error.data.error ? error.data.error.message : error.data;
    return Promise.reject(errorInfo);
  }
);

let ajaxMethod = ['get', 'post', 'delete', 'put'];
let api = {};
ajaxMethod.forEach((method)=> {
  api[method] = function (uri, data, config) {
    return new Promise(function (resolve, reject) {
      axiosIns[method](uri, data, config).then((response)=> {
        if (response.data) {
        } else {
          resolve(response);
        }
      }).catch((response)=> {
      })
    })
  }
});

Vue.prototype.$API = api;


