// pages/gallery/gif/gif.js
const app = getApp()
const $api = require("../../../utils/api.js").API
var curPageNo = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gifs: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    curPageNo = 0;
    this.getGifs(curPageNo, false);
  },
  saveGif: function(e) {
    var src = e.currentTarget.id;
    app.downloadMedia('image', src);
  },
  getGifs: function(pageNo, isMore) {
    wx.showLoading({
      title: '加载中...',
    });
    var gifList = [];
    $api.send('gif/'+pageNo).then(res=>{
      gifList = res.data.gifs;
      if(gifList.length==0){
        wx.showToast({
          title: '没有更多了',
        });
      }else{
        if(isMore) {
          gifList = this.data.gifs.concat(gifList);
        }
        this.setData({
          gifs: gifList
        });
      }
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
    curPageNo = 0;
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
    curPageNo = curPageNo + 1;
    this.getGifs(curPageNo, true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})