<template>
	<view class = 'applyWork'>
		<view class = 'applyWorkTop'>
			<!-- <u-sticky bgColor="#fff"> -->
			<u-tabs
				:list="workStatusNav"
				lineWidth="40"
				lineHeight="4"
				:activeStyle="{
					color: '#303133',
					fontWeight: 'bold',
					transform: 'scale(1.05)'
				}"
				:inactiveStyle="{
					color: '#606266',
					transform: 'scale(1)'
				}"
				itemStyle="padding-left: 30rpx; padding-right: 30rpx; height: 96rpx;"
				@click="changeWorkStatus">
			</u-tabs>
			<!-- </u-sticky> -->
		</view>
		<view class="applyWorkBase applyWorkStatus1" v-show = 'state.workStatusId == 1'>
			<cell2 v-for = 'item in state.mainInfo'  :cellConfig = "item" @handleEvent='handleCell2(item)'></cell2>
			<cell2 v-for = 'item in state.mainInfo'  :cellConfig = "item" @handleEvent='handleCell2(item)'></cell2>
			
		</view>
		<view v-show = 'state.workStatusId == 2'>
			
		</view>
		<view v-show = 'state.workStatusId == 3'>
			<!-- 333 -->
		</view>
		<view v-show = 'state.workStatusId == 4'>
			<!-- 444 -->
		</view>
		<view v-show = 'state.workStatusId == 5'>
			<!-- 555 -->
		</view>
		<view v-show = 'state.workStatusId == 6'>
			<!-- 6666 -->
		</view>
	</view>
	
	<addBtn v-if = 'state.workStatusId == 1' @handleEvent ="addRander()"></addBtn>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { formatDate } from '@/utils/index.js'
	import { docTypes } from '../../resource/work.js'
	import {GET_STORAGE} from '@/utils/storage/user_storage.js'
	import { requestWorkMyActInfo, 
			requestWorkPendingInfo, 
			requestWorkStaysInfo,
			requestWorkDocMyInfo,
			requestWorkDocPendInfo,
			requestWorkdoHisInfo,} from '@/interface/index.js'
	
	// 数据
	const store = useStore()
	const state = reactive({
	  // taskType: 1,
		workStatusId: 1,
		mainInfo: [],
	  
	})
	// 主要显示列表
	const workStatusNav = [
		{ id: 1, name: '我的活动' },
		{ id: 2, name: '活动审核',
			badge: {
				// isDot: true,
				// value: 5,
			}
		}, 
		{ id: 3, name: '待建作业' },
		{ id: 4, name: '我的作业' },
		{ id: 5, name: '待审作业' },
		{ id: 6, name: '审核历史' }
	]
	
	
	const inters =  [ requestWorkMyActInfo, 
			requestWorkPendingInfo, 
			requestWorkStaysInfo,
			requestWorkDocMyInfo,
			requestWorkDocPendInfo,
			requestWorkdoHisInfo]
	
	// 活动项的列表
	const actCellItems = [
		{id: 1, title: '作业内容', key: 'content'},
		{id: 2, title: '作业地点', key: 'place'},
		{id: 3, title: '预计开始时间', key: 'beginTime'},
		{id: 4, title: '预计结束时间', key: 'endTime'}
	]
	// 获取线上数据
	const getClappingInfo = async (id = 1) => {
		// 一周前
		let beginTimeN = (new Date).getTime()-7*24*60*60*1000
		let beginArr = formatDate(beginTimeN)
		let endArr = formatDate()
		let params = {
			page:1,
			rows:20,
			size: 100,
			endTime:`${endArr[0]}-${endArr[1]}`,
			beginTime:`${beginArr[0]}-${beginArr[1]}`
		}
		// let info = []
		// if(id == 1) {
		// 	const interClappingInfo = await requestClappingInfo(params).then(r => r).catch(e => {})
		// 	if(!interClappingInfo.data || !interClappingInfo.data.t) {
		// 		return
		// 	}
		// 	info = interClappingInfo.data.t.content || []
		// }
		// if(id == 2) {
		// 	const interClapConfirmInfo = await requestClapConfirmInfo(params).then(r => r).catch(e => {})
		// 	if(!interClapConfirmInfo.data || !interClapConfirmInfo.data.t) {
		// 		return
		// 	}
		// 	info = interClapConfirmInfo.data.t.content || []
		// }
		console.log(params)
		let interFn = inters[id - 1]
		const interClapConfirmInfo = await interFn(params).then(r => r).catch(e => {})
		if(!interClapConfirmInfo.data || !interClapConfirmInfo.data.t) {
			return
		}
		let info = interClapConfirmInfo.data.t.content || []
		console.log(info)
		console.log(323232)
		state.mainInfo = info.map(clap => {
			let obj = {}
			let cellRNames = actCellItems.map(item => {
				item.val = clap[item.key]
				if(item.key.includes('Time')){
					let arr = formatDate(item.val)
					item.val = `${arr[0]}-${arr[1]} ${arr[3]}`
				}
				return item
			})
			obj.cellRNames = JSON.stringify(cellRNames)
			obj.cellLT = clap.dept.name
			obj.cellLB = clap.user.ushow
			obj.clapRT = clap.checker.ushow
			obj.docs = clap.docs
			obj.status = clap.status
			return obj
		})
	}
	getClappingInfo()
	
	// 方法
	const changeWorkStatus = obj => {
		console.log(obj)
		state.workStatusId = obj.id
		
		getClappingInfo(obj.id)
	}
	
	// 特殊作业类型
	const actTypes = [
		
	]
	
	// 我的活动点击事件
	const handleCell2 = obj => {
		console.log(obj)
	}
	
	// 添加活动
	const addRander = () => {
		const user = GET_STORAGE('USER')
		console.log(user)
		const myDept = { name: user.deptName, id: user.deptId}
		const myName = { name: user.ushow, id: user.id}
		const formConfig = {}
		// formConfig.domList = [
		// 	{id: 1, title: '作业票办理人', key: 'remark', type: 'text',ref: "clapping_remark"},
		// 	{id: 2, title: '审核人', key: 'field1', type: 'input',ref: "clapping_field1"},
		// 	{id: 3, title: '作业类型', key: 'imgs', type: 'checkBox',ref: "clapping_imgs"},
		// 	{id: 4, title: '预计开始时间', key: 'deptId', type: 'branch',ref: "clapping_deptId"},
		// 	{id: 4, title: '预计完成时间', key: 'deptId', type: 'branch',ref: "clapping_deptId"},
		// ]
		formConfig.domList = [
			{id: 1, title: '申请单位', key: 'actDeptId', type: 'branch',ref: "work_creat_act_dept", val: myDept},
			{id: 2, title: '申请人', key: 'actUserId', type: 'userById',ref: "work_creat_act_user", val: myName},
			{id: 3, title: '作业内容', key: 'content', type: 'input',ref: "work_creat_content"},
			{id: 4, title: '作业地点', key: 'place', type: 'input',ref: "work_creat_place"},
			{id: 5, title: '作业票办理人', key: 'userId', type: 'userById',ref: "work_creat_handle"},
			{id: 6, title: ' 审核人', key: 'checkerId', type: 'userById',ref: "work_creat_checker"},
			{id: 7, title: '作业类型', key: 'docs', type: 'checkBox',ref: "work_creat_docs", options:docTypes},
			{id: 8, title: '预计开始时间', key: 'beginTime', type: 'time',ref: "work_creat_begin"},
			{id: 9, title: '预计完成时间', key: 'endTime', type: 'time',ref: "work_creat_end"},
		]
		
	
		
		formConfig.config ={
			submitFn: 'requestWorkCreat',
			from: 'work_creat'
		}
		uni.$u.route({
			url: '/pages/comForm/comForm',
			params: {
				data: JSON.stringify(formConfig),
				title: '新增作业活动'
			}
		})
	}
</script>

<style lang="scss">
	.applyWork{
		padding: 0 32rpx;
		background-color: #F2F3F8;
		// background-color: #f00;
		
		.applyWorkTop{
			height: 112rpx;
			background-color: #fff;
			position: fixed;
			top: 0;
			z-index: 100;
		}
		
		.applyWorkBase{
			margin-top: 112rpx;
		}
		
	}
</style>