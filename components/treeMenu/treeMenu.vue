<template>
	<view class="treeMenu">
		<!-- 输入框 -->
		<view class="treeMenuInput" v-if="!isChild">
			<input class="treeMenuInputIn" type="text" v-model="state.searchText" placeholder="搜索.." />
		</view>	
    
		<!-- 根节点 -->
		<view class="treeMenuCon">
			<view v-for="(node,index) in filteredNodes" :key="node.id"  class="treeMenuItem">
				<view class="treeMenuTitle" @click="treeItemClick(node, index + 1)">
					<img class="treeMenuItemIcon" :src="`/static/icon/tree/${Array.isArray(node.children) && (node.children.length > 0)?'tree-expand': 'tree-retract'}.png`" alt="">
					<text class="treeMenuItemMsg">{{node.name}}</text>
				</view>
				
        
				<!-- 子节点 -->
				<view v-show="state[`showChildren_${node.treeId}`]" class="treeMenuItemCon">
					<treeMenu :nodes="node.children" :isChild='true' :parTreeId="node.treeId" :callData='callData'></treeMenu>
				</view>
			</view>
		</view>
	</view>
</template>
 


<script setup>
	import { ref, onMounted, reactive, computed } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import useStore from '@/store/index.js'
	
	// 数据
	const props = defineProps({
		nodes: '',
		isChild: '',
		parTreeId: '',
		callData: '',
	})
	const store = useStore()
	const state = reactive({
		searchText: '',
	})
	
	// 处理数据
	const filterNodesByName = () => {
		if(!props.nodes || !props.nodes.length) return []
		
		return props.nodes.map((item, index) => {
			item.treeId = props.parTreeId? `${props.parTreeId}_${index + 1}`: index + 1
			// item.expanded = !!props.parTreeId
			state[`showChildren_${item.treeId}`] = false
			return item
		}).filter(node => node.name.toLowerCase().includes(state.searchText.toLowerCase()));
		
	}
	
	// 展示的菜单
	const filteredNodes = computed(() => filterNodesByName())
	
	
	
	const treeItemClick = (node,treeId) => {
		console.log(node)
		console.log(treeId)
		node.expanded = !node.expanded
		state[`showChildren_${node.treeId}`] = Array.isArray(node.children) && (node.children.length > 0) && node.expanded
		
		if(Array.isArray(node.children) && node.children.length > 0) return
		let str = JSON.stringify({node, callData: JSON.parse(props.callData)})
		uni.$emit('selectBranch', str)
		uni.$u.route({
			type: 'back',
		})
		
	}
	
</script>

 
<style  lang="scss">
/* CSS样式 */

.treeMenu{
			// background: #F2F3F8;
	.treeMenuInput{
		// width: ;
		background-color: #fff;
		height: 82rpx;
		margin: 24rpx;
		margin-top: 0;
		border-radius: 16rpx;
		overflow: hidden;
		.treeMenuInputIn{
			width: 100%;
			height: 100%;
		}
	}
	.treeMenuCon{
		.treeMenuItem{
			
			
			.treeMenuTitle{
				.treeMenuItemIcon{
					width: 32rpx;
					height: 32rpx;
					margin-right: 24rpx;
				}
				.treeMenuItemMsg{
					height: 64rpx;
					line-height: 64rpx;
					font-size: 32rpx;
				}
			}
			
			.treeMenuItemCon{
				margin-left: 32rpx;
			}
		}
	}
}
</style>