// pages/calendar/components/list.js
Component({
  options: {
    styleIsolation: 'shared'//表示页面 wxss 样式将影响到自定义组件
  },
  /**
   * 组件的属性列表
   */
  properties: {
    listData:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    created:function(){//在组件实例刚刚被创建时执行
      console.log("123")
    },
    attached:function(){//在组件实例进入页面节点树时执行
      console.log("456---",this.data.listData);
    },
    ready:function(){
      console.log("组件布局完成后执行")
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
