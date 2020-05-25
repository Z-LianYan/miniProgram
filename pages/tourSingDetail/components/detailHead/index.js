// pages/ticketDetail/components/ticketDetailHead/index.js
Component({
  options: {
    styleIsolation: 'shared'//表示页面 wxss 样式将影响到自定义组件
  },
  /**
   * 组件的属性列表
   */
  properties: {
    detailData:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes:{
    created:function(){//组件实例刚刚被创建时执行

    },
    ready:function(){//组件渲染完成时执行

    },
    attached:function(){//组件实例刚刚进入页面节点树时执行
      
    },
    detached:function(){//组件实例被从页面节点树移除时执行

    },
    moved:function(){//组件实例被移动到节点树另一位置时执行

    }

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGoHome:function(){
      wx.switchTab({url: "/pages/index/index"})
    },
  }
})
