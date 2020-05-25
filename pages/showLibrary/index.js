const httpsUtil = require('../../utils/httpsUtil');
const util = require('../../utils/util.js');
const API = require('../../constant/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_list:[],
    total:"-",
    cityInfo:{},
    paramsOptions:{
      category: 0,
      page:1
    },

    isLoading:true,

    activeTabs:0,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options---+++==",options);
    console.log("cid---+++==",options.cid);
    if(Object.keys(options).length){
      this.setData({
        activeTabs:Number(options.caid),
        "paramsOptions.category":options.caid,
        "cityInfo.id":options.cid
      })
      this.getShowList();
    }else{
      this.setData({
        activeTabs:Number(options.caid),
        "paramsOptions.category":0,
        'cityInfo.id':0,
        'cityInfo.name':"全国",
        'cityInfo.abbreviation':"",
      })
      this.getShowList();
      return;
    }
    

    if(options.cid != 0){
      this.fetchCityData((cityList)=>{
        for(let key in cityList){
          let list = cityList[key].list;
          for(let j=0;j<list.length;j++){
            if(options.cid == list[j].id){
              console.log("list[j]---啊哈哈哈哈哈哈",list[j])
              this.setData({
                'cityInfo.id':list[j].id,
                'cityInfo.name':list[j].name,
                'cityInfo.abbreviation':list[j].Abbreviation,
              })
            }
          }
        }
        console.log("=====",this.data.cityInfo)
      });
    }else{
      console.log("全国")
      this.setData({
        'cityInfo.id':0,
        'cityInfo.name':"全国",
        'cityInfo.abbreviation':"",
      })
    }
    

    

    


    
    
  },


  fetchCityData:function(callBack){

    httpsUtil.get(API.GET_CITY_LIST,{},{isLoading:true}).then(data=>{
      let cityList = data.data;
      // console.log("城市列表-----",cityList);
      callBack && callBack(cityList);
    })

  },








  onGetCategoryId:function(e){
    console.log("-=---",e);
    this.setData({
      show_list:[],
      total:"-",
      'paramsOptions.category':e.detail.categoryId,
      'paramsOptions.page':1
    })
    this.getShowList();
  },

  onSwitchCity:function(e){
    console.log("城市",e)
    this.setData({
      show_list:[],
      total:"-",
      cityInfo:{
        id:e.detail.id,
        name:e.detail.name,
        Abbreviation:e.detail.Abbreviation
      },
      'cityInfo.id':e.detail.id,
      'paramsOptions.page':1
    })
    this.getShowList();
  },


  scrolltolower:function(e){
    if(this.data.isLoading){
      this.setData({
        isLoading:false,
        'paramsOptions.page':this.data.paramsOptions.page+1,
      })
      this.getShowList();
    }
  },

  getShowList:function(){
    
    httpsUtil.get(API.GET_RECOMMEND_FOR_YOU,{
      city_id: this.data.cityInfo.id,
      category: this.data.paramsOptions.category,
      keywords: "",
      venue_id: "",
      start_time: "",
      referer_type: "",
      page:this.data.paramsOptions.page
    },{isLoading:true}).then(data=>{
      let list = data.data.list

      for (let i = 0; i < list.length;i++){
        list[i].date_scope = util.formatDate(list[i].start_show_timestamp * 1000, "Y.M.D") + " - " + util.formatDate(list[i].end_show_timestamp * 1000, "M.D");
      }

      this.setData({
        total:data.data.total,
        show_list: this.data.show_list.concat(list)
      })
      
      if (this.data.show_list.length == data.data.total || data.data.total==0){
        this.setData({isLoading: false})
      }else{
        this.setData({
          isLoading:true
        })
      }
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
    // if(this.data.options.id){
    //   return this.setData({
    //     cityInfo:this.data.options
    //   })
    // }
    // else{
      // this.setData({
      //   cityInfo:wx.getStorageSync('cityInfo')
      // })
    // }
    
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