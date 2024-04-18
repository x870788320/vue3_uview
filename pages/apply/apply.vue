<template>
	<view class = 'apply'>
		<view class="applyItem" v-for = 'item in mainApplyList' @click="handleMainApply(item)">
			<img class="applyItemImg" :src="`/static/icon/${item.icon}.png`" alt="">
			<view class="applyItemText">{{item.title}}</view>
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
	  taskType: 1,
	  
	})
	// 事故管理
	const accidentChild = [
		{id: 1, title: '事故上报', icon: 'accidentUp', page: '/pages/T_A_acciUp/T_A_acciUp'},
		{id: 2, title: '事故批复', icon: 'accidentReply', page: '/pages/applyAcciReply/applyAcciReply'},
	]
	//风险管理
	const riskChild = [
		{id: 1, title: '隐患排查清单', icon: 'accidentUp', page: '/pages/applyRisk/applyRisk'},
		{id: 2, title: '日常性隐患排查', icon: 'accidentReply', page: '/pages/applyAcciReply/applyAcciReply'},
	]
	// 主要显示列表
	const mainApplyList = [
		{id: 1, title: '随手拍', icon: 'ill-ssp', page: '/pages/T_A_clapping/T_A_clapping'},
		{id: 2, title: '事故管理', icon: 'ill-sggl', page: '/pages/comModelList/comModelList', childList: accidentChild},
		{id: 3, title: '特殊作业管理', icon: 'ill-work', page: '/pages/T_A_work/T_A_work'},
		{id: 4, title: '风险管理', icon: 'ill-risk', page: '/pages/comModelList/comModelList', childList: riskChild},
	]
	
	// apply 模块的点击事件
	const handleMainApply = obj => {
		// state.taskType = id
		console.log(obj)
		if(obj.id > 2) return
		uni.$u.route({
			url: obj.page,
			params: {
				config: JSON.stringify(obj)
			}
		})
		
	}
</script>

<style lang="scss">
	.apply{
		padding: 32rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		
		.applyItem{
			width: calc( 50% - 8rpx );
			height: 266rpx;
			box-sizing: border-box;
			border-radius: 16rpx;
			margin-top: 16rpx;
			font-size: 36rpx;
			font-weight: 700;
			position: relative;
			
			.applyItemImg{
				width: 100%;
				height: 100%;
				position: absolute;
				
			}
			
			.applyItemText{
				margin-left: 32rpx;
				margin-top: 32rpx;
				position: absolute;
			}
		}
	}
</style>