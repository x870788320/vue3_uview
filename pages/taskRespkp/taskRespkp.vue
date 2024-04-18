<template>
	<view class = 'taskRespkp'>
		<view class = 'taskRespkpTop'>
			<u-input v-model="state.respkpSearch" 
				type="text" 
				border="true" 
				placeholder="请输入关键字搜索"
				custom-style="background: #F2F3F8" 
				@change = "respkpChange"/>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	
	// 数据
	const store = useStore()
	const state = reactive({
	  // taskType: 1,
		respkpSearch: '',
	  
	})
	
	
	// 方法
	const respkpChange = e => {
		console.log(e)
		console.log(state.traninSearch)
		
	}
</script>

<style lang="scss">
	.taskRespkp{
		padding: 32rpx;
		// background-color: #F2F3F8;
		
		.taskRespkpTop{
			margin: 0 32rpx;
			border-radius: 16rpx;
			overflow: hidden;
			
		}
	}
</style>