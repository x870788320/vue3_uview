<template>
	<view class = 'setting'>
		<view class = 'settingItem' v-for="item in mainApplyList" @click="handleMainSet(item)">
			<img class="settingItemImg" :src="`/static/icon/${item.icon}.png`" alt="">
			<text class = 'settingItemMsg'>{{item.title}}</text>
		</view>
		<!-- <uni-web-view :src="pdfUrl"></uni-web-view> -->
		<view  v-if = 'state.settingType == 6'>
			<web-view :src="pdfUrl"></web-view>
			<!-- <showFile :posFileSrc = 'pdfUrl'></showFile>> -->
		</view>
		<view v-if = 'false'>
			<my_sign ref = 'mySign'></my_sign>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/user.js'
	
	// 数据
	const store = useStore()
	const state = reactive({
		settingType: 1,
		preFileSrc: 'http://mowenxiaosheng.com.cn/open_office/?src=',
	  
	})
	const mySign = ref()
	// 主要显示列表
	const mainApplyList = [
		// {id: 1, title: '版本升级', icon: 'icon-setting-up'},
		// {id: 2, title: '密码管理', icon: 'icon-setting-pwd'},
		{id: 3, title: '修改人脸', icon: 'icon-setting-face'},
		{id: 4, title: '二维码', icon: 'icon-setting-scan'},
		{id: 5, title: '签名设置', icon: 'icon-setting-sign'},
		{id: 6, title: '操作手册', icon: 'icon-setting-pwd'},
	]
	
	let pdfUrl = 'http://221.214.164.186:18880/%E6%81%92%E9%80%9A%E7%89%A9%E6%B5%81%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E7%94%A8%E6%88%B7%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.pdf'
	// let pdfUrl = 'http://221.214.164.186:18880/恒通物流股份有限公司安全管理平台用户操作手册.pdf'
	
	// 方法
	const handleMainSet = async obj => {
		console.log(obj)
		state.settingType = obj.id
		if(obj.id == 5){
			console.log(mySign)
			console.log(mySign.value.signDown)
			let path = await mySign.value.signDown().then(res => res)
			// let path = await mySign.value.signClear().then(res => res)
			// console.log(path)
		}
		if(obj.id == 6){
			// uni.downloadFile({
			// 	// url: `http://221.214.164.186:18880/%E6%81%92%E9%80%9A%E7%89%A9%E6%B5%81%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E7%94%A8%E6%88%B7%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.pdf`,
			// 	url: `http://static.shanhuxueyuan.com/test.pdf`,
				
			// 	success: function(res) {
			// 		let filePath = res.tempFilePath;
			// 		console.log(filePath)
			// 		console.log(11111)
					
			// 		setTimeout(
			// 			() =>{
			// 				console.log(33333)
			// 				uni.openDocument({
			// 					// filePath: encodeURI(filePath),
			// 					filePath: filePath,
			// 					fileType: 'pdf',
			// 					// showMenu: false,
			// 					success: function () {
			// 					  console.log("打开文档成功");
			// 					},
			// 					fail: function (e) {
			// 						console.log(e)
			// 					}
			// 				})
			// 			},
			// 			1000
			// 		)
			// 	}
			// });
		}
		
	}
	store.updateUserInfo()
</script>

<style lang="scss">
	.setting{
		padding: 32rpx;
		// background-color: #F2F3F8;
		
		.settingItem{
			height: 112rpx;
			display: flex;
			align-items: center;
			background-color: #fff;
			margin-top: 32rpx;
			border-radius: 16rpx;
			
			.settingItemImg{
				width: 32rpx;
				height: 34rpx;
				margin-left: 32rpx;
			}
			
			.settingItemMsg{
				flex: 1;
				color: #0F1115;
				font-weight: 500;
				margin-left: 36rpx;
			}
		}
	}
</style>