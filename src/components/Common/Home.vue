<template>
  <div class="Home">
    <NavBar></NavBar>
    <div class="content">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
export default {
  components: {
      NavBar
    }
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
      height: 100px;
      line-height: 100px;
      font-size: 40px;
      text-align: center;
    }
  }
</style>
