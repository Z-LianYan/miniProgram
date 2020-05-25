const httpsUtil = require('../../utils/httpsUtil');
const util = require('../../utils/util.js');
const API = require('../../constant/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    tourSingData:[],
    isMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData();
  },


  scrolltolower:function(){
    
    if(this.data.isMore){
      this.setData({
        page:this.data.page+1
      })
      this.fetchData();
    }
  },

  fetchData:function(){
    httpsUtil.get(API.GET_TOUR_SING_LIST,{
      page: this.data.page
    },{isLoading:true}).then(data=>{
      const list = data.data.list;

      if(list.length==0){
        this.setData({
          isMore:false
        })
        return;
      }

      list.map(item=>{
        item.detail_query = item.detail_url.replace("https://m.juooo.com/tour/tourshowinfo?","")
        item.citys.map(it=>{
          it.date = util.formatDate(it.start_time * 1000, "M/D")
        })
      })
      console.log("list",list);

      this.setData({
        tourSingData:list
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