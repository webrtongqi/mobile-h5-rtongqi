<template>
  <div class="Main">
    <div class="auto"></div>
    <mt-header title="库拍" :style="{ width: msg + 'px' }">
	  <div slot="left">
	    <mt-button  icon="back"></mt-button>
	  </div>
  	  <mt-button icon="more" slot="right"></mt-button>
	</mt-header>
	<mt-swipe :auto="4000">
	  <mt-swipe-item>
	     <img src="//img.51kupai.com/pic/750-500-53470ab1e173cded4fb83daa462de11b/750">
	  </mt-swipe-item>
	  <mt-swipe-item>
	  	<img src="//img.51kupai.com/pic/750-500-0823764c90ca2de772bc6d259b5c3a98/750">
	  </mt-swipe-item>
	  <mt-swipe-item>
	  	 <img src="//img.51kupai.com/pic/750-500-e16de4572915d40f90bbe46444746690/750">
	  </mt-swipe-item>
	</mt-swipe>
     <CommonFend :feedList="feedList" @load="loading" :callback="requestData"></CommonFend>
  	 <mt-button class="button" size="large" type="danger" @click="openPickers">primary</mt-button>
  	 <TimePicker @evs="evsent" ref="child" :message="time" :mes="parentMsg"></TimePicker>
  </div>
</template>
<script>
import TimePicker from '../Common/TimePicker.vue'
import CommonFend from '../Common/CommonFend.vue'
export default {
    data() {
      return {
      	imgurl:this.$config.imgurl,
      	msg: document.body.offsetWidth,
      	picker:"",
      	time:new Date('2017-02-02'),
      	parentMsg:'',
      	feedList:[],
      	url:"https://sapi.51kupai.com/mobile/images",
      	load:{}
      };
    },
    components: {
       TimePicker,
       CommonFend
    },
    mounted(){
	  	this.setWidth();
  	},
    methods: {
    	setWidth(){
	    	 window.addEventListener('resize', function(){
		  	 	this.msg = document.body.offsetWidth
		  	 }.bind(this), false);
    	},
    	requestData(){
    		if (!this.load.loading){
    			this.load.loading = true;
		    	this.$axios({
				  	method: 'post',
				  	url: '/kupai/h5/bidListByClassId',
				  	data: {
				    	classId:64,
	    				page:this.load.page,
	    				pageSize:1
				  	}
				}).then(function(response) {
					if(response.data.status){
					   if(response.data.data.feedList.length == 0){
					   	  this.load.hasNext = 0;
					   }else{
					   	  this.feedList = this.feedList.concat(response.data.data.feedList);
					   }
					}
					this.load.loading = false;
				}.bind(this));
    		}
    	},
    	evsent(data){
          this.picker = data;
    	},
    	openPickers(){
    		this.$refs.child.openPicker()
    	},
    	loading(data){
    		this.load = data;
    	}
    },
  };
</script>
<style lang="scss" scoped>
	.button{
		margin-bottom: 100px;
	}
	.mint-header{
	 	background: #fff;
	 	color: #000;
	 	font-size: 18px;
	 	height: 50px;
	 	position: fixed;
	 	margin: 0 auto;
	 	top: 0;
	 	right: 0;
	 	left: 0;
	 	z-index: 1000;
	}
	 .mint-swipe{
	 	height: 200px;
	}
	.auto{
		height:50px;
	}
</style>
