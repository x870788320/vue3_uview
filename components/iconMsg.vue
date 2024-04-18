<template>
	<view class = 'setting'>
		<view class = 'settingItem' v-for="item in mainApplyList" @click="handleMainSet(item)">
			<img class="settingItemImg" :src="`/static/icon/${item.icon}.png`" alt="">
			<text class = 'settingItemMsg'>{{item.title}}</text>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	
	// 数据
	const store = useStore()
	const state = reactive({
	  // taskType: 1,
	  
	})
	// 主要显示列表
	const mainApplyList = [
		{id: 1, title: '版本升级', icon: 'icon-setting-up'},
		{id: 2, title: '密码管理', icon: 'icon-setting-pwd'},
		{id: 3, title: '修改人脸', icon: 'icon-setting-face'},
		{id: 4, title: '二维码', icon: 'icon-setting-scan'},
		{id: 5, title: '签名设置', icon: 'icon-setting-sign'},
	]
	
	// 方法
	const handleMainSet = obj => {
		console.log(obj)
		
	}
	
	// 初始化
	const iconMsgInit = config => {
		
	}
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