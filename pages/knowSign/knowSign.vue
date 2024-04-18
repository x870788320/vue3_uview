<template>
	<view class = 'knowSign'>
		<view class = 'knowSignTop'>
			<u-tabs
				:list="signStatusNav"
				lineWidth="40"
				lineHeight="4"
				:activeStyle="{
					color: '#303133',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}"
				:inactiveStyle="{
					color: '#606266',
					transform: 'scale(1)'
				}"
				itemStyle="padding-left: 30rpx; padding-right: 30rpx; height: 96rpx;"
				@click="changeSignStatus">
			</u-tabs>
			
			<view class = 'knowSignSearch'>
				<u-input v-model="state.SignSearch" 
					type="text" 
					border="true" 
					placeholder="请输入关键词搜索"
					custom-style="background: #F2F3F8" 
					@change = "knowSignChange"/>
			</view>
		</view>
		
		<view class = 'knowSignMain'>
			<view v-show = "state.signType == 1">
				<view v-for = "item in knowStore.resps">
					{{item.name}}
				</view>
			</view>
			<view v-show = "state.signType == 2">
				<view v-for = "item in knowStore.respsCreat">
					{{item.name}}
				</view>
			</view>
			<view v-show = "state.signType == 3" class = "knowSignMainPage">
				<view v-for = "item in knowStore.respsSign" class = "knowSignMainItem" @click="openResps(item)">
					<view class = "knowSignMainItemL">
						<img class = 'knowSignImg' src="/static/office/word.png" alt="">
					</view>
					<view  class = "knowSignMainItemR">
						<view class = "knowSignItemRT">{{item.letter.name}}</view>
						<view class = "knowSignItemRLine">
							<view>状态：</view>
							<view>{{item.signed == "是"? "签订人已签字": "签订人未签字"}}</view>
						</view>
						<view class = "knowSignItemRLine">
							<view>安全生产日期：</view>
							<view>{{item.letter.aim || "见附件"}}</view>
						</view>
						<view class = "knowSignItemRLine">
							<view>发布日期：</view>
							<!-- <view>{{formatDate(item.signDate) || ""}}</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	// import useStore from '@/store/index.js'
	import useKnowStore from '@/store/know.js'
	import { formatDate, openDocment } from '@/utils/index.js'
	
	// 数据
	const knowStore = useKnowStore()
	const state = reactive({
		signType: 1,
		SignSearch: '',
	  
	})
	// 主要显示列表
	const signStatusNav = [
		{id: 1, name: '安全生产责任制'},
		{id: 2, name: '目标责任书-发起人'},
		{id: 3, name: '目标责任书-签订人'}
	]
	
	// 获取数据
	const getInterData = async () => {
		
	}
	
	// 方法
	const changeSignStatus = async obj => {
		console.log(obj)
		const params = {
			page: 1,
			rows: 60,
			name: state.SignSearch || '',
			post: ''
		}
		state.signType = obj.id
		// 安全责任制
		if(obj.id == 1) {
			await knowStore.getSafeRespsData(params)
			console.log(knowStore.resps)
		}
		// 目标责任书-发起人
		if(obj.id == 2) {
			await knowStore.getRespCteatData(params)
			console.log(knowStore.respsCreat)
		}
		// 目标责任书-签订人
		if(obj.id == 3) {
			await knowStore.getRespSignData(params)
			console.log(knowStore.respsSign)
		}
	}
	// 第一次进来时
	changeSignStatus(signStatusNav[0])
	
	// 渲染页面
	const respRander = () => {
		
	} 
	
	// 搜索框
	const knowSignChange = obj => {
		console.log(obj)
	}
	
	const openResps = obj => {
		console.log(obj)
		openDocment(obj.letter.file)
	}
	
	// function openDocment(obj) {
	// 	if(!obj.letter.file) return
	// 	let url = `${BASE_FILE_URL}${obj.letter.file}`
	// 	let fileType = url.split('.').pop();   //去掉点 如下.doc=>doc
		
	// 	console.log(2222222)
	// 	console.log(fileType)
	// 	console.log(url)
	// 	console.log(fileType)
	// 	uni.downloadFile({
	// 		url: `${BASE_FILE_URL}${obj.file1}`,
	// 		success: function(res) {
	// 			let filePath = res.tempFilePath;
	// 			console.log(filePath)
	// 			setTimeout(
	// 				() =>{
	// 					console.log(33333)
	// 					uni.openDocument({
	// 						filePath: encodeURI(filePath),
	// 						fileType,
	// 						showMenu: false,
	// 						success: function () {
	// 						  console.log("打开文档成功");
	// 						},
	// 						fail: function (e) {
	// 						  console.log(e);
	// 						}
	// 					})
	// 				},
					  
	// 				1000
	// 			)
	// 		}
	// 	});
	// }
	
</script>

<style lang="scss">
	.knowSign{
		padding: 0 32rpx;
		background-color: #F2F3F8;
		// background-color: #f00;
		
		.knowSignTop{
			height: 212rpx;
			background-color: #fff;
			position: fixed;
			top: 0;
			
			.knowSignSearch{
				margin: 24rpx 32rpx;
				border-radius: 16rpx;
				overflow: hidden;
				
			}
		}
		
		.knowSignMain{
			// height: 600rpx;
			margin-top: 212rpx;
			// background-color: #ff0;
			
			.knowSignMainItem{
				// height: 200rpx;
				display: flex;
				background-color: #fff;
				margin: 24rpx 0;
				padding: 8rpx 0;
				
				.knowSignMainItemL{
					width: 200rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					
					.knowSignImg{
						width: 60%;
						height: 60%;
					}
				}
				
				.knowSignMainItemR{
					flex: 1;
					
					.knowSignItemRT{
						line-height: 56rpx;
						font-weight: 600;
					}
					
					.knowSignItemRLine{
						display: flex;
						line-height: 48rpx;
						font-size: 28rpx;
					}
				}
			}
		}
		
		// .applyWorkBase{
		// 	margin-top: 112rpx;
		// }
	}
</style>