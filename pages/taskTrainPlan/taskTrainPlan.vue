<template>
	<view class = 'taskTranin'>
		<view class = 'taskTraninTop'>
			<u-input v-model="state.planSearch" 
				type="text" 
				border="true" 
				placeholder="请输入关键词搜索"
				custom-style="background: #F2F3F8" 
				@change = "trainChange"/>
		</view>
		<view class = 'taskTrainList'>
			<view class = 'taskTrainItem' v-for = 'item in state.planShowInfo' @click="openPlanContent(item)">
				<view  class = 'taskTrainItemTitle'>
					<img class = 'taskTrainItemTitleImg' src="/static/icon/file.png" alt="">
					<text>{{item.name}}</text>
				</view>
				
				<view v-for = 'lineItem in planItemConfig' class = 'taskTrainItemLine box_ellipsis'>
					<view class = 'taskTrainItemLineL'>{{lineItem.name}}:</view>
					<view>{{item[lineItem.key]}}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestTaskPlanInfo, requestTaskPlanContent } from '@/interface/index.js'
	import { formatDate } from '@/utils/index.js'
	
	// 数据
	const store = useStore()
	const state = reactive({
	  // taskType: 1,
		planSearch: '',
		planInfo: [],
		planShowInfo: []
		
	})
	
	//培训的项配置
	const planItemConfig = [
		{ name: '培训时间', key: 'time' },
		{ name: '计划类型', key: 'planType' },
		{ name: '培训方式', key: 'fieldStr' },
		{ name: '培训类型', key: 'field1Str' },
		{ name: '发起部门', key: 'sysDeptName' },
		{ name: '授课人', key: 'field3' },
		{ name: '培训进度', key: 'status' },
	]
	// 获取线上数据
	const getPlanInfo = async () => {
		let params = {
			page:1,
			size:100,
			// name:state.traninSearch
			name:''
		}
		const interPlanInfo = await requestTaskPlanInfo(params).then(r => r).catch(e => {})
		
		if(!interPlanInfo.data || !interPlanInfo.data.t) {
			return
		}
		let content = interPlanInfo.data.t.content || []
		state.planInfo = content.map(item => {
			let startTArr = formatDate(item.startTime)
			let startTStr = `${startTArr[0]}-${startTArr[1]} ${startTArr[3]}`
			let endTArr = formatDate(item.startTime)
			let endTStr = `${endTArr[0]}-${endTArr[1]} ${endTArr[3]}`
			item.time = `${startTStr}~${endTStr}`
			return item
		})
		state.planShowInfo = state.planInfo
	}
	
	getPlanInfo()
	
	
	// 方法
	// 搜索
	const trainChange = e => {
		console.log('planSearch',state.planSearch)
		state.planShowInfo = state.planInfo.filter(item => item.name.includes(state.planSearch))
	}
	// 
	const openPlanContent = async obj => {
		console.log(obj)
		if(!obj.id) return
		// const planContent = await requestTaskPlanContent(obj.id).then(r => r).catch(e => {})
		// if(!planContent.data || !planContent.data.t) {
		// 	return
		// }
		
		// let content = planContent.data.t || []
		// console.log(content)
		
		obj.from = 'taskPlan'
		obj.title = '培训文件'
		obj.interface = 'requestPlanPaperInfo'
		uni.$u.route({
			url: '/pages/comDocLearn/comDocLearn',
			params: {
				config: JSON.stringify(obj)
			}
		})
	}
</script>

<style lang="scss">
	.taskTranin{
		padding: 32rpx;
		background-color: #F2F3F8;
		
		.taskTraninTop{
			
				margin: 0 32rpx;
				border-radius: 16rpx;
				overflow: hidden;
			
		}
		.taskTrainList{
			
			.taskTrainItem{
				margin-top: 32rpx;
				padding: 32rpx;
				background-color: #fff;
				border-radius: 24rpx;
				
				.taskTrainItemTitle{
					font-weight: 600;
					margin-bottom: 36rpx;
					.taskTrainItemTitleImg{
						width: 48rpx;
						height: 48rpx;
						vertical-align: middle;
						margin-right: 32rpx;
					}
				}
				.taskTrainItemLine{
					display: flex;
					line-height: 48rpx;
					font-size: 28rpx;
					
					.taskTrainItemLineL{
						width: 144rpx;
					}
				}
			}
		}
	}
</style>