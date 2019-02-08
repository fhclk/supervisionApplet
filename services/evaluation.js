/**
 * 评测评议相关
 */

const util = require('../utils/util.js');
const api = require('../config/api.js');

/**
 * 获取评议列表
 */
function getEvaluationList(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.getEvaluationList(), params).then((res) => {
      console.log(res)
      if (res.success === true) {
        resolve(res);
      } else {
        reject(res.message);
      }
    });
  });
}

/**
 * 获取评议内容
 */
function getEvaluationDetail(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.getEvaluationDetail(), params).then((res) => {
      console.log(res)
      if (res.success === true) {
        resolve(res.data);
      } else {
        reject(res.message);
      }
    });
  });
}

/**
 * 评议模拟登录
 */
function evaluationLogin(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.evaluationLogin(), params).then((res) => {
      console.log(res)
      if (res) {
        resolve(res);
      } else {
        reject();
      }
    });
  });
}

/**
 * 获取评论页地址
 */
function getEvaluationPageUrl(id) {
  return api.evaluationPageUrl() + id;
}

/**
 * 获取评议登录地址
 */
function getEvaluationLoginUrl(id, username) {
  return api.evaluationLogin() + '?id=' + id + '&username=' + username;
}

/**
 * 获取评议列表
 */
function getEvaluationNum(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.getEvaluationNum(), params).then((res) => {
      console.log(res)
      if (res) {
        resolve(res);
      } else {
        reject('');
      }
    });
  });
}

/**
 * 获取验证码
 */
function getAuthonCode(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.authonCode(), params).then((res) => {
      console.log(res)
      if (res.success === true) {
        resolve(res.data);
      } else {
        reject(res.message);
      }
    });
  });
}


module.exports = {
  getEvaluationList,
  getEvaluationDetail,
  evaluationLogin,
  getEvaluationPageUrl,
  getEvaluationLoginUrl,
  getEvaluationNum,
  getAuthonCode
};
