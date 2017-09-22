import api from './http';
import user from './user';
import bus from '../utils/bus';

const COMPANY_KEY = '_COMPANY_KEY';

export default {
  getCompanyListByUid() {
    const id = user.getUser().id;
    return api.post(`/company/getMyCompanyList/${id}`).then(resp => resp.data);
  },
  addCompany(params) {
    const pm = params;
    pm.adminId = user.getUser().id;
    return api.post('/company/addCompany', pm).then(resp => resp);
  },
  getCompanyInfoById() {
    // const cInfo = this.getStoredCompany();
    // const id = cInfo.companyInfo.companyId;
    const id = '1231321323'; // 测试代码，用上面两行
    return api.get(`/company/companyInfo/${id}`).then(resp => resp);
  },
  /* *
   * 存储内容：
   * {
   * authority: 'ROLE_USER', // 在公司中的角色，ROLE_USER  or ROLR_ADMIN
   * licenseList: '', // ROLE_USER的权限列表   string
   * companyInfo:{ // 公司基础信息
   *  "companyId":'', // 公司id
   *  "companyName":'', // 公司全称
   *  "companyType":0  // 公司类型
   * }
   * }
   * */
  getStoredCompany: () => JSON.parse(sessionStorage.getItem(COMPANY_KEY)),
  setStoreCompany: (obj) => {
    sessionStorage.setItem('_COMPANY_KEY', JSON.stringify(obj));
    bus.$emit('COMPANY_CHANGED');
  },
};
