<template>
	<view class="home">
		<navbar></navbar>
		<tab :list="tabList" @tab="tab"></tab>
		<view class="scroll">
			<scroll-view class="list-scroll" scroll-y>
				<view>
					<view v-for="item in 100">
						{{item}} 内容
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				tabList:[],
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			tab(data,index){
				console.log(data,index)
			},
			//调用云函数
			getLabel(){
				this.$api.getlabel({
					name:'getlabel'
				}).then((res)=>{
					console.log(res)
					const {data} = res
					this.tabList =data
				})
			}
		
		
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
	}
	.home  {
		display: flex;
		flex-direction: column;
		flex: 1;
		.scroll{
			flex:1;
			overflow:hidden;
			box-sizing: border-box;
			.list-scroll{
				height: 100%;
				display: flex;
				flex-direction: column;
			}
		}
	}
</style>
