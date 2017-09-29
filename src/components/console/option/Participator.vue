<template>
  <div class="option-participator">
    <div class="option-cont">
      <div class="option-list bgcolor">
        <div class="main-title clearfix">
          <span class="title">
            <el-input placeholder="搜索姓名/邮箱/员工ID" icon="search" v-model="searchMsg.inputMsg" @click="searchBtn(1)" @keyup.enter.native="searchBtn(1)"></el-input>
          </span>
          <el-button class="addbtn" type="primary" @click="dialogAddPerson = true">添加参与方</el-button>
          <el-button class="addbtn" type="info">批量导入</el-button>
        </div>
        <div class="table-wrap">
          <el-table :data="account">
            <el-table-column align="center" prop="username" label="参与方名称"></el-table-column>
            <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
            <el-table-column align="center" prop="workId" label="员工ID"></el-table-column>
            <el-table-column align="center" prop="department" label="部门"></el-table-column>
            <el-table-column align="center" prop="position" label="职位"></el-table-column>
            <el-table-column align="right" label="">
              <template scope="scope">
                <el-dropdown trigger="click" @command="handleCommand(scope,scope.$index)">
                  <el-button size="mini" class="el-dropdown-link">
                    操作<i class="el-icon-caret-bottom el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item id="edit">编辑</el-dropdown-item>
                    <!--<el-dropdown-item id="permissionCheck">权限浏览</el-dropdown-item>-->
                    <el-dropdown-item v-if="scope.row.status === '0'" id="invitation">邀请</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.status === '1'" id="invitation">重新邀请</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.authority === 'ROLR_USER'" id="permissionSet">权限设置</el-dropdown-item>
                    <el-dropdown-item v-if="scope.row.authority === 'ROLR_USER'" id="delete">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-con">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="pagination.currentPage"
                         :page-size="pagination.pageSize"
                         :page-sizes="pagination.pageSizes"
                         :layout="pagination.layout"
                         :total="pagination.totalNum">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--新增参与方弹框-->
    <el-dialog title="新增参与方" :visible.sync="dialogAddPerson" :before-close="cleanContent" size="small">
      <el-form label-position='right' :model="person" :rules="rules" ref="person">
        <el-form-item label="参与方名称" prop="username" :label-width="formLabelWidth">
          <el-input v-model="person.username"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" :label-width="formLabelWidth">
          <el-select v-model="person.idType">
            <el-option
              v-for="item in id_type"
              :key='item.id'
              :label='item.text'
              :value='item.id'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="idNumber" :label-width="formLabelWidth">
          <el-input v-model="person.idNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="person.email"></el-input>
        </el-form-item>
        <el-form-item label="员工ID" prop="workId" :label-width="formLabelWidth">
          <el-input v-model="person.workId"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department" :label-width="formLabelWidth">
          <el-input v-model="person.department"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position" :label-width="formLabelWidth">
          <el-input v-model="person.position"></el-input>
        </el-form-item>
        <el-form-item label="" prop="sentEmail" :label-width="formLabelWidth">
          <el-checkbox v-model="person.sentEmail">发送邮件邀请</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPerson()">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改信息弹框-->
    <el-dialog title="编辑参与方" :visible.sync="dialogEditPerson" size="small">
      <el-form label-position='right' :model="dialogEditData" :rules="rules" ref="dialogEditData">
        <el-form-item label="参与方名称" prop="username" :label-width="formLabelWidth">
          <el-input v-model="dialogEditData.username"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" :label-width="formLabelWidth">
          <el-select v-model="dialogEditData.idType">
            <el-option
              v-for="item in id_type"
              :key='item.id'
              :label='item.text'
              :value='item.id'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="idNumber" :label-width="formLabelWidth">
          <el-input v-model="dialogEditData.idNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="dialogEditData.email"></el-input>
        </el-form-item>
        <el-form-item label="员工ID" :label-width="formLabelWidth">
          <el-input v-model="dialogEditData.workId"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="dialogEditData.department"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="dialogEditData.position"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editPerson()">确 认</el-button>
      </div>
    </el-dialog>
    <!--删除确认-->
    <el-dialog title="确认操作" :visible.sync="dialogDeletePerson" size='tiny'>
      <span class="spanBlock">您确定要删除该用户？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeletePerson = false">取 消</el-button>
        <el-button type="primary" @click="deletePerson(deletePersonInfo)">确 定</el-button>
      </span>
    </el-dialog>
    <!---->
  </div>
</template>

<script>
import pService from '@/service/participator';
import companyService from '@/service/company';
import validate from '@/utils/validation';
import { ID_TYPE, PAGINATION_SIZE, PAGINATION_SIZES, PAGINATION_LAYOUT } from '@/data/constants';


export default {
  name: 'option-participator',
  created() {
    this.initData();
  },
  data() {
    return {
      pagination: {
        layout: PAGINATION_LAYOUT,
        pageSize: PAGINATION_SIZE,
        pageSizes: PAGINATION_SIZES,
        currentPage: 1,
        totalNum: 0,
      },
      searchMsg: {
        companyId: undefined, // 公司id
        inputMsg: undefined, // 输入框信息
      },
      dialogAddPerson: false,
      dialogEditPerson: false,
      dialogDeletePerson: false,
      deletePersonInfo: [],
      formLabelWidth: '120px',
      account: [], // table数据展示
      dialogEditData: [], // 编辑弹出框信息
      person: {
        // companyId: undefined, // 公司id
        username: undefined, // 参与方
        idType: '0', // 证件类型
        idNumber: undefined, // 证件号
        email: undefined, // 邮箱
        workId: undefined, // 员工ID
        department: undefined, // 部门
        position: undefined, // 职位
        sentEmail: undefined, // 是否发送邮件邀请
      },
      id_type: ID_TYPE,
      rules: {
        username: [
          { required: true, message: '参与方名称不能为空', trigger: 'blur' },
        ],
        idNumber: [
          { required: true, validator: this.validIDCard, trigger: 'blur' },
        ],
        email: [
          { required: true, validator: this.validateEmail, trigger: 'blur,change' },
        ],
      },
      invitationInfo: {
        id: undefined,
        companyId: undefined,
      },
    };
  },
  methods: {
    // 初始化数据
    initData() {
      // companyId
      this.searchMsg.companyId = companyService.getStoredCompany().companyInfo.companyId;
      this.pageTag = this.$route.params.page;
      if (this.$route.params.page) {
        this.pagination.currentPage = this.pageTag;
      } else {
        this.pagination.currentPage = 1;
      }
      this.searchBtn(this.pagination.currentPage);
    },
    // 添加
    addPerson() {
      this.$refs.person.validate((valid) => {
        if (valid) {
          pService.addParticipator(this.person).then(() => {
            // this.$message({ message: '添加成功', type: 'success' });
            this.$refs.person.resetFields();
            this.dialogAddPerson = false;
            this.searchBtn(1);
          });
        } else {
          this.$message.error('填写信息有误');
        }
      });
    },
    // 编辑
    editPerson() {
      this.$refs.dialogEditData.validate((valid) => {
        if (valid) {
          this.dialogEditData.companyId = companyService.getStoredCompany().companyList.companyId;
          pService.updateParticipator(this.dialogEditData).then(() => {
            this.$message({ message: '编辑成功', type: 'success' });
            this.dialogEditPerson = false;
            this.searchBtn(this.pagination.currentPage);
          });
        } else {
          this.$message.error('填写信息有误');
        }
      });
    },
    // 删除
    deletePerson(command) {
      pService.deleteParticipator(command.id).then(() => {
        this.dialogDeletePerson = false;
        this.account.splice(command.index, 1);
        this.$message({ message: '删除成功', type: 'success' });
        this.searchBtn(this.pagination.currentPage);
      }, () => {
        this.$message.error('删除失败');
      });
    },
    // 关闭表单，清空数据
    cleanContent(done) {
      this.$refs.person.resetFields();
      // this.$nextTick(() => { this.$refs.person.resetFields(); });
      done();
    },
    // 分页
    handleSizeChange() {
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.searchBtn(val);
    },
    // 查询
    searchBtn(pageIndex) {
      if (!this.searchMsg.inputMsg) {
        this.searchMsg.inputMsg = undefined;
      }
      pService.findAllParticipators(this.searchMsg.companyId,
      this.searchMsg.inputMsg, pageIndex, this.pagination.pageSize)
      .then((resp) => {
        this.account = resp.data;
        this.pagination.totalNum = resp.pagination.totalNum;
        this.pagination.currentPage = resp.pagination.currentPage;
      });
    },
    // 发送邮件邀请
    sendEmail(command) {
      this.invitationInfo.id = command.id;
      this.invitationInfo.companyId = this.searchMsg.companyId;
      pService.sendEmail(this.invitationInfo).then(() => {
        this.$message({ message: '邀请邮件已发送', type: 'success' });
        this.searchBtn(this.pagination.currentPage);
      }, () => {
        this.$message.error('邀请邮件发送失败，请重新邀请');
      });
    },
    // 操作
    handleCommand(scope, index) {
      const name = event.target.id;
      const command = scope.row;
      switch (name) {
        case 'edit':
          this.dialogEditPerson = true;
          this.dialogEditData = { ...command };
          break;
        case 'invitation':
          this.data = { ...command };
          this.sendEmail(this.data);
          break;
        // case 'permissionCheck':
        //   this.$router.push({
        //   name: 'OptionPermission',
        //   params: { id: command.id, type: 'check', page: this.pagination.currentPage }
        //  });
        //   break;
        case 'permissionSet':
          this.account = command;
          this.$router.push({ name: 'OptionPermission', params: { id: command.id, type: 'edit', page: this.pagination.currentPage } });
          break;
        case 'delete':
          this.dialogDeletePerson = true;
          this.deletePersonInfo = command;
          this.deletePersonInfo.index = index;
          break;
        default:
          break;
      }
    },
    // 身份证验证
    validIDCard(rule, value, callback) {
      const isIDNOAvailableResult = validate.isIDNOAvailable(value);
      const isPassportAvailableResult = validate.isPassportAvailable(value);
      switch (this.person.idType) {
        case '0':
          if (isIDNOAvailableResult !== 'ok') {
            callback(new Error(isIDNOAvailableResult));
          } else {
            callback();
          }
          break;
        case '1':
          if (isPassportAvailableResult !== 'ok') {
            callback(new Error(isPassportAvailableResult));
          } else {
            callback();
          }
          break;
        default:
          break;
      }
    },
    // 邮箱验证
    validateEmail(rule, value, callback) {
      const result = validate.isEmailAvailable(value);
      if (result !== 'ok') {
        callback(new Error(result));
      } else {
        callback();
      }
    },
    // 批量导入 暂且不做
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.option-cont{margin:20px 0 0;}*/
.option-list{min-height:500px;padding:30px 30px 0 30px;}
.main-title .title{float:left;display: inline;font-size: 16px;color: #666666;letter-spacing:1px;font-weight:bold;line-height:36px;}
.main-title .addbtn{float:right;display: inline;font-size: 14px;color: #FFFFFF;letter-spacing: 1px;margin: 0 5px;border-radius: 2px;}
.table-wrap{margin:20px 0 0;}
.el-dropdown-menu {
    margin: 5px 0;
    border: 1px solid #d1dbe5;
    box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.12);
    padding: 6px 0;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100px;
    background-color: #fff;
    font-size: 12px;
}
.el-dropdown-menu__item {
    list-style: none;
    line-height: 36px;
    padding: 0 10px;
    margin: 0;
    cursor: pointer;
}
.el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #e4e8f1;
    color: #48576a;
}
.page-con {
  text-align: center;
  padding: 30px 0px;
}
.spanBlock{
  padding: 1px 0px 30px;
  display: inline-block;
}
</style>
