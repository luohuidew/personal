<template>
  <div class="header" id="header">
    <div class="headerwrap">
      <a class="login-link" href=""><img class="logo-img" id="imgsrc" :src="imgUrl" alt=""></a>
      <!-- <a class="login-link" href=""><img class="logo-img" id="imgsrc2" :src="imgUrl2" alt="" style="display:none"></a> -->
      <div class="header-menu">
        <ul>
          <li><a href="">首页</a></li>
          <li><a href="/home.html#/price_view">价格概览</a></li>
          <li><a class="yellow-btn" href="">申请试用</a></li>
          <li><a class="grey-btn" href="">登录</a></li>
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
    window.onscroll = () => {
      const t = document.documentElement.scrollTop || document.body.scrollTop;
      const headDom = document.getElementById('header');
      const imgSrc = document.getElementById('imgsrc');
      // const imgSrc2 = document.getElementById('imgsrc2');
      if (t > 0) {
        headDom.className = 'header stack';
        imgSrc.src = this.imgUrl2;
        // imgSrc.style.display = 'none';
        // imgSrc.style.opacity = 0;
        // imgSrc2.style.display = '';
        // imgSrc2.style.opacity = 1;
      } else {
        headDom.className = 'header';
        imgSrc.src = this.imgUrl;
        // imgSrc.style.display = '';
        // imgSrc.style.opacity = 1;
        // imgSrc2.style.display = 'none';
        // imgSrc2.style.opacity = 0;
      }
    };
  },
  prop: [''],
  data() {
    return {
      imgUrl: logImgurl,
      imgUrl2: logImgurl2,
    };
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
.header-menu li{position: relative;display: inline-block;vertical-align: middle;margin:0 20px;width:120px;text-align:center;font-size:16px;}
.header-menu a{color:#fff;}
.yellow-btn{width:120px;height:40px;line-height:40px;text-align:center;background: #FFCA57;border-radius: 4px;display: inline-block;zoom:1;}
.grey-btn{width:116px;height:36px;line-height:36px;text-align:center;border-radius: 4px;border: 2px solid #F2F2F2;display: inline-block;zoom:1;}
.header.stack a{color:#666;}
.header.stack .yellow-btn{color:#fff;}
.header.stack .grey-btn{color:#999;}
/* .header .logo-img{transition: opacity .3s ease;-webkit-transition: opacity 3s ease;}
.header.stack .logo-img{transition: opacity .3s ease;-webkit-transition: opacity 3s ease;} */
</style>
