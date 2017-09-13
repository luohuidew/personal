// created by lyx @ 2017-09-09

import axios from 'axios';
import user from './user';
import { MessageBox, Message } from 'element-ui';
import router from '../router/index';

const axiosIns = axios.create({
  timeout: 60000,
  baseURL: '/api',
});

axiosIns.interceptors.request.use(
  config => {
    if (user.getToken()) {
      config.headers.Authorization = user.getToken();
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
    let statusText = res.statusText;
    if (status === 200) {
      return Promise.resolve(data);
    } else if(status === 401) {
      localStorage.setItem('_PerRouter', router.history.current.fullPath);
      user.logout();
    } else {
      MessageBox(`错误码：${status}; 错误描述：${statusText}`, '异常提示', {
        confirmButtonText: '确定'
      });
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
        resolve(response);
      }).catch((response)=> {
      })
    })
  }
});

export default  api;


