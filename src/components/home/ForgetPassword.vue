<template>
  <div class="forget">
    <div id="canvas-wrapper">
      <canvas id="demo-canvas"></canvas>
    </div>
    <section class="forget-inner">
      <a :href="homeUrl" class="logo"><img src="../../assets/login-logo.png"/></a>
      <div class="forget-main">
        <el-form :model="forgetData" :rules="rules" ref="forgetForm">
          <el-form-item prop="account" required>
            <el-input type="text" v-model.trim="forgetData.account" placeholder="请输入您的注册邮箱/手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code" required>
            <div class="get-code">
              <el-input type="code" v-model.trim="forgetData.code" placeholder="请输入验证码"></el-input>
              <el-button type="text" class="code-info" @click="getCode();">获取验证码</el-button>
            </div>
          </el-form-item>
          <el-form-item prop="newPassword" required>
            <el-input type="password" v-model.trim="forgetData.newPassword" placeholder="设置新密码"></el-input>
          </el-form-item>
          <el-form-item prop="checkPassword" required>
            <el-input type="password" v-model.trim="forgetData.checkPassword" placeholder="再次输入新密码"></el-input>
          </el-form-item>
          <el-form-item class="submit-btn">
            <a href="javascript:void(0)" @click="submit('forgetForm');" class="submit-now">提交</a>
          </el-form-item>
        </el-form>
      </div>
    </section>
    <el-dialog :visible.sync="dialogVisible" size="tiny" class="forget-password">
      <el-form :model="imgCodeData" :rules="rules" ref="forgetForm">
        <el-form-item prop="imgcode" required>
          <div class="get-code">
            <el-input v-model.trim="imgCodeData.imgcode" placeholder="请输入图片验证码"></el-input>
            <span class="code-info"><img class="hashImgCode" :src="imgCodeData.imgUrl" role="button" @click="getImgCode(forgetData.account);"/></span>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkImageCode(forgetData.account)">点击获取</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import canvasbg from '@/lib/canvasbg';
import validate from '@/utils/validation';
import toolServer from '@/service/common';
import forgetPassServer from '@/service/forgetPassword';

export default {
  name: 'forget-password',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.forgetData.newPassword !== '') {
          this.$refs.forgetForm.validateField('checkPassword');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.forgetData.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      homeUrl: 'http://localhost:8000/home.html',
      hash: Math.random(),
      forgetData: {
        account: '', // 用户名
        code: '', // 验证码
        newPassword: '', // 设置新密码
      },
      imgCodeData: {  // 图形验证码
        imgcode: '',
        imgUrl: '',
      },
      rules: {
        account: [
          { validator: this.checkUserName, trigger: 'blur' },
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
        ],
        newPassword: [
          { validator: validatePass, trigger: 'blur' },
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' },
        ],
        imgcode: [
          { validator: this.validateCode, trigger: 'blur' },
        ],
      },
      isPhone: false, // 判断输入是否为手机号
      dialogVisible: false,
      errorMsg: {}, // 错误信息
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
    getCode() {
      this.$refs.forgetForm.validateField('account', (valid) => {
        if (valid === '') {
          if (this.isPhone) {  // 手机号需要图片验证码
            this.dialogVisible = true;
            this.getImgCode(this.forgetData.account);
          } else {
            this.getPhoneCode(this.forgetData.account);
          }
        }
      });
    },
    getImgCode(user) {
      toolServer.getImgCode(user).then((resp) => {
        this.imgCodeData.imgUrl = resp;
      });
    },
    checkImageCode(arg1) {
      this.$refs.forgetForm.validateField('imgcode', (valid) => {
        if (valid === '') {
          this.getPhoneCode(arg1);
          this.dialogVisible = false;
        }
      });
    },
    getPhoneCode(arg) {
      toolServer.sendMsg(arg);
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          forgetPassServer.forgetPassword(this.forgetData).then((resp) => {
            if (resp.code.code === 200) {
              this.$router.push({ name: 'Login' });
            } else {
              this.$message.error(resp.code.msg);
            }
          });
        }
      });
    },
    validateCode(rule, value, callback) {
      let result = '';
      if (!value) {
        result = callback(new Error('验证码不能为空！'));
      } else {
        toolServer.checkImgCode(this.forgetData.account, this.imgCodeData.imgcode).then((resp) => {
          if (resp.code.code === 200) {
            this.errorMsg = resp.code;
            result = callback();
          } else {
            this.errorMsg = resp.code;
            result = callback(new Error('验证码错误'));
          }
        });
      }
      return result;
    },
    checkUserName(rule, value, callback) {
      let result = '';
      const result1 = validate.isPhoneAvailable(value);
      const result2 = validate.isEmailAvailable(value);
      if (!value) {
        result = callback(new Error('用户名（手机号/邮箱）不能为空！'));
      } else if (result1 !== 'ok' && result2 !== 'ok') {
        result = callback(new Error('请输入正确的手机号/邮箱！'));
      } else if (result1 === 'ok') {
        toolServer.checkPhoneExist(value).then((resp) => {
          if (resp.code.code === -1) {
            result = callback(new Error('该手机号不存在'));
          } else {
            this.isPhone = true;
            result = callback();
          }
        });
      } else if (result2 === 'ok') {
        this.isPhone = false;
        toolServer.checkEmailExist(value).then((resp) => {
          if (resp.code.code === -1) {
            result = callback(new Error('该邮箱不存在'));
          } else {
            result = callback();
          }
        });
      }
      return result;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.get-code {
  position: relative;
  margin: 20px 0 0;
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
  border-left: 1px solid #EAEAEA;
  text-align: right;
  padding:5px 15px;
}
.el-form-item.submit-btn {
  margin-top:44px;
  margin-bottom: 0 !important;
}
.code-info img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
