<template>
	<view class = 'applyAccident'>
		<view class = 'applyAccidentItem' v-for = 'item in accidentList' @click="handleAccident(item)">
			<img class="applyAccidentItemImg" :src="`/static/icon/${item.icon}.png`" alt="">
			{{item.title}}
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
	const accidentList = [
		{id: 1, title: '事故上报', icon: 'accidentUp', page: '/pages/T_A_acciUp/T_A_acciUp'},
		{id: 2, title: '事故批复', icon: 'accidentReply', page: '/pages/applyAcciReply/applyAcciReply'},
	]
	
	// 方法
	const handleAccident = obj => {
		console.log(obj)
		uni.$u.route({
			url: obj.page,
		})
		
	}
</script>

<style lang="scss">
	.applyAccident{
		padding: 32rpx;
		
		.applyAccidentItem{
			height: 168rpx;
			line-height: 168rpx;
			background: linear-gradient(to right, #6CA3FE, #4487F4);
			color: #fff;
			border-radius: 16rpx;
			margin-bottom: 36rpx;
			padding-left: 48rpx;
			position: relative;

			.applyAccidentItemImg{
				width: 128rpx;
				height: 128rpx;
				position: absolute;
				right: 64rpx;
				bottom: 0;
			}
		}
	}
</style>