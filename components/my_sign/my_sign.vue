<template>
    <view class="mySign">
		<view class = 'signContainer'>
			
			<!-- <view class="title">请在下面输入签名：</view> -->
			<!-- 在钉钉小程序中,要将canvas-id改为id -->
			<!-- <canvas class="mycanvas" canvas-id="mycanvas" :style="{width: width+'px', height: height+'px'}" -->
			<!-- <canvas class="mycanvas" canvasId="mycanvas" id="mycanvas" :style="{width: state.width+'px', height: state.height+'px'}"
			    disableScroll="true" @touchstart.stop="touchstart" @touchmove.stop="touchmove" @touchend.stop="touchend"></canvas> -->
			<canvas 
				class="mycanvas" 
				canvasId="mycanvas" 
				id="mycanvas" 
			    disableScroll="true" 
				@touchstart.stop="touchstart" 
				@touchmove.stop="touchmove" 
				@touchend.stop="touchend"></canvas>
			<!-- <view class="footer">
			    <view class="left" @click="done">完成</view>
			    <view class="right" @click="clear">清除</view>
			</view> -->
		</view>
    </view>
</template>


<script setup>
	import { ref, onMounted, reactive, computed, getCurrentInstance, defineExpose  } from 'vue'
	import { onShow, onLoad } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	import { requestFileAdd} from '@/interface/index.js'
	
	// 数据
	const instance = getCurrentInstance()
	const store = useStore()
	const state = reactive({
		width: '',
		height: '',
		ctx: null,
		path: '', //绘图图像
		points: [] //路径点集合
	  
	})
	
	const canvasInit = () => {
		//创建绘图对象
		state.ctx = uni.createCanvasContext("mycanvas")
		// 获取屏幕宽高
		// let width = uni.getSystemInfoSync().screenWidth
		// let height = uni.getSystemInfoSync().screenHeight
		// 计算画板的高宽
		// state.width = width - 80
		// state.height = height * 0.8
		//设置画笔样式
		state.ctx.setLineWidth(1)
		state.ctx.setLineCap('round')
		state.ctx.setLineJoin('round')
		
		const query = uni.createSelectorQuery();
		//获取宽度
		query.select('#mycanvas').fields({
			size: true
		}, (res) => {
			state.width = res.width;
			state.height = res.height;
			console.log(res)
		}).exec();
	}
	
	//触摸开始，获取到起点
	const touchstart = (e) => {
		if(!state.ctx) {
			canvasInit()
		}
	    let startX = e.changedTouches[0].x;
	    let startY = e.changedTouches[0].y;
	    let startPoint = {
	        X: startX,
	        Y: startY
	    };  
	    // 存点
	    state.points.push(startPoint);
	    //每次触摸开始，开启新的路径
	    state.ctx.beginPath();
	}
	
	//触摸移动，获取到路径点
	const touchmove = (e) => {
	    let moveX = e.changedTouches[0].x;
	    let moveY = e.changedTouches[0].y;
	    let movePoint = {
	        X: moveX,
	        Y: moveY
	    };
	    state.points.push(movePoint); //存点
	    let len = state.points.length;
	    if (len >= 2) {
	        draw(); //绘制路径
	    }
	}
	
	// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
	const touchend = () => {
	    state.points = [];
	}
	
	
	/* ***********************************************
	#   绘制笔迹
	#   1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
	#   2.为保证笔迹连续，每次从路径集合中区两个点作为起点                  （moveTo）和终点(lineTo)
	#   3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
	************************************************ */
	const draw = () => {
	    console.log('draw');
	    let point1 = state.points[0]
	    let point2 = state.points[1]
	    state.points.shift()
		console.log(state.points)
		console.log(point1)
		console.log(point2)
		console.log(state.ctx)
	    state.ctx.moveTo(point1.X, point1.Y)
	    state.ctx.lineTo(point2.X, point2.Y)
	    state.ctx.stroke()
	    state.ctx.draw(true)
	}
	
	
	// 清空画布
	const signClear = () => {
	    console.log('清空');
	    state.ctx.clearRect(0, 0, state.width, state.height);
	    state.ctx.draw(true);
	}
	
	// 绘制完成
	const signDown = () => new Promise((res, rej) => {
		uni.canvasToTempFilePath({
		    canvasId: 'mycanvas',
		    success: async (obj) => {
		       let path = obj.tempFilePath || obj.filePath;
				res(path)
		    },
			fail: (err) => {  
				rej(err)
			}  
		}, instance)
	})
	// 抛出  显示隐藏要用v-if
	defineExpose({signDown, signClear})
	onLoad(() => {
		canvasInit()
	})
	
	
</script>

<style scoped lang="scss">
	.mySign{
		width: 100%;
		height: 100%;
		min-height: 300rpx;
		background-color: rgba(0,0,0,0.1);
		border-radius: 20rpx;
		padding: 32rpx;
		box-sizing: border-box;
		
		.signContainer{
			width: 100%;
			height: 100%;
			-ms-touch-action: none;
			touch-action: none;
			
			.mycanvas{
				width: 100%;
				height: 100%;
				-ms-touch-action: none;
				touch-action: none;
			}
		}
	}
</style>