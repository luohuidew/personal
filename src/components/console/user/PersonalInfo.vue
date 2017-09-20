<template>
  <div class="user-personal-info">
    <div class="head-pic-wrap">
      <img :src="headUrl" height="116" width="116" alt="头像">
      <div class="head-btn">修改头像</div>
    </div>
    <div class="base-info-wrap">
      <div class="row row1">
        <div class="in-row title">
          <span>基础信息</span>
        </div>
        <div class="in-row">
          <span>用户昵称</span>
          <span>沙枫</span>
          <span>编辑</span>
        </div>
        <div class="in-row">
          <span>绑定邮箱</span>
          <span>****@qq.com</span>
          <span>修改</span>
        </div>
        <div class="in-row">
          <span>绑定手机</span>
          <span>123****4454</span>
          <span>编辑</span>
        </div>
      </div>
      <div class="row row2">
        <div class="in-row title">
          <span>安全设置</span>
        </div>
        <div class="in-row">
          <span>实名认证</span>
          <span>沙枫</span>
          <span>编辑</span>
        </div>
        <div class="in-row">
          <span>签名管理</span>
          <span>****@qq.com</span>
          <span>修改</span>
        </div>
        <div class="in-row">
          <span>账号安全</span>
          <span>123****4454</span>
          <span>编辑</span>
        </div>
      </div>
      <div class="row row3">
        <p>*</p>
        <div>
          <p>接受期权授予协议，必须要完成实名认证才能顺利签字。</p>
          <p>实名认证审核时间约为1个工作日，请您合理安排认证时间，避免耽误签字。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filters from '../../../utils/filters';


export default {
  name: 'user-personal-info',
  created() {
  },
  data() {
    return {
      headUrl: '../../../../static/img/head-img.png',
    };
  },
  methods: {
  },
  filters: {
    filter(avg1, avg2) {
      return filters.constantsFilter(avg1, avg2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .user-personal-info {
    background: #fff;
    overflow: hidden;
  }

  .head-pic-wrap {
    float: left;
    width: 300px;
    margin-top: 70px;
    text-align: center;
  }

  .base-info-wrap {
    float: left;
    margin-top: 70px;
  }

  .head-pic-wrap img{
    border-radius:58px;
  }

  .head-btn {
    color: #546AAC;
    cursor: pointer;
  }

  .row1,.row2 {
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 20px;
  }

  .in-row {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #999;
    letter-spacing: .7px;
  }

  .in-row.title {
    font-weight: normal;
    font-size: 16px;
    color: #666;
    letter-spacing: .8px;
  }

  .in-row span {
    display: inline-block;
  }

  .in-row span:nth-child(1){
    width: 100px;
  }

  .in-row span:nth-child(2){
    width: 300px;
    color: #666;
  }

  .in-row span:nth-child(3){
    width: 100px;
    color: #546AAC;
    cursor: pointer;
  }

  .row3 {
    margin-top: 30px;
    margin-bottom: 200px;
  }

  .row3>p{
    width: 15px;
    color: red;
    float: left;
  }

  .row3>div{
    float: left;
    color: #999;
  }
</style>
