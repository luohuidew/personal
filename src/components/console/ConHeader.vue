<template>
  <div class="con-header">
    <span class="title"></span>
    <!--<span class="user"><span class="cont">{{uusessions_name}}</span><i class="el-icon-caret-bottom"></i></span>-->
    <el-menu theme="dark" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">abc</template>
        <el-menu-item index="logout">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'con-header',
  data() {
  },
  methods: {
    handleSelect() {
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
    height: 100%;
    line-height: 60px;
    text-align: center;
    font-size: 14px;
    letter-spacing: 2px;
    cursor: pointer;
    float: left;
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
