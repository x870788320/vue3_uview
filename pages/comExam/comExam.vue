<template>
	<view class = 'comExam'>
		<view v-show = 'state.examPrepare' class = 'comExamPre'>
			<view class="comExamPreT">考试须知</view>
			<view v-for = 'str in examPreList' class="comExamPreLine">
				<img class="comExamPrePoint" src="/static/icon/point.png" alt="">
				<text class = 'comExamPreText'>{{str}}</text>
				<text v-if = 'str.includes("成绩为")' class="comExamPreLook" @click="lookSubJect(str)">查看试卷</text>
			</view>
			
			<view class = 'comExamBtnCon' v-if = 'examBtnShow'>
			<!-- <view class = 'comExamBtnCon' v-if = 'true'> -->
				<u-button type="primary" shape="circle" :ripple="true"  @click="startExam()">{{state.isExtra? '补考答题':'开始考试'}}</u-button>
			</view>
		</view>
		<!-- 考试题 -->
		<view v-if = '!state.examPrepare' class = 'comExamMain'>
			<view class="comExamMainTime">{{state.showTime}}</view>
			<view  class = 'comExamPtypeLine'>
				<view class = 'comExamPtype'>{{['判断题','单选题','多选题'][state.curentSub.type - 1]}}</view>
				<!-- <view> -->
				<img  class = 'comExamPImg' :src="`/static/icon/${state.isColl? 'collectDel':'collectAdd'}.png`" alt="" @click="subIsColl()">
				<!-- </view> -->
			</view>
			<view class = 'comExamPTitle'>{{state.curentSub.title}}</view>
			<view class="comExamPItem" 
				v-for = '(item, index) in state.curentSub.options.split("|")' 
				@click="selectAnswer(item, codeList[index])"
				:class="{comExamPItemSe: isIncludesAns(codeList[index])}">
				<text class = 'comExamPItemLeft'>{{codeList[index]}}.</text>
				<text>{{item}}</text>
			</view>
			<view class="comExamPBottom">
				<view @click="changeSubject(true)">上一题</view>
				<view>{{state.curentSubId}}/{{state.paperList.length}}</view>
				<view @click="changeSubject()">{{state.paperList.length == state.curentSubId? '提交': '下一题'}}</view>
			</view>
		</view>
		
		<u-popup :show="state.popupShow" :round="10" mode="center" :safeAreaInsetBottom='false' @close="popupClose" @open="popupOpen">
			<view class = 'popupContainer'>
				<view class = 'popupMainText' v-show = 'state.popTexts.texts.length'>
					<view v-for = 'text in state.popTexts.texts'>{{text}}</view>
				</view>
				<view v-if = 'state.popTexts.type == "sign"' class = 'comFormItemVSign'>
					<!-- <signature ref = 'popupSign'></signature> -->
					
					<my_sign ref = 'popupSign'></my_sign>
				</view>
				<view class = 'popupMainBtns'>
					<view class = 'popupMainBtnItem' @click="popupClose()">取消</view>
					<view class = 'popupMainBtnItem popupMainBtnsConfirm' @click="popupConfirm()">确定</view>
				</view>
			</view>
		</u-popup>
		
		<u-notify ref="uToast"></u-notify>
	</view>
</template>

<script setup>
	
	import { ref, onMounted, reactive, computed } from 'vue'
	// import signature from '@/uni_modules/jp-signature/components/jp-signature/jp-signature.vue'
	import { onShow, onHide } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestTaskPlanInfo, requestTaskPlanContent, requestFileAdd, requestPlanPaperInfo, requestPlanPaperIbank, requestPlanExtraPaper, requestPlancollectAdd, requestPlancollectDel  } from '@/interface/index.js'
	import { formatDate, getTiming, orderCode } from '@/utils/index.js'
	import {GET_STORAGE} from '@/utils/storage/user_storage.js'
	
	const user = GET_STORAGE('USER') || {}
	//接收的参数
	const props = defineProps({
		config: '',
	})
	
	const popupSign = ref()
	const uToast = ref()
	const configObj = JSON.parse(props.config)
	// 数据
	
	//培训的项配置
	const examPreList = [
		'考试限时，请在规定时间内答完题目。',
		'考试不满80分，请重新考试。',
		'需学习完成全部课件后才可进行本次考试。',
	]
	const store = useStore()
	const state = reactive({
		examPrepare: true,
		taskExamPhoto: '',
		popupShow: false,
		popTexts: {texts:[]},
		// paperList: [],
		timer: null,
		paperList: [],
		curentSubId: 1,
		curentSub:{options:''},
		subjectAnswer:[{answer: ''}],
		examPreList,
		isExtra: false,
		isColl: false,
		overTime: false,
	})
	
	const codeList = ['A','B','C','D','E','F','G']
	
	if(configObj && configObj.paper) {
		if(configObj.paper.score != undefined){
			state.examPreList.push(`本次考试成绩为：${configObj.paper.score}`)
		}
		if(configObj.paper.extraScore != undefined){
			state.examPreList.push(`本次补考成绩为：${configObj.paper.extraScore}`)
		}
		
		if(configObj.paper.score < 80){
			state.isExtra = true
		}
	}
	
	const isIncludesAns = computed(_ => answer => {
		let is = false
		if(state.subjectAnswer && state.subjectAnswer[state.curentSubId - 1] && state.subjectAnswer[state.curentSubId - 1].answer) {
			is = state.subjectAnswer[state.curentSubId - 1].answer.includes(answer)
		}
		return is
	})
	
	const examBtnShow = computed(() => {
		let isShow = true
		if(configObj.paper.extraScore != undefined){
			isShow = false
		}
		if(configObj.paper.score && (configObj.paper.score - 0) >= 80){
			isShow = false
		}
		return isShow
	})
	// 获取线上数据
	const getPlanInfo = async () => {
		let params = {
			page:1,
			size:100,
			// name:state.traninSearch
			name:''
		}
		const interPlanInfo = await requestTaskPlanInfo(params).then(r => r).catch(e => {})
		
		if(!interPlanInfo.data || !interPlanInfo.data.t) {
			return
		}
		let content = interPlanInfo.data.t.content || []
		state.planInfo = content.map(item => {
			let startTArr = formatDate(item.startTime)
			let startTStr = `${startTArr[0]}-${startTArr[1]} ${startTArr[3]}`
			let endTArr = formatDate(item.endTime)
			let endTStr = `${endTArr[0]}-${endTArr[1]} ${endTArr[3]}`
			item.time = `${startTStr}~${endTStr}`
			return item
		})
		state.planShowInfo = state.planInfo
	}
	
	
	// 方法
	// 点击开始考试
	const startExam = e => {
		state.examPrepare = !state.examPrepare
		
		// state.popupShow = true
		// state.popTexts = {
		// 	type: 'start',
		// 	texts: ['是否开始考试?', '开始答题后不能退出!']
		// }
		// return
		
		if(configObj.from == 'taskPlan'){
			uni.showToast({
				title: '请切换至前置摄像头',
				duration:1000 * 2
			});
			uni.chooseImage({
				count: 1, // 最多选择一张图片
				sourceType: ['camera'], // 只允许从相机选择  'album'相册
				success: async (res) => {
					console.log(res)
					const tempFilePaths = res.tempFilePaths
					// 在这里处理图片文件
					console.log(tempFilePaths)
					// state.photoSrc[obj.ref] = tempFilePaths[0]
					
					await requestFileAdd(tempFilePaths[0]).then(res => {
						if(res.data){
							let resObj = JSON.parse(res.data)
							console.log(resObj)
							state.taskExamPhoto = resObj.message
							state.startExamTime = new Date().getTime();
							state.popupShow = true
							state.popTexts = {
								type: 'start',
								texts: ['是否开始考试?', '开始答题后不能退出!']
							}
						}
					})
				}
			})
			return 
		}
	}
	
	const popupClose = () => {
		const type = state.popTexts.type
		
		if(state.overTime){
			return
		}
		
		if(type == 'submit') {
			state.popupShow = false
			return
		}
		state.popupShow = false
		state.popTexts = {texts:[]}
		uni.$u.route({
			type: 'back',
		})
	}
	
	const popupOpen = () => {
		console.log('popupOpen')
	}
	
	// 弹窗确认
	const popupConfirm = () => {
		state.popupShow = false
		const type = state.popTexts.type
		if(type == 'start'){
			state.popTexts = {
				type: 'sign',
				texts: ['请先签字后进行考试!']
			}
			state.popupShow = true
		}
		if(type == 'sign'){
			state.popTexts = {texts:[]}
			saveSign()
			randerPaper()
		}
		
		if(type == 'submit') {
			let startTArr = formatDate(state.startExamTime)
			let endTArr = formatDate()
			let tpId = state.isExtra? configObj.paper.extraTpId: configObj.paper.tpId
			console.log(333333)
			// `items[${i}].${item}`, obj[item]
			
			let params = {
				tpId,
				startTime: `${startTArr[0]}-${startTArr[1]} ${startTArr[3]}:${startTArr[4]}`,
				endTime: `${endTArr[0]}-${endTArr[1]} ${endTArr[3]}:${startTArr[4]}`,
				// sign:state.signImgUrl,
				imgs:user.portrait || '',
				avatar:state.taskExamPhoto || '',
			}
			
			params.sign = state.signImgUrl || ''
			
			let items = state.subjectAnswer.map((obj , i) => {
			    Object.keys(obj).map(item => {
					params[`items[${i}].${item}`] = obj[item]
			    })
			})
			// 计算得分
			let Corrects = state.subjectAnswer.filter(item => item.correct)
			let score = (Corrects.length / state.subjectAnswer.length * 100).toFixed(1)
			const fn = state.isExtra? requestPlanExtraPaper: requestPlanPaperIbank
			console.log(params)
				// const {avatar,imgs,tpId,sign} = params
				// state.popTexts = {
				// 	type: '1111',
				// 	texts: [params.avatar,params.imgs,params.tpId,params.sign]
				// }
				// state.popupShow = true
			fn(params).then(r => {
				console.log(r)
				if(r.data.success){
					state.popTexts = {
						type: 'result',
						texts: [`考试成绩: ${score}`, '如未达到80分需参加补考！']
					}
					state.popupShow = true
					
				} else{
					uToast.value.show({
						top: 10,
						type: 'primary',
						message: "网络原因请稍后再试",
						duration: 1000 * 3,
						safeAreaInsetTop:false
					})
				}
			})
		}
		
		if(type == 'result') {
			state.popupShow = false
			state.popTexts = {texts:[]}
			uni.$u.route({
				type: 'back',
			})
		}
	}
	
	// 画板
	const handleCanvas = () => new Promise(async (resolve, rej) => {
		await popupSign.value.canvasToTempFilePath({
			success: (res) => {
				// 是否为空画板 无签名
				// if(res.isEmpty) {
				// 	rej('')
				// 	return
				// }
				
				// state.popTexts = {
				// 	type: '1111',
				// 	texts: [res.tempFilePath]
				// }
				// state.popupShow = true
				resolve(res.tempFilePath)
			}
		})
	})
	const saveSign = async () => {
		
		// let signFilePath = await handleCanvas().then(r => r).catch(e => e)
		
		let signFilePath = await popupSign.value.signDown().then(res => res)
		// 保存
		await requestFileAdd(signFilePath).then(res => {
			console.log(res)
			if(res.data){
				let resObj = JSON.parse(res.data)
				state.signImgUrl = resObj.message
			}
		})
	}
	
	// 渲染题目
	const randerPaper = async () => {
		let id = state.isExtra? configObj.paper.extraTpId: configObj.paper.tpId
		const paperInfoInter = await requestPlanPaperInfo(id)
		
		if(!paperInfoInter.data || !paperInfoInter.data.t) {
			return
		}
		state.paperList = paperInfoInter.data.t
		state.subjectAnswer = state.paperList.map(item => ({
			id:item.id,
			tpiId:item.tpiId,
			correct: false,
			answer: '',
			answerOld: item.answer,
			type: item.type
		}))
		
		state.curentSub = state.paperList[0]
		
		
		clearTimeout(state.timer)
		timeRander()
		
		console.log(state.paperList)
		
	}
	
	
	const timeRander = (time) => {
		time = time || configObj.paper.time * 60 || 0
		state.showTime = getTiming(time)
		
		if(time <= 0){
			state.popTexts = {
				type: 'submit',
				texts: ['您的答题结束,是否提交试卷?!']
			}
			state.overTime = true
			clearTimeout(state.timer)
			state.timer = null
		}
		time--
		
		clearTimeout(state.timer)
		state.timer= setTimeout(() => timeRander(time), 1000)
		// clearInterval(state.timer)
		// state.timer = null
		// state.timer = setInterval(() => {
		// 	time--
		// 	state.showTime = getTiming(time)
		// 	if(time <= 0){
		// 		state.popTexts = {
		// 			type: 'submit',
		// 			texts: ['您的答题结束,是否提交试卷?!']
		// 		}
		// 		state.overTime = true
		// 		clearInterval(state.timer)
		// 		state.timer = null
		// 	}
		// }, 1000)
	}
	
	
	// 下一题
	const changeSubject = isLast => {
		// console.log(state.curentSubId)
		state.curentSubId = isLast? (state.curentSubId - 1): (state.curentSubId + 1)
		
		if(state.curentSubId > state.paperList.length) {
			state.popTexts = {
				type: 'submit',
				texts: ['您的答题结束,是否提交试卷?!']
			}
			state.popupShow = true
			state.curentSubId = state.paperList.length
			return
		}
		
		if(state.curentSubId <= 1) {
			state.curentSubId = 1
		}
		if(state.curentSubId == state.paperList.length) {
			state.curentSubId = state.paperList.length
		}
		state.curentSub = state.paperList[state.curentSubId - 1]
		state.isColl = Boolean(state.curentSub.collectId) 
	}
	
	const selectAnswer = (answer, code) => {
		console.log(answer)
		
		// let obj = {
		// 	answer: code,
		// 	correct: 
			
		// }
		console.log(33232)
		console.log(state.subjectAnswer)
		// orderCode
		const curSubAnswer = state.subjectAnswer[state.curentSubId - 1] 
		if(curSubAnswer.type == 3){
			if(curSubAnswer.answer.includes(code)){
				curSubAnswer.answer = curSubAnswer.answer.replace(code, '')
			}else {
				curSubAnswer.answer = orderCode(curSubAnswer.answer + code)
			}
		} else {
			curSubAnswer.answer = code
		}
		curSubAnswer.correct = curSubAnswer.answer == curSubAnswer.answerOld
		state.subjectAnswer[state.curentSubId - 1] = curSubAnswer
		let arr = state.subjectAnswer
		arr[state.curentSubId - 1] = curSubAnswer
		state.subjectAnswer = arr
		console.log(curSubAnswer)
		console.log(state.subjectAnswer)
		// state.subjectAnswer[state.curentSubId - 1].answer = code
	}
	
	const lookSubJect = str => {
		console.log(str)
		console.log(configObj)
		
		let seExtra = str.includes('补考')
		let paperId = seExtra? configObj.paper.extraTpId: configObj.paper.tpId
		uni.$u.route({
			url: '/pages/comExamLook/comExamLook',
			params: {
				config: JSON.stringify({...configObj,paperId})
			}
		})
	}
	
	const subIsColl = () => {
		state.isColl = !state.isColl
			console.log(state.curentSub)
		if(state.isColl) {
			requestPlancollectAdd({type: 1,id: state.curentSub.id}).then(r => {
				console.log(r)
				if(r.data.t){
					// state.CollId = r.data.t
					// state.curentSub.
					state.paperList[state.curentSubId].collectId = r.data.t
					uToast.value.show({
						top: 10,
						type: 'primary',
						message: "收藏成功",
						duration: 1000 * 2,
						safeAreaInsetTop:false
					})
				}
			})
			// state.
		} else {
			if(state.curentSub.collectId) {
				requestPlancollectDel(state.curentSub.collectId)
			}
		}
	}
	
	onHide(() => {
		clearInterval(state.timer)
		state.timer = null
	})
</script>

<style lang="scss">
	.comExam{
		padding: 32rpx;
		background-color: #F2F3F8;
		
		.comExamPre{
			margin: 0 32rpx;
			border-radius: 16rpx;
			overflow: hidden;
			line-height: 64rpx;
			
			.comExamPreT{
				display: inline-block;
				padding-right: 60rpx;
				background: linear-gradient(to bottom, rgba(0,0,0,0) 60%, #84AEF6 60%, #84AEF6 100%);
				font-weight: 600;
				margin-bottom: 20rpx;
			}
			
			.comExamPreLine{
				display: flex;
				align-items: center;
				font-size: 28rpx;
				position: relative;
				
				.comExamPrePoint{
					width: 60rpx;
					height: 60rpx;
				}
				
				.comExamPreText{
					flex: 1;
				}
				
				.comExamPreLook{
					position: absolute;
					right: 40rpx;
					color: #84AEF6;
				}
				
			}
			
			.comExamBtnCon{
				width: 320rpx;
				margin: 40rpx auto;
			}
			
		}
		
		.comExamMain{
			height: calc( 100vh - 60rpx );
			position: relative;
			
			.comExamMainTime{
				text-align: center;
				margin-bottom: 48rpx;
			}
			
			.comExamPtypeLine{
				display: flex;
				justify-content: space-between;
				
				.comExamPtype{
					display: inline-block;
					padding-right: 60rpx;
					background: linear-gradient(to bottom, rgba(0,0,0,0) 60%, #EDC489 60%, #EDC489 100%);
					margin-bottom: 40rpx;
				}
				
				.comExamPImg{
					width: 28rpx;
					height: 28rpx;
					margin-right: 36rpx;
				}
			}
			
			
			.comExamPTitle{
				font-weight: 600;
				font-size: 32rpx;
				margin-bottom: 40rpx;
				line-height: 52rpx;
				
			}
			
			.comExamPItem{
				padding-left: 12rpx;
				margin-bottom: 16rpx;
				
				.comExamPItemLeft{
					margin-right: 12rpx;
				}
			}
			.comExamPItemSe{
				background-color: #EDC489;
			}
			
			.comExamPBottom{
				width: 100%;
				height: 80rpx;
				position: absolute;
				bottom: 12rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
		}
		
		
		.popupContainer{
			width: 72vw;
			padding: 28rpx;
			
			.popupMainText{
				min-height: 100rpx;
				line-height: 50rpx;
				padding: 12rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
			}
			
			.comFormItemVSign{
				background: #ddd;
				border-radius: 12rpx;
			}
			
			.popupMainBtns{
				height: 72rpx;
				line-height: 72rpx;
				text-align: center;
				display: flex;
				border-top: 1px solid #ccc;
				
				.popupMainBtnItem{
					flex: 1;
				}
			}
			
			.popupMainBtnsConfirm{
				color: #f00;
				border-left: 1px solid #ccc;
			}
		}
	}
</style>