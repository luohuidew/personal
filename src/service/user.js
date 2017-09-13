import api from './http';

const TOKEN = '_TOKEN';
const USER_KEY = '_USER_KEY';

export default {
  getToken: () => JSON.parse(sessionStorage.getItem(TOKEN)),
  getUser: () => JSON.parse(sessionStorage.getItem(USER_KEY)),
  login(params) {
    return api.post('/auth', params).then((resp) => {
      if (resp.token) {
        sessionStorage.setItem(TOKEN, JSON.stringify(resp.token));
      }
      if (resp.user) {
        const itemStr = {
          id: resp.user.id,
          username: resp.user.username,
          phone: resp.user.phone,
          email: resp.user.email,
        };
        sessionStorage.setItem(USER_KEY, JSON.stringify(itemStr));
      }
      return resp;
    });
  },
  logout() {
    sessionStorage.clear();
    window.location.href = `http://${window.location.host}/home.html#/`;
  },
};
