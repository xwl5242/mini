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
    mvType: {'电影': 'dy','电视剧': 'ds','综艺': 'zy','动漫': 'dm'},
    footerMsg: '',
    showFooterMail: false,
    footerMail: '邮箱: xwl5242@163.com'
  },
  // 留言
  toSuggest(){
    wx.navigateTo({
      url: '../suggest/suggest',
    })
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
    wx.setStorageSync('nav_current_nav_sel', type)
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
      this.setData({
        showFooterMail: true,
        footerMsg: '本小程序提供的最新视频资源均系收集于各大视频网站，只提供web页面服务，并不提供影片资源存储，也不参与录制、上传。若收录的节目无意侵犯了贵司版权，请给底部邮箱地址来信，我们会及时处理和回复，谢谢!'
      });
    }else{
      this.setData({
        banners: [],
        showFooterMail: false,
        footerMsg: '欢迎来到汪仔影视！',
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
    $api.setting().then(res=>{
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
