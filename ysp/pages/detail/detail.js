// pages/detail/detail.js
const app = getApp()
const $api = require("../../utils/api").API
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curPlayUrl: '',
    mvDetail: {},
    mvPlayUrls: [],
    playSourceNum: 1,
    curPlaySourceIndex: 0,
    curPlayIndex: -1,
    showVideo: false,
    playerStatus: false,
    noticeStatus: false,
    notice: ''
  },
  // 切换source
  changePlaySource: function(e){
    var sourceIndex = e.currentTarget.dataset.playSourceIndex;
    this.setData({
      curPlayIndex: -1,
      curPlaySourceIndex: sourceIndex
    });
  },
  // play
  toPlay: function(e) {
    var play_url = e.currentTarget.dataset.url;
    var play_from = e.currentTarget.dataset.from;
    var data_index = e.currentTarget.dataset.index;
    if(!this.data.playerStatus){
      wx.showToast({
        title: '暂不支持播放',
        icon: 'error'
      });
    }else{
      if(play_from == 'leduo') {
        $api.send('get/real/url/'+play_url).then(res=>{
          this.setData({
            curPlayUrl: res.data.url
          });
        });
      }else{
        this.setData({
          curPlayUrl: play_url
        });
      }
      this.setData({
        showVideo: true,
        curPlayIndex: data_index
      });
      wx.showToast({
        icon: 'none',
        title: '加载中...',
      })
    }
  },
  init: function (vodId) {
    // search setting
    let ads = wx.getStorageSync('ADS');
    let status = wx.getStorageSync('STATUS');
    if(status == '1') {
      this.setData({
        notice: ads,
        playerStatus: true,
        noticeStatus: true
      });
    }else{
      this.setData({
        playerStatus: false,
        noticeStatus: false
      });
    }
    // search vod detail
    $api.send('detail/'+vodId, {}).then(res => {
      var purl = res.data.mv.vod_play_url;
      var playFrom = res.data.mv.vod_play_from;
      if(purl){
        var purls = purl.split('$$$')
        var playUrls = {}
        for (var i=0;i<purls.length;i++){
          var playUrlList = [];
          var subPlayUrls = purls[i].split('#');
          for(var j=0;j<subPlayUrls.length;j++){
            var urlO = {}
            var temp = subPlayUrls[j].split('$')
            urlO['k'] = temp[0]
            urlO['v'] = temp[1]
            urlO['f'] = playFrom
            playUrlList.push(urlO);
          }
          playUrls[i] = playUrlList;
        }
        this.setData({
          mvPlayUrls: playUrls,
          playSourceNum: purls.length
        })
      }
      this.setData({
        mvDetail: res.data.mv
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vodId = options['vod_id'];
    $api.send("settings").then(res=>{
      let settings = res.data.settings;
      wx.setStorageSync('ADS', settings['ads']);
      wx.setStorageSync('HIDE_VODS', settings['hide_vods']);
      wx.setStorageSync('SHOW_VODS', settings['show_vods']);
      wx.setStorageSync('STATUS', settings['status']);
      wx.setStorageSync('PARSE_ENABLE', settings['parse_enable']);
      this.init(vodId);
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