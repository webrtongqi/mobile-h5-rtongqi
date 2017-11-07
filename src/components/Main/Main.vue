<template>
  <div class="Main">
    <mt-datetime-picker
    ref="picker"
    type="date"
    @confirm="handleConfirm"
    :startDate="startDate"
    v-model="pickerValue"
    year-format="{value}"
  	month-format="{value}"
 	date-format="{value}">
  </mt-datetime-picker>
  <mt-button class="button" size="large" type="danger" @click="openPicker">primary</mt-button>
  </div>
</template>

<script>
 export default {
    data() {
      return {
      	pickerValue:"",
      	startDate:new Date()
      };
    },
    methods: {
     openPicker() {
         this.$refs.picker.open();
      },
      handleConfirm(){
        console.log(this.pickerValue)
      }
    }
  };
</script>
<style scoped lang="less">
  .Main{
  	font-size: 40/36rem;
  }
  .button{
  	margin-top: 300/36rem;
  }
</style>
