<template>
  <div class="con-sidebar">
    <el-menu :default-active="$route.path" mode="vertical" :router="true" :unique-opened="true"  theme="dark">
      <el-menu-item index="/equity/dashboard"><i class="el-icon-search"></i>权益管理</el-menu-item>
      <el-submenu index="2">
        <template slot="title" index="/option/management_list"><i class="el-icon-search"></i>期权管理</template>
        <el-menu-item index="/option/incentive_plan"><i class="el-icon-menu"></i>激励计划</el-menu-item>
        <el-menu-item index="/option/holding_platform"><i class="el-icon-menu"></i>持股平台</el-menu-item>
        <el-menu-item index="/option/participator"><i class="el-icon-menu"></i>参与方</el-menu-item>
      </el-submenu>
      <el-menu-item index="/doc/management_list"><i class="el-icon-search"></i>文档管理</el-menu-item>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>账户管理</template>
        <el-menu-item index="/user/personal_info"><i class="el-icon-menu"></i>个人信息</el-menu-item>
        <el-menu-item index="/user/my_order"><i class="el-icon-menu"></i>我的订单</el-menu-item>
        <el-menu-item index="/user/enterprise_list"><i class="el-icon-menu"></i>企业列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'con-sidebar',
  data() {
    return {
    };
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
</style>
