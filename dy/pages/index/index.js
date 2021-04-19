const app = getApp()
const $api = require("../../utils/api.js").API
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menus: [],
    searchKW: '',
    showSearch: false,
    showNotice: false,
    noticeMsg: '这里是优软派'
  },
  toTools: function(e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '/pages/' + url,
    })
  },
  onLoad: function (options) {
    $api.switchs().then(res=>{
      var musicSwitch = res.data.switchs.music_switch;
      var noticeSwitch = res.data.switchs.notice_switch;
      var noticeMsg = res.data.switchs.notice_msg;
      wx.setStorageSync('switch', musicSwitch);
      this.setData({
        showNotice: noticeSwitch=='1',
        noticeMsg: noticeMsg
      });
    });
    $api.menus().then(res=>{
      this.setData({
        menus: res.data.menus
      });
    });
  },

  onReachBottom: function () {

  },
  spinShow: function () {

  },
  onShareAppMessage() {
    return {
      title: '优软派',
      path: 'pages/index/index',
      imageUrl: '../logo.png'
    }
  }
})