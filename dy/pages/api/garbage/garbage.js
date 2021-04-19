// pages/api/garbage/garbage.js
const $api = require("../../../utils/api.js").API
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
    garbageText: ''
  },
  onInput: function(e) {
    this.setData({
      garbageText: e.detail.value
    })
  },
  onSearch: function(){
    if(this.data.garbageText) {
      $api.send('garbage/'+this.data.garbageText).then(res=>{
        this.setData({
          result: res.data.code==200?res.data.data:'俺也不知道是什么类型的垃圾，呜呜呜~~~'
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