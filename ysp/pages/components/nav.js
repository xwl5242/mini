const $api = require("../../utils/api").API
Component({
  behaviors: [],
  properties: {
  },
  data: {
    tops: [],
    searchKey: '',
    showParse: false,
    searchBtnClick: false,
    currentNavSel: 'index'
  }, // 私有数据，可用于模版渲染
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() {
    $api.setting().then(res=>{
      this.setData({
        showParse: wx.getStorageSync('STATUS') == '1',
        currentNavSel: wx.getStorageSync('nav_current_nav_sel') || 'index'
      });
      $api.top().then(res => {
        this.setData({
          tops: res.data.top_list
        });
      });
    });
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
  },

  methods: {
    toIndex: function(){
      wx.setStorageSync('nav_current_nav_sel', 'index')
      wx.navigateTo({
        url: '../index/index',
      })
    },
    toList: function(e){
      var type = e.currentTarget.id;
      wx.setStorageSync('nav_current_nav_sel', type)
      wx.navigateTo({
        url: type=='parse'?'../parse/parse':('../list/list?type=' + type),
      })
    },
    inputConfirm: function(e) {
      if(e.type == 'confirm'){
        var kw = e.detail.value;
        this.searchCommon(kw);
      }
    },
    inputKW: function(e) {
      this.setData({
        searchKey: e.detail.value
      })
    },
    toSearch: function(e) {
      var kw = this.data.searchKey;
      this.searchCommon(kw);
    },
    quickSearch: function(e) {
      var kw = e.currentTarget.id;
      this.searchCommon(kw)
    },
    searchCommon: function(kw){
      if(kw){
        wx.navigateTo({
          url: '../search/search?kw=' + kw,
        })
      }else{
        wx.showToast({
          icon: 'none',
          title: '请先输入影视名称'
        })
      }
    },
    cancelSearchBtnClicked: function(){
      this.setData({
        searchKey: '',
        searchBtnClick: false
      })
    },
    searchBtnClicked: function(){
      this.setData({
        searchBtnClick: true
      })
    }
  }
})