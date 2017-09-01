<template>
  <div class="cust-module-doc">
    <h2>本平台定制样式示例及使用方式</h2>
    <p style="width: 100%;text-align: center">系统上线，本文档需要隐藏掉</p>
    <h3>1、Button</h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button type="success">主要按钮</el-button>  <pre>type="success"；<br>用于"确定"，"下一步"等</pre>
      </el-col>
      <el-col :span="12">
        <el-button>默认按钮</el-button>
        <pre>el-button 无type；<br>用于"取消"等</pre>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button type="primary">主要按钮</el-button>  <pre>type="primary"；<br>用于页面上边角较小按钮，border-radius=2</pre>
      </el-col>
      <el-col :span="12">
        <el-button type="info">导入/导出</el-button>
        <pre>type="info"；<br>用于页面上边角较小按钮，border-radius=2</pre>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'cust-module-doc',
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cust-module-doc {
    background: #fff;
    height: 300px;
  }
  h2{
    text-align: center;
    margin: 10px 0 20px;
  }
  h3 {
    margin: 20px 0;
  }
</style>
