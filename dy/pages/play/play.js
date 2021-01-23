// pages/play/play.js
const app = getApp()
const $api = require("../../utils/api.js").API
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playUrl: '',
    songId: '',
    songName: '',
    singer: '',
    fm: '',
    showDownload: false,
    showPlay: false
  },

  toPlay: function(song_id) {
    $api.send('music/download/'+song_id).then(res=>{
      this.setData({
        playUrl: res.data.download_url,
        showDownload: true
      });
    });
  },
  downloadMusic: function(e) {
    wx.setClipboardData({
      data: this.data.playUrl,
      success (res) {
        wx.showModal({
          title: '提示',
          content: '音频下载地址已复制，请打开手机浏览器进行下载！',
          success (res) {
          }
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $api.switchs().then(res=>{
      var musicSwitch = res.data.switchs.music_switch;
      this.setData({
        showPlay: musicSwitch=='1'
      });
      if(musicSwitch=='1') {
        this.setData({
          songId: options['song_id']||'',
          songName: options['song_name']||'',
          singer: options['singer']||'',
          fm: decodeURIComponent(options['fm'])||'',
        });
        this.toPlay(options['song_id']);
      }
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