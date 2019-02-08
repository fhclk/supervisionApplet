/**
 * 广告通知
 */

const util = require('../utils/util.js');
const api = require('../config/api.js');

/**
 * 已读列表
 */
function findIsReadNotice(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.findIsReadNotice(), params).then((res) => {
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
 * 未读列表
 */
function findIsNoReadNotice(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.findIsNoReadNotice(), params).then((res) => {
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
 * 设置未读为已读
 */
function saveIsReadNotice(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.saveIsReadNotice(), params).then((res) => {
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
 * 我的列表
 */
function findMyNotice(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.findMyNotice(), params).then((res) => {
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
 * 详情页面
 */
function findByNoticeIdAndUserId(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.findByNoticeIdAndUserId(), params).then((res) => {
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
 * 未读消息统计
 */
function countIsNoReadNotice(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.countIsNoReadNotice(), params).then((res) => {
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
  findIsReadNotice,
  findIsNoReadNotice,
  saveIsReadNotice,
  findMyNotice,
  findByNoticeIdAndUserId,
  countIsNoReadNotice
};
