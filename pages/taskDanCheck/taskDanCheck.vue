<template>
	<view class = 'taskDanCheck'>
		<view class = 'taskDanCheckNav'>
			<view :class = '{taskDanCheckNavItem: true, CheckNavSe: state.checkStatus == 1}' 
				@click="handleDanCheck(1)">
				未完成
				<view class = 'CheckNavSeHorn' v-show = 'state.checkStatus == 1'></view>
			</view>
			<view :class = '{taskDanCheckNavItem: true, CheckNavSe: state.checkStatus == 2}' 
				@click="handleDanCheck(2)">
				已完成
				<view class = 'CheckNavSeHorn' v-show = 'state.checkStatus == 2'></view>
			</view>
		</view>
		<view class="taskDanCheckMain">
			<view class="taskDanCheckItem" v-for = '(item, index) in state.checkShowInfo'>
				<view class="taskCheckItemTime">{{item.startDate}}~{{item.endDate}}</view>
				<view class="taskCheckItemB">
					<view class="taskCheckItemBL" @click="handleCheckItem(item, item.taskId, index)">
						<view class="taskCheckItemBLTitle">{{item.checkName}}</view>
						<view class="taskCheckItemBLName">检查人：{{item.checkUserNames}}</view>
						<view v-if = "item.items.every(item => (item.status == '已完成')) && state.checkStatus == 1" 
							class="taskCheckItemBtn" 
							@click.stop="handleAllChecked(item)">
							完成
						</view>
					</view>
					<view class="taskCheckItemBR" @click="state.showChildId = (state.showChildId == index? -1 : index)">
						<!-- <view class="taskCheckItemBLTitle">{{item.status || '未完成'}}</view> -->
						<view class="taskCheckItemBLTitle">{{item.items.every(item => (item.status == '已完成'))? '已完成': '未完成'}}</view>
						<view class="taskCheckItemBRIcon">
							<u-icon :name="`${state.showChildId == index?'arrow-up': 'arrow-down'}`" color="#2979ff" size="12"></u-icon>
						</view>
					</view>
				</view>
				<view class="taskCheckItemChild" v-show = 'state.showChildId == index'>
					<view v-for = 'child in item.items' class="taskCheckItemChildItem"  @click="handleCheckItem(child, item.taskId)">
						<view class="taskCheckItemChildItemT">
							<text>{{child.content}}</text>
							<text class="taskCheckItemChildItemTS">{{child.status || '未完成'}}</text>
						</view>
						<view>{{child.norm}}</view>
						<view v-if = "child.status == '已完成' && state.checkStatus == 1" 
							class="taskCheckItemBtn" 
							@click.stop="handleCheckItem(child, item.taskId, 0, true)">
							增加检查
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestTaskCheckInfo, requestTaskCheckById } from '@/interface/index.js'
	
	// 数据
	const store = useStore()
	const state = reactive({
	  checkStatus: 1,
	  checkInfo: [],
	  checkShowInfo: [],
	  showChildId: -1,
	})
	
	// 填表时的  不这样写，保证每次获取的都是初始化的list,不携带val
	const checkDomList = () => [
		{id: 1, title: '检查内容', key: 'content', type: 'text',ref: "task_check_content"},
		{id: 2, title: '检查标准', key: 'norm', type: 'text',ref: "task_check_norm"},
		{id: 3, title: '是否存在问题', key: 'danger', type: 'radio',ref: "task_check_danger",val: '否', options:['是','否']},
		{id: 4, title: '责任单位', key: 'deptId', type: 'branch',ref: "task_check_deptId", show: {ref: 'task_check_danger', val: '是'}},
		{id: 5, title: '隐患描述', key: 'remark', type: 'input',ref: "task_check_remark", show: {ref: 'task_check_danger', val: '是'}},
		{id: 6, title: '隐患照片', key: 'imgs', type: 'photo',ref: "task_check_imgs", show: {ref: 'task_check_danger', val: '是'}},
		{id: 7, title: '整改要求', key: 'request', type: 'input',ref: "task_check_request", show: {ref: 'task_check_danger', val: '是'}},
	]
	
	// 显示时的
	let checkDownDomList = () => [
		{id: 1, title: '检查内容', key: 'checkItemContent', type: 'text',ref: "task_check_checkItemContent"},
		{id: 2, title: '检查标准', key: 'checkItemNorm', type: 'text',ref: "task_check_norm"},
		{id: 3, title: '检查信息', key: 'checkInfo', type: 'text',ref: "task_check_checkInfo"},
		{id: 4, title: '责任单位', key: 'dangerDeptName', type: 'text',ref: "task_check_dept"},
		{id: 5, title: '隐患描述', key: 'dangerRemark', type: 'text',ref: "task_check_dangerRemark"},
		{id: 6, title: '隐患照片', key: 'dangerImgs', type: 'picture',ref: "task_check_dangerImgs"},
		{id: 7, title: '整改要求', key: 'dangerRequest', type: 'text',ref: "task_check_dangerRequest"},
	]
	
	// 获取线上数据
	const getCheckInfo = async () => {
		const interCheckInfo = await requestTaskCheckInfo().then(r => r).catch(e => {})
		console.log(interCheckInfo)
		
		if(!interCheckInfo.data || !interCheckInfo.data.t) {
			return
		}
		state.checkInfo = interCheckInfo.data.t
		// state.checkInfo = testdata
		handleDanCheck(1)
	}
	
	
	// 方法
	// nav 方法
	const handleDanCheck = id => {
		console.log(id)
		state.checkStatus = id
		let statuss = ['未完成','已完成']
		state.checkShowInfo = state.checkInfo.filter(item => item.status == statuss[id - 1])
		state.showChildId = -1
	}
	
	// 列表项点击事件
	let notDownChecks = []
	const handleCheckItem = async (obj, taskId, index, isAdd) => {
		console.log(obj)
		if(obj.items) {
			
			notDownChecks = obj.items.filter(item => item.status == '未完成')
			if(notDownChecks.length == 0){
				state.showChildId = (state.showChildId == index? -1 : index)
				return
			}
			obj = notDownChecks.shift()
			// let waitDownChecks = notDownChecks
			
		}else {
			notDownChecks = []
		}
		if(!obj) return
		console.log(obj)
		
		const formConfig =JSON.parse(JSON.stringify({}))
		if(obj.status == '已完成' && !isAdd) {
			let objIntemInfoInter = await requestTaskCheckById({taskId, checkItemId: obj.checkItemId}).then(r => r).catch(e => {})
			
			if(!objIntemInfoInter.data || !objIntemInfoInter.data.t || !objIntemInfoInter.data.t.length) {
				return
			}
			let objIntemInfo = objIntemInfoInter.data.t[0]
			
			let domListLength = objIntemInfo.danger == '否'? 3: checkDownDomList().length
			formConfig.domList = checkDownDomList().filter(item => (item.id <= domListLength)).map(item => {
				if(objIntemInfo[item.key] && !item.val) {
					item.val = objIntemInfo[item.key]
				}
				if(item.id== 3){
					item.val = `${objIntemInfo.checkUserName},${objIntemInfo.checkTime}`
				}
				return item
			})
			
			formConfig.config ={
				from: 'task_check_item',
			}
		} else {
			console.log(notDownChecks)
			// 处理还没检查的
			notDownChecks = notDownChecks.map(info => {
				let noCheckObj = {}
				noCheckObj.domList = checkDomList().map(item => {
					// console.log(obj[item.key])
					if(info[item.key] && !item.val) {
						item.val = info[item.key]
					}
					return item
				})
				
				noCheckObj.config ={
					submitFn: 'requestTaskCheckSub',
					from: 'task_check',
					params: {
						taskId,
						checkItemId: info.checkItemId
					},
				}
				return noCheckObj
			})
			formConfig.domList = checkDomList().map(item => {
				if(obj[item.key] && !item.val) {
					item.val = obj[item.key]
					console.log(item.val)
				}
				return item
			})
			
			formConfig.config ={
				submitFn: 'requestTaskCheckSub',
				from: 'task_check',
				params: {
					taskId,
					checkItemId: obj.checkItemId
				},
				handleOthers: notDownChecks
			}
		}
		console.log(formConfig)
		uni.$u.route({
			url: '/pages/comForm/comForm',
			params: {
				data: JSON.stringify(formConfig),
				title: '检查'
			}
		})
	}
	
	// 点击完成
	const handleAllChecked = obj => {
		console.log(obj)
		let formConfig = {}
			formConfig.domList = [
				{id: 1, title: '检查名称', key: 'checkName', type: 'text',ref: "task_check_end_checkName", val:obj.checkName },
				{id: 2, title: '拍照', key: 'imgs', type: 'photo',ref: "task_check_end_imgs"},
				{id: 3, title: '签字', key: 'sign', type: 'sign',ref: "task_check_end_sign"}
			]
			
			formConfig.config ={
				submitFn: 'requestTaskEnd',
				from: 'task_check_end',
				params: {
					id: obj.taskId,
				}
			}
		
		uni.$u.route({
			url: '/pages/comForm/comForm',
			params: {
				data: JSON.stringify(formConfig),
				title: '完成'
			}
		})
	}
	
	onShow(() => {
		
		getCheckInfo()
	})
</script>

<style lang="scss">
	.taskDanCheck{
		padding: 32rpx;
		background-color: #F2F3F8;
		
		
		.taskDanCheckNav{
			// height: 128rpx;
			line-height: 128rpx;
			margin: 0 32rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			text-align: center;
			color: #626A74;
			
			.taskDanCheckNavItem{
				flex: 1;
				height: 80rpx;
				line-height: 80rpx;
				// position: relative;
				
				.CheckNavSeHorn{
					width: 64rpx;
					height: 6rpx;
					margin: 0 auto;
					background-color: #025FFD;
					border-radius: 2rpx;
				}
				
			}
			
			.CheckNavSe{
				color: #025FFD;
				font-weight: 500;
			}
		}
		
		.taskDanCheckMain{
			margin-top: 24rpx;
			.taskDanCheckItem{
				position: relative;
				font-size: 26rpx;
				margin-bottom: 24rpx;
				
				.taskCheckItemTime{
					color: #888;
					margin-bottom: 16rpx;
				}
				.taskCheckItemB{
					line-height: 54rpx;
					padding: 24rpx;
					background-color: #fff;
					border-radius: 8rpx;
					border-left: 8rpx solid #55AA8F;
					display: flex;
					
					.taskCheckItemBL{
						flex: 1;
						
						.taskCheckItemBLTitle{
							font-size: 30rpx;
							font-weight: 600;
						}
					}
					
					
					.taskCheckItemBR{
						width: 120rpx;
						text-align: center;
						
						.taskCheckItemBRIcon{
							width: 24rpx;
							height: 24rpx;
							margin: 12rpx auto;
						}
					}
					
				}
				.taskCheckItemChild{
					color: #666;
					padding: 24rpx;
					background-color: #fff;
					box-shadow: 0 0 4rpx #999;
					.taskCheckItemChildItem{
						padding: 8px 0;
						border-bottom: 1px solid #999;
						
						.taskCheckItemChildItemT{
							line-height: 64rpx;
							display: flex;
							justify-content: space-between;
							
							.taskCheckItemChildItemTS{
								color: #568BD9;
							}
						}
					}
				}
			}
			.taskCheckItemBtn{
				height: 26px;
				line-height: 26px;
				margin-top: 6px;
				display: inline-block;
				padding: 4rpx 36rpx;
				background: #2979FF;
				color: #fff;
				border-radius: 12rpx;
				
			}
		}
	}
</style>