const authService = require('../../services/auth.js');

Page({
  formSubmit: function (e) {
    let message = '';
    if (!e.detail.value.confirmPassword) {
      message = '请输入确认密码';
    }
    if (!e.detail.value.newPassword) {
      message = '请输入新密码';
    }
    if (!e.detail.value.oldPassword) {
      message = '请输入当前密码';
    }
    if (e.detail.value.newPassword != e.detail.value.confirmPassword){
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
    authService.updatePassword({
      userId: userInfo.userId,
      token: userInfo.token,
      id: userInfo.userId,
      oldPwd: e.detail.value.oldPassword,
      newPwd: e.detail.value.newPassword
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
  }
})