//index.js
//获取应用实例
const app = getApp()
const $api = require("../../utils/api.js").API
Page({
  data: {
    shareUrl: '',
    downloadAbled: false
  },
  bindKeyInput(e) {
    this.setData({
      shareUrl: e.detail.value
    })
  },
  removeWM(e) {
    // this.setData({
    //   shareUrl: 'https://v.douyin.com/ErAB1J'
    // })
    if (!this.data.shareUrl) {
      wx.showToast({
        icon: 'none',
        title: '请输入视频链接',
      })
      return;
    }
    if (this.data.shareUrl.indexOf('douyin.com') < 0) {
      wx.showToast({
        icon: 'none',
        title: '非抖音分享地址',
      })
      return;
    }
    if(this.data.downloadAbled){
      wx.showLoading({
        title: '解析中...',
      })
      $api.send('dy/parse',{
        url: this.data.shareUrl
      }).then(res => {
        wx.hideLoading({
          success: (res) => {},
        });
        wx.navigateTo({
          url: './parse/parse?fileId=' + res.data['file_id'],
        })
      });
    }else{
      wx.showToast({
        title: '暂不支持下载',
      })
    }
  },
  onLoad: function () {
    $api.switchs().then(res=>{
      console.log(res.data.switchs);
      var dyParseSwitch = res.data.switchs.dy_parse_switch;
      this.setData({
        downloadAbled: dyParseSwitch=='1'
      });
    });
  },
})