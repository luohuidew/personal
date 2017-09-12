import api from './http';

export default {
  login(params) {
    return api.post('/auth', params).then((resp) => {
      // TODO 处理TOKEN
      console.log(123);
      return resp;
    });
  },
};
