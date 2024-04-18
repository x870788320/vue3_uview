<template>
	<view class = 'acciReply'>
		<view class="applyAcciUpItem applyAcciUp4">
			<cell1 v-for = 'item in state.replyMain' :cellRNames.sync = "item.cellRNames" :cellLImg.sync = "item.cellLImg" :step="item.step" @handleEvent = 'handleReply(item)'></cell1>
		</view>
		
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestAcciReplyInfo } from '@/interface/index.js'
	import { formatDate } from '@/utils/index.js'
	
	// 数据
	//接收的参数
	const props = defineProps({
		config: '',
	})
	// const porpsObj = props.config? JSON.parse(props.config) : {}
	const store = useStore()
	const state = reactive({
		// acciUpSept: porpsObj.navId || 1,
		replyMain: [],
	})
	
	
	// 列表显示的项
	// 事故处理
	const accidReplyName = [
		{id: 1, title: '事故描述', key: 'remark'},
		{id: 2, title: '发生时间', key: 'atTime'},
		{id: 3, title: '上报人', key: 'createdUserName'},
		{id: 4, title: '上报时间', key: 'createdDate'},
		{id: 5, title: '事故处理员', key: 'handler'},
	]
	
	// 获取线上数据
	const getAcciInfo = async () => {
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
		
		let	interInfo = await requestAcciReplyInfo(params).then(r => r).catch(e => {})
		
		if(!interInfo.data || !interInfo.data.t) {
			return
		}
		let info = interInfo.data.t.content || []
		 
		state.replyMain = info.map(clap => {
			let obj = {}
			let cellRNames = accidReplyName.map(item => {
				item.val = clap[item.key]
				return item
			})
			obj.cellRNames = JSON.stringify(cellRNames)
			obj.cellLImg = clap.file1
			obj.step = clap.step || ''
			obj.acciId = clap.id || ''
			return obj
		})
		console.log(info)
		// console.log(state.clappingInfo)
		// console.log(state.clapConfirmInfo)
		
		// cell1Ref.value.handleConfig({
		// 	cellRNames: hide_item_name,
		// 	cellLImg: ''
		// })
	}
	
	
	// 方法
	const handleReply = obj => {
		// state.acciUpSept = obj.id
		// getAcciInfo(obj)
		console.log(obj)
	}
		
	onShow(() => {
		getAcciInfo()
	})
</script>

<style lang="scss">
	.acciReply{
		
	}
</style> 