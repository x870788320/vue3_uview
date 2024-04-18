<template>
    <view class="columnClass">
        <view v-for="(item,index) in dataList" :key="index">
            <view class="columnClass" :style="{width:rowWidth+'upx'}">
                <view class="rowClass" :style="{width:rowWidth+'upx'}">
                    <view class="" @click="onClick(item)">
                        展开
                    </view>
                    <!-- <uni-icons  style="width: 50upx;" color="#000" size="20" :type="item.isOpen? 'arrowup':'arrowdown' " /> -->
                    
                    <view style="padding: 0 10upx;" :style="{background:item.id==clNum?'#D9D5CC':''}" @click="toChoose(item)">{{item.title}}</view>
                </view>
                <!-- v-if="item.isOpen" -->
                <view v-show="item.isOpen" style="margin-left:20upx;background-color: #0000FF;" >
                    
                    <myGWCPList  :clearNum="clNum" ref="mychild" @choose="toUpDataChoose" :dataList="item.children" :rowWidth="410" ></myGWCPList>
                </view>


            </view>
        </view>
    </view>
</template>

<script>
    import myGWCPList from "./myGWCPList.vue"
    export default {
        name: "myGWCPList",
        components:{
            myGWCPList
        },
        data() {
            return {
                // newDataList:[],
                clNum: "",
            };
        },
        watch: {
            clearNum(val) {
                
                this.clNum = val
                
            },
            // dataList(val){
            //     this.newDataList = JSON.parse(JSON.stringify(this.dataList))
            // }
        },
        props: {
            clearNum: {
                type: String,
                default: ""
            },
            dataList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            rowWidth: {
                type: Number,
                default: 430
            }
        },
        mounted() {
            // this.newDataList = JSON.parse(JSON.stringify(this.dataList))
            // console.log(11111,this.newDataList,this.dataList)
        },
        methods: {
            
            toUpDataChoose(item) {
                
                this.clNum = item.id
                
                this.$emit("choose", item)
                console.log(item)
            },
        
            toChoose(item) {
                this.$emit("choose", item)
                this.clNum = item.id
                console.log(item)
            },
            onClick(item) {
                console.log(item)
                
                this.$set(item, "children", [])
                if (item.isOpen) {
                    this.$set(item, "isOpen", false)
                } else {
                    this.$set(item, "isOpen", true)
                }
                this.$forceUpdate()
                console.log(item.isOpen)
            }
        }
    }
</script>

<style>
    .uni-collapse-cell__title-arrow {

        width: 20px;
        height: 20px;
        transform: rotate(0deg);


    }

    .uni-collapse-cell__title-arrow-active {
        transform: rotate(180deg);
    }

    .columnClass {
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }



    .rowClass {
        padding: 0 30upx 0 10upx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

    }
</style>