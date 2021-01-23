// pages/gallery/wallpaper/list/list.js
const app = getApp()
const $api = require("../../../../utils/api.js").API
var curPageNo = 0;
var curType = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wps: []
  },
  getWallpapers: function(pageNo, isMore) {
    var list = [];
    $api.send('wallpaper/list/'+curType+'/'+pageNo).then(res=>{
      list = res.data.wps;
      if(list.length==0){
        wx.showToast({
          title: '没有更多了',
        });
      }else{
        if(isMore) {
          list = this.data.wps.concat(list);
        }
        this.setData({
          wps: list
        });
      }
    });
  },
  savePNG: function(e){
    var src = e.currentTarget.id;
    app.downloadMedia('image', src);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    curType = options['t'];
    this.getWallpapers(curPageNo, false);
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
    curPageNo += 1;
    this.getWallpapers(curPageNo, true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})