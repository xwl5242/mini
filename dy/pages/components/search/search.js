// pages/components/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    useType: Number,
    initKeyWord: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchKW: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindKeyInput(e) {
      var curKW = e.detail.value;
      this.setData({
        searchKW: e.detail.value
      })
      if(!curKW) {
        this.triggerEvent('clearKW', e);
      }
    },
    toSearch: function() {
      var kw = this.data.searchKW;
      if(!kw){
        wx.showToast({
          icon: 'none',
          title: '请输入歌曲名称',
        })
        return false;
      }
      if(this.data.useType==0){
        // 跳转到搜索结果列表页面
        wx.navigateTo({
          url: '../song/song?kw=' + this.data.searchKW,
        })
      }else{
        // 绘制搜索结果列表页面
        this.triggerEvent('search', this.data.searchKW);
      }
    },
  }
})
