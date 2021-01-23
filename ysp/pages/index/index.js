//index.js
//获取应用实例
const app = getApp()
const $init = require("../../utils/init")
const $api = require("../../utils/api").API
Page({
  data: {
    mvs: {},
    news: $init.NEWS,
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
  toDetail(e){
    var vodId = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?vod_id='+vodId,
    })
  },
  onLoad: function () {
    // 查询设置信息，判断是否要显示banner
    $api.setting().then(res => {
      let isShowBanner = res.data.setting['banner_status']=='1';
      if(isShowBanner) {
        this.setData({
          showBanner: true
        });
        $api.banner().then(res => {
          this.setData({
            banners: res.data.banner_list.filter(e => {return e.tv_img.indexOf('common_blank')<0})
          })
        });
      }
    });
    $api.index().then(res => {
      this.setData({
        mvs: res.data.mvs,
        news: res.data.news,
        total: res.data.total,
        today: res.data.today
      })
    });
  },
  /**
   * 页面滚动监听
   */
  onPageScroll: function(e) {
    app.imageLazyLoad(this, 'mvs', this.data.mvs, '.lazy-vod');
  }
})
