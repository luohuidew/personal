import Vue from 'vue';
import Router from 'vue-router';

import Main from '../components/home/Main';
import PriceView from '../components/home/PriceView';
import Apply from '../components/home/Apply';
import Login from '../components/home/Login';
import ForgetPassword from '../components/home/ForgetPassword';


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
  ],
});
