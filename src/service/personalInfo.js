// created by yll @ 2017-09-12
import api from './http';

export default {
  findOne(id) {
    return api.get(`/user/findOne/${id}`).then(resp => resp);
  },
  update(params) {
    return api.post('/userInfo/update', params).then(resp => resp);
  },
};
