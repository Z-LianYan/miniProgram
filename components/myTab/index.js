const httpsUtil = require('../../utils/httpsUtil');
const util = require('../../utils/util.js');
const API = require('../../constant/api');
Component({
  options: {
    styleIsolation: 'shared'//表示页面 wxss 样式将影响到自定义组件
  },
  /**
   * 组件的属性列表
   */
  properties: {
    navbarTitle:String,
    cityInfo:{
      type:Object,
      value:{}
    },
    activeTabs:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    classifyList:[],

    cityList:[],

    cityInfo:wx.getStorageSync("cityInfo"),




    animationOptions:{
      duration:700,//动画持续时间，单位 ms
      timingFunction: "linear", //动画的效果 linear 为线性
      delay: 0 //0则不延迟
    },
    isShowAnimation:false,
    animationData:{}


  },

  lifetimes: {
    created:function(){//在组件实例刚刚被创建时执行
      console.log("123")
      this.setData({
        selectedCityInfo:wx.getStorageSync("cityInfo")
      })
      this.getClassifyList();
      this.getCityList();
    },
    attached:function(){//在组件实例进入页面节点树时执行
      console.log("456")
    },
    ready:function(){//在组件在视图层布局完成后执行
      console.log("789")
    },
    moved:function(){//在组件实例被移动到节点树另一个位置时执行

    },
    detached:function(){//在组件实例被从页面节点树移除时执行

    },
    detached:function(){//每当组件方法抛出错误时执行

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onOpenDrawer:function(){
      var animation=wx.createAnimation(this.data.animationOptions)

      animation.translateX('-100vw').step();

      this.setData({
        animationData: animation.export()
      })
    },
    onCloseDrawer:function(){
      var animation=wx.createAnimation(this.data.animationOptions)

      animation.translateX('100vw').step();

      this.setData({
        animationData: animation.export()
      })
    },

    
    onChange(e){
      console.log(e);
      this.triggerEvent("getCategoryId",{categoryId: e.detail.name})
    },
    getClassifyList:function(){
      // console.log("111111")
      httpsUtil({
        url: API.GET_CATEGORY_LIST,
        data:{},
        success:(data)=>{
          data.data.data.unshift({
            id: 0,
            name: "全部"
          })
          this.setData({
            classifyList:data.data.data
          })
        },
        fail:(err)=>{
          console.log("err",err);
        }
      })
    },

    getCityList:function(){
      // console.log("111111")
      httpsUtil({
        url: API.GET_CITY_LIST_TABS,
        data:{},
        success:(data)=>{
          console.log("data----城市",data.data.data);
          data.data.data.city_list.unshift({
            Abbreviation: "",
            enname: "",
            is_city: 0,
            id: 0,
            name: "全部"
          })
          this.setData({
            cityList:data.data.data.city_list
          })
        },
        fail:(err)=>{
          console.log("err",err);
        }
      })
    },

    onConfirm:function(){
      this.onSwitchCity(this.data.selectedCityInfo);
      this.onCloseDrawer();
    },

    onReSet:function(){
      this.setData({
        selectedCityInfo:wx.getStorageSync("cityInfo")
      })
    },
    onSelectedCity(e){
      console.log("e",e,e.target.dataset.cityInfo);
      this.setData({
        cityInfo:{
          id:e.target.dataset.cityInfo.id,
          name:e.target.dataset.cityInfo.name,
          Abbreviation:e.target.dataset.cityInfo.Abbreviation,
        },
        selectedCityInfo:e.target.dataset.cityInfo
      })
    },

    onSwitchCity:function(data){
      // console.log("data---==",data);
      this.triggerEvent("onSwitchCity",data)
    },




  }
})
