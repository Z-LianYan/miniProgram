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
    isShowSchedular:false,
    buttons: [{text: '取消'}, {text: '确定'}],
    discountsDetial:[],

    schedular:[],

    reSchedular:[],

    sessionTime:[],

    prices:[],

    activateIndex:0,

    activateSessionIdx:0,
    priceIdx:"-",

    isStockoutStatus:false,

    submitData:{
      name: "",
      phone: "",
      ticket_id: "",
      schedular_id: "",
      type: 0,
    }



  },

  fetchDetailData:function(){
    httpsUtil({
      url: API.GET_TICKET_DETAIL,
      data: {
        schedular_id: 111971
        // schedular_id: 110775
      },
      success: (data) => {
        console.log("演出详情",data.data);
        const detail = data.data.data;
        detail.static_data.low_price = Number(detail.static_data.low_price).toFixed(0);
        detail.static_data.high_price = Number(detail.static_data.high_price).toFixed(0);
        
        detail.static_data.venue.venueArr = detail.static_data.venue.venue_coordinate.split(',')

        detail.static_data.show_time_scope = util.formatDate(detail.static_data.show_time_data.show_time_start * 1000, "Y.M.D")+' - '+util.formatDate(detail.static_data.show_time_data.show_time_end * 1000, "M.D");
        

        let schedular = data.data.data.item_list;
        let reSchedular = [];
        let uniqueObj={};
        for(let i=0;i<schedular.length;i++){
          if(!uniqueObj[schedular[i].project_time]){
            uniqueObj[schedular[i].project_time] = true;
            reSchedular.push(schedular[i]);
          }
        }

        console.log("6666",detail.static_data.venue);
        this.setData({
          detailDate:detail,
          schedular:schedular,
          reSchedular:reSchedular,
          sessionTime:[reSchedular[0]]
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
    }).then(() => {});
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
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    httpsUtil({
      url: API.GET_TICKET_DISCOUNTS,
      data: {
        show_id: options.showId,
        city_id: options.cityId,
        venue_id: options.venueId
      },
      success: (data) => {
        console.log("套票优惠",data.data);

        wx.hideLoading()

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


  onGetPrice:function(schedular_id){
    this.setData({isShowSchedular:true})
    console.log("--",typeof(schedular_id))
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    httpsUtil({
      url: API.GET_SCHEDULE_TICKET,
      data: {
        schedular_id: typeof(schedular_id)=="number"?schedular_id:this.data.reSchedular[0].id
      },
      success: (data) => {
        console.log("时间表",data.data);
        wx.hideLoading();
        this.setData({prices:data.data.data.list})
      },
      fail: (err) => {
        console.log("err", err);
      }
    })
  },

  onCloseSchedular:function(){
    this.setData({
      isShowSchedular:false
    })
  },


  selectSchedular:function(e){
    console.log("选择时间",e.currentTarget.dataset)
    let dataset = e.currentTarget.dataset;
    // let item = dataset.item;
    let sessionTime = [];
    this.data.schedular.map(item=>{
      if(dataset.item.project_time==item.project_time){
        sessionTime.push(item);
      }
    })

    this.setData({
      activateIndex:dataset.projectIdx,
      sessionTime:sessionTime,
      activateSessionIdx:0,
      // priceIdx:"-"
    })
    this.reSet();
    this.onGetPrice(dataset.item.id)
  },

  selectSession:function(e){
    console.log("session时间",e.currentTarget.dataset)



    let dataset = e.currentTarget.dataset;

    this.setData({
      activateSessionIdx:dataset.sessionIdx,
      // priceIdx:"-"
    })
    this.reSet();

    this.onGetPrice(dataset.item.id)

  },

  reSet:function(){
    this.setData({
      priceIdx:"-",
      isStockoutStatus:false
    })
  },

  selectPrice:function(e){
    console.log("选择价格",e.currentTarget.dataset)
    const dataset = e.currentTarget.dataset;
    // console.log("选择价格",dataset.limit_num)
    if(!dataset.item.limit_num){
      this.setData({
        isStockoutStatus:true
      })
    }else{
      this.setData({
        isStockoutStatus:false
      })
    }
    
    console.log("呵呵",dataset.item.limit_num,this.data.isStockoutStatus)

    this.setData({
      priceIdx:dataset.priceIdx
    })
  },


  onNavigator:function(e){
    let venue = e.currentTarget.dataset.venue;
    wx.openLocation({
      latitude:Number(venue.venueArr[1]),
      longitude:Number(venue.venueArr[0]),
      name:venue.venue_name,
      address:venue.venue_address,
      scale: 18
    })
  },

  onNameChange:function(val){
    this.setData({
      'submitData.name':val.detail
    })
  },
  onPhoneChange:function(val){
    this.setData({
      'submitData.phone':val.detail
    })
  },

  stockoutRegister:function(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    httpsUtil({
      url: API.STOCKOUT_REGISTER,
      data: this.data.submitData,
      success: (data) => {
        console.log("缺货登记",data.data);
        wx.hideLoading();
        // this.setData({prices:data.data.data.list})
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