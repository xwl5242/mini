//app.js
const $api = require('./utils/api').API
App({
  onLaunch: function () {
    tt.setStorageSync('nav_currentNavSel', 'index');
    // 获取页面可是区域高度
    this.getPageHeight().then(res => {
      this.globalData.pageHeight = res
    });
    $api.send('mvtypes', {}).then(res => {
      tt.setStorageSync('mv_types', res.data.mv_types);
    });
  },
  /**
   * 图片懒加载
   */
  imageLazyLoad: function(pageO, setDateName, dataList, dataContainerClass) {
    // 获取页面可视高度
    let height = 0;
    if (this.globalData.pageHeight == 0) {
      this.getPageHeight().then(res => height = res)
    } else {
      height = this.globalData.pageHeight;
    }
    tt.createSelectorQuery().selectAll(dataContainerClass).boundingClientRect((ret) => {
      let is_change = false;
      ret.forEach((item, index) => {
        var vod_id = item.dataset.lazyVodId;
        var vod_type = item.dataset.lazyVodType;
        if (item.top < height+600) {
          for(var ii=0;ii<dataList[vod_type].length;ii++){
            if(dataList[vod_type][ii]['vod_id'] == vod_id && !dataList[vod_type][ii]['show']){
              is_change = true;
              dataList[vod_type][ii]['show'] = true;
            }
          }
        }
      })
      if(is_change){
        pageO.setData({
          [setDateName]: dataList
        })
      }
    }).exec()
  },
  /**
   * 获取页面可视区域高度
   */
  getPageHeight: function() {
    return new Promise((resolve, reject) => {
      // 获取页面可视区域的高度
      tt.getSystemInfo({
        success: (res) => {
          resolve(res.screenHeight)
        }
      })
    })
  },
  globalData: {
    pageHeight: 0
  }
})