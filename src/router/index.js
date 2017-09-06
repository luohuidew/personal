import Vue from 'vue';
import Router from 'vue-router';

// 权益管理
import EquityDashboard from '../components/console/equity/Dashboard';
import StockDetail from '../components/console/equity/dashboard/StockDetail';
import FinancDetail from '../components/console/equity/dashboard/FinancDetail';
// 期权管理
import OptionManagementList from '../components/console/option/ManagementList';
import OptionIncentivePlan from '../components/console/option/IncentivePlan';
import OptionHoldingPlatform from '../components/console/option/HoldingPlatform';
import OptionParticipator from '../components/console/option/Participator';
// 文档管理
import DocManagementList from '../components/console/doc/ManagementList';
// 账户管理
import UserPersonalInfo from '../components/console/user/PersonalInfo';
import UserMyOrder from '../components/console/user/MyOrder';
import UserEnterpriseList from '../components/console/user/EnterpriseList';

// 组件文档
import ModuleDoc from '../components/console/module/doc';

Vue.use(Router);

export default new Router({
  routes: [
    // 权益管理
    {
      path: '/',
      name: 'EquityDashboard',
      component: EquityDashboard,
    },
    {
      path: '/equity/dashboard',
      name: 'EquityDashboard',
      component: EquityDashboard,
    },
    {
      path: '/equity/dashboard/stockdetail',
      name: 'StockDetail',
      component: StockDetail,
    },
    {
      path: '/equity/dashboard/financdetail',
      name: 'FinancDetail',
      component: FinancDetail,
    },
    // 期权管理
    {
      path: '/option/management_list',
      name: 'OptionManagementList',
      component: OptionManagementList,
    },
    {
      path: '/option/incentive_plan',
      name: 'OptionIncentivePlan',
      component: OptionIncentivePlan,
    },
    {
      path: '/option/holding_platform',
      name: 'OptionHoldingPlatform',
      component: OptionHoldingPlatform,
    },
    {
      path: '/option/participator',
      name: 'OptionParticipator',
      component: OptionParticipator,
    },
    // 文档管理
    {
      path: '/doc/management_list',
      name: 'DocManagementList',
      component: DocManagementList,
    },
    // 账户管理
    {
      path: '/user/personal_info',
      name: 'UserPersonalInfo',
      component: UserPersonalInfo,
    },
    {
      path: '/user/my_order',
      name: 'UserMyOrder',
      component: UserMyOrder,
    },
    {
      path: '/user/enterprise_list',
      name: 'UserEnterpriseList',
      component: UserEnterpriseList,
    },
    // 组件文档
    {
      path: '/module/module_doc',
      name: 'ModuleDoc',
      component: ModuleDoc,
    },
  ],
});
