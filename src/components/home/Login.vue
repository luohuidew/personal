<script src="../../service/user.js"></script>
<template>
  <div class="login">
    <div id="canvas-wrapper">
      <canvas id="demo-canvas"></canvas>
    </div>
    <section class="login-inner">
      <a class="logo" :href="homeUrl"><img src="../../assets/login-logo.png"/></a>
      <div class="login-main">
        <el-form :model="loginData" :rules="rules" ref="loginData">
          <el-form-item prop="username" required>
            <el-input type="text" v-model.trim="loginData.username" placeholder="请输入手机号/邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password" required>
            <el-input type="password" v-model.trim="loginData.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="login-edit">
            <el-row type="flex" justify="end">
              <el-col :span="12" class="forget-pass"><router-link to="/forget_password">忘记密码？</router-link></el-col>
            </el-row>
            <a class="login-now" @click="loginRequest('loginData')">立即登录</a>
            <div class="trial">
              <router-link to="/apply">申请试用</router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import canvasbg from '../../lib/canvasbg';
import validate from '../../utils/validation';
import user from '../../service/user';

export default {
  name: 'login',
  data() {
    return {
      homeUrl: '/home.html',
      loginData: {
        username: '', // 用户名
        password: '', // 密码
      },
      rules: {
        username: [
          { validator: this.checkUserName, trigger: 'blur' },
        ],
        password: [
          { validator: this.validatePassword, trigger: 'blur' },
        ],
      },
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
    checkUserName(rule, value, callback) {
      const result1 = validate.isPhoneAvailable(value);
      const result2 = validate.isEmailAvailable(value);
      if (result1 !== 'ok' && result2 !== 'ok') {
        callback(new Error('请输入正确的电话或邮箱格式'));
      } else {
        callback();
      }
    },
    validatePassword(rule, value, callback) {
      const result = validate.isPasswordAvailable(value);
      if (result !== 'ok') {
        callback(new Error(result));
      } else {
        callback();
      }
    },
    loginRequest(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          user.login(this.loginData);
        }
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
  opacity: .8;
  filter:alpha(opacity=80);
  -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
}
.login-now {
  cursor: pointer;
}
.el-form-item.login-edit {
  margin-bottom: 0 !important;
}
</style>
