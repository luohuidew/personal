<template>
  <div class="apply">
    <div id="canvas-wrapper">
      <canvas id="demo-canvas"></canvas>
    </div>
    <div class="apply-inner">
      <a :href="homeUrl" class="logo"><img src="../../assets/login-logo.png"/></a>
        <div class="apply-main">
          <el-form :model="applyData" :rules="rules" ref="applyForm">
            <el-form-item prop="username" required>
              <el-input type="text" v-model.trim="applyData.username" placeholder="请输入您的名称"></el-input>
            </el-form-item>
            <el-form-item prop="companyName" required>
              <el-autocomplete v-model="applyData.companyName" :fetch-suggestions="querySearchAsync" placeholder="请输入公司名称" :trigger-on-focus="false" @select="companySelect"></el-autocomplete>
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
            <el-form-item class="apply-btn">
              <a class="apply-now" @click="applyLogin('applyForm')">申请试用</a>
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
import toolServer from '../../service/common';

export default {
  name: 'apply',
  data() {
    return {
      timeout: null,  // 公司搜索限制
      state2: '',
      homeUrl: '/home.html',
      applyData: {
        username: '', // 名称
        companyName: '',
        company: { // 公司
          companyName: '',
        },
        email: '', // 邮箱地址
        phone: '', // 电话号码
        remarks: '', // 备注
      },
      rules: {
        username: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
        companyName: [
          { validator: this.checkCompany, trigger: 'blur' },
        ],
        email: [
          { validator: this.checkEmail, trigger: 'blur' },
        ],
        phone: [
          { validator: this.checkTel, trigger: 'blur' },
        ],
      },
      errorMsg: {}, // 公司接口错误信息
    };
  },
  mounted() {
    this.canvas();
    // this.restaurants = this.loadAll();
  },
  created() {
    // this.restaurants = this.loadAll();
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
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        let results = [];
        toolServer.searchWideCompany(queryString).then((resp) => {
          if (resp.Status === '200') {
            resp.Result.forEach((v) => {
              const c = v;
              c.value = v.Name;
            });
            results = resp.Result;
            this.errorMsg.status = resp.Status;
            this.errorMsg.msg = '';
            cb(results);
          } else {
            // this.$message.error(resp.Message);
            cb([]);
            this.errorMsg.status = resp.Status;
            this.errorMsg.msg = resp.Message;
            this.$refs.applyForm.validateField('companyName');
          }
        });
      }, 2000);
    },
    getCompanyInfo(id) {
      toolServer.getDetailCompany(id).then((resp) => {
        const rusults = resp.Result;
        const money = rusults.RegistCapi;
        const moneyNum = parseFloat(rusults.RegistCapi);
        this.applyData.company.companyType = '0'; // 境内
        this.applyData.company.shareholderNum = rusults.Partners.length; // 股东人数
        if (money.indexOf('美元') !== -1) {
          this.applyData.company.currency = 'EUR';
        } else if (money.indexOf('欧') !== -1) {
          this.applyData.company.currency = 'USD';
        } else {
          this.applyData.company.currency = 'RMB';
        }
        if (money.indexOf('万') !== -1) {
          this.applyData.company.totalRegisteredCapital = moneyNum;
        } else {
          this.applyData.company.totalRegisteredCapital = moneyNum / 10000;
        }
      });
    },
    companySelect(item) {
      this.applyData.company.companyName = item.Name;
      this.getCompanyInfo(item.No);
    },
    checkCompany(rule, value, callback) {
      let result = '';
      if (!value) {
        result = callback(new Error('公司名称不能为空'));
      }
      if (this.errorMsg.status !== '200') {
        result = callback(new Error(this.errorMsg.msg));
      } else {
        result = callback();
      }
      return result;
    },
    checkEmail(rule, value, callback) {
      let result = '';
      const msg = validate.isEmailAvailable(value);
      if (msg === 'ok') {
        toolServer.checkEmailExist(value).then((resp) => {
          if (resp.code.code === 200) {
            result = callback(new Error(resp.code.msg)); // 该邮箱已存在，请直接<a href="/login/">登录</a>
          } else {
            result = callback();
          }
        });
      }
      return result;
    },
    checkTel(rule, value, callback) {
      let result = '';
      const msg = validate.isPhoneAvailable(value);
      if (msg === 'ok') {
        toolServer.checkPhoneExist(value).then((resp) => {
          if (resp.code.code === 200) {
            result = callback(new Error(resp.code.msg)); // 手机号已存在
          } else {
            result = callback();
          }
        });
      }
      return result;
    },
    applyLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Apply.apply(this.applyData).then((resp) => {
            if (resp.data.code.code === 200) {
              this.$router.push({ name: 'Login' });
            } else {
              this.$message.error(resp.data.msg);
            }
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
.el-form-item.apply-btn {
  margin-bottom: 0 !important;
}

</style>
