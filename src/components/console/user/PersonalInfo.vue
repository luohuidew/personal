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
          <span v-if="info.authenticate != '2'" @click="idDialogVisible = true">实名认证</span>
          <span v-else="">已认证</span>
        </div>
        <div class="in-row">
          <span>签名管理</span>
          <span><img style="vertical-align: middle;border: 1px solid #666;"  height="30" :src="info.signatureUrl" alt="签名图片"></span>
          <span @click="signDialogVisible = true">设置</span>
        </div>
        <div class="in-row">
          <span>账号安全</span>
          <span></span>
          <span @click="pwdDialogVisible = true">修改密码</span>
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
        <el-button @click="handleCloseD1" v-show="step == 2"> 取 消 </el-button>
        <el-button type="success" @click="submit('email')" v-show="step == 2"> 确 定 </el-button>
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
        <el-button @click="handleCloseD1" v-show="step == 2"> 取 消 </el-button>
        <el-button type="success" @click="submit('phoneUnbunding')" v-show="step == 2"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!---->
    <el-dialog title="手机绑定" :visible.sync="phoneDialogVisible2" size="small" :before-close="handleCloseD1">
      <el-form :model="emailForm" ref="emailForm" :rules="rules">
        <div style="margin-bottom: 10px;" v-show="step == 1">为保障您的账号安全，请输入账号密码进行验证。</div>
        <el-form-item label="密码：" :label-width="formLabelWidth" v-show="step == 1" prop="password">
          <el-input type="password" v-model="emailForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth2" prop="phone" v-show="step == 2">
          <el-input v-model="emailForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="图形验证码：" :label-width="formLabelWidth2" v-show="step == 2">
          <el-input class="e-code-l" v-model="emailForm.validateCodeImg"></el-input>
          <img class="e-code-r"  style="cursor: pointer" :src="imgSrc" alt="验证码图片" @click="getValidateCode">
        </el-form-item>
        <el-form-item label="短信验证码：" :label-width="formLabelWidth2" v-show="step == 2">
          <el-input class="e-code-l" v-model="emailForm.validateCode"></el-input>
          <el-button class="e-code-r" @click="getPhoneCode">{{yzmText}}</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="next" v-show="step == 1"> 下一步 </el-button>
        <el-button @click="handleCloseD1" v-show="step == 2"> 取 消 </el-button>
        <el-button type="success" @click="submit('phoneBunding')" v-show="step == 2"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!---->
    <el-dialog title="实名认证" :visible.sync="idDialogVisible" size="normal"  :before-close="handleCloseD2">
      <el-form :model="idForm" ref="idForm" :rules="rules">
        <el-form-item label="真实姓名：" :label-width="formLabelWidth2" prop="username">
          <el-input v-model="idForm.username" size="large"></el-input>
        </el-form-item>
        <el-form-item label="证件号：" :label-width="formLabelWidth2" prop="idNumber">
          <el-select v-model="idForm.idType" placeholder="请选择" size="mini100">
            <el-option v-for="item in id_type" :key="item.id" :label="item.text" :value="item.id"></el-option>
          </el-select>
          <el-input v-model="idForm.idNumber" style="width: 285px;margin-left: 10px;"></el-input>
        </el-form-item>
        <el-form-item label="手持证件照：" :label-width="formLabelWidth2" prop="handheldIdCardImgUrl">
          <el-upload
            class="avatar-uploader"
            :action="qiniuServer"
            :show-file-list="false"
            :on-error="handleError"
            :data="uploadData"
            :on-success="handleAvatarSuccessId1"
            :before-upload="beforeAvatarUpload2">
            <img v-if="handImageUrl1" :src="handImageUrl1" class="avatar">
            <i class="avatar-uploader-icon">+ 上传并预览</i>
          </el-upload>
          <div class="tips">
            注意： <br>
            选取纯色干净背景拍摄<br>
            手臂和脸部完全露出无遮挡<br>
            证件全部信息清晰无遮挡<br>
          </div>
        </el-form-item>
        <el-form-item label="证件正反面：" :label-width="formLabelWidth2" required>
          <el-form-item prop="idCardImgPositiveUrl" style="width: 200px;float: left">
            <el-upload
              class="avatar-uploader2"
              :action="qiniuServer"
              :show-file-list="false"
              :on-error="handleError"
              :data="uploadData"
              :on-success="handleAvatarSuccessId2"
              :before-upload="beforeAvatarUpload2">
              <img v-if="handImageUrl2" :src="handImageUrl2" class="avatar">
              <i class="avatar-uploader-icon">+ 上传并预览</i>
            </el-upload>
          </el-form-item>
          <el-form-item prop="idCardImgNegativeUrl" style="width: 200px;float: left">
            <el-upload
              class="avatar-uploader2 upRt"
              :action="qiniuServer"
              :on-error="handleError"
              :show-file-list="false"
              :data="uploadData"
              :on-success="handleAvatarSuccessId3"
              :before-upload="beforeAvatarUpload2">
              <img v-if="handImageUrl3" :src="handImageUrl3" class="avatar">
              <i class="avatar-uploader-icon icon2">+ 上传并预览</i>
            </el-upload>
          </el-form-item>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="submit('authoration')"> 认 证 </el-button>
      </span>
    </el-dialog>
    <!---->
    <el-dialog title="修改密码" :visible.sync="pwdDialogVisible" size="small" :before-close="handleCloseD3">
      <el-form :model="pwdForm" ref="pwdForm" :rules="rules">
        <el-form-item label="旧密码：" :label-width="formLabelWidth2" prop="oldPassword">
          <el-input type="password" v-model="pwdForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" :label-width="formLabelWidth2" prop="newPassword">
          <el-input type="password" v-model="pwdForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" :label-width="formLabelWidth2" prop="newPassword2">
          <el-input type="password" v-model="pwdForm.newPassword2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseD3"> 取 消 </el-button>
        <el-button type="success" @click="submit('pwdRest')"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!---->
    <el-dialog title="签名管理" :visible.sync="signDialogVisible" size="small" :before-close="handleCloseD4">
      <div class="sign" v-show="signStep==1">
        当前签名样式为：
        <p><img  height="120" :src="info.signatureUrl" alt="签名"></p>
      </div>
      <div class="sign2" v-show="signStep==2">
        <div style="margin-bottom: 10px;">您可通过以下3种方式提供您的签名：</div>
        <el-radio-group v-model="signRadio">
          <el-radio :label="1">输入签名</el-radio>
          <el-radio :label="2">微信扫码签名</el-radio>
          <el-radio :label="3">上传签名</el-radio>
        </el-radio-group>
        <div class="sign-content" v-show="signRadio == 1">
          <el-input class="sign-c1" v-model="pwdForm.newPassword2"></el-input>
        </div>
        <div class="sign-content" v-show="signRadio == 2">
          <el-popover
            ref="popover1"
            placement="right-start"
            title=""
            width="150"
            trigger="hover"
            @show="showPopover1">
            <div>
              <img :src="targetFullUrl" alt="二维码图片"> <br>
              <p style="font-size: 12px;color: #3A85BF;text-align: center">使用手机扫描以上二维码 <br>在手机上完成签名</p>
            </div>
          </el-popover>
          使用手机扫描 <el-button type="text" v-popover:popover1>二维码</el-button> ，在手机上完成签字后可在下侧预览
          <p style="height: 100px;">
            预览：<br>
            <img  src="" alt="">
          </p>
        </div>
        <div class="sign-content" v-show="signRadio == 3">
          <el-popover
            ref="popover2"
            placement="right-start"
            title=""
            width="140"
            trigger="hover">
            <div>
              <img src="../../../assets/signEWM.png" alt="二维码图片"> <br>
              <p style="font-size: 12px;color: #3A85BF;text-align: center">使用手机扫描以上二维码 <br>在手机上完成上传</p>
            </div>
          </el-popover>
          <p style="color: #ccc;">请将您的签名写到 A4 纸上，然后用相机或手机拍照再上传。目前只支持背景透明的 png 图片与白色背景的 jpg 图片。请确保上传的图片为纯白色或透明背景。</p>
          <p style="margin-top: 10px;"><el-button type="success">上传</el-button> 或扫描<el-button type="text" v-popover:popover2>二维码</el-button>上传 </p>
          <p style="height: 100px;">
            <br>
            预览：<br>
            <img src="" alt="">
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseD4"> 关 闭 </el-button>
        <el-button type="success" v-show="signStep==2" @click="submit('sign')"> 保 存 </el-button>
        <el-button type="success" v-show="signStep==1" @click="signStep = 2"> 编 辑 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import filters from '@/utils/filters';
import common from '@/service/common';
import user from '@/service/user';
import validate from '@/utils/validation';
import personalInfo from '@/service/personalInfo';
import { QINIU_BUCKET_DOMAIN, QINIU_SERVER, ID_TYPE } from '@/data/constants';

export default {
  name: 'user-personal-info',
  data() {
    return {
      headUrl: '../../../../static/img/head-img.png', // 填充图片
      handImageUrl1: '',
      handImageUrl2: '',
      handImageUrl3: '',
      targetUrl: undefined,
      formLabelWidth: '80px',
      formLabelWidth2: '120px',
      yzmText: '发送验证码',
      qiniuServer: QINIU_SERVER,
      id_type: ID_TYPE,
      imgSrc: '',
      uploadData: {
        token: '',
      },
      editing: false,
      emailDialogVisible: false,
      phoneDialogVisible: false,
      phoneDialogVisible2: false,
      pwdDialogVisible: false,
      idDialogVisible: false,
      signDialogVisible: false,
      emailForm: {// phone email共用
        password: undefined,
        email: undefined,
        validateCode: undefined,
        phone: undefined,
        validateCodeImg: undefined,
      },
      idForm: {
        username: '',
        idNumber: '',
        idType: '0',
        handheldIdCardImgUrl: '',
        idCardImgPositiveUrl: '',
        idCardImgNegativeUrl: '',
      },
      pwdForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: '',
      },
      step: 1,
      signStep: 1,
      signRadio: 1,
      signForm: {
        signatureUrl: '',
      },
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
        username: [
          { required: true, message: '请填写真实姓名', trigger: 'blur' },
        ],
        idType: [
          { required: true, message: '请选择证件类型', trigger: 'blur' },
        ],
        idNumber: [
          { required: true, message: '请填写证件号', trigger: 'blur' },
        ],
        handheldIdCardImgUrl: [
          { required: true, message: '请上传手持证件照', trigger: 'blur' },
        ],
        idCardImgPositiveUrl: [
          { required: true, message: '请上传正面证件照', trigger: 'blur' },
        ],
        idCardImgNegativeUrl: [
          { required: true, message: '请上传反面证件照', trigger: 'blur' },
        ],
        oldPassword: [
          { required: true, message: '请填写旧密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请填写新密码', trigger: 'blur' },
          { validator: this.checkPassword, trigger: 'blur' },
        ],
        newPassword2: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: this.checkNewPasswordEq, trigger: 'blur' },
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
  computed: {
    targetFullUrl() {
      return `http://pan.baidu.com/share/qrcode?w=140&url=${this.targetUrl}`;
    },
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
        this.update(params, 'portrait');
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
      if (type === 'authoration') {
        params.username = this.idForm.username;
        params.idNumber = this.idForm.idNumber;
        params.idType = this.idForm.idType;
        params.handheldIdCardImgUrl = this.idForm.handheldIdCardImgUrl;
        params.idCardImgPositiveUrl = this.idForm.idCardImgPositiveUrl;
        params.idCardImgNegativeUrl = this.idForm.idCardImgNegativeUrl;
        this.$refs.idForm.validate((valid) => {
          if (valid) {
            this.update(params, 'authoration');
          }
        });
      }
      if (type === 'pwdRest') {
        params.oldPassword = this.pwdForm.oldPassword;
        params.newPassword = this.pwdForm.newPassword;
        this.$refs.pwdForm.validate((valid) => {
          if (valid) {
            this.update(params, 'pwdRest');
          }
        });
      }
      if (type === 'sign') {
        params.signatureUrl = this.signForm.signatureUrl;
        this.update(params, 'sign');
      }
    },
    update(params, type) {
      personalInfo.updateUserInfo(params).then(() => {
        if (type === 'logout') {
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
        } else if (type === 'portrait') {
          this.$message.info('修改成功');
          this.initData();
          this.editing = false;
          this.handleCloseD1();
        } else if (type === 'authoration') {
          this.$message.info('已提交');
          this.initData();
          this.handleCloseD2();
        } else if (type === 'pwdRest') {
          this.$message.info('修改成功');
          this.initData();
          this.handleCloseD3();
        } else if (type === 'sign') {
          this.$message.info('保存成功');
          this.initData();
          this.handleCloseD4();
        }
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
        if (resp.code.code === 200) {
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
    handleCloseD2() {
      this.handImageUrl1 = '';
      this.handImageUrl2 = '';
      this.handImageUrl3 = '';
      this.$refs.idForm.resetFields();
      this.idDialogVisible = false;
    },
    handleCloseD3() {
      this.$refs.pwdForm.resetFields();
      this.pwdDialogVisible = false;
    },
    handleCloseD4() {
      this.signDialogVisible = false;
      this.signStep = 1;
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
    checkNewPasswordEq(rule, value, callback) {
      if (this.pwdForm.newPassword !== this.pwdForm.newPassword2) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    },
    checkPassword(rule, value, callback) {
      const result = validate.isPasswordAvailable(value);
      if (result !== 'ok') {
        callback(new Error(result));
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
        this.uploadData.token = resp;
      });
    },
    showPopover1() {
//      todo 生成一个name，发起websocket请求,之后才生成targetUrl
      const name = 'xxxxx';
      const token = user.getToken();
      this.targetUrl = `http://${window.location.host}/sign.html?p=${name}&token=${token}`;
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
    handleAvatarSuccessId1(res, file) {
      this.handImageUrl1 = URL.createObjectURL(file.raw);
      this.idForm.handheldIdCardImgUrl = `${QINIU_BUCKET_DOMAIN}/${res.key}`;
    },
    handleAvatarSuccessId2(res, file) {
      this.handImageUrl2 = URL.createObjectURL(file.raw);
      this.idForm.idCardImgPositiveUrl = `${QINIU_BUCKET_DOMAIN}/${res.key}`;
    },
    handleAvatarSuccessId3(res, file) {
      this.handImageUrl3 = URL.createObjectURL(file.raw);
      this.idForm.idCardImgNegativeUrl = `${QINIU_BUCKET_DOMAIN}/${res.key}`;
    },
    beforeAvatarUpload2(file) {
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
      return result;
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

  .tips {
    width: 170px;
    height: 120px;
    line-height: 25px;
    margin-left: 40px;
    float: left;
    font-size: 12px;
    color: #ACB3C9;
  }

  .avatar-uploader,.avatar-uploader2{
    border: 1px dashed #d9d9d9;
    float: left;
    width: 170px;
    height: 120px;
    margin-bottom: 50px;
    background-image: url(../../../assets/hand-idphoto.png);
    background-size: 98%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .avatar-uploader2{
    background-image: url(../../../assets/id-img.png);
  }
  .upRt{
    margin-left: 40px;
  }

  .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader-icon {
    border: 1px solid #D7DDEC;
    font-size: 18px;
    font-style: normal;
    color: #cfcfcf;
    width: 170px;
    height: 30px;
    line-height: 30px;
    position: absolute;
    top:140px;
    left: 0;
  }

  .icon2{
    left: 40px;
  }

  .avatar {
    width: 170px;
    height: 120px;
    display: block;
  }

  .sign, .sign2 {
    padding: 0 30px;
  }

  .sign>p{
    border: 1px solid #666;
    text-align: center;
    height: 130px;
    line-height: 130px;
  }

  .sign-content {
    margin: 10px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }

  .sign-c1 {
    width: 100%;
    font-size: 90px;
  }

</style>
