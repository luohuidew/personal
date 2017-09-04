<template>
  <div class="forget">
    <div id="canvas-wrapper">
      <canvas id="demo-canvas"></canvas>
    </div>
    <section class="forget-inner">
      <a href="javascript:void(0)" class="logo"><img src="../../assets/login-logo.png"/></a>
      <div class="forget-main">
        <el-input type="text" v-model.trim="userName" placeholder="请输入您的注册邮箱/手机号"></el-input>
        <div class="get-code">
          <el-input type="password" v-model.trim="captcha" placeholder="请输入验证码"></el-input>
          <span class="code-info">获取验证码</span>
        </div>
        <el-input type="password" v-model.trim="newPassword" placeholder="设置新密码"></el-input>
        <a href="javascript:void(0)" class="submit-now">提交</a>
      </div>
    </section>
  </div>
</template>

<script>
import canvasbg from '../../lib/canvasbg';
export default {
  name: 'forget_password',
  data() {
    return {
      userName: '', // 用户名
      captcha: '', // 验证码
      newPassword: '', // 设置新密码
    };
  },
  mounted() {
    this.canvas();
  },
  methods: {
    canvas() {
      canvasbg.init({
        Loc: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 3.3,
        },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.get-code {
  position: relative;
  margin: 20px 0;
  border-bottom: 1px solid rgba(213,213,213,0.40);
}
.get-code .el-input {
  padding-right: 115px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.code-info {
  position: absolute;
  right: 0;
  bottom: 15px;
  width: 110px;
  font-family: NotoSansHans-Regular;
  color: #546AAC;
  letter-spacing: 6px;
  line-height: 15px;
  border-left: 2px solid #EAEAEA;
  text-align: right;
  cursor: default;
}
</style>
