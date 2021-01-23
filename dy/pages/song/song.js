// pages/song/song.js
const app = getApp()
const $api = require("../../utils/api.js").API
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songKW: '',
    songs: [],
    noResult: false
  },
  search: function(kw) {
    if(typeof(kw)=='object'){
      kw = kw['detail'];
    }
    if(kw) {
      this.setData({
        songKW: kw
      });
      wx.showLoading({
        title: '搜索中...',
      })
      $api.send('music/search/'+kw, {}).then(res=>{
        wx.hideLoading({
          success: (res) => {},
        });
        var musics = res.data.musics;
        if(musics && musics.length>0){
          this.setData({
            songs: musics,
            noResult: false
          });
        }else{
          this.setData({
            noResult: true
          });
        }
      })
    }
  },
  goPlay: function(e) {
    var song = e.currentTarget.dataset;
    var song_id = song['songId'] || '';
    var song_name = song['songName'] || '';
    var singer = song['singer'] || '';
    var fm = encodeURIComponent(song['fm'] || '');
    wx.navigateTo({
      url: '../play/play?song_id='+song_id+
      '&song_name='+song_name+'&fm='+fm+'&singer='+singer,
    })
  },
  clearKW: function(e) {
    this.setData({
      songs: [],
      noResult: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var kw = options['kw'];
    this.search(kw);
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