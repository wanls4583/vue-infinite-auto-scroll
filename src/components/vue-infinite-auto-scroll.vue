<template>
    <div class="infinite-warp" :class="wrapClass">
        <ul class="scroller" :class="scrollerClass">
            <li v-for="item in listData">
                <slot :item="item"></slot>
            </li>
        </ul>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'scroller',
    data() {
        return {
            listData: [],
            copyData: [],
            dataLength: 0,
            store: []
        }
    },
    props: {
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        //force:默认为false（如果列表总高度小于容器将不进行循环滚动），当为true时，不论列表总高度为多少都将进行循环滚动
        //speed:滚动速度
        //once:是否只滚动一次
        option: {
            type: Object,
            default: () => {
              return {}
            }
        }
    },
    created(){
        //页面可能同时存在多个该组件
        window.scrollerCount = window.scrollerCount || 0;
        window.scrollerCount++;
        this.scrollerClass = 'scroller'+window.scrollerCount;
        this.wrapClass = 'infinite-warp'+window.scrollerCount;
        this.listData = this.data.slice(0,1);
        this.copyData = this.data.slice(1,this.data.length);
        this.dataLength = this.data.length;
        this.force = this.option.force || false;
        this.speed = this.option.speed || 1;
        this.once = this.option.once || false;
    },
    mounted(){
        this.scroll();
    },
    methods:{
        //开始滚动
        scroll(){
            let self = this;
            let wrap = document.querySelector('.'+self.wrapClass);
            let scroller = document.querySelector('.'+self.scrollerClass);
            if(!scroller)
                return;
            let translateY = self.getComputedTranslateY(scroller);
            let li = scroller.querySelectorAll('li');
            if(scroller.scrollHeight > Math.abs(translateY)+wrap.clientHeight){
                scroller.style = 'transform: translate3d(0px, '+(translateY-self.speed)+'px, 0px);';
            }else{ 
                let tmp = [];
                tmp = self.copyData.splice(0,2);
                //缓存数据
                if(self.store.length<1000){
                    self.store = self.store.concat(tmp);
                }
                //如果没有数据了则从缓存里取，以实现循环无限滚动
                if(!tmp.length && !self.once &&
                    (self.force || 
                        (!self.force && li.length && self.data.length*li[0].clientHeight > wrap.clientHeight))){
                    tmp = self.store.splice(0,2);
                    self.store = self.store.concat(tmp);
                }
                tmp.forEach(function(item){
                    self.$set(self.listData,self.listData.length,item);
                });
            }
            //删除顶部无用的dom，防止浏览器卡顿
            if(scroller && li.length){
                let liHieght = li[0].clientHeight;
                let delLenght = (Math.abs(translateY)/liHieght)>>0;
                if(delLenght>5){
                    self.listData.splice(0,delLenght);
                    scroller.style = 'transform: translate3d(0px, '+(translateY%liHieght)+'px, 0px);';
                }
            }
            window.requestAnimationFrame(function(){
                self.scroll();
            })
        },
        //获取计算后的translateY
        getComputedTranslateY: function(dom) {
            var startY = 0;
            var style = window.getComputedStyle ? window.getComputedStyle(dom, null) : null || dom.currentStyle;
            var matrix = style['transform'];
            if (matrix && matrix != 'none') {
                startY = Number(matrix.replace(/matrix\(|\)/g, '').split(',')[5]);
            }
            return startY;
        }
    },
    watch:{
        data: { 
            handler: function (val, oldVal) {  
                if(val.length>this.dataLength){
                    this.copyData = this.copyData.concat(val.slice(this.dataLength,val.length));
                }else if(val!=oldVal){
                    this.store = [];
                    this.copyData = [];
                }
                this.dataLength = val.length;
            },  
            deep: true
        }
    }
}

</script>
<style lang="scss" scoped>
    .infinite-warp{
        overflow: hidden;
    }
</style>
