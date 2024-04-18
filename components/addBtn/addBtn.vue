<template>
	<view  class="addBtn" @click="handleEvent"></view>
</template>

<script setup>
	import { defineEmits } from 'vue'
	const emit = defineEmits(["handleEvent"])
	const handleEvent = () => emit('handleEvent')
</script>

<style lang="scss">
	.addBtn{
		width: 112rpx;
		height: 112rpx;
		position: fixed;
		z-index: 1000;
		border-radius: 50%;
		bottom: 6%;
		right: 8%;
		background-image: url('/static/icon/add.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-color: #fff;
	}
</style>