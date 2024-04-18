<template>
	
	
	<u-popup :show="state.userListShow" @close="state.userListShow = false" @open="open">
		
			<!-- <view class="custom-navbar" style="border-bottom: 1rpx solid #E5E5E5;padding:24rpx 0 32rpx; text-align: center;">
				<view class = 'title'></view>
				
			</view>
			<view class="userListTop"></view> -->
	<view class="userList" id = 'userList' v-show = 'state.userListShow'>
			<view class="userListTop"></view>
		<u-index-list :index-list="state.indexList" :customNavHeight='200'>
			<template v-for="(item, index) in state.itemArr">
				<!-- #ifdef APP-NVUE -->
				<u-index-anchor :text="state.indexList[index]"></u-index-anchor>
				<!-- #endif -->
				
				<u-index-item>
					<!-- #ifndef APP-NVUE -->
					<u-index-anchor :text="state.indexList[index]"></u-index-anchor>
					<!-- #endif -->
					<view class="list-cell" v-for="(cell, index) in item" @click="handleUser(cell)">
						{{cell}}
					</view>
				</u-index-item>
			</template>
		</u-index-list>
	</view>
		</u-popup>
		
</template>

<script setup>
	import { ref, onMounted, reactive, computed, defineExpose } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	
	// 数据
	const store = useStore()
	const state = reactive({
		userListShow: false,
		indexList: ["A", "B", "C"],
		itemArr: [
			['列表A1','列表A2','列表A3'],
			['列表B1','列表B2','列表B3'],
			['列表C1','列表C2','列表C3']
		],
		
		// indexList: ["A", "B", "C", "D", "E", "F","G", "H", "I","J", "K", "L","M", "N", "O",],
		// itemArr: [
		// 	['列表A1','列表A2','列表A3'],
		// 	['列表B1','列表B2','列表B3'],
		// 	['列表C1','列表C2','列表C3'],
		// 	['列表C1','列表C2','列表C3'],
		// 	['列表C1','列表C2','列表C3'],
		// 	['列表C1','列表C2','列表C3'],
		// 	['列表C1','列表C2','列表C3'],
		// 	['列表C1','列表C2','列表C3'],
		// 	['列表C1','列表C2','列表C3'],
		// 	['列表C1','列表C2','列表C3'],
		// 	['列表C1','列表C2','列表C3'],
		// 	['列表C1','列表C2','列表C3'],
		// 	['列表C1','列表C2','列表C3'],
		// 	['列表C1','列表C2','列表C3'],
		// 	['列表C1','列表C2','列表C3'],
		// ]
	  
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
	const handleUserList = config => {
		console.log(config)
		console.log(1111111)
		state.userListShow = !state.userListShow
		
	}
	
	const handleUser = obj => {
		state.userListShow = false
	}
	
	const open = () => {
		console.log(222211)
	}
	

    //父组件可以获取到这个方法
    defineExpose({ handleUserList })
</script>


<style lang="scss" scoped>
	.userList{
		// position: fixed;
		// width: 100%;
		// height: 100%;
		// top: 0;
		// background-color: #f00;
		// z-index: 1000;
		// transition: top 2s;
	}
	.userListTop{
		height: 200rpx;
		// position: fixed;
		// top: 0;
		// z-index: 10000;
	}
	.userListShow{
		top: 0;
	}
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
</style>