//index.js
//获取应用实例
const app = getApp()

const httpsUtil = require('../../utils/httpsUtil');

Page({
  data: {
    accountInfo:[{
      title:"账户余额",
      total:0
    },{
      title:"积分",
      total:8
    },{
      title:"优惠券",
      total:0
    }],
    itemList:[{
      icon:"orders-o",
      label:"我的订单"
    },{
      icon:"coupon-o",
      label:"我的票夹"
    },{
      icon:"idcard",
      label:"我的卡包"
    },{
      icon:"location-o",
      label:"收获地址"
    }]
  },
  onLoad: function () {
    // this.fetchData()
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
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    console.log("123456789")
    wx.stopPullDownRefresh()

    // wx.startPullDownRefresh()

    setTimeout(() => { wx.hideNavigationBarLoading()},2000)
  },




})
