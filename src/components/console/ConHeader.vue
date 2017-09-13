<template>
  <div class="con-header">
    <span class="title"></span>
    <p class="user" v-if="selectedCompany"><img class="u-img" src="../../assets/icon-toggle.png" alt=""><span>{{company_name}}</span></p>
    <p class="msg"><img v-if="!hasInfo" class="u-img" src="../../assets/icon-info.png" alt=""><img v-if="hasInfo" class="u-img" src="../../assets/icon-hasinfo.png" alt=""></p>
    <el-menu theme="dark" class="el-menu-user" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">{{username}}，你好 <span class="title-img"></span></template>
        <el-menu-item index="logout">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import user from '../../service/user';
import company from '../../service/company';
import bus from '../../utils/bus';

export default {
  name: 'con-header',
  data() {
    return {
      company_name: '',
      selectedCompany: false,
      username: '',
      hasInfo: false,
    };
  },
  mounted() {
    this.hasLogin();
    this.getUsession();
    bus.$on('COMPANY_CHANGED', () => {
      this.getCompanyInfo();
    });
  },
  methods: {
    handleSelect(key) {
      if (key === 'logout') {
        user.logout();
      }
    },
    getUsession() {
      const usession = user.getUser();
      this.username = usession.username;
    },
    hasLogin() {
      const token = user.getToken();
      if (!token) {
        user.logout();
      }
    },
    getCompanyInfo() {
      const store = company.getStoredCompany();
      if (store && store.companyList) {
        this.selectedCompany = true;
        this.company_name = store.companyList.companyName;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .con-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 1000;
  }

  .con-header .title {
    background: #243B5F url('../../assets/icon-logo.png') no-repeat center;
    width: 210px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 14px;
    letter-spacing: 2px;
    cursor: pointer;
    float: left;
  }

  .con-header .user {
    position: absolute;
    width: 500px;
    height: 60px;
    line-height: 60px;
    left: 230px;
    float: left;
    color: #fff;
    z-index: 1000;
    cursor: pointer;
  }

  .u-img{
    vertical-align: middle;
    margin-right: 20px;
  }

  .msg {
    position: absolute;
    height: 30px;
    line-height: 30px;
    margin: 15px 0;
    right: 200px;
    z-index: 1000;
    border-right: 1px solid #fff;
  }

  .title-img{
    background: #fff;
    width: 35px;
    height: 35px;
    display: inline-block;
    border-radius: 18px;
    margin: 0 10px;
  }

  /* element cover */

  .el-menu {
    margin-left: 210px;
  }

  .el-menu--horizontal .el-submenu {
    float: right !important;
  }

  .el-menu--dark{
    background: #33457B!important;
  }
</style>
