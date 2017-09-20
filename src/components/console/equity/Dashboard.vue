<template>
  <div class="equity-dashboard">
    <div class="equity-head">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="head-content bgcolor">
            <div class="head-title"><span class="span1">股东人数</span>&nbsp;&nbsp;<span class="span2">（人）</span></div>
            <div class="head-cont"><span class="num1">{{companyMap.shareholderNum}}</span></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="head-content bgcolor">
            <div class="head-title"><span class="span1">注册资金</span>&nbsp;&nbsp;<span class="span2">（万元）</span></div>
            <div class="head-cont"><span class="num1">{{companyMap.totalRegisteredCapital | moneyFormat}}</span></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="head-content bgcolor">
            <div class="head-title"><span class="span1">总融资额</span>&nbsp;&nbsp;<span class="span2">（万元）</span></div>
            <div class="head-cont"><span class="num1">{{companyMap.totalFinancingCapital | moneyFormat}}</span></div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="container">
        <el-col :span="16">
          <div class="main-content bgcolor">
            <div class="main-title clearfix">
              <span class="title">股权概况</span>
              <router-link class="more" :to="{ path: '/equity/dashboard/stockdetail' }">更多详情&gt;</router-link>
            </div>
            <div class="main-wrap">
              <el-table :data="stockMap">
                <el-table-column prop="shareholderName" label="股东名称"></el-table-column>
                <el-table-column label="投资轮次">
                  <template scope="scope">
                    <ul class="round-wrap">
                      <li v-for="item in roundType" v-bind:class="{active: checkRound(item.id, scope.row.rounds)}">{{item.text}}</li>
                    </ul>
                  </template>
                </el-table-column>
                <el-table-column label="股份比例">
                  <template scope="scope">{{scope.row.registeredCapital | stockScalefilter(companyMap.totalRegisteredCapital)}}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="main-content bgcolor">
            <div class="main-title clearfix">
              <span class="title">融资历史</span>
              <router-link class="more" :to="{ path: '/equity/dashboard/financdetail' }">更多详情&gt;</router-link>
            </div>
            <div class="main-wrap">
              <div class="step-list">
                <div class="step-wrap" v-for="item in financMap">
                  <div class="step-head">
                    <div class="step-line"></div>
                    <div class="step-icon"></div>
                  </div>
                  <div class="step-main">
                    <div class="step-title">{{item.financedDate}}</div>
                    <div class="step-description"><span class="bold">{{item.round | roundFilter('ROUND_TYPE')}}</span>&nbsp;&nbsp;获<span class="bold">{{item.financedAccount}}</span>{{item.equity.shareholderName}}投资</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 初次登录添加股权信息页 -->
    <el-dialog class="dialog-wrap__large" title="添加股权信息" :visible.sync="dialogVisible1" size="large" :before-close="stockClose">
      <div class="dialog-left">
        <div class="dialog-step-list">
          <div class="dialog-step-wrap isDone">
            <div class="dialog-step-icon"></div><div class="dialog-step-titel">股东信息</div>
          </div>
          <div class="dialog-step-line"></div>
          <div class="dialog-step-wrap">
            <div class="dialog-step-icon"></div><div class="dialog-step-titel">融资历史</div>
          </div>
        </div>
        <el-button class="button-daoru">批量导入</el-button>
      </div>
      <div class="dialog-right">
        <el-form :model="stockAddMap" ref="stockAddForm" :rules="stockRules" label-width="100px">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="股东名称" required prop="shareholderName">
                <el-input v-model="stockAddMap.shareholderName" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="股东类型" required prop="shareholderType">
                <el-select v-model="stockAddMap.shareholderType" size="small">
                  <el-option v-for="item in shareholderType" :key="item.id" :label="item.text" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="投资轮次" required prop="rounds">
                <el-select v-model="stockAddMap.rounds" size="small">
                  <el-option v-for="item in roundType" :key="item.id" :label="item.text" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="注册资本" required prop="registeredCapital">
                <el-input v-model.number="stockAddMap.registeredCapital" size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="总注册资本" required prop="totalRegisteredCapital">
                <el-input v-model.number="stockAddMap.totalRegisteredCapital" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="股份比例" required prop="stockScale">
                <el-input v-model="stockScale" size="small" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="checkStockForm('stockAddForm')">添加</el-button>
          <el-button type="primary" @click="checkStockList()">保存</el-button>
        </span>
        <div class="dialog-table-wrap">
          <el-table :data="stockAddList">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="股东名称" prop="shareholderName"></el-table-column>
            <el-table-column label="股东类型">
              <template scope="scope">{{scope.row.shareholderType | roundFilter('SHAREHOLDER_TYPE')}}</template>
            </el-table-column>
            <el-table-column label="投资轮次">
              <template scope="scope">{{scope.row.rounds | roundFilter('ROUND_TYPE')}}</template>
            </el-table-column>
            <el-table-column label="注册资本" prop="registeredCapital"></el-table-column>
            <el-table-column label="股份比例">
              <template scope="scope">{{scope.row.registeredCapital | stockScalefilter(companyMap.totalRegisteredCapital)}}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <!-- 初次登录添加融资信息页 -->
    <el-dialog class="dialog-wrap__large" title="添加融资信息" :visible.sync="dialogVisible2" size="large" :before-close="financClose">
      <div class="dialog-left">
        <div class="dialog-step-list">
          <div class="dialog-step-wrap isDone">
            <div class="dialog-step-icon"></div><div class="dialog-step-titel">股东信息</div>
          </div>
          <div class="dialog-step-line"></div>
          <div class="dialog-step-wrap isDone">
            <div class="dialog-step-icon"></div><div class="dialog-step-titel">融资历史</div>
          </div>
        </div>
        <el-button class="button-daoru">批量导入</el-button>
      </div>
      <div class="dialog-right">
        <el-form :model="financAddMap" ref="financAddForm" :rules="financRules" label-width="100px">
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="融资轮次" required prop="round">
                <el-select v-model="financAddMap.round" size="small">
                  <el-option v-for="item in roundType" :key="item.id" :label="item.text" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="融资时间" required prop="financedDate">
                <el-date-picker size="small" v-model="financAddMap.financedDate" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="融资金额" required prop="financedAccount">
                <el-input v-model.number="financAddMap.financedAccount" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="投资方" required prop="equityid">
                <el-select v-model="financAddMap.equityid" size="small">
                  <el-option v-for="item in stockMap" :key="item.id" :label="item.shareholderName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="checkFinancForm('financAddForm')">添加</el-button>
          <el-button type="primary" @click="saveList('financAddForm')">完成</el-button>
        </span>
        <div class="dialog-table-wrap">
          <el-table :data="financAddList">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="融资轮次">
              <template scope="scope">{{scope.row.round | roundFilter('ROUND_TYPE')}}</template>
            </el-table-column>
            <el-table-column label="融资时间" prop="financedDate"></el-table-column>
            <el-table-column label="融资金额" prop="financedAccount"></el-table-column>
            <el-table-column label="投资方" prop="equityid" :formatter="shareholderFilter"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import stockServer from '../../../service/stock';
import financServer from '../../../service/financ';
import companyServer from '../../../service/company';
import filters from '../../../utils/filters';
import { SHAREHOLDER_TYPE, ROUND_TYPE } from '../../../data/constants';

export default {
  name: 'equity-dashboard',
  data() {
    return {
      companyId: '',
      companyMap: {
        shareholderNum: 0,  // 股东人数
        totalRegisteredCapital: 0,  // 总注册资本
        totalFinancingCapital: 0,  // 总融资额
      },
      dialogVisible1: true,
      dialogVisible2: false,
      stockMap: [],
      financMap: [],
      stockAddMap: { // 添加股权
        shareholderName: '',
        shareholderType: '0',
        rounds: '1',
        registeredCapital: '',
        totalRegisteredCapital: 0,
      },
      financAddMap: { // 添加融资
        equityid: '',
        financedAccount: '',
        round: '1',
        financedDate: '',
      },
      stockAddList: [], // 新建股权列表
      financAddList: [], // 新建融资列表
      shareholderType: SHAREHOLDER_TYPE, // 股东类型
      roundType: ROUND_TYPE, // 轮次类型
      stockRules: {
        shareholderName: [
          { required: true, message: '股东名称不能为空' },
        ],
        shareholderType: [
          { required: true, message: '股东类型不能为空', trigger: 'change' },
        ],
        rounds: [
          { required: true, message: '股东轮次不能为空', trigger: 'change' },
        ],
        registeredCapital: [
          { required: true, message: '注册资本不能为空' }, { type: 'number', message: '注册资本必须为数字值' },
        ],
        totalRegisteredCapital: [
          { required: true, message: '总注册资本不能为空' }, { type: 'number', message: '总注册资本必须为数字值' },
        ],
      },
      financRules: {
        round: [
          { required: true, message: '融资轮次不能为空' },
        ],
        financedDate: [
          { required: true, message: '融资时间不能为空' },
        ],
        financedAccount: [
          { required: true, message: '融资金额不能为空' }, { type: 'number', message: '融资金额必须为数字值' },
        ],
        equityid: [
          { required: true, message: '投资方不能为空' },
        ],
      },
    };
  },
  created() {
    const company = JSON.parse(sessionStorage.getItem('_COMPANY_KEY'));
    this.companyId = company.companyInfo.companyId;
    companyServer.getCompanyInfoById().then((r) => {
      this.companyMap = r;
      this.stockAddMap.totalRegisteredCapital = Number(r.totalRegisteredCapital);
    });
    stockServer.getStockListByCompanyId().then((resp) => {
      if (resp && resp.length !== 0) {
        this.stockMap = resp;
      } else {
        this.dialogVisible1 = true;
      }
    });
    financServer.getFinancListByCompanyId().then((resp) => {
      if (resp && resp.length !== 0) {
        this.financMap = resp;
      } else if (this.dialogVisible1 !== true) {
        this.dialogVisible2 = true;
      }
    });
  },
  methods: {
    checkRound(r, rounds) {
      const roundList = rounds.split(',');
      return roundList.includes(r);
    },
    checkStockForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addStocktoLlist(formName);
        }
      });
    },
    addStocktoLlist(formName) {
      this.stockAddList.push(Object.assign({}, this.stockAddMap, { companyId: this.companyId }));
      this.resetForm(formName);
      this.stockAddMap.totalRegisteredCapital = Number(this.companyMap.totalRegisteredCapital);
    },
    checkFinancForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addFinanctoList(formName);
        }
      });
    },
    addFinanctoList(formName) {
      if (this.financAddMap.financedDate) {
        this.financAddMap.financedDate = this.financAddMap.financedDate.Format('yyyy-MM-dd');
      }
      this.financAddList.push(Object.assign({}, this.financAddMap, { companyId: this.companyId }));
      this.resetForm(formName);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    stockClose() {
      this.resetForm('stockAddForm');
      this.stockAddList = [];
      this.dialogVisible1 = false;
    },
    financClose() {
      this.resetForm('financAddForm');
      this.financAddList = [];
      this.dialogVisible2 = false;
    },
    checkStockList() {
      if (this.stockAddList.length === 0) {
        this.$message.error('请添加股权信息');
      } else {
        let totalNum = 0;
        this.stockAddList.forEach((v) => {
          totalNum += Number(v.registeredCapital);
        });
        if (totalNum < this.companyMap.totalRegisteredCapital) {
          this.$message.error('总注册资本求和不满足条件');
        } else {
          stockServer.addStockList(this.stockAddList);
          this.dialogVisible1 = false;
          this.dialogVisible2 = true;
        }
      }
    },
    saveList(formName) {
      financServer.addFinancList(this.financAddList);
      this.resetForm(formName);
      this.dialogVisible2 = false;
    },
    shareholderFilter(row) {
      let result = '';
      this.stockMap.forEach((v) => {
        if (v.id === row.equityid) {
          result = v.shareholderName;
        }
      });
      return result;
    },
  },
  filters: {
    roundFilter(arg1, arg2) {
      return filters.constantsFilter(arg1, arg2);
    },
    moneyFormat(arg1) {
      let num;
      if (Number(arg1) > 9999) {
        num = Number(arg1) / 10000;
      }
      let t = '';
      if (Number.isInteger(num)) {
        const l = `${num}`.split('').reverse();
        // const r = num.split('.')[1];
        l.forEach((v, i) => {
          t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
        });
        return t.split('').reverse().join('');
      }
      num = Number(num).toFixed(2);
      const l = `${num}`.split('.')[0].split('').reverse();
      const r = num.split('.')[1];
      l.forEach((v, i) => {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
      });
      return `${t.split('').reverse().join('')}.${r}`;
    },
    stockScalefilter(arg1, arg2) {
      return stockServer.getPercent(arg1, arg2);
    },
  },
  computed: {
    stockScale() {
      const totalNum = this.companyMap.totalRegisteredCapital;
      return stockServer.getPercent(this.stockAddMap.registeredCapital, totalNum);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{margin:20px 0 0;}
.head-content{min-height:110px;padding:30px 0 0 50px;}
.head-cont{margin:12px 0 0;}
.span1{font-size: 16px;color: #666666;letter-spacing: 4px;font-weight: bold;}
.span2{font-size: 12px;color: #999999;letter-spacing: 5px;}
.num1{font-size: 30px;color: #4F6BBF;letter-spacing: 12.5px;font-weight: bold;}
.main-content{min-height:500px;padding:30px 30px 0 30px;}
.main-title .title{float:left;display: inline;font-size: 16px;color: #666666;letter-spacing: 4px;font-weight:bold;}
.main-title .more{float:right;display: inline;font-size: 14px;color: #4F6BBF;letter-spacing: 1.14px;font-weight:bold;}
.main-wrap{margin:20px 0 0;}
.step-wrap{position:relative;vertical-align:top;height:100px;color:#999;letter-spacing: 1.3px;font-size:0;}
.step-head{float:left;display:inline-block;}
.step-icon{display:inline-block;line-height:8px;width:8px;height:8px;border:2px solid #52B0F6;border-radius: 50%;}
.step-line{position:absolute;display:inline-block;width:0;top:12px;left:5px;bottom: 0;border: 1px solid #F4F4F4;}
.step-main{padding-left:20px;}
.step-title{font-size: 14px;}
.step-description{font-size: 16px;color: #999;padding-right:10px;line-height: 66px;}
.step-description .bold{font-weight: bold;color: #666;}
.dialog-table-wrap{padding:30px 0 30px 30px;}
.dialog-footer{display:block;text-align:right;}
.dialog-footer .el-button{border-radius:4px;}
.button-daoru{background:none;color:#fff;border-color:#fff;font-weight:bold;position:absolute;bottom:50px;border-radius:2px;}
</style>
