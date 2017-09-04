<template>
  <div class="cust-module-doc">
    <h2>平台组件示例及使用文档</h2>
    <p style="width: 100%;text-align: center">供开发人员使用。系统上线后隐藏掉</p>
    <h3>1、Button 按钮</h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button type="success">确认按钮</el-button>  <pre>type="success"；<br>用于"确定"，"下一步"等</pre>
      </el-col>
      <el-col :span="12">
        <el-button>取消按钮</el-button>
        <pre>默认type；<br>用于"取消"等</pre>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button type="primary">页面按钮</el-button>  <pre>type="primary"；<br>用于页面上边角较小按钮，border-radius=2</pre>
      </el-col>
      <el-col :span="12">
        <el-button type="info">页面按钮</el-button>
        <pre>type="info"；<br>用于页面上边角较小按钮，border-radius=2</pre>
      </el-col>
    </el-row>
    <h3>2、Radio 单选框</h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-radio v-model="radio" label="1">备选项</el-radio> <el-radio v-model="radio" label="2">备选项</el-radio> <pre>el-radio； 用于"单选"</pre>
      </el-col>
      <el-col :span="12">
        <el-radio-group v-model="radio2">
          <el-radio label="1">备选项</el-radio>
          <el-radio label="2">备选项</el-radio>
          <el-radio label="3">备选项</el-radio>
        </el-radio-group>
        <pre> el-radio-group； 用于"单选 组选框" </pre>
      </el-col>
    </el-row>
    <h3>3、Checkbox 多选框</h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-checkbox v-model="checked">备选项</el-checkbox> <pre> el-checkbox； 用于"多选"</pre>
      </el-col>
      <el-col :span="12">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
          <el-checkbox label="禁用" disabled></el-checkbox>
          <el-checkbox label="选中且禁用" disabled></el-checkbox>
        </el-checkbox-group>
        <pre> el-checkbox-group； 用于"多选框组" </pre>
      </el-col>
    </el-row>
    <h3>4、Input 输入框</h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input> <pre>size="mini", width=180；</pre>
      </el-col>
      <el-col :span="12">
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input> <pre>size="small", width=230；</pre>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input v-model="input" placeholder="请输入内容"></el-input> <pre>默认size， width=300；</pre>
      </el-col>
      <el-col :span="12">
        <el-input v-model="input" size="large" placeholder="请输入内容"></el-input> <pre>size="large", width=400；</pre>
      </el-col>
    </el-row>
    <h3>5、Select 选择器</h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-select v-model="value" size="mini"  clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <pre>size="mini", width=180；</pre>
      </el-col>
      <el-col :span="12">
        <el-select v-model="value" size="small" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <pre>size="small", width=230；</pre>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <pre>默认size， width=300；</pre>
      </el-col>
      <el-col :span="12">
        <el-select v-model="value" size="large" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <pre>size="large", width=400；</pre>
      </el-col>
    </el-row>
    <h3>6、DatePicker 日期选择器</h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-date-picker
          size="mini"
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <pre>size="mini", width=180；</pre>
      </el-col>
      <el-col :span="12">
        <el-date-picker
          size="small"
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <pre>size="small", width=230；</pre>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <pre>默认size， width=300；</pre>
      </el-col>
      <el-col :span="12">
        <el-date-picker
          size="large"
          v-model="value1"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <pre>size="large", width=400；</pre>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'cust-module-doc',
  data() {
    return {
      radio: '1',
      radio2: '1',
      checked: true,
      checkList: ['选中且禁用', '复选框 A'],
      input: '',
      options: [{
        value: '选项3',
        label: '蚵仔煎',
      }, {
        value: '选项4',
        label: '龙须面',
      }, {
        value: '选项5',
        label: '北京烤鸭',
      }],
      value: '',
      value1: '',
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
    padding: 20px;
  }
  h2{
    text-align: center;
    margin: 10px 0 20px;
  }
  h3 {
    margin: 30px 0 10px 0;
    border-top: 1px solid #cfcfcf;
    height: 40px;
    line-height: 40px;
  }
</style>
