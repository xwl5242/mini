const GET = "GET", POST = "POST", CUR_VER = "W4";
const baseURL = "https://smart.quanchonger.com/vip/";
function request(url, method, data) {
  data = data || {};
  data['ver'] = CUR_VER;
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL+url,
      method: method,
      data: method == POST? JSON.stringify(data): data,
      success: function(res) {
        resolve(res);
      },
      fail: function(res) {
        resolve(res);
      }
    });
  });
}
// 所有api请求
const API = {
  ver: CUR_VER,
  top: data => request("top", GET, data),
  index: data => request("index", GET, data),
  send: (url, data) => request(url, GET, data),
  banner: data => request("banner", GET, data),
  setting: () =>  new Promise((resolve, reject) => {
    request("settings", GET).then(res=>{
      let settings = res.data.settings;
      wx.setStorageSync('ADS', settings['ads']);
      wx.setStorageSync('HIDE_VODS', settings['hide_vods']);
      wx.setStorageSync('SHOW_VODS', settings['show_vods']);
      wx.setStorageSync('STATUS', settings['status']);
      wx.setStorageSync('PARSE_ENABLE', settings['parse_enable'])
      wx.setStorageSync('SETED_STORAGE_TIME', +new Date());
      resolve(res);
    });
  })
}
module.exports = {
  API: API
}