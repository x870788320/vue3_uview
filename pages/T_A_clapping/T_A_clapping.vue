<template>
	<view class = 'clapping'>
		<view class = 'random_status'>
			<view v-for = "item in random_status"
				:key="item.id"
				:class = '{randomBtn: true, randomBtnSe: state.hideStatus == item.id}' 
				@click="handleRandomStatus(item)">
				{{item.title}}
				<!-- <view v-show = 'item.id == 1' class = 'taskHideBtnNum'>4</view> -->
				<view v-show = 'state.randomStatus == item.id' class= 'randomBtnLine'></view>
			</view>
		</view>
		
		<view class = 'task_hide_main'>
			<cell1 v-for = 'item in state.clappingInfo' :cellRNames.sync = "item.cellRNames" :cellLImg.sync = "item.cellLImg" @handleEvent = 'clapItemClick(item)'></cell1>
		</view>
		
		<addBtn v-if = 'state.randomStatus == 1' @handleEvent ="addRander()"></addBtn>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestClappingInfo, requestClapConfirmInfo } from '@/interface/index.js'
	import { formatDate } from '@/utils/index.js'
	// 数据
	//接收的参数
	const props = defineProps({
		config: '',
	})
	const porpsObj = props.config? JSON.parse(props.config) : {}
	const store = useStore()
	const state = reactive({
	  randomStatus: porpsObj.navId || 1,
	  
	  clappingInfo: [],
	  clapConfirmInfo: [],
	  
	})
	const cell1Ref = ref()
	// 主要显示列表
	const test = () => {
		console.log(434343)
	}
	
	// 随手拍的状态
	const random_status = [
		{id: 1, title: '随手拍'},
		{id: 2, title: '待审核'},
	]
	
	
	// 列表显示的项
	const hide_item_name = [
		{id: 1, title: '隐患描述', key: 'remark'},
		{id: 2, title: '隐患地点', key: 'field1'},
		{id: 3, title: '隐患单位', key: 'deptName'},
		{id: 4, title: '上传人员', key: 'createdUserName'},
		{id: 5, title: '上传单位', key: 'createdDeptName'},
		{id: 6, title: '审核人', key: 'confirmUserName'},
	]
	
	
	// 获取线上数据
	const getClappingInfo = async (id) => {
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
		let info = []
		if(id == 1) {
			const interClappingInfo = await requestClappingInfo(params).then(r => r).catch(e => {})
			if(!interClappingInfo.data || !interClappingInfo.data.t) {
				return
			}
			info = interClappingInfo.data.t.content || []
		}
		if(id == 2) {
			const interClapConfirmInfo = await requestClapConfirmInfo(params).then(r => r).catch(e => {})
			if(!interClapConfirmInfo.data || !interClapConfirmInfo.data.t) {
				return
			}
			info = interClapConfirmInfo.data.t.content || []
		}
		state.clappingInfo = info.map(clap => {
			let obj = {}
			let cellRNames = hide_item_name.map(item => {
				item.val = clap[item.key]
				return item
			})
			obj.cellRNames = JSON.stringify(cellRNames)
			obj.cellLImg = clap.imgs
			obj.clapId = clap.id
			return obj
		})
		console.log(state.clappingInfo)
		console.log(state.clapConfirmInfo)
		
		// cell1Ref.value.handleConfig({
		// 	cellRNames: hide_item_name,
		// 	cellLImg: ''
		// })
	}
	
	
	
	// 方法
	const handleRandomStatus = obj => {
		console.log(obj)
		state.randomStatus = obj.id
		
		getClappingInfo(obj.id)
		
	}
	const popImg = e => {
		console.log(e)
		console.log(e.target)
		console.log(e.target.src)
		state.imgPopShow = true
	}
	const addRander = () => {
		const formConfig = {}
		formConfig.domList = [
			{id: 1, title: '隐患描述', key: 'remark', type: 'input',ref: "clapping_remark"},
			{id: 2, title: '隐患地点', key: 'field1', type: 'input',ref: "clapping_field1"},
			{id: 3, title: '隐患照片', key: 'imgs', type: 'photo',ref: "clapping_imgs"},
			{id: 4, title: '隐患单位', key: 'deptId', type: 'branch',ref: "clapping_deptId"}
		]
		formConfig.config ={
			submitFn: 'requestClapSubmit',
			from: 'clapping'
		}
		uni.$u.route({
			url: '/pages/comForm/comForm',
			params: {
				data: JSON.stringify(formConfig),
				title: '随手拍'
			}
		})
	}
	
	//审核
	const clapItemClick = obj => {
		console.log(obj)
		if(state.randomStatus == 1) return
		let cellArr = JSON.parse(obj.cellRNames)
		let cellTitles = cellArr.map(item => item.title)
		
		const formConfig = {}
		
		let domList = [
			{id: 1, title: '隐患描述', key: 'remark', type: 'text',ref: "clapping_review_remark"},
			{id: 2, title: '隐患地点', key: 'field1', type: 'text',ref: "clapping_review_field1"},
			{id: 3, title: '隐患照片', key: 'imgs', type: 'picture',ref: "clapping_review_imgs", val: obj.cellLImg},
			// todo
			{id: 4, title: '隐患单位', key: 'deptName', type: 'text',ref: "clapping_review_deptId"},
			{id: 5, title: '是否为隐患', key: 'danger', type: 'radio',ref: "clapping_review_danger", options: ['是','否']},
			{id: 6, title: '原因', key: 'reason', type: 'input',ref: "clapping_review_reason", show: {ref: 'clapping_review_danger', val: '否'}},
			// 条件
		]
		
		domList.map(item => {
			let cellIndex = cellTitles.indexOf(item.title)
			if(cellIndex > -1){
				item.val = cellArr[cellIndex].val
			}
			return item
		})
		
		formConfig.domList = domList
		formConfig.config ={
			submitFn: 'requestClapReSubmit',
			params: {id: obj.clapId},
			from: 'clapping_review'
		}
		console.log(formConfig)
		// // 打开form 页
		uni.$u.route({
			url: '/pages/comForm/comForm',
			params: {
				data: JSON.stringify(formConfig),
				title: '随手拍审核'
			}
		})
	}
	
	
	onShow(() => {
		getClappingInfo(state.randomStatus)
	})
</script>

<style lang="scss">
	.clapping{
		padding: 32rpx;
		background-color: #F2F3F8;
		position: relative;
		
		.random_status{
			height: 68rpx;
			line-height: 68rpx;
			display: flex;
			justify-content: center;
			color: #626A74;
			font-size: 30rpx;
			
			.randomBtn{
				width: 50%;
				text-align: center;
				margin: 0 24rpx;
				position: relative;
			}
			
			.randomBtnSe{
				color: #73A1F5;
				font-weight: 700;
			}
			
			// .taskHideBtnNum{
			// 	width: 32rpx;
			// 	height: 32rpx;
			// 	line-height: 32rpx;
			// 	background: #f80;
			// 	color: #fff;
			// 	border-radius: 50%;
			// 	text-align: center;
			// 	font-size: 20rpx;
			// 	position: absolute;
			// 	top: 0;
			// 	right: -20rpx;
			// }
			
			.randomBtnLine{
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
</style>