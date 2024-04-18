<template>
	<view class = 'com_cell2' @click="handleEvent()">
		<view class = 'cell2L'>
			<view class = 'cell2LItem'>{{props.cellConfig.cellLT || ''}}</view>
			<view class = 'cell2LItem'>{{props.cellConfig.cellLB || ''}}</view>
		</view>
		<view class = 'cell2R'>
			<view class = 'cell2RT'>
				<text>审核人：</text>
				<text>{{props.cellConfig.clapRT || ''}}</text>
			</view>
			<view v-for = 'item in cellRNamesArr' class = 'cell2RItem'>
				<text>{{item.title}}:</text>
				<text>{{item.val}}</text>
			</view>
		</view>
		<view class = 'cell2RBlock'>{{props.cellConfig.status || ''}}</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed, defineEmits } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import { BASE_FILE_URL } from '@/interface/constant.js'
	
	//接收的参数
	const props = defineProps({
		cellConfig: {},
	})
	// console.log(props.cellConfig)
	// console.log('props.cellConfig')
	const cellRNamesArr = (props.cellConfig && props.cellConfig.cellRNames)? JSON.parse(props.cellConfig.cellRNames): []
	
	const emit = defineEmits(["handleEvent"])
	
	const state = reactive({
		imgPopShow: false,
		// cellRNames:[],
		// cellLImg: '/static/icon/top-bg.png',
	})
	
	
	const handleEvent = () => {
		console.log(2222222)
		// emit('handleEvent', props.cellConfig)
		emit('handleEvent')
	}
	//获取参数
	// const handleConfig = config => {
	// 	console.log(config)
	// 	state.cellRNames = config.cellRNames || []
	// 	state.cellLImg = config.cellLImg || '/static/icon/top-bg.png'
	// }
	// defineExpose({handleConfig})
</script>

<style  lang="scss">
	.com_cell2{
		display: flex;
		padding: 8rpx;
		position: relative;
		background-color: #fff;
		margin-bottom: 24rpx;
		
		.cell2L{
			width: 24%;
			// background-color: #ff0;
			font-size: 30rpx;
			padding: 16rpx;
			
			.cell2LItem{
				height: 50%;
			}
		}
		
		.cell2R{
			flex: 1;
			background-color: #E8F0FD;
			padding: 24rpx;
			font-size: 26rpx;
			border-radius: 16rpx;
			line-height: 48rpx;
			
			.cell2RT{
				font-size: 30rpx;
				color: #6295E4;
				font-weight: 600;
				line-height: 80rpx;
			}
			
		}
		
		.cell2RBlock{
			padding: 8rpx 20rpx;
			background-color: #f80;
			color: #fff;
			position: absolute;
			top: 36rpx;
			right: -12rpx;
			font-size: 26rpx;
			border-radius: 24rpx;
		}
		
	}
</style>