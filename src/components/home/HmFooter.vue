<template>
  <div class="footer">
    <div class="footwrap">
      <el-row>
        <el-col :span="8">
          <p>Copyright 版权所有</p>
          <p>京ICP备 14052685号-2</p>
        </el-col>
        <el-col :span="16">
          <ul>
            <li>关于我们</li>
            <li>联系方式</li>
            <li>公司地址</li>
            <li>公司邮箱</li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer{width:100%;height:260px;background:#2A313F;}
.footwrap{max-width:1400px;}
</style>
