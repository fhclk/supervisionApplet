let ApiRootUrl = 'https://myDomain/';

var app = getApp();

// let surveyBaseUrl = app.globalData.baseUrl.surveyBaseUrl || ApiRootUrl;
// let inspectorBaseUrl = app.globalData.baseUrl.inspectorBaseUrl || ApiRootUrl;

/**
 * 设置全局对象中的当前选中系统的地址
 */
function setApiBaseUrl(survey, inspector) {
  let surveyUrl = isEndByforwardSlash(survey) ? survey : survey + '/';
  let inspectorUrl = isEndByforwardSlash(inspector) ? inspector : inspector + '/';
  app.globalData.baseUrl.surveyBaseUrl = surveyUrl;
  app.globalData.baseUrl.inspectorBaseUrl = inspectorUrl;
}

/**
 * 获取surey接口完整url
 */
function getSurveyUrl(api) {
  return app.globalData.baseUrl.surveyBaseUrl + api;
}

/**
 * 获取inspector接口完整url
 */
function getInspectorUrl(api) {
  return app.globalData.baseUrl.inspectorBaseUrl + api;
}

function isEndByforwardSlash(str) {
  if (!str) {
    return false;
  }
  if (str.charAt(str.length - 1) == '/') {
    return true;
  }
  return false;
}

const Api = {
  appletSysRoute: 'applet_router/appletSystem', //小程序系统路径
  login: 'mobile/user/login', //登录接口

  getEvaluationList: 'info/info!findAllQuestion.action',  //获取评论列表接口
  getEvaluationDetail: 'info/info!getSurveyState.action',  //获取评议详情接口
  evaluationLogin: 'login!loginAction.action',  //评议模拟登录
  evaluationPageUrl: 'response.action?sid=',  //评议页地址
  getEvaluationNum: 'info/info!findWaitTotal.action',  //获取评议数量
  bannerImg: 'mobile/banner/findBannerPicture', //获取首页的图片

  updatePassword: 'mobile/user/updateUserPassWord', //修改密码

  getUserInfo: 'mobile/user/findUserById',  //获取用户信息
  updateUserInfo: 'mobile/user/updateUserInfo', //修改用户信息
  getEmailAuthonCode: 'mobile/user/getCode',  //获得验证码
  resetPassword: 'mobile/user/resetPassWord',  //重置密码
  authonCode: 'mobile/diaoWenRemot/sendCode', //获取验证码

  findIsReadNotice: 'mobile/noticeInfoRead/findIsReadNotice', //已读列表
  findIsNoReadNotice: 'mobile/noticeInfo/findIsNoReadNotice', //未读列表
  saveIsReadNotice: 'mobile/noticeInfoRead/saveIsReadNotice', //设置未读为已读
  findMyNotice: 'mobile/noticeInfo/findMyNotice', //我的列表
  findByNoticeIdAndUserId: 'mobile/noticeInfo/findByNoticeIdAndUserId', //详情页面
  countIsNoReadNotice: 'mobile/noticeInfo/countIsNoReadNotice', //未读消息统计
  getUserAuthonCode: 'mobile/user/getCode',
}

module.exports = {
  setApiBaseUrl, //设置个系统baseurl
  appletSysRoute: () => { return ApiRootUrl + Api.appletSysRoute}, //小程序系统路径
  login: () => { return getInspectorUrl(Api.login)}, //登录接口

  getEvaluationList: () => { return getSurveyUrl(Api.getEvaluationList)},  //获取评论列表接口
  getEvaluationDetail: () => { return getSurveyUrl(Api.getEvaluationDetail) },  //获取评议详情接口
  evaluationLogin: () => { return getSurveyUrl(Api.evaluationLogin) },  //评议模拟登录
  evaluationPageUrl: () => { return getSurveyUrl(Api.evaluationPageUrl) },  //评议页地址
  getEvaluationNum: () => { return getSurveyUrl(Api.getEvaluationNum) },  //获取评议数量

  bannerImg: () => { return getInspectorUrl(Api.bannerImg) }, //获取首页的图片
  updatePassword: () => { return getInspectorUrl(Api.updatePassword) }, //修改密码
  getUserInfo: () => { return getInspectorUrl(Api.getUserInfo) },  //获取用户信息
  updateUserInfo: () => { return getInspectorUrl(Api.updateUserInfo) },  //获取用户信息
  getEmailAuthonCode: () => { return getInspectorUrl(Api.getEmailAuthonCode) },  //获得验证码
  resetPassword: () => { return getInspectorUrl(Api.resetPassword) },  //重置密码
  authonCode: () => { return getInspectorUrl(Api.authonCode) }, //获取验证码

  findIsReadNotice: () => { return getInspectorUrl(Api.findIsReadNotice) }, //已读列表
  findIsNoReadNotice: () => { return getInspectorUrl(Api.findIsNoReadNotice) }, //未读列表
  saveIsReadNotice: () => { return getInspectorUrl(Api.saveIsReadNotice)}, //设置未读为已读
  findMyNotice: () => { return getInspectorUrl(Api.findMyNotice)}, //我的列表
  findByNoticeIdAndUserId: () => { return getInspectorUrl(Api.findByNoticeIdAndUserId)}, //详情页面
  countIsNoReadNotice: () => { return getInspectorUrl(Api.countIsNoReadNotice)}, //未读消息统计
  getUserAuthonCode: () => { return getInspectorUrl(Api.getUserAuthonCode)}, //找回密码时获取验证码
};
