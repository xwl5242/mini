// pages/dy/parse/parse.js
const app = getApp()
const $api = require("../../../utils/api.js").API
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    showVideo: false
  },
  onInput: function(e) {
    this.setData({
      url: e.detail.value
    })
  },
  onParse: function(){
    var url = this.data.url;
    if(url) {
      $api.send('mv/parse', {
        url: url,
        type: 'jh'
      }).then(res=>{
        // https://h5.pipix.com/s/uW4KXh
        console.log(res);
      });
    }else{
      wx.showToast({
        icon: 'none',
        title: '请输入地址'
      })
    }
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