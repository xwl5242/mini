// const util = require("./util.js")
const GET = "GET";
const POST = "POST"
const CUR_VER = "1"
// api前缀
const baseURL = "https://smart.quanchonger.com/vip/";
// const baseURL = "http://127.0.0.1:8082/vip/";

// 封装 wx.request 
function request(url, method, data) {
  data = data || {};
  data['ver'] = CUR_VER;
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      method: method,
      data: method == POST ? JSON.stringify(data) : data,
      success: function(res) {
        resolve(res);
      },
      fail: function(res) {
        resolve(res);
      }
    })
  });
}

// 所有api地址
const indexApi = "index"
const bannerApi = "banner"
const topApi = "top"

// 所有api请求
const API = {
  ver: CUR_VER,
  send: (url, data) => request(url, GET, data),
  index: data => request(indexApi, GET, data),
  banner: data => request(bannerApi, GET, data),
  top: data => request(topApi, GET, data),
}

module.exports = {
  API: API,
}