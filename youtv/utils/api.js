// const util = require("./util.js")
const GET = "GET";
const POST = "POST"
const CUR_VERSION = "V2";
// api前缀
const baseURL = "https://smart.quanchonger.com/vip/";
// const baseURL = "http://127.0.0.1:8082/vip/";

// 封装 tt.request 
function request(url, method, data) {
  data = data || {};
  data['ver'] = CUR_VERSION;
  return new Promise((resolve, reject) => {
    tt.request({
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
const auditIndexApi = "audit/index"
const bannerApi = "banner"
const topApi = "top"

// 所有api请求
const API = {
  send: (url, data) => request(url, GET, data),
  index: data => request(indexApi, GET, data),
  auditIndex: data => request(auditIndexApi, GET, data),
  banner: data => request(bannerApi, GET, data),
  top: data => request(topApi, GET, data),
  suo: data => request("suo", GET, data),
  setting: data => request("audit/setting", GET, data),
}

module.exports = {
  API: API,
}