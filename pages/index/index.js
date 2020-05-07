//index.js
//获取应用实例
const app = getApp()

const httpsUtil = require('../../utils/httpsUtil');
const util = require('../../utils/util.js');
const API = require('../../constant/api');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    recommendOptions:{
      page: 1
    },

    classifyList:[],
    slide_list:[],
    hot_list:[],
    recommend_list: [],
    tourSingList:[],

    isLoading:true,

    cityInfo:wx.getStorageSync('cityInfo')||{"id":0,"cityname":"全国","abbreviation":""}

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (opitons) {// 生命周期函数--监听页面加载
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


    
  },

  onShow:function(){
    console.log("city",wx.getStorageSync('cityInfo'));

    this.setData({
      'recommendOptions.page':1,
      classifyList:[],
      slide_list:[],
      hot_list:[],
      recommend_list: [],
      tourSingList: [],
      isLoading:true,
      cityInfo:wx.getStorageSync('cityInfo')||{"id":0,"cityname":"全国","abbreviation":""}
    })


    

    
    this.getClassifyList();

    this.getRecommendList();

    this.fetchHotList();

    if(this.data.cityInfo.id==0){
      this.fetchTourSingList();
    }
  },



  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  getClassifyList:function(){
    // console.log("111111")
    httpsUtil({
      url: API.GET_CLASSIFY_LIST,
      data:{
        city_id: this.data.cityInfo.id,
        abbreviation: this.data.cityInfo.abbreviation
      },
      success:(data)=>{
        // console.log("data----",data.data.data);
        this.setData({
          classifyList:data.data.data.classify_list,
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
        city_id: this.data.cityInfo.id,
        category: "",
        keywords: "",
        venue_id: "",
        start_time: "",
        referer_type: "index",
        ...this.data.recommendOptions
      },
      success: (data) => {
        console.log("data----recommend", data.data);

        let list = data.data.data.list
        for (let i = 0; i < list.length;i++){
          list[i].date_scope = util.formatDate(list[i].start_show_timestamp * 1000, "Y.M.D") + " - " + util.formatDate(list[i].end_show_timestamp * 1000, "M.D");
        }
        
        this.setData({
          recommend_list: this.data.recommend_list.concat(list)
        })
        
        if (this.data.recommend_list.length == data.data.data.total || data.data.data.total==0){
          console.log("------", this.data.recommend_list.length ,data.data.data.total)
          setTimeout(()=>{
            console.log("我是定时器", this.data.isLoading);
            this.setData({isLoading: false})
          },1000)
        }
        
        
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
        city_id: this.data.cityInfo.id
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

  fetchTourSingList:function(){
    httpsUtil({
      url: API.GET_TOUR_SING_LIST,
      data: {},
      success: (data) => {
        console.log("巡回演唱", data.data.data);
        let list = data.data.data.list;
        for(var i=0;i<list.length;i++){
          list[i].date_scope = util.formatDate(list[i].start_time * 1000, "Y.M.D") + " - " + util.formatDate(list[i].end_time * 1000, "M.D");
        }
        this.setData({
          tourSingList: list,
        })
      },
      fail: (err) => {
        console.log("err", err);
      }
    })
  },


  scrolltolower:function(){

    if (this.data.isLoading) {
      this.setData({
        'recommendOptions.page':this.data.recommendOptions.page+1
      })
      this.getRecommendList();
    };

  },

  onHotAllCheck:function(){
    console.log("热门全部")
  },

  onTourSingAllCheck:function(){
    console.log("巡回演唱全部")
  }


})
