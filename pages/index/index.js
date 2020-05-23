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
    floorData:[],
    total:'-',

    isLoading:true,

    cityInfo:{}

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

    this.setData({
      'recommendOptions.page':1,
      // classifyList:[],
      // slide_list:[],
      // hot_list:[],
      // recommend_list: [],
      // tourSingList: [],
      isLoading:true,
      cityInfo:wx.getStorageSync('cityInfo')
    })


    

    
    this.getClassifyList();

    this.getRecommendList();

    this.fetchHotList();

    if(this.data.cityInfo.id==0){
      this.fetchTourSingList();
      this.fetchFloorShow();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      classifyList:[],
      slide_list:[],
      hot_list:[],
      recommend_list: [],
      tourSingList: [],
      floorData:[]
    })
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


    httpsUtil.get(API.GET_CLASSIFY_LIST,{
      city_id: this.data.cityInfo.id,
      abbreviation: this.data.cityInfo.abbreviation
    },{isLoading:false}).then(data=>{
      let classifyList = data.data.classify_list;
      let slideList = data.data.slide_list;

      let classifyData = [];
      let slideData = [];


      classifyList.map(item=>{
        if(item.category_id!=0){
          classifyData.push(item);
        }
      })
      

      slideList.map(item=>{
        if(item.url.indexOf("https://m.juooo.com/ticket/")!=-1){
          slideData.push(item)
        }
      })

      this.setData({
        classifyList:classifyData,
        slide_list: slideData
      })
    })
  },


  getRecommendList:function(){

    httpsUtil.get(API.GET_RECOMMEND_FOR_YOU,{
      city_id: this.data.cityInfo.id,
      category: "",
      keywords: "",
      venue_id: "",
      start_time: "",
      referer_type: "index",
      ...this.data.recommendOptions
    },{isLoading:false}).then(data=>{
      let list = data.data.list

      for (let i = 0; i < list.length;i++){
        list[i].date_scope = util.formatDate(list[i].start_show_timestamp * 1000, "Y.M.D") + " - " + util.formatDate(list[i].end_show_timestamp * 1000, "M.D");
      }

      this.setData({
        total:data.data.total,
        recommend_list: this.data.recommend_list.concat(list)
      })
      
      if (this.data.recommend_list.length == data.data.total || data.data.total==0){
        this.setData({isLoading: false})
      }else{
        this.setData({
          isLoading:true
        })
      }
    })
  },

  fetchHotList:function(){

    httpsUtil.get(API.GET_HOT_LIST,{
      city_id: this.data.cityInfo.id
    },{isLoading:false}).then(data=>{
      this.setData({
        hot_list: data.data.hots_show_list,
      })
    })
  },

  fetchTourSingList:function(){
    httpsUtil.get(API.GET_TOUR_SING_LIST,{},{isLoading:false}).then( data => {
      console.log("巡回演唱", data.data);
      let list = data.data.list;
      for(var i=0;i<list.length;i++){
        list[i].date_scope = util.formatDate(list[i].start_time * 1000, "Y.M.D") + " - " + util.formatDate(list[i].end_time * 1000, "M.D");
      }
      this.setData({
        tourSingList: list,
      })
    })
  },

  fetchFloorShow:function(){
    httpsUtil.get(API.GET_FLOOR_SHOW,{
      city_id: this.data.cityInfo.id
    },{isLoading:false}).then( data => {
      console.log("楼层", data.data);
      let list = data.data;
      for(var i=0;i<list.length;i++){
        for(let j=0;j<list[i].list.length;j++){
          list[i].list[j].show_date = util.formatDate(list[i].list[j].show_time * 1000, "Y.M.D");
          list[i].list[j].time = util.formatDate(list[i].list[j].show_time * 1000, "h:m");
          if(list[i].list[j].ico.indexOf('<span class="logo_i"></span>')!=-1){
            list[i].list[j].method = 1
          }
        }
      }
      this.setData({
        floorData: list,
      })
    })
  },





  scrolltolower:function(){

    if (this.data.isLoading) {
      this.setData({
        'recommendOptions.page':this.data.recommendOptions.page+1,
        isLoading:false
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
