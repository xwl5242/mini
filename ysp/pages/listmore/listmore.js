// pages/listmore/listmore.js
const $api = require('../../utils/api').API
var pageNo = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvs: [],
    total: 0,
    title: '',
    curType: '',
    showTips: false
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onReachBottom: function () {
    if (this.data.mvs.length < this.data.total) {
      pageNo = pageNo + 1
      this.vodlist(this.data.curType, pageNo, true);
    }else {
      wx.showToast({
        icon: 'none',
        title: '已经到底了...',
      })
    }
  },
  toDetail(e){
    var vodId = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?vod_id='+vodId,
    })
  },
  vodlist: function(mv_type, pageNo, isMore) {
    $api.send('mv/subtype/' + mv_type + '/' + pageNo, {}).then(res => {
      var list = res.data.mvs;
      if(isMore){
        list = this.data.mvs.concat(list);
      }
      this.setData({
        mvs: list,
        total: res.data.total
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let status = wx.getStorageSync('STATUS');
    this.setData({
      showTips: status == '1'
    });
    var mv_type = options['mv_type']
    var mv_type_name = options['mv_type_name']
    this.setData({
      title: mv_type_name,
      curType: mv_type
    })
    this.vodlist(mv_type, 0, false);
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
   * 页面上拉触底事件的处理函数
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})