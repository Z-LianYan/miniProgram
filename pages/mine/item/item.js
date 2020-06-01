Component({
  options: {
    styleIsolation: 'shared'//表示页面 wxss 样式将影响到自定义组件
  },
  data: {},
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },
  methods: {
    onNavigateTo:function(){
      wx.navigateTo({
        url:"/pages/authorization/index"
      })
    }
  }
})