/**
 * 用户相关
 */

const util = require('../utils/util.js');
const api = require('../config/api.js');


function getAppletSysRoute(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.appletSysRoute(), params).then((res) => {
      console.log(res)
      if (res.code === '000000') {
        resolve(res.data);
      } else {
        reject(res.message);
      }
    });
  });
}



/**
 * 登录
 */
function login(params) {
  if (params['password']) {
    params['password'] = util.authEncry(params['password']);
  }
  console.log(params);
  return new Promise(function (resolve, reject) {
    util.request(api.login(), params).then((res) => {
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
 * 获取首页banner图片
 */
function getBannerImg(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.bannerImg(), params).then((res) => {
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
 * 修改密码
 */
function updatePassword(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.updatePassword(), params).then((res) => {
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
 * 重置密码
 */
function resetPassword(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.resetPassword(), params).then((res) => {
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
 * 获取验证码
 */
function getUserAuthonCode(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.getUserAuthonCode(), params).then((res) => {
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
 * 获取用户信息
 */
function getUserInfo(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.getUserInfo(), params).then((res) => {
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
 * 修改用户信息
 */
function updateUserInfo(params) {
  return new Promise(function (resolve, reject) {
    util.request(api.updateUserInfo(), params).then((res) => {
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
  login,
  getBannerImg,
  getUserAuthonCode,
  getAppletSysRoute,
  updatePassword,
  resetPassword,
  getUserInfo,
  updateUserInfo
};
