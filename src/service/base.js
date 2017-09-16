import api from './http';

export default {
  getQiNiuToken() {
    return api.get('/qiniu/token').then(resp => resp);
  },
};
