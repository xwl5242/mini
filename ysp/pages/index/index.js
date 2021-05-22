//index.js
//获取应用实例
const app = getApp()
const $api = require("../../utils/api").API
Page({
  data: {
    mvs: {},
    news: [],
    tops: [],
    total: 0,
    today: 0,
    banners: [],
    showBanner: false,
    mvTypes: [{'k':'电影','v': 'dys'},{'k':'电视剧','v': 'dss'},{'k':'综艺','v': 'zys'},{'k':'动漫','v': 'dms'}],
    mvType: {'电影': 'dy','电视剧': 'ds','综艺': 'zy','动漫': 'dm'}
  },
  // 点击轮播图去搜索
  toSwiperSearch(e) {
    var tv_name = e.currentTarget.dataset.tvname;
    wx.navigateTo({
      url: '../search/search?kw=' + tv_name,
    })
  },
  // 前往vod列表页面
  toList: function(e){
    var type = e.currentTarget.id;
    wx.setStorageSync('nav_currentNavSel', type)
    wx.navigateTo({
      url: '../list/list?type=' + type,
    })
  },
  // 前往vod详情页面
  toDetail: function(e){
    var vodId = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?vod_id='+vodId,
    })
  },
  init: function() {
    // 查询设置信息，判断是否要显示banner
    let status = wx.getStorageSync('STATUS');
    if(status == '1') {
      $api.banner().then(res => {
        this.setData({
          showBanner: true,
          banners: res.data.banner_list
        });
      });
    }else{
      this.setData({
        banners: [],
        showBanner: false
      });
    }
    $api.index().then(res => {
      this.setData({
        mvs: res.data.mvs,
        news: res.data.news,
        total: res.data.total,
        today: res.data.today
      })
    });
  },
  onLoad: function () {
    $api.send("settings").then(res=>{
      let settings = res.data.settings;
      wx.setStorageSync('ADS', settings['ads']);
      wx.setStorageSync('HIDE_VODS', settings['hide_vods']);
      wx.setStorageSync('SHOW_VODS', settings['show_vods']);
      wx.setStorageSync('STATUS', settings['status']);
      this.init();
    });
  },
  /**
   * 页面滚动监听
   */
  onPageScroll: function(e) {
    app.imageLazyLoad(this, 'mvs', this.data.mvs, '.lazy-vod');
  }
})
