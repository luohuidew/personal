<template>
  <div>
    <hm-header></hm-header>
    <div class="main">
      <section class="part1">
        <h2 class="part">实施股权激励的有效方式</h2>
        <p>创造价值互联</p>
        <div class="par1-links">
          <div>
            <router-link class="a-1" to="/apply" target = "_blank"><span>申请试用</span></router-link>
            <a href="javascript:void(0);" class="a-2"><i></i><span>播放视频</span></a>
          </div>
        </div>
      </section>
      <!--产品功能-->
      <section class="part2">
        <h3 class="small-head"><i>.</i><span>产品功能</span><i>.</i></h3>
        <h2 class="mid-head">一站式股权管理</h2>
        <el-row type="flex" :gutter="20" class="part2-main" justify="space-between">
          <el-col :span="6">
            <div class="">
              <i><img src="../../assets/index-1.png"/></i>
              <h3>发行电子股票</h3>
              <p>网上发行证书及无证书股份，淘汰纸质股票证书</p>
              <a href="javascript:void(0);">了解更多</a>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="">
              <i><img src="../../assets/index-2.png"/></i>
              <h3>在线管理CapTable</h3>
              <p>追踪包括期权在内的所有资产和债务，轻松管理行权计划</p>
              <a href="javascript:void(0);">了解更多</a>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="">
              <i><img src="../../assets/index-3.png"/></i>
              <h3>筹划下轮融资</h3>
              <p>分析和比较未来的融资趋势，在融资时做出最佳决定</p>
              <a href="javascript:void(0);">了解更多</a>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="">
              <i><img src="../../assets/index-4.png"/></i>
              <h3>行使股东权利</h3>
              <p>给予股东及投资者随时获得最新信息的便捷通道</p>
              <a href="javascript:void(0);">了解更多</a>
            </div>
          </el-col>
        </el-row>
      </section>
      <!--产品展示-->
      <section class="part3">
        <h3 class="small-head"><i>.</i><span>产品展示</span><i>.</i></h3>
        <h2 class="mid-head">一站式股权管理</h2>
        <div class="slide-main">
          <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="权益管理" name="a0">
                <div class="imgbox"><img src="../../assets/index-equity.png"/></div>
              </el-tab-pane>
              <el-tab-pane label="期权管理" name="a1">
                <div class="imgbox"><img src="../../assets/index-option.png"/></div>
              </el-tab-pane>
              <el-tab-pane label="文档管理" name="a2">
                <div class="imgbox"><img src="../../assets/index-file.png"/></div>
              </el-tab-pane>
            </el-tabs>
          </template>
          <el-carousel :v-model="0" :autoplay="false" arrow="always" @change="link" :initial-index="0">
            <el-carousel-item v-for="item in 3" :key="item">
            </el-carousel-item>
          </el-carousel>
        </div>
      </section>
      <!--产品优势-->
      <section class="part4">
        <h3 class="small-head"><i>.</i><span>产品优势</span><i>.</i></h3>
        <h2 class="mid-head">一站式股权管理</h2>
        <el-row type="flex" class="ways" :gutter="60" justify="space-between">
          <el-col class="old" :span="12"><img src="../../assets/index-oldways.png"/></el-col>
          <el-col class="new" :span="12"><img src="../../assets/index-newways.png"/></el-col>
        </el-row>
      </section>
      <!--服务用户-->
      <section class="part5">
        <h3 class="small-head"><i>.</i><span>服务用户</span><i>.</i></h3>
        <h2 class="mid-head">一站式股权管理</h2>
        <div><img src="../../assets/index-part5.png"/></div>
      </section>
      <!--others-->
      <section class="part6">
        <el-row  type="flex" :gutter="60" justify="space-between">
          <el-col :span="14"><img src="../../assets/index-bottom.png"/></el-col>
          <el-col :span="10" class="des">
            <p>快来定制期权激励计划</p>
            <router-link to="/apply" target = "_blank">申请试用</router-link>
          </el-col>
        </el-row>
      </section>
      <!--<div @click="jump" style="border: 1px solid red;width: 100px;">点我跳到控制台</div>-->
      <br>
      <br>
      <br>
    </div>
    <hm-footer></hm-footer>
  </div>
</template>

<script>
import hmHeader from './HmHeader';
import HmFooter from './HmFooter';

export default {
  name: 'main',
  data() {
    return {
      activeName: 'a0', // 通过activeName来控制选项卡被选中的项
      returnItem: 0, // 选项卡返回来的index
      handle: 0, // 默认进来选项卡未被点击
      handleNext: 2,
      handleNow: 1, // 默认进来选项卡索引
      handleBefore: 0,
      linkable: 0, // 默认进来左右按钮也未被点击
      linkBefore: 0,
      linkNow: 1,
      // slideImgs: {
      //   0: '../../../static/img/index-equity.png',
      //   1: '../../../static/img/index-option.png',
      //   2: '../../../static/img/index-equity.png',
      // },
    };
  },
  methods: {
    jump() {
//      this.$router.push({ name: 'ForgetPassword' });
      window.location.href = `http://${window.location.host}/console`;
    },
    link(i) {
      this.activeName = `a${i}`;
    },
    handleClick(j) {
      this.returnItem = Number(j.index);
    },
  },
  components: {
    hmHeader, HmFooter,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  width: 100%;
  height: auto;
}
.part1, .part2, .part3, .part4, .part5, .part6{
  text-align: center;
}
.part1{
  width: 100%;
  padding: 208px 0 165px;
  background-image: url('../../assets/banner.png');
  background-color: rgba(11,22,49,0.72);
  background-size: cover;
  background-position: center bottom;
  font-family: NotoSansHans-Regular;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.part1 h2{
  margin-bottom: 20px;
  font-size: 45px;
  color: #fff;
  letter-spacing: 3px;
  line-height: 100px;
  text-shadow: 0 2px 4px rgba(179,179,179,0.50);
  font-weight: normal;
}
.par1-links div{
  height: 46px;
  line-height: 46px;
}
.par1-links a{
  display: inline-block;
  width: 150px;
  height: 46px;
  -moz-border-radius: 30px;
  -webkit-border-radius: 30px;
  border-radius: 30px;
  overflow: hidden;
}
.par1-links a span{
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 3px;
  line-height: 46px;
}
.a-1{
  background: #FFCA57;
  margin-right: 3%;
}
.a-1 span{
  float: left;
  width: 100%;
  height: 100%;
}
.a-1:hover{
  -webkit-opacity: 0.8; 
  -moz-opacity: 0.8;
  -khtml-opacity: 0.8;
  opacity: .8;
  filter:alpha(opacity=80);
  -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
}
.a-2{
  border: 1px solid #FFFFFF;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
}
.a-2 i{
  width: 46px;
  height: 46px;
  margin-right: -3px;
  background: url('../../assets/index-player.png') no-repeat center center;
}
.a-2 i, .a-2 span {
  float: left;
}
.a-2:hover{
  background:rgba(255,255,255,.3);
}
.part1 p{
  margin-bottom:88px;
  font-size: 24px;
  color: #FFF;
  letter-spacing: 26px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.50);
}
.part2{
  padding: 56px 15.6% 98px;
  background: #F4F5F7;
  text-align:center;
}
.small-head span{
  margin: 0 10px;
  color: #3B3D40;
  font-weight: normal;
  font-size: 16px;
}
.small-head i{
  position: relative;
  top: -4px;
  width:3px;
  height:3px;
  color: #616366;
}
.small-head span,.small-head i{
  display: inline-block;
  line-height: 24px;
}
.small-head span{
  letter-spacing: -0.62px;
}
.mid-head{
  margin: 26px 0 47px;
  font-size: 26px;
  line-height: 55px;
  color: #3B3D40;
  font-weight: normal;
  letter-spacing: -1px;
}
.part2-main .el-col div{
  /* height: 400px; */
  padding: 118px 11% 40px;
  background: #fff;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
}
.part2-main .el-col div:hover{
  -webkit-box-shadow: 0 5px 20px 0 rgba(185,185,185,0.52);
  -moz-box-shadow: 0 5px 20px 0 rgba(185,185,185,0.52);
  box-shadow: 0 5px 20px 0 rgba(185,185,185,0.52);
}
.part2-main .el-col div i{
  display: inline-block;
  width: 26px;
  height: 26px;
}
.part2-main .el-col div i img{
  width: auto;
  height: 100%;
}
.part2-main .el-col div h3{
  margin-top: 16px;
  line-height: 28px;
  font-size: 18px;
  color: #3C3D41;
  letter-spacing: 3px;
  font-weight: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.part2-main .el-col div p {
  height: 78px;
  margin-bottom: 50px;
  font-size: 14px;
  color: #656B6F;
  line-height: 26px;
  overflow: hidden;
}
.part2-main .el-col a {
  display: inline-block;
  width: 125px;
  height: 45px;
  line-height: 45px;
  border: 1px solid #E7E7E7;
  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;
  border-radius: 40px;
  font-size: 14px;
  color: #4F5152;
  letter-spacing: 2px;
}
.part2-main .el-col a:hover {
  background:#546AAC;
  color: #fff;
}
.part3 {
  padding: 46px 0 56px;
  background: #50608F;
}
.part3 h2, .part3 h3 span, .part3 h3 i{
  color: #fff;
}
.part3 h2 {
  margin-bottom: 12px;
}
.left-btn, .slide-main {
  display: inline-block;
}
.slide-main {
  position: relative;
  width: 45%;
  margin: 0 2%;
}
.slide-main .imgbox img {
  width:865px;
  height: 487px;
}
.left-btn {
  left: -13%;
}
.right-btn {
  right: -13%;
}
.part4 {
  padding: 46px 15.6% 90px;
  background: #fff;
}
.part4 h2 {
  margin-bottom: 10px;
}
/* .ways div img {
  width: 100%;
  height: auto;
} */
.part5 {
  padding: 56px 15.6% 85px;
  background: #EAEFF3;
}
.part5 h2 {
  margin-bottom: 30px;
}
.part6 {
  padding: 82px 15.6% 102px;
}
.part6 .des p{
  margin: 92px 0 40px;
  line-height: 26px;
  font-size: 26px;
  color: #131313;
  letter-spacing: 0.37px;
}
.part6 .des a{
  display: inline-block;
  width: 150px;
  height: 45px;
  line-height: 45px;
  background: #546AAC;
  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;
  border-radius: 40px;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 3px;
}
.el-carousel__arrow {
  width: 60px;
  height: 60px;
}
</style>
