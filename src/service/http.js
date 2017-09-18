// created by lyx @ 2017-09-09

import axios from 'axios';
import user from './user';
import { MessageBox, Message } from 'element-ui';

const axiosIns = axios.create({
  timeout: 60000,
  baseURL: '/api',
});

function errorMsgBox (statusText, msg) {
  MessageBox(`错误类型：${statusText}; 错误描述：${msg}`, '异常提示', {
    confirmButtonText: '确定'
  });
}
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
      // TODO token过期，缓存期间要更新token
      user.logout('401');
    } else if(status === 403) {
      const msg = '未授权。';
      errorMsgBox(statusText, msg);
    } else if(status === 400) {
      const msg = '参数错误。';
      errorMsgBox(statusText, msg);
    } else if(status === 404) {
      const msg = '请求路径错误。';
      errorMsgBox(statusText, msg);
    } else if(status === 500) {
      const msg = res.data.msg;
      errorMsgBox(statusText, msg);
    } else if(status === 510) {
      const msg = '保存失败。';
      errorMsgBox(statusText, msg);
    } else {
      const msg = '未知异常。';
      errorMsgBox(statusText, msg);
    }
    return Promise.reject(res);
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


