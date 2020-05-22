// components/myCell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    leftTitle:{
      type:String,
      value:""
    },
    rightTitle:{
      type:String,
      value:""
    },
    isLeftArrow:{
      type: Boolean,
      value: false
    },
    url:String

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onRight: function () {
      this.triggerEvent('onRightEvent', {})
    }
  },

  lifetimes: {
    
  }



})
