<template>
  <div class="invitation">
    <div class="top"><img src="../../assets/login-logo.png"/></div>
    <!--<div id="canvas-wrapper">
      <canvas id="demo-canvas"></canvas>
    </div>-->
    <div class="login-inner contain">
      <!--<a class="logo" :href="homeUrl"><img src="../../assets/login-logo.png"/></a>-->
      <div class="login-main main-con">
        <div class="con-tit">注册CapTable账号</div>
        <el-form :model="registerData" :rules="rules" ref="registerData">
          <el-form-item prop="email" required>
            <el-input type="text" class="inputClass" v-model.trim="registerData.email" placeholder="name@example.com"></el-input>
          </el-form-item>
          <el-form-item prop="emailCode" required>
            <el-input type="text" v-model.trim="registerData.emailCode" placeholder="验证码"></el-input>
            <a class="sendEmail" @click="getImgCode">发送验证码至该邮箱</a>
          </el-form-item>
          <el-form-item prop="password" required>
            <el-input type="password" v-model.trim="registerData.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="rePassword" required>
            <el-input type="password" v-model.trim="registerData.rePassword" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <a class="btn" @click="registerBtn('registerData')">完成注册并登录CapTable</a>
          </el-form-item>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <span class="return backLt" @click="indexLink">&lt;返回</span>
            </el-form-item>
            <el-form-item>
              <span class="return backRt" @click="loginLink">其他已有账号</span>接受邀请
            </el-form-item>
          </el-form>
        </el-form>
      </div>
      <div class="noneBlock"></div>
    </div>
    <!--验证码弹框-->
    <el-dialog :model="dialogCodeData" :visible.sync="dialogCode" size="tiny">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="dialogCodeData.inputCode" placeholder="验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <img :src="dialogCodeData.imgUrl" style="height: 40px;" role="button">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="checkImgCode">点击获取</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script scoped>
// import canvasbg from '../../lib/canvasbg';
import validate from '@/utils/validation';
import commonService from '@/service/common';
import pService from '@/service/participator';
import userService from '@/service/user';

export default {
  name: 'InvitationRegister',
  data() {
    return {
      dialogCode: false,
      dialogCodeData: {
        inputCode: undefined,
        imgUrl: undefined,
      },
      registerData: {
        email: undefined,
        emailCode: undefined,
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
    this.initData();
  },
  methods: {
    initData() {
      this.registerData.companyCode = this.$route.params.code;
      pService.getCompanyInfoByCode(this.registerData.companyCode).then((resp) => {
        if (resp.code.code === 200) {
          this.registerData.email = resp.data.email;
        }
      }, (resp) => {
        this.$message.error(resp.code.msg);
      });
    },
    getImgCode() {
      // TODO:打开输入验证码弹框，返回图片地址
      commonService.getImgCode(this.registerData.email).then((resp) => {
        this.dialogCode = true;
        this.dialogCodeData.imgUrl = resp;
      });
    },
    checkImgCode() {
      commonService.checkImgCode(this.registerData.email, this.dialogCodeData.inputCode)
      .then((resp) => {
        // TODO:填写验证码正确则发送验证码到该邮箱
        if (resp.code.code === 200) {
          commonService.sendMsg(this.registerData.email).then((result) => {
            if (result.code.code === 200) {
              // 发送验证码到邮箱成功
              this.dialogCode = false;
            }
          }, (result) => {
            // 发送验证码到邮箱失败
            this.$message.error(result.code.msg);
          });
        }
      }, (resp) => {
        // 填写的验证码与图片不符合
        this.$message.error(resp.code.msg);
      });
    },
    registerBtn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // TODO：完成注册并登录
          pService.registerParticipator(this.registerData).then((resp) => {
            if (resp.code.code === 200) {
              this.user.username = this.registerData.email;
              this.user.password = this.registerData.password;
              userService.login(this.user);
            }
          }, (resp) => {
            this.$message.error(resp.code.msg);
          });
        }
      });
    },
    // ********************* 跳转 *************************
    loginLink() {
      this.$router.push({
        name: 'InvitationLogin',
        params: { code: this.registerData.companyCode },
      });
    },
    indexLink() {
      this.$router.push({
        name: 'InvitationIndex',
        params: { code: this.registerData.companyCode },
      });
    },
    // ********************* 校验信息 *************************
    // 邮箱验证
    validateEmail(rule, value, callback) {
      const result = validate.isEmailAvailable(value);
      if (result !== 'ok') {
        callback(new Error(result));
      } else {
        commonService.checkEmailExist(value).then((resp) => {
          if (resp.code.code === -1) {
            callback();
          }
        }, (resp) => {
          callback(new Error(resp.code.msg));
        });
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
    validateEmailCode(rule, value, callback) {
      // TODO:判断验证码是否正确
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
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
.con-tit{
  font-size: 24px;
  font-weight: 400px;
  padding: 40px 0px 60px;
  text-align: center;
  /*margin-left: 50px;*/
}
.el-input{
  width: 100% !important;
}
.main-con .el-input__inner.inputClass{
  height: 46px !important;
  border: 0 none !important;
  border-bottom: 1px solid rgba(213, 213, 213, 0.40) !important;
}
.sendEmail{
  color: #546AAC;
  font-size: 10px;
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
}
span{
  cursor: pointer;
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
  margin-right: 195px;
  color: #555;
}
.backRt{
  color: #546AAC;
  text-decoration: underline;
}
</style>
