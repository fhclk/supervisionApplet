// pages/auth/resetPassword/resetPassword.js

const authService = require('../../../services/auth.js');
Page({

  authonCode:'',
  timCount: 60,

  /**
   * 页面的初始数据
   */
  data: {
    firstStep: true,
    authonBtnTitle: '获取验证码',
    phone: '',
    authonCode: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  nextStepTap() {
    if (!this.authonCode) {
      wx.showToast({
        title: '请获取验证码',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    if (!this.data.authonCode) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    if (this.authonCode != this.data.authonCode) {
      wx.showToast({
        title: '输入的验证码错误',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    this.setData({
      firstStep:false
    })
  },

  bindPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  bindAuthonInput(e) {
    this.setData({
      authonCode: e.detail.value
    })
  },

  formSubmit: function (e) {
    let message = '';
    if (!e.detail.value.newPassword) {
      message = '请输入新密码';
    }
    if (e.detail.value.newPassword != e.detail.value.confirmPassword) {
      message = '两次输入的密码不一致';
    }
    if (message != '') {
      wx.showToast({
        title: message,
        icon: 'none',
        duration: 2000
      });
      return;
    }
    let userInfo = wx.getStorageSync("userInfo");
    authService.resetPassword({
      phone: this.data.phone,
      pwd: e.detail.value.newPassword
    }).then(res => {
      wx.showModal({
        title: '提示',
        content: '修改密码成功, 请重新登录',
        success(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '../auth/login/login',
            });
          }
        }
      })
    }).catch(err => {
      wx.showToast({
        title: '修改密码失败',
        icon: 'none',
        duration: 2000
      });
    })
  },

  getAuthonCodeTap() {
    if (this.data.authonBtnTitle != '获取验证码') {
      return;
    }
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    this.timCount = 60;
    authService.getUserAuthonCode({
      phone: this.data.phone
    }).then(res => {
      this.authonCode = res;
      wx.showToast({
        title: '验证码已发送至: ' + this.data.phone,
        icon: 'none',
        duration: 2000
      })
      if (this.timInterval) {
        clearInterval(this.timInterval);
        this.clearInterval = null;
      }
      this.timInterval = setInterval(() => {
        if (this.timCount <= 60 && this.timCount >= 0) {
          this.setData({
            authonBtnTitle: this.timCount + 's后获取'
          })
        }
        else {
          this.setData({
            authonBtnTitle: '获取验证码'
          })
        }
        this.timCount--;
      }, 1000)
    }).catch(err => {
      wx.showToast({
        title: '获取验证码失败',
        icon: 'none',
        duration: 2000
      })
    })
  }
})