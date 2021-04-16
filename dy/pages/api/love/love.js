// pages/api/love/love.js
const $api = require("../../../utils/api.js").API
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: '',
    word_type: '',
    article: {},
    articleNo: ''
  },
  copyWord: function() {
    var wordText = '';
    if(this.data.word_type!='3'){
      wordText = this.data.word;
    }else{
      wordText = 'https://smart.quanchonger.com/smart/article/download/'+this.data.articleNo;
    }
    wx.setClipboardData({
      data: wordText,
      success (res) {
      }
    })
  },
  changeWord: function() {
    var word_type = this.data.word_type;
    var apiList = {'1': 'love', '2': 'word', '3': 'article'};
    $api.send(apiList[word_type]).then(res=>{
      if(word_type == '3') {
        var article = res.data.article;
        var content = article.content;
        content = content.split('</p><p>');
        article.content = content;
        this.setData({
          article: article,
          articleNo: res.data.file_no
        });
      }else{
        this.setData({
          word: res.data
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var word_type = options['type'];
    this.setData({
      word_type: word_type
    });
    this.changeWord();
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