// pages/dy/parse/parse.js
const app = getApp()
const $api = require("../../../utils/api.js").API
Page({
  /**
   * 页面的初始数据
   */
  data: {
    vedioId: '',
    playAddr: '',
    coverUrl: '',
    vedioW: 0,
    vedioH: 0,
    showDownloadBtn: false,
    downloadAbled: false
  },
  downloadMedia: function() {
    app.downloadMedia('vedio', this.data.playAddr);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    $api.switchs().then(res=>{
      console.log(res.data.switchs);
      var dyParseSwitch = res.data.switchs.dy_parse_switch;
      this.setData({
        downloadAbled: dyParseSwitch=='1'
      });
      if(dyParseSwitch=='1'){
        // var fileId = '6822882071589965071';
        var fileId = options['fileId'];
        var sw = wx.getSystemInfoSync().windowWidth;
        var sh = sw*0.8 / 9 * 16;
        this.setData({
          vedioW: sw,
          vedioH: sh,
          playAddr: $api.mediaApiUrl + fileId + '.mp4'
        });
        $api.send('dy/medias', {
          file_id: fileId
        }).then(res => {
          this.setData({
            vedioId: res.data['id'],
            coverUrl: res.data['pic'],
            showDownloadBtn: true
          })
        });
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