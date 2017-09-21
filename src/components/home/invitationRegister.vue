<template>
  <div class="login">
    <div id="canvas-wrapper">
      <canvas id="demo-canvas"></canvas>
    </div>
    <div class="login-inner">
      <!--<a class="logo" :href="homeUrl"><img src="../../assets/login-logo.png"/></a>-->
      <div class="login-main">
        <div class="con-tit">注册CapTable账号</div>
        <el-form :model="registerData" :rules="rules">
          <el-form-item prop="email" required>
            <el-input type="text" v-model.trim="registerData.email" placeholder="name@example.com"></el-input>
          </el-form-item>
          <el-form-item prop="emailCode" required>
            <el-input type="text" v-model.trim="registerData.emailCode" placeholder="验证码"></el-input>
            <a class="sendEmail" @click="sendCode">发送验证码至该邮箱</a>
          </el-form-item>
          <el-form-item prop="password" required>
            <el-input type="password" v-model.trim="registerData.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="rePassword" required>
            <el-input type="password" v-model.trim="registerData.rePassword" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <a class="btn">完成注册并登录股书</a>
          </el-form-item>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <router-link class="return backLt" :to="{ path: '/invitation_index' }">&lt;返回</router-link>
            </el-form-item>
            <el-form-item>
              <router-link class="return backRt" :to="{ path: '/login' }">其他已有账号</router-link>接受邀请
            </el-form-item>
          </el-form>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import canvasbg from '../../lib/canvasbg';
import validate from '../../utils/validation';

export default {
  name: '',
  data() {
    return {
      registerData: {
        email: undefined,
        password: undefined,
        rePassword: undefined,
      },
      rules: {
        email: [
          { validator: this.validateEmail, trigger: 'blur' },
        ],
        emailCode: [
          { validator: this.validateEmailCode, trigger: 'blur' },
        ],
        password: [
          { validator: this.validatePassword, trigger: 'blur' },
        ],
        rePassword: [
          { validator: this.validateRePassword, trigger: 'blur' },
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
    sendCode() {
    },
    // 校验信息
    // 邮箱验证
    validateEmail(rule, value, callback) {
      const result = validate.isEmailAvailable(value);
      if (result !== 'ok') {
        callback(new Error(result));
      } else {
        callback();
      }
    },
    // 密码验证
    validatePassword(rule, value, callback) {
      const result = validate.isPasswordAvailable(value);
      if (result !== 'ok') {
        callback(new Error(result));
      } else {
        callback();
      }
    },
    // 密码二次确认验证
    validateRePassword(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    },
    // 验证码
  },
};
</script>
<style scoped>
.login{
  color: #555;
}
.con-tit{
  font-size: 24px;
  font-weight: 400px;
  padding: 40px 0px;
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
}
.backLt{
  margin-right: 185px;
  color: #555;
}
.backRt{
  color: #546AAC;
  text-decoration: underline;
}
</style>
