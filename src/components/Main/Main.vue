<template>
  <div class="Main">
    <TimePicker @evs="evsent" ref="child" :message="time" :mes="parentMsg"></TimePicker>
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
  	 <CommonFend :feedList="feedList"></CommonFend>
  	 <mt-button class="button" size="large" type="danger" @click="openPickers">primary</mt-button>
  </div>
</template>
<script>
import TimePicker from '../Common/TimePicker.vue'
import CountDown from '../Common/CountDown.vue'
import CommonFend from '../Common/CommonFend.vue'
 export default {
    data() {
      return {
      	msg: document.body.offsetWidth,
      	picker:"",
      	time:new Date('2017-02-02'),
      	parentMsg:'',
      	feedList:[],
      	url:"https://sapi.51kupai.com/mobile/images",
      	hasNext:1,
      	loading:false,
      	page:1
      };
    },
    components: {
       TimePicker,
       CountDown,
       CommonFend
    },
    methods: {
    	request(){
    		if (!this.loading){
    			this.loading = true;
    			this.$axios.post('/kupai/h5/bidListByClassId', 
	    		this.$qs.stringify({
	    			classId:88,
	    			page:this.page,
	    			pageSize:6
	    		})
		    	).then(function (response) {
		    		if(response.data.data.feedList.length == 0){
		    			 this.hasNext = 0;
		    		}
		    	    this.feedList = response.data.data.feedList;
		    	    this.loading = false;
		    	}.bind(this));
    		}
    	},
    	evsent(data){
          this.picker = data;
          console.log(data)
    	},
    	openPickers(){
    		this.$refs.child.openPicker()
    	},
    },
    mounted(){
    	 var that = this;
	  	 window.addEventListener('resize', function(){
	  	 	that.msg = document.body.offsetWidth
	  	 }, false)
    	this.request();
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
</style>
