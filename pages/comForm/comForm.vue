<template>
	<view class = 'comForm'>
		<!-- <view class = 'comFormItem' v-for="item in mainHideUpList"  v-show = 'item.show && (state[item.show.ref] == item.show.val)'> -->
		<view class = 'comFormItem' v-for="item in mainHideUpList"  v-show = '!item.show || (item.show && (state[item.show.ref] == item.show.val))'>
			<view class = 'comFormItemT'>{{item.title}}</view>
			<!-- 文字 -->
			<view v-if = 'item.type == "text"' class = 'comFormItemV' :id = '`${formConfig?.from}_${item.key}`' >{{item.val || ''}}</view>
			<!-- 输入框 -->
			<view v-if = "item.type == 'input'" class = 'comFormItemV'>
				<input type="text" :placeholder="`请填写${item.title}`" v-model="state[item.ref]">
			</view>
			
			<!-- 单选框-->
			<view v-if = "item.type == 'radio'" class = 'comFormItemV'>
				<u-radio-group 
				    v-model="state[item.ref]"
				    placement="row">
					<u-radio v-for="item in item.options" :customStyle="{margin: '16rpx'}" :key = 'item' :name= 'item.key || item' :label="item.label || item"></u-radio>
					<!-- <u-radio activeColor="#2979FF" label="恨悠悠"></u-radio> -->
				</u-radio-group>
			</view>
			<!-- 复选框-->
			<view v-if = "item.type == 'checkBox'" class = 'comFormItemV'>
				<u-checkbox-group
				            placement="column"
				            @change="checkboxChange"
				        >
				            <u-checkbox
				                :customStyle="{marginBottom: '8px'}"
				                v-for="(item, index) in item.options"
				                :key="index"
				                :label="item.name"
				                :name="item.key"
				            >
				            </u-checkbox>
				        </u-checkbox-group>
			</view>
			<!-- 图片-->
			<view v-if = "item.type == 'picture'" class = 'comFormItemV'>
				<img v-if = 'item.val' class = 'comFormItemVImg' :src="`${BASE_FILE_URL}${item.val}`" alt="">
			</view>
			<!-- 照相 -->
			<view v-if = "item.type == 'photo'" class = 'comFormItemV' @click="getPhoto(item)">
				<img v-if = 'state.photoSrc' class = 'comFormItemVImg' :src="state.photoSrc[item.ref] || state.defPhotoSrc" alt="">
			</view>
			<!-- 录音 -->  
			<view v-if = "item.type == 'record'" class = 'comFormItemV'>
				<!-- <img v-if = 'state.photoSrc' class = 'comFormItemVImg' :src="state.photoSrc" alt=""> -->
				<view class = 'comFormItemTip' v-show = 'state.recordStatus == 0'  @click="getRecord()">
					开始录音(最长60s)
				</view>
				<view class = 'comFormItemTip' v-show = 'state.recordStatus == 1' @click="getRecord()">
					<text>点击结束 &nbsp;&nbsp;</text>
					<text class = 'comFormItemTipTime'>{{`00:${state.recordDuration < 10? '0': ''}${state.recordDuration}`}}</text>
				</view>
				<view class = 'comFormItemVBtns' v-show = 'state.recordStatus == 2'>
					<view class = 'comFormItemVBtn'>
						{{state.recordPlaying}}
						<u-button v-if = "!state.recordPlaying" type="primary" shape="circle" :ripple="true" size = 'small'  @click="recordPlay()">播放</u-button>
						<u-button v-else type="primary" shape="circle" :ripple="true" size = 'small'  @click="recordStop()">停止</u-button>
					</view>
					<view class = 'comFormItemVBtn'>
						<u-button type="primary" shape="circle" :ripple="true" size = 'small'  @click="recordDelete()">删除</u-button>
					</view>
				</view>
			</view>
			<!-- 时间选择器 --> 
			<view v-if = "['time', 'timeYMD'].includes(item.type)" class = 'comFormItemV' @touchmove.stop.prevent="() => {}">
				<u-datetime-picker
					:show="state.datetimeShowr"
					v-model="state[item.ref]"
					mode="datetime"
					:closeOnClickOverlay="true"
					@close="state.datetimeShowr = false"
					@cancel="state.datetimeShowr = false"
					@confirm="state.datetimeShowr = false"
				></u-datetime-picker>
				<view class = 'comFormItemTip' @click="state.datetimeShowr = true">
					{{dayjs(state[item.ref]).format('YYYY-MM-DD HH:mm:ss')}}
				</view>
			</view>
			<!-- 选择器 -->
			<view v-if = "item.type == 'picker'" class = 'comFormItemV' @touchmove.stop.prevent="() => {}">
				<u-picker 
					:show="state[`${item.ref}show`]" 
					:columns="item.options"
					:closeOnClickOverlay="true"
					@close="state[`${item.ref}show`] = false"
					@cancel="state[`${item.ref}show`] = false"
					@confirm="handlePicker($event,item)">
				</u-picker>
				<view class = 'comFormItemTip' @click="state[`${item.ref}show`] = true">
					{{state[`${item.ref}`]}}
				</view>
			</view>
			<!-- 打开用户列表 -->
			<view v-if = "['user', 'userById'].includes(item.type)" class = 'comFormItemV' @click="handleUserList(item)">
				<view class = 'comFormItemTip'>{{state[item.ref].name || ''}}</view>
			</view>
			<!-- 打开部门列表 -->
			<view v-if = "item.type == 'branch'" class = 'comFormItemV' @click="handleBranchList(item)">
				<view class = 'comFormItemTip'>{{state[item.ref].name || ''}}</view>
			</view>
			<!-- 工作简历 -->
			<view v-if = "item.type == 'list'" class = 'comFormItemV'>
				<view v-for = 'listItem in item.val' class = 'comFormListItem'>
					<view v-for = '(listItemVal, listItemKey) in listItem' class = 'comFormListItemObj'>
						<view class = 'comFormListItemObjL'>{{listItemKey}}: </view>
						<view>{{listItemVal}}</view>
					</view>
				</view>
			</view>
			<!-- 电子签字 -->
			<view v-if = "item.type == 'sign'" class = 'comFormItemV'>
				<view  v-if = 'state.signShow' class = 'comFormItemVSign'>
					<my_sign :ref = 'setItemRef(item)'></my_sign>
				</view>
				<view v-else class = 'comFormItemSign' @click="state.signShow = !state.signShow">
					<img class = 'comFormItemSignImg' :src="state[`${item.ref}_img`]" alt="">
				</view>
				<!-- <view  v-show = '!state.signShow' class = 'comFormItemVSign'> -->
					<!-- <signature :ref = 'setItemRef(item)'></signature>
					<my_sign :ref = 'setItemRef(item)'></my_sign>
				</view> -->
			</view>
			<!-- 表格 -->
			<view v-if = "item.type == 'table'" class = 'comFormItemV'>
				<view v-for = 'row in item.options' class = 'comFormItemVRow'>
					<view class = 'comFormItemVRowCell' v-for = 'cell in row'>
						<img  v-if = 'cell.cellType == "img"' :src="(BASE_FILE_URL + cell.imgSrc)" alt="" class = 'comFormItemVRowCellImg'>
						<view v-else>{{cell.name || ''}}</view>
					</view>
				</view>
			</view>
			<!-- 文件 -->
			<view v-if = "item.type == 'file'" class = 'comFormItemV' @click="comFormOpenFile(item)">
				点击查看文件>>
				
				<view class="comDocShow" v-if = 'state.formFileShow'>
					<web-view ref='fileShowWeb' :src="state.formFileUrl"></web-view>
				</view>
			</view>
		</view>
	</view>
	<view class = 'taskHideBtn' @click="handleSubmit()" v-show = 'formConfig.submitFn' >
		<u-button type="primary" shape="circle" :ripple="true" size = 'medium '>提交</u-button>
	</view>
	<view >
		<img :src="state.imgurl" alt="">
	</view>
	
	<userList ref = 'userListCom'></userList>
	
	<u-notify ref="uToast"></u-notify>
	<!-- <u-loadmore :show="state.isSubmitIng" mode="flower"></u-loadmore> -->
	<!-- <u-loading mode="circle"></u-loading> -->
	<!-- <u-modal v-model="state.isSubmitIng">
		
	</u-modal> -->
	<view v-show = 'state.isSubmitIng' class = 'comFormLoading'>
		<u-loading-icon text=""></u-loading-icon>
	</view>
	<!-- <u-loading-icon text="花朵形"></u-loading-icon> -->
</template>

<script setup>
	import { ref, onMounted, reactive, computed, onBeforeUnmount, nextTick, getCurrentInstance } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	// import signature from '@/uni_modules/jp-signature/components/jp-signature/jp-signature.vue'
	import useStore from '@/store/index.js'
	import dayjs from 'dayjs'
	import { BASE_FILE_URL, BASE_LINE_PRE } from '@/interface/constant.js'
	import { requestFileAdd, 
			requestTaskGoodSubmit, 
			requestClapSubmit, 
			requestClapReSubmit, 
			requestAcciReSubmit,
			requestDangerSubmit,
			requestDangerZGSubmit,
			requestDangerFHSubmit,
			requestAddAcciSub,
			requestAcciReportSubmit,
			requestAcciHandleSubmit,
			requestLetterSignSubmit,
			requestCreatSignSubmit,
			requestMorningMeetingSubmit,
			requestTaskCheckSub,
			requestTaskEnd} from '@/interface/index.js'
	
	//接收的参数
	const props = defineProps({
		config: '',
		title: '',
		data: '',
		imgurl: '',
	})
	// 传过来的参数
	// const formInfo = props.data ? JSON.parse(props.data): {}
	
	// 提交接口
	const interfaces = {
		requestTaskGoodSubmit,  //劳保提交
		requestCreatSignSubmit, // 安全责任制发起人签字
		requestLetterSignSubmit, // 安全责任制签字
		requestMorningMeetingSubmit, // 晨会
		requestTaskCheckSub,    //安全检查
		requestTaskEnd,			//安全检查完成
		requestClapSubmit,      //随手拍提交
		requestClapReSubmit,	//随手怕审核
		requestDangerSubmit,	// 随手拍上传  任务
		requestDangerZGSubmit,  // 随手拍 整改
		requestDangerFHSubmit,  // 随手拍 复核
		requestAddAcciSub,		// 事故新增
		requestAcciReSubmit,    // 事故确认
		requestAcciReportSubmit, // 事故上报
		requestAcciHandleSubmit, // 事故处理
	}
	
	
	// 动态数据
	const userListCom = ref()
	const uToast = ref()
	const instance = getCurrentInstance()
	
	// 根据变量设置ref, uniapp ref 只能在组件设置
	const itemRefs = ref({});
	const setItemRef = item => {
		return el => {
			if(el) {
				itemRefs.value[item.ref] = el
			}
		}
	}
	
	
	const store = useStore()
	const state = reactive({
		formInfo: props.data ? JSON.parse(props.data): {},
		isSubmitIng: false,
		defPhotoSrc: "/static/icon/camera.png",
		photoSrc: {},
		datetimeShowr: false,
		
		recordStatus: 0,				// 录音状态
		recorderManager: null,						// 录音实例
		canUseRecord: true,				//录音功能是否可用
		recordDuration: 0,
		recordPlaying: false,
		selectUser: '请选择责任人',
		
		signShow: false,
		submitParams:{},
		formFileShow: false,
		formFileUrl: '',
		
	})
	
	
	// 从传过来的获取，配置
	const formConfig = computed(() => (state.formInfo.config || {})) 
	
	
	// 从传过来的获取，dom列表项
	// const mainHideUpList = (() => {
	// 	if(state.formInfo && state.formInfo.domList) return state.formInfo.domList
	// 	if(state.formInfo) return state.formInfo
	// 	return []
	// })()
	
	const mainHideUpList = computed(() => {
		if(state.formInfo && state.formInfo.domList) return state.formInfo.domList
		if(state.formInfo) return state.formInfo
		return []
	})
	
	// 初始化数据
	const dataInit = () => {
		mainHideUpList.value.map(item => {
			// if(item.type == 'input') {
			// 	state[item.ref] = ''
			// }
			if(['input'].includes(item.type)) {
				state[item.ref] = ''
			}
			if(item.type == 'branch'){
				state[item.ref] = item.val || {name: '请选择部门'}
			}
			if(item.type == 'user' || item.type == 'userById'){
				state[item.ref] = item.val || {name: `请选择${item.title}`}
			}
			if(item.type == 'radio') {
				if(item.val){
					state[item.ref] = item.val
				} else {
					state[item.ref] = item.options[0]
				}
			}
			if(['timeYMD', 'time'].includes(item.type)) {
				state[item.ref] = Date.now()
			}
			if(item.type == 'picker') {
				state[item.ref] = `请选择${item.title}`
			}
			if(item.type == 'sign') {
				state[`${item.ref}_img`] = item.val? (BASE_FILE_URL + item.val) : '/static/icon/sign.png'
			}
			if(item.type == 'table'){
				console.log(item.options)
			}
			
			console.log(item.ref,state[item.ref])
		})
	}
	dataInit()
	
	// 方法
	//调取相机
	const getPhoto = obj => {
		uni.chooseImage({
		  count: 1, // 最多选择一张图片
		  sourceType: ['album','camera'], // 只允许从相机选择  'album'相册
		  success: (res) => {
		    const tempFilePaths = res.tempFilePaths
		    // 在这里处理图片文件
			console.log(tempFilePaths)
			state.photoSrc[obj.ref] = tempFilePaths[0]
		  }
		})
	}
	
	// 调取录音初始化
	const recordInit = () => {
		if (dd.canIUse('getRecorderManager')) {
			state.recorderManager = dd.getRecorderManager();//录音管理器
			state.recorderManager.onstart = () => {
				console.log('开始录音');
			}
			state.recorderManager.onstop = (res) => {
				console.log('结束录音');//res.tempFilePath
				// this.data.recordAudioArr.push(res.tempFilePath);
				// this.setData({
				//   recordAudioArr: this.data.recordAudioArr
				// });
				// console.log(this.data.recordAudioArr);
				state.voidPath = res.tempFilePath
				console.log(res.tempFilePath)
			}
			state.recorderManager.onerror = (err) => {
				dd.showToast({content: JSON.stringify(err)});
			}
		} else {
			state.canUseRecord = false;
			dd.showToast({content: '请升级钉钉版本至4.5.18以支持录音功能'});
		}
	}
	// 初始化播放
	const bgmInit = () => {
		state.audioManager = dd.getBackgroundAudioManager();//背景音频管理器
		//监听背景音频错误事件, 错误类型（10001-系统错误 10002-网络错误 10003-文件错误 10004-格式错误）
		state.audioManager.onError = (err) => {
			dd.showToast({content: JSON.stringify(err)});
		}
	}
	let timerSecond = null
	const getRecord = () => {
		if(!state.recorderManager) recordInit()
		if(!state.canUseRecord) return
		//录音三个状态 未开始0，正在1，已经完成2
		// 未开始时点击开始
		if (state.recordStatus == 0) {
			state.recordStatus = 1
			state.recorderManager.start({ duration: 60 });
			timerSecond = setInterval(() => {
				if(state.recordDuration < 60) {
					state.recordDuration++
				}else {
					clearInterval(timerSecond)
					timerSecond = null
				}
			}, 1000)
			return
		} 
		// 开始时点击结束
		if (state.recordStatus == 1){
			clearInterval(timerSecond)
			timerSecond = null
			state.recordStatus = 2
			state.recorderManager.stop()
			return
		}
	}
	
	// 开始播放录音
	const recordPlay = (e) => {
		if(!state.audioManager) bgmInit()
		state.recordPlaying = true
		state.audioManager.src = state.voidPath
	    state.audioManager.title = '';//不实例化此属性，ios调用多次play()，playbackRate会累加
	    state.audioManager.play();
	}
	
	// 停止播放录音
	const recordStop = (e) => {
		state.audioManager.src = state.voidPath
	    state.audioManager.title = '';//不实例化此属性，ios调用多次play()，playbackRate会累加
	    state.audioManager.stop();
		state.recordPlaying = false
	}
	
	// 删除录音
	const recordDelete = (e) => {
		if(!state.audioManager) return
		recordStop()
		state.recordStatus = 0
		state.voidPath = ''
	}
	
	
	// 下拉框的选择事件
	const handlePicker = (e, obj) => {
		state[`${obj.ref}show`] = false
		state[`${obj.ref}`] = e.value[0]
		console.log(state[`${obj.ref}`])
	}
	
	// 操作用户列表
	// 回调函数
	const getUserName = params => {
		console.log(params)
	}
	
	// 打开用户列表
	const handleUserList = obj => {
		if(obj.type == 'userById'){
			handleBranchList(obj)
			return
		}
		
		uni.$u.route({
			url: '/pages/comUserList/comUserList',
			animationDuration: 300,
			animationType: 'slide-in-bottom',
			params: {
				callData: JSON.stringify(obj)
			}
		})
	}
	
	// 打开部门列表
	const handleBranchList = obj => {
		uni.$u.route({
			url: "pages/comBranchList/comBranchList",
			animationDuration: 300,
			animationType: 'slide-in-bottom',
			params: {
				callData: JSON.stringify(obj)
			}
		})
	}
	
	// 打开文件
	const comFormOpenFile = obj => {
		state.formFileShow = true
		console.log(`${BASE_LINE_PRE}${obj.val}`)
		state.formFileUrl = `${BASE_LINE_PRE}${BASE_FILE_URL}${obj.val}`
	}
	
	// 弹窗
	const showToast = text => {
		uToast.value.show({
			top: 10,
			type: 'primary',
			message: text || "请填写完整",
			duration: 1000 * 3,
			safeAreaInsetTop:false
		})
	}
	
	const checkboxChange = obj => {
		console.log(obj)
	}
	
	// 上传文件
	const uploadFile = (obj, path) => Promise.all(mainHideUpList.value.map(async (item) => {
			if(item.type == "photo" && (!item.show || (item.show && (state[item.show.ref] == item.show.val)))){
				let filePath = state.photoSrc[item.ref]
				// if(!filePath) {
				// 	showToast()
				// 	return
				// }
				await requestFileAdd(filePath).then(res => {
					if(res.data){
						let resObj = JSON.parse(res.data)
						console.log(resObj)
						state.submitParams[item.key] = resObj.message
					}
				})
			}
			// 录音
			if(item.type == "record" && (!item.show || (item.show && (state[item.show.ref] == item.show.val)))){
				let filePath = state.voidPath
				console.log(filePath)
				// if(!filePath) {
				// 	showToast()
				// 	return
				// }
				if(!filePath) return
				await requestFileAdd(filePath).then(res => {
					
					console.log(res)
					if(res.data){
						let resObj = JSON.parse(res.data)
						state.submitParams[item.key] = resObj.message
					}
				})
			}
			if(item.type == "sign" && (!item.show || (item.show && (state[item.show.ref] == item.show.val)))){
				let dom = itemRefs.value[item.ref]
				// 画板
				// const fn = () => new Promise(async (resolve, rej) => {
				// 	await dom.canvasToTempFilePath({
				// 		success: (res) => {
				// 			// 是否为空画板 无签名
				// 			// if(res.isEmpty) {
				// 			// 	showToast()
				// 			// 	return
				// 			// }
							
				// 		   let path = res.tempFilePath || res.filePath;
				// 			uni.showToast({
				// 				title: '转成图片成功'+ JSON.stringify(res) ,
				// 				duration:1000 * 5
				// 			});
								
				// 			resolve(path)
				// 		}
				// 	})
				// }, instance)
				// let signFilePath = await fn().then(r => r).catch(e => e)
				
				let signFilePath = await dom.signDown().then(res => res)
				console.log(signFilePath)
				// 保存
				await requestFileAdd(signFilePath).then(res => {
					if(res.data){
						let resObj = JSON.parse(res.data)
						state.submitParams[item.key] = resObj.message
					}
				})
			}
		}))
	
	// let isSubmitInt = false
	// 提交
	const handleSubmit = async () => {
		if(state.isSubmitIng){
			showToast('正在提交，请稍后操作！')
			return
		}
		state.isSubmitIng = true
		state.submitParams = {}   // 这样才能出发这个值改变
		// 处理上传
		await uploadFile()
		mainHideUpList.value.map(item => {
			if( ['input', 'radio', 'picker'].includes(item.type) ){
				state.submitParams[item.key] = state[item.ref]
			}
			if( ['text', 'picture'].includes(item.type) ){
				state.submitParams[item.key] = item.val
				
			}
			if( ['branch', 'user'].includes(item.type) ){
				state.submitParams[item.key] = state[item.ref].id
				
			}
			if(item.type == 'time') {
				state.submitParams[item.key] = dayjs(state[item.ref]).format('YYYY-MM-DD HH:mm:ss')
			}
			if(item.type == 'timeYMD') {
				state.submitParams[item.key] = dayjs(state[item.ref]).format('YYYY-MM-DD')
			}
		})
		console.log(formConfig)
		// 其他参数
		if(formConfig.value.params){
			state.submitParams = { ...formConfig.value.params, ...state.submitParams }
		}
		
		console.log('submitParams',state.submitParams)
		// 传过来的提交方法
		const result = await interfaces[formConfig.value.submitFn](state.submitParams)
		// // console.log(result)
		showToast(result.data.message)
		
		setTimeout(() => {
			
			state.isSubmitIng = false
			if(formConfig.value.handleOthers && formConfig.value.handleOthers.length){
				console.log(formConfig.value.handleOthers)
				
				let nextPro = formConfig.value.handleOthers.shift()
				if(formConfig.value.handleOthers.length){
					nextPro.config.handleOthers = formConfig.value.handleOthers
				}
				state.formInfo = nextPro
				dataInit()
				
				return 
			} else {
				uni.$u.route({
					type: 'back',
					success: function() {
						beforePage.dasabi(); // 执行前一个页面的方法
					},
				})
			}
		}, 1500)
	}
	
	onShow(() => {
		// 员工
		uni.$once('selectStaff',function(data){
			// TODO 下面执行刷新的方法
			let obj = JSON.parse(data)
			// state.selectUser = data
			state[obj.callData.ref] = obj
			console.log(state[obj.callData.ref])
		})
		
		// 部门
		uni.$once('selectBranch',function(data){
			const obj = JSON.parse(data)
			// if(obj.callData.type == 'user') {
			// 	handleUserList(obj)
			// 	return
			// }
			state[obj.callData.ref] = obj.node
			console.log(state[obj.callData.ref])
		})
		
		uni.setNavigationBarTitle({
			title: props.title || ''
		})
		
		state.formFileShow = false
		state.isSubmitIng = false
		

	})
	
	
	// 结束时去掉定时器
	onBeforeUnmount(() => {
		clearInterval(timerSecond)
		timerSecond = null
	})
	
</script>

<style lang="scss">
	.comForm{
		padding: 32rpx;
		background-color: #fff;
		transition: transform 1s;
		
		.comFormItem{
			border-bottom: 1rpx solid #e5e5e5;
			line-height: 56rpx;
			padding: 30rpx 0;
			color: #0F1115;
			
			.comFormItemT{
				display: inline-block;
				padding-right: 60rpx;
				background: linear-gradient(to bottom, #ffffff 60%, #E8F0FD 60%, #E8F0FD 100%);
				color: #626A74;
				
			}
			
			.comFormItemV{
				margin-top: 26rpx;
				position: relative;
				
				.comFormItemVImg{
					width: 248rpx;
					height: 248rpx;
					background-color: #e5e5e5;
					border: 1px solid #e5e5e5;
				}
				
				.comFormItemTip{
					color: #626A74;
					
					.comFormItemTipTime{
						margin-left: 48rpx;
					}
				}
				
				.comFormItemVBtns{
					display: flex;
					.comFormItemVBtn{
						width: 96rpx;
						margin-left: 48rpx;
					}
				}
				
				.comFormListItem{
					background-color: #fff;
					border-radius: 8rpx;
					overflow: hidden;
					border-left: 6rpx solid #4285F4;
					margin: 12rpx 0;
					padding: 24rpx;
					
					.comFormListItemObj{
						height: 68rpx;
						display: flex;
						
						.comFormListItemObjL{
							margin-right: 12rpx;
						}
					}
				}
				.comFormItemVSign{
					height: 328rpx;
				}
				.comFormItemSign{
					// width: 192rpx;
					width: 100%;
					height: 100%;
					min-height: 280rpx;
					// box-shadow: 0 0 8rpx #626A74;
					padding: 16rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: center;
					border-radius: 8rpx;
					touch-action: none;
					// position: absolute;
					
					.comFormItemSignImg{
						// width: 56rpx;
						// height: 56rpx;
						width: 200rpx;
						height: 200rpx;
					}
				}
				
				.comFormItemVRow{
					display: flex;
					justify-content: space-between;
					
					.comFormItemVRowCellImg{
						width: 60px;
						height: 36px;
					}
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
	
	.comFormLoading{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0,0,0,0.1);
	}
</style>