const httpsUtil = require('../../utils/httpsUtil');
const util = require('../../utils/util.js');
const API = require('../../constant/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theaterInfo:{},
    recommendData:[],
    isLoading:false,
    total:"-",
    fetchOption:{
      page: 1,
      venue_id: '1078,1079,1795'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options",options);
    this.fetchTheaterInfo(options.theatre_id);
    this.fetchHotRecommend();
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
  fetchHotRecommend:function(){
    httpsUtil.get(API.GET_RECOMMEND_FOR_YOU,this.data.fetchOption,{isLoading:false}).then(data=>{
      let res = data.data;
      let list = data.data.list;
      if (res.result_type == 2) {
        return this.setData({
          total: 0,
          recommendData: []
        })
      }
      if(list.length){
        for (let i = 0; i < list.length; i++) {
          list[i].equality_start_end_date = util.formatDate(list[i].start_show_timestamp * 1000, "Y.M.D");
          list[i].equality_start_end_time = util.formatDate(list[i].start_show_timestamp * 1000, "h.m");
          list[i].date_scope = util.formatDate(list[i].start_show_timestamp * 1000, "Y.M.D") + " - " + util.formatDate(list[i].end_show_timestamp * 1000, "M.D");
        }
      }
      this.setData({
        isLoading: true,
        total: data.data.total,
        recommendData: this.data.recommendData.concat(list)
      })
    })
  },


  fetchTheaterInfo:function(theatre_id){
    httpsUtil.get(API.GET_THEATER_INFO,{
      theatre_id: theatre_id,
      longitude: "",
      latitude:""
    },{isLoading:false}).then(data=>{
      this.setData({theaterInfo:data.data})
    })
  },

  onNavigator:function(e){
    const coordinate = this.data.theaterInfo.coordinate.split(",");
    wx.openLocation({
      latitude:Number(coordinate[1]),
      longitude:Number(coordinate[0]),
      name:this.data.theaterInfo.theatre_name,
      address:this.data.theaterInfo.theatre_address,
      scale: 18
    })
  },

  onNavigateBack:function(){
    wx.switchTab({
      url: '/pages/theater/index'
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
    console.log("上拉触底")
    if (this.data.recommendData.length == this.data.total || this.data.total == 0) return;

    if (this.data.isLoading) {
      this.setData({
        isLoading: false,
        'fetchOption.page': this.data.fetchOption.page + 1
      });
      this.fetchHotRecommend();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})