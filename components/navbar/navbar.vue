<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!--状态栏-->
			<view :style="{height:statusBarHeight+'px'}"></view>
			<!--导航栏内容-->
			<view class="navbar-content" :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
				<view class="navbar-search">
					<view class="navbar-search-icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
						<!-- <text class="iconfont icon--search1"></text> -->
					</view>
					<view class="navbar-search-text">
						<text>{{'uni-app vue react'}}</text>
					</view>
				</view>
			</view>
		</view>
		<view :style="{height:navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		name:"navbar",
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight:45,
				windowWidth:375
			};
		},
		created() {
			//手机系统形象
			let info = uni.getSystemInfoSync()
			console.log(info)
			//设置状态栏高度
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// h5 app mp-alipay 条件编译 只在微信小程序中编译
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			console.log(menuButtonInfo);
			// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
			// #ifdef MP-ALIPAY
			this.statusBarHeight = 0
			// #endif
		} 
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';
	.navbar{
		.navbar-fixed{
			position: flexd;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: $mk-base-color;
			.navbar-content{
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 15px;
				height: 45px;
				box-sizing: border-box;
				.navbar-search{
					display: flex;
					align-items: center;
					height: 30px;
					width: 100%;
					border-radius: 30px;
					padding: 0 15px;
					background-color: #fff;
					.navbar-search-icon{
						// width: 10px;
						// height: 10px;
						// border: 1px red solid;
						margin-right: 5px;
					}
					.navbar-search-text{
						font-size: 12px;
						color: #999;
					}
				}
			}
		}
	}
</style>
