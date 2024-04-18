import { setRequestConfig, uploadForm } from './request.js';
import { formatParams } from '@/utils/index.js'



// 调用setRequestConfig函数进行请求配置
setRequestConfig();
const http = uni.$u.http
// 通用
// 发起登录请求
export const requestLogin = (data) => http.post('/api/sys/user/login', data);
export const requestFileAdd = filePath => uploadForm('api/sys/file/add', {filePath});

export const requestDeptList = (params) => http.get(`/api/sys/dept/list`)
export const requestUserListById = (params) => http.get(`/api/sys/user/list/all${params? ('/' + params) : ''}`)
export const requestUserList = (params) => http.get(`/api/sys/user/list`)



// 任务  应用 公用
// 随手拍
export const requestClappingInfo = (params) => http.get(`/api/v1/danger/simple/list${formatParams(params)}`)
export const requestClapConfirmInfo = (params) => http.get(`/api/v1/danger/simple/confirm${formatParams(params)}`)
export const  requestClapSubmit = (params) => http.post(`/api/v1/danger/simple`, params)
//随手拍审核
export const  requestClapReSubmit = (params) => http.post(`/api/v1/danger/simple/confirm`, params)

// http://192.168.1.199:18880/api/v1/danger/simple/confirm
// 事故上报
export const requestAcciReportInfo = (params) => http.get(`/api/acc/accident/report${formatParams(params)}`)
export const requestAcciConfirmInfo = (params) => http.get(`/api/acc/simple/confirm${formatParams(params)}`)
export const requestAcciPageInfo = (params) => http.get(`/api/acc/simple/page${formatParams(params)}`)
export const requestAcciHandleInfo = (params) => http.get(`/api/acc/accident/handle${formatParams(params)}`)
//事故新增
export const  requestAddAcciSub = (params) => http.post(`/api/acc/simple`, params)
//事故确认
export const  requestAcciReSubmit = (params) => http.post(`/api/acc/simple/confirm`, params)
//事故上报
export const  requestAcciReportSubmit = (params) => http.post(`/api/acc/accident/report`, params)
//事故处理
export const  requestAcciHandleSubmit = (params) => http.post(`/api/acc/accident/handle`, params)

// 事故批复
export const requestAcciReplyInfo = (params) => http.get(`/api/acc/accident/reply${formatParams(params)}`)
export const requestAcciReplyHisInfo = (params) => http.get(`/api/acc/accident/reply/${params}`)  // 事故批复记录
//事故批复提交
export const  requestAcciReplySubmit = (params) => http.post(`/api/acc/accident/reply`, params)


// http://192.168.1.199:18880/api/acc/accident/reply?page=1&rows=20&beginTime=2024-3-15&endTime=2024-3-22
// http://192.168.1.199:18880/api/acc/accident/reply/15
// http://192.168.1.199:18880/api/acc/accident/reply



// 特殊作业   http://192.168.1.199:18880/api/act/my?page=1&rows=20
export const requestWorkPendingInfo = (params) => http.get(`/api/act/pending${formatParams(params)}`)  // 活动审核
export const requestWorkMyActInfo = (params) => http.get(`/api/act/my${formatParams(params)}`)  // 我的活动
export const requestWorkdoHisInfo = (params) => http.get(`/api/doc/pending/his${formatParams(params)}`) //作业审核历史 
export const requestWorkStaysInfo = (params) => http.get(`/api/doc/stays${formatParams(params)}`)  // 作业待建
export const requestWorkDocMyInfo = (params) => http.get(`/api/doc/my${formatParams(params)}`)  // 我的作业
export const requestWorkDocPendInfo = (params) => http.get(`/api/doc/pending${formatParams(params)}`)  //作业审核 
// 新增作业
export const  requestWorkCreat = (params) => http.post(`/api/act/create`, params)

// actDeptId
// deptId
// checkerId
// place
// beginTime
// endTime
// docs[0] 'DH'
// userId
// actUserId
// content



// 任务
// 任务列表
export const  requestTaskInfo = (params) => http.get(`/api/sys/tabbar/task${formatParams(params)}`)

// 安全检查 隐患检查  dangerCheck
export const  requestTaskCheckInfo = (params) => http.get(`/api/v1/danger/check/task/list${formatParams(params)}`)
export const  requestTaskCheckById = (params) => http.get(`/api/v2/danger/check/task/submit/record${formatParams(params)}`)
// 提交
export const requestTaskCheckSub = (params) => http.post(`/api/v1/danger/check/task/submit`, params) // 提交补考答题
// 完成
export const requestTaskEnd = (params) => http.post(`/api/v1/danger/check/task/end`, params) // 提交补考答题
// http://192.168.1.199:18880/api/v1/danger/check/task/end
// danger	否
// taskId	38
// checkItemId	48

// request	积极图形哦
// imgs	ssc-dzsh/1/fa4e9ab31f00496d85be2f57cb7be7cf.jpeg
// deptId	101
// remark	哈哈哈咕咕咕
// danger	是
// taskId	38
// checkItemId	49


// http://192.168.1.199:18880/api/v1/danger/check/task/submit
// http://192.168.1.199:18880/api/v1/danger/check/task/submit



// 教育  培训  trainPlan
// 学习
export const  requestTaskPlanInfo = (params) => http.get(`/api/train/plan/list${formatParams(params)}`)
export const  requestTaskPlanContent = id => http.get(`/api/train/plan/content/${id}`)
export const  requestTrainLearnSubmit = (params) => http.post(`/api/train/plan/learn`, params)

// 考试
export const  requestPlanPaperInfo = id => http.get(`/api/train/plan/paper/${id}`)
export const  requestPlanPaper2Info = id => http.get(`/api/train/plan/detail/${id}`)   //查看试卷
export const  requestPlancollectAdd = params => http.post(`/api/train/collect/add/${params.type}/${params.id}`)  //收藏
export const  requestPlancollectDel = id => http.post(`/api/train/collect/del/${id}`) //取消收藏
export const  requestPlanPaperIbank = (params) => http.post(`/api/v2/train/ibank/paper`, params) // 提交答题
export const  requestPlanExtraPaper = (params) => http.post(`/api/v2/train/ibank/extraPaper`, params) // 提交补考答题

// http://192.168.1.199:18880/api/train/plan/detail/17
// http://192.168.1.199:18880/api/train/plan/content/15  上次考试

// http://192.168.1.199:18880/api/train/plan/paper/18  试题

// http://192.168.1.199:18880/api/train/plan/detail/17  补考试题
// http://192.168.1.199:18880/api/train/collect/add/1/3  收藏
// http://192.168.1.199:18880/api/train/collect/del/4   取消收藏
// http://192.168.1.199:18880/api/v2/train/ibank/extraPaper  提交答题


// tpId	35
// startTime	2024-04-10 14:40:46
// endTime	2024-04-10 14:41:53
// items[1].id	1
// items[2].id	3
// items[3].id	2
// items[0].id	4
// items[1].tpiId	124
// items[0].tpiId	126
// items[2].tpiId	125
// items[3].tpiId	123
// items[1].correct	false
// items[3].correct	true
// items[0].correct	true
// items[2].correct	true
// items[0].answer	ABCD
// items[3].answer	A
// items[2].answer	A
// items[1].answer	B
// items[0].answerOld	ABCD
// imgs	ssc-dzsh/1/5ce56d9ba9f44bff8ec7b379f7f7179e.png,ssc-dzsh/1/145fd2254b32494c9fd8b3258ae8b5c2.png
// items[1].answerOld	A
// items[2].answerOld	A
// items[3].answerOld	A
// sign	ssc-dzsh/1/3ae91540aa60466bbc4bbf39fdaa3695.png
// avatar	ssc-dzsh/1/e8f5833371c54e31a657ee4263e3c04c.jpeg

// http://192.168.1.199:18880/api/train/plan/learn
// http://221.214.164.186:18888/api/train/plan/list?page=1&size=20&name=
// http://221.214.164.186:18888/api/train/plan/list?page=1&size=20&name=
// http://221.214.164.186:18888/api/train/plan/content/64


// 随手拍  隐患  danger
export const  requestTaskMyDanInfo = (params) => http.get(`/api/danger/my${formatParams(params)}`)
export const  requestTaskZGDanInfo = (params) => http.get(`/api/danger/zg/list${formatParams(params)}`)
export const  requestTaskFHDanInfo = (params) => http.get(`/api/danger/fh/list${formatParams(params)}`)


// 隐患上传
export const  requestDangerSubmit = (params) => http.post(`/api/danger/submit`, params)
// 隐患整改
export const  requestDangerZGSubmit = (params) => http.post(`/api/danger/zg/submit`, params)
// 隐患符合
export const  requestDangerFHSubmit = (params) => http.post(`/api/danger/fh/submit`, params)

// 劳保
export const  requestTaskGoodInfo = (params) => http.get(`/api/labor/get/page${formatParams(params)}`)
export const  requestTaskGoodSubmit = (params) => http.post(`/api/labor/get${formatParams(params)}`)
// sign,id,pic
// export const  requestTaskMyDanInfo = (params) => http.get(`/api/danger/my${formatParams(params)}`)
// http://192.168.1.199:18880/api/labor/get/page?page=1&rows=20&beginTime=2024-3-5&endTime=2024-3-12
// https://fanyi.baidu.com/mtpe/v2/member/config?_=1710203135281
// 提交

// 安全责任制
export const  requestRespSystemsInfo = (params) => http.get(`/api/resp/systems${formatParams(params)}`)
export const  requestRespCreatersInfo = (params) => http.get(`/api/resp/letter/creaters${formatParams(params)}`)
export const  requestRespSignersInfo = (params) => http.get(`/api/resp/letter/signers${formatParams(params)}`)
export const  requestCreatersInfo = (params, id) => http.get(`/api/resp/letter/creatersById/${id}${formatParams(params)}`)
// 签字
export const  requestLetterSignSubmit = (params) => http.post(`/api/resp/letter/signSign`, params)
export const  requestCreatSignSubmit = (params) => http.post(`/api/resp/letter/creatSign`, params)


// http://192.168.1.199:18880/api/resp/letter/signSign

// http://192.168.1.199:18880/api/resp/letter/creatSign

// http://192.168.1.199:18880/api/resp/letter/creatersById/8?page=1&rows=20
// http://192.168.1.199:18880/api/resp/letter/signers?page=1&rows=20&name=&post=
// // http://192.168.1.199:18880/api/resp/systems?page=1&rows=20&name=&post=
// http://192.168.1.199:18880/api/resp/letter/creaters?page=1&rows=20&name=&post=




// 文化
export const  requestSaftCulInfo = (params) => http.get(`/api/culture/publicity/page${formatParams(params)}`)




// http://192.168.1.199:18880/api/culture/publicity/page?page=1&rows=20&beginTime=2024-3-5&endTime=2024-3-12
// http://192.168.1.199:18880/api/culture/publicity/read

// 检查
// http://192.168.1.199:18880/api/sys/user/currentTime
// http://192.168.1.199:18880/api/v2/danger/check/task/submit/record?taskId=21&checkItemId=38

// 劳保
// http://192.168.1.199:18880/api/labor/get/page?page=1&rows=20&beginTime=2024-3-5&endTime=2024-3-12
// https://fanyi.baidu.com/mtpe/v2/member/config?_=1710203135281
// 提交

// 责任制
// http://192.168.1.199:18880/api/respkpi/task/record?id=122
// http://192.168.1.199:18880/api/respkpi/task/assessee  post
// http://192.168.1.199:18880/api/sys/file/add   签字

// 责任制考评
// http://192.168.1.199:18880/api/respkpi/task/auditor?taskId=10&userName=
// http://192.168.1.199:18880/api/sys/file/add
// http://192.168.1.199:18880/api/respkpi/task/auditor/all  post

// 日常隐患整改
// http://192.168.1.199:18880/api/risk/danger/recties?page=1&rows=20
// http://192.168.1.199:18880/api/risk/danger/evals?page=1&rows=20
// http://192.168.1.199:18880/api/risk/danger/my?page=1&rows=20

// http://192.168.1.199:18880/api/risk/danger/my?page=1&rows=20
// http://192.168.1.199:18880/api/risk/danger/rect  post
// http://192.168.1.199:18880/api/risk/danger/recties?page=1&rows=20
// http://192.168.1.199:18880/api/sys/dept/list?name=
// http://192.168.1.199:18880/api/sys/user/list/all/101
// http://192.168.1.199:18880/api/sys/user/list/all/117
// http://192.168.1.199:18880/api/sys/file/add  post  file
// http://192.168.1.199:18880/api/risk/danger/up   post
// http://192.168.1.199:18880/api/risk/danger/recties?page=1&rows=20

// 日常性隐患排查
// http://192.168.1.199:18880/api/risk/danger/evals?page=1&rows=20
// http://192.168.1.199:18880/api/risk/danger/recties?page=1&rows=20
// http://192.168.1.199:18880/api/risk/danger/my?page=1&rows=20

// 岗前培训
// http://192.168.1.199:18880/api/train/front/teacher
// http://192.168.1.199:18880/api/train/front/teacher
// http://192.168.1.199:18880/api/sys/file/add   post

// 晨会
export const  requestMorningMeetingInfo = (params) => http.get(`/api/morningMeeting/get/${params.bizId || ''}`)
export const  requestMorningMeetingSubmit = (params) => http.post(`/api/morningMeeting/put`, params)

// http://192.168.1.199:18880/api/morningMeeting/put
// http://192.168.1.199:18880/api/morningMeeting/get/97
// http://192.168.1.199:18880/api/morningMeeting/get/81
// http://192.168.1.199:18880/api/morningMeeting/get/81   
// http://192.168.1.199:18880/api/sys/file/add
// http://192.168.1.199:18880/api/morningMeeting/put


// 应知应会  岗位职责\操作流程\安全知识\岗位风险告知
export const  requestKnowPostInfo = (params) => http.get(`/api/culture/now/page${formatParams(params)}`)
// 应知应会  法律法规
export const  requestKnowLawInfo = (params) => http.get(`/api/laws/regulations/page${formatParams(params)}`)
// 应知应会  规章制度
export const  requestKnowRuleInfo = (params) => http.get(`/api/laws/rulesFile/page${formatParams(params)}`)
// 应知应会  职业病风险告知
export const  requestKnowFactorInfo = (params) => http.get(`/api/oh/harmFactorItem/page${formatParams(params)}`)
// 应知应会个人档案
export const  requestPersonInfo = (params) => http.get(`/api/sys/user/detail`)
// 应知应会 目标责任书
export const  requestRespCteat = (params) => http.get(`/api/resp/letter/creaters${formatParams(params)}`)
export const  requestRespSign = (params) => http.get(`/api/resp/letter/signers${formatParams(params)}`)
export const  requestResps = (params) => http.get(`/api/resp/systems${formatParams(params)}`)





// 事故管理
// http://192.168.1.199:18880/api/sys/user/icon/num

//   事故上报
// http://192.168.1.199:18880/api/acc/simple/page?page=1&rows=20&beginTime=2024-3-5&endTime=2024-3-12
// http://192.168.1.199:18880/api/acc/simple/confirm?page=1&rows=20&beginTime=2024-3-5&endTime=2024-3-12
// http://192.168.1.199:18880/api/acc/accident/report?page=1&rows=20&beginTime=2024-3-5&endTime=2024-3-12
// http://192.168.1.199:18880/api/acc/accident/handle?page=1&rows=20&beginTime=2024-3-5&endTime=2024-3-12

// http://192.168.1.199:18880/api/acc/accident/handle  post  处理
// http://192.168.1.199:18880/api/acc/accident/handle?page=1&rows=20&beginTime=2024-3-5&endTime=2024-3-12

// http://192.168.1.199:18880/api/sys/file/add
// http://192.168.1.199:18880/api/sys/file/add   mp3
// http://192.168.1.199:18880/api/acc/simple  提交

// 事故批复
// http://192.168.1.199:18880/api/acc/accident/reply?page=1&rows=20&beginTime=2024-3-5&endTime=2024-3-12

// 特殊作业
// http://192.168.1.199:18880/api/sys/dept/list
// http://192.168.1.199:18880/api/act/pending?page=1&rows=20
// http://192.168.1.199:18880/api/act/my?page=1&rows=20
// http://192.168.1.199:18880/api/doc/pending/his?page=1&rows=20
// http://192.168.1.199:18880/api/doc/stays?page=1&rows=20
// http://192.168.1.199:18880/api/doc/my?page=1&rows=20
// http://192.168.1.199:18880/api/doc/pending?page=1&rows=20


// http://192.168.1.199:18880/api/act/create  post 
// http://192.168.1.199:18880/api/act/my?page=1&rows=20


// 风险
// 清单
// http://192.168.1.199:18880/api/risk/danger/checks?page=1&size=20&name=&ifDanger=&beginTime=&endTime=
// 日常性
// http://192.168.1.199:18880/api/risk/danger/recties?page=1&rows=20
// http://192.168.1.199:18880/api/risk/danger/evals?page=1&rows=20
// http://192.168.1.199:18880/api/risk/danger/my?page=1&rows=20


// 岗前培训


// http://192.168.1.199:18880/api/sys/dept/list?name=
// http://192.168.1.199:18880/api/sys/user/list/all/106

// http://192.168.1.199:18880/api/sys/file/add

// http://192.168.1.199:18880/api/train/frontledger  post 提交



// 暂时不知是干啥的
// http://221.214.164.186:18888/api/sys/dic/lists
// http://192.168.1.199:18880/api/sys/user/currentTime
// http://192.168.1.199:18880/api/sys/dept/list