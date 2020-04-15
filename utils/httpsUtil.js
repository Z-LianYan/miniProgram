
const configs = require('./config.js');
const request = ({ url, data, success, fail} ) => {
  wx.request({
    url: configs.domain + url, //仅为示例，并非真实的接口地址
      data: data,
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: success,
      fail: fail
    })
}

module.exports = request