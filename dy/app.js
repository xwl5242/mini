//app.js
App({
  onLaunch: function () {
  },
  globalData: {
  },
  downloadMedia: function(mediaType,downloadUrl){
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