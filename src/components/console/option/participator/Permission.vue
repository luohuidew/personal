<template>
  <div class="option-container">
    <div class="option-head">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="head-menu"><span class="title">权限设置</span>
          <router-link class="return" :to="{ path: '/option/participator' }">&lt;返回</router-link>
        </div>
        </el-col>
      </el-row>
    </div>
    <div class="option-cont">
      <el-button class="addbtn clearfix" type="success" @click="Save()">保存修改</el-button>
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
                      <el-col :span="8"><el-switch v-model="rd.option" on-text="" off-text="" v-on:change="selectOne(rIndex, rdIndex)"></el-switch></el-col>
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
export default {
  name: '',
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
    };
  },
  created() {
  },
  methods: {
    Save() {
      const data = this.getThisPageData();
      console.log(data);
    },
    getThisPageData() {
      const ruleList = this.ruleList;
      const ruleLen = ruleList.length;
      const map = {};
      const accountPermissionList = [];
      for (let i = 0; i < ruleLen; i += 1) {
        map[ruleList[i].key] = ruleList[i].option;
        const ruleDetailedList = ruleList[i].ruleDetailedList;
        const ruleDetailedLen = ruleDetailedList.length;
        for (let j = 0; j < ruleDetailedLen; j += 1) {
          map[ruleDetailedList[j].key] = ruleDetailedList[j].option;
        }
      }
      accountPermissionList.push(JSON.stringify(map));
      return accountPermissionList.toString();
    },
    selectOne(rIndex) {
      const s = new RegExp('false', 'gi');
      const ruleDetailedList = this.ruleList[rIndex].ruleDetailedList;
      const ruleDetailedListJson = JSON.stringify(ruleDetailedList);
      const tureList = ruleDetailedListJson.match(s);
      if (!tureList) {
        this.ruleList[rIndex].option = true;
      } else {
        this.ruleList[rIndex].option = false;
      }
    },
    // dataProcessing(accountPermissionList) {
    //   const ruleList = this.ruleList;
    //   const ruleLen = ruleList.length;
    //   for (let i = 0; i < ruleLen; i += 1) {
    //     const ruleDetailedList = ruleList[i].ruleDetailedList;
    //     const ruleDetailedLen = ruleDetailedList.length;
    //     for (let j = 0; j < ruleDetailedLen; j += 1) {
    //       if (accountPermissionList.indexOf(ruleDetailedList[j].ruleId) !== -1) {
    //         ruleDetailedList[j].option = true;
    //       } else {
    //         ruleDetailedList[j].option = false;
    //       }
    //     }
    //     this.selectOne(i);
    //   }
    // },
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