<template>
	<view class="task_hide">
		
		<!-- 隐患状态 -->
		<view class = 'task_hide_status'>
			<view v-for = "item in hide_status"
				:key="item.id"
				:class = '{taskHideBtn: true, taskHideSe: state.hideStatus == item.id}' 
				@click="handleHideStatus(item)">
				{{item.title}}
				<!-- <view v-show = 'item.id == 1' class = 'taskHideBtnNum'>4</view> -->
				<view v-show = 'state.hideStatus == item.id' class= 'taskHideBtnLine'></view>
			</view>
		</view>
		<view class = 'task_hide_main'>
			<cell1 v-for = '(item, index) in state.taskDangerInfo' :cellRNames.sync = "item.cellRNames" :cellLImg.sync = "item.dangerLImg" @handleEvent = 'dangerItemClick(item, index)'></cell1>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed,  } from 'vue'
	import {  onShow  } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { formatDate } from '@/utils/index.js'
	import { requestTaskMyDanInfo, requestTaskZGDanInfo, requestTaskFHDanInfo } from '@/interface/index.js'
	
	// 数据
	const store = useStore()
	
	//接收的参数
	const props = defineProps({
		config: {},
	})
	
	const state = reactive({
	  hideStatus: 1,
	  taskDangerInfo: [],
	  
	})
	
	// 隐患的状态
	const hide_status = [
		{id: 1, title: '隐患上传'},
		{id: 2, title: '隐患整改'},
		{id: 3, title: '隐患复核'}
	]
	
	// 列表显示的项
	const hide_item_name = [
		{id: 1, title: '检查活动名称', key: 'field2'},
		{id: 2, title: '受检单位', key: 'field'},
		{id: 3, title: '隐患描述', key: 'field3'},
		{id: 4, title: '上传时间', key: 'addDate'}
	]
	
	
	
	// 获取线上数据
	const getClappingInfo = async (id) => {
		let params = {
			page:1,
			rows:100,
		}
		let info = []
		if(id == 1) {
			const interTaskMyInfo = await requestTaskMyDanInfo(params).then(r => r).catch(e => {})
			if(!interTaskMyInfo.data || !interTaskMyInfo.data.t) {
				return
			}
			info = interTaskMyInfo.data.t.content || []
			if(hide_item_name.length == 5) {
				hide_item_name.pop()
			}
		}
		if(id == 2) {
			const interTaskZGInfo = await requestTaskZGDanInfo(params).then(r => r).catch(e => {})
			if(!interTaskZGInfo.data || !interTaskZGInfo.data.t) {
				return
			}
			hide_item_name.push({id: 5, title: '复核人', key: 'field10.ushow'})
			info = interTaskZGInfo.data.t.content || []
		}
		if(id == 3) {
			const interTaskFHInfo = await requestTaskFHDanInfo(params).then(r => r).catch(e => {})
			if(!interTaskFHInfo.data || !interTaskFHInfo.data.t) {
				return
			}
			info = interTaskFHInfo.data.t.content || []
			
			if(hide_item_name.length == 5) {
				hide_item_name.pop()
			}
		}
		
		state.mainDangerInfo = info
		state.taskDangerInfo = info.map(clap => {
			let obj = {}
			let cellRNames = hide_item_name.map(item => {
				item.val = clap[item.key]
				if(item.key.includes('addDate')){
					let arr = formatDate(item.val)
					item.val = `${arr[0]}-${arr[1]} ${arr[3]}`
				}
				if(item.key.includes('.')){
					let keys = item.key.split('.')
					item.val = clap[keys[0]][keys[1]]
				}
				return item
			})
			obj.cellRNames = JSON.stringify(cellRNames)
			obj.dangerLImg = clap.imgs
			obj.dangerId = clap.id
			obj.field6 = clap.field6
			
			obj.hdNo = clap.hdNo
			
			return obj
		})
		console.log('taskDangerInfo',state.taskDangerInfo)
	}
	
	// 方法
	const handleHideStatus = obj => {
		state.hideStatus = obj.id
		
		getClappingInfo(obj.id)
		console.log(obj)
	}
	
	// 隐患的点击事件
	const dangerItemClick = (obj, index) => {
		console.log(obj)
		
		const data = state.mainDangerInfo[index]
		console.log(data)
		const formConfig = getFormConfig(obj,data)
		
		// const formConfig = {}
		// formConfig.domList = [
		// 	{id: 1, title: '隐患编号', key: 'hdNo', type: 'text',ref: "danger_up_hdNo", val: data['hdNo'] || ''},
		// 	{id: 2, title: '受检单位(责任单位)', key: 'field', type: 'text',ref: "danger_up_field", val: data['field'] || ''},
		// 	{id: 3, title: '检查活动名称(检查内容)', key: 'field2', type: 'text',ref: "danger_up_field2", val: data['field2'] || ''},
		// 	{id: 4, title: '隐患地点', key: 'field1', type: 'text',ref: "danger_up_field1", val: data['field1'] || ''},
		// 	{id: 5, title: '隐患描述', key: 'field3', type: 'text',ref: "danger_up_field3", val: data['field3'] || ''},
		// 	{id: 6, title: ' 隐患照片', key: 'imgs', type: 'picture',ref: "danger_up_imgs", val: data['imgs'] || ''},
		// 	{id: 7, title: '整改要求', key: 'field4', type: 'input',ref: "danger_up_field4", val: data['field4'] || ''},
		// 	{id: 8, title: '规定时间(整改截止时间)', key: 'field5', type: 'timeYMD',ref: "danger_up_field5", val: data['field5'] || ''},
		// 	{id: 9, title: '隐患类型', key: 'field8', type: 'picker',ref: "danger_up_field8",options:dangerTypes},
		// 	{id: 10, title: '隐患等级', key: 'field9', type: 'picker',ref: "danger_up_field9",options:dangerLevels},
		// 	{id: 11, title: '整改责任人', key: 'field10.id', type: 'user',ref: "danger_up_field10"}, // field10.id
		// ]
		
			
		
		// formConfig.config ={
		// 	submitFn: 'requestDangerSubmit',
		// 	from: 'danger_up',
		// 	params: {id: obj.dangerId, field6:obj.dangerId },
		// }
		uni.$u.route({
			url: '/pages/comForm/comForm',
			params: {
				data: JSON.stringify(formConfig),
				title: '隐患上传'
			}
		})
	}
	
	const dangerTypes = [['一般隐患(现场整改)', '一般隐患(非现场整改)', '重大隐患']]
	const dangerLevels = [['人员', '设备', '管理']]
	const getFormConfig = (obj,data) => {
		const formConfig = {}
		if(state.hideStatus == 1){
			formConfig.domList = [
				{id: 1, title: '隐患编号', key: 'hdNo', type: 'text',ref: "danger_up_hdNo", val: data['hdNo'] || ''},
				{id: 2, title: '受检单位(责任单位)', key: 'field', type: 'text',ref: "danger_up_field", val: data['field'] || ''},
				{id: 3, title: '检查活动名称(检查内容)', key: 'field2', type: 'text',ref: "danger_up_field2", val: data['field2'] || ''},
				{id: 4, title: '隐患地点', key: 'field1', type: 'text',ref: "danger_up_field1", val: data['field1'] || ''},
				{id: 5, title: '隐患描述', key: 'field3', type: 'text',ref: "danger_up_field3", val: data['field3'] || ''},
				{id: 6, title: ' 隐患照片', key: 'imgs', type: 'picture',ref: "danger_up_imgs", val: data['imgs'] || ''},
				{id: 7, title: '整改要求', key: 'field4', type: 'input',ref: "danger_up_field4", val: data['field4'] || ''},
				{id: 8, title: '规定时间(整改截止时间)', key: 'field5', type: 'timeYMD',ref: "danger_up_field5", val: data['field5'] || ''},
				{id: 9, title: '隐患类型', key: 'field8', type: 'picker',ref: "danger_up_field8",options:dangerTypes},
				{id: 10, title: '隐患等级', key: 'field9', type: 'picker',ref: "danger_up_field9",options:dangerLevels},
				{id: 11, title: '整改责任人', key: 'field10.id', type: 'user',ref: "danger_up_field10"}, // field10.id
			]
			formConfig.config ={
				submitFn: 'requestDangerSubmit',
				from: 'danger_up',
				params: {id: obj.dangerId, field6:obj.dangerId },
			}
		}
		if(state.hideStatus == 2){
			
			let field5arr = formatDate(data['field5'] - 0)
			let field5Val = `${field5arr[0]}-${field5arr[1]} ${field5arr[3]}`
			formConfig.domList = [
				{id: 1, title: '隐患编号', key: 'hdNo', type: 'text',ref: "danger_up_hdNo", val: data['hdNo'] || ''},
				{id: 2, title: '受检单位(责任单位)', key: 'field', type: 'text',ref: "danger_up_field", val: data['field'] || ''},
				{id: 3, title: '检查活动名称(检查内容)', key: 'field2', type: 'text',ref: "danger_up_field2", val: data['field2'] || ''},
				{id: 4, title: '隐患地点', key: 'field1', type: 'text',ref: "danger_up_field1", val: data['field1'] || ''},
				{id: 5, title: '隐患描述', key: 'field3', type: 'text',ref: "danger_up_field3", val: data['field3'] || ''},
				{id: 6, title: ' 隐患照片', key: 'imgs', type: 'picture',ref: "danger_up_imgs", val: data['imgs'] || ''},
				{id: 7, title: '整改要求', key: 'field4', type: 'text',ref: "danger_up_field4", val: data['field4'] || ''},
				{id: 8, title: '规定时间(整改截止时间)', key: 'field5', type: 'text',ref: "danger_up_field5", val: field5Val || ''},
				{id: 9, title: '隐患类型', key: 'field8', type: 'text',ref: "danger_up_field8",val: data['field8'] || ''},
				{id: 10, title: '隐患等级', key: 'field9', type: 'text',ref: "danger_up_field9",val: data['field9'] || ''},
				{id: 11, title: '整改责任人', key: 'field10.ushow', type: 'text',ref: "danger_up_field10",val: data['field10']['ushow'] || ''}, // field10.id
				{id: 12, title: '整改保障措施', key: 'field13', type: 'input',ref: "danger_up_field13"}, // field10.id
				{id: 13, title: '整改完成情况', key: 'field14', type: 'input',ref: "danger_up_field14"}, // field10.id
				{id: 14, title: '整改完成情况照片', key: 'field15', type: 'photo',ref: "danger_up_field15"}, // field10.id
				{id: 15, title: '投入资金', key: 'field16', type: 'input',ref: "danger_up_field16"}, // field10.id
				{id: 16, title: '实际整改完成时间', key: 'field17', type: 'time',ref: "danger_up_field17"}, // field10.id
			]
			formConfig.config ={
				submitFn: 'requestDangerZGSubmit',
				from: 'danger_zg',
				params: {id: obj.dangerId, field11:'否' },
			}
		}
		
		if(state.hideStatus == 3){
			
			let field5arr = formatDate(data['field5'] - 0)
			let field5Val = `${field5arr[0]}-${field5arr[1]}`
			let field17arr = formatDate(data['field5'] - 0)
			let field17Val = `${field17arr[0]}-${field17arr[1]}`
			let field18Option = [
				{label: '复核驳回', key: '3'},
				{label: '结束', key: '4'}
			]
			formConfig.domList = [
				{id: 1, title: '隐患编号', key: 'hdNo', type: 'text',ref: "danger_up_hdNo", val: data['hdNo'] || ''},
				{id: 2, title: '受检单位(责任单位)', key: 'field', type: 'text',ref: "danger_up_field", val: data['field'] || ''},
				{id: 3, title: '检查活动名称(检查内容)', key: 'field2', type: 'text',ref: "danger_up_field2", val: data['field2'] || ''},
				{id: 4, title: '隐患地点', key: 'field1', type: 'text',ref: "danger_up_field1", val: data['field1'] || ''},
				{id: 5, title: '隐患描述', key: 'field3', type: 'text',ref: "danger_up_field3", val: data['field3'] || ''},
				{id: 6, title: ' 隐患照片', key: 'imgs', type: 'picture',ref: "danger_up_imgs", val: data['imgs'] || ''},
				{id: 7, title: '整改要求', key: 'field4', type: 'text',ref: "danger_up_field4", val: data['field4'] || ''},
				{id: 8, title: '规定时间(整改截止时间)', key: 'field5', type: 'text',ref: "danger_up_field5", val: field5Val || ''},
				{id: 9, title: '隐患类型', key: 'field8', type: 'text',ref: "danger_up_field8",val: data['field8'] || ''},
				{id: 10, title: '隐患等级', key: 'field9', type: 'text',ref: "danger_up_field9",val: data['field9'] || ''},
				{id: 11, title: '整改责任人', key: 'field10.ushow', type: 'text',ref: "danger_up_field10",val: data['field10']['ushow'] || ''}, // field10.id
				{id: 12, title: '整改保障措施', key: 'field13', type: 'text',ref: "danger_up_field13",val: data['field13'] || ''}, // field10.id
				{id: 13, title: '整改完成情况', key: 'field14', type: 'text',ref: "danger_up_field14",val: data['field14'] || ''}, // field10.id
				{id: 14, title: '整改完成情况照片', key: 'field15', type: 'picture',ref: "danger_up_field15",val: data['field15'] || ''}, // field10.id
				{id: 15, title: '投入资金', key: 'field16', type: 'text',ref: "danger_up_field16",val: data['field16'] || ''}, // field10.id
				{id: 16, title: '实际整改完成时间', key: 'field17', type: 'text',ref: "danger_up_field17",val: field17Val}, // field10.id
				{id: 17, title: '是否委派复核人', key: 'field18', type: 'text',ref: "danger_up_field18", val: '否'}, // field10.id
				{id: 18, title: '是否合格', key: 'status', type: 'radio',ref: "danger_up_status", val: field18Option[1], options:field18Option}, // field10.id
				{id: 19, title: '情况描述', key: 'field21', type: 'input',ref: "danger_up_field21", val: '否'}, // field10.id
				{id: 20, title: '情况描述图片', key: 'field22', type: 'photo',ref: "danger_up_field22", val: '否'}, // field10.id
				{id: 21, title: '复核时间', key: 'field20', type: 'time',ref: "danger_up_field20", val: '否'}, // field10.id
			]
			formConfig.config ={
				submitFn: 'requestDangerFHSubmit',
				from: 'danger_fh',
				params: {id: obj.dangerId },
			}
		}
		return formConfig
	}
	
	onShow(() => {
		getClappingInfo(state.hideStatus)
	})
</script>


<style  lang="scss">
	.task_hide{
		padding: 32rpx;
		background: #F2F3F8;
		
		.task_hide_status{
			height: 68rpx;
			line-height: 68rpx;
			display: flex;
			justify-content: center;
			color: #626A74;
			font-size: 30rpx;
			
			.taskHideBtn{
				margin: 0 24rpx;
				position: relative;
			}
			
			.taskHideSe{
				color: #73A1F5;
				font-weight: 700;
			}
			
			.taskHideBtnNum{
				width: 32rpx;
				height: 32rpx;
				line-height: 32rpx;
				background: #f80;
				color: #fff;
				border-radius: 50%;
				text-align: center;
				font-size: 20rpx;
				position: absolute;
				top: 0;
				right: -20rpx;
			}
			
			.taskHideBtnLine{
				width: 60rpx;
				height: 6rpx;
				background-color: #73A1F5;
				position: absolute;
				bottom: -20rpx;
				left: 0;
				right: 0;
				margin: auto;
			}
		}
	
		.task_hide_main{
			
			.taskHideMainItem{
				height: 314rpx;
				margin-top: 68rpx;
				padding: 24rpx;
				background-color: #fff;
				border-radius: 12rpx;
				display: flex;
				position: relative;
				font-size: 24rpx;
				
				.taskHideMainItemL{
					width: 238rpx;
					height: 362rpx;
					margin-top: -48rpx;
					border-radius: 12rpx;
					overflow: hidden;
					
					.taskHideMainItemLImg{
						width: 100%;
						height: 100%;
					}
				}
				
				.taskHideMainItemR{
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
		
		.pop_img_con_img{
			width: 100%;
			height: 100%;
		}
	}
	
</style>
