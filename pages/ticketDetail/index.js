const httpsUtil = require('../../utils/httpsUtil');
const util = require('../../utils/util.js');
const API = require('../../constant/api');

import Dialog from '../../components/dist/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailDate:{},
    isShowDialog:false,
    isShowActionSheet:false,
    buttons: [{text: '取消'}, {text: '确定'}],
    discountsDetial:[]
  },

  fetchDetailData:function(){
    httpsUtil({
      url: API.GET_TICKET_DETAIL,
      data: {
        schedular_id: 109302
      },
      success: (data) => {
        console.log("演出详情",data.data);
        const detail = data.data.data;
        detail.static_data.low_price = Number(detail.static_data.low_price).toFixed(0);
        detail.static_data.high_price = Number(detail.static_data.high_price).toFixed(0);

        detail.static_data.show_time_scope = util.formatDate(detail.static_data.show_time_data.show_time_start * 1000, "Y.M.D")+' - '+util.formatDate(detail.static_data.show_time_data.show_time_end * 1000, "M.D");
        

        this.setData({
          detailDate:detail
        })
      },
      fail: (err) => {
        console.log("err", err);
      }
    })
  },


  onShare:function(){
    Dialog.alert({
      message: '使用浏览器的分享功能把演出分享出去',
      confirmButtonText:"知道了"
    }).then(() => {

    });
  },
  onGoHome:function(){
    wx.switchTab({url: "/pages/index/index"})
  },

  onDiscounts:function(e){
    if(e.target.dataset.item=="套票优惠"){
      console.log("优惠",e)
      this.fetchDiscountsDetail(e.target.dataset)
      // this.setData({
      //   isShowActionSheet:true
      // })
    }
  },
  onCloseActionSheet:function(){
    this.setData({
      isShowActionSheet:false
    })
  },


  fetchDiscountsDetail:function(options){
    httpsUtil({
      url: API.GET_TICKET_DISCOUNTS,
      data: {
        show_id: options.showId,
        city_id: options.cityId,
        venue_id: options.venueId
      },
      success: (data) => {
        console.log("套票优惠",data.data);

        this.setData({
          isShowActionSheet:true
        })
        const detail = data.data.data.list;
        this.setData({
          discountsDetial:detail
        })
      },
      fail: (err) => {
        console.log("err", err);
      }
    })

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchDetailData();
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