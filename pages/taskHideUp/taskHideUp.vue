<template>
	<view class = 'taskHideUp'>
		<view class = 'taskHideUpItem' v-for="item in mainHideUpList">
			<view class = 'taskHideUpItemT'>{{item.title}}</view>
			<!-- 文字 -->
			<view v-if = 'item.type == "text"' class = 'taskHideUpItemV'>是方式方法</view>
			<!-- 输入框 -->
			<view v-if = "item.type == 'input'" class = 'taskHideUpItemV'>
				<input type="text" :placeholder="`请填写${item.title}`">
			</view>
			<!-- 照相 -->
			<view v-if = "item.type == 'photo'" class = 'taskHideUpItemV' @click="getPhoto()">
				<!-- <view>撒打发士大夫</view> -->
				<!-- <img class = 'taskHideUpItemVImg' src="/static/icon/camera.png" alt=""> -->
				<img v-if = 'state.photoSrc' class = 'taskHideUpItemVImg' :src="state.photoSrc" alt="">
			</view>
			<!-- 时间选择器 -->
			<view v-if = "item.type == 'time'" class = 'taskHideUpItemV' @touchmove.stop.prevent="() => {}">
				<u-datetime-picker
					:show="state.datetimeShowr"
					v-model="state.datetimeVal"
					mode="datetime"
					:closeOnClickOverlay="true"
					@close="state.datetimeShowr = false"
					@cancel="state.datetimeShowr = false"
					@confirm="state.datetimeShowr = false"
				></u-datetime-picker>
				<view class = 'taskHideUpItemTip' @click="state.datetimeShowr = true">
					{{dayjs(state.datetimeVal).format('YYYY-MM-DD HH:mm:ss')}}
				</view>
			</view>
			<!-- 选择器 -->
			<view v-if = "item.type == 'picker'" class = 'taskHideUpItemV' @touchmove.stop.prevent="() => {}">
				<u-picker 
					:show="state[`${item.name}show`]" 
					:columns="state[`${item.name}Columns`]"
					:closeOnClickOverlay="true"
					@close="state[`${item.name}show`] = false"
					@cancel="state[`${item.name}show`] = false"
					@confirm="handlePicker($event,item)">
				</u-picker>
				<view class = 'taskHideUpItemTip' @click="state[`${item.name}show`] = true">
					{{state[`${item.name}Val`]}}
				</view>
			</view>
			<!-- 打开用户列表 -->
			<view v-if = "item.type == 'user'" class = 'taskHideUpItemV' @click="handleUserList()">
				<view class = 'taskHideUpItemTip'>{{state.selectUser || ''}}</view>
			</view>
		</view>
	</view>
	<view class = 'taskHideBtn' @click="handleSubmit()">
		<u-button type="primary" shape="circle" :ripple="true" size = 'medium '>提交</u-button>
	</view>
	
	<userList ref = 'userListCom'></userList>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import dayjs from 'dayjs'
	
	// 静态数据
	// 主要显示列表
	const mainHideUpList = [
		{id: 1, title: '隐患编号', key: '', type: 'text'},
		{id: 2, title: '受检单位(责任单位)', key: '', type: 'text'},
		{id: 3, title: '检查活动名称(检查内容)', key: '', type: 'text'},
		{id: 4, title: '隐患地点', key: '', type: 'input'},
		{id: 5, title: '隐患描述', key: '', type: 'input'},
		{id: 6, title: '隐患照片', key: '', type: 'photo'},
		{id: 7, title: '整改要求', key: '', type: 'input'},
		{id: 8, title: '规定时间(整改截止事件)', key: '', type: 'time', name: 'correctEnd'},
		{id: 9, title: '隐患类型', key: '', type: 'picker', name: 'hideType'},
		{id: 10, title: '隐患等级', key: '', type: 'picker', name: 'hideLevel'},
		{id: 11, title: '整改责任人', key: '', type: 'user', name: ''}
	]
	
	//接收的参数
	// const props = defineProps({
	// 	selectUser: ''
	// })
	// 动态数据
	const userListCom = ref()
	const store = useStore()
	const state = reactive({
		
		photoSrc: "/static/icon/camera.png",
		datetimeShowr: false,
		datetimeVal: Date.now(),
		
		correctEndShow: false,
		correctEndVal: Date.now(),
		
		hideTypeShow: false,
		hideTypeVal: '请选择隐患类型',
		hideTypeColumns: [
			['中国', '美国', '日本']
		],
	  
		hideLevelShow: false,
		hideLevelVal: '请选择隐患等级',
		hideLevelColumns: [
			['深圳', '厦门', '上海', '拉萨']
		],
		
		selectUser: '请选择责任人'
		
	})
	
	// 方法
	//调取相机
	const getPhoto = () => {
		uni.chooseImage({
		  count: 1, // 最多选择一张图片
		  sourceType: ['album','camera'], // 只允许从相机选择  'album'相册
		  success: (res) => {
		    const tempFilePaths = res.tempFilePaths
		    // 在这里处理图片文件
			console.log(tempFilePaths)
			state.photoSrc = tempFilePaths[0]
		  }
		})
	}
	
	// 下拉框的选择事件
	const handlePicker = (e, obj) => {
		state[`${obj.name}show`] = false
		state[`${obj.name}Val`] = e.value[0]
	}
	
	// 操作用户列表
	// 回调函数
	const getUserName = params => {
		console.log(params)
	}
	const handleUserList = () => {
		console.log(userListCom)
		console.log(444444444)
		// userListCom.value.handleUserList()
		
		
		uni.$u.route({
			url: '/pages/comUserList/comUserList',
			animationDuration: 300,
			animationType: 'slide-in-bottom'
		})
	}
	
	
	// 提交
	const handleSubmit = () => {
		console.log(11111)
		// console.log(props)
		// console.log(props.selectUser)
	}
	
	onShow(() => {
		// uni.$on('selectUser',function(data){
		// 	console.log('监听到事件来自返回的参数：' + data);
		// 	// TODO 下面执行刷新的方法
		// })
		// let pages = getCurrentPages();
		// let lastPage = pages[pages.length - 2]
		// console.log(lastPage)
		uni.$once('selectStaff',function(data){
			console.log('监听到事件来自返回的参数：' + data);
			// TODO 下面执行刷新的方法
			state.selectUser = data
		})

	})
	
</script>

<style lang="scss">
	.taskHideUp{
		padding: 32rpx;
		background-color: #fff;
		
		.taskHideUpItem{
			border-bottom: 1rpx solid #e5e5e5;
			line-height: 56rpx;
			padding: 30rpx 0;
			color: #0F1115;
			
			.taskHideUpItemT{
				display: inline-block;
				padding-right: 60rpx;
				background: linear-gradient(to bottom, #ffffff 60%, #E8F0FD 60%, #E8F0FD 100%);
				color: #626A74;
				
			}
			
			.taskHideUpItemV{
				margin-top: 26rpx;
				
				.taskHideUpItemVImg{
					width: 248rpx;
					height: 248rpx;
					background-color: #e5e5e5;
					border: 1px solid #e5e5e5;
				}
				
				.taskHideUpItemTip{
					color: #626A74;
				}
			}
		}
	}
	.taskHideBtn{
		width: 260rpx;
		// margin-bottom: 60rpx;
		margin: 60rpx auto;
		margin-top: 0;
	}
</style>