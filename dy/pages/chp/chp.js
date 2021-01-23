// pages/chp/chp.js
const app = getApp()
const $api = require("../../utils/api.js").API
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chp: ''
  },
  changeCHP: function(){
    this.goCHP();
  },
  copyCHP: function(){
    wx.setClipboardData({
      data: this.data.chp,
      success(res){
       
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.goCHP();
  },
  goCHP: function(){
    wx.showLoading({
      title: '生成中...',
    });
    $api.chp().then(res => {
      this.setData({
        chp: res.data
      });
      wx.hideLoading({
        success: (res) => {},
      });
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