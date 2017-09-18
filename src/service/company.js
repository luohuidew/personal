import api from './http';
import user from './user';
import bus from '../utils/bus';

const COMPANY_KEY = '_COMPANY_KEY';

export default {
  getCompanyListByUid() {
    const id = user.getUser().id;
    return api.post(`/company/getMyCompanyList/${id}`).then(resp => resp);
  },
  addCompany(params) {
    const pm = params;
    pm.adminId = user.getUser().id;
    return api.post('/company/addCompany', pm).then(resp => resp);
  },
  getStoredCompany: () => JSON.parse(sessionStorage.getItem(COMPANY_KEY)),
  setStoreCompany: (obj) => {
    sessionStorage.setItem('_COMPANY_KEY', JSON.stringify(obj));
    bus.$emit('COMPANY_CHANGED');
  },
  getCompanyInfoById() {
    const cInfo = this.getStoredCompany();
    const id = cInfo.companyInfo.companyId;
    return api.get(`/company/getCompanyById/${id}`).then(resp => resp);
  },
};
