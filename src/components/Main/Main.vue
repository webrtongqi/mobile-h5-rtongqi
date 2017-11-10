<template>
  <div class="Main">
    <TimePicker @evs="evsent" ref="child" :message="time" :mes="parentMsg"></TimePicker>
    <mt-header title="库拍">
	  <div slot="left">
	    <mt-button  icon="back"></mt-button>
	  </div>
  	  <mt-button icon="more" slot="right"></mt-button>
	</mt-header>
	<mt-swipe :auto="4000">
	  <mt-swipe-item>
	    <img src="//img.51kupai.com/pic/750-500-53470ab1e173cded4fb83daa462de11b/750"></mt-swipe-item>
	  <mt-swipe-item>
	  	<img src="//img.51kupai.com/pic/750-500-0823764c90ca2de772bc6d259b5c3a98/750">
	  </mt-swipe-item>
	  <mt-swipe-item>
	  	 <img src="//img.51kupai.com/pic/750-500-e16de4572915d40f90bbe46444746690/750">
	  </mt-swipe-item>
	</mt-swipe>
	<section id="feedList">
	 <div class="feed" v-for="(feedLists,index) in feedList" v-if="feedLists.feedType==2">
	   	<div class="feed-top one_line">
	    	<img :src="imgHref(feedLists.themeInfo.themeTopPic,750)" />
	    	<span>{{feedLists.themeInfo.themeName}}</span>
	    </div>
	    <ul class="feed-ul">
	        <li class="feed-list" v-for="(bidsLists,index) in feedLists.themeInfo.bidsList">
			    <div class="institution one_line" v-if="organization(bidsLists.bidGoods.supplier)">
			       <div class="organization-head">
				       <img :src="bidsLists.bidGoods.supplier.supplierPic" 
				       class="organization-head-img"
				       />
				       <img v-if="bidsLists.bidGoods.supplier.supplierIsBindSupplier==1?true:false" :src="url+'/teaset/blue-v.png'" class="approve" />
			       </div>
			      <span>{{bidsLists.bidGoods.supplier.supplierName}}</span>
			    </div>
			    <div class="feed-list-top" @click="skip(bidsLists)">
			      	<div class="status-time downTime">
			       		9月9日 16:07 已结拍
			      	</div>
				    <img :src="imgHref(bidsLists.bidGoods.pic,720)" 
				      class="auction-img" 
				      onerror="javascript:this.src='https://sapi.51kupai.com/mobile/images/teaset/default.png'" />
				    <span class="attention-num">{{bidsLists.browseNum}}人关注</span>
				    <div class="shade">
					    <p class="clearfix"></p>
					    <p class="brand-name one_line">{{bidsLists.bidGoods.goodsName}}</p>
					    <p class="location one_line" v-if="bidsLists.isOnoffline==2?true:false"><img src="https://sapi.51kupai.com/mobile/images/teaset/location.png" />&nbsp;<span>{{bidsLists.onofflineExt.location}}</span></p>
				    </div>
		     	</div>
			     <div class="referrers clearfix" v-if="organization(bidsLists.bidGoods.recommenduser)">
				    <div class="referrer-tops clearfix">
				       <img class="top-img" :src="bidsLists.bidGoods.recommenduser.recommendPic" 
				       onerror="javascript:this.src='https://sapi.51kupai.com/mobile/images/teaset/portrait.png'" />
				       <img v-if="approve(bidsLists.bidGoods.recommenduser)?true:false" :src="approve(bidsLists.bidGoods.recommenduser)" class="approve" />
				       <div class="name">
				        <p class="name-top clearfix">
				          <span class="maweidu">{{bidsLists.bidGoods.recommenduser.recommendName}}</span>
				          <img src="https://sapi.51kupai.com/mobile/images/teaset/tuijianren.png" 
				          class="referrer-label" />
				        </p>
				        <p class="curator">认证信息:{{bidsLists.bidGoods.recommenduser.recommendAuthText}}</p>
				       </div>
				    </div>
			      	<p class="recommend-language" v-if="bidsLists.bidGoods.recommenduser.recommendDesc?true:false"><b>“</b><span class="one_line">{{bidsLists.bidGoods.recommenduser.recommendDesc}}</span><b>”</b></p>
			     </div>
			     <div class="price clearfix">
			      	<p style="color:#C4311D">成交价&yen;2.00万</p>
			      	<p>最高出价&yen;2.01万</p>
			     </div>
		    </li>
	   </ul>
  	</div>
  	</section>
  <!--   <mt-button class="button" size="large" type="danger" @click="openPickers">primary</mt-button> -->
  </div>
</template>

<script>
import TimePicker from '../Common/TimePicker.vue'
 export default {
    data() {
      return {
      	picker:"",
      	time:new Date('2017-02-02'),
      	parentMsg:'',
      	feedList:[],
      	url:"https://sapi.51kupai.com/mobile/images",
      };
    },
    components: {
       TimePicker
    },
    methods: {
    	evsent(data){
          this.picker = data;
          alert(data)
    	},
    	openPickers(){
    		this.$refs.child.openPicker()
    	},
    	organization(data){
    		if(JSON.stringify(data) != "{}"){
    			return true;
    		}else{
    			return false;
    		}
    	},
    	approve(data){
    		if(data.isBindSupplier == 1){
				return this.url + "/teaset/blue-v.png";
			}else if(data.recommendAuthStatus == 1){
				return this.url + "/teaset/yellow-v.png";
			}else{
				return false;
			}
    	},
    	skip(data){
    		alert(data.saleId)
    	}
    },
    mounted(){
    	document.title= "首页"
    	this.$axios.post('/kupai/h5/bidListByClassId', 
    		this.$qs.stringify({
    			classId:85,
    			page:5,
    			pageSize:2
    		})
    	).then(function (response) {
    	    this.feedList = response.data.data.feedList
    	}.bind(this));

  	},

  };
</script>
<style scoped lang="less">
 section{
 	padding-bottom: 120/36rem;
  }
 .mint-header{
 	background: #fff;
 	color: #000;
 	font-size: 18px;
 	height: 50px;
 	position: fixed;
 	top: 0;
 	right: 0;
 	left: 0;
 	z-index: 1000;
 }
 .mint-swipe{
 	height: 200px;
 }
 .feed{
	background: #FFFFFF;
	padding-bottom: 0.566666666rem;
	margin-top: 0.55555556rem;
	.more{
		font-size: 26/36rem;
		text-align: center;
		line-height: 60/36rem;
		color: #999999;
	}
	.feed-top{
		position: relative;
		img{
			width: 100%;
			height: 130/36rem;
		}
		span{
			text-align: center;
		    position: absolute;
		    bottom: 0.55rem;
		    left: 0rem;
		    right: 0rem;
		    font-size: 0.72222222rem;
		    color: #666666;
		}
	}
	.feed-ul{
		padding: 0 24/36rem;
	}
	.feed-list{
		margin-bottom: 20/36rem;
		border: 1px solid #efefef;

		.institution{
			padding: 20/36rem;
			span{
				font-size: 0.7222222rem;
    			color: #999999;
			}
			.organization-head{
				width: 40/36rem;
				height: 40/36rem;
				position: relative;
				display: inline-block;
				margin-right: 5/36rem;
			}
			.organization-head-img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
			.approve{
				width: 20/36rem;
				height: 20/36rem;
				position: absolute;
				right: 0;
				bottom: 0;
			}
		}
		.feed-list-top{
			position: relative;
			background: url(https://sapi.51kupai.com/mobile/images/teaset/default.png);
			width: 100%;
    		height: 13rem;
    		background-size: 100% 100%;
			.icon-logo{
				position: absolute;
			    top: 0.56rem;
			    right: 0.56rem;
			    width: 3.307rem;
			    height: 3.307rem;
			}
			.shade{
				position: absolute;
			    bottom: 0;
			    width: 100%;
			    left: 0;
			    right: 0;
			    background: url(https://sapi.51kupai.com/mobile/images/teaset/shade.png);
			    padding: 0.3rem 0 17/36rem 0.6666666667rem;
			    p{
			    	width: 75%;
			    }
			    p:nth-chlid(1){
			    	height: 0.8888888889rem;
			    }
			    .Buy-back {
				   
				    width: 3.05555555556rem;
				    height: 0.8888888889rem;
				    background: url(https://sapi.51kupai.com/mobile/images/teaset/income.png);
				    background-size: 100% 100%;
				    float: left;
				    margin-right: 0.27777778rem;
				}
				.again {
				    width: 3.05555555556rem;
				    height: 0.8888888889rem;
				    background: url(https://sapi.51kupai.com/mobile/images/teaset/again.png);
				    background-size: 100% 100%;
				    float: left;
				   
				}
				.brand-name {
				    font-size: 0.83333333rem;
				    color: #FFFFFF;
				    margin-top: 0.2rem;
				   
				    
				}
				.location {
				    color: #ccc;
				    font-size: 0.6666667rem;
				     margin-top: 0.2rem;
					img {
					    height: 0.666667rem;
					    width: 0.527777rem;
					    margin-bottom: 0.1rem;
					}
					span {
					    font-size: 0.66667rem;
					    color: #ccc;
					}
				}
			}
			.auction-img{
				width: 100%;
				height: 468/36rem;
			}
			.attention-num {
			    position: absolute;
			    right: 0.61111111rem;
			    bottom: 0.45rem;
			    color: #FFFFFF;
			    font-size: 0.6666667rem;
			    z-index: 100;
			}
			.themeIcon{
				position: absolute;
			    right: 0.61111111rem;
			    bottom: 2rem;
			    width: 1.3888889rem;
			    height: 1.38888889rem;
			}
		}
		.referrers{
			padding: 24/36rem;
			
			border-bottom: 1px solid #EFEFEF;
			.referrer-tops{
				position: relative;
			}
			.recommend-language{
				font-size: 38/36rem;
				color: #333;
				padding: 35/36rem 0/36rem 10/36rem 0/36rem;
				position: relative;
				text-align: center;
				sup{
					font-size: 45/36rem;
					display: inline-block;
					top: 0;
				}
				span{
					width: 85%;
					display: inline-block;
				}
			}
			.top-img{
				width: 80/36rem;
				height: 80/36rem;
				border-radius: 50%;
				margin-right: 20/36rem;
				float: left;
			}
			.approve{
				width: 28/36rem;
				height: 28/36rem;
				position: absolute;
				left: 50/36rem;
				top: 50/36rem;
			}
			.name{
				float: left;
				width: 82%;
				.maweidu{
					font-size: 0.83333333rem;
				    color: #282828;
				    font-weight: 900;
				    margin-right: 0.27777778rem;
				}
				.referrer-label{
					width: 84/36rem;
					height: 100%;
				}
				.curator{
					margin-top: 0.44444444rem;
				    font-size: 0.72222222rem;
				    color: #999999;
				}
			}
		}
		.price{
			padding: 30/36rem 0;
			p:nth-child(1){
				border-right: 1px solid #EFEFEF;
			}
			p{
				width: 50%;
				float: left;
				font-size: 30/36rem;
				color: #333;
				text-align: center;
				span{
					font-size: 30/36rem;
				}
			}
		}
	}
}
.night{
	background: #222222;
	.feed-list{
		border:none;
		background: #333333;
		.referrers{
			border-bottom: 1px solid #4a4a4a;
			.recommend-language{
				color: #fff;
			}
			.name{
				.maweidu{
					color: #FFFFFF;
				}
			}
		}

		.price{
			p:nth-child(1){
				color: #FFFFFF;
				border-right: 1px solid #4a4a4a;
			}
			p:nth-child(2){
				color: #FFFFFF 
			}
		}
	}
	
}
.status-time {
    position: absolute;
    left: 0;
    top: 0.55555556rem;
    display: inline-block;
    height: 0;
    border-top: none;
    border-bottom: 50/36rem #959595 solid;
    border-right: transparent 0.83333333rem solid;
    border-left: none;
    line-height: 1.38888889rem;
    padding-left: 0.27777778rem;
    padding-right: 0.27777778rem;
    color: #fff;
    font-size: 0.587rem;
}
.status-time[bidStatus="2"] {
    border-bottom: 50/36rem #b28147 solid;
}
.status-time[bidStatus="3"] {
    border-bottom: 50/36rem #c4311d solid;
}
#load{
	line-height: 80/36rem;
	font-size: 0.75rem;
	text-align: center;
	display: none;
}
.loading {
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -0.8rem;
    margin-top: -0.8rem;
}
</style>
