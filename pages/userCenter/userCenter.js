const app = getApp()

Page({
  exitTap() {
    wx.showModal({
      title: '',
      content: '是否确定退出登录',
      cancelColor:'#3F98FC',
      confirmColor: '#3F98FC',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync("userInfo");
          wx.reLaunch({
            url: '../index/index',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },

  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
  },

  onLoad: function() {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('sysName')
    })
    this.setData({
      userInfo: wx.getStorageSync("userInfo")
    })
  }

})
