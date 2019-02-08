// pages/evaluation/evaluation.js

const evaluationService = require('../../services/evaluation.js');

Page({
  hasLogin:false, //判断是否已经模拟登陆
  hasSubmitSuccess:false, //判断评议是否已经提交成功

  /**
   * 页面的初始数据
   */
  data: {
    evaluationInfo: {
      id: '',
      title: '',
      time: '',
      type: '',
      url: ''
    },
    startEvaluate: false,
    evaluationPageUrl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    let evaluationInfo = JSON.parse(options.eva);
    let userInfo = wx.getStorageSync('userInfo');
    let url = evaluationService.getEvaluationLoginUrl(evaluationInfo.id, userInfo.account);
    console.log(url);
    this.setData({
      evaluationInfo: evaluationInfo,
      evaluationPageUrl: url
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.hasSubmitSuccess = false;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('onUnload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  webViewLoad(e) {
    console.log(e);
    if (this.hasSubmitSuccess) {
      wx.navigateBack({});
    }
    let webSrc = e.detail.src;
    if (webSrc.indexOf('/success.jsp') > 0) {
      this.hasSubmitSuccess = true;
    }
    if (!this.hasLogin) {
      this.evaluationLogin(() => {
        let userInfo = wx.getStorageSync('userInfo');
        let url = evaluationService.getEvaluationPageUrl(this.data.evaluationInfo.sid);
        url = url + '&username=' + userInfo.account;
        console.log(url);
        this.setData({
          startEvaluate: true,
          evaluationPageUrl: url
        });
      })
    }
    this.hasLogin = true;
  },

  /**
   * 开始评议事件
   */
  startEvaluateTap() {
    this.setData({
      startEvaluate: true,
    });
    
  },

  /**
   * 评议时模拟登录
   */
  evaluationLogin(success) {
    let userInfo = wx.getStorageSync('userInfo');
    evaluationService.evaluationLogin({
      id: this.data.evaluationInfo.id,
      username: userInfo.account
    }).then(res => {
      success && success();
    }).catch(err => {
      success && success();
    })
  },

  webViewBindmessage(e) {
    console.log('webViewBindmessage',e);
  }
})

