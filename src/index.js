// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import Index from './Index.vue';
import router from './router';

import user from './service/user';

import './style/reset.css';
import './style/console-common.css';
import './theme/index.css';

if (!user.getToken()) {
  user.logout('401');
}

require('./utils/tools');

Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#index',
  router,
  template: '<Index/>',
  components: { Index },
});
