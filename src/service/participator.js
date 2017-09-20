import api from './http';

export default {
  // 新增参与方
  addParticipator(params) {
    return api.post('/user/participator/add', params);
  },
  // 修改参与方
  updateParticipator(params) {
    return api.post('/user/participator/update', params);
  },
  // 查询公司下的参与方列表
  findAllParticipators(companyId, inputMsg, currentPage, pageSize) {
    return api.post('/user/company/userList', { companyId, inputMsg, currentPage, pageSize });
  },
  // 查询参与方权限列表
  getParticipatorLicenseList(params) {
    return api.post('/user/participator/licenseList', { params });
  },
  // 修改参与方的权限列表
  updateParticipatorLicenseList(params) {
    return api.post('/user/participator/updateLicenseList', { params });
  },
  // 删除未认证的参与方
  deleteParticipator(id) {
    return api.delete(`/user/participator/${id}`);
  },
  // 发送邮箱邀请
  sendEmail(params) {
    return api.post('/userInfo/sendEmail', params);
  },
};
