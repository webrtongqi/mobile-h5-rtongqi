<template>
   <ul class="navBar clearfix" :style="{ width: msg + 'px' }">
      <li>
      	 <router-link to="/Main" class="nav">
      	 	<span>首页</span>
      	 </router-link>
      </li>
      <li>
         <router-link to="/Classify" class="nav">
         	<span>分类</span>
         </router-link>
      </li>
      <li>
      	<router-link to="/Find" class="nav">
      		<span>发现</span>
      	</router-link>
      </li>
      <li>
      	<router-link to="/Mine" class="nav">
      		<span>我的</span>
      	</router-link>
      </li>
   </ul>
</template>

<script>
export default {
  data () {
    return {
      msg: document.body.offsetWidth
    }
  },
  mounted(){
  	 var that = this;
  	 window.addEventListener('resize', function(){
  	 	that.msg = document.body.offsetWidth
  	 }, false)
  }
}
</script>
<style scoped lang="less">
	a:link,
	a:visited,
	a:hover,
	a:active {
	  text-decoration: none;
	  background: none;
	}
	a:focus {
	  outline: 0;
	}
   .navBar{
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    background:#fff;
	    margin: 0 auto;
	    z-index: 1000;
	    li{
	      width: 25%;
	      float: left;
	      height: 120/36rem;
	      line-height: 120/36rem;
	      font-size: 36/36rem;
	      text-align: center;
	      .nav{
	      	width: 100%;
	      	height: 100%;
	      	display: block;
	      }
	    }
  }
</style>