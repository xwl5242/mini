// pages/suggest/suggest.js
const app = getApp()
const $api = require("../../utils/api.js").API
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggest: '',
    submited: false
  },
  bindKeyInput(e) {
    var curSuggest = e.detail.value;
    this.setData({
      suggest: curSuggest
    });
  },
  saveSuggest: function() {
    if(!this.data.submited){
      $api.sendPost('suggest/save', {
        suggest: this.data.suggest
      }).then(res=>{
        this.setData({
          submited: true
        });
        wx.showModal({
          title: '提示',
          content: '谢谢您的宝贵留言！',
          success (res) {
            wx.navigateTo({
              url: '../index/index',
            })
          }
        });
      });
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