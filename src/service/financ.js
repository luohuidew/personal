import api from './http';

const companyMap = JSON.parse(sessionStorage.getItem('_COMPANY_KEY'));
const companyId = companyMap ? companyMap.companyInfo.companyId : '';
export default {
  getFinancListByCompanyId(id = companyId) {
    return api.get(`/financing/findAll/${id}`).then(resp => resp.data, (resp) => {
      this.$message.error(resp.errMsg);
    });
  },
  addFinanc(params) {
    return api.put('/financing/add', params);
  },
  deleteFinanc(id) {
    return api.delete(`/financing/deleteById/${id}`);
  },
  addFinancList(params) {
    return api.put('/financing/addList', params);
  },
};
