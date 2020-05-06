
const httpsUtil = require('../../utils/httpsUtil');

const util = require('../../utils/util.js');

const API = require('../../constant/api');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexList:[],
    cityList:[],
    hotCityList:[],
    cityInfo:wx.getStorageSync('cityInfo')||{"id":0,"cityname":"全国","abbreviation":""}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchHotCityList();
    this.fetchCityData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      cityInfo:wx.getStorageSync('cityInfo')||{"id":0,"cityname":"全国","abbreviation":""}
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  fetchCityData:function(){
    httpsUtil({
      url: API.GET_CITY_LIST,
      data: this.data.fetchOptions,
      success: (data) => {
        
        let cityList = data.data.data;
        let indexList = Object.keys(cityList);
        indexList.unshift('热门');
        indexList.unshift('定位');
        this.setData({
          cityList:cityList,
          indexList:indexList
        })

      },
      fail: (err) => {
        console.log("err", err);
      }
    })
  },

  fetchHotCityList:function(){
    httpsUtil({
      url:API.GET_HOT_CITY_LIST,
      data: {
        version: '6.1.1',
        referer: 2
      },
      success: (data) => {
        console.log("热门城市---------",data.data.data.hot_city_List);
        let hotCityList = data.data.data.hot_city_List;
        // {"id":0,"cityname":"全国","abbreviation":""}
        hotCityList.unshift({
          name: "全国",
          id: 0,
          Abbreviation: ""
        })
        this.setData({
          hotCityList:hotCityList
        })
      },
      fail: (err) => {
        console.log("err", err);
      }
    })
  },

  selectCity:function(e){
    wx.setStorageSync('cityInfo', e.currentTarget.dataset)
    wx.switchTab({ url: '/pages/index/index' })
  }



})