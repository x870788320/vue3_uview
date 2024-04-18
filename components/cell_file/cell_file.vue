<template>
	<view class = 'com_file' @click="handleEvent()">
		<view class = 'com_fileL'>
			<img class = 'com_fileLImg' :src="`/static/office/${cellFileType}.png`" alt="">
		</view>
		<view class = 'com_fileR'>
			<view class = 'com_fileRT'>
				<text>{{props.cellConfig.cellTitle || ''}}</text>
			</view>
			<view v-for = 'item in cellRNamesArr' class = 'cell2RItem'>
				<text>{{item.title}}：</text>
				<text>{{item.val}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed, defineEmits } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import { BASE_FILE_URL } from '@/interface/constant.js'
	import { getFileType } from '@/utils/index.js'
	
	//接收的参数
	const props = defineProps({
		cellConfig: {},
	})
	
	const cellRNamesArr = (props.cellConfig && props.cellConfig.cellRNames)? JSON.parse(props.cellConfig.cellRNames): []
	const cellFileType = (props.cellConfig && props.cellConfig.cellFile)? getFileType(props.cellConfig.cellFile): 'word'
	// console.log(cellFileType)
	// console.log(cellRNamesArr)
	// console.log(props.cellConfig)
	const emit = defineEmits(["handleEvent"])
	
	const state = reactive({
		imgPopShow: false,
		// cellRNames:[],
		// cellLImg: '/static/icon/top-bg.png',
	})
	
	
	const handleEvent = () => {
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
	.com_file{
		display: flex;
		padding: 8rpx;
		position: relative;
		background-color: #fff;
		margin-bottom: 24rpx;
		
		.com_fileL{
			width: 144rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.com_fileLImg{
				width: 72rpx;
				height: 72rpx;
			}
		}
		
		.com_fileR{
			flex: 1;
			padding: 12rpx;
			font-size: 26rpx;
			border-radius: 16rpx;
			line-height: 36rpx;
			
			.com_fileRT{
				font-size: 30rpx;
				// color: #6295E4;
				font-weight: 600;
				line-height: 48rpx;
			}
			
		}
	}
</style>