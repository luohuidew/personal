import api from '@/service/http';

export default {
  apply(params) {
    return api.post('/userInfo/add', params).then(resp => resp);
  },
};
