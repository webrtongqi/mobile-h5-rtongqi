<template>
	<section id="feedList">
		<div class="feed" v-for="(feedLists,index) in feedList" v-if="feedLists.feedType==2" :class="{night:feedLists.themeInfo.backgroundType==2?true:false}">
		   	<div class="feed-top one_line">
		    	<img :src="imgHref(feedLists.themeInfo.themeTopPic,750)" />
		    	<span>{{feedLists.themeInfo.themeName}}</span>
		    </div>
		    <ul class="feed-ul">
			    <FeedList v-for="(bidsLists,index) in feedLists.themeInfo.bidsList"
			    :bidsLists="bidsLists">
			    </FeedList>
		   </ul>
		   <div class="more"  page="1" v-if="feedLists.themeInfo.bidTotal-feedLists.themeInfo.bidsList.length==0?false:true" @click="loadData(feedLists.themeInfo.themeId,index,$event)">查看更多({{feedLists.themeInfo.bidTotal-feedLists.themeInfo.bidsList.length}}件)</div>
	  	</div>
	  	<div class="feed" v-for="(feedLists,index) in feedList" v-if="feedLists.feedType==1">
		    <ul class="feed-ul">
			    <FeedList :bidsLists="feedLists.bidInfo"></FeedList>
		   </ul>
	  	</div>
  	</section>
</template>
<script>
import FeedList from './FeedList.vue'
 export default {
    data() {
      return {
      	url:"https://sapi.51kupai.com/mobile/images",
      };
    },
    components: {
		FeedList
    },
    props:['feedList'],
    methods: {
    	loadData(themeId,index,$event){
    		console.log($event)
    		var page = $event.target.getAttribute('page');
    		this.$axios({
			  	method: 'post',
			  	url: '/kupai/feed/getThemeBidList',
			  	data: {
			    	themeId:themeId,
			  		page:page
			  	}
			}).then(function(response) {
				if(response.data.status){
  				  this.feedList[index].themeInfo.bidsList = this.feedList[index].themeInfo.bidsList.concat(response.data.data.bidsList);
  				  $event.target.setAttribute('page',++page);
				}
			}.bind(this));
    	}
    },
    updated(){
    	
    }
  };
</script>
<style lang="scss" scoped>
@import '../../assets/scss/function';
 .feed{
	background: #FFFFFF;
	padding-bottom: 0.566666666rem;
	margin-top: 0.55555556rem;
	.more{
		font-size: rem(26);
		text-align: center;
		line-height: rem(60);
		color: #999999;
	}
	.feed-top{
		position: relative;
		img{
			width: 100%;
			height: rem(130);
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
		padding: 0 rem(24);
	}
}
.night{
	background: #222222;
}
#load{
	line-height: rem(80);
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