<template>
  <div>
    <hm-header :no-defult-head="noDefultHead"></hm-header>
    <div class="price-view">
      <p class="title1">小投入，大回报</p>
      <el-row :gutter="52" class="pure-g">
        <el-col :span="8">
          <div class="cont-wrap">
            <div class="cont-top">
              <p class="text-line-1 clearfix"><span class="text">首年</span> <span class="rmb">¥</span> <span class="number">2，980</span></p>
              <p class="text-line-2 clearfix"><span class="text">续费</span> <span class="rmb">¥</span> <span class="number">1，980</span></p>
            </div>
            <div>
              <ul>
                <li>在线生成并签署全套法律文件</li>
                <li class="li-line-even">专业流程引导期权发放及管理</li>
                <li>基于行业标准和大数据的发放建议</li>
                <li class="li-line-even">员工可在个人资产中随时查看期权状态</li>
              </ul>
            </div>
            <div class="cont-foot">标准版</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="cont-wrap">
            <div class="cont-top">
              <p class="text-line-1 clearfix"><span class="text">首年</span> <span class="rmb">¥</span> <span class="number">14，980</span></p>
              <p class="text-line-2 clearfix"><span class="text">续费</span> <span class="rmb">¥</span> <span class="number">10，980</span></p>
            </div>
            <div>
              <ul>
                <li>在线生成并签署全套法律文件</li>
                <li class="li-line-even">专业流程引导期权发放及管理</li>
                <li>基于行业标准和大数据的发放建议</li>
                <li class="li-line-even">员工可在个人资产中随时查看期权状态</li>
              </ul>
            </div>
            <div class="cont-foot">境内律师定制版</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="cont-wrap">
            <div class="cont-top">
              <p class="text-line-1 clearfix"><span class="text">首年</span> <span class="rmb">¥</span> <span class="number">37，980</span></p>
              <p class="text-line-2 clearfix"><span class="text">续费</span> <span class="rmb">¥</span> <span class="number">10，980</span></p>
            </div>
            <div>
              <ul>
                <li>在线生成并签署全套法律文件</li>
                <li class="li-line-even">专业流程引导期权发放及管理</li>
                <li>基于行业标准和大数据的发放建议</li>
                <li class="li-line-even">员工可在个人资产中随时查看期权状态</li>
              </ul>
            </div>
            <div class="cont-foot">境外律师定制版</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import hmHeader from './HmHeader';

export default {
  name: 'price-view',
  data() {
    return {
      noDefultHead: true,
    };
  },
  methods: {
  },
  components: {
    hmHeader,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.price-view{padding:80px 15.6% 0;height:1000px;background: url('../../assets/priceviewbg.png');}
.title1{font-size: 36px;color: #212859;letter-spacing: -1.39px;line-height: 55px;text-align: center;padding-top:80px;}
.pure-g{padding:0 10%;margin-top:90px;}
.cont-wrap{width:100%;background:#fff;border-radius: 4px;color:#7D7F86;}
.cont-top{padding:50px 0 44px 44px;}
.cont-wrap ul{background: #F3F8FA;color:#72787B;}
.cont-wrap ul li{line-height:50px;padding-left:30px;}
.li-line-even{background:#FBFBFB}
.cont-foot{margin-top:50px;background:#9C9EB3;height:60px;line-height:60px;text-align: center;font-size: 20px;color: #FFFFFF;letter-spacing: 1.66px;border-radius: 0 0 4px 4px;}
.cont-top .text-line-1, .cont-top .text-line-2{padding:10px 0;}
.cont-top .text-line-1 .text{font-size: 18px;color: #7D7F86;letter-spacing: 3.27px;line-height: 36px;height:36px;overflow:hidden;float:left;display:inline-block;zoom:1;width:50px;padding:0 10px;text-align:justify;}
.cont-top .text-line-1 .text:after{content:'哈哈';width: 100%;display: inline-block;overflow: hidden;height: 0;font-size:0;line-height:0;} 
.cont-top .text-line-1 .rmb{font-size: 18px;color: #3C3D41;line-height: 36px;}
.cont-top .text-line-1 .number{font-size: 36px;color: #3C3D41;line-height: 36px;font-weight:bold;}
.cont-top .text-line-2 .text{font-size: 14px;color: #7D7F86;letter-spacing: 2.54px;line-height: 36px;height:36px;overflow:hidden;float:left;display:inline-block;zoom:1;width:50px;padding:0 10px;text-align:justify;}
.cont-top .text-line-2 .text:after{content:' ';width: 100%;display: inline-block;overflow: hidden;height: 0;font-size:0;line-height:0;}  
.cont-top .text-line-2 .rmb{font-size: 16px;color: #61636B;line-height: 36px;}
.cont-top .text-line-2 .number{font-size: 24px;color: #61636B;line-height: 36px;font-weight:bold;}
</style>
