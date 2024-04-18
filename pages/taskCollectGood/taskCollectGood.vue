<template>
	<view class = 'taskGood'>
		<view class = 'taskGoodItem' v-for = 'item in state.goodInfo' @click="goTaskGood(item)">
			<view class = 'taskGoodItemL'>
				<img class = 'taskGoodItemLImg' :src="`${BASE_FILE_URL}${item.grant.file2}`" alt="">
			</view>
			<view class = 'taskGoodItemR'>
				<view v-for="lineItem in goodItemName" class="box_ellipsis">
					<text>{{lineItem.title}}：</text>
					<text>{{item && item.grant[lineItem.key] || ''}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestTaskGoodInfo } from '@/interface/index.js'
	import { formatDate } from '@/utils/index.js'
	import { BASE_FILE_URL } from '@/interface/constant.js'
	
	// 数据
	const store = useStore()
	const state = reactive({
		goodInfo: [],
		
	})
	
	// 右侧
	const goodItemName = [
		{id: 1, title: '物品名称', key: 'name'},
		{id: 2, title: '数量', key: 'qty'},
		{id: 3, title: '发放时间', key: 'atTime'},
		{id: 4, title: '购入时间', key: 'buyTime'},
		{id: 5, title: '发放人', key: 'createdUserName'},
		{id: 6, title: '有效期起', key: 'prodTime'},
		{id: 7, title: '有效期止', key: 'expTime'}
	]
	
	const goodForm = [
		{id: 1, title: '物品名称', key: 'name', type: 'text',ref: "collect_name"},
		{id: 2, title: '拍照', key: 'pic', type: 'photo',ref: "collect_pic"},
		{id: 3, title: '签字', key: 'sign', type: 'sign',ref: "collect_sign"}
	]
	
	//处理下时间
	const handleDate = dateNum => {
		const arr = formatDate(dateNum)
		console.log(arr)
		return `${arr[0]}-${arr[1]}`
	}
	// 获取线上数据
	const getPlanInfo = async () => {
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
		const interGoodInfo = await requestTaskGoodInfo(params).then(r => r).catch(e => {})
		
		if(!interGoodInfo.data || !interGoodInfo.data.t) {
			return
		}
		state.goodInfo = interGoodInfo.data.t.content || []
	}
	
	getPlanInfo()
	
	
	// 方法
	const goTaskGood = obj => {
		console.log('goTaskGood',obj)
		const formConfig = {}
		formConfig.domList = goodForm.map(item => {
			item.val = obj.grant[item.key]
			return item
		})
		formConfig.config ={
			submitFn: 'requestTaskGoodSubmit',
			params: {id: obj.id},
			from: 'collectGood'
		}
		console.log(formConfig)
		// 打开form 页
		uni.$u.route({
			url: '/pages/comForm/comForm',
			params: {
				data: JSON.stringify(formConfig),
				title: '领用'
			}
		})
	}
</script>

<style lang="scss">
	.taskGood{
		.taskGoodItem{
			height: 314rpx;
			margin-top: 68rpx;
			padding: 24rpx;
			background-color: #fff;
			border-radius: 12rpx;
			display: flex;
			position: relative;
			font-size: 24rpx;
			
			.taskGoodItemL{
				width: 238rpx;
				height: 362rpx;
				margin-top: -48rpx;
				border-radius: 12rpx;
				overflow: hidden;
				
				.taskGoodItemLImg{
					width: 100%;
					height: 100%;
					box-shadow: 0 0 12rpx #626A74;
				}
			}
			
			.taskGoodItemR{
				flex: 1;
				margin-left: 24rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				line-height: 48rpx;
				color: #626A74;
				margin-top: 30rpx;
			}
		}
	}
</style>