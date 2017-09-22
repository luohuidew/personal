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
    return api.post('/validateCode', { account: arg1 }).then(resp => resp.temp);  // temp是mock接口数据
  },
  checkImgCode(arg1, arg2) {
    /*
    * 检查图片验证码是否正确
    * arg1：account
    * arg2：validateCode
    * */
    return api.post('/checkCode', { account: arg1, validateCode: arg2 }).then(resp => resp);
  },
  sendMsg(arg1, arg2) {
    /*
     * 发送(手机邮箱)验证码
     * arg1：account
     * arg2：validateCode
     * */
    return api.post('/sendMsg', { account: arg1, validateCode: arg2 }).then(resp => resp);
  },
  checkPhoneExist(arg1) {
    /*
     * 检测电话已存在
     * arg1：phone
     * */
    return api.post('/check/phone', { phone: arg1 }).then(resp => resp);
  },
  checkEmailExist(arg1) {
    /*
     * 检测邮箱已存在
     * arg1：email
     * */
    return api.post('/check/email', { email: arg1 }).then(resp => resp);
  },
  checkCompanyNameEmail(arg1) {
    /*
     * 检测公司名称已存在
     * arg1：companyName
     * */
    return api.post('/check/companyName', { companyName: arg1 }).then(resp => resp);
  },
  checkPWD(arg1) {
    /*
     * 检测密码是否正确
     * arg1：password
     * */
    return api.post('/check/pwd', { password: arg1 }).then(resp => resp);
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
};
