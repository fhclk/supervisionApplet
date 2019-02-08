// pages/homePage/homePage.js

const authService = require('../../services/auth.js');
const evaluationService = require('../../services/evaluation.js');
const notifyService = require('../../services/notification.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImgUrl:'../../static/images/banner.png',
    evaluationNum: 0,
    notificationNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('sysName')
    })
    this.getBannerImg();
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
    this.getEvaluationNum();
    this.getNotificationNum();
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

  /**
   * 
   */
  getBannerImg() {
    authService.getBannerImg().then(res => {
      this.setData({
        bannerImgUrl:res[0]
      });
      console.log(this.data);
    })
  },

  /**
   * 获取评测评议数量
   */
  getEvaluationNum() {
    const userInfo = wx.getStorageSync('userInfo');
    evaluationService.getEvaluationNum({
      username: userInfo.account
    }).then(res => {
      this.setData({
        evaluationNum: res
      })
    }).catch(err => {
      this.setData({
        evaluationNum: 0
      })
    })
  },

  /**
   * 获取评测评议数量
   */
  getNotificationNum() {
    const userInfo = wx.getStorageSync('userInfo');
    notifyService.countIsNoReadNotice({
      pindex:1,
      psize:100,
      userId: userInfo.userId,
      deptId: userInfo.deptId
    }).then(res => {
      this.setData({
        notificationNum: res.count
      })
    }).catch(err => {
      this.setData({
        notificationNum: 0
      })
    })
  },

  gotoEvaluationTap() {
    wx.navigateTo({
      url: '../evaluationList/evaluationList',
    })
  },

  gotoNotificationTap() {
    wx.navigateTo({
      url: '../noticeAnnouncement/noticeAnnouncement',
    })
  }
})
