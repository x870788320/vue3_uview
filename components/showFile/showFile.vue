<template>
	<view class = 'com_show_file' @click="handleEvent()">
		<web-view ref='fileShowWeb' :src="fileUrl"></web-view>
	</view>
</template>

<script setup>
	import { ref, onMounted, reactive, computed, defineEmits } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import { BASE_FILE_URL } from '@/interface/constant.js'
	
	//接收的参数
	const props = defineProps({
		posFileSrc: '',
	})
	
	const fileShowWeb = ref()
	const emit = defineEmits(["handleEvent"])
	
	const state = reactive({
		preFileSrc: 'http://mowenxiaosheng.com.cn/open_office/?src=',
		// posFileSrc: '',
	})
	
	
	
	const fileUrl = computed(() => {
		let url = props.posFileSrc.slice(0,4) == 'http'? props.posFileSrc : `${BASE_FILE_URL}${props.posFileSrc}`
		console.log(url)
		return props.posFileSrc? (state.preFileSrc + encodeURIComponent(url)) : ''
	})
	
	const handleEvent = () => emit('handleEvent')
</script>

<style  lang="scss">
	.com_show_file{
		width: 100%;
		height: 100%;
	}
</style>