<template>
	<view class="userList" id = 'userList'>
		<view class="userListTop">
			<u-search placeholder="请输入姓名搜索" v-model="state.searchUserStr" :showAction='false' bgColor='#fff' @change="searchUser()"></u-search>
		</view>
		<u-index-list :index-list="state.indexList">
			<template v-for="(item, index) in state.nodes">
				<!-- #ifdef APP-NVUE -->
				<u-index-anchor :text="state.indexList[index]" bgColor='#F2F3F8'></u-index-anchor>
				<!-- #endif -->
				
				<u-index-item>
					<!-- #ifndef APP-NVUE -->
					<u-index-anchor :text="state.indexList[index]" bgColor='#F2F3F8'></u-index-anchor>
					<!-- #endif -->
					<view class="list_cell" v-for="(cell, index) in item" @click="handleUser(cell)">
						<!-- {{cell}} -->
						<view class="list_cell_name">{{cell.name}}</view>
						<view class="list_cell_dept">
							<text class="list_cell_dept_item">{{cell.deptName}}</text>
							<text class="list_cell_dept_item">{{cell.post}}</text>
							<text class="list_cell_dept_item">{{cell.job}}</text>
						</view>
					</view>
				</u-index-item>
			</template>
		</u-index-list>
	</view>
</template>

<script setup>
	import { ref, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestUserListById, requestUserList } from '@/interface/index.js'
	
	// 数据
	const store = useStore()
	//接收的参数
	const props = defineProps({
		callData: '',
	})
	// const callDataObj = JSON.parse(props.callData)
	// const deptInfo = callDataObj.node
	// console.log(deptInfo)
	// console.log(1111)
	const state = reactive({
		userListShow: false,
		indexList: ["A", "B", "C", "D", "E", "F","G", "H", "I","J", "K", "L","M", "N", 
				"O", "P", "Q", "R","S", "T", "U","V", "W", "X","Y", "Z"],
		itemArr: [
			
			[{
			    "deptName": "安全环保部",
			    "id": 101,
			    "job": "安全管理员",
			    "name": "李晓鹏",
			    "phone": "13306466080",
			    "post": "安全环保部",
			    "shortName": "L"
			},{
			    "deptName": "安全环保部",
			    "id": 101,
			    "job": "安全管理员",
			    "name": "李晓鹏",
			    "phone": "13306466080",
			    "post": "安全环保部",
			    "shortName": "L"
			},{
			    "deptName": "安全环保部",
			    "id": 101,
			    "job": "安全管理员",
			    "name": "李晓鹏",
			    "phone": "13306466080",
			    "post": "安全环保部",
			    "shortName": "L"
			}],
			[{
			    "deptName": "安全环保部",
			    "id": 101,
			    "job": "安全管理员",
			    "name": "李晓鹏",
			    "phone": "13306466080",
			    "post": "安全环保部",
			    "shortName": "B"
			},{
			    "deptName": "安全环保部",
			    "id": 101,
			    "job": "安全管理员",
			    "name": "李晓鹏",
			    "phone": "13306466080",
			    "post": "安全环保部",
			    "shortName": "L"
			},{
			    "deptName": "安全环保部",
			    "id": 101,
			    "job": "安全管理员",
			    "name": "李晓鹏",
			    "phone": "13306466080",
			    "post": "安全环保部",
			    "shortName": "L"
			}]
		],
		searchUserStr: '',
		nodes:{},
	  
	})
	
	// let codes = ["A", "B", "C", "D", "E", "F","G", "H", "I","J", "K", "L","M", "N", 
	// 			"O", "P", "Q", "R","S", "T", "U","V", "W", "X","Y", "Z"]
	
	// 获取线上数据
	const getUsersList = async (id) => {
		await store.setAllStaff()
		// console.log(store.allStaff)
		formatNodes()
	}
	
	getUsersList()
	
	// 可以根据部门或者名字来帅选
	const formatNodes = (filterObj = {}) => {
		let nodeObj = {}
		let showStaff = store.allStaff
		if(filterObj.name){
			showStaff = showStaff.filter(item => item.name.includes(filterObj.name))
		}
		if(filterObj.deptName){
			showStaff = showStaff.filter(item => item.deptName.includes(filterObj.deptName))
		}
		showStaff.map(item => {
			nodeObj[item.shortName]? nodeObj[item.shortName].push(item): (nodeObj[item.shortName] = [item])
		})
		state.indexList = Object.keys(nodeObj).sort()
		state.nodes = state.indexList.map(key => nodeObj[key])
	}
	
	// 方法
	
    
    const emit = defineEmits(['handleHeaderNav'])
	const handleUser = obj => {
		obj.callData = JSON.parse(props.callData) 
		uni.$emit('selectStaff', JSON.stringify(obj) )
		uni.$u.route({
			type: 'back',
		})
	}
	
	const searchUser = () => {
		formatNodes({name: state.searchUserStr})
	}
</script>


<style lang="scss" scoped>
	.userList{
		
		// background: #F2F3F8;
		// background: #DEDEDE;
		
		.userListTop{
			margin: 72rrpx;
			border-bottom: 1px solid #F2F3F8;
		}
	}
	
	.list_cell {
		// display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx 48rpx;
		overflow: hidden;
		color: #323233;
		font-size: 28rpx;
		line-height: 48rpx;
		background-color: #fff;
		border-bottom: 1px solid #DEDEDE;
		
		&:hover{
			background-color: #f0f0f0;
		}
		
		.list_cell_name{
			font-size: 30rpx;
		}
		
		.list_cell_dept{
			color: #619BFE;
			font-size: 26rpx;
			display: flex;
			
			.list_cell_dept_item{
				// width: 33%;
				flex: 1;
			}
		}
	}
</style>