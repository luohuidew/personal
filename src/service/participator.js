import api from './http';

export default {
  // add
  addParticipator(params) {
    return api.post('/userInfo/add', params);
  },
  // update
  updateParticipator(params) {
    return api.post('/userInfo/update', params);
  },
  // findOne
  findOneParticipatorById(id) {
    return api.get(`/userInfo/findOne/${id}`);
  },
  // findAll
  findAllParticipators(params, currentPage, pageSize) {
    return api.post('/userInfo/findAll', { params, currentPage, pageSize });
  },
};
