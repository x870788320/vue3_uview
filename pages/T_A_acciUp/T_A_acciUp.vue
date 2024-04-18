<template>
	<view class = 'applyAcciUp'>
		<view class = 'applyAcciUpTop'>
			<view v-for = "item in mainUpList"
				:key="item.id"
				:class = '{acciUpBtn: true, acciUpBtnSe: state.acciUpSept == item.id}' 
				@click="handleAcciUpSept(item)">
				{{item.title}}
				<view v-show = 'state.acciUpSept == item.id' class = 'acciUpBtnLine'></view>
			</view>
		</view>
		<view v-show = 'state.acciUpSept == 1' class="applyAcciUpItem applyAcciUp1 ">
			<cell1 v-for = 'item in state.acciPage' :cellRNames.sync = "item.cellRNames" :cellLImg.sync = "item.cellLImg" :step="item.step"></cell1>
			
			<addBtn   @handleEvent = "addAccident()"></addBtn>
		</view>
		<view v-show = 'state.acciUpSept == 2' class="applyAcciUpItem applyAcciUp2">
			<cell1 v-for = 'item in state.acciConfirm' :cellRNames.sync = "item.cellRNames" :cellLImg.sync = "item.cellLImg" :step="item.step" @handleEvent = 'handleConfirm(item)'></cell1>
			
		</view>
		<view v-show = 'state.acciUpSept == 3' class="applyAcciUpItem applyAcciUp3">
			<cell1 v-for = 'item in state.acciUp' :cellRNames.sync = "item.cellRNames" :cellLImg.sync = "item.cellLImg" :step="item.step" @handleEvent = 'handleConfirm(item)'></cell1>
			
		</view>
		<view v-show = 'state.acciUpSept == 4' class="applyAcciUpItem applyAcciUp4">
			<cell1 v-for = 'item in state.acciHandle' :cellRNames.sync = "item.cellRNames" :cellLImg.sync = "item.cellLImg" :step="item.step" @handleEvent = 'handleConfirm(item)'></cell1>
			
		</view>
		
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestAcciReportInfo, requestAcciConfirmInfo, requestAcciPageInfo, requestAcciHandleInfo } from '@/interface/index.js'
	import { formatDate } from '@/utils/index.js'
	
	// 数据
	//接收的参数
	const props = defineProps({
		config: '',
	})
	const porpsObj = props.config? JSON.parse(props.config) : {}
	const store = useStore()
	const state = reactive({
		acciUpSept: porpsObj.navId || 1,
	})
	// 主要显示列表
	const mainUpList = [
		{id: 1, title: '事故报告', key: 'acciPage'},
		{id: 2, title: '待确认', key: 'acciConfirm'},
		{id: 3, title: '事故上报', key: 'acciUp'},
		{id: 4, title: '事故处理', key: 'acciHandle'},
	]
	
	
	// 列表显示的项
	// 事故处理
	const accidHandleame = [
		{id: 1, title: '事故描述', key: 'remark'},
		{id: 2, title: '发生时间', key: 'atTime'},
		{id: 3, title: '上报人', key: 'createdUserName'},
		{id: 4, title: '上报时间', key: 'createdDate'}
	]
	
	// 获取线上数据
	const getAcciInfo = async (navInfo = mainUpList[0]) => {
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
		let interInfo = {}
		let acciItemList = accidHandleame
		if(navInfo.id == 1) {
			interInfo = await requestAcciPageInfo(params).then(r => r).catch(e => {})
			acciItemList.push({id: 5, title: '确认人', key: 'assignee'})
		}
		if(navInfo.id == 2) {
			interInfo = await requestAcciConfirmInfo(params).then(r => r).catch(e => {})
		}
		if(navInfo.id == 3) {
			interInfo = await requestAcciReportInfo(params).then(r => r).catch(e => {})
		}
		if(navInfo.id == 4) {
			interInfo = await requestAcciHandleInfo(params).then(r => r).catch(e => {})
		}
		
		if(!interInfo.data || !interInfo.data.t) {
			return
		}
		let info = interInfo.data.t.content || []
		 
		state[navInfo.key] = info.map(clap => {
			let obj = {}
			let cellRNames = acciItemList.map(item => {
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
	const handleAcciUpSept = obj => {
		state.acciUpSept = obj.id
		getAcciInfo(obj)
	}
		
	// 添加新事故上报
	const addAccident = () => {
		console.log(3333)
		
		const formConfig = {}
		formConfig.domList = [
			{id: 1, title: '发生时间', key: 'atTime', type: 'time',ref: "add_acci_time"},
			{id: 2, title: '事故描述', key: 'remarm', type: 'input',ref: "add_acci_msg"},
			{id: 3, title: '事故照片', key: 'file1', type: 'photo',ref: "add_acci_pic"},
			{id: 4, title: '语音录入', key: 'file2', type: 'record',ref: "add_acci_record"}  //
		]
		
		formConfig.config ={
			submitFn: 'requestAddAcciSub',
			from: 'add_acci'
		}
		uni.$u.route({
			url: '/pages/comForm/comForm',
			params: {
				data: JSON.stringify(formConfig),
				title: '事故上报'
			}
		})
	}
	
	const handleConfirm = obj => {
		console.log(obj)
		
		const formConfig = {}
		let cellArr = JSON.parse(obj.cellRNames)
		let cellTitles = cellArr.map(item => item.title)
		let domList = []
		let toFormConfig = {}
		let title = ''
		if(state.acciUpSept == 2) {
			
			// let field18Option = [
			// 	{name: '有效', key: '3'},
			// 	{name: '无效', key: '4', isSe: true}
			// ]
			domList = [
				{id: 1, title: '发生时间', key: 'atTime', type: 'text',ref: "acci_at_time"},
				{id: 2, title: '事故描述', key: 'remark', type: 'text',ref: "acci_at_remark"},
				{id: 3, title: '事故照片', key: 'imgs', type: 'picture',ref: "acci_at_imgs", val: obj.cellLImg},
				// {id: 4, title: '语音', key: 'deptId', type: 'text',ref: "clapping_review_deptId"},
				{id: 5, title: '责任单位', key: 'deptId', type: 'branch',ref: "acci_createdDeptName"},
				{id: 6, title: '是否有效', key: 'isOk', type: 'radio',ref: "acci_isUse", options: ['是','否']},
				{id: 7, title: '是否上报', key: 'isReport', type: 'radio',ref: "acci_isRes", options: ['是','否']},
			]
			
			toFormConfig = {
				submitFn: 'requestAcciReSubmit',
				params: {id: obj.acciId},
				from: 'acci_confirm'
			}
			
			title = '事故报告确认'
		}
		
		
		if(state.acciUpSept == 3) {
			domList = [
				{id: 1, title: '发生时间', key: 'atTime', type: 'text',ref: "acci_report_time"},
				{id: 2, title: '事故描述', key: 'remark', type: 'input',ref: "acci_report_remark"},
				{id: 3, title: '事故照片', key: 'file1', type: 'picture',ref: "acci_report_imgs", val: obj.cellLImg},
				{id: 4, title: '语音录入', key: 'file2', type: 'record',ref: "acci_report_record"},  
				{id: 5, title: '事故处理员', key: 'handlerId', type: 'user',ref: "acci_report_handlerId"}
			]
			
			toFormConfig = {
				submitFn: 'requestAcciReportSubmit',
				params: {id: obj.acciId},
				from: 'acci_report'
			}
			
			title = '事故上报'
		}
		
		if(state.acciUpSept == 4) {
			domList = [
				{id: 1, title: '发生时间', key: 'atTime', type: 'text',ref: "acci_handle_time"},
				{id: 2, title: '事故描述', key: 'remark', type: 'text',ref: "acci_handle_remark"},
				{id: 3, title: '事故照片', key: 'file1', type: 'picture',ref: "acci_handle_imgs", val: obj.cellLImg},
				{id: 4, title: '语音录入', key: 'file2', type: 'record',ref: "acci_handle_record"},  
				{id: 5, title: '是否为事故', key: 'isOk', type: 'radio',ref: "acci_handle_handlerId", options: ['是','否']}
			]
			
			toFormConfig = {
				submitFn: 'requestAcciHandleSubmit',
				params: {id: obj.acciId},
				from: 'acci_handle'
			}
			
			title = '事故处理'
		}
		
		
		domList.map(item => {
			let cellIndex = cellTitles.indexOf(item.title)
			if(cellIndex > -1){
				item.val = cellArr[cellIndex].val
			}
			return item
		})
		
		formConfig.domList = domList
		formConfig.config = toFormConfig
		console.log(formConfig)
		// // 打开form 页
		uni.$u.route({
			url: '/pages/comForm/comForm',
			params: {
				data: JSON.stringify(formConfig),
				title
			}
		})
	}
	onShow(() => {
		getAcciInfo(mainUpList[state.acciUpSept - 1])
	})
</script>

<style lang="scss">
	.applyAcciUp{
		padding: 32rpx;
		// background-color: #F2F3F8;
		
		.applyAcciUpTop{
			height: 112rpx;
			line-height: 112rpx;
			display: flex;
			justify-content: center;
			color: #626A74;
			font-size: 30rpx;
			
			.acciUpBtn{
				margin: 0 24rpx;
			}
			.acciUpBtnSe{
				color: #4285F4;
				font-weight: 700;
			}
			.acciUpBtnLine{
				width: 40rpx;
				height: 6rpx;
				background-color: #4285F4;
				margin: 0 auto;
			}
		}
		
		
		.applyAcciUp1{
			// .apply_add{
			// 	width: 112rpx;
			// 	height: 112rpx;
			// 	position: fixed;
			// 	border-radius: 50%;
			// 	bottom: 6%;
			// 	right: 8%;
			// 	background-image: url('/static/icon/add.png');
			// 	background-repeat: no-repeat;
			// 	background-size: 100% 100%;
			// 	background-color: #fff;
			// }
		}
	}
</style> 