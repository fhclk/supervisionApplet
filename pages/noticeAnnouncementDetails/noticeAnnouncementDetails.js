// pages/noticeAnnouncementDetails/noticeAnnouncementDetails.js

const notifyService = require('../../services/notification.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    appendDept:'',
    appendTime: '',
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData(options.notifyId);
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

  loadData(id) {
    let userInfo = wx.getStorageSync("userInfo");
    notifyService.findByNoticeIdAndUserId({
      userId: userInfo.userId,
      noticeId: id
    }).then( res => {
      this.setData({
        title: res.title || '',
        appendDept: res.appendDept || '',
        appendTime: res.appendTime || '',
        content: res.content || ''
      })
    })
  }
})