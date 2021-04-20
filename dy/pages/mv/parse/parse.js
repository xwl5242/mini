// pages/dy/parse/parse.js
const app = getApp()
const $api = require("../../../utils/api.js").API
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    curFileNo: '',
    videoUrl: '',
    showVideo: false
  },
  onInput: function(e) {
    this.setData({
      url: e.detail.value
    })
  },
  onDownload: function(e) {
    var downloadUrl = 'https://smart.quanchonger.com/smart/mv/girl/download/' + this.data.curFileNo
    app.downloadMedia('video', downloadUrl);
  },
  onParse: function(){
    var url = this.data.url;
    var switchs = wx.getStorageSync('switch');
    if(url) {
      if(switchs['video_switch'] == '1') {
        $api.send('mv/parse?type=jh&url='+url).then(res=>{
          this.setData({
            showVideo: true,
            videoUrl: res.data.url,
            curFileNo: res.data.file_no
          });
        });
      }else{
        wx.showToast({
          icon: 'none',
          title: '服务升级中'
        });
      }
    }else{
      wx.showToast({
        icon: 'none',
        title: '请输入地址'
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