"use strict";
const common_vendor = require("../common/vendor.js");
const interface_request = require("./request.js");
const utils_index = require("../utils/index.js");
interface_request.setRequestConfig();
const http = common_vendor.index.$u.http;
const requestFileAdd = (filePath) => interface_request.uploadForm("api/sys/file/add", { filePath });
const requestDeptList = (params) => http.get(`/api/sys/dept/list`);
const requestUserList = (params) => http.get(`/api/sys/user/list`);
const requestClappingInfo = (params) => http.get(`/api/v1/danger/simple/list${utils_index.formatParams(params)}`);
const requestClapConfirmInfo = (params) => http.get(`/api/v1/danger/simple/confirm${utils_index.formatParams(params)}`);
const requestClapSubmit = (params) => http.post(`/api/v1/danger/simple`, params);
const requestClapReSubmit = (params) => http.post(`/api/v1/danger/simple/confirm`, params);
const requestAcciReportInfo = (params) => http.get(`/api/acc/accident/report${utils_index.formatParams(params)}`);
const requestAcciConfirmInfo = (params) => http.get(`/api/acc/simple/confirm${utils_index.formatParams(params)}`);
const requestAcciPageInfo = (params) => http.get(`/api/acc/simple/page${utils_index.formatParams(params)}`);
const requestAcciHandleInfo = (params) => http.get(`/api/acc/accident/handle${utils_index.formatParams(params)}`);
const requestAddAcciSub = (params) => http.post(`/api/acc/simple`, params);
const requestAcciReSubmit = (params) => http.post(`/api/acc/simple/confirm`, params);
const requestAcciReportSubmit = (params) => http.post(`/api/acc/accident/report`, params);
const requestAcciHandleSubmit = (params) => http.post(`/api/acc/accident/handle`, params);
const requestAcciReplyInfo = (params) => http.get(`/api/acc/accident/reply${utils_index.formatParams(params)}`);
const requestWorkPendingInfo = (params) => http.get(`/api/act/pending${utils_index.formatParams(params)}`);
const requestWorkMyActInfo = (params) => http.get(`/api/act/my${utils_index.formatParams(params)}`);
const requestWorkdoHisInfo = (params) => http.get(`/api/doc/pending/his${utils_index.formatParams(params)}`);
const requestWorkStaysInfo = (params) => http.get(`/api/doc/stays${utils_index.formatParams(params)}`);
const requestWorkDocMyInfo = (params) => http.get(`/api/doc/my${utils_index.formatParams(params)}`);
const requestWorkDocPendInfo = (params) => http.get(`/api/doc/pending${utils_index.formatParams(params)}`);
const requestTaskInfo = (params) => http.get(`/api/sys/tabbar/task${utils_index.formatParams(params)}`);
const requestTaskCheckInfo = (params) => http.get(`/api/v1/danger/check/task/list${utils_index.formatParams(params)}`);
const requestTaskCheckById = (params) => http.get(`/api/v2/danger/check/task/submit/record${utils_index.formatParams(params)}`);
const requestTaskCheckSub = (params) => http.post(`/api/v1/danger/check/task/submit`, params);
const requestTaskEnd = (params) => http.post(`/api/v1/danger/check/task/end`, params);
const requestTaskPlanInfo = (params) => http.get(`/api/train/plan/list${utils_index.formatParams(params)}`);
const requestTaskPlanContent = (id) => http.get(`/api/train/plan/content/${id}`);
const requestTrainLearnSubmit = (params) => http.post(`/api/train/plan/learn`, params);
const requestPlanPaperInfo = (id) => http.get(`/api/train/plan/paper/${id}`);
const requestPlanPaper2Info = (id) => http.get(`/api/train/plan/detail/${id}`);
const requestPlancollectAdd = (params) => http.post(`/api/train/collect/add/${params.type}/${params.id}`);
const requestPlancollectDel = (id) => http.post(`/api/train/collect/del/${id}`);
const requestPlanPaperIbank = (params) => http.post(`/api/v2/train/ibank/paper`, params);
const requestPlanExtraPaper = (params) => http.post(`/api/v2/train/ibank/extraPaper`, params);
const requestTaskMyDanInfo = (params) => http.get(`/api/danger/my${utils_index.formatParams(params)}`);
const requestTaskZGDanInfo = (params) => http.get(`/api/danger/zg/list${utils_index.formatParams(params)}`);
const requestTaskFHDanInfo = (params) => http.get(`/api/danger/fh/list${utils_index.formatParams(params)}`);
const requestDangerSubmit = (params) => http.post(`/api/danger/submit`, params);
const requestDangerZGSubmit = (params) => http.post(`/api/danger/zg/submit`, params);
const requestDangerFHSubmit = (params) => http.post(`/api/danger/fh/submit`, params);
const requestTaskGoodInfo = (params) => http.get(`/api/labor/get/page${utils_index.formatParams(params)}`);
const requestTaskGoodSubmit = (params) => http.post(`/api/labor/get${utils_index.formatParams(params)}`);
const requestRespSystemsInfo = (params) => http.get(`/api/resp/systems${utils_index.formatParams(params)}`);
const requestRespCreatersInfo = (params) => http.get(`/api/resp/letter/creaters${utils_index.formatParams(params)}`);
const requestRespSignersInfo = (params) => http.get(`/api/resp/letter/signers${utils_index.formatParams(params)}`);
const requestCreatersInfo = (params, id) => http.get(`/api/resp/letter/creatersById/${id}${utils_index.formatParams(params)}`);
const requestLetterSignSubmit = (params) => http.post(`/api/resp/letter/signSign`, params);
const requestCreatSignSubmit = (params) => http.post(`/api/resp/letter/creatSign`, params);
const requestSaftCulInfo = (params) => http.get(`/api/culture/publicity/page${utils_index.formatParams(params)}`);
const requestMorningMeetingInfo = (params) => http.get(`/api/morningMeeting/get/${params.bizId || ""}`);
const requestMorningMeetingSubmit = (params) => http.post(`/api/morningMeeting/put`, params);
const requestKnowPostInfo = (params) => http.get(`/api/culture/now/page${utils_index.formatParams(params)}`);
const requestKnowLawInfo = (params) => http.get(`/api/laws/regulations/page${utils_index.formatParams(params)}`);
const requestKnowRuleInfo = (params) => http.get(`/api/laws/rulesFile/page${utils_index.formatParams(params)}`);
const requestKnowFactorInfo = (params) => http.get(`/api/oh/harmFactorItem/page${utils_index.formatParams(params)}`);
const requestPersonInfo = (params) => http.get(`/api/sys/user/detail`);
const requestRespCteat = (params) => http.get(`/api/resp/letter/creaters${utils_index.formatParams(params)}`);
const requestRespSign = (params) => http.get(`/api/resp/letter/signers${utils_index.formatParams(params)}`);
const requestResps = (params) => http.get(`/api/resp/systems${utils_index.formatParams(params)}`);
exports.requestAcciConfirmInfo = requestAcciConfirmInfo;
exports.requestAcciHandleInfo = requestAcciHandleInfo;
exports.requestAcciHandleSubmit = requestAcciHandleSubmit;
exports.requestAcciPageInfo = requestAcciPageInfo;
exports.requestAcciReSubmit = requestAcciReSubmit;
exports.requestAcciReplyInfo = requestAcciReplyInfo;
exports.requestAcciReportInfo = requestAcciReportInfo;
exports.requestAcciReportSubmit = requestAcciReportSubmit;
exports.requestAddAcciSub = requestAddAcciSub;
exports.requestClapConfirmInfo = requestClapConfirmInfo;
exports.requestClapReSubmit = requestClapReSubmit;
exports.requestClapSubmit = requestClapSubmit;
exports.requestClappingInfo = requestClappingInfo;
exports.requestCreatSignSubmit = requestCreatSignSubmit;
exports.requestCreatersInfo = requestCreatersInfo;
exports.requestDangerFHSubmit = requestDangerFHSubmit;
exports.requestDangerSubmit = requestDangerSubmit;
exports.requestDangerZGSubmit = requestDangerZGSubmit;
exports.requestDeptList = requestDeptList;
exports.requestFileAdd = requestFileAdd;
exports.requestKnowFactorInfo = requestKnowFactorInfo;
exports.requestKnowLawInfo = requestKnowLawInfo;
exports.requestKnowPostInfo = requestKnowPostInfo;
exports.requestKnowRuleInfo = requestKnowRuleInfo;
exports.requestLetterSignSubmit = requestLetterSignSubmit;
exports.requestMorningMeetingInfo = requestMorningMeetingInfo;
exports.requestMorningMeetingSubmit = requestMorningMeetingSubmit;
exports.requestPersonInfo = requestPersonInfo;
exports.requestPlanExtraPaper = requestPlanExtraPaper;
exports.requestPlanPaper2Info = requestPlanPaper2Info;
exports.requestPlanPaperIbank = requestPlanPaperIbank;
exports.requestPlanPaperInfo = requestPlanPaperInfo;
exports.requestPlancollectAdd = requestPlancollectAdd;
exports.requestPlancollectDel = requestPlancollectDel;
exports.requestRespCreatersInfo = requestRespCreatersInfo;
exports.requestRespCteat = requestRespCteat;
exports.requestRespSign = requestRespSign;
exports.requestRespSignersInfo = requestRespSignersInfo;
exports.requestRespSystemsInfo = requestRespSystemsInfo;
exports.requestResps = requestResps;
exports.requestSaftCulInfo = requestSaftCulInfo;
exports.requestTaskCheckById = requestTaskCheckById;
exports.requestTaskCheckInfo = requestTaskCheckInfo;
exports.requestTaskCheckSub = requestTaskCheckSub;
exports.requestTaskEnd = requestTaskEnd;
exports.requestTaskFHDanInfo = requestTaskFHDanInfo;
exports.requestTaskGoodInfo = requestTaskGoodInfo;
exports.requestTaskGoodSubmit = requestTaskGoodSubmit;
exports.requestTaskInfo = requestTaskInfo;
exports.requestTaskMyDanInfo = requestTaskMyDanInfo;
exports.requestTaskPlanContent = requestTaskPlanContent;
exports.requestTaskPlanInfo = requestTaskPlanInfo;
exports.requestTaskZGDanInfo = requestTaskZGDanInfo;
exports.requestTrainLearnSubmit = requestTrainLearnSubmit;
exports.requestUserList = requestUserList;
exports.requestWorkDocMyInfo = requestWorkDocMyInfo;
exports.requestWorkDocPendInfo = requestWorkDocPendInfo;
exports.requestWorkMyActInfo = requestWorkMyActInfo;
exports.requestWorkPendingInfo = requestWorkPendingInfo;
exports.requestWorkStaysInfo = requestWorkStaysInfo;
exports.requestWorkdoHisInfo = requestWorkdoHisInfo;