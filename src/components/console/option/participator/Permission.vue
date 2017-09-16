<template>
  <div class="option-container">
    <div class="option-head">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="head-menu">
            <span v-if="!isEdit" class="title">权限设置</span>
            <span v-else class="title">权限浏览</span>
            <router-link class="return" :to="{ path: '/option/participator' }">&lt;返回</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="option-cont">
      <el-button class="addbtn clearfix" type="success" @click="Save()" v-if="!isEdit">保存修改</el-button>
      <div class="option-list bgcolor">
        
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="formPanel">
              <div v-for="(r, rIndex) in ruleList">
                <div class="f-group form-title">{{r.ruleName}}</div>
                <form class="form-horizontal">
                  <div class="f-group" v-for="(rd, rdIndex) in r.ruleDetailedList">
                    <el-row :gutter="20">
                      <el-col :span="16"><span class="branch-title">{{rd.text}}</span></el-col>
                      <el-col :span="8"><el-switch v-model="rd.option" on-text="" off-text=""></el-switch></el-col>
                    </el-row>
                  </div>
                </form>
              </div>
            </div>
          </el-col>
        </el-row>
        <!---->
      </div>
    </div>
  </div>
</template>
<script>
import pService from '../../../../service/participator';

export default {
  name: 'OptionPermission',
  data() {
    return {
      ruleList: [
        {
          id: '0',
          ruleName: '权益管理',
          key: 'equity',
          option: false,
          ruleDetailedList: [
            {
              ruleId: '1-1',
              text: '权益管理',
              key: 'equity.dashboard',
              option: false,
            },
          ],
        }, {
          id: '1',
          ruleName: '期权管理',
          key: 'option',
          option: false,
          ruleDetailedList: [
            {
              ruleId: '2-1',
              text: '期权管理',
              key: 'option.management_list',
              option: false,
            }, {
              ruleId: '2-2',
              text: '激励计划',
              key: 'option.incentive_plan',
              option: false,
            }, {
              ruleId: '2-3',
              text: '持股平台',
              key: 'option.holding_platform',
              option: false,
            }, {
              ruleId: '2-4',
              text: '参与方',
              key: 'option.participator',
              option: false,
            },
          ],
        }, {
          id: '2',
          ruleName: '文档管理',
          key: 'doc',
          option: false,
          ruleDetailedList: [
            {
              ruleId: '3-1',
              text: '文档管理',
              key: 'doc.management_list',
              option: false,
            },
          ],
        }, {
          id: '3',
          ruleName: '账户管理',
          key: 'user',
          option: false,
          ruleDetailedList: [
            {
              ruleId: '4-1',
              text: '个人信息',
              key: 'user.personal_info',
              option: false,
            }, {
              ruleId: '4-2',
              text: '我的订单',
              key: 'user.my_order',
              option: false,
            }, {
              ruleId: '4-3',
              text: '企业列表',
              key: 'user.enterprise_list',
              option: false,
            },
          ],
        },
      ],
      permission: {
        licenseList: undefined,
      },
    };
  },
  created() {
    this.permission.userId = this.$route.params.id;
    this.typeTest = this.$route.params.type;
    pService.findOne(this.permission.userId).then((resp) => {
      // console.log(resp);
      this.licenseList = resp.licenseList;
      this.dataProcessing(this.licenseList);
    });
  },
  computed: {
    isEdit() {
      if (this.typeTest.indexOf('edit') === -1) {
        return true;
      }
      return false;
    },
  },
  methods: {
    Save() {
      this.permission.licenseList = this.getThisPageData();
      // console.log(this.permission);
      pService.update(this.permission).then(() => {
        this.$message({
          message: '权限设置成功',
          type: 'success',
        });
        // 之后增加跳回原页面
        this.$router.push({ name: 'OptionParticipator', params: { page: this.$route.params.page } });
      });
    },
    // 获取权限列表的值
    getThisPageData() {
      const ruleList = this.ruleList;
      const ruleLen = ruleList.length;
      const map = {};
      const licenseList = [];
      for (let i = 0; i < ruleLen; i += 1) {
        const optionStatus = this.ruleList[i].ruleDetailedList.map(item => item.option);
        if (optionStatus.indexOf(true) === -1) {
          this.ruleList[i].option = false;
        } else {
          this.ruleList[i].option = true;
        }
        map[ruleList[i].key] = ruleList[i].option;
        const ruleDetailedList = ruleList[i].ruleDetailedList;
        const ruleDetailedLen = ruleDetailedList.length;
        for (let j = 0; j < ruleDetailedLen; j += 1) {
          map[ruleDetailedList[j].key] = ruleDetailedList[j].option;
        }
      }
      licenseList.push(JSON.stringify(map));
      return licenseList.toString();
    },
    // 此处待完善
    dataProcessing(licenseList) {
      const datalist = JSON.parse(licenseList);
      this.ruleList[0].option = datalist.equity;
      this.ruleList[0].ruleDetailedList[0].option = datalist['equity.dashboard'];
      this.ruleList[1].option = datalist.option;
      this.ruleList[1].ruleDetailedList[0].option = datalist['option.management_list'];
      this.ruleList[1].ruleDetailedList[1].option = datalist['option.incentive_plan'];
      this.ruleList[1].ruleDetailedList[2].option = datalist['option.holding_platform'];
      this.ruleList[1].ruleDetailedList[3].option = datalist['option.participator'];
      this.ruleList[2].option = datalist.doc;
      this.ruleList[2].ruleDetailedList[0].option = datalist['doc.management_list'];
      this.ruleList[3].option = datalist.user;
      this.ruleList[3].ruleDetailedList[0].option = datalist['user.personal_info'];
      this.ruleList[3].ruleDetailedList[1].option = datalist['user.my_order'];
      this.ruleList[3].ruleDetailedList[2].option = datalist['user.enterprise_list'];
    },
  },
};
</script>
<style scoped>
.head-menu{background: #fff;min-height: 60px;margin:-20px -20px 0;text-align: center;position: relative;}
.head-menu .title{font-weight:bold;font-size: 16px;color: #666;letter-spacing: 1.97px;line-height: 60px;}
.head-menu .return{position: absolute;top:20px;left:20px;font-size: 14px;color: #999999;letter-spacing: 1.14px;line-height: 14px;}
.option-cont{margin:20px 0 0;}
.option-list{
  padding:50px 0 150px 30px;
  margin: 0 auto;
}
.addbtn{
  float: right;
  margin-right: 30px;
  margin-top: 20px;
}
.formPanel{
  margin: auto;
  width: 35%;
}
.f-group{
  padding: 5px;
  display: block;
}
.form-title{
  font-size: 16px;
  color: #666666;
  letter-spacing: 0.8px;
  line-height: 30px;
  /*height: 24px;*/
  position: relative;
}
.form-title::after{
  content: '';
  position: absolute;
  width: 3px;
  height: 15px;
  background-color: #696969 ;
  top:13px;
  left: -3px;
}
.branch-title{
  font-size: 14px;
  color: #999999;
  letter-spacing: 0.69px;
  height: 36px;
  display: block;
}
</style>