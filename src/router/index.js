import Vue from 'vue';
import Router from 'vue-router';

import EqIndex from '../components/console/equity/Index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EqIndex',
      component: EqIndex,
    },
  ],
});
