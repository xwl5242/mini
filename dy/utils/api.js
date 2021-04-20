// const util = require("./util.js")
const GET = "GET";
const POST = "POST"
// api前缀
const baseURL = "https://smart.quanchonger.com/smart/";
// const baseURL = "http://127.0.0.1:8082/smart/";

// 封装 wx.request 
function request(url, method, data) {
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
// 所有api请求
const API = {
  sendPost: (url, data) => request(url, POST, data),
  send: (url, data) => request(url, GET, data)
}
module.exports = {
  API: API,
}