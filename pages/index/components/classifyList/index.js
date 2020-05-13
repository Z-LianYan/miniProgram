// pages/index/components/classifyList/index.js
Component({
  options: {
    styleIsolation: 'shared'//表示页面 wxss 样式将影响到自定义组件
  },
  /**
   * 组件的属性列表
   */
  properties: {
    classifyList:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cityInfo:wx.getStorageSync("cityInfo")
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
