const httpsUtil = require('../../utils/httpsUtil');
const util = require('../../utils/util.js');
const API = require('../../constant/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarConfig: {
      theme: 'elegant',
      // defaultDay: true,
      highlightToday: true,
      markToday: '今日',
      disableMode: {  // 禁用某一天之前/之后的所有日期
        type: 'before',  // [‘before’, 'after']
        date: '', // 无该属性或该属性值为假，则默认为当天
      },
    },
    fetchOption: {
      category: 0,
      city_id: 0,
      start_time: util.formatDate(Date.parse(new Date()), "Y/M/D"),
      // start_time: Date(),
      page: 1
    },
    
    listData: [],
    isLoading: true,
    total: '-',


    cityInfo:{}



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("----页面加载"),
    this.setData({
      cityInfo:wx.getStorageSync("cityInfo"),
      "fetchOption.city_id":wx.getStorageSync("cityInfo").id
    })
    this.getListData();
  },
  onSwitchCity: function (v) {
    console.log("切换城市", v)
    this.setData({
      cityInfo:{
        id:v.detail.id,
        name:v.detail.name,
        Abbreviation:v.detail.Abbreviation,
      },
      'fetchOption.city_id':v.detail.id,
      total: "-",
      listData:[]
    })

    this.getListData();

  },
  getCategoryId: function (e) {
    console.log("分类", e.detail.categoryId)
    this.setData({
      total: "-",
      listData: [],
      'fetchOption.category': e.detail.categoryId
    })
    this.getListData()
  },

  afterTapDay(e) {
    console.log("onTapDay", e);
    this.setData({
      total: "-",
      listData: [],
      "fetchOption.start_time": e.detail.year + '/' + e.detail.month + "/" + e.detail.day
    })
    this.getListData()
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  bindscrolltoupper: function () {
    console.log("下啦到顶部")
  },
  bindscrolltolower: function () {
    console.log("上啦到底部", this.data.listData.length, this.data.total)

    if (this.data.listData.length == this.data.total || this.data.total == 0) return;

    if (this.data.isLoading) {
      this.setData({
        isLoading: false,
        'fetchOption.page': this.data.fetchOption.page + 1
      });
      this.getListData();
    }
  },

  getListData: function () {

    httpsUtil.get(API.GET_RECOMMEND_FOR_YOU,this.data.fetchOption,{isLoading:false}).then(data=>{
      let res = data.data
      let list = data.data.list;
      if (res.result_type == 2) {
        return this.setData({
          total: 0,
          listData: []
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
        listData: this.data.listData.concat(list)
      })
    })

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