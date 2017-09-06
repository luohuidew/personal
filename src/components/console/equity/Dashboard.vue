<template>
  <div class="equity-dashboard">
    <!-- <div id="ddbox" style="width:600px;height:600px;border:1px solid #f00;"></div> -->
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
              <a href="/console#/equity/dashboard/stockdetail" class="more">更多详情&gt;</a>
            </div>
            <div class="main-wrap">
              <el-table :data="tableData">
                <el-table-column label="股东名称"></el-table-column>
                <el-table-column label="投资轮次"></el-table-column>
                <el-table-column label="股份比例"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="main-content bgcolor">
            <div class="main-title clearfix">
              <span class="title">融资历史</span>
              <a href="/console#/equity/dashboard/financdetail" class="more">更多详情&gt;</a>
            </div>
            <div class="main-wrap">
              <el-steps :space="100" direction="vertical">
                <el-step title="2017-06-08" description=financeText>
                  <div slot="text"></div>
                </el-step>
                <el-step title="2017-07-08" description=financeText></el-step>
                <el-step title="2017-08-08" description=financeText></el-step>
                <el-step title="2017-12-08" description="这是一段很长很长很长的描述性文字"></el-step>
              </el-steps>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <slot ></slot>
  </div>
</template>

<script>
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


export default {
  name: 'equity-dashboard',
  data() {
    return {
      myChartDiv: undefined,
      financeText: '<span class="text-bold">A轮</span>&nbsp;&nbsp;获<span class="text-bold">120万</span>经纬中国投资',
    };
  },
  created() {
  },
  mounted() {
    // this.myChartDiv = document.getElementById('ddbox');
    // if (this.myChartDiv) {
    //   this.onEchart();
    // }
  },
  methods: {
    onEchart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(this.myChartDiv);
      // 绘制图表
      myChart.setOption({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        }],
      });
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
</style>
