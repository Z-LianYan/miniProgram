
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
    cityInfo:""
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
      cityInfo:wx.getStorageSync('cityInfo')
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

    httpsUtil.get(API.GET_CITY_LIST,this.data.fetchOptions,{isLoading:true}).then(data=>{
      let cityList = data.data;
      let indexList = Object.keys(cityList);
      indexList.unshift('热门');
      indexList.unshift('定位');
      this.setData({
        cityList:cityList,
        indexList:indexList
      })
    })
  },

  fetchHotCityList:function(){
    httpsUtil.get(API.GET_HOT_CITY_LIST,{
        version: '6.1.1',
        referer: 2
      },{isLoading:false}).then(data=>{
        console.log("热门城市---------",data.data.hot_city_List);

        let hotCityList = data.data.hot_city_List;
        hotCityList.unshift({
          name: "全国",
          id: 0,
          Abbreviation: ""
        })
        this.setData({
          hotCityList:hotCityList
        })
      })
  },

  selectCity:function(e){
    wx.setStorageSync('cityInfo', e.currentTarget.dataset)
    wx.switchTab({ url: '/pages/index/index' })
  }

})