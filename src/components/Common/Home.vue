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
  
</style>
