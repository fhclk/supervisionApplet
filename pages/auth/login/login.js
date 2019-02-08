// pages/auth/login/login.js

const authService = require('../../../services/auth.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moduleName: '',
    disable: false,
    account: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      moduleName: options.moduleName
    });
    wx.setStorageSync("sysName", options.moduleName);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  loginTap() {
    if (!this.data.account) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    if (!this.data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    authService.login({
      account: this.data.account,
      password: this.data.password,
    }).then(res => {
      wx.setStorage({
        key: "userInfo",
        data: res,
        success: function () {
          wx.switchTab({ url: '../../homePage/homePage' })
        }
      });
    }).catch(err => {
      wx.showToast({
        title: err || '登录失败',
        icon: 'none',
        duration: 1500
      });
    })
  },

  bindUserAccountInput(e) {
    this.setData({
      account: e.detail.value
    });
  },

  bindUserPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  retrievePassrodTap() {
    wx.redirectTo({
      url: '../resetPassword/resetPassword'
    })
  }
})