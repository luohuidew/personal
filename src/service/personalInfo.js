// created by yll @ 2017-09-12
import api from './http';
import user from '../service/user';

export default {
  findOne() { // 默认进来获得的用户信息
    const userId = user.getUser().id;
    return api.get(`/user/findOne/${userId}`).then((resp) => {
      // 处理邮箱*
      let findOneObj = {};
      const emailArray = (resp.email).split('@');
      const editedEmail = emailArray.join('@');
      const len = emailArray[0].length;
      const x = '*';
      const xing = x.repeat(len);
      findOneObj = resp;
      if (resp.email.length > 0) {
        findOneObj.email = editedEmail.replace(emailArray[0], xing);
      }
      return findOneObj;
    });
  },
  update(params) { // 修改
    return api.post('/userInfo/update', params).then(resp => resp);
  },
  sendMsg(params) { // 邮箱、电话验证
    return api.post('/sendMsg/', params).then(resp => resp);
  },
  getImgCode(phone) { // 获得图形验证
    return api.post(`/validateCode/${phone}`).then(resp => resp);
  },
  checkImgCode(phone, validateCode) { // 验证图形验证码
    return api.post(`/checkCode/${phone}/${validateCode}`).then(resp => resp);
  },
};
