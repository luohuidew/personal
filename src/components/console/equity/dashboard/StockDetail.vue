<template>
  <div class="stock-container">
    <div class="stock-head">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="head-menu">
            <span class="title">股权详情</span>
            <router-link class="return" :to="{ path: '/equity/dashboard' }">&lt;返回</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="stock-cont">
      <div class="echart-warp bgcolor" id="stockChart">
      </div>
    </div>
    <div class="stock-cont">
      <div class="stock-list bgcolor">
        <div class="main-title clearfix">
          <span class="title">股权列表</span>
          <el-button class="addbtn" type="primary" @click="dialogVisible = true">新增股东</el-button>
        </div>
        <div class="table-wrap">
          <treelist-table :treelistdata="stocklistdata" v-if="isloading"></treelist-table>
        </div>
      </div>
    </div>
    <!-- 新增股东 -->
    <el-dialog title="添加股权信息" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <el-form :model="stockAddMap" ref="stockAddForm" label-width="120px">
        <el-form-item label="股东名称" required prop="shareholderName" :rules="[{ required: true, message: '股东名称不能为空'}]">
          <el-input v-model="stockAddMap.shareholderName"></el-input>
        </el-form-item>
        <el-form-item label="股东类型" required prop="shareholderType" :rules="[{ required: true, message: '股东类型不能为空', trigger: 'change'}]">
          <el-select v-model="stockAddMap.shareholderType" placeholder="请选择股东类型">
            <el-option v-for="item in shareholderType" :label="item.text" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投资轮次" required prop="rounds" :rules="[{ required: true, message: '股东轮次不能为空', trigger: 'change'}]">
          <el-select v-model="stockAddMap.rounds" placeholder="请选择投资轮次">
            <el-option v-for="item in roundType" :label="item.text" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册资本" required prop="registeredCapital" :rules="[{ required: true, message: '注册资本不能为空'}, { type: 'number', message: '注册资本必须为数字值'}]">
          <el-input v-model.number="stockAddMap.registeredCapital"></el-input>
        </el-form-item>
        <el-form-item label="股份比例" required>
          <el-input v-model="stockScale" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkForm('stockAddForm')">继续添加</el-button>
        <el-button type="primary" @click="checkForm('stockAddForm');resetForm('financAddForm');dialogVisible=false;">确认保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import echarts from 'echarts';
import treelistTable from './treetable';
import { SHAREHOLDER_TYPE, ROUND_TYPE } from '../../../../data/constants';
import stockServer from '../../../../service/stock';

export default {
  name: 'stock-detail',
  data() {
    return {
      companyId: '123123123',  // 从缓存读取
      totalMoney: 140000,  // 调取接口
      isloading: false, // 判断axios加载是否完成,加载完成后才渲染组件
      myChartDiv: undefined,
      stocklistdata: {},
      shareholderType: SHAREHOLDER_TYPE, // 股东类型
      roundType: ROUND_TYPE, // 投资轮次
      stockAddMap: {
        shareholderName: '',
        shareholderType: '',
        rounds: '',
        registeredCapital: '',
      },
      eChartList: {
        xAxiasMap: [],
        yAxiasMap: [],
      },
      dialogVisible: false,
    };
  },
  created() {
    this.getStockList();
    this.stockAddMap.companyId = this.companyId;
  },
  mounted() {
  },
  methods: {
    createEchart() {
      this.xyEchartData();
      this.myChartDiv = document.getElementById('stockChart');
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
        tooltip: {},
        xAxis: {
          data: this.eChartList.xAxiasMap,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ffffff',
              width: '0',
            },
          },
        },
        yAxis: {
          show: false,
        },
        series: [{
          type: 'bar',
          data: this.eChartList.yAxiasMap,
          itemstyle: {
          },
          barWidth: '10%',
          barMinHeight: '10',
        }],
      });
    },
    xyEchartData() {
      this.stocklistdata.forEach((value) => {
        this.eChartList.xAxiasMap.push(value.shareholderAbbreviation);
        this.eChartList.yAxiasMap.push(value.registeredCapital);
      });
      console.log(this.eChartList.xAxiasMap);
      console.log(this.eChartList.yAxiasMap);
    },
    checkForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addStock(formName);
        }
        this.$message.error('添加失败');
        return false;
      });
    },
    addStock(formName) {
      stockServer.add(this.stockAddMap).then(() => {
        this.resetForm(formName);
        this.$message({
          message: '添加成功',
          type: 'success',
        });
      }, () => {
        this.$message.error('添加失败');
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose() {
      this.resetForm('stockAddForm');
      this.dialogVisible = false;
    },
    getStockList() {
      stockServer.getAll(this.companyId).then((resp) => {
        this.stocklistdata = resp;
        this.isloading = true;
        this.createEchart();
      });
    },
  },
  computed: {
    stockScale() {
      return stockServer.getPercent(this.stockAddMap.registeredCapital, this.totalMoney);
    },
  },
  components: {
    treelistTable,
  },
};
</script>
<style scoped>
.head-menu{background: #fff;min-height: 60px;margin:-20px -20px 0;text-align: center;position: relative;}
.head-menu .title{font-weight:bold;font-size: 16px;color: #666;letter-spacing: 1.97px;line-height: 60px;}
.head-menu .return{position: absolute;top:20px;left:20px;font-size: 14px;color: #999999;letter-spacing: 1.14px;line-height: 14px;}
.stock-cont{margin:20px 0 0;}
.echart-warp{min-height: 180px;width:100%;}
.stock-list{min-height:500px;padding:30px 30px 0 30px;}
.main-title .title{float:left;display: inline;font-size: 16px;color: #666666;letter-spacing:1px;font-weight:bold;line-height:36px;}
.main-title .addbtn{float:right;display: inline;font-size: 14px;color: #FFFFFF;letter-spacing: 1px;}
.table-wrap{margin:20px 0 0;}
</style>

