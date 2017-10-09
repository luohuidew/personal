import axios from 'axios';
import api from '@/service/http';
import { MessageBox } from 'element-ui';

const userKey = 'f5e6d93974cd4effb849f7441ad4ad5d';
export default {
  getQiNiuToken() {
    return api.get('/qiniu/token').then((resp) => {
      if (resp.code.status !== 200) { // 请求错误
        MessageBox(resp.code.msg, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.data;
    });
  },
  sendMsg(arg1) {
    /*
     * 发送(手机邮箱)验证码
     * arg1：account
     * */
    return api.post('/sendMsg', { account: arg1 }).then((resp) => {
      let isSuccess = false;// true: 发送成功，false:发送失败
      if (resp.code.status === 200) {
        isSuccess = true;
      }
      return isSuccess;
    });
  },
  getImgCode(arg1) {
    /*
     * 获取图片验证码
     * arg1：手机号或邮箱
     * */
    return api.post('/validateCode', { account: arg1 }).then(resp => resp.temp);  // todo temp是mock临时接口数据
  },
  checkImgCode(arg1, arg2) {
    /*
    * 检查图片验证码是否正确
    * arg1：account
    * arg2：validateCode
    * */
    return api.post('/checkCode', { account: arg1, validateCode: arg2 }).then((resp) => {
      let isRight = false;// true: 检验正确，false:检验错误
      if (resp.code.status === 200) {
        isRight = true;
      }
      return isRight;
    });
  },
  checkPhoneExist(arg1) {
    /*
     * 检测电话已存在
     * arg1：phone
     * */
    return api.post('/check/phone', { phone: arg1 }).then((resp) => {
      let isExist = false; // true: 存在，false:不存在
      if (resp.code.status === 200) {
        isExist = true;
      }
      return isExist;
    });
  },
  checkEmailExist(arg1) {
    /*
     * 检测邮箱已存在
     * arg1：email
     * */
    return api.post('/check/email', { email: arg1 }).then((resp) => {
      let isExist = false; // true: 存在，false:不存在
      if (resp.code.status === 200) {
        isExist = true;
      }
      return isExist;
    });
  },
  checkCompanyNameEmail(arg1) {
    /*
     * 检测公司名称已存在
     * arg1：companyName
     * */
    return api.post('/check/companyName', { companyName: arg1 }).then((resp) => {
      let isExist = false; // true: 存在，false:不存在
      if (resp.code.status === 200) {
        isExist = true;
      }
      return isExist;
    });
  },
  checkPWD(arg1) {
    /*
     * 检测密码是否正确
     * arg1：password
     * */
    return api.post('/check/pwd', { password: arg1 }).then((resp) => {
      let isRight = false; // true: 密码正确，false:密码错误
      if (resp.code.status === 200) {
        isRight = true;
      }
      return isRight;
    });
  },
  // 企业关键字多维度查询
  searchWideCompany(text) {
    return axios.get(`http://i.yjapi.com/ECI/SearchWide?key=${userKey}&keyWord=${text}`).then(resp => resp.data);
  },
  // 企业关键字精确获取详细信息
  getDetailCompany(text) {
    return axios.get(`http://i.yjapi.com/ECI/GetDetailsByName?key=${userKey}&keyWord=${text}`).then(resp => resp.data);
  },
};
