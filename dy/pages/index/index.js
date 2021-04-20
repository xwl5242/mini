Page({
  /**
   * 页面的初始数据
   */
  data: {
    menus: [],
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
    var menus = wx.getStorageSync('menus');
    var switchs = wx.getStorageSync('switch');
    this.setData({
      menus: menus,
      noticeMsg: switchs['notice_msg'],
      showNotice: switchs['notice_switch'] == '1'
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