import api from './http';

export default {
  get(id) {
    return api.get(`/equity/${id}`);
  },
  getAll(id) {
    return api.get(`/equity/findAllWithGroup/${id}`);
  },
};
