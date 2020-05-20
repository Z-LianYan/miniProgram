
const configs = require('./config.js');

export function get( url, data,{isLoading=false,loadingTitle="加载中..."}={}){
  return new Promise((resolve,reject)=>{
    if(isLoading){
      wx.showLoading({
        title: loadingTitle,
        mask:true
      })
    }
    wx.request({
      url: configs.domain + url+"?version=6.1.1&referer=2", //仅为示例，并非真实的接口地址
      data: data,
      method:"GET",
      header: {
          // 'content-type': 'application/json' // 默认值
      },
      success: (data)=>{
        wx.hideLoading();
        resolve(data.data)
      },
      fail: (err)=>{
        wx.hideLoading();
        reject(err)
      }
    })
  })
  
}



export function post(url, data, {isLoading=false,loadingTitle="提交中..."}={}){
  
  return new Promise((resolve,reject)=>{
    if(isLoading){
      wx.showLoading({
        title: loadingTitle,
        mask:true
      })
    }
    wx.request({
      url: configs.domain + url+"?version=6.1.1&referer=2", //仅为示例，并非真实的接口地址
      data: data,
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: (data)=>{
        console.log("data---http",data);
        resolve(data.data);
        wx.hideLoading();
        if(data.data.code==200){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: data.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (err)=>{
        reject(err);
        wx.hideLoading()
      }
    })
  })
  
}