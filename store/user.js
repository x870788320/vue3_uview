import { defineStore } from 'pinia'
//引入本地存储
import {SET_STORAGE,GET_STORAGE,REMOVE_STORAGE} from '@/utils/storage/user_storage.js'

//创建用户小仓库
const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: GET_STORAGE('TOKEN') || '',
      user: GET_STORAGE('USER') || '{}',
    }
  },
  actions: {
    //获取用户信息
    updateUserInfo(info) {
		if(info) {
			SET_STORAGE('USER',info)
		}
    },
    //获取token
    updateToken(token) {
		if(token) {
			SET_STORAGE('TOKEN',token)
		}
    },
    //退出登录
    userLogout() {
      this.token = ''
      this.info = {}
      REMOVE_TOKEN()
      REMOVE_INFO()
    },
    //设置active的值
    // setActive(active) {
    //   this.activeTab = active;
    // },
	
  },
})

//暴露用户小仓库
export default useUserStore
