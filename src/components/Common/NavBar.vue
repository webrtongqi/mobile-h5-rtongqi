<template>
   <ul class="navBar clearfix" ref="elememt">
      <li>
      	 <router-link to="/Main">首页</router-link>
      </li>
      <li>
         <router-link to="/Classify">分类</router-link>
      </li>
      <li>
      	<router-link to="/Find">发现</router-link>
      </li>
      <li>
      	<router-link to="/Mine">我的</router-link>
      </li>
   </ul>
</template>

<script>
export default {
  
}
</script>
<style scoped lang="less">
   .navBar{
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    background: red;
	    li{
	      width: 25%;
	      float: left;
	      height: 150px;
	      line-height: 150px;
	      font-size: 50px;
	      text-align: center;
	    }
  }
</style>