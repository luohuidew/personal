<template>
  <div class="user-enterprise-list">
    <div class="add-new" @click="openDialog">
      <img src="../../../assets/icon-add.png" alt="">
      <span>新建企业</span>
    </div>
    <!---->
    <div class="enterprise-box" v-for="item in companyList" :key="item.companyName">
      <p class="e-title">
        <span class="e-title-name" :title=item.companyName @click="selectCompany(item)">{{item.companyName}}</span>
        <span class="author" v-if="item.authority == 'ROLE_ADMIN'">管理员</span>
        <span class="author" v-if="item.authority == 'ROLE_USER'">参与者</span>
        <span class="wrz" v-if="item.authentication == 0" @click="authority(item)">未认证</span>
        <span class="wrz" v-if="item.authentication == 1">认证中</span>
        <span class="wfk" v-if="item.pay == 1">未付款</span>
      </p>
      <div class="e-content" @click="selectCompany(item)">
        <p class="row"><img src="../../../assets/icon-manager.png" alt=""><span>管理员：</span><span>{{item.adminName}}</span></p>
        <p class="row"><img src="../../../assets/business-type.png" alt=""><span>企业类型：</span><span>{{item.companyType | filter('COMPENY_TYPE')}}</span></p>
        <p class="row"><img src="../../../assets/capital-currency.png" alt=""><span>资本币种：</span><span>{{item.currency | filter('MONEY_TYPE')}}</span></p>
      </div>
    </div>
    <!---->
    <el-dialog title="新建企业" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="企业全称" :label-width="formLabelWidth" required  prop="companyName">
          <el-autocomplete v-model="form.companyName" :fetch-suggestions="querySearchAsync" placeholder="请输入公司名称" :trigger-on-focus="false" @select="companySelect"></el-autocomplete>
        </el-form-item>
        <el-form-item label="简称" :label-width="formLabelWidth" prop="companyAbbreviation">
          <el-input v-model="form.companyAbbreviation" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司类型" :label-width="formLabelWidth" prop="companyType">
          <el-select v-model="form.companyType" placeholder="请选择活动区域">
            <el-option v-for="item in companyTypes" :label="item.text" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资本币种" :label-width="formLabelWidth"  prop="currency">
          <el-select v-model="form.currency" placeholder="请选择活动区域">
            <el-option v-for="item in moneyTypes" :label="item.text" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营业执照" :label-width="formLabelWidth" required>
          <el-upload
            :action="qiniuServer"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :on-error="handleError"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :data="uploadData">
            <el-button size="small" type="primary" :disabled="hasBackImageUrl">{{upText}}</el-button>
          </el-upload>
          <div class="tips">
            <p>1.选择项(企业认证时必需)</p>
            <p>2.仅支持JPG、PNG格式</p>
            <p>3.文件不超过5M</p>
            <p>4.请上传营业执照原件</p>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="save('form')"> 确 认 </el-button>
      </span>
    </el-dialog>
    <!---->
    <el-dialog title="企业认证" :visible.sync="authenDialogVisible" size="small" :before-close="handleCloseAuthen">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="企业全称：" :label-width="formLabelWidth"  prop="companyName2">
          <div>{{form.companyName}}</div>
        </el-form-item>
        <el-form-item label="简称：" :label-width="formLabelWidth" prop="companyAbbreviation">
          <div>{{form.companyAbbreviation}}</div>
        </el-form-item>
        <el-form-item label="公司类型：" :label-width="formLabelWidth" prop="companyType">
          <div>{{form.companyType | filter('COMPENY_TYPE')}}</div>
        </el-form-item>
        <el-form-item label="资本币种：" :label-width="formLabelWidth"  prop="currency">
          <div>{{form.currency | filter('MONEY_TYPE')}}</div>
        </el-form-item>
        <el-form-item label="营业执照：" :label-width="formLabelWidth" required>
          <el-upload
            :action="qiniuServer"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :on-error="handleError"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :data="uploadData">
            <el-button size="small" type="primary" :disabled="hasBackImageUrl">{{upText}}</el-button>
          </el-upload>
          <div class="tips">
            <p>1.选择项(企业认证时必需)</p>
            <p>2.仅支持JPG、PNG格式</p>
            <p>3.文件不超过5M</p>
            <p>4.请上传营业执照原件</p>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="save('form')"> 确 认 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import company from '../../../service/company';
import base from '../../../service/common';
import filters from '../../../utils/filters';
import { COMPENY_TYPE, MONEY_TYPE, QINIU_BUCKET_DOMAIN, QINIU_SERVER } from '../../../data/constants';

export default {
  name: 'user-enterprise-list',
  data() {
    return {
      formLabelWidth: '120px',
      companyList: [],
      companyTypes: COMPENY_TYPE,
      moneyTypes: MONEY_TYPE,
      qiniuServer: QINIU_SERVER,
      dialogVisible: false,
      authenDialogVisible: false,
      form: {
        companyName: '',
        companyAbbreviation: '',
        companyType: '0',
        currency: 'RMB',
      },
      rules: {
        companyName: [
          { validator: this.checkCompany, trigger: 'blur' },
        ],
        companyName2: [
          { required: false, message: '请填写企业全称', trigger: 'blur' },
        ],
      },
      backImageUrl: '',
      uploadData: {
        token: '',
      },
      hasBackImageUrl: false,
      fileList: [],
      upText: '上传营业执照扫描件',
      errorMsg: {}, // 公司接口错误信息
    };
  },
  created() {
    this.initData();
    this.getQiNiuToken();
  },
  filters: {
    filter(arg1, arg2) {
      return filters.constantsFilter(arg1, arg2);
    },
  },
  methods: {
    initData() {
      company.getCompanyListByUid().then((resp) => {
        this.companyList = resp;
      });
    },
    selectCompany(cItem) {
      this.storeSelectedCompany(cItem);
      this.$router.push({ name: 'OptionManagementList' });
    },
    storeSelectedCompany(cItem) {
      const obj = {
        authority: cItem.authority,
        licenseList: cItem.licenseList,
        companyInfo: {
          companyId: cItem.id,
          companyName: cItem.companyName,
          companyType: cItem.companyType,
        },
      };
      company.setStoreCompany(obj);
    },
    openDialog() {
      this.dialogVisible = true;
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.hasBackImageUrl) {
            this.$message.warning('请上传营业执照');
          } else {
            const params = this.form;
            params.businessLicense = this.backImageUrl;
            company.addCompany(params).then(() => {
              this.$message.success('添加成功！');
              this.initData();
              this.handleClose();
              this.handleCloseAuthen();
            });
          }
        }
      });
    },
    closeBefore() {
      this.form = {
        companyName: '',
        companyAbbreviation: '',
        companyType: '0',
        currency: 'RMB',
      };
      this.$refs.form.resetFields();
      this.handleRemove();
      this.fileList = [];
    },
    handleClose() {
      this.closeBefore();
      this.dialogVisible = false;
    },
    handleCloseAuthen() {
      this.closeBefore();
      this.authenDialogVisible = false;
    },
    getQiNiuToken() {
      base.getQiNiuToken().then((resp) => {
        this.uploadData.token = resp.token;
      });
    },
    authority(item) {
      this.authenDialogVisible = true;
      this.form = {
        companyName: item.companyName,
        companyAbbreviation: item.companyAbbreviation,
        companyType: String(item.companyType),
        currency: item.currency,
      };
    },
    /* upload */
    beforeAvatarUpload(file) {
      let result = true;
      const isJPEG = file.type === 'image/jpeg';
      const isJPG = file.type === 'image/jpg';
      const isPNG = file.type === 'image/png';
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG && !isJPEG && !isPNG) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!');
        result = false;
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!');
        result = false;
      }
      return result;
    },
    handleAvatarSuccess(res) {
      this.hasBackImageUrl = true;
      this.upText = '上传完成';
      this.backImageUrl = `${QINIU_BUCKET_DOMAIN}/${res.key}`;
    },
    handleError() {
      this.getQiNiuToken();
      this.$message.error('上传失败，请重新上传。');
    },
    handleRemove() {
      this.backImageUrl = '';
      this.hasBackImageUrl = false;
      this.upText = '上传营业执照扫描件';
    },
    handlePreview() {
      window.open(this.backImageUrl);
    },
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        let results = [];
        base.searchWideCompany(queryString).then((resp) => {
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
            this.$refs.form.validateField('companyName');
          }
        });
      }, 2000);
    },
    getCompanyInfo(id) {
      base.getDetailCompany(id).then((resp) => {
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  * {
    box-sizing: border-box;
  }

  .user-enterprise-list {
    background: #fff;
    overflow: hidden;
    padding-bottom: 30px;
  }

  .add-new,.enterprise-box {
    float: left;
  }

  .add-new,.enterprise-box:hover {
    background: #FCFCFC;
  }

  .add-new {
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    border: 1px solid #eee;
    margin: 30px 0 0 30px;
    color: #BDBDBD;
    position: relative;
    cursor: pointer;
  }

  .add-new>span {
    position: absolute;
    top:30px;
    left: 70px;
  }

  .enterprise-box {
    width: 500px;
    height: 200px;
    border: 1px solid #eee;
    margin: 30px 0 0 30px;
  }

  .e-title {
    height: 60px;
    line-height: 60px;
    width: 100%;
    background: #eee;
    font-size: 16px;
  }

  .e-title span.e-title-name{
    float: left;
    margin-left: 30px;
    letter-spacing: 0.8px;
    cursor: pointer;
  }

  .e-title span.author{
    float: right;
    margin-right: 20px;
    color: #2E76E0;
    letter-spacing: 0.8px;
    cursor: pointer;
  }

  .e-title span.wrz, .e-title span.wfk{
    float: right;
    margin-right: 10px;
    font-size: 14px;
    color: #FF5151;
    text-decoration: underline;
    cursor: pointer;
  }
  .e-title span.wrz:hover,.e-title span.wfk:hover{
    color: #BC5231;
  }

  .e-content:hover {
    background: #FDFDFD;
    cursor: pointer;
  }

  .row {
    margin: 20px 20px 0 30px;
    color: #999;
  }

  .row > img {
    vertical-align: middle;
    margin-right: 15px;
  }

  .el-upload .el-button--primary{
    width: 300px;
    height: 40px;
    color: #999;
    background-color: #f4f4f4;
    border-color: #f4f4f4;
    font-size: 14px;
  }

  .tips {
    margin-top: 10px;
    font-size: 12px;
    color: #BDBDBD;
    letter-spacing: 0.59px;
    line-height: 20px;
  }

  .e-title-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:210px;
  }

</style>
