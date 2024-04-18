<template>
	<view class = 'tabbar'>
		<u-tabbar :active="store.activeTab" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
			<u-tabbar-item 
				v-for="(item) in tabbarItems" 
				:key="item.id" 
				class = 'tabbar_item_img_con'
				@click="handleTabbarItemClick(item)">
				
				<!-- :icon="getTabbarIcon(item)" -->
				
				<!-- :text="item.text" -->
					<!-- 	<image
							class="tabbar_item_img tabbar_item_img_active"
							slot="active-icon"
							:src="getTabbarIcon(item)"
							
								:class="store.activeTab == item.id? tabbar_item_img_active: tabbar_item_img"
						></image> -->
						<!-- <view class = 'tabbar_item_img_con'> -->
						
							<image
								:class="store.activeTab == item.id? 'tabbar_item_img_active': 'tabbar_item_img'"
								slot="inactive-icon"
								:src="getTabbarIcon(item)"
							></image>
					<!-- 		<image
								class="tabbar_item_img_active"
								slot="active-icon"
								:src="item.selectedIconPath"
							></image>
							<image
								class="tabbar_item_img"
								slot="inactive-icon"
								:src="item.iconPath"
							></image> -->
							<text 
								slot="text" 
								class="tabbar_item_text"
								:style="{
									marginTop: store.activeTab == item.id? '50rpx': '10rpx',
									color: store.activeTab == item.id? '#0F1115': '#626A74',
								}">
								{{item.text}}
							</text>
						<!-- </view> -->
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script setup>
	// import { ref, onMounted, reactive, computed } from 'vue'
	import {  reactive } from 'vue'
	//引入pinia仓库
	import useUserStore from '@/store/index.js'
	let store = useUserStore()
	
	const state = reactive({
	  name: '',
	  address: '',
	  coordinate: ''
	})

	// const activeTab = computed(() =>  store.activeTab)
	// console.log(activeTab)
	
	const tabbarItems = [
		{
			"id": 1,
			"pagePath": "/pages/task/task",
			"iconPath": "/static/icon/tabbar/icon-tabbar-task.png",
			"selectedIconPath": "/static/icon/tabbar/icon-tabbar-task-active.png",
			"text": "任务"
		},
		{
			"id": 2,
			"pagePath" : "/pages/know/know",
			"iconPath": "/static/icon/tabbar/icon-tabber-learn.png",
			"selectedIconPath": "/static/icon/tabbar/icon-tabbar-learn-active.png",
			"text": "应知应会"
		},
		{
			"id": 3,
			"pagePath" : "/pages/apply/apply",
			"iconPath": "/static/icon/tabbar/icon-tabbar-ap.png",
			"selectedIconPath": "/static/icon/tabbar/icon-tabbar-ap-active.png",
			"text": "应用"
		},
		{
			"id": 4,
			"pagePath" : "/pages/setting/setting",
			"iconPath": "/static/icon/tabbar/icon-tabbar-setting.png",
			"selectedIconPath": "/static/icon/tabbar/icon-tabbar-setting-active.png",
			"text": "设置"
		},
	]
	//点击tabbar按钮
	const handleTabbarItemClick = (item) => {
		console.log(33222)
		console.log(item.id)
		if (store.activeTab !== item.id) {
			//如果点击的是扫描按钮
			
			uni.hideTabBar({
				animation:false
			})
			// if (item.id === 1) {
			// 	//...... //根据详细需求书写代码
			// 	console.log(3333)
			// 	store.setActive(item.id)
			// 	uni.reLaunch({
			// 		url: item.pagePath
			// 	})
			// } else {
				store.setActive(item.id)
				const path = item.pagePath
				uni.switchTab({
					url: path
				})
			// }
		}
		console.log(store.activeTab)
	}
	//图标的切换
	const getTabbarIcon = (item) => {
		// console.log(item)
		return store.activeTab === item.id ? item.selectedIconPath : item.iconPath
	}
</script>


<style lang="scss">
	.tabbar_item_img{
		width: 40rpx;
		height: 40rpx;
	}
	.tabbar_item_img_active{
		width: 120rpx;
		height: 120rpx;
		position: absolute;
		left: 0rpx;
		right: 0rpx;
		top: -60rpx;
		margin: auto;
	}
	.tabbar_item_text{
		font-size: 16rpx;
		margin-top: 2rpx;
	}
	.tabbar_item_text_active{
		font-size: 16rpx;
		margin-top: 25rpx;
	}
	
</style>