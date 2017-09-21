<template>
  <div class="stock-container">
    <div class="stock-head">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="head-menu">
            <span class="title">融资详情</span>
            <router-link class="return" :to="{ path: '/equity/dashboard' }">&lt;返回</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="stock-cont">
      <div class="echart-warp bgcolor" id="financChart">
      </div>
    </div>
    <div class="stock-cont">
      <div class="stock-list bgcolor">
        <div class="main-title clearfix">
          <span class="title">融资列表</span>
          <el-button class="addbtn" type="primary" @click="dialogVisible = true">新增融资</el-button>
        </div>
        <div class="table-wrap">
          <el-table :data="financlistdata">
            <el-table-column label="融资轮次">
              <template scope="scope">
                <ul class="round-wrap">
                  <li v-for="item in roundType" v-bind:class="{active: scope.row.round == item.id}">{{item.text}}</li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column  prop="financedAccount" label="融资金额"></el-table-column>
            <el-table-column  prop="financedDate" label="融资时间"></el-table-column>
            <el-table-column  prop="equity.shareholderName" label="投资方"></el-table-column>
            <el-table-column label="操作">
              <template scope="scope"><el-button @click="delete(scope.row)">删除</el-button></template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 新增融资 -->
    <el-dialog title="添加融资信息" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <el-form :model="financAddMap" :rules="rules" ref="financAddForm" label-width="120px">
        <el-form-item label="融资轮次" required prop="round">
          <el-select v-model="financAddMap.round" placeholder="请选择融资轮次">
            <el-option v-for="item in roundType" :key="item.id" :label="item.text" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="融资时间" required prop="financedDate">
          <el-date-picker v-model="financAddMap.financedDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="融资金额" required prop="financedAccount">
          <el-input v-model.number="financAddMap.financedAccount"></el-input>
        </el-form-item>
        <el-form-item label="投资方" required prop="equityid">
          <el-select v-model="financAddMap.equityid" placeholder="请选择投资方">
            <el-option v-for="item in shareholderMap" :key="item.id" :label="item.shareholderName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkForm('financAddForm')">继续添加</el-button>
        <el-button type="primary" @click="checkForm('financAddForm');resetForm('financAddForm');dialogVisible=false;">确认保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import echarts from 'echarts';
import financServer from '../../../../service/financ';
import stockServer from '../../../../service/stock';
import { ROUND_TYPE } from '../../../../data/constants';

export default {
  name: 'stock-detail',
  data() {
    return {
      companyId: '',  // 从缓存读取
      financlistdata: [],
      shareholderMap: [],
      financAddMap: {
        equityid: '',
        financedAccount: '',
        round: '1',
        financedDate: '',
      },
      eChartList: {
        xAxiasMap: [],
        yAxiasMap: [],
      },
      rules: {
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
      roundType: ROUND_TYPE,
      dialogVisible: false,
    };
  },
  created() {
    const companyMap = JSON.parse(sessionStorage.getItem('_COMPANY_KEY'));
    this.companyId = companyMap.companyInfo.companyId;
    this.financAddMap.companyId = this.companyId;
    financServer.getFinancListByCompanyId().then((resp) => {
      this.financlistdata = resp;
      this.createEchart();
    });
    this.getShareholderList();
  },
  methods: {
    createEchart() {
      this.xyEchartData();
      this.myChartDiv = document.getElementById('financChart');
      if (this.myChartDiv) {
        this.onEchart();
      }
    },
    onEchart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.myChartDiv);
      // 绘制图表
      myChart.setOption({
        color: '#4F6BBF',
        backgroundColor: '#ffffff',
        textStyle: {
          color: '#666666',
        },
        // title: {
        //   show: true,
        //   text: '测试标题',
        // },
        tooltip: {
          show: true,
          formatter: '{b0}<br /> {c0}',
          backgroundColor: '#4F6BBF',
          padding: [10, 10, 10, 10],
        },
        grid: {
          top: '20',
          left: '20',
          right: '20',
          bottom: '20',
          containLabel: true,
        },
        xAxis: {
          data: this.eChartList.xAxiasMap,
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              width: 1,
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              width: 1,
            },
          },
        },
        series: [{
          type: 'line',
          data: this.eChartList.yAxiasMap,
          symbol: 'circle',
          symbolSize: 4,
          itemStyle: {
            normal: {
              color: 'rgba(124,150,224,0.60)',
            },
          },
          lineStyle: {
            normal: {
              opacity: 0,
            },
          },
          areaStyle: {
            normal: {
              color: 'rgba(124,150,224,0.60)',
            },
            smooth: true,
            smoothMonotone: 'x',
            sampling: 'average',
          },
        }],
      });
    },
    xyEchartData() {
      this.financlistdata.forEach((value) => {
        this.eChartList.xAxiasMap.push(value.financedDate);
        this.eChartList.yAxiasMap.push(value.financedAccount);
      });
    },
    checkForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addFinanc(formName);
        }
      });
    },
    addFinanc(formName) {
      if (this.financAddMap.financedDate) {
        this.financAddMap.financedDate = this.financAddMap.financedDate.Format('yyyy-MM-dd');
      }
      financServer.addFinanc(this.financAddMap).then(() => {
        this.resetForm(formName);
        this.$message({
          message: '添加成功',
          type: 'success',
        });
      });
    },
    delete(row) {
      financServer.deleteFinanc(row.id);
    },
    handleClose() {
      this.resetForm('financAddForm');
      this.dialogVisible = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getShareholderList() {
      stockServer.getStockListByCompanyId().then((resp) => {
        this.shareholderMap = resp;
      });
    },
  },
};
</script>
<style scoped>
.head-menu{background: #fff;min-height: 60px;margin:-20px -20px 0;text-align: center;position: relative;}
.head-menu .title{font-weight:bold;font-size: 16px;color: #666;letter-spacing: 1.97px;line-height: 60px;}
.head-menu .return{position: absolute;top:20px;left:20px;font-size: 14px;color: #999999;letter-spacing: 1.14px;line-height: 14px;}
.stock-cont{margin:20px 0 0;}
.echart-warp{min-height: 180px;}
.stock-list{min-height:500px;padding:30px 30px 0 30px;}
.main-title .title{float:left;display: inline;font-size: 16px;color: #666666;letter-spacing:1px;font-weight:bold;line-height:36px;}
.main-title .addbtn{float:right;display: inline;font-size: 14px;color: #FFFFFF;letter-spacing: 1px;}
.table-wrap{margin:20px 0 0;}
</style>

