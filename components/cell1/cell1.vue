<template>
	<view class = 'com_cell' @click="handleEvent()">
		<view class = 'com_cellL'>
			<img v-if = 'cellLImg' class = 'com_cellLImg' :src="`${BASE_FILE_URL}${cellLImg}`" alt="" @click.stop="state.imgPopShow = true">
		</view>
		<view class = 'com_cellR'>
			<view v-for="item in cellRNamesArr" class="box_ellipsis">
				<text>{{item.title}}：</text>
				<text>{{item.val}}</text>
			</view>
		</view>
		<view v-show = 'props.step' class = 'com_cell_step'>{{props.step}}</view>
	</view>
	
	<view>
		<u-popup :show="state.imgPopShow" @close="state.imgPopShow = false" mode="center" :customStyle= "{width: '100%', height: '133vw'}">
			<img class = 'pop_img_con_img' :src="`${BASE_FILE_URL}${cellLImg}`" alt="" @click="state.imgPopShow = false">
		</u-popup>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed, defineEmits } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import { BASE_FILE_URL } from '@/interface/constant.js'
	
	//接收的参数
	const props = defineProps({
		cellRNames: '',
		cellLImg: '',
	})
	const cellRNamesArr = JSON.parse(props.cellRNames)
	
	const emit = defineEmits(["handleEvent"])
	
	const state = reactive({
		imgPopShow: false,
		// cellRNames:[],
		// cellLImg: '/static/icon/top-bg.png',
	})
	
	
	const handleEvent = () => emit('handleEvent')
	//获取参数
	// const handleConfig = config => {
	// 	console.log(config)
	// 	state.cellRNames = config.cellRNames || []
	// 	state.cellLImg = config.cellLImg || '/static/icon/top-bg.png'
	// }
	// defineExpose({handleConfig})
</script>

<style  lang="scss">
	.com_cell{
		height: 314rpx;
		margin-top: 68rpx;
		padding: 24rpx;
		background-color: #fff;
		border-radius: 12rpx;
		display: flex;
		position: relative;
		font-size: 24rpx;
		
		.com_cellL{
			width: 238rpx;
			height: 362rpx;
			margin-top: -48rpx;
			border-radius: 12rpx;
			overflow: hidden;
			
			.com_cellLImg{
				width: 100%;
				height: 100%;
			}
		}
		
		.com_cellR{
			flex: 1;
			margin-left: 24rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			line-height: 48rpx;
			color: #626A74;
			margin-top: 30rpx;
		}
		.com_cell_step{
			position: absolute;
			padding: 12rpx;
			background-color: #f80;
			border-radius: 12rpx;
			top: -10rpx;
			right: 32rpx;
			color: #fff;
		}
	}
	
	.pop_img_con_img{
		width: 100%;
		height: 100%;
	}
</style>