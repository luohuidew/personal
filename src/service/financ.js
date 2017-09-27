import api from './http';

const companyMap = JSON.parse(sessionStorage.getItem('_COMPANY_KEY'));
const id = companyMap ? companyMap.companyInfo.companyId : '';
export default {
  getFinancHistoryByCompanyId() {
    return api.post('/financing/findAllInfo', { companyId: id }).then(resp => resp.data);
  },
  getFinancListByCompanyId() {
    return api.post('/financing/findAllFinancs', { companyId: id }).then(resp => resp.data);
  },
  addFinanc(params) {
    return api.put('/financing/add', params);
  },
  deleteFinanc(financid) {
    return api.delete(`/financing/deleteById/${financid}`);
  },
  addFinancList(params) {
    return api.put('/financing/addList', params);
  },
};
