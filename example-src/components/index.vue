<template>
    <div class="wrap">
    	<div class="item">
	        <scroller :data="listData1" class="scroller-wrap">
	            <template slot-scope="props">
	                <span v-text="props.item.txt"></span>
	            </template>
	        </scroller>
	        <div class="option">
	        	<span style="color:#3e76f6">默认值</span>
	        </div>
    	</div>
    	<div class="item">
	        <scroller :data="listData2" :option="{force:true}" class="scroller-wrap" key="s1">
	            <template slot-scope="props">
	                <span v-text="props.item.txt"></span>
	            </template>
	        </scroller>
	        <div class="option">
	        	<span style="color:#3e76f6">option{force:true}</span><span style="color:green"></span>
	        </div>
    	</div>
    	<div class="item">
	        <scroller :data="listData3" :option="{once:true}" class="scroller-wrap" key="s2">
	            <template slot-scope="props">
	                <span v-text="props.item.txt"></span>
	            </template>
	        </scroller>
	        <div class="option">
	        	<span style="color:#3e76f6">option{once:true}</span><span style="color:green"></span>
	        </div>
    	</div>
    	<div class="item">
	        <scroller :data="listData4" :option="{newFirst:true}" class="scroller-wrap" key="s3">
	            <template slot-scope="props">
	                <span v-text="props.item.txt"></span>
	            </template>
	        </scroller>
	        <div class="option">
	        	<span style="color:#3e76f6">option{newFirst:true}</span><span style="color:green"></span>
	        </div>
    	</div>
    </div>
</template>
<script type="text/javascript">
import scroller from '../../src/components/vue-infinite-auto-scroll';
let num = 0;
export default {
    data() {
        return {
            listData1: [],
            listData2: [],
            listData3: [],
            listData4: []
        }
    },
    components: {
        scroller
    },
    created() {
        this.creatData1();
        this.creatData2();
        this.creatData3();
        this.creatData4();
        this.run();
    },
    methods: {
        creatData1() {
            let self = this;
            for (let i = 0; i < 6; i++) {
                self.listData1.push({
                    txt: '这是第' + (i+1) + '行数据...'
                });
            }
        },
        creatData2() {
            let self = this;
            for (let i = 0; i < 6; i++) {
                self.listData2.push({
                    txt: '这是第' + (i+1) + '行数据...'
                });
            }
        },
        creatData3() {
            let self = this;
            for (let i = 0; i < 50; i++) {
                self.listData3.push({
                    txt: '这是第' + (i+1) + '行数据...'
                });
            }
        },
        creatData4() {
            let self = this;
            for (let i = 0; i < 12; i++) {
                self.listData4.push({
                    txt: '这是第' + (++num) + '行数据...'
                });
            }
        },
        run() {
            let self = this;
            setInterval(function() {
                self.listData4.push({
                    txt: '这是第' + (++num) + '行数据...'
                });
            }, 500);
        }
    }
}
</script>
<style lang="sass">
body,
html {
    margin: 0;
    padding: 0;
}
.wrap {
	width: 100%;
    float: left;
}

.item{
	width: 40%;
    height: 340px;
    margin: 5%;
    padding: 20px 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    float: left;
    box-sizing: border-box;
    .option{
    	line-height: 50px;
    	text-align: center;
    }
}

.scroller-wrap {
	height: 250px;
}

.scroller {
	display: flex;
	flex-direction: column;
	justify-content: center;
    width: 150px;
    min-height: 100%;
    margin: 0 auto;
}
</style>