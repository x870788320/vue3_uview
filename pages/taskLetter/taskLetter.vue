<template>
	<view class = 'taskLetter'>
		<view class = 'taskLetterTop'>
			<u-tabs
				:list="mainLetterList"
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
				:current="(state.navSept - 1)"
				@click="changeNavSept">
			</u-tabs>
		</view>
		<view v-if = 'state.navSept == 1' class="applyAcciUpItem applyAcciUp1 ">
			<cell_file v-for = "item in state['mainInfosystem']" :cellConfig = 'item' @handleEvent = 'handleCellFile(item)'></cell_file>
		</view>
		<view v-if = 'state.navSept == 2' class="applyAcciUpItem applyAcciUp2">
			<cell_file v-for = "item in state['mainInfocreater']" :cellConfig = 'item' @handleEvent = 'handleCellFile(item)'></cell_file>
		</view>
		<view v-if = 'state.navSept == 3' class="applyAcciUpItem applyAcciUp3">
			<cell_file v-for = "item in state['mainInfosigner']" :cellConfig = 'item' @handleEvent = 'handleCellFile(item)'></cell_file>
		</view>
		
		
		<view class="comDocShow" v-if = 'state.fileShow'>
			<web-view ref='fileShowWeb' :src="fileUrl"></web-view>
		</view>
		
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestRespSystemsInfo, requestRespCreatersInfo, requestRespSignersInfo, requestCreatersInfo } from '@/interface/index.js'
	import { formatDate } from '@/utils/index.js'
	import { BASE_LINE_PRE, BASE_FILE_URL } from '@/interface/constant.js'
	
	// 数据
	//接收的参数
	const props = defineProps({
		config: '',
	})
	const porpsObj = props.config? JSON.parse(props.config) : {}
	const store = useStore()
	const state = reactive({
		navSept: porpsObj.navId || 2,
		mainInfo: [],
		fileShow: false,
		posFileSrc: '',
	})
	// 主要显示列表
	const mainLetterList = [
		{id: 1, name: '安全生产责任制', key: 'system'},
		{id: 2, name: '目标责任书-发起人', key: 'creater'},
		{id: 3, name: '目标责任书-签订人', key: 'signer'},
	]
	
	
	// 列表显示的项
	// 目标责任书
	const letterItemNames = [
		{id: 1, title: '状态', key: 'status', defval: '发起人已签字'},
		{id: 2, title: '安全生产目标', key: 'aim'},
		{id: 3, title: '发布日期', key: 'createDate'},
	]
	//安全生产责任制
	const safeItemNames = [
		{id: 1, title: '适用岗位', key: 'post'},
		{id: 2, title: '发布日期', key: 'createDate'},
	]
	
	
	const fileUrl = computed(() => {
		console.log((BASE_LINE_PRE + state.posFileSrc))
		// https://mowenxiaosheng.com.cn/444.docx
		return state.posFileSrc? (BASE_LINE_PRE + encodeURIComponent(BASE_FILE_URL + state.posFileSrc)) : ''
	})
	
	// 获取线上数据
	const getInterInfo = async (navInfo = mainLetterList[state.navSept - 1]) => {
		console.log(navInfo)
		// 一周前
		let beginTimeN = (new Date).getTime()-7*24*60*60*1000
		let beginArr = formatDate(beginTimeN)
		let endArr = formatDate()
		let params = {
			page:1,
			rows:100,
			size: 100,
			// endTime:`${endArr[0]}-${endArr[1]}`,
			// beginTime:`${beginArr[0]}-${beginArr[1]}`
		}
		let interInfo = {}
		let acciItemList = JSON.parse(JSON.stringify(letterItemNames)) 
		if(navInfo.id == 1) {
			interInfo = await requestRespSystemsInfo(params).then(r => r).catch(e => {})
			acciItemList = JSON.parse(JSON.stringify(safeItemNames))
		}
		if(navInfo.id == 2) {
			interInfo = await requestRespCreatersInfo(params).then(r => r).catch(e => {})
		}
		if(navInfo.id == 3) {
			interInfo = await requestRespSignersInfo(params).then(r => r).catch(e => {})
		}
		
		if(!interInfo.data || !interInfo.data.t) {
			return
		}
		let info = interInfo.data.t.content || []
		
		// console.log(info)
		state['mainInfo'+ navInfo.key] = info.map(clap => {
			let obj = { ...clap }
			if(clap.letter) {
				clap = clap.letter
			}
			let cellRNames = acciItemList.map(item => {
				item.val = clap[item.key] || item.defval || ''
				if(item.key.includes('Time') || item.key.includes('Date') ){
					let arr = formatDate(item.val)
					item.val = `${arr[0]}-${arr[1]} ${arr[3]}`
				}
				if(navInfo.id == 3 && item.key.includes('status')){
					item.val = clap.signed == '否'? '签订人未签字': '签订人已签字'
				}
				return item
			})
			obj.cellRNames = JSON.stringify(cellRNames)
			obj.cellTitle = clap.name
			obj.cellFile = clap.file
			return obj
		})
		console.log(state['mainInfo'+ navInfo.key] )
	}
	
	
	// 方法
	const changeNavSept = obj => {
		state.navSept = obj.id
		getInterInfo(obj)
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
	
	const handleCellFile = async obj => {
		console.log(obj)
		
		if(state.navSept == 1){
			state.posFileSrc = obj.file
			state.fileShow = true
			return
		}
		
		
		const formConfig = {}
		let domList = []
		let toFormConfig = {}
		let title = ''
		if(state.navSept == 2) {
			let params = {
				page:1,
				rows:100,
				size: 100
			}
			const interCreaters = await requestCreatersInfo(params, obj.id).then(r => r)
			
			if(!interCreaters.data || !interCreaters.data.t) {
				return
			}
			let creaters = interCreaters.data.t.content || []
			let options = creaters.map(item => {
				let obj = item.sign? { imgSrc:item.sign, cellType: 'img' }: { name:'未签字', cellType: 'text' }
				return [ { name:item.signer.ushow, cellType: 'text' }, obj ]
			})
			
			domList = [
				{id: 1, title: '安全生产目标', key: 'name', type: 'text',ref: "resp_creat_name"},
				{id: 2, title: '文件', key: 'file', type: 'file',ref: "resp_creat_file"},
				{id: 3, title: '创建时间', key: 'createDate', type: 'text',ref: "resp_creat_createDate", val: obj.cellLImg},
				{id: 4, title: '发起人签字', key: 'sign', type: 'sign',ref: "resp_creat_sign"},
				{id: 5, title: '发起人签字时间', key: 'signDate', type: 'text',ref: "resp_creat_signDate"},
				{id: 6, title: '签订人员列表', key: 'list', type: 'table',ref: "resp_creat_list", options}
			]
			
			toFormConfig = {
				submitFn: 'requestCreatSignSubmit',
				params: {id: obj.id},
				from: 'resp_creat'
			}
			
			title = '安全责任制-发起人'
		}
		
		
		if(state.navSept == 3) {
			domList = [
				{id: 1, title: '安全生产目标', key: 'cellTitle', type: 'text',ref: "resp_sign_cellTitle"},
				{id: 2, title: '文件', key: 'cellFile', type: 'file',ref: "resp_sign_file"},
				{id: 3, title: '创建时间', key: 'createDate', type: 'text',ref: "resp_sign_createDate", val: obj.letter.createDate},
				{id: 4, title: '发起人', key: 'ushow', type: 'text',ref: "resp_sign_ushow", val: obj.letter.creater.ushow || ''},
				{id: 5, title: '签订人签字', key: 'sign', type: 'sign',ref: "resp_sign_sign"},
			]
			
			toFormConfig = {
				submitFn: 'requestLetterSignSubmit',
				params: {id: obj.id},
				from: 'resp_sign'
			}
			
			title = '安全责任制-签订人'
		}
		
		
		
		domList.map(item => {
			// let cellIndex = cellTitles.indexOf(item.title)
			// if(cellIndex > -1){
			// 	item.val = cellArr[cellIndex].val
			// }
			if(obj[item.key]){
				item.val = obj[item.key]
			}
			
			if(item.key.includes('Time') || item.key.includes('Date') ){
				let arr = formatDate(item.val)
				item.val = `${arr[0]}-${arr[1]} ${arr[3]}`
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
		getInterInfo()
		state.fileShow = false
	})
</script>

<style lang="scss">
	.taskLetter{
		padding: 32rpx;
		background-color: #F2F3F8;
		
		.taskLetterTop{
			height: 112rpx;
			line-height: 112rpx;
			display: flex;
			justify-content: center;
			color: #626A74;
			font-size: 30rpx;
			
			.letterBtnLine{
				margin: 0 24rpx;
			}
			.letterBtnSe{
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