//index.js
//获取应用实例
const app = getApp()

const httpsUtil = require('../../utils/httpsUtil');
const util = require('../../utils/util.js');
const API = require('../../constant/api');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),



    classifyList:[],
    slide_list:[],
    hot_list:[],
    recommend_list: [],

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {// 生命周期函数--监听页面加载
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

    this.fetchData();

    this.getRecommendList();

    this.fetchHotList();
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
      url: API.GET_CLASSIFY_LIST,
      data:{
        city_id: 10130,
        abbreviation: "GZ",
        version: '6.1.1',
        referer: 2,
      },
      success:(data)=>{
        // console.log("data----",data.data.data);
        this.setData({
          classifyList:data.data.data.classify_list.splice(0,8),
          slide_list: data.data.data.slide_list
        })
      },
      fail:(err)=>{
        console.log("err",err);
      }
    })
  },


  getRecommendList:function(){
    httpsUtil({
      url: API.GET_RECOMMEND_FOR_YOU,
      data: {
        city_id: 3,
        category: "",
        keywords: "",
        venue_id: "",
        start_time: "",
        page: 1,
        referer_type: "index",
        version: "6.1.1",
        referer: 2,
      },
      success: (data) => {
        console.log("data----recommend", data.data.data);
        let list = data.data.data.list
        for (let i = 0; i < list.length;i++){
          // list[i].date_scope = this.handleDateFormat(list[i].start_show_timestamp)
          list[i].date_scope = util.formatDate(list[i].start_show_timestamp * 1000, "Y.M.D") + " - " + util.formatDate(list[i].end_show_timestamp * 1000, "M.D");
        }
        this.setData({
          recommend_list: list,
        })
        
      },
      fail: (err) => {
        console.log("err", err);
      }
    })
  },

  fetchHotList:function(){
    httpsUtil({
      url: API.GET_HOT_LIST,
      data: {
        city_id: 3,
        version: '6.1.1',
        referer: 2
      },
      success: (data) => {
        // console.log("data----", data.data.data);
        this.setData({
          hot_list: data.data.data.hots_show_list,
        })
      },
      fail: (err) => {
        console.log("err", err);
      }
    })
  },


  handleDateFormat(date){
    // let len = date.length;
    // if(!len) return;
    // let start_date = date[0].toString().substr(0, 4) + "." + date[0].toString().substr(4, 2) + "." + date[0].toString().substr(6, 2);
    // // let end_date = date[len].toString().substr(0, 4) + "." + date[len].toString().substr(4, 2) + "." + date[len].toString().substr(6, 2);
    // return start_date;
    util.formatDate(date)
  },


  scrolltolower:function(){
    console.log("123888")
  },



  onHotAllCheck:function(){
    console.log("热门全部")
  }







})
