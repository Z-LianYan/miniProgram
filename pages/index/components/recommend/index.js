// pages/index/components/recommend/index.js
const util = require('../../../../utils/util');
Component({
  options: {
    styleIsolation: 'shared'//表示页面 wxss 样式将影响到自定义组件
  },
  /**
   * 组件的属性列表
   */
  properties: {
    recommend_list: {
      type:Array,
      value:[]
    },
    cityInfo:{
      type:Object,
      value:{}
    }
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
  },

  lifetimes:{
    created() {},

    attached() {},

    ready() {
      console.log("ready");
    },
  }

})
