import api from './http';
import user from './user';
import bus from '../utils/bus';

const COMPANY_KEY = '_COMPANY_KEY';

export default {
  getCompanyListByUid() {
    const adminId = user.getUser().id;
    return api.post(`/company/getMyCompanyList/${adminId}`).then(resp => resp);
  },
  getStoredCompany: () => JSON.parse(sessionStorage.getItem(COMPANY_KEY)),
  setStoreCompany: (obj) => {
    sessionStorage.setItem('_COMPANY_KEY', JSON.stringify(obj));
    bus.$emit('COMPANY_CHANGED');
  },
};
