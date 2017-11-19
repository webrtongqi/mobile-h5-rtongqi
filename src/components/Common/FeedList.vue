<template>
    <li class="feed-list">
	    <div class="institution one_line" v-if="isOrganization(bidsLists.bidGoods.supplier)">
	       <div class="organization-head">
		       <img :src="bidsLists.bidGoods.supplier.supplierPic" 
		       class="organization-head-img"
		       />
		       <img v-if="bidsLists.bidGoods.supplier.supplierIsBindSupplier==1?true:false" :src="url+'/teaset/blue-v.png'" class="approve" />
	       </div>
	      <span>{{bidsLists.bidGoods.supplier.supplierName}}</span>
	    </div>
	    <div class="feed-list-top">
	      	 <CountDown :data="bidsLists"></CountDown>
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
	     <div class="referrers clearfix" v-if="isOrganization(bidsLists.bidGoods.recommenduser)">
		    <div class="referrer-tops clearfix">
		       <img class="top-img" :src="bidsLists.bidGoods.recommenduser.recommendPic" 
		       onerror="javascript:this.src='https://sapi.51kupai.com/mobile/images/teaset/portrait.png'" />
		       <img v-if="isBindSupplier(bidsLists.bidGoods.recommenduser)?true:false" :src="isBindSupplier(bidsLists.bidGoods.recommenduser)" class="approve" />
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
	     <div class="price clearfix" v-if="bidsLists.bidStatus<3">
	      	<p style="color:#B28147">起拍价&yen;{{bidsLists.initialPrice}}</p>
	      	<p>保证金&yen;{{bidsLists.bailPrice}}</p>
	     </div>
	     <div class="price clearfix" v-else-if="bidsLists.bidStatus==3">
	      	<p style="color:#C4311D">当前价&yen;{{bidsLists.maxPrice}}</p>
	      	<p>起拍价&yen;{{bidsLists.initialPrice}}</p>
	     </div>
	     <div class="price clearfix" v-else>
	      	<p style="color:#C4311D">成交价&yen;{{formatMoney(bidsLists.dealPrice)}}</p>
	      	<p>最高出价&yen;{{formatMoney(bidsLists.maxPrice)}}</p>
	     </div>
    </li>
</template>
<script>
 import CountDown from './CountDown.vue'
 export default {
    data() {
      return {
      	url:"https://sapi.51kupai.com/mobile/images",
      };
    },
    components: {
		CountDown
    },
    props:['bidsLists'],
    methods: {
    	isOrganization(data){
    		if(JSON.stringify(data) != "{}"){
    			return true;
    		}else{
    			return false;
    		}
    	},
    	isBindSupplier(data){
    		if(data.isBindSupplier == 1){
				return this.url + "/teaset/blue-v.png";
			}else if(data.recommendAuthStatus == 1){
				return this.url + "/teaset/yellow-v.png";
			}else{
				return false;
			}
    	}
    }
  };
</script>
<style lang="scss" scoped>
@import '../../assets/scss/function';
.feed-list{
	margin-bottom: rem(20);
	border: 1px solid #efefef;
	.institution{
		padding: rem(20);
		span{
			font-size: 0.7222222rem;
			color: #999999;
		}
		.organization-head{
			width: rem(40);
			height: rem(40);
			position: relative;
			display: inline-block;
			margin-right: rem(5);
		}
		.organization-head-img{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.approve{
			width: rem(20);
			height: rem(20);
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
		    padding: 0.3rem 0 rem(17) 0.6666666667rem;
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
			height: rem(468);
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
		padding: rem(24);
		
		border-bottom: 1px solid #EFEFEF;
		.referrer-tops{
			position: relative;
		}
		.recommend-language{
			font-size: rem(38);
			color: #333;
			padding: rem(35) 0 rem(10) 0;
			position: relative;
			text-align: center;
			sup{
				font-size: rem(45);
				display: inline-block;
				top: 0;
			}
			span{
				width: 85%;
				display: inline-block;
			}
		}
		.top-img{
			width: rem(80);
			height: rem(80);
			border-radius: 50%;
			margin-right: rem(20);
			float: left;
		}
		.approve{
			width: rem(28);
			height: rem(28);
			position: absolute;
			left: rem(50);
			top: rem(50);
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
				width:rem(84);
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
		padding:rem(30) 0;
		p:nth-child(1){
			border-right: 1px solid #EFEFEF;
		}
		p{
			width: 50%;
			float: left;
			font-size: rem(30);
			color: #333;
			text-align: center;
			span{
				font-size: rem(30);
			}
		}
	}
}
.night{
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
</style>