<template>
  <div class="main">
    <br>
    <br>
    <br>
    <section class="part1">
      <h2>实施股权激励的有效方式</h2>
      <p>创造价值互联</p>
      <div class="par1-links">
        <a href="javascript:void(0);" class="a-1"><span>申请试用</span></a>
        <a href="javascript:void(0);" class="a-2"><i></i><span>播放视频</span></a>
      </div>

    </section>
    <section class="part2">
      <h3 class="small-head"><i>.</i><span>产品功能</span><i>.</i></h3>
      <h2 class="mid-head">一站式股权管理</h2>
      <el-row :gutter="20" class="part2-main">
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
    <div @click="jump" style="border: 1px solid red;width: 100px;">点我跳到控制台</div>
    <br>
    <br> <br>
    <br>
  </div>
</template>

<script>
export default {
  name: 'main',
  data() {
    return {
    };
  },
  methods: {
    jump() {
//      this.$router.push({ name: 'ForgetPassword' });
      window.location.href = `http://${window.location.host}/console`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.part1{
  width: 100%;
  height: 650px;
  background-image: url('../../assets/banner.png');
  background-color: rgba(11,22,49,0.72);
  background-size: cover;
  background-position: center bottom;
  text-align: center;
  font-family: NotoSansHans-Regular;
}
.part1 h2{
  margin-bottom: 20px;
  font-size: 45px;
  color: #FFFFFF;
  letter-spacing: 3px;
  line-height: 100px;
  text-shadow: 0 2px 4px rgba(179,179,179,0.50);
  font-weight: normal;
}
par1-links {
  height: 46px;
  line-height: 46px;
  overflow: hidden;
}
.par1-links a{
  display: inline-block;
  width: 150px;
  height: 46px;
  -moz-border-radius: 30px;
  -webkit-border-radius: 30px;
  border-radius: 30px;
  
}
.par1-links a span{
  display: inline-block;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 3px;
  line-height: 46px;
}
.a-1{
  background: #FFCA57;
  margin-right: 3%;
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
}
.a-2 i{
  position: relative;
  top: 3px;
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 4px;
  background: url('../../assets/index-player.png') no-repeat center center;
}
.a-2 span{
  position: relative;
  top: -12px;
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
  border-radius: 40px;
  font-size: 14px;
  color: #4F5152;
  letter-spacing: 2px;
}
.part2-main .el-col a:hover {
  background:#546AAC;
  color: #fff;
}

</style>
