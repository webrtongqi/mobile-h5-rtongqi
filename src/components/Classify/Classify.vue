<template>
  <div class="Classify">
      {{msg}}
  </div>
</template>

<script>
import RSM from 'create-ecdh'
export default {
  data () {
    return {
      msg:"分类"
    }
  },
  mounted(){
   console.log(RSM.JSEncrypt())
  }
}
</script>
<style scoped lang="less">
  .Classify{
  	font-size: 40/36rem;
  }
</style>