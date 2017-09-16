import api from './http';

export default {
  get(id) {
    return api.get(`/financing/findAll/${id}`).then(resp => resp.data, (resp) => {
      this.$message.error(resp.errMsg);
    });
  },
  add(params) {
    return api.put('/financing/add', params);
  },
};
