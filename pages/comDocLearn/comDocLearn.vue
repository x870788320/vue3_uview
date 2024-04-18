<template>
	<view class = 'comDoc'>
		<!-- <view class = 'uni-title'>{{state.title}}</view> -->
		<view class = 'comDocContainer'>
			<view v-for = 'item in state.docList' class = 'comDocItem' @click="openDocment(item)">
				<img class = 'comDocItemImg' :src="`/static/office/${getFileType(item.file1) || 'link'}.png`" alt="">
				<view class = 'comDocItemMsg'>
					<view>{{item.name || item.title || ""}}</view>
					<view v-if= 'item.secName' class = 'comDocItemMsgSec'>{{item.secName}}</view>
					<!-- <text class = 'comDocItemMsg'>{{item.name || item.title || ""}}</text> -->
				</view>
				<text class = 'comDocItemTime' v-if = 'item.rightVal'>{{item.rightVal || ''}}</text>
			</view>
		</view>
		<view v-if = 'state.docBtn' class = 'comFormBtnCon'>
			<u-button type="primary" shape="circle" :ripple="true"  @click="handleDocBtn()">{{state.docBtnText || ''}}</u-button>
		</view>
		<view class="comDocShow" v-if = 'state.fileShow'>
			<web-view ref='fileShowWeb' :src="state.posFileSrc" @message="webCallback"></web-view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed,  } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	
	
	import { requestTaskPlanContent, 
		requestKnowPostInfo,
		requestKnowLawInfo,
		requestKnowRuleInfo,
		requestKnowFactorInfo,
		requestFileAdd,
		requestTrainLearnSubmit} from '@/interface/index.js'
	import { BASE_FILE_URL, BASE_LINE_PRE } from '@/interface/constant.js'
	import {GET_STORAGE} from '@/utils/storage/user_storage.js'
	import { getFileType, formatDate } from '@/utils/index.js'
	
	
	const user = GET_STORAGE('USER') || {}
	//接收的参数
	const props = defineProps({
		config: '',
	})
	// 动态数据
	const store = useStore()
	const state = reactive({
		// taskType: 1,
		title: '',
		configObj: JSON.parse(props.config),
		docList: [],
		complateTimer: null,
		posFileSrc: '',
		fileShow: false,
		fileSrc: '',
		fileType: 'word',
		taskPlanPhone:'',
		curentDocInfo: {},
		docBtn: false,
		docBtnText: '',
	})
	
	const fileShowWeb = ref()
	
	const fileUrl = computed(() => {
		console.log((BASE_LINE_PRE + state.posFileSrc))
		// https://mowenxiaosheng.com.cn/444.docx
		let url = ''
		if(state.posFileSrc) {
			// url = state.posFileSrc.slice(0,4) == 'http'? state.posFileSrc: (BASE_LINE_PRE + encodeURIComponent(state.posFileSrc))
			let type = getFileType(state.posFileSrc) || 'other'
			console.log(type)
			url =  ['other', 'link'].includes(type)? state.posFileSrc: (BASE_LINE_PRE + encodeURIComponent(state.posFileSrc))
			
		} else {
			uni.showToast({
				title: '未发现文件，请联系管理员！',
				duration:1000 * 2
			});
		}
		console.log(url)
		return url
		
		// return state.posFileSrc? (BASE_LINE_PRE + encodeURIComponent('http://static.shanhuxueyuan.com/test6.docx')) : ''
		// return state.posFileSrc? (BASE_LINE_PRE + encodeURIComponent('http://static.shanhuxueyuan.com/demo/excel.xlsx')) : ''
		// return state.posFileSrc? (BASE_LINE_PRE + encodeURIComponent('http://static.shanhuxueyuan.com/test.pdf')) : ''
		// return state.posFileSrc? (BASE_LINE_PRE + encodeURIComponent('http://www.cq.gov.cn/masvod/public/2020/06/11/20200611_172a2af131a_r1_1200k.mp4'))
		// return state.posFileSrc? (BASE_LINE_PRE + encodeURIComponent('http://58.58.47.142:9080/ssc-dzsh/1/6ae5cdf5330d489aaca5626e28a377aa.jpg')) : ''
		
		// return 'http://mowenxiaosheng.com.cn/open_office/?src=http://58.58.47.142:9080/ssc-dzsh/1/3a86a0011d1d43e2b90035c7f996fc81.pdf&time=30'
	})
	
	// 获取文档数据
	const getDocData = async () => {
		let params = {  }
		let docInterData = null
		// 任务 
		if(state.configObj.from == 'taskPlan'){
			// docInterData = await requestTaskPlanContent(state.configObj.id).then(res => res).catch(e => e)
			let docInterData = await requestTaskPlanContent(state.configObj.id).then(res => res).catch(e => e)
			// rightVal
			// params.type = '培训文件'
			
			if(!docInterData || !docInterData.data || !docInterData.data.t){
				return
			}
			state.paperInfo = docInterData.data.t.paper
			let dataObj = docInterData.data.t.eduList || []
			
			state.docList = dataObj.map(item => {
				return ({
					...item,
					rightVal: item.status == 2? '已完成': `需学习：${item.setTime || 0}学时`,
					
					// secName: item.status == 2? '已完成': '点击开始'
				})
			})
			state.docBtn = state.docList.every(item => (item.status == 2))
			state.docBtnText = '已完成培训'
			console.log('docInterData',state.docList)
			return 
		}
		// 应知应会
		if(state.configObj.from == 'know'){
			params.page = 1
			// 岗位职责\操作流程\安全知识\岗位风险告知
			if( state.configObj.inter == 'Post' ){
				params.type = state.configObj.key
				docInterData = await requestKnowPostInfo(params).then(res => res).catch(e => e)
			}
			// 法律法规
			if(state.configObj.inter == 'Law'){
				params.type = '法律法规'
				docInterData = await requestKnowLawInfo(params).then(res => res).catch(e => e)
			}
			// 规章制度
			if(state.configObj.inter == 'Rule'){
				docInterData = await requestKnowRuleInfo(params).then(res => res).catch(e => e)
			}
			// 职业病风险告知
			if(state.configObj.inter == 'Factor'){
				docInterData = await requestKnowFactorInfo(params).then(res => res).catch(e => e)
			}
			
			console.log('docInterData',docInterData)
			if(!docInterData || !docInterData.data || !docInterData.data.t){
				return
			}
			state.docList = docInterData.data.t.content || []
		}
	}
	// getDocData()
	
	
	// 方法
	// 打开文档
	function openDocment(obj) {
		console.log(obj)
		state.curentDocInfo = obj
		let time = ''
		if(obj.status != 2 && obj.setTime) {
			time = `&time=${obj.setTime * 60 * 45}`
		}
		// if(state.configObj.from == 'taskPlan'){
		// 	uni.showToast({
		// 		title: '请切换至前置摄像头',
		// 		duration:1000 * 2
		// 	});
		// 	uni.chooseImage({
		// 		count: 1, // 最多选择一张图片
		// 		sourceType: ['camera'], // 只允许从相机选择  'album'相册
		// 		success: async (res) => {
		// 			console.log(res)
		// 			const tempFilePaths = res.tempFilePaths
		// 			// 在这里处理图片文件
		// 			console.log(tempFilePaths)
		// 			// state.photoSrc[obj.ref] = tempFilePaths[0]
					
		// 			await requestFileAdd(tempFilePaths[0]).then(res => {
		// 				if(res.data){
		// 					let resObj = JSON.parse(res.data)
		// 					console.log(resObj)
		// 					state.taskPlanPhoto = resObj.message
		// 					state.startTime = new Date().getTime();
							
							
		// 					let file = obj.file1 || obj.file2 || ''
		// 					handleFileUrl({file, time})
		// 					// console.log(state.submitParams[item.key])
							
		// 					// let file = obj.file1 || obj.file2 || ''
		// 					// state.posFileSrc = `${file.slice(0,4) == 'http'? '': BASE_FILE_URL}${file}${time}`
		// 					// state.fileShow = true
							
		// 					// handleFileUrl()
		// 				}
		// 			})
		// 		}
		// 	})
		// 	return 
		// }
		// console.log(`${obj.file1.slice(0,4) == 'http'? '': BASE_FILE_URL}${obj.file1}`)
		// state.posFileSrc = `${obj.file1.slice(0,4) == 'http'? '': BASE_FILE_URL}${obj.file1}`
		// state.fileShow = true
		let file = obj.file1 || obj.file2 || ''
		handleFileUrl({file, time})
		return
	}
	
	const handleFileUrl = obj => {
		console.log(obj)
		
		
		if(obj.file) {
			// url = state.posFileSrc.slice(0,4) == 'http'? state.posFileSrc: (BASE_LINE_PRE + encodeURIComponent(state.posFileSrc))
			let type = getFileType(obj.file) || 'other'
			console.log(type)
			// url =  ['other', 'link'].includes(type)? state.posFileSrc: (BASE_LINE_PRE + encodeURIComponent(state.posFileSrc))
			let allSrc = `${obj.file.slice(0,4) == 'http'? '': BASE_FILE_URL}${obj.file}`
			state.posFileSrc =  ['other', 'link'].includes(type)? allSrc: (BASE_LINE_PRE + encodeURIComponent(allSrc + obj.time))
			
			console.log(state.posFileSrc)
			uni.showToast({
				title: state.posFileSrc,
				duration:1000 * 2
			});
			
			let timeNum = obj.time.split('=')[1] - 0
			if(timeNum > 0) {
				console.log(timeNum)
				clearTimeout(state.complateTimer)
				state.complateTimer = setTimeout(() => {
					// uni.showToast({
					// 	title: '已经完成学习！',
					// 	duration:1000 * 2
					// });
					complateLearn()
				}, timeNum * 1000)
			}
			setTimeout(() => {
				
				state.fileShow = true
			}, 2000)
		} else {
			uni.showToast({
				title: '未发现文件，请联系管理员！',
				duration:1000 * 2
			});
		}
		
		
		
		
		// state.posFileSrc = `${file.slice(0,4) == 'http'? '': BASE_FILE_URL}${file}${time}`
		// state.fileShow = true
	}
	
	// 倒计时结束的方法
	const webCallback = () => {
		console.log('变更出发方式')
	}
	
	const complateLearn = async () => {
		// console.log(e)
		// if(e.detail.status){
			console.log('学习完成')
			let startArr = formatDate(state.startTime)
			let endArr = formatDate()
			
			if(state.configObj.from == 'taskPlan'){
				const params = {
					peId: state.curentDocInfo.id,
					startTime: `${startArr[0]}-${startArr[1]} ${startArr[3]}:${startArr[4]}`,
					endTime: `${endArr[0]}-${endArr[1]} ${endArr[3]}:${endArr[4]}`,
					status: 2,
					avatar: state.taskPlanPhoto || '',
					imgs:user.portrait,
				}
				
				requestTrainLearnSubmit(params).then(res => {
					console.log(res)
					uni.showToast({
						title: '学习完成!',
						duration:1000 * 2
					});
				})
			}
		// }
	}
	
	const handleDocBtn = () => {
		console.log(3333)
		// pages/comExam/comExam
		let obj = state.configObj
		console.log(obj)
		obj.title = '培训考试'
		obj.from = 'taskPlan'
		obj.paper = state.paperInfo
		uni.$u.route({
			url: '/pages/comExam/comExam',
			params: {
				config: JSON.stringify(obj)
			}
		})
	}
	
	onShow(() => {
		getDocData()
		uni.setNavigationBarTitle({
			title: state.configObj.title || ''
		})
		clearTimeout(state.complateTimer)
	})
	// 添加title
	onMounted(() => {
		console.log(props.configObj)
	})
</script>

<style lang="scss">
	.comDoc{
		padding: 32rpx;
		background-color: #F2F3F8;
		
		.comDocContainer{
			
			.comDocItem{
				height: 112rpx;
				display: flex;
				align-items: center;
				background-color: #fff;
				margin-top: 32rpx;
				border-radius: 16rpx;
				
				.comDocItemImg{
					width: 32rpx;
					height: 34rpx;
					margin-left: 32rpx;
				}
				
				.comDocItemMsg{
					flex: 1;
					color: #0F1115;
					font-weight: 500;
					margin-left: 36rpx;
					
					.comDocItemMsgSec{
						font-size: 24rpx;
						margin-top: 12rpx;
					}
				}
				
				.comDocItemTime{
					font-size: 24rpx;
					color: #626A74;
					margin: 0 32rpx;
				}
			}
		}
		
		.comFormBtnCon{
			width: 320rpx;
			margin: 40rpx auto;
		}
		
		.comDocShow{
			width: 100%;
			height: 90%;
			position: relative;
			top: 10%;
			
			.comDocShowBtn {
				width: 72rpx;
				height: 72rpx;
				background-color: #626A74;
				position: absolute;
				right: 80rpx;
				top: 80rpx;
			}
		}
		
	}
</style>