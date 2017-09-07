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
              <router-link class="more" :to="{ path: '/equity/dashboard/stockdetail' }">更多详情&gt;</router-link>
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
              <router-link class="more" :to="{ path: '/equity/dashboard/financdetail' }">更多详情&gt;</router-link>
            </div>
            <div class="main-wrap">
              <div class="step-list">
                <div class="step-wrap" v-for="item in stepList">
                  <div class="step-head">
                    <div class="step-line"></div>
                    <div class="step-icon"></div>
                  </div>
                  <div class="step-main">
                    <div class="step-title">{{item.title}}</div>
                    <div class="step-description"><span class="bold">{{item.finance}}</span>&nbsp;&nbsp;获<span class="bold">{{item.money}}</span>{{item.compony}}</div>
                  </div>
                </div>
              </div>
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
      stepList: [{   // 测试
        title: '2017-07-06',
        finance: 'A轮',
        compony: '经纬中国投资',
        money: '120万',
      },
      {
        title: '2017-07-26',
        finance: 'B轮',
        compony: '经纬中国投资',
        money: '220万',
      },
      {
        title: '2017-08-06',
        finance: 'C轮',
        compony: '经纬中国投资',
        money: '500万',
      }],
      tableData: [],   // 测试
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
.step-wrap{position:relative;vertical-align:top;height:100px;color:#999;letter-spacing: 1.3px;font-size:0;}
.step-head{float:left;display:inline-block;}
.step-icon{display:inline-block;line-height:8px;width:8px;height:8px;border:2px solid #52B0F6;border-radius: 50%;}
.step-line{position:absolute;display:inline-block;width:0;top:12px;left:5px;bottom: 0;border: 1px solid #F4F4F4;}
.step-main{padding-left:20px;}
.step-title{font-size: 14px;}
.step-description{font-size: 16px;color: #999;padding-right:10px;line-height: 66px;}
.step-description .bold{font-weight: bold;color: #666;}
</style>
