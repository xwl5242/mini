const app = getApp()
const $api = require("../../utils/api.js").API
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchKW: '',
    showSearch: false
  },
  toCHP: function(){
    wx.navigateTo({
      url: '../chp/chp',
    })
  },
  toDY: function() {
    wx.navigateTo({
      url: '../dy/dy',
    })
  },
  toGIF: function() {
    wx.navigateTo({
      url: '../gallery/gif/gif',
    })
  },
  toWallpaper: function() {
    wx.navigateTo({
      url: '../gallery/wallpaper/wallpaper',
    })
  },
  onLoad: function (options) {
    $api.switchs().then(res=>{
      var musicSwitch = res.data.switchs.music_switch;
      this.setData({
        showSearch: musicSwitch=='1'
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