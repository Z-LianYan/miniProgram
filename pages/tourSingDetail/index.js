const httpsUtil = require('../../utils/httpsUtil');
const util = require('../../utils/util.js');
const API = require('../../constant/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options-巡回演出详情",options);
    this.fetchData(options.sid);
  },

  fetchData:function(id){
    httpsUtil.get(API.GET_TOUR_DETAIL_LIST,{id},{isLoading:true}).then(data=>{
      const list = data.data;
      console.log("巡回演出详情",list);
      list.date_scope = util.formatDate(list.start_time * 1000, "Y.M.D") + " - " + util.formatDate(list.end_time * 1000, "M.D");
      this.setData({
        detailData:list
      })

    })
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

  }
})