<template>
  <div class="apply">
    <div id="canvas-wrapper">
      <canvas id="demo-canvas"></canvas>
    </div>
    <div class="apply-inner">
      <a href="javascript:void(0)" class="logo"><img src="../../assets/login-logo.png"/></a>
        <div class="apply-main">
          <el-form :model="applyData" :rules="rules" ref="applyData">
            <el-form-item prop="username" required>
              <el-input type="text" v-model.trim="applyData.username" placeholder="请输入您的名称"></el-input>
            </el-form-item>
            <el-form-item prop="companyName" required>
              <el-input type="text" v-model.trim="applyData.companyName" placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item prop="email" required>
              <el-input type="email" v-model.trim="applyData.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            <el-form-item prop="phone" required>
              <el-input type="phone" v-model.number.trim="applyData.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="remarks">
              <el-input type="textarea" v-model.trim="applyData.remarks" :autosize="{ minRows: 1, maxRows: 4}" placeholder="备注点什么？" class="texarea"></el-input>
            </el-form-item>
            <el-form-item>
              <a class="apply-now" @click="applyLogin('applyData')">申请试用</a>
            </el-form-item>
          </el-form>
        </div>
    </div>
  </div>
</template>

<script>
import canvasbg from '../../lib/canvasbg';
import validate from '../../utils/validation';
import Apply from '../../service/apply';

export default {
  name: 'apply',
  data() {
    return {
      applyData: {
        username: '', // 名称
        companyName: '', // 公司名称
        email: '', // 邮箱地址
        phone: '', // 电话号码
        remarks: '', // 备注
      },
      rules: {
        username: [
          { validator: this.checkUsername, trigger: 'blur' },
        ],
        companyName: [
          { validator: this.checkCompanyName, trigger: 'blur' },
        ],
        email: [
          { validator: this.checkEmail, trigger: 'blur' },
        ],
        phone: [
          { validator: this.checkTel, trigger: 'blur' },
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
    checkPassword(rule, value, callback) {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    },
    checkUsername(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入您的名称'));
      } else {
        callback();
      }
    },
    checkCompanyName(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入公司名称'));
      } else {
        callback();
      }
    },
    checkEmail(rule, value, callback) {
      let r = '';
      if (!value) {
        r = callback(new Error('邮箱不能为空！'));
      } else if (!validate.isEmailAvailable(value)) {
        // 如果不符合邮箱的情况下
        r = callback(new Error('请输入正确的邮箱！'));
      } else {
        callback();
      }
      return r;
    },
    checkTel(rule, value, callback) {
      let r = '';
      if (!value) {
        r = callback(new Error('手机号不能为空！'));
      } else if (!validate.isPhoneAvailable(value)) {
        // 如果不符合电话号码的情况下
        r = callback(new Error('请输入正确的手机号！'));
      } else {
        callback();
      }
      return r;
    },
    applyLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Apply.apply(this.applyData).then(() => {
            this.$router.push({ name: 'Login' });
          });
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.texarea.el-textarea .el-textarea__inner{
  border: none;
}
@media screen and (max-width: 1435px) {
  .login .el-input, .apply .el-input, .apply .el-textarea, .forget .el-input {
    margin: 8px 0 !important;
  }
  .apply .apply-inner {
    padding-bottom: 50px !important;
  }
  .apply .apply-now {
    margin-bottom: 0 !important;
    margin-top: 30px !important;
  }
}
</style>
