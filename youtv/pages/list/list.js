// pages/list/list.js
const app = getApp();
const $api = require('../../utils/api').API;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvs: [],
    mv_keys: [],
    mv_types: {}
  },
  toDetail(e){
    var vodId = e.currentTarget.id;
    tt.navigateTo({
      url: '../detail/detail?vod_id='+vodId,
    })
  },
  listMore(e) {
    var mv_type = e.currentTarget.id;
    var mv_type_name = e.currentTarget.dataset.typename;
    if(mv_type){
      tt.navigateTo({
        url: '../listmore/listmore?mv_type=' + mv_type + '&mv_type_name=' + mv_type_name,
      })
    }
  },
  onPageScroll: function(e) {
    app.imageLazyLoad(this, 'mvs', this.data.mvs, '.lazy-vod');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getMVTypes().then(res=>{
      let map = {};
      for(let i=0;i<res.length;i++) {
        map[res[i]['type_id']] = res[i];
      }
      this.setData({
        mv_types: map
      });
      var type = options['type'];
      $api.send('mv/type/'+type+'/0', {}).then(res => {
        var mvs = res.data.mvs
        var mv_keys = Object.keys(mvs)
        mvs[mv_keys[0]].map(o => {
          o['show'] = true; return o;
        })
        this.setData({
          mvs: mvs,
          mv_keys: mv_keys
        })
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