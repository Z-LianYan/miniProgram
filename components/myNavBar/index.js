// components/myNavBar/index.js
Component({
  options: {
    styleIsolation: 'shared'//表示页面 wxss 样式将影响到自定义组件
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowOverlay:false
  },

  lifetimes:{

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShowMenu:function(){
      console.log("显示")
      this.setData({
        isShowOverlay:true
      })
    },
    onClickHide:function(){
      this.setData({
        isShowOverlay:false
      })
    }
  }
})
