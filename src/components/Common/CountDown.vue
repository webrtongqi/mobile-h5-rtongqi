<template>
     <div class="countDown" :bidstatus="data.bidStatus">{{content}}</div>
</template>
<script>
  export default {
    data(){
        return {
            content:null,
        }
    },
    props:['data'],
    mounted () {
        this.countDown(this.data);
    },
    methods: {
        countDown(data){
            let bidStatus = data.bidStatus;
            let startTime = data.startTime;
            let leftEndTime = data.leftEndTime;
            let leftStartTime = data.leftStartTime;
            let endTime = data.endTime;
            if(bidStatus < 3){
                if(startTime == 0){
                    this.content = "即将开始";
                }else{
                    if(leftStartTime > 7200){
                        this.content = this.timeStamp(startTime,1) + " 开始";
                    }else if(leftStartTime < 7200 && leftStartTime != 0){
                        let that = this;
                        let timer = setInterval(function(){
                            leftStartTime--
                            if(leftStartTime < 0){
                                that.content = "热拍中";
                                clearInterval(timer);
                            }else{
                                that.content = "距开始:" +  that.getCountDown(leftStartTime);
                            }
                        },1000)
                    }else if(leftStartTime == 0){
                       this.content = "即将开始";
                    }
                }
            }else if(bidStatus == 3){
                if(endTime == 0){
                   this.content = "热拍中";
                }else{
                    if(leftEndTime != 0){
                       let that = this;
                       let timers = setInterval(function(){
                            leftEndTime -- ;
                            if(leftEndTime < 0){
                                that.content = "已结拍";
                                clearInterval(timers);
                            }else{
                                that.content = "距结束:" + that.getCountDown(leftEndTime);
                            }
                       },1000) 
                    }else{
                        this.content = "热拍中";
                    }
                }
            }else{
                if(endTime == 0){
                    this.content = "已结拍";
                }else{
                    this.content = this.timeStamp(endTime,0) + " 已结拍";
                }
            }
        },
        timeStamp(time,type){
            function addZero(m){
                return m<10?'0'+m:m
            }
            var d = new Date(time * 1000);
            var time = new Date();
            if(type == 1){
                if((d.getDate() - time.getDate() == 0) && (d.getMonth() - time.getMonth() == 0)){
                    return  "今天" + " " + (addZero(d.getHours())) + ":" + (addZero(d.getMinutes()));
                }else if((d.getDate() - time.getDate() == 1) && (d.getMonth() - time.getMonth() == 0)){
                    return  "明天" + " " + (addZero(d.getHours())) + ":" + (addZero(d.getMinutes()));
                }else{
                    return (d.getMonth() + 1) + "月" +(d.getDate()) + "日" + " " + (addZero(d.getHours())) + ":" + (addZero(d.getMinutes()));
                }
            }else{
                return  (d.getMonth() + 1) + "月" +(d.getDate()) + "日" + " " + (addZero(d.getHours())) + ":" + (addZero(d.getMinutes()));
            }
        },
        getCountDown(time){
            var day = (Math.floor(time/86400) > 0) ? Math.floor(time/86400) : "";
            var hour = (Math.floor(time/3600) > 0) ? Math.floor(time/3600) : "";
            var minute =(Math.floor((time/60) % 60) > 0) ? Math.floor((time/60) % 60): "";
            var sec = ((time % 60) > 0) ? (time % 60): "";
            if(day > 0){
                hour = Math.floor(time/3600) - day * 24==0?"":Math.floor(time/3600) - day * 24;
            }
            var days = day <= 0 ? '' : '天';
            var hours = hour <= 0?"":"时";
            var minutes = minute <= 0?"":"分";
            var secs = sec <= 0?"":"秒";
            return day + days + hour + hours + minute + minutes + sec + secs;
        }
    }
  }
</script>
<style lang="scss" scoped>
@import '../../assets/scss/function';
    .countDown {
        position: absolute;
        left: 0;
        top: 0.55555556rem;
        display: inline-block;
        height: 0;
        border-top: none;
        border-bottom: rem(50) #959595 solid;
        border-right: transparent 0.83333333rem solid;
        border-left: none;
        line-height: 1.38888889rem;
        padding-left: 0.27777778rem;
        padding-right: 0.27777778rem;
        color: #fff;
        font-size: 0.587rem;
    }
    .countDown[bidStatus="2"] {
        border-bottom: rem(50) #b28147 solid;
    }
    .countDown[bidStatus="3"] {
        border-bottom:rem(50) #c4311d solid;
    }
</style>