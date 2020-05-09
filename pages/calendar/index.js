const httpsUtil = require('../../utils/httpsUtil');
const util = require('../../utils/util.js');
const API = require('../../constant/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarConfig:{
      theme: 'elegant',
      // defaultDay: true,
      highlightToday: true,
      markToday: '今日',
    },
    fetchOption:{
      category: "",
      city_id: wx.getStorageSync('cityInfo').id,
      start_time: "",
      page: 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("----页面加载")
  },
  onSelectLocation:function(v){
    console.log("切换城市",v)
  },
  getCategoryId:function(e){
    console.log("分类",e.detail.categoryId)
    this.setData({'fetchOption.category':e.detail.categoryId})
    this.getRecommendList()
  },

  afterTapDay(e){
    console.log("onTapDay",e);
    this.setData({"fetchOption.start_time":e.detail.year+'/'+e.detail.month+"/"+e.detail.day})
    this.getRecommendList()
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  bindscrolltoupper:function(){
    console.log("下啦到顶部")
  },
  bindscrolltolower:function(){
    console.log("上啦到底部")
  },

  getRecommendList:function(){
    httpsUtil({
      url: API.GET_RECOMMEND_FOR_YOU,
      data: this.data.fetchOption,
      success: (data) => {

        let list = data.data.data.list

        for (let i = 0; i < list.length;i++){
          list[i].date_scope = util.formatDate(list[i].start_show_timestamp * 1000, "Y.M.D") + " - " + util.formatDate(list[i].end_show_timestamp * 1000, "M.D");
        }

        this.setData({
          total:data.data.data.total,
          recommend_list: this.data.recommend_list.concat(list)
        })
        
        if (this.data.recommend_list.length == data.data.data.total || data.data.data.total==0){
          this.setData({isLoading: false})
        }else{
          this.setData({
            isLoading:true
          })
        }
        
      },
      fail: (err) => {
        console.log("err", err);
      }
    })
  },




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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