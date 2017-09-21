import api from './http';
import user from '../service/user';

export default {
  getUserInfoByUid() {
    const userId = user.getUser().id;
    return api.get(`/user/myInfo/${userId}`).then((resp) => {
      const respData = resp;
      const repEmail = respData.email;
      const idx = repEmail.indexOf('@');
      if (idx > 0) respData.emailHide = repEmail.replace(repEmail.substring(0, idx), '*'.repeat(idx));
      if (respData.phone) {
        respData.phoneHide = `${respData.phone.substr(0, 3)}****${respData.phone.substr(7)}`;
      }
      return respData;
    });
  },
  updateUserInfo(params) {
    return api.post('/user/myInfo/update', params).then(resp => resp);
  },
};
