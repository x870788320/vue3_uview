<template>
	<view class = 'know'>
		<!-- 用户信息 -->
		<view class = 'konwFir'>
			<view class = 'knowName'>
				<view class = 'knowNameTop'>{{user.ushow || ''}}</view>
				<!-- <view><text class = 'knowNameBIcon'>#</text><text>{{user.sign1Pa}}</text></view> -->
			</view>
			<view class = 'knowAvatar'>
				<!-- <img class = 'knowAvatarImg' src="/static/icon/a-Group1308.png" alt=""> -->
				<img class = 'knowAvatarImg' :src="`${BASE_FILE_URL}${user.portrait}`" alt="">
			</view>
		</view>
		<!-- 岗位信息 -->
		<view class = 'knowPost'>
			<view class = 'knowPostItem' v-for = 'item in postList'>
				<view>{{item.title}}</view>
				<view class = 'knowPostItemV'>{{user[item.key] || '恒通股份'}}</view>
			</view>
		</view>
		<!-- 主要列表 -->
		<view class="knowMain">
			<view class = 'knowMainItem' v-for = 'item in mainKnowList' @click="handleMainKnow(item)">
				<view>{{item.title}}</view>
				<img class="knowMainImg" :src="`/static/icon/${item.icon}.png`" alt="">
			</view>
		</view>
	</view>
</template>
<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import useUserStore from '@/store/user.js'
	import useKnowStore from '@/store/know.js'
	import { BASE_FILE_URL } from '@/interface/constant.js'
	import {GET_STORAGE} from '@/utils/storage/user_storage.js'
	// import { requestPersonInfo } from '@/interface/index.js'
	
	// 数据
	const store = useStore()
	const userStore = useUserStore()
	const konwStore = useKnowStore()
	// const user = userStore.user
	console.log(GET_STORAGE('USER'))
	const user = GET_STORAGE('USER') || {}
	
	const state = reactive({
	  // postId: 1,
	  
	})
	
	
	console.log(userStore.user.job)
	console.log(userStore.user)
	// 岗位信息
	const postList = [
		{id: 1, title: '公司', key: 'company'},
		{id: 2, title: '部门', key: 'deptName'},
		{id: 3, title: '班组', key: 'post'},
		{id: 4, title: '岗位', key: 'job'},
	]
	// 主要显示列表
	const mainKnowList = [
		{id: 1, title: '岗位职责', icon: 'a-Group1308', key: '岗位职责', inter: 'Post'},
		{id: 2, title: '法律法规', icon: 'lishijilu', key: '法律法规', inter: 'Law'},
		{id: 3, title: '规章制度', icon: 'a-Group1288', key: '', inter: 'Rule'},
		{id: 4, title: '操作流程', icon: 'a-Group1306', key: '操作流程', inter: 'Post'},
		{id: 5, title: '安全知识', icon: 'a-Group1300', key: '安全知识', inter: 'Post'},
		{id: 6, title: '安全目标', icon: 'a-Group1288-2', key: '', inter: ''},
		{id: 7, title: '岗位风险告知', icon: 'a-Group1313', key: '岗位风险告知', inter: 'Post'},
		{id: 8, title: '职业病风险告知', icon: 'dianzan', key: '', inter: 'Factor'},
		{id: 9, title: '安全生产目标责任书', icon: 'shuomingwendang', key: '', inter: ''},
		{id: 10, title: '个人档案', icon: 'renyuanxinxi', key: '', inter: 'form'}
	]
	
	// 个人档案
	const personForm = [
		{id: 1, title: '姓名', key: 'ushow', type: 'text'},
		{id: 2, title: '照片', key: 'field7', type: 'picture'},
		{id: 3, title: '性别', key: 'sex', type: 'text'},
		{id: 4, title: '民族', key: 'field', type: 'text'},
		{id: 5, title: '文化程度', key: 'education', type: 'text'},
		{id: 6, title: '所学专业', key: 'typeWork', type: 'text'},
		{id: 7, title: '毕业时间', key: 'field1', type: 'text'},
		{id: 8, title: '毕业学校', key: 'field2', type: 'text'},
		{id: 9, title: '政治面貌', key: 'field3', type: 'text'},
		{id: 10, title: '身份证号', key: 'field8', type: 'text'},
		{id: 11, title: '家庭住址', key: 'field4', type: 'text'},
		{id: 12, title: '毕业参加工作时间', key: 'field5', type: 'text'},
		{id: 13, title: '进入本单位时间', key: 'field6', type: 'text'},
		{id: 14, title: '工作简历', key: 'suwList', type: 'list'},
	]
	// 个人档案 - 简历
	const suwListOPtion = {
		'工作单位': 'field1',
		'起止时间': 'field',
		'工作岗位': 'field2',
		'职务': 'field3'
	}
	
	// 方法
	
	// 处理简历
	const formatSuw = suwObj => Object.keys(suwListOPtion).reduce((pre, name) => {
		pre[name] = suwObj[suwListOPtion[name]]
		return pre
	}, {})
	
	const handleMainKnow = async obj => {
		// state.taskType = id
		console.log(obj)
		obj.from = 'know'
		
		if(obj.title == '个人档案'){
			await konwStore.getUserArchives()
			console.log(konwStore.userArchives)
			const archives = konwStore.userArchives || {}
			const formConfig = personForm.map(item => {
				item.val = archives[item.key]
				if(item.title == '工作简历') {
					item.val = item.val.map(formatSuw)
				}
				return item
			})
			
			// 打开form 页
			uni.$u.route({
				url: '/pages/comForm/comForm',
				params: {
					data: JSON.stringify(formConfig),
					title: '个人档案'
				}
			})
			return
		}
		
		if(obj.title == '安全生产目标责任书'){
			uni.$u.route({
				url: '/pages/knowSign/knowSign',
				params: {
					// config: JSON.stringify(obj)
				}
			})
			
			return
		}
		
		uni.$u.route({
			url: '/pages/comDocLearn/comDocLearn',
			params: {
				config: JSON.stringify(obj)
			}
		})
		
	}
</script>

<style lang="scss">
	.know{
		background-image: url('../../static/icon/bg-profile.png');
		background-size: 100%;
		background-repeat: no-repeat;
		padding: 32rpx;
		background-color: #F2F3F8;
		
		.konwFir{
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 56rpx;
			
			.knowName{
				font-size: 28rpx;
				.knowNameTop{
					line-height: 80rpx;
					font-weight: 700;
					font-size: 40rpx;
				}
				.knowNameBIcon{
					font-size: 40rpx;
					color: #025FFD;;
				}
			}
			.knowAvatar{
				width: 112rpx;
				height: 112rpx;
				border: 1px solid ;
				border-image: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%) ;
				box-sizing: border-box;
				border-radius: 50%;
				overflow: hidden;
				
				.knowAvatarImg{
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.knowPost{
			margin-top: 80rpx;
			display: flex;
			font-size: 28rpx;
			
			.knowPostItem{
				flex: 1;
				font-weight: 700;
				color: #626A74;
				line-height: 48rpx;
				
				.knowPostItemV{
					color: #0F1115;
				}
			}
		}
		
		.knowMain{
			margin: 40rpx 0;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			
			.knowMainItem{
				width: calc( 50% - 8rpx );
				height: 266rpx;
				background-color: #FFFFFF;
				padding: 32rpx;
				box-sizing: border-box;
				border-radius: 16rpx;
				margin-top: 16rpx;
				font-size: 36rpx;
				font-weight: 700;
				position: relative;
				
				.knowMainImg{
					width: 80rpx;
					height: 80rpx;
					position: absolute;
					right: 32rpx;
					bottom: 32rpx;
				}
			}
		}
	}
	
</style>