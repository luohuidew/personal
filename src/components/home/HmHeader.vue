<template>
  <div class="header" id="header" v-bind:class="{ stack: noDefultHead }">
    <div class="headerwrap">
      <a class="login-link" href=""><img class="logo-img" id="imgsrc" :src="noDefultHead ? imgUrl2 : imgUrl" alt=""></a>
      <!-- <a class="login-link" href=""><img class="logo-img" id="imgsrc2" :src="imgUrl2" alt="" style="display:none"></a> -->
      <div class="header-menu">
        <ul>
          <li><router-link class="text-link" to="/">首页</router-link></li>
          <li><router-link class="text-link" to="/price_view">价格概览</router-link></li>
          <li><router-link class="yellow-btn" to="/apply">申请试用</router-link></li>
          <li><router-link class="grey-btn" to="/login">登录</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import logImgurl from '../../assets/index-logo.png';
import logImgurl2 from '../../assets/index-logo2.png';

export default {
  name: 'hm-header',
  created() {
    if (!this.$route.path.includes('price_view')) {
      this.winScroll();
    }
    // if (typeof this.noDefultHead === 'undefined') {
    //   this.winScroll();
    // }
  },
  props: ['noDefultHead'],
  data() {
    return {
      imgUrl: logImgurl,
      imgUrl2: logImgurl2,
      headtype: undefined,
    };
  },
  methods: {
    winScroll() {
      const that = this;
      window.onscroll = () => {
        const t = document.documentElement.scrollTop || document.body.scrollTop;
        const headDom = document.getElementById('header');
        const imgSrc = document.getElementById('imgsrc');
        if (t > 0 && !that.$route.path.includes('price_view')) {
          headDom.className = 'header stack';
          imgSrc.src = that.imgUrl2;
        } else if (t === 0 && !that.$route.path.includes('price_view')) {
          headDom.className = 'header';
          imgSrc.src = that.imgUrl;
        }
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{position:fixed;z-index:100;width:100%;}
.header:before{content:"";position:absolute;left:0;top:0;width:100%;height:100%;background:#fff;box-shadow:0 -4px 18px 10px rgba(0,0,0,0.25);opacity: 0;-webkit-transform:scale(0.9);transform:scale(0.9);transition: transform .2s ease,opacity .2s ease,-webkit-transform .2s ease;-webkit-transition:opacity .2s ease,-webkit-transform .2s ease;}
.header.stack:before{opacity:1;-webkit-transform:scale(1);transform:scale(1);transition: transform .2s ease,opacity .2s ease,-webkit-transform .2s ease;-webkit-transition:opacity .2s ease,-webkit-transform .2s ease;}
.headerwrap{padding:20px 15.6% 0;height:60px;position:relative;}
.login-link{float:left;display: inline-block;margin-top:-6px;}
.header-menu{float:right;display:inline-block;}
.header-menu li{position: relative;display: inline-block;vertical-align: middle;margin:0 20px;text-align:center;font-size:16px;}
.header-menu li.text-link{margin:0 30px;}
.header-menu a{color:#fff;}
.yellow-btn{width:120px;height:40px;line-height:40px;text-align:center;background: #FFCA57;border-radius: 4px;display: inline-block;zoom:1;}
.grey-btn{width:116px;height:36px;line-height:36px;text-align:center;border-radius: 4px;border: 2px solid #F2F2F2;display: inline-block;zoom:1;}
.header.stack a{color:#666;}
.header.stack .yellow-btn{color:#fff;}
.header.stack .grey-btn{color:#999;}
/* .header .logo-img{transition: opacity .3s ease;-webkit-transition: opacity 3s ease;}
.header.stack .logo-img{transition: opacity .3s ease;-webkit-transition: opacity 3s ease;} */
</style>
