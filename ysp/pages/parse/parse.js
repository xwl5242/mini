// pages/parse/parse.js
const $api = require("../../utils/api").API
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoUrl: '',
    showVideo: false
  },
  onInput: function(e) {
    this.setData({
      videoUrl: e.detail.value
    })
  },
  onParse: function(){
    var url = this.data.videoUrl;
    var parseEnable = wx.getStorageSync('PARSE_ENABLE') == '1';
    if(!url) {
      wx.showToast({
        icon: 'none',
        title: '请输入地址',
      })
      return;
    }
    if(parseEnable) {
      $api.send('vip_parse', {
        url: url
      }).then(res=>{
        if(res.data.url) {
          this.setData({
            videoUrl: res.data.url,
            showVideo: true
          });
        }else{
          wx.showToast({
            icon: 'none',
            title: '服务升级，敬请期待！',
          })
        }
      })
    }else{
      wx.showToast({
        icon: 'none',
        title: '服务升级，敬请期待！',
      })
    }
    console.log(url);
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

  }
})