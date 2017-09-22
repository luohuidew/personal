<template>
  <div class="invitation">
    <div class="top"><img src="../../assets/login-logo.png"/></div>
    <!--<div id="canvas-wrapper">
      <canvas id="demo-canvas"></canvas>
    </div>-->
    <div class="login-inner contain">
      <!--<a class="logo"><img src="../../assets/login-logo.png"/></a>-->
      <div class="login-main main-con">
        <div class="con-tit">已有账号接受邀请</div>
        <el-form :model="loginData">
          <el-form-item prop="username" required>
            <el-input type="text" v-model.trim="loginData.username" placeholder="请输入手机号/邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password" required>
            <el-input type="password" v-model.trim="loginData.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <a class="btn" @click="Login">立即登录</a>
          </el-form-item>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <router-link class="return backLt" :to="{ path: '/invitation_index' }">&lt;返回</router-link>
            </el-form-item>
            <el-form-item>
              <router-link class="return backRt" :to="{ path: '/invitation_register' }">注册新账号</router-link>接受邀请
            </el-form-item>
          </el-form>
        </el-form>
      </div>
      <div class="noneBlock"></div>
    </div>
    
  </div>
</template>

<script>
  // import canvasbg from '../../lib/canvasbg';
  // import commonService from '../../service/common';

  export default {
    name: '',
    data() {
      return {
        loginData: {
          username: undefined,
          password: undefined,
        },
      };
    },
    created() {
      this.initData();
    },
    methods: {
      initData() {
        // TODO:通过code获取受邀人的邮箱和信息
      },
      // --------
      Login() {
        // TODO：登录接口
      },
    },
  };
</script>

<style scoped>
.top{
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #dce2ee;
  padding: 0 20px;
}
.top img{
  margin-top: 10px;
}
.contain{
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 4px 3px -5px #333;
  border-radius: 3px;
}
.main-con{
  width: 400px;
  margin: auto;
  padding: 100px 40px;
  color: #555;
}
.el-input{
  width: 100% !important;
}
.login{
  color: #555;
}
.con-tit{
  font-size: 24px;
  font-weight: 400px;
  padding: 40px 0px 70px;
  text-align: center;
}
.sendEmail{
  color: #546AAC;
  font-size: 10px;
  position: absolute;
  top: 25px;
  right: 5px;
}
.btn{
  background-color: #546AAC;
  color: #fff;
  border-radius: 4px;
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  display: block;
  text-align: center;
  margin-top: 25px;
  cursor: pointer;
}
.btn:hover{
  opacity: 0.8;
  filter:alpha(opacity=80);
}
.backLt{
  margin-right: 185px;
  color: #555;
}
.backRt{
  color: #546AAC;
  text-decoration: underline;
}
.noneBlock{
  height: 100px;
}
</style>
