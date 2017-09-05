<template>
  <div class="equity-dashboard">
    <!-- <div id="ddbox" style="width:600px;height:600px;border:1px solid #f00;"></div> -->
    <div class="equity-head">
      <el-row :gutter="20" class="container">
        <el-col :span="8">
          <div class="head-content">
            <div class="head-title"><span class="span1">股东人数</span><span class="span2">（人）</span></div>
            <div class="head-cont"><span class="num1">123</span></div>
          </div>
        </el-col>
        <el-col :span="8"><div class="head-content"></div></el-col>
        <el-col :span="8"><div class="head-content"></div></el-col>
      </el-row>
      <el-row :gutter="20" class="container">
        <el-col :span="16"><div class="head-content"></div></el-col>
        <el-col :span="8"><div class="head-content"></div></el-col>
      </el-row>
    </div>
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
.container{margin:20px 0 0 20px;}
.head-content{min-height:120px;background:#fff;border-radius:2px;padding:20px 0 0 36px;}
.span1{font-size: 16px;color: #666;letter-spacing: 4px;}
</style>
