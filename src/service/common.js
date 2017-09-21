import api from './http';

const userKey = 'f5e6d93974cd4effb849f7441ad4ad5d';
export default {
  getQiNiuToken() {
    return api.get('/qiniu/token').then(resp => resp);
  },
  getImgCode(arg1) {
    /*
     * 获取图片验证码
     * arg1：手机号或邮箱
     * */
    return api.post('/validateCode', { account: arg1 }).then(resp => resp);
  },
  checkImgCode(arg1, arg2) {
    /*
    * 检查图片验证码是否正确
    * arg1：account
    * arg2：validateCode
    * */
    const params = {
      account: arg1,
      validateCode: arg2,
    };
    return api.post('/checkCode', params).then(resp => resp);
  },
  sendMsg(arg1) {
    /*
     * 发送(手机邮箱)验证码
     * arg1：account
     * arg2：validateCode
     * */
    return api.post('/sendMsg', { account: arg1 }).then(resp => resp);
  },
  // 企业关键字多维度查询
  searchWideCompany(text) {
    return api.get(`/ECI/SearchWide?key=${userKey}&keyWord=${text}`, { baseURL: 'http://i.yjapi.com' }).then((resp) => {
      const result = resp;
      return result;
    });
  },
  // 企业关键字精确获取详细信息
  getDetailCompany(text) {
    return api.get(`/ECI/GetDetailsByName?key=${userKey}&keyWord=${text}`, { baseURL: 'http://i.yjapi.com' }).then((resp) => {
      const result = resp;
      return result;
    });
  },
  checkEmail(arg1) {
    /*
    * 检查邮箱是否已经注册
    * arg1：email
    * */
    const params = {
      email: arg1,
    };
    return api.post(' /check/email', params).then(resp => resp);
  },
  checkPhone(arg1) {
    /*
    * 检查手机号是否已经注册
    * arg1：email
    * */
    const params = {
      phone: arg1,
    };
    return api.post(' /check/phone', params).then(resp => resp);
  },
};
