// pages/evaluationList/evaluationList.js

const evaluationService = require('../../services/evaluation.js');

Page({

  currentNotEvaPage: 0,
  currentHasEvaPage: 0,
  hesMoreOfNotEva: true,
  hasMoreOfHasEva: true,
  timInterval:null,
  timCount:60,
  authonCode:'',

  /**
   * 页面的初始数据
   */
  data: {
    navbarActiveIndex: 0,
    contentHeight:'300px',
    navbarTitle: ['未评议','已评议'],
    notEvaluateList: [],
    hasEvaluatedList: [],
    showAuthonView: false,
    authonBtnTitle: '获取验证码',
    authonCode: ''
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

    this.getEvaluationList(0, (data, permission) => {
      let isShow = (data && data.length > 0) && (permission == 0 && !this.isLeadership());
      this.setData({
        notEvaluateList: data,
        showAuthonView: isShow
      });
      console.log(permission, this.data);
    });
    this.getEvaluationList(1, (data) => {
      this.setData({
        hasEvaluatedList: data
      })
    });
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
    if (this.data.notEvaluateList.length > 0) {
      this.reLoadData();
    }
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
    if (this.timInterval) {
      clearInterval(this.timInterval);
      this.clearInterval = null;
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // this.refresh();
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

  selectSegment(e) {
    this.setData({
      navbarActiveIndex: e.currentTarget.dataset.idx
    })
  },

  /**
   * 重新加载数据
   */
  reLoadData() {
    this.currentNotEvaPage = 0;
    this.currentHasEvaPage = 0;
    this.hesMoreOfNotEva = true;
    this.hasMoreOfHasEva = true;
    this.getEvaluationList(0, (data) => {
      this.setData({
        notEvaluateList: data
      });
    });
    this.getEvaluationList(1, (data) => {
      this.setData({
        hasEvaluatedList: data
      })
    });
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

  getEvaluationList(type, success, page=0, fail=null) {
    let userInfo = wx.getStorageSync('userInfo');
    evaluationService.getEvaluationList({
      userName: userInfo.account || '',
      type: type,
      pageNo: page,
      pageSize: 20
    }).then(res => {
      success && success(res.data, res.surveyCheck);
    }).catch(err => {
      fail && fail()
    })
  },

  evaluateTap(e) {
    wx.navigateTo({
      url: '../evaluation/evaluation?eva=' + JSON.stringify(e.currentTarget.dataset.evaluationItem),
    })
  },

  scrolltoupper() {
    console.log('scrolltoupper');
    // this.refresh();
  },

  scrolltolower() {
    console.log("scrolltolower");
    this.loadMore();
  },

  refresh() {
    wx.showNavigationBarLoading();
    if (this.data.navbarActiveIndex == 0) {
      this.hesMoreOfNotEva = true;
      this.setData({
        notEvaluateList: []
      });
      this.currentNotEvaPage = 0;
      this.getEvaluationList(0, data => {
        wx.hideNavigationBarLoading();
        // let data = [].concat(this.data.notEvaluateList);
        // data = data.concat(res);
        this.setData({
          notEvaluateList: data
        })
      }, 0, () => {
        wx.hideNavigationBarLoading();
      })
    }
    else {
      this.hasMoreOfHasEva = true;
      this.setData({
        hasEvaluatedList: []
      });
      this.currentHasEvaPage = 0;
      this.getEvaluationList(1, data => {
        wx.hideNavigationBarLoading();
        this.setData({
          hasEvaluatedList: data
        })
      }, 0, () => {
        wx.hideNavigationBarLoading();
      })
    }
  },

  loadMore() {
    if (this.data.navbarActiveIndex == 0) {
      if (!this.hesMoreOfNotEva) return;
    }
    else{
      if (!this.hasMoreOfHasEva) return;
    }
    wx.showLoading({
      title: '玩命加载中',
    })
    if (this.data.navbarActiveIndex == 0) {
      this.currentNotEvaPage++;
      this.getEvaluationList(0, data => {
        wx.hideLoading();
        this.setData({
          notEvaluateList: [...this.data.notEvaluateList, ...data]
        })
        if (!data || data.length == 0) {
          this.hesMoreOfNotEva = false;
        }
      }, this.currentNotEvaPage, () => {
        wx.hideLoading();
      })
    }
    else {
      this.currentHasEvaPage++;
      this.getEvaluationList(1, data => {
        wx.hideLoading();
        this.setData({
          hasEvaluatedList: [...this.data.hasEvaluatedList, ...data]
        })
        if (!data || data.length == 0) {
          this.hasMoreOfHasEva = false;
        }
      }, this.currentHasEvaPage, () => {
        wx.hideLoading();
      })
    }
  },

  getAuthonCodeTap() {
    if (this.data.authonBtnTitle != '获取验证码') {
      return;
    }
    this.timCount = 60;
    let userInfo = wx.getStorageSync("userInfo");
    evaluationService.getAuthonCode({
      phone: userInfo.account
    }).then(res => {
      this.authonCode = res.code;
      wx.showToast({
        title: '验证码已发送至: ' + userInfo.account,
        icon: 'none',
        duration: 2000
      })
      if (this.timInterval) {
        clearInterval(this.timInterval);
        this.clearInterval = null;
      }
      this.timInterval = setInterval(() => {
        if (this.timCount <= 60 && this.timCount >=0) {
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
  },

  confirmAuthonTap() {
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
      showAuthonView: false
    })
  },

  bindAuthonCodeInput(e) {
    this.setData({
      authonCode: e.detail.value
    });
  },

  //是否是特殊角色, 特殊角色隐藏
  isLeadership() {
    let isLeadership = false;
    let userInfo = wx.getStorageSync("userInfo");
    userInfo.roleCodeList.forEach((item) => {
      if (item == 'notSendInfo') {
        userInfo = true;
      }
    });
    return isLeadership;
  }
})