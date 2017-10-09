import api from '@/service/http';
import { MessageBox } from 'element-ui';

const TOKEN = '_TOKEN';
const USER_KEY = '_USER_KEY';

export default {
  getToken: () => JSON.parse(sessionStorage.getItem(TOKEN)),
  setToken(token) {
    sessionStorage.setItem(TOKEN, JSON.stringify(token));
  },
  getUser: () => JSON.parse(sessionStorage.getItem(USER_KEY)),
  login(params) {
    return api.post('/auth', params).then((resp) => {
      if (resp.code.status !== 200) {
        MessageBox(resp.code.msg, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      if (resp.token) {
        this.setToken(resp.token);
      }
      if (resp.data) {
        const itemStr = {};
        const arr = Object.keys(resp.data);
        arr.forEach((v) => {
          itemStr[v] = resp.data[v];
        });
        sessionStorage.setItem(USER_KEY, JSON.stringify(itemStr));
      }
      window.location.href = `http://${window.location.host}/console/#/user/enterprise_list`;
      return resp;
    });
  },
  logout(statue) {
    sessionStorage.clear();
    if (statue === '401') {
      window.location.href = `http://${window.location.host}/home.html#/login`;
    } else {
      window.location.href = `http://${window.location.host}/home.html`;
    }
  },
};
