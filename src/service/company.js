
import api from '@/service/http';
import user from '@/service/user';
import bus from '@/utils/bus';
import { MessageBox } from 'element-ui';

const COMPANY_KEY = '_COMPANY_KEY';

export default {
  getCompanyListByUid() {
    const id = user.getUser().id;
    return api.post('/company/myCompanyList', { adminId: id }).then((resp) => {
      if (resp.code.status !== 200) {
        MessageBox(resp.code.msg, '提示', {
          confirmButtonText: '确定',
        });
        return [];
      }
      return resp.data;
    });
  },
  addCompany(params) {
    const pm = params;
    pm.adminId = user.getUser().id;
    return api.post('/company/addCompany', pm).then((resp) => {
      if (resp.code.status !== 200) {
        MessageBox(resp.code.msg, '提示', {
          confirmButtonText: '确定',
        });
      } else {
        this.$message.success('添加成功！');
      }
    });
  },
  getCompanyInfoById() {
    const cInfo = this.getStoredCompany();
    const id = cInfo.companyInfo.companyId;
    return api.get(`/company/companyInfo/${id}`).then((resp) => {
      if (resp.code.status !== 200) {
        MessageBox(resp.code.msg, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.data;
    });
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
   *  }
   * }
   * */
  getStoredCompany: () => JSON.parse(sessionStorage.getItem(COMPANY_KEY)),
  setStoreCompany: (obj) => {
    sessionStorage.setItem(COMPANY_KEY, JSON.stringify(obj));
    bus.$emit('COMPANY_CHANGED');
  },
};
