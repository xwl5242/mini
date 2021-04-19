// pages/api/short/short.js
const $api = require("../../../utils/api.js").API
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    result: '',
    showOpt: false
  },
  onCopy: function(){
    wx.setClipboardData({
        data: this.data.result,
        success (res) {
      }
    });
  },
  onInput: function(e) {
    this.setData({
      url: e.detail.value
    })
  },
  onParse: function(){
    if(this.data.url) {
      $api.send('short_url?url='+this.data.url).then(res=>{
        console.log(res);
        this.setData({
          showOpt: true,
          result: res.data.code==200?res.data.url_short:res.data.msg
        });
      });
    }else{
      wx.showToast({
        icon: 'none',
        title: '请输入物品名称'
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