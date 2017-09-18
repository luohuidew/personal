<template>
  <div class="equity-dashboard">
    <div class="equity-head">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="head-content bgcolor">
            <div class="head-title"><span class="span1">股东人数</span>&nbsp;&nbsp;<span class="span2">（人）</span></div>
            <div class="head-cont"><span class="num1">123</span></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="head-content bgcolor">
            <div class="head-title"><span class="span1">注册资金</span>&nbsp;&nbsp;<span class="span2">（万元）</span></div>
            <div class="head-cont"><span class="num1">56200</span></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="head-content bgcolor">
            <div class="head-title"><span class="span1">总融资额</span>&nbsp;&nbsp;<span class="span2">（万元）</span></div>
            <div class="head-cont"><span class="num1">6,200</span></div>
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
                <el-table-column prop="rate" label="股份比例"></el-table-column>
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
    <el-dialog class="dialog-wrap__large" title="添加股权信息" :visible.sync="dialogVisible1" size="large">
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
                  <el-option v-for="item in shareholderType" :label="item.text" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <el-form-item label="投资轮次" required prop="rounds">
                <el-select v-model="stockAddMap.rounds" size="small">
                  <el-option v-for="item in roundType" :label="item.text" :value="item.id"></el-option>
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
              <el-form-item label="股份比例" required>
                <el-input v-model="stockScale" size="small" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="checkStockForm('stockAddForm')">保存</el-button>
          <el-button type="primary" @click="dialogVisible1 = false;dialogVisible2 = true">下一步</el-button>
        </span>
        <div class="dialog-table-wrap">
          <el-table :data="stockAddList">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="股东名称" prop="shareholderName"></el-table-column>
            <el-table-column label="股东类型">
              <template scope="scope">{{shareholderType | roundFilter('SHAREHOLDER_TYPE')}}</template>
            </el-table-column>
            <el-table-column label="投资轮次">
              <template scope="scope">{{scope.row.rounds | roundFilter('ROUND_TYPE')}}</template>
            </el-table-column>
            <el-table-column label="注册资本" prop="registeredCapital"></el-table-column>
            <el-table-column label="股份比例"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <!-- 初次登录添加融资信息页 -->
    <el-dialog class="dialog-wrap__large" title="添加融资信息" :visible.sync="dialogVisible2" size="large">
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
                  <el-option v-for="item in roundType" :label="item.text" :value="item.id"></el-option>
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
                  <el-option v-for="item in stockMap" :label="item.shareholderName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="checkFinancForm('financAddForm')">保存</el-button>
          <el-button type="primary" @click="dialogVisible2 = false">完成</el-button>
        </span>
        <div class="dialog-table-wrap">
          <el-table :data="financAddList">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column label="融资轮次"></el-table-column>
            <el-table-column label="融资时间"></el-table-column>
            <el-table-column label="融资金额"></el-table-column>
            <el-table-column label="投资方"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import stockServer from '../../../service/stock';
import financServer from '../../../service/financ';
import filters from '../../../utils/filters';
import { SHAREHOLDER_TYPE, ROUND_TYPE } from '../../../data/constants';

export default {
  name: 'equity-dashboard',
  data() {
    return {
      companyId: '123123123',  // 从缓存读取
      dialogVisible1: true,
      dialogVisible2: false,
      stockMap: [],
      financMap: [],
      stockAddMap: { // 添加股权
        shareholderName: '',
        shareholderType: '0',
        rounds: '1',
        registeredCapital: '',
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
      } else {
        this.dialogVisible2 = true;
      }
    });
  },
  filters: {
    roundFilter(arg1, arg2) {
      return filters.constantsFilter(arg1, arg2);
    },
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
    checkFinancForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addFinanctoList(formName);
        }
      });
    },
    addStocktoLlist(formName) {
      this.resetForm(formName);
      this.stockAddList.push(this.stockAddMap);
    },
    addFinanctoList() {
      // if (this.financAddMap.financedDate) {
      //   this.financAddMap.financedDate = this.financAddMap.financedDate.split('T')[0];
      // }
      this.financAddList.push(this.financAddMap);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  computed: {
    stockScale() {
      return stockServer.getPercent(this.stockAddMap.registeredCapital, this.totalMoney);
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
.button-daoru{background:none;color:#fff;border-color:#fff;font-weight:bold;position:absolute;bottom:50px;}
</style>
