import { BASE_URL } from './constant.js'
import useUserStore from '@/store/user.js'
import { getFileType } from '@/utils/index.js'
import {GET_STORAGE} from '@/utils/storage/user_storage.js'

// function fileToBase64(file, callback) {
//   // 创建FileReader对象
//   let reader = new FileReader();
  
//   // 文件读取完毕后触发的事件
//   reader.onload = function(event) {
//     // 当读取操作完成时, result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
//     let base64 = event.target.result;
//     callback(base64);
//   };
  
//   // 以DataURL的形式读取文件内容
//   reader.readAsDataURL(file);
// }
// 将图片URL转换为Base64
export function urlToBase64(url) {
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url: url,
      success: (res) => {
        if (res.statusCode === 200) {
          // 下载成功，获取临时文件路径
          let tempFilePath = res.tempFilePath;
          // 读取临时文件
          uni.getFileSystemManager().readFile({
            filePath: tempFilePath,
            encoding: 'base64',
            success: (dataRes) => {
              resolve(dataRes.data);
            },
            fail: (err) => {
              reject(err);
            }
          });
        } else {
          reject(new Error('下载图片失败，状态码：' + res.statusCode));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
 
// 使用示例
// urlToBase64('https://example.com/path/to/image.jpg').then((base64) => {
//   console.log(base64); // 输出图片的Base64字符串
// }).catch((error) => {
//   console.error(error);
// });

// 不是form格式的post 参数
// const notFormParams = ['login', 'morningMeeting']   // 线上log不是form格式
const notFormParams = ['morningMeeting']
// const isForm = url => {
// 	notFormParams.some(str => url.includes(str))
// }

export const setRequestConfig = () => {
  uni.$u.http.setConfig((config) => {
    /* config 为默认全局配置*/
    config.baseURL = BASE_URL /* 本地根域名 */
    return config
  })
  // 请求拦截
  uni.$u.http.interceptors.request.use(
    (config) => {
		console.log(config)
      let token = GET_STORAGE('TOKEN')
      if (token) {
        config.header.Authorization = `Bearer ${token}`
        config.header.token = `${token}`
      }
	  // if (config.method == 'POST' && token) {
		 //  config.header['Content-Type'] = "application/x-www-form-urlencoded"
	  // }
	  // if (config.method == 'POST' && !config.url.includes('login')) {
		 //  config.header['Content-Type'] = "application/x-www-form-urlencoded"
	  // }
	  
	  // if (config.method == 'POST' && !config.url.includes('morningMeeting')) {
		 //  config.header['Content-Type'] = "application/x-www-form-urlencoded"
	  // }
	  if (config.method == 'POST' && !notFormParams.some(str => config.url.includes(str))) {
	  		config.header['Content-Type'] = "application/x-www-form-urlencoded"
	  }
	  // if (config.method == 'POST') {
	  // 		config.header['Content-Type'] = "application/x-www-form-urlencoded"
	  // }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // 响应拦截
  uni.$u.http.interceptors.response.use(
    (response) => {
      if (response.data.code == 401) {
        // 提示重新登录
        uni.$showMsg('请登录')
        useUserStore().userLogout()
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/my/my'
          })
        }, 1000);
        
      }
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}



export const uploadForm = (url, data = {}) => new Promise((resolve, reject) => {
	url = `${BASE_URL}${url}`
	console.log(getFileType(data.filePath))
	let header = {}
    // let token = useUserStore().token
    let token = GET_STORAGE('TOKEN')
	header['Authorization'] = `Bearer ${token}`
	header['token'] = `${token}`
	header["Content-Type"] = "multipart/form-data"
	uni.uploadFile({
		url, //仅为示例，非真实的接口地址
		filePath: data.filePath,
		fileType: getFileType(data.filePath),
		name: 'file',
		header,
		success: (res) => {
			// console.log(res);
			resolve(res)
		},
		
	});
})
