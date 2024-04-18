<template>
	<view class = 'applyRisk'>
		<view class = 'applyRiskTop'>
			<view @click="handlePicker('level')" class = 'applyRiskTopItem'>
				<text class = 'applyRiskTopItemT'>{{state.riskLevelVal}}</text>
				<u-icon name="arrow-down" color="#999" size="16"></u-icon>
			</view>
			<view @click="handleBranchList()" class = 'applyRiskTopItem'>
				<view class = 'applyRiskTopItemT'>{{state.riskBranchVal || ''}}</view>
				<u-icon name="arrow-down" color="#999" size="16"></u-icon>
			</view>
			<view @click="handlePicker('type')" class = 'applyRiskTopItem'>
				<text class = 'applyRiskTopItemT'>{{state.riskTypeVal}}</text>
				<u-icon name="arrow-down" color="#999" size="16"></u-icon>
			</view>
		</view>
		
		<u-picker :show="state.riskPickerShow" 
			:columns="currentList" 
			:closeOnClickOverlay='true'
			@close="state[`riskPickerShow`] = false"
			@cancel="state[`riskPickerShow`] = false"
			@confirm="riskPickerConfirm"></u-picker>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	
	// 数据
	const store = useStore()
	const state = reactive({
		riskLevelShow: false,
		riskTypeShow: false,
		riskPickerShow: false,
		riskLevelVal: '全部',
		riskTypeVal: '全部',
		riskBranchVal: '职能部门',
	})
	// 风险等级选择
	const riskLevelS = [
		['全部','一级','二级','三级','四级','五级']
	]
	// 风险类别选择
	const riskTypeS = [
		['全部','作业活动类','设备设施类']
	]
	// 当前的列表和选项
	let currentList = riskLevelS
	let curentItem = 'riskLevelVal'
	
	// 方法
	const handlePicker = str => {
		console.log(str)
		if(str == 'level') {
			currentList = riskLevelS
			curentItem = 'riskLevelVal'
		}
		if(str == 'type') {
			currentList = riskTypeS
			curentItem = 'riskTypeVal'
			
		}
		state.riskPickerShow = true
	}
	
	// 选择确认事件
	const riskPickerConfirm = (e, obj) => {
		console.log(e)
		console.log(obj)
		state.riskPickerShow = false
		
		state[curentItem] = e.value[0]
	}
	
	
	// 打开部门列表
	const handleBranchList = () => {
		// userListCom.value.handleUserList()
		
		
		uni.$u.route({
			url: "pages/comBranchList/comBranchList",
			animationDuration: 300,
			animationType: 'slide-in-bottom'
		})
	}
	
	
	onShow(() => {
		uni.$once('selectBranch',function(data){
			console.log('监听到事件来自返回的参数：' + data);
			// TODO 下面执行刷新的方法
			state.riskBranchVal = data.name
		})
	
	})
</script>

<style lang="scss">
	.applyRisk{
		padding: 32rpx;
		background-color: #F2F3F8;
		
		.applyRiskTop{
			height: 112rpx;
			display: flex;
			align-items: center;
			background-color: #fff;
			border-radius: 16rpx;
			background-color: #fff;
			
			.applyRiskTopItem{
				flex: 1;
				text-align: center;
				display: flex;
				justify-content: center;
				// padding: 0 24rpx;
				// margin-right: 8rpx;
				
				.applyRiskTopItemT{
					margin-right: 12rpx;
				}
			}
		}
	}
</style>