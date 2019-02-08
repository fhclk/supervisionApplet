const notifyService = require('../../services/notification.js');

Page({
  currentHasReadPage: 0,
  currentNotReadPage: 0,
  currentMinePage: 0,
  hasMoreOfReaded: true,
  hasMoreOfNotRead: true,
  hasMoreOfMine:true,

  /**
   * 页面的初始数据
   */
  data: {
    navbarActiveIndex: 0,
    contentHeight: '300px',
    navbarTitle: ['未读', '已读', '我的'],
    myNotifyList: [],
    notReadNotifyList: [],
    hasReadNotifyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //动态设置列表区域的高度
    let that = this;
    wx.getSystemInfo({
      success(res) {
        let height = (res.windowHeight - 40) + 'px'
        that.setData({
          contentHeight: height
        })
      }
    });

    this.getHasReadNotify(0, (data) => {
      this.setData({
        hasReadNotifyList: data,
      })
    });
    this.getNotReadNotify(0, (data) => {
      this.setData({
        notReadNotifyList: data
      })
    });
    this.getMyNotify(0, (data) => {
      this.setData({
        myNotifyList: data
      })
    });
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.refresh();
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

  selectSegment(e) {
    this.setData({
      navbarActiveIndex: e.currentTarget.dataset.idx
    })
  },

  /**
   * 
   */
  onBindAnimationFinish: function ({ detail }) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: detail.current
    })
  },


  getHasReadNotify(page, success, fail=null) {
    const userInfo = wx.getStorageSync("userInfo");
    notifyService.findIsReadNotice({
      userId: userInfo.userId,
      pageIndex: page,
      pageSize: 10,
    }).then( res => {
      success && success(res);
    }).catch( err => {
      fail && fail(err);
    })
  },

  getNotReadNotify(page, success, fail = null) {
    const userInfo = wx.getStorageSync("userInfo");
    notifyService.findIsNoReadNotice({
      userId: userInfo.userId,
      pageIndex: page,
      pageSize: 10,
    }).then(res => {
      success && success(res);
    }).catch(err => {
      fail && fail(err);
    })
  },

  getMyNotify(page, success, fail = null) {
    const userInfo = wx.getStorageSync("userInfo");
    notifyService.findMyNotice({
      userId: userInfo.userId,
      pageIndex: page,
      pageSize: 10,
    }).then(res => {
      success && success(res);
    }).catch(err => {
      fail && fail(err);
    })
  },


  refresh() {
    wx.showNavigationBarLoading();
    if (this.data.navbarActiveIndex == 1) {
      this.currentHasReadPage = 0;
      this.hasMoreOfReaded = true;
      this.getHasReadNotify(0, data => {
        wx.hideNavigationBarLoading();
        this.setData({
          hasReadNotifyList: data
        })
      }, () => {
        this.setData({
          hasReadNotifyList: []
        });
        wx.hideNavigationBarLoading();
      })
    }
    else if (this.data.navbarActiveIndex == 0) {
      this.currentNotReadPage = 0;
      this.hasMoreOfNotRead = true;
      this.getNotReadNotify(0, data => {
        wx.hideNavigationBarLoading();
        this.setData({
          notReadNotifyList: data
        })
      }, () => {
        this.setData({
          notReadNotifyList: []
        });
        wx.hideNavigationBarLoading();
      })
    }
    else {
      this.currentMinePage = 0;
      this.hasMoreOfMine = true;
      this.getMyNotify(0, data => {
        wx.hideNavigationBarLoading();
        this.setData({
          myNotifyList: data
        })
      }, () => {
        this.setData({
          myNotifyList: []
        });
        wx.hideNavigationBarLoading();
      })
    }
  },

  loadMore() {
    if (this.data.navbarActiveIndex == 1) {
      if (!this.hasMoreOfReaded) return;
    }
    else if (this.data.navbarActiveIndex == 0) {
      if (!this.hasMoreOfNotRead) return;
    }
    else {
      if (!this.hasMoreOfMine) return;
    }
    wx.showLoading({
      title: '玩命加载中',
    })
    if (this.data.navbarActiveIndex == 1) {
      this.currentHasReadPage++;
      this.getHasReadNotify(this.currentHasReadPage, data => {
        wx.hideLoading();
        this.setData({
          hasReadNotifyList: [...this.data.hasReadNotifyList, ...data]
        });
        if (!data || data.length == 0) {
          this.hasMoreOfReaded = false;
        }
      }, () => {
        wx.hideLoading();
      })
    }
    else if (this.data.navbarActiveIndex == 0) {
      this.currentNotReadPage++;
      this.getNotReadNotify(this.currentNotReadPage, data => {
        wx.hideLoading();
        this.setData({
          notReadNotifyList: [...this.data.notReadNotifyList, ...data]
        })
        if (!data || data.length == 0) {
          this.hasMoreOfNotRead = false;
        }
      }, () => {
        wx.hideLoading();
      })
    }
    else {
      this.currentMinePage++;
      this.getMyNotify(1, data => {
        wx.hideLoading();
        this.setData({
          myNotifyList: [...this.data.myNotifyList, ...data]
        })
        if (!data || data.length == 0) {
          this.hasMoreOfMine = false;
        }
      }, () => {
        wx.hideLoading();
      })
    }
  },

  scrolltoupper() {
    console.log('scrolltoupper');
    // this.refresh();
  },

  scrolltolower() {
    console.log("scrolltolower");
    this.loadMore();
  },

  gotoDetailTap(e) {
    let notifyId = e.currentTarget.dataset.notifyItem.id;
    wx.navigateTo({
      url: '../noticeAnnouncementDetails/noticeAnnouncementDetails?notifyId=' + notifyId,
    });
    //未读的要设置成已读
    if (this.data.navbarActiveIndex == 0) {
      let notifyIndex = e.currentTarget.dataset.notifyIndex;
      let notReadData = this.data.notReadNotifyList;
      notReadData.splice(notifyIndex, 1);
      this.setData({
        notReadNotifyList: notReadData
      })
      this.setReadStatus(notifyId);
    }
  },

  setReadStatus(id) {
    const userInfo = wx.getStorageSync("userInfo");
    notifyService.saveIsReadNotice({
      userId: userInfo.userId,
      noticeId: id
    }).then(res => {

    })
  }
})