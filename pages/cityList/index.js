
const httpsUtil = require('../../utils/httpsUtil');

const util = require('../../utils/util.js');

const API = require('../../constant/api');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexList:[],
    cityList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        console.log("data----哈哈哈哈",data.data);
        let cityList = data.data.data;
        this.setData({
          cityList:cityList,
          indexList:Object.keys(cityList)
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