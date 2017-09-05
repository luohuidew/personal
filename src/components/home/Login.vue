<template>
  <div class="login">
    <div id="canvas-wrapper">
      <canvas id="demo-canvas"></canvas>
    </div>
    <section class="login-inner">
      <a href="javascript:void(0)" class="logo"><img src="../../assets/login-logo.png"/></a>
      <div class="login-main">
        <el-form :model="loginData" :rules="rules" ref="loginData">
          <el-form-item prop="userName">
            <el-input type="text" v-model.trim="loginData.userName" placeholder="请输入手机号/邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model.trim="loginData.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <el-row type="flex" justify="end">
          <el-col :span="12" class="forget-pass"><a href="#/forget_password">忘记密码？</a></el-col>
        </el-row>
        <a href="javascript:void(0)" class="login-now">立即登录</a>
        <div class="trial">
          <a href="#/apply">申请试用<i></i></a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import canvasbg from '../../lib/canvasbg';
export default {
  name: 'login',
  data() {
      var checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('有户名（手机号/邮箱）不能为空'));
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
      };
    return {
      loginData: {
        userName: '', // 用户名
        password: '', // 密码
      }
    };
  },
  rules: {
    userName: [
      { validator: this.checkUserName, trigger: 'blur' }
    ],
    password: [
      { validator: this.validatePassword, trigger: 'blur' }
    ]
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
.forget-pass {
    text-align: right;
}
.forget-pass a {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: rgba(200,200,200,0.70);
  letter-spacing: 6px;
  line-height: 20px;
}
.trial {
  text-align: center;
}
.trial a {
  display: inline-block;
  font-family: NotoSansHans-Regular;
  font-size: 16px;
  color: #546AAC;
  letter-spacing: 7px;
  text-align: center;
  line-height: 24px;
}
.trial a:hover {
  -webkit-opacity: 0.8;
  -moz-opacity: 0.8;
  -khtml-opacity: 0.8;
  opacity: .8;
  filter:alpha(opacity=80);
  -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
}
.trial i{
  position: relative;
  top: 7px;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-left: 3px;
  background: url('../../assets/icon-trial.png') no-repeat center center/24px 24px;
}
</style>
