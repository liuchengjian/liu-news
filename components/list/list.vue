<template>
	<swiper class="home-swiper" @change="change" :current="activeIndex">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item" >
			<list-item :list="listCatchData[index]" :load="load[index]" @loadmore="loadmore"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name:"list",
		props:{
			tab:{
				type:Array,
				default:[]
			},
			activeIndex:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				list:[],
				listCatchData:{},
				load:{},
				pageSize:10
			}
		},
		//可以监听data,props值得变化
		watch:{
			tab(newVal,oldVal){
				if(newVal.length===0) return
				this.listCatchData = {}
				this.load={}
				this.getList(this.activeIndex)
			}
		},
		//onLoad 在页面里面，created在组件中
		created(){
			// this.getList(0)
		},
		methods:{
			loadmore(){
				if(this.load[this.activeIndex].loading==='noMore')
				return
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
			change(e){
				const{current} = e.detail
				this.$emit('change',current)
			
				if(!this.listCatchData[current]||this.listCatchData[current].length===0){
					this.getList(current)
				}
			},
			getList(current){
				if(!this.load[current]){
					this.load[current]={
						page:1,
						loading:'loading'
					}
				}
				this.$api.get_list({
					name:this.tab[current].name,
					page:this.load[current].page,
					pageSize:this.pageSize
					}).then((res)=>{
					const{data} = res
					let oldLoad = {}
					console.log(this.load[current].loading)
					if(data.length===0){
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load,current,oldLoad)
						//强制渲染界面
						this.$forceUpdate()
						return
					}
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					//懒加载
					this.$set(this.listCatchData,current,oldList)
				})
			},
		}
	}
</script>

<style lang="scss">
	.home-swiper{
		height: 100%;
		.swiper-item{
			height: 100%;
			overflow: hidden;
			.list-scroll{
				height: 100%;
			}
		}
	}
	
</style>
