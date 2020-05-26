// pages/ticketDetail/components/tourCity/index.js
Component({
  options: {
    styleIsolation: 'shared'//表示页面 wxss 样式将影响到自定义组件
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tourCityData:{
      type:Object,
      value:{}
    },
    schId:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    activateIndex:'-'
  },

  lifetimes:{
    create:function(){
      
    },
    attached:function(){},
    detached:function(){},
    ready:function(){
      console.log("巡演组件",this.data.tourCityData);
    },
    moved:function(){}
  },

  

  /**
   * 组件的方法列表
   */
  methods: {
    onSelectCity:function(e){
      // console.log("e",e.currentTarget.dataset.schId)
      // this.setData({
      //   activateIndex:e.currentTarget.dataset.schId
      // })
      this.triggerEvent('onRightEvent', e.currentTarget.dataset.schId)
    },
  }
})
