import api from './http';

export default {
  // add
  add(params) {
    return api.post('/userInfo/add', params);
  },
  // update
  update(params) {
    return api.post('/userInfo/update', params).then((resp) => {
      return resp;
    });
  },
  // findOne
  findOne(params) {
    return api.get('/userInfo/findOne', params).then((resp) => {
      return resp;
    });
  },
  // findAll
  findAll(params) {
    return api.get('/userInfo/findAll', params).then((resp) => {
      return resp;
    });
  },
};
