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
    theater_list:[],
    fetchOptions:{
      page: 1,
      referer: 2
    }
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
    httpsUtil.get(API.GET_THEATER_LIST,this.data.fetchOptions,{isLoading:false}).then(data=>{
      console.log("data----哈哈哈哈",data.data);
      let list = data.data.theatre_list;
      if(list.length){
        this.setData({
          theater_list: this.data.theater_list.concat(list)
        })
      }else{
        this.setData({
          isLoading: false
        })
      }
    })
  },

  bindscrolltoupper:function(e){
    console.log("滚动到顶部了")
  },
  bindscrolltolower:function(e){
    console.log("滚动到底部了")
    if(this.data.isLoading){
      this.setData({
        "fetchOptions.page":this.data.fetchOptions.page+1
      })
      this.fetchData()
    }
  }


})