<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons :type="like?'heart-filled':'heart'" size="20" color="#f07373" ></uni-icons>
	</view>
</template>

<script>
	export default {
		name:"likes",
		props:{
			item :{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				like:false
			};
		},
		watch:{
			item(newVal){
				this.like = this.item.is_like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		methods:{
			likeTap(){
				this.updateLikes()
			},
			updateLikes(){
				uni.showLoading()
				this.$api.update_like({
					article_id:this.item._id
				}).then((res)=>{
					this.like = !this.like
					uni.hideLoading()
					uni.showToast({
						title:this.like?'收藏成功':'取消收藏',
						icon:'none'
					})
					console.log(res)
				}).catch((err)=>{
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style>
	.icons{
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}				
</style>
