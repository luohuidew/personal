import api from './http';

// const companyId = JSON.parse(localStorage.COMPANY_KEY).id;
const companyId = '123213213';
export default {
  getFinancListByCompanyId(id = companyId) {
    return api.get(`/financing/findAll/${id}`).then(resp => resp.data, (resp) => {
      this.$message.error(resp.errMsg);
    });
  },
  addFinanc(params) {
    return api.put('/financing/add', params);
  },
};
