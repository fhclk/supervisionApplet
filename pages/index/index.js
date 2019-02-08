//index.js
//获取应用实例

var WxSearch = require('../../lib/wxSearchView/wxSearchView.js');
const authService = require('../../services/auth.js');
const api = require('../../config/api.js');

const app = getApp()

Page({
  systems: [],
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasTaped:false
  },

  selectSystemTap() {
    this.setData({
      hasTaped: !this.data.hasTaped
    })
  },
  
  // 搜索栏
  onLoad: function () {
    this.getAppletSysInfo(res => {
      this.systems = res;
      let systems = [];
      res.forEach((v, i) => {
        systems.push(v.name);
      })
      var that = this;
      WxSearch.init(
        that,  // 本页面一个引用
        systems, // 热点搜索推荐，[]表示不使用
        systems,// 搜索匹配，[]表示不使用
        that.mySearchFunction, // 提供一个搜索回调函数
        that.myGobackFunction //提供一个返回回调函数
      );
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    try {
      this.wxSearchClear();
    }
    catch (e) {

    }
  },

  // 转发函数,固定部分
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 搜索回调函数  
  mySearchFunction: function (value) {
    let has = false;
    let sys = null;
    for (let i = 0; i < this.systems.length; ++i) {
      if (value == this.systems[i].name) {
        has = true;
        sys = this.systems[i];
        break;
      }
    }
    if (!has) {
      wx.showToast({
        title: '没有您搜索的系统',
        icon:'none',
        duration: 2000
      })
    }
    else {
      api.setApiBaseUrl(sys.routeData.survey, sys.routeData.inspector);
      wx.navigateTo({
        url: '../auth/login/login?moduleName=' + value
      })
    }
    
  },

  // 返回回调函数
  myGobackFunction: function () {
    this.setData({
      hasTaped: !this.data.hasTaped
    })
  },

  /**
   * 网络请求获取各系统的api
   */
  getAppletSysInfo(success) {
    authService.getAppletSysRoute({

    }).then(res => {
      success && success(res);
    })
  }
})
