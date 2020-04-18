//index.js
//获取应用实例
const app = getApp()

const httpsUtil = require('../../utils/httpsUtil');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),



    classifyList:[]




  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.fetchData()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },






  
  fetchData:function(){
    console.log("111111")
    httpsUtil({
      url:'/home/index/getClassifyHome',
      data:{
        city_id: 10130,
        abbreviation: 'ZZh',
        version: '6.1.1',
        referer: 2,
      },
      success:(data)=>{
        console.log("data----",data.data.data.classify_list);
        this.setData({
          classifyList:data.data.data.classify_list
        })
      },
      fail:(err)=>{
        console.log("err",err);
      }
    })
  }
})
