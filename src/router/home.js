import Vue from 'vue';
import Router from 'vue-router';

import Main from '../components/home/Main';
import PriceView from '../components/home/PriceView';
import Apply from '../components/home/Apply';
import Login from '../components/home/Login';
import ForgetPassword from '../components/home/ForgetPassword';

// 邮件邀请
import InvitationIndex from '../components/home/InvitationIndex';
import InvitationRegister from '../components/home/InvitationRegister';
import InvitationLogin from '../components/home/InvitationLogin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/price_view',
      name: 'PriceView',
      component: PriceView,
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Apply,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/forget_password',
      name: 'ForgetPassword',
      component: ForgetPassword,
    },
    // 邮件邀请
    {
      path: '/invitation_index/:code',
      name: 'InvitationIndex',
      component: InvitationIndex,
    },
    {
      path: '/invitation_login/:code',
      name: 'InvitationLogin',
      component: InvitationLogin,
    },
    {
      path: '/invitation_register/:code',
      name: 'InvitationRegister',
      component: InvitationRegister,
    },
  ],
});
