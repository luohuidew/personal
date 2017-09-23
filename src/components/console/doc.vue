<template>
  <div class="cust-module-doc">
    <h2>平台组件示例及使用文档</h2>
    <p style="width: 100%;text-align: center">供开发人员使用。系统上线后可隐藏掉</p>
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
    <el-row :gutter="20">
      <el-col :span="12">
        <el-button type="text">文字按钮</el-button> <pre>type="text"；文字按钮</pre>
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
    <h3>4、Switch 开关</h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-switch
          v-model="switchVal"
          on-text="on"
          off-text="off">
        </el-switch> <pre> el-switch； 用于"开关"</pre>
      </el-col>
    </el-row>
    <h3>5、Input 输入框</h3>
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
    <h3>6、Select 选择器</h3>
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
        <pre>size="mini", width=180； size="mini100",width=100</pre>
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
    <h3>7、DatePicker 日期选择器</h3>
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
          v-model="value2"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <pre>size="small", width=230；</pre>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-date-picker
          v-model="value3"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <pre>默认size， width=300；</pre>
      </el-col>
      <el-col :span="12">
        <el-date-picker
          size="large"
          v-model="value4"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <pre>size="large", width=400；</pre>
      </el-col>
    </el-row>
    <h3>8、Table 表格</h3>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
        <pre>el-table</pre>
      </el-col>
    </el-row>
    <h3>9、Dialog 对话框</h3>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-button type="text" @click="dialogVisibleT = true">点击打开 Dialog;size="tiny" </el-button>
        <el-button type="text" @click="dialogVisibleS = true">点击打开 Dialog;size="small" </el-button>
        <el-button type="text">另外还有，size="large" size="normal" Dialog;size="full" </el-button>
      </el-col>
    </el-row>
    <el-dialog title="添加融资信息" :visible.sync="dialogVisibleT" size="tiny" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域" size="mini">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleT = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleT = false">确 定</el-button>
          </span>
    </el-dialog>
    <el-dialog title="添加融资信息" :visible.sync="dialogVisibleS" size="small" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth" required>
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleS = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleS = false">确 定</el-button>
          </span>
    </el-dialog>
    <pre>el-dialog;</pre>
    <h3>10、Message 消息提示</h3>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-button @click="open2">成功</el-button><pre>this.$message({
  message: '这是一条成功消息',
  type: 'success'
  });</pre>
      </el-col>
      <el-col :span="6">
        <el-button @click="open3">警告</el-button><pre>this.$message({
  message: '这是一条警告消息',
  type: 'success'
  });</pre>
      </el-col>
      <el-col :span="6">
        <el-button @click="open">消息</el-button><pre>this.$message(
  '这是一条消息提示');</pre>
      </el-col>
      <el-col :span="6">
        <el-button @click="open4">错误</el-button><pre>this.$message
  .error('这是一条错误消息');</pre>
      </el-col>
    </el-row>
    <h3>11、已有工具方法</h3>
    <el-row :gutter="20">
      <el-col :span="24">
        日期格式化：
        <pre>
          * (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
          * (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
          * (new Date('2017-09-08')).Format('yyyy/MM/dd')      ==> 2017/07/08
        </pre>
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
      switchVal: true,
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
      value2: '',
      value3: '',
      value4: '',
      tableData: [{
        date: '2016-05-02',
        name: '安其拉',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王昭君',
        address: '上海市普陀区金沙江路 1517 弄',
      }, {
        date: '2016-05-01',
        name: '阿珂',
        address: '上海市普陀区金沙江路 1519 弄',
      }, {
        date: '2016-05-03',
        name: '高渐离',
        address: '上海市普陀区金沙江路 1516 弄',
      }],
      dialogVisibleT: false,
      dialogVisibleS: false,
      form: {
        name: '',
        region: '',
      },
      formLabelWidth: '120px',
    };
  },
  mounted() {
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？').then(() => {
        done();
      }).catch(() => {});
    },
    open() {
      this.$message('这是一条消息提示');
    },
    open2() {
      this.$message({
        message: '这是一条成功消息',
        type: 'success',
      });
    },
    open3() {
      this.$message({
        message: '这是一条警告消息',
        type: 'warning',
      });
    },
    open4() {
      this.$message.error('这是一条错误消息');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cust-module-doc {
    background: #fff;
    padding: 30px;
  }

  h2 {
    text-align: center;
    margin: 10px 0 20px;
  }

  h3 {
    margin: 30px -20px 10px -20px;
    border-top: 1px solid #cfcfcf;
    height: 40px;
    line-height: 40px;
  }

</style>
