<template>
	<view class = 'comExamL'>
		<view class="comExamLPName">{{paper.tpName}}</view>
		<!-- <view class="comExamLScore">得分：{{paper.extraScore}}</view> -->
		<view class="comExamLScore">
			<view  class="comExamLScore2">{{paper.score || paper.extraScore}}</view>
		</view>
		<view v-for = '(item, i) in state.paperInfo'>
			<view class="comExamLTitle">{{i + 1}}. {{item.title}}</view>
			
			<view class="comExamLItem" 
				v-for = '(option, index) in item.options.split("|")' 
				:class="{comExamLItemSe: item.answerOld.includes(codeList[index])}">
				<text class = 'comExamLItemSeLeft'>{{codeList[index]}}.</text>
				<text>{{option}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestPlanPaper2Info } from '@/interface/index.js'
	import { formatDate } from '@/utils/index.js'
	
	// 数据
	//接收的参数
	const props = defineProps({
		config: '',
	})
	const codeList = ['A','B','C','D','E','F','G']
	
	const configObj = JSON.parse(props.config) || {}
	const paper = configObj.paper || {}
	const store = useStore()
	const state = reactive({
		paperInfo: []
		
	})
	
	// 获取线上数据
	const getPlanInfo = async () => {
		console.log(configObj)
		const paperInfoInter = await requestPlanPaper2Info(configObj.paperId).then(r => r).catch(e => {})
		
			console.log(paperInfoInter)
		if(!paperInfoInter.data || !paperInfoInter.data.t) {
			return
		}
		state.paperInfo = paperInfoInter.data.t || []
		console.log(state.paperInfo)
		console.log(22222)
	}
	
	
	
	// 方法
	// 搜索
	
	
	onShow(() => {
		getPlanInfo()
	})
</script>

<style lang="scss">
	.comExamL{
		padding: 32rpx;
		background-color: #F2F3F8;
		
		.comExamLPName{
			font-size: 20px;
			font-weight: 600;
			margin-bottom: 20px;
		}
		.comExamLScore{
			// height: 120px;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.comExamLScore2{
				width: 300rpx;
				height: 300rpx;
				background: url('/static/icon/score.png');
				background-size: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				font-size: 44rpx;
			}
		}
		
		.comExamLTitle{
			font-weight: 600;
			font-size: 32rpx;
			margin-bottom: 40rpx;
			line-height: 52rpx;
			
		}
		
		.comExamLItem{
			padding-left: 12rpx;
			margin-bottom: 36rpx;
			
			.comExamLItemLeft{
				margin-right: 12rpx;
			}
		}
		.comExamLItemSe{
			// background-color: #EDC489;
			color: #4AA888;
		}
	}
</style>