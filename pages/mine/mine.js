//index.js
//获取应用实例
const app = getApp()

const httpsUtil = require('../../utils/httpsUtil');
const API = require('../../constant/api');

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
    userInfo:{},
    itemList:[]
  },
  onLoad: function () {
    this.fetchMenuItem(),
    this.fetchUserInfo()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  fetchMenuItem:function(){
    httpsUtil({
      url:API.GET_MENU_ITEM,
      data:{
        version: "6.1.1",
        referer: 2
      },
      success:(data)=>{
        // console.log("data----",data.data.data);
        let list = data.data.data;
        
        let itemList = [];
        let arr = [];
        for(let i=0;i<list.length;i++){
          arr.push(list[i])
          if(((i+1)%4)==0){
            itemList.push(arr);
            arr = [];
            if((i+5)>list.length && list.length>(i+1)){
              itemList.push(list.slice(i+1,list.length));
            }
          }
        }
        this.setData({
          itemList:itemList
        })
      },
      fail:(err)=>{
        console.log("err",err);
      }
    })
  },

  fetchUserInfo:function(){
    httpsUtil({
      url:API.GET_USERINFO,
      data:{
        version: "6.1.1",
        referer: 2
      },
      success:(data)=>{
        console.log("userinfo----",data.data.data);
        let list = data.data.data;
        
        
        this.setData({
          userInfo:list
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
