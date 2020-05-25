const httpsUtil = require('../../utils/httpsUtil');
const util = require('../../utils/util.js');
const API = require('../../constant/api');

// import Dialog from '../../components/dist/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData:{},
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

    isShowNoticeInfo:false,

    submitData:{
      name: "",
      phone: "",
      ticket_id: "",
      schedular_id: "",
      type: 0
    },

    // selectedTime:{}
    relativeRecommend:[],
    isShowMoreBtn:false

  },

  fetchDetailData:function(schedular_id){
    httpsUtil.get(API.GET_TICKET_DETAIL,{
      schedular_id: schedular_id
      // schedular_id: 110775
    },{isLoading:false}).then(data=>{
      console.log("演出详情",data.data);
      const detail = data.data;

      this.fetchRelativeRecommend(detail.static_data.cate_parent_id,detail.static_data.city.city_id);


      detail.static_data.low_price = Number(detail.static_data.low_price).toFixed(0);
      detail.static_data.high_price = Number(detail.static_data.high_price).toFixed(0);
      
      detail.static_data.venue.venueArr = detail.static_data.venue.venue_coordinate.split(',')

      detail.static_data.show_time_scope = util.formatDate(detail.static_data.show_time_data.show_time_start * 1000, "Y.M.D")+' - '+util.formatDate(detail.static_data.show_time_data.show_time_end * 1000, "M.D");
      

      let schedular = detail.item_list;
      let reSchedular = [];
      let uniqueObj={};
      for(let i=0;i<schedular.length;i++){
        if(!uniqueObj[schedular[i].project_time]){
          uniqueObj[schedular[i].project_time] = true;
          reSchedular.push(schedular[i]);
        }
      }

      console.log("6666",detail.static_data.venue);

      let selectedTime = [];
      schedular.map(item=>{
        if(reSchedular[0].project_time==item.project_time && item.session_time){
          selectedTime.push(item);
        }
      })




      this.setData({
        detailData:detail,
        schedular:schedular,
        reSchedular:reSchedular,
        sessionTime:selectedTime,
        'submitData.schedular_id':selectedTime.length?selectedTime[0].id:reSchedular[0].id,
        // selectedTime:selectedTime[0]//选中项
      })
    })
  },


  onShare:function(){
    // Dialog.alert({
    //   message: '使用浏览器的分享功能把演出分享出去',
    //   confirmButtonText:"知道了"
    // }).then(() => {});
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
    httpsUtil.get(API.GET_TICKET_DISCOUNTS,{
      show_id: options.showId,
      city_id: options.cityId,
      venue_id: options.venueId
    },{isLoading:true}).then(data=>{
      console.log("套票优惠",data.data);

      this.setData({
        isShowActionSheet:true
      })
      const detail = data.data.list;
      this.setData({
        discountsDetial:detail
      })
    })
  },


  onGetPrice:function(schedular_id){
    this.setData({isShowSchedular:true})
    console.log("--",typeof(schedular_id))
    httpsUtil.get(API.GET_SCHEDULE_TICKET,{
      schedular_id: typeof(schedular_id)=="number"?schedular_id:this.data.reSchedular[0].id
    },{
      isLoading:true
    }).then(data=>{
      console.log("时间表",data);
      this.setData({prices:data.data.list})
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
      if(dataset.item.project_time==item.project_time && item.session_time){
        sessionTime.push(item);
      }
    })

    this.setData({
      activateIndex:dataset.projectIdx,
      sessionTime:sessionTime,
      'submitData.schedular_id':sessionTime.length?sessionTime[0].id:dataset.item.id,
      'submitData.ticket_id':"",
      // selectedTime:sessionTime[0],//选中的项
      activateSessionIdx:0,
      // priceIdx:"-"
    })
    this.reSet();
    this.onGetPrice(dataset.item.id);
  },

  selectSession:function(e){
    console.log("session时间",e.currentTarget.dataset)

    let dataset = e.currentTarget.dataset;

    this.setData({
      activateSessionIdx:dataset.sessionIdx,
      // selectedTime:e.currentTarget.dataset.item
      'submitData.schedular_id':dataset.item.id,
      'submitData.ticket_id':""
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
        'submitData.ticket_id':dataset.item.ticket_id,
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
    console.log("缺",this.data.submitData);
    httpsUtil.post(API.STOCKOUT_REGISTER,this.data.submitData,{isLoading:true}).then((data)=>{
      console.log("缺货登记",data);
    })
  },


  onCheckNotice:function(){
    this.setData({isShowNoticeInfo:true});
  },
  onCloseNoticeInfo:function(){
    this.setData({isShowNoticeInfo:false});
  },

  fetchRelativeRecommend(categoryId,city_id){
    httpsUtil.get(API.GET_RECOMMEND_FOR_YOU,{
      category: categoryId,
      city_id: city_id
    },{isLoading:false}).then(data=>{
      console.log("相关推荐",data.data);

      const list = data.data.list;

      const recommend = [];
      list.map(item=>{
        if(this.data.detailData.static_data.show_id != item.show_id) recommend.push(item)
      })

      if(list.length){
        for (let i = 0; i < list.length; i++) {
          list[i].equality_start_end_date = util.formatDate(list[i].start_show_timestamp * 1000, "Y.M.D");
          list[i].equality_start_end_time = util.formatDate(list[i].start_show_timestamp * 1000, "h.m");
          list[i].date_scope = util.formatDate(list[i].start_show_timestamp * 1000, "Y.M.D") + " - " + util.formatDate(list[i].end_show_timestamp * 1000, "M.D");
        }
      }
    
      this.setData({
        isShowMoreBtn:recommend.length>3?true:false,
        relativeRecommend:recommend.slice(0,3)
      })

    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options",options);
    const schedular_id = options.schedular_url.replace("https://m.juooo.com/ticket/","")
    this.fetchDetailData(schedular_id);
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("页面初次渲染完成")
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