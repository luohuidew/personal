import api from './http';

export default {
  // add
  add(params) {
    return api.post('/userInfo/add', params);
  },
  // update
  update(params) {
    return api.post('/userInfo/update', params);
  },
  // findOne
  findOne(id) {
    return api.get(`/userInfo/findOne/${id}`);
  },
  // findAll
  findAll(params, pageNumber, size) {
    return api.post('/userInfo/findAll', { params, pageNumber, size });
  },
};
