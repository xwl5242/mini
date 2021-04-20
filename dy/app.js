//app.js
const VER = "V1"
const $api = require("./utils/api.js").API
App({
  onLaunch: function () {
    // 配置开关
    $api.send('switch/'+VER).then(res=>{
      wx.setStorageSync('switch', res.data.switchs);
    });
    // 小程序菜单
    $api.send('menus?ver='+VER).then(res=>{
      wx.setStorageSync('menus', res.data.menus);
    });
  },
  globalData: {
  },
  // 下载媒体，mediaType：img-图片；video-视频
  downloadMedia: function(mediaType, downloadUrl){
    wx.getSetting({
      success: (res) => {
        //检查是否有访问相册的权限，如果没有则通过wx.authorize方法授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: (res) => {
              //用户点击允许获取相册信息后进入下载保存逻辑
              this.saveMedia(mediaType, downloadUrl)
            }
          })
        } else {
          this.saveMedia(mediaType, downloadUrl)
        }
      }
    });
  },
  // 保存媒体文件
  saveMedia: function(mediaType, url){
    wx.showLoading({
      title: '处理中...'
    })
    wx.downloadFile({
      url: url,
      success(res) {
        console.log(res);
        if (res.statusCode == 200) {
          wx.hideLoading();
          if(mediaType=='image'){
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: '成功保存到手机相册中',
                  success(res) {
                    if (res.confirm) {}
                  }
                })
              }
            })
          }
          if(mediaType=='video'){
            wx.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: '成功保存到手机相册中',
                  success(res) {
                    if (res.confirm) {}
                  }
                })
              }
            })
          }
        }
      },
      fail(res) {
        console.log(res);
      }
    });
  }
})