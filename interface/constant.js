

let isDev = process.env.NODE_ENV === 'development'
 
// export const BASE_URL = isDev? 'http://221.214.164.186:18888/': 'http://221.214.164.186:18888/';
// export const BASE_FILE_URL = isDev? 'http://221.214.164.186:18880/': 'http://221.214.164.186:18880/';

export const BASE_URL = isDev? 'http://192.168.1.199:18880/': 'http://192.168.1.199:18880/';
export const BASE_FILE_URL = isDev? 'http://58.58.47.142:9080/': 'http://58.58.47.142:9080/';

// export const BASE_LINE_PRE = 'http://221.214.164.186:18880/open_office/?src='
// export const BASE_LINE_PRE = 'http://mowenxiaosheng.com.cn/open_office/?src='
export const BASE_LINE_PRE = 'http://101.34.47.131/open_office/?src='


// http://192.168.1.199:18880/api/sys/user/login