// pages/girl/girl.js
const app = getApp()
const $api = require("../../../utils/api.js").API
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: '',
    fileNo: ''
  },
  next: function() {
    this.fetch();
  },
  download: function() {
    if(this.data.fileNo) {
      var downloadUrl = 'https://smart.quanchonger.com/smart/mv/girl/download/' + this.data.fileNo
      app.downloadMedia('video', downloadUrl);
    }
  },
  fetch: function() {
    $api.send('mv/girl').then(res=>{
      this.setData({
        video: res.data.url,
        fileNo: res.data.file_no
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetch();
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
    console.log('1');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})