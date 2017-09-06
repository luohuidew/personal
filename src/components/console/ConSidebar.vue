<template>
  <div class="con-sidebar">
    <el-menu :default-active="$route.path" mode="vertical" :router="true" :unique-opened="true" theme="dark">
      <el-menu-item index="/equity/dashboard"><i class="icon-img"><img src="../../assets/menu-equity.png" alt=""></i>权益管理</el-menu-item>
      <el-submenu index="2">
        <template slot="title" index="/option/management_list"><i class="icon-img"><img src="../../assets/menu-option.png" alt=""></i>期权管理</template>
        <el-menu-item index="/option/management_list"><i class="icon-img"></i>期权管理</el-menu-item>
        <el-menu-item index="/option/incentive_plan"><i class="icon-img"></i>激励计划</el-menu-item>
        <el-menu-item index="/option/holding_platform"><i class="icon-img"></i>持股平台</el-menu-item>
        <el-menu-item index="/option/participator"><i class="icon-img"></i>参与方</el-menu-item>
      </el-submenu>
      <el-menu-item index="/doc/management_list"><i class="icon-img"><img src="../../assets/menu-doc.png" alt=""></i>文档管理</el-menu-item>
      <el-submenu index="4">
        <template slot="title"><i class="icon-img"><img src="../../assets/menu-user.png" alt=""></i>账户管理</template>
        <el-menu-item index="/user/personal_info"><i class="icon-img"></i>个人信息</el-menu-item>
        <el-menu-item index="/user/my_order"><i class="icon-img"></i>我的订单</el-menu-item>
        <el-menu-item index="/user/enterprise_list"><i class="icon-img"></i>企业列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/module_doc"><i class="icon-img"><img src="../../assets/menu-doc.png" alt=""></i>组件文档(开发使用)</el-menu-item>
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
