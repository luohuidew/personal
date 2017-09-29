import api from '@/service/http';

export default {
  forgetPassword(params) {
    return api.post('/forgetPassword', params).then(resp => resp);
  },
};
