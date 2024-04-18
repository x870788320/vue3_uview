<template>
	<view class = 'branchList'>
		<treeMenu :nodes="state.nodes" :callData= 'callData'></treeMenu>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestDeptList } from '@/interface/index.js'
	
	// 数据
	//接收的参数
	const props = defineProps({
		callData: '',
	})
	const store = useStore()
	const state = reactive({
	  // taskType: 1,
	  
	})
	
	console.log(111, props.callData)
	
	// 获取线上数据
	const getDeptList = async (id) => {
		await store.setAllDept()
		state.nodes = store.allDept
	}
	
	getDeptList()
	
	
	// const nodes = [
	// 	{
	// 		name:'密码管理',
	// 		children: [
	// 			{
	// 				name:'223'
	// 			},
	// 			{
	// 				name:'密码管理',
	// 				children: [
	// 					{
	// 						name:'223233'
	// 					},
	// 					{
	// 						name:'22344'
	// 					}
	// 				]
	// 			}
	// 		]
	// 	},
	// ]
	
	// 方法
	
	// onShow(() => {
	// 	getDeptList()
	// })
</script>

<style lang="scss">
	.branchList{
		padding: 32rpx;
		// background-color: #F2F3F8;
		
		
	}
</style>