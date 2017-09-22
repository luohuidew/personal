<template>
  <div class="user-personal-info">
    <!---->
    <div class="head-pic-wrap">
      <img :src="headUrl" height="116" width="116" alt="头像">
      <div class="head-btn">
        <el-upload
          :show-file-list="false"
          :action="qiniuServer"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :on-error="handleError"
          :data="uploadData">
          <el-button type="text" v-if="!editing">修改头像</el-button>
        </el-upload>
        <span class="head-btn-span" v-if="editing" @click="submit('portrait')">保存</span>
        <span class="head-btn-span" v-if="editing" @click="cancel">取消</span>
      </div>
    </div>
    <!---->
    <div class="base-info-wrap">
      <div class="row row1">
        <div class="in-row title">
          <span>基础信息</span>
        </div>
        <div class="in-row">
          <span>用户名称</span>
          <span>{{info.username}}</span>
        </div>
        <div class="in-row">
          <span>绑定邮箱</span>
          <span>{{info.emailHide}}</span>
          <span @click="emailDialogVisible = true">修改</span>
        </div>
        <div class="in-row">
          <span>绑定手机</span>
          <span>{{info.phoneHide}}</span>
          <span v-show="info.phone" @click="phoneDialogVisible = true">解绑</span>
          <span v-show="!info.phone" @click="openBunding">绑定</span>
        </div>
      </div>
      <div class="row row2">
        <div class="in-row title">
          <span>安全设置</span>
        </div>
        <div class="in-row">
          <span>实名认证</span>
          <span v-if="info.authenticate != '2'">{{info.authenticate | filter('ID_AUTHENTICATION')}}</span>
          <span v-else="">{{info.username}}</span>
          <span v-if="info.authenticate != '2'">实名认证</span>
          <span v-else="">已认证</span>
        </div>
        <div class="in-row">
          <span>签名管理</span>
          <span><img src="" alt="签名图片"></span>
          <span>设置</span>
        </div>
        <div class="in-row">
          <span>账号安全</span>
          <span></span>
          <span>修改密码</span>
        </div>
      </div>
      <div class="row row3">
        <p>*</p>
        <div>
          <p>接受期权授予协议，必须要完成实名认证才能顺利签字。</p>
          <p>实名认证审核时间约为1个工作日，请您合理安排认证时间，避免耽误签字。</p>
        </div>
      </div>
    </div>
    <!---->
    <el-dialog title="修改邮箱" :visible.sync="emailDialogVisible" size="small" :before-close="handleCloseD1">
      <el-form :model="emailForm" ref="emailForm" :rules="rules">
        <div style="margin-bottom: 10px;" v-show="step == 1">为保障您的账号安全，请输入账号密码进行验证。</div>
        <el-form-item label="密码：" :label-width="formLabelWidth" v-show="step == 1" prop="password">
          <el-input type="password" v-model="emailForm.password"></el-input>
        </el-form-item>
        <el-form-item label="新邮箱：" :label-width="formLabelWidth" v-show="step == 2" prop="email">
          <el-input v-model="emailForm.email"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" :label-width="formLabelWidth" v-show="step == 2">
          <el-input class="e-code-l" v-model="emailForm.validateCode"></el-input>
          <el-button class="e-code-r" @click="getEmailCode">{{yzmText}}</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="next" v-show="step == 1"> 下一步 </el-button>
        <el-button type="success" @click="submit('email')" v-show="step == 2"> 确 定 </el-button>
        <el-button @click="handleCloseD1" v-show="step == 2"> 取 消 </el-button>
      </span>
    </el-dialog>
    <!---->
    <el-dialog title="手机解绑" :visible.sync="phoneDialogVisible" size="small" :before-close="handleCloseD1">
      <el-form :model="emailForm" ref="emailForm" :rules="rules">
        <div style="margin-bottom: 10px;" v-show="step == 1">为保障您的账号安全，请输入账号密码进行验证。</div>
        <el-form-item label="密码：" :label-width="formLabelWidth" v-show="step == 1" prop="password">
          <el-input type="password" v-model="emailForm.password"></el-input>
        </el-form-item>
        <el-form-item label="" label-width="10px" v-show="step == 2">
          <span style="color:#2678B8;font-weight: bold">验证成功！ </span><br>
          解除绑定后您将无法用当前绑定手机号继续登录CapTable平台并接收相关信息。
          是否确定要接除绑定？
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="next" v-show="step == 1"> 下一步 </el-button>
        <el-button type="success" @click="submit('phoneUnbunding')" v-show="step == 2"> 确 定 </el-button>
        <el-button @click="handleCloseD1" v-show="step == 2"> 取 消 </el-button>
      </span>
    </el-dialog>
    <!---->
    <el-dialog title="手机绑定" :visible.sync="phoneDialogVisible2" size="small" :before-close="handleCloseD1">
      <el-form :model="emailForm" ref="emailForm" :rules="rules">
        <div style="margin-bottom: 10px;" v-show="step == 1">为保障您的账号安全，请输入账号密码进行验证。</div>
        <el-form-item label="密码：" :label-width="formLabelWidth" v-show="step == 1" prop="password">
          <el-input type="password" v-model="emailForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" label-width="120px" prop="phone" v-show="step == 2">
          <el-input v-model="emailForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="图形验证码：" label-width="120px" v-show="step == 2">
          <el-input class="e-code-l" v-model="emailForm.validateCodeImg"></el-input>
          <img class="e-code-r"  style="cursor: pointer" :src="imgSrc" alt="验证码图片" @click="getValidateCode">
        </el-form-item>
        <el-form-item label="短信验证码：" label-width="120px" v-show="step == 2">
          <el-input class="e-code-l" v-model="emailForm.validateCode"></el-input>
          <el-button class="e-code-r" @click="getPhoneCode">{{yzmText}}</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="next" v-show="step == 1"> 下一步 </el-button>
        <el-button type="success" @click="submit('phoneBunding')" v-show="step == 2"> 确 定 </el-button>
        <el-button @click="handleCloseD1" v-show="step == 2"> 取 消 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import filters from '../../../utils/filters';
import common from '../../../service/common';
import user from '../../../service/user';
import validate from '../../../utils/validation';
import personalInfo from '../../../service/personalInfo';
import { QINIU_BUCKET_DOMAIN, QINIU_SERVER } from '../../../data/constants';

export default {
  name: 'user-personal-info',
  data() {
    return {
      headUrl: '../../../../static/img/head-img.png', // 填充图片
      formLabelWidth: '80px',
      yzmText: '发送验证码',
      qiniuServer: QINIU_SERVER,
      imgSrc: '',
      uploadData: {
        token: '',
      },
      editing: false,
      emailDialogVisible: false,
      phoneDialogVisible: false,
      phoneDialogVisible2: false,
      emailForm: {// phone email共用
        password: undefined,
        email: undefined,
        validateCode: undefined,
        phone: undefined,
        validateCodeImg: undefined,
      },
      step: 1,
      info: {
        id: '',
        idCardImgPositiveUrl: '',
        idType: '',
        portrait: '',
        idCardImgNegativeUrl: '',
        handheldIdCardImgUrl: '',
        phone: '',
        phoneHide: '',
        idNumber: '',
        signatureUrl: '',
        username: '',
        email: '',
        emailHide: '',
        authenticate: '',
      },
      rules: {
        email: [
          { validator: this.checkEmail, trigger: 'blur' },
        ],
        phone: [
          { validator: this.checkPhone, trigger: 'blur' },
        ],
      },
    };
  },
  filters: {
    filter(arg1, arg2) {
      return filters.constantsFilter(arg1, arg2);
    },
  },
  created() {
    this.initData();
    this.getQiNiuToken();
  },
  methods: {
    initData() {
      personalInfo.getUserInfoByUid().then((resp) => {
        this.info = resp;
        if (resp.portrait) {
          this.headUrl = resp.portrait;
        } else {
          this.info.portrait = this.headUrl;
        }
      });
    },
    submit(type) {
      const params = {};
      params.id = this.info.id;
      if (type === 'portrait') {
        params.portrait = this.headUrl;
        this.update(params);
      }
      if (type === 'email') {
        params.email = this.emailForm.email;
        params.validateCode = this.emailForm.validateCode;
        this.$refs.emailForm.validate((valid) => {
          if (valid) {
            this.update(params, 'logout');
          }
        });
      }
      if (type === 'phoneBunding') {
        params.phone = this.emailForm.phone;
        params.validateCode = this.emailForm.validateCode;
        this.$refs.emailForm.validate((valid) => {
          if (valid) {
            this.update(params, 'logout');
          }
        });
      }
      if (type === 'phoneUnbunding') {
        params.phone = '';
        this.update(params, 'logout');
      }
    },
    update(params, type) {
      personalInfo.updateUserInfo(params).then((resp) => {
        if (resp && type === 'logout') {
          this.$alert('保存成功,请重新登录。', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              user.logout();
            },
            beforeClose: (done) => {
              user.logout();
              done();
            },
          });
        } else if (resp) {
          this.$message.info('保存成功');
          this.initData();
        }
        this.editing = false;
        this.handleCloseD1();
      });
    },
    cancel() {
      this.headUrl = this.info.portrait;
      this.editing = false;
    },
    openBunding() {
      this.phoneDialogVisible2 = true;
      this.getValidateCode();
    },
    next() {
      common.checkPWD(this.emailForm.password).then((resp) => {
        if (resp.data.code === 200) {
          this.step = 2;
        } else {
          this.$message.warning(resp.data.msg);
        }
      });
    },
    handleCloseD1() {
      this.emailForm = {
        password: undefined,
        email: undefined,
        validateCode: undefined,
        phone: undefined,
      };
      this.$refs.emailForm.resetFields();
      this.emailDialogVisible = false;
      this.phoneDialogVisible = false;
      this.phoneDialogVisible2 = false;
      this.step = 1;
    },
    checkEmail(rule, value, callback) {
      const result = validate.isEmailAvailable(value);
      if (result !== 'ok') {
        callback(new Error(result));
      } else {
        callback();
      }
    },
    checkPhone(rule, value, callback) {
      const result = validate.isPhoneAvailable(value);
      if (result !== 'ok') {
        callback(new Error(result));
      } else {
        callback();
      }
    },
    checkCode(rule, value, callback) {
      if (!value && this.emailForm.email) {
        callback(new Error('请填写验证码'));
      } else {
        callback();
      }
    },
    getEmailCode() {
      if (this.yzmText !== '发送验证码') {
        return;
      }
      this.$refs.emailForm.validate((valid) => {
        if (valid) {
          common.checkEmailExist(this.emailForm.email).then((resp) => {
            if (resp.data.code === 200) {
              this.$message.warning(resp.data.msg);
            } else {
              common.sendMsg(this.emailForm.email);
              let init = 120;
              const timer = setInterval(() => {
                this.yzmText = `${init} s`;
                init -= 1;
                if (init < 0) {
                  this.yzmText = '发送验证码';
                  clearInterval(timer);
                }
              }, 1000);
            }
          });
        }
      });
    },
    getValidateCode() {
      common.getImgCode(this.emailForm.phone).then((resp) => {
        this.imgSrc = resp;
      });
    },
    getPhoneCode() {
      if (this.yzmText !== '发送验证码') {
        return;
      }
      common.checkImgCode(this.emailForm.phone, this.emailForm.validateCodeImg).then((response) => {
        if (response) {
          this.$refs.emailForm.validate((valid) => {
            if (valid) {
              common.checkPhoneExist(this.emailForm.phone).then((resp) => {
                if (resp.data.code === 200) {
                  this.$message.warning(resp.data.msg);
                } else {
                  common.sendMsg(this.emailForm.phone);
                  let init = 120;
                  const timer = setInterval(() => {
                    this.yzmText = `${init} s`;
                    init -= 1;
                    if (init < 0) {
                      this.yzmText = '发送验证码';
                      clearInterval(timer);
                    }
                  }, 1000);
                }
              });
            }
          });
        } else {
          this.$message.warning('图形验证码错误');
        }
      });
    },
    getQiNiuToken() {
      common.getQiNiuToken().then((resp) => {
        this.uploadData.token = resp.token;
      });
    },
    /* upload */
    beforeAvatarUpload(file) {
      let result = true;
      const isJPEG = file.type === 'image/jpeg';
      const isJPG = file.type === 'image/jpg';
      const isPNG = file.type === 'image/png';
      const isLt5M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isJPEG && !isPNG) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!');
        result = false;
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        result = false;
      }
      if (result) {
        this.editing = true;
      }
      return result;
    },
    handleAvatarSuccess(res) {
      this.headUrl = `${QINIU_BUCKET_DOMAIN}/${res.key}`;
    },
    handleError() {
      this.getQiNiuToken();
      this.$message.error('上传失败，请重新上传。');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .user-personal-info {
    background: #fff;
    overflow: hidden;
  }

  .head-pic-wrap {
    float: left;
    width: 300px;
    margin-top: 70px;
    text-align: center;
  }

  .head-pic-wrap:hover img{
    border: 1px solid #ccc;
    box-shadow:0 0 10px #eee;
  }
  .base-info-wrap {
    float: left;
    margin-top: 70px;
  }

  .head-pic-wrap img {
    border-radius:58px;
    border: 1px solid #fff;
  }

  .head-btn {
    color: #546AAC;
    cursor: pointer;
  }

  .head-btn-span {
    font-weight: normal;
  }

  .row1,.row2 {
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 20px;
  }

  .in-row {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #999;
    letter-spacing: .7px;
  }

  .in-row.title {
    font-weight: normal;
    font-size: 16px;
    color: #666;
    letter-spacing: .8px;
  }

  .in-row span {
    display: inline-block;
  }

  .in-row span:nth-child(1){
    width: 100px;
  }

  .in-row span:nth-child(2){
    width: 300px;
    color: #666;
  }

  .in-row span:nth-child(3),.in-row span:nth-child(4){
    width: 100px;
    color: #546AAC;
    cursor: pointer;
  }

  .row3 {
    margin-top: 30px;
    margin-bottom: 200px;
  }

  .row3>p{
    width: 15px;
    color: red;
    float: left;
  }

  .row3>div{
    float: left;
    color: #999;
  }

  .e-code-l {
    float: left;
    width: 180px;
  }

  .e-code-r {
    float: left;
    width: 100px;
    margin-left: 20px;
    height: 40px;
  }
</style>
