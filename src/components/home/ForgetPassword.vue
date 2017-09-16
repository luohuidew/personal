<template>
  <div class="forget">
    <div id="canvas-wrapper">
      <canvas id="demo-canvas"></canvas>
    </div>
    <section class="forget-inner">
      <a :href="homeUrl" class="logo"><img src="../../assets/login-logo.png"/></a>
      <div class="forget-main">
        <el-form :model="forgetData" :rules="rules" ref="forgetData">
          <el-form-item prop="userName" required>
            <el-input type="text" v-model.trim="forgetData.userName" placeholder="请输入您的注册邮箱/手机号"></el-input>
          </el-form-item>
          <el-form-item v-if="phoneImgCodeShow" prop="imgCode" required>
            <div class="get-code">
              <el-input type="password" v-model.trim="forgetData.imgCode" placeholder="请输入图片验证码"></el-input>
              <span class="code-info"><img class="hashImgCode" :src="`validateCode/${forgetData.userName}/?=_`+hash" role="button" @click="hash = Math.random()"/></span>
            </div>
          </el-form-item>
          <el-form-item prop="phoneCode" required>
            <div class="get-code">
              <el-input type="password" v-model.trim="forgetData.phoneCode" placeholder="请输入验证码"></el-input>
              <span class="code-info">获取验证码</span>
            </div>
          </el-form-item>
          <el-form-item prop="newPassword" required>
            <el-input type="password" v-model.trim="forgetData.newPassword" placeholder="设置新密码"></el-input>
          </el-form-item>
          <el-form-item class="submit-btn">
            <a href="javascript:void(0)" class="submit-now">提交</a>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import canvasbg from '../../lib/canvasbg';
import validate from '../../utils/validation';
import personal from '../../service/personalInfo';

export default {
  name: 'forget_password',
  data() {
    return {
      homeUrl: 'http://localhost:8000/home.html',
      hash: Math.random(),
      phoneImgCodeShow: false, // 默认进来图片验证码不可见
      forgetData: {
        userName: '', // 用户名
        phoneCode: '', // 验证码
        newPassword: '', // 设置新密码
        imgCode: '',
      },
      rules: {
        userName: [
          { validator: this.checkUserName, trigger: 'blur' },
        ],
        newPassword: [
          { validator: this.checkPassword, trigger: 'blur' },
        ],
        phoneCode: [
          { validator: this.checkCaptcha, trigger: 'blur' },
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
      let result = '';
      if (validate.isPhoneAvailable(value)) { // 如果是手机号
        this.phoneImgCodeShow = true;
      }
      if (!value) {
        result = callback(new Error('有户名（手机号/邮箱）不能为空！'));
      } else if (!validate.isPhoneAvailable(value) && !validate.isEmailAvailable(value)) {
        // 如果不符合邮箱也不符合电话号码的情况下
        result = callback(new Error('请输入正确的手机号/邮箱！'));
      } else {
        callback();
      }
      return result;
    },
    checkImgCode() {
      personal.checkImgCode(this.usefulData.newPhone, this.usefulData.imgCode).then((resp) => {
        console.log(resp);
        this.disabled = false;
        return true;
      //   if (resp.data === 'error') {
      //     this.$message.error('图形验证码不正确');
      //     this.disabled = true;
      //     return false;
      //   }
      //   this.disabled = false;
      //   return true;
      // }, () => {
      //   this.$message.error('图形验证码不正确');
      // });
      });
    },
    checkPassword(rule, value, callback) {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    },
    checkCaptcha(rule, value, callback) {
      if (value === '') {
        callback(new Error('验证码不能为空'));
      } else {
        callback();
      }
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
.el-form-item.submit-btn {
  margin-bottom: 0 !important;
}
.code-info img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
