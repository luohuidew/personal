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
      /* if (resp.Status === '200') {
        resp.Result.forEach((v) => {
          const c = v;
          c.value = v.Name;
        });
        return resp.Result;
      }
      return resp.Message; */
      const result = resp;
      return result;
    });
  },
};
