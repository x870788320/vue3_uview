<template>
	<view class = "task">
			
		<!-- 任务类型 -->
		<view class = 'taskFir'>
			<view v-for = "item in taskTypes"
				:key="item.id"
				:class = '{taskFirBtn: true, taskFirBtnSe: state.taskType == item.id}' 
				@click="handleTaskType(item.id)">
				{{item.title}}
			</view>
		</view>
		<!-- 搜索 -->
		<view class = 'taskSearch'>
			<view class = 'taskSearchInput'>
				<u-input v-model="state.taskSearch" 
					type="text" 
					border="true" 
					placeholder="请输入任务关键词搜索"
					custom-style="background: #F2F3F8" />
			</view>
			<view class = 'taskSearchBtn' @click="getTaskInfo()">
				<u-button type="primary">
					<u-icon name="search" color="#fff" size="28"></u-icon>
					搜索
				</u-button>
			</view>
		</view>
		<!-- mainNav -->
		<view class = 'mainNav'>
			<view v-for = "item in taskTimes"
				:key="item.id"
				:class = '{mainNavNtn: true, mainNavNtnSe: state.taskTime == item.key}' 
				@click="handleTaskTime(item.key)">
				{{item.title}}
				<view class = 'mainNavHorn' v-show = 'state.taskTime == item.key'></view>
			</view>
		</view>
		<!-- mainContent -->
		<view class = 'taskContent'>
			<view class = 'taskContentMsg'>
				共查询到{{state.tastInfo.length}}条
			</view>
			<view class = 'taskContentCon'>
				<view class = 'taskContentItem' v-for = 'item in state.tastInfo' @click="handleTaskItem(item)">
					<img class = 'taskContentItemImg' src="/static/icon/icon-task-day.png" alt="">
					<text class = 'box_ellipsis taskContentItemMsg'>{{item.title}}</text>
					<text class = 'taskContentItemTime'>{{item.time}}</text>
				</view>
			</view>
		</view>
		
		<u-notify ref="uToast"></u-notify>
	</view>
	
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onLaunch,onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestTaskInfo, requestMorningMeetingInfo } from '@/interface/index.js'
	import {GET_STORAGE} from '@/utils/storage/user_storage.js'
	
	const interfaces = { requestMorningMeetingInfo }
	
	// 数据
	const uToast = ref()
	const store = useStore()
	const state = reactive({
	  taskType: 1,
	  taskTime: 'day',
	  taskSearch: '',
	  tastInfo: [],
	})
	
	// 获取接口数据
	const getTaskInfo = async () => {
		let params = {
			state: state.taskType,
			type: state.taskTime,
			title: state.taskSearch,
		}
		let taskInfoInter = await requestTaskInfo(params).then(res => res).catch(e => e)
		console.log(taskInfoInter)
		if(!taskInfoInter.data || !taskInfoInter.data.t) {
			return
		}
		state.tastInfo = taskInfoInter.data.t
	}
	
	// getTaskInfo()
	
	// 任务类型
	const taskTypes = [
		{id: 1, title: '未完成任务'},
		{id: 2, title: '已完成任务'},
		{id: 3, title: '我的任务'},
	]
	// taskTimes
	const taskTimes = [
		{id: 1, title: '本日任务', key: 'day'},
		{id: 2, title: '本周任务', key: 'week'},
		{id: 3, title: '本月任务', key: 'month'},
	]
	
	// 从任务打开的 form页的配置参数
	const childFormDoms = {
		// 晨会
		morningMeeting: [
			{id: 1, title: '晨会主题内容', key: 'content', type: 'text',ref: "Meeting_content"},
			{id: 2, title: '发起人', key: 'userName', type: 'text',ref: "Meeting_userName"},
			{id: 3, title: '文件', key: 'file1', type: 'file',ref: "Meeting_file1"},
			{id: 4, title: '建议', key: 'remark', type: 'input',ref: "Meeting_remark"},
			{id: 5, title: '参与人签字', key: 'sign', type: 'sign',ref: "Meeting_sign"}
		]
	}
	
	// 方法
	// 最上方的任务类型点击事件
	const handleTaskType = id => {
		state.taskType = id
		getTaskInfo()
		
	}
	
	// 中间任务期限的点击事件
	const handleTaskTime = key => {
		state.taskTime = key
		getTaskInfo()
	}
	
	//任务的点击事件
	const handleTaskItem = async obj => {
		console.log(obj)
		// 根据类型显示页面
		
		// 根据类型显示页面
		let types = {
			danger: { name: 'taskHideRule' },   // 隐患
			dangerCheck: { name: 'taskDanCheck' },   // 隐患检查
			dangerSimple: { name: 'T_A_clapping', navId: 2 },  //随手拍审核
			"trainPlan": { name: 'taskTrainPlan' },   // 培训
			culturePublicity: { name: 'taskCulture' },  // 文化安全
			"oh": { name: 'taskCollectGood' },  // 领用劳保用品
			accHandle: { name: 'T_A_acciUp', navId: 4 },     //事故上报
			acc: {name: 'T_A_acciUp', navId: 3},
			accSimple: { name: 'T_A_acciUp', navId: 2 },     // 事故报告
			accReply:  { name: 'applyAcciReply' },	// 事故批复
			riskHdCheck: { name: '' },    		//隐患排查清单
			workAct: { name: 'T_A_work' },		// 特殊作业
			morningMeeting: { name: 'comForm', sourceInter: 'requestMorningMeetingInfo', submitFn: 'requestMorningMeetingSubmit', title: '晨会' },   //晨会
			
			respkpiAuditor: { name: 'taskRespkp' },  // 责任考核
			riskHdRecties: { name: '' }, // 隐患整改
			riskHdRvals:{ name: '' },  // 隐患评估
			"respkpiAssessee": { name: '' },  // 责任制考评
			letter:{name: 'taskLetter'}, //钉钉责任书
			letterSigner: {name: 'taskLetter', navId: 3}, //钉钉责任书确认
		}
		let urlObj = types[obj.type]
		
		// 该部分内容即将上线
		if(!urlObj) {
			uToast.value.show({
				top: 10,
				type: 'primary',
				message: "该部分内容即将上线",
				duration: 1000 * 3,
				safeAreaInsetTop:false
			})
			return
		}
		let toUrl = urlObj.name
		// 处理跳到公共表单的参数
		if(toUrl == 'comForm'){
			const formConfig = {}
			formConfig.domList = childFormDoms[obj.type] || []
			formConfig.config ={
				submitFn: urlObj.submitFn,
				from: obj.type,
			}
			
			
			// 如果需要调接口，就调接口
			if(urlObj.sourceInter){
				let interParams = {}
				if(obj.type == 'morningMeeting' && obj.data){
					interParams = JSON.parse(obj.data) || {}
					formConfig.config.params = {id: interParams.bizId}
				}
				let interInfo = await interfaces[urlObj.sourceInter](interParams).then(r => r)
				console.log(interInfo)
				if(interInfo.data && interInfo.data.t){
					let info = interInfo.data.t
					formConfig.domList = formConfig.domList.map(item => {
						item.val = info[item.key]
						return item
					})
				}
			}
			obj = formConfig
			console.log(obj)
		}
		
		console.log(32323232)
		
		// 根据参数显示不通模块
		if(urlObj.navId) {
			obj.navId = urlObj.navId
		}
		
		// 跳到下一页带的参数
		let params = {
			config: JSON.stringify(obj),
			data: JSON.stringify(obj)
		}
		if(urlObj.title){
			params.title = urlObj.title
		}
		
		uni.$u.route({
			url: `/pages/${toUrl}/${toUrl}`,
			params
		})
	}
	
	onShow(() => {
		if(GET_STORAGE('TOKEN')){
			getTaskInfo()
		} else {
			setTimeout(() => getTaskInfo(), 600)
		}
	})
</script>

<style lang="scss">
	.task{
		background-color: #fff;
	}
	.taskFir{
		height: 112rpx;
		line-height: 112rpx;
		display: flex;
		justify-content: center;
		color: #626A74;
		font-size: 30rpx;
		
		.taskFirBtn{
			margin: 0 24rpx;
		}
		.taskFirBtnSe{
			color: #0F1115;
			font-weight: 700;
		}
	}
	.taskSearch{
		margin: 0 32rpx;
		border-radius: 16rpx;
		overflow: hidden;
		display: flex;
		
		.taskSearchInput{
			flex: 1;
			background: #F2F3F8;
			
		}
		.taskSearchBtn{
			width: 160rpx;
		}
	}
	.mainNav{
		height: 128rpx;
		line-height: 128rpx;
		margin: 0 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		text-align: center;
		color: #626A74;
		
		.mainNavNtn{
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
			position: relative;
			
			.mainNavHorn{
				width: 0;
				height: 0;
				border-bottom: 12rpx solid #025FFD;
				border-left: 12rpx solid transparent;
				position: absolute;
				right: 0;
				bottom: 0;
			}
			
		}
		
		.mainNavNtnSe{
			color: #025FFD;
			font-weight: 500;
		}
	}
	.taskContent{
		height: 500px;
		background-color: #F2F3F8;
		padding: 32rpx;
		font-size: 30rpx;
		
		.taskContentMsg{
			// margin: 32rpx 0;
			font-size: 28rpx;
		}
		
		.taskContentCon{
			
			.taskContentItem{
				height: 112rpx;
				display: flex;
				align-items: center;
				background-color: #fff;
				margin-top: 32rpx;
				border-radius: 16rpx;
				
				.taskContentItemImg{
					width: 32rpx;
					height: 34rpx;
					margin-left: 32rpx;
				}
				
				.taskContentItemMsg{
					flex: 1;
					color: #0F1115;
					font-weight: 500;
					margin-left: 36rpx;
				}
				
				.taskContentItemTime{
					font-size: 28rpx;
					color: #626A74;
					margin: 0 32rpx;
				}
			}
		}
	}
</style>