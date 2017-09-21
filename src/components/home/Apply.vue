<template>
  <div class="apply">
    <div id="canvas-wrapper">
      <canvas id="demo-canvas"></canvas>
    </div>
    <div class="apply-inner">
      <a :href="homeUrl" class="logo"><img src="../../assets/login-logo.png"/></a>
        <div class="apply-main">
          <el-form :model="applyData" :rules="rules" ref="applyData">
            <el-form-item prop="username" required>
              <el-input type="text" v-model.trim="applyData.username" placeholder="请输入您的名称"></el-input>
            </el-form-item>
            <el-form-item prop="companyName" required>
              <!-- <el-input type="text" v-model.trim="applyData.companyName" placeholder="请输入公司名称"></el-input> -->
              <el-autocomplete v-model="applyData.companyName" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
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
import toolServer from '../../service/common';

export default {
  name: 'apply',
  data() {
    return {
      restaurants: [],
      timeout: null,
      state2: '',
      homeUrl: 'http://localhost:8000/home.html',
      applyData: {
        username: '', // 名称
        companyName: '', // 公司名称
        email: '', // 邮箱地址
        phone: '', // 电话号码
        remarks: '', // 备注
      },
      rules: {
        username: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
        companyName: [
          { required: true, message: '公司名不能为空', trigger: 'blur' },
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
      /* const restaurants = this.restaurants;
      let results;
      if (queryString) {
        results = restaurants.filter(this.createStateFilter(queryString));
      } else {
        results = restaurants;
      }
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000); */
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
            cb(results);
          } else {
            this.$message.error(resp.Message);
          }
        });
      }, 2000);
    },
    createStateFilter(queryString) {
      return state => (state.value.indexOf(queryString.toLowerCase()) === 0);
    },
    handleSelect(item) {
      console.log(item);
    },
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        { value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' },
        { value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
      ];
      // toolServer.searchWideCompany(text).then(resp => resp.Result);
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
.el-form-item.apply-btn {
  margin-bottom: 0 !important;
}

</style>
