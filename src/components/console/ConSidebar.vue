<template>
  <div class="con-sidebar">
    <el-menu :default-active="$route.path" mode="vertical" :router="true" :unique-opened="true" theme="dark">
      <el-menu-item v-if="permission.equity__dashboard" index="/equity/dashboard"><i class="icon-img"><img src="../../assets/menu-equity.png" alt=""></i>权益管理</el-menu-item>
      <el-submenu v-if="permission.option" index="2">
        <template slot="title" index="/option/management_list"><i class="icon-img"><img src="../../assets/menu-option.png" alt=""></i>期权管理</template>
        <el-menu-item v-if="permission.option__management_list" index="/option/management_list"><i class="icon-img"></i>期权管理</el-menu-item>
        <el-menu-item v-if="permission.option__incentive_plan" index="/option/incentive_plan"><i class="icon-img"></i>激励计划</el-menu-item>
        <el-menu-item v-if="permission.option__holding_platform" index="/option/holding_platform"><i class="icon-img"></i>持股平台</el-menu-item>
        <el-menu-item v-if="permission.option__participator" index="/option/participator"><i class="icon-img"></i>参与方</el-menu-item>
      </el-submenu>
      <el-menu-item v-if="permission.doc__management_list" index="/doc/management_list"><i class="icon-img"><img src="../../assets/menu-doc.png" alt=""></i>文档管理</el-menu-item>
      <el-submenu index="4" v-if="permission.user" >
        <template slot="title"><i class="icon-img"><img src="../../assets/menu-user.png" alt=""></i>账户管理</template>
        <el-menu-item v-if="permission.user__personal_info"  index="/user/personal_info"><i class="icon-img"></i>个人信息</el-menu-item>
        <el-menu-item v-if="permission.my_order" index="/user/my_order"><i class="icon-img"></i>我的订单</el-menu-item>
        <el-menu-item v-if="permission.user__enterprise_list" index="/user/enterprise_list"><i class="icon-img"></i>企业列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/module_doc"><i class="icon-img"><img src="../../assets/menu-doc.png" alt=""></i>组件文档(开发使用)</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import company from '../../service/company';
import bus from '../../utils/bus';

export default {
  name: 'con-sidebar',
  data() {
    return {
      permission: {
        equity: false,
        equity__dashboard: false,
        option: false,
        option__management_list: false,
        option__incentive_plan: false,
        option__holding_platform: false,
        option__participator: false,
        doc: true,
        doc__management_list: true,
        user: true,
        user__personal_info: true,
        my_order: true,
        user__enterprise_list: true,
      },
    };
  },
  mounted() {
    this.getPermission();
    bus.$on('COMPANY_CHANGED', () => {
      this.getPermission();
    });
  },
  methods: {
    getPermission() {
      const store = company.getStoredCompany();
      if (store) {
        if (store.authority === 'ROLE_ADMIN' || store.authority === 'ROLE_SUPERADMIN') {
          const keys = Object.keys(this.permission);
          keys.forEach((item) => {
            this.permission[item] = true;
          });
        }
        if (store.authority === 'ROLE_USER') {
          const licenses = JSON.parse(store.licenseList);
          const keys = Object.keys(licenses);
          keys.forEach((item) => {
            const newItem = item.replace(/\./, '__');
            this.permission[newItem] = licenses[item];
          });
        }
      }
    },
  },
};
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .con-sidebar {
    width: 210px;
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0;
    background: #243B5F;
  }

  .icon-img{
    margin-right: 30px;
  }

  .icon-img img {
    margin-bottom: 5px;
  }

  /* element cover */
  .el-menu--dark{
    background: #243B5F!important;
  }

</style>
