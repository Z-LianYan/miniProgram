// pages/theater/index.js


const httpsUtil = require('../../utils/httpsUtil');

const util = require('../../utils/util.js');

const API = require('../../constant/api');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:true,
    theater_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("监听页面加载")
    this.fetchData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("监听页面初次渲染完成")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("页面显示")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("页面隐藏")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("监听用户下拉动作")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉触底事件的处理函数")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("点击右上角分享")
  },


  fetchData:function(){
    httpsUtil({
      url: API.GET_THEATER_LIST,
      data: {
        page: 1,
        version: '6.1.1',
        referer: 2
      },
      success: (data) => {
        console.log("data----哈哈哈哈",data.data.data);
        let list = data.data.data.theatre_list;
        this.setData({
          theater_list: list
        })
        console.log("list",list)
      },
      fail: (err) => {
        console.log("err", err);
      }
    })
  },

  bindscrolltoupper:function(e){
    console.log("滚动到顶部了")
  },
  bindscrolltolower:function(e){
    console.log("滚动到底部了")
  }


})