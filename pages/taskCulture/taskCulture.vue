<template>
	<view class = 'taskCulture'>
		<view v-for = 'item in state.mainCultrues' class = 'taskCulItem' @click="handleCulture(item)">
			<view class = 'taskCulItemRow'>
				<view>发布单位：</view>
				<view>{{item.dept1 || ''}}</view>
			</view>
			<view class = 'taskCulItemRow'>
				<view>发布时间：</view>
				<view>{{item.atTime || ''}}</view>
			</view>
			<view class = 'taskCulItemStatus'>{{item.read == '是'? '已读': '未读'}}</view>
		</view>
		
		<view class="comDocShow" v-if = 'state.fileShow'>
			<web-view ref='fileShowWeb' :src="state.culFileUrl"></web-view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestSaftCulInfo } from '@/interface/index.js'
	import { formatDate } from '@/utils/index.js'
	import { BASE_LINE_PRE, BASE_FILE_URL } from '@/interface/constant.js'
	
	// 数据
	//接收的参数
	const props = defineProps({
		config: '',
	})
	const porpsObj = props.config? JSON.parse(props.config) : {}
	const store = useStore()
	const state = reactive({
		mainCultrues: [],
		fileShow: false,
		culFileUrl: '',
	})
	
	// 获取线上数据
	const getInterInfo = async (navInfo) => {
		console.log(navInfo)
		// 一周前
		let beginTimeN = (new Date).getTime()-7*24*60*60*1000
		let beginArr = formatDate(beginTimeN)
		let endArr = formatDate()
		let params = {
			page:1,
			rows:100,
			size: 100,
			endTime:`${endArr[0]}-${endArr[1]}`,
			beginTime:`${beginArr[0]}-${beginArr[1]}`
		}
		let interInfo = interInfo = await requestSaftCulInfo(params).then(r => r).catch(e => {})
		
		
		if(!interInfo.data || !interInfo.data.t) {
			return
		}
		state.mainCultrues = interInfo.data.t.content || []
		
		console.log(state.mainCultrues)
	}
	
	
	// 方法
	const handleCulture = obj => {
		console.log(obj)
		console.log(`${BASE_LINE_PRE}${BASE_FILE_URL}${obj.file1}`)
		state.culFileUrl = `${BASE_LINE_PRE}${BASE_FILE_URL}${obj.file1}`
		state.fileShow = true
	}
	onShow(() => {
		getInterInfo()
		state.fileShow = false
	})
</script>

<style lang="scss">
	.taskCulture{
		padding: 32rpx;
		background-color: #F2F3F8;
		
		.taskCulItem{
			padding: 32rpx;
			background-color: #fff;
			margin: 24rpx 0;
			border-radius: 16rpx;
			position: relative;
			
			.taskCulItemRow{
				display: flex;
				line-height: 48rpx;
				
			}
			
			.taskCulItemStatus{
				padding: 12rpx 20rpx;
				background-color: #f80;
				border-radius: 24rpx;
				position: absolute;
				right: 32rpx;
				top: 32rpx;
				color: #fff;
				font-size: 28rpx;
			}
		}
		
	}
</style> 