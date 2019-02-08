const authService = require('../../services/auth.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      name:'',
      sex:'',
      phoneNumber:'',
      email:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
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

  getUserInfo() {
    let userInfo = wx.getStorageSync('userInfo');
    authService.getUserInfo({
      userId: userInfo.userId,
      token: userInfo.token
    }).then(res => {
      console.log(res);
      this.setData({
        userInfo: res
      })
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let userInfo = wx.getStorageSync('userInfo');
    authService.updateUserInfo({
      userId: userInfo.userId,
      userName: e.detail.value.name || '',
      sex: e.detail.value.gender || '',
      telephone: e.detail.value.phone || '',  
      email: e.detail.value.email || '',
    }).then(res => {
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 2000
      })
    }).catch(err => {
      wx.showToast({
        title: '修改失败',
        icon: 'none',
        duration: 2000
      })
    })
  }
})