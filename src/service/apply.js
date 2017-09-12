// created by yll @ 2017-09-12
import api from './http';

export default {
  apply(params) {
    return api.post(' /userInfo/add', params).then((resp) => {
      // TODO 处理TOKEN
      console.log(123);
      return resp;
    });
  },
};
