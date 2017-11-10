<template>
  <div class="Main">
    <mt-datetime-picker
    ref="picker"
    type="date"
    @confirm="handleConfirm"
    :startDate="message"
    v-model="pickerValue"
    year-format="{value}"
  	month-format="{value}"
 	date-format="{value}">
  </mt-datetime-picker>
  <div>{{mes}}</div>
  </div>
</template>

<script>
 export default {
 	props: ['message',"mes"],
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
      	this.$emit("evs",this.pickerValue)
      }
    }
  };
</script>
<style scoped lang="less">
 
</style>
