<template>
  <div class="footer">
    <div class="footwrap">
      <el-row type="flex" class="padding-space" justify="space-between">
        <el-col :span="8">
          <img src="../../assets/foot-logo.png" alt="capTable">
          <div class="pure-u-2">
            <ul>
              <li>Copyright 版权所有</li>
              <li>京ICP备 14052685号-2</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="pure-u-1">
            <ul>
              <li class="heading-menu">关于我们</li>
              <li>联系方式</li>
              <li>公司地址</li>
              <li>公司邮箱</li>
            </ul>
          </div>
          <div class="pure-u-1">
            <ul>
              <li class="heading-menu">产品介绍</li>
              <li>产品种类</li>
              <li>产品结构</li>
              <li>产品特色</li>
            </ul>
          </div>
          <div class="pure-u-1">
            <ul>
              <li class="heading-menu">新手指南</li>
              <li>常见问题</li>
              <li>信息反馈</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="pure-u-3">
            <img src="../../assets/erweima.png" alt="扫码关注">
            <p class="weixinline">关注微信公众号</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hm-footer',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer{width:100%;height:260px;background:#2A313F;}
.footwrap{padding:55px 15.6% 0;}
.padding-space{padding: 0 3%}
.pure-u-1{display:inline-block;zoom:1;vertical-align:top;min-width:130px;}
.pure-u-2{margin-top:10px;}
.pure-u-2 li{line-height:30px;}
.pure-u-1 li{line-height:30px;}
.pure-u-3{display:inline-block;zoom:1;text-align:center}
.heading-menu{font-size:16px;font-weight:bold;margin-bottom:14px;}
.weixinline{line-height: 24px;margin-top:20px;}
</style>
