<template>
	<scroller :data="listData" :option="{force:true,newFirst:true,once:true}" class="scroller-wrap">
		<template slot-scope="props">
			<span v-text="props.item.txt"></span>
		</template>
	</scroller>
</template>
<script type="text/javascript">
	import scroller from '../../src/components/vue-infinite-auto-scroll';
	let num = 0;
	export default{
		data(){
			return{
				listData:[]
			}
		},
		components:{
			scroller
		},
		created(){
			let self = this;
			for(let i=0; i<10; i++){
				self.listData.push({
					txt: '这是第'+(++num)+'行数据'
				});
			}
			this.run();
		},
		methods:{
			run(){
				let self = this;
				setInterval(function(){
					self.listData.push({
						txt: '这是第'+(++num)+'行数据'
					});
				},500);
			}
		}
	}
</script>
<style lang="sass">
	.scroller-wrap{
		margin-top: 50px;
		height: 400px;
	}
	.scroller{
		width: 200px;
		margin: 0 auto;
	}
</style>