

import { BASE_FILE_URL } from '@/interface/constant.js'


//判断数据类型
const _toString = Object.prototype.toString;
export const toRawType = value => _toString.call(value).slice(8, -1)


// 处理get参数
export const formatParams = params => {
	if(params) {
		let url = '?'
		for(const propName of Object.keys(params)) {
		const value = params[propName]
		let part = encodeURIComponent(propName) + '='
		if(value !== null && typeof value !== 'undefined') {
		  if(typeof value === 'object') {
			for(const key of Object.keys(value)) {
			  if(value[key] !== null && typeof value[key] !== 'undefined') {
				let params = propName + '[' + key + ']'
				let subPart = encodeURIComponent(params) + '='
				url += subPart + encodeURIComponent(value[key]) + '&'
			  }
			}
		  } else {
			url += part + encodeURIComponent(value) + '&'
		  }
		}
		}
		return url.slice(0, -1)
	} else {
		return ''
	}
}

// 时间处理
const formatNum = n => n.toString()[1] ? n : '0' + n
const weekDays = ['Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.', 'Sun.']
export const formatDate = time => {
    let date = time? new Date(time): new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let weekDay = weekDays[date.getDay() -1]
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    return [ year,[ month, day].map(formatNum).join('-'), weekDay, [hour, minute].map(formatNum).join(':'), formatNum(second) ]
    // return [ year,[ month, day].map(formatNum).join('-'), weekDay, [hour, minute, second].map(formatNum).join(':') ]
    // return [ month, day].map(formatNum).join('-') +'   ' + weekDay + ' ' +[hour, minute, second].map(formatNum).join(':')
}


export const getTiming = num => {
  let minute = Math.floor(num / 60)
  let sec = num % 60
  return `${formatNum(minute)}:${formatNum(sec)}`
}


export const openDocment = path => {
		if(!path) return
		let url = `${BASE_FILE_URL}${path}`
		let fileType = url.split('.').pop();   //去掉点 如下.doc=>doc
		
		// console.log(2222222)
		// console.log(url)
		// console.log(fileType)
		uni.downloadFile({
			url,
			success: function(res) {
				let filePath = res.tempFilePath;
				setTimeout(
					() =>{
						console.log(33333)
						uni.openDocument({
							filePath: encodeURI(filePath),
							fileType,
							showMenu: false,
							success: function () {
							  console.log("打开文档成功");
							},
							fail: function (e) {
							  console.log(e);
							}
						})
					},
					  
					1000
				)
			}
		});
	}
	

export const getFileType = (fileName) => {
  // 后缀获取
  let suffix = ''
  // 获取类型结果
  let result = ''
  // 路径为空判断
  if (!fileName) return false
 
  try {
    // 截取文件后缀
    suffix = fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length)
    // 文件后缀转小写，方便匹配
    suffix = suffix.toLowerCase()
  } catch (err) {
    suffix = ''
  }
  // fileName无后缀返回 false
  if (!suffix) {
    return false
  }
  const fileTypeList = [
    // 图片类型
    { typeName: 'image', types: ['png', 'jpg', 'jpeg', 'bmp', 'gif'] },
    // 文本类型
    { typeName: 'txt', types: ['txt'] },
    // excel类型
    { typeName: 'excel', types: ['xls', 'xlsx'] },
    { typeName: 'word', types: ['doc', 'docx'] },
    { typeName: 'pdf', types: ['pdf'] },
    { typeName: 'ppt', types: ['ppt', 'pptx'] },
    // 视频类型
    { typeName: 'video', types: ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'] },
    // 音频
    { typeName: 'radio', types: ['mp3', 'wav', 'wmv'] },
    // 链接
    { typeName: 'link', types: ['html'] },
  ]
 
  for (let i = 0; i < fileTypeList.length; i++) {
    const fileTypeItem = fileTypeList[i]
    const typeName = fileTypeItem.typeName
    const types = fileTypeItem.types
    result = types.some(function (item) {
      return item === suffix
    })
    if (result) {
      return typeName
    }
  }
  return 'other'
}


// 异步函数处理数组中的每个URL
const fetchData = async () => {
  const results = await Promise.all(apiUrls.map(async (url) => {
	const response = await fetch(url);
	if (!response.ok) {
	  throw new Error(`Request failed with status ${response.status}`);
	}
	return response.json(); // 解析JSON数据
  }));
  // 这里的results是解析后的数据数组
  console.log(results);
  return results;
};

// 字母排序
export const orderCode = str => {
    let arr = str.split('')
	let sortArr = arr.sort((v1, v2) => (v1.charCodeAt() - v2.charCodeAt()))
    return sortArr.join('')
}