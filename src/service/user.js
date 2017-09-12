import api from './http';

const TOKEN = '_TOKEN';
const AUTHORITY = '_AUTHORITY';
const USER_KEY = '_USER_KEY';

export default {
  getToken: () => JSON.parse(localStorage.getItem(TOKEN)),
  getUser: () => JSON.parse(localStorage.getItem(USER_KEY)),
  login(params) {
    return api.post('/auth', params).then((resp) => {
      if (resp.token) {
        localStorage.setItem(TOKEN, JSON.stringify(resp.token));
      }
      if (resp.user) {
        const itemStr = {
          authorities: resp.user.authorities,
          licenseList: resp.user.licenseList,
        };
        localStorage.setItem(AUTHORITY, JSON.stringify(itemStr));
      }
      if (resp.user) {
        const itemStr = {
          id: resp.user.id,
          username: resp.user.username,
          phone: resp.user.phone,
          email: resp.user.email,
        };
        localStorage.setItem(USER_KEY, JSON.stringify(itemStr));
      }
      return resp;
    });
  },
};
