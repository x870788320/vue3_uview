
import { toRawType } from '../index.js'

export const SET_STORAGE = (key, val) => {
	let type = toRawType(val)
	if(type == 'Object' || type == 'Array'){
		val = 'ISJSON_'+JSON.stringify(val)
	}
	uni.setStorageSync(key, val)
}
//本地存储获取数据
export const GET_STORAGE = key => {
	let val = uni.getStorageSync(key)
	if(!val) return null
	let isJsonStr = val.slice(0,7)
	if(isJsonStr === 'ISJSON_'){
		val = JSON.parse(val.slice(7,val.length))
	}
  return val
}
//本地存储删除数据方法
export const REMOVE_STORAGE = key => {
  uni.removeStorageSync(key)
}




// //存储TOKEN
// export const SET_TOKEN = (token) => {
//   uni.setStorageSync('TOKEN', token)
// }
// //本地存储获取数据
// export const GET_TOKEN = () => {
//   return uni.getStorageSync('TOKEN')
// }
// //本地存储删除数据方法
// export const REMOVE_TOKEN = () => {
//   uni.removeStorageSync('TOKEN')
// }
// //存储用户信息
// export const SET_INFO = (info) => {
//   uni.setStorageSync('USER', info)
// }
// //本地存储获取用户信息
// export const GET_INFO = () => {
//   return uni.getStorageSync('USER')
// }
// //本地存储删除用户信息
// export const REMOVE_INFO = () => {
//   uni.removeStorageSync('USER')
// }
